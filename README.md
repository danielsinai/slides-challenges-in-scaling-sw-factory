# Challenges building factories at scale

10-minute talk by Daniel Sinai and Dor Meiri (Port) at **AWS Experience Tel Aviv: Building AI Software Factories on AWS**, 18.11.2026.

**Slides:** https://danielsinai.github.io/slides-challenges-in-scaling-sw-factory/

Day one, a factory line works. Then come the challenges of running it at scale: letting other teams build lines, failures, line metrics, the review bottleneck, guardrails, and how the factory keeps improving. The closing slide turns them into the build vs buy question: which of these do you want to own?

Built with [Slidev](https://sli.dev/) and the Port theme (vendored in `themes/port`). Slides are in English. Speaker notes are in Hebrew, marked `[סיני]` / `[דור]`, right-to-left.

```bash
npm install
npm run dev        # http://localhost:3030, presenter view with notes at /presenter
npm run export     # PDF (needs: npx playwright install chromium)
```

## Design

Same design system as Port's "Demystifying software factories" deck: AI-image photo slides, `Fx*` diagram components with click reveals, and a closing question.

Theme tokens live in `style.css`. Root `components/` holds the slide components (`QKicker`, `UiLine`, `PhotoBg`, plus Erik's `WhoWeAre`, `SpeakerLinks`, `Fx*`).

## AI images, GIFs and video

`<PhotoBg>` shows the file once it exists in `public/images/`. Until then it renders a placeholder scene with the generation prompt on it.

| Slide | File | What |
|---|---|---|
| Cover | `public/images/cover.png` | Robot engineer at a blueprint, workshop on one side, loading dock on the other |
| Thank you | `public/images/thanks.png` | Robots on the line, thumbs up |

Copy-paste prompts are in [`IMAGE_PROMPTS.md`](IMAGE_PROMPTS.md), in a Pixar-style robot look.


## Speaker notes

`npm run notes:pdf` renders the Hebrew speaker notes as a printable PDF.

## Deploy

Every push to `main` builds the deck and publishes it to GitHub Pages (`.github/workflows/deploy.yml`).

## Notes

- `vite.config.ts` disables CSS minification. Slidev's bundled `code.css` currently expands to a rule lightningcss rejects, which breaks `build`/`export`.
