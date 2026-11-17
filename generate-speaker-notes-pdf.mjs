#!/usr/bin/env node

// Renders the deck's speaker notes (the <!-- ... --> block of every slide in
// slides.md) as a printable A4 PDF: one card per slide with its number, title
// and presenter, Hebrew notes laid out right to left.
//
//   node generate-speaker-notes-pdf.mjs [--input slides.md] [--output build-vs-buy-speaker-notes.pdf]

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright-chromium";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, item, index, all) => {
    if (item.startsWith("--")) pairs.push([item.slice(2), all[index + 1]]);
    return pairs;
  }, []),
);
const inputPath = resolve(args.input ?? "slides.md");
const outputPath = resolve(args.output ?? "build-vs-buy-speaker-notes.pdf");

const markdown = await readFile(inputPath, "utf8");
const deckTitle = markdown.match(/^title:\s*(.+)$/mu)?.[1] ?? "Speaker notes";
const cards = slides(markdown).map(renderCard).join("\n");
if (!cards) {
  console.error("No speaker notes (<!-- ... -->) found in the deck");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(renderPage(deckTitle, cards), { waitUntil: "load" });
await page.pdf({ path: outputPath, format: "A4", printBackground: true });
await browser.close();
console.log(`Done: ${outputPath}`);

/**
 * Splits the deck into slides. Slidev separates slides with `---` lines, and a
 * slide's frontmatter is itself fenced by `---`, so a chunk that is only
 * `key: value` lines is that frontmatter and belongs to the slide after it.
 */
function slides(source) {
  const chunks = source.split(/\n---\n/u);
  const result = [];
  let frontmatter = "";
  for (const [index, chunk] of chunks.entries()) {
    // the deck's own headmatter opens the file
    if (index === 0 && chunk.startsWith("---")) {
      frontmatter = chunk;
      continue;
    }
    if (/^(\s*[\w-]+:.*\n?)+$/u.test(`${chunk.trim()}\n`)) {
      frontmatter = chunk;
      continue;
    }
    result.push({ frontmatter, body: chunk, number: result.length + 1 });
    frontmatter = "";
  }
  return result.filter((slide) => /<!--/u.test(slide.body));
}

function slideTitle({ frontmatter, body, number }) {
  const heading = body.match(/^# (.+)$/mu)?.[1] ?? frontmatter.match(/^title:\s*"?(.+?)"?\s*$/mu)?.[1];
  if (number === 1) return heading ? `Cover: ${heading.replace(/<br\s*\/?>/giu, " ")}` : "Cover";
  if (heading) return heading;
  const terminal = body.match(/<TerminalWindow[^>]*title="([^"]+)"/u)?.[1];
  if (terminal) return `Terminal: ${terminal}`;
  const image = `${frontmatter}\n${body}`.match(/images\/([\w-]+)\.\w+/u)?.[1];
  if (image) return `${image.replace(/-/gu, " ").replace(/^./u, (c) => c.toUpperCase())} (image)`;
  return "";
}

function renderCard(slide) {
  const notes = slide.body.match(/<!--(.*?)-->/su)[1].trim().split("\n");
  const speaker = /^\[[^\]]+\]$/u.test(notes[0]?.trim() ?? "") ? notes.shift().trim() : "";
  let html = "";
  let inList = false;
  for (const raw of notes) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;
    const isItem = /^\s*-\s/u.test(line);
    if (isItem && !inList) html += "<ul>";
    if (!isItem && inList) html += "</ul>";
    inList = isItem;
    const text = escapeHtml(line.replace(/^\s*-\s*/u, "").trim());
    if (isItem) html += `<li>${text}</li>`;
    else if (line.trim().startsWith("מעבר")) html += `<p class="handoff">${text}</p>`;
    else html += `<p>${text}</p>`;
  }
  if (inList) html += "</ul>";
  return `<section>
  <header><span class="num">${slide.number}</span><span class="title" dir="ltr">${escapeHtml(slideTitle(slide))}</span><span class="who">${escapeHtml(speaker)}</span></header>
  ${html}
</section>`;
}

function renderPage(title, body) {
  return `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)} · speaker notes</title>
<style>
  @page { size: A4; margin: 14mm; }
  body { font-family: -apple-system, "Segoe UI", Arial, sans-serif; font-size: 13pt; line-height: 1.55; color: #111; }
  h1 { font-size: 18pt; margin: 0 0 8mm; direction: ltr; text-align: left; }
  section { break-inside: avoid; border: 1px solid #ddd; border-radius: 8px; padding: 4mm 5mm; margin-bottom: 5mm; }
  header { display: flex; align-items: baseline; gap: 3mm; border-bottom: 1px solid #eee; padding-bottom: 2mm; margin-bottom: 2mm; }
  .num { font-weight: 800; font-size: 15pt; color: #0891b2; }
  .title { font-weight: 700; flex: 1; text-align: left; }
  .who { font-weight: 700; color: #7c3aed; }
  ul { margin: 0; padding-inline-start: 6mm; }
  li, p { margin: 1mm 0; }
  .handoff { margin-top: 2mm; color: #555; font-style: italic; }
</style>
</head>
<body>
<h1>${escapeHtml(title)} · speaker notes</h1>
${body}
</body>
</html>`;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/gu, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
