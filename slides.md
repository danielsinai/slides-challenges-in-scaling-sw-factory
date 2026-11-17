---
theme: ./themes/port
title: Challenges building factories at scale
info: |
  Challenges building factories at scale
  Daniel Sinai and Dor Meiri, Port
  AWS Experience Tel Aviv, Building AI Software Factories on AWS, 18.11.2026
author: Daniel Sinai, Dor Meiri
fonts:
  sans: DM Sans
  mono: Fira Code
  weights: "400,500,600,700,800"
highlighter: shiki
lineNumbers: false
transition: fade-out
exportFilename: challenges-building-factories-at-scale
favicon: /favicon.svg
layout: cover
---

<PhotoBg
  src="/images/cover.png"
  prompt="Pixar-style 3D render of a vast factory floor. In the center, a cute white robot engineer with a blue visor face stands at a drafting table studying a glowing blueprint of a factory line. On the left, a workshop with raw parts, tools and half-assembled machines. On the right, a loading dock where sealed, ready-made modules arrive on pallets. Both sides equally lit and equally inviting. Warm industrial light with purple and teal accents, 16:9."
/>

<div class="cover-shade" />

<div class="cover-title">

# Challenges building factories at scale

</div>

<div class="absolute bottom-10 left-10 z-10">
  <PortLogo type="svg" size="2rem" color="white" />
</div>

<ColorDots />

<!--
[דור]
- שלום לכולם, אז כולכם באתם לשמוע איך בונים Factory טוב ובאנו לנפץ מיתוס - הדרך שלכם להגיע לFactory בארגון מצריכה ממכם.

- באנו לספר לכם אי

מעבר: "רגע, מי אנחנו."
-->

---
layout: center
---

<SpeakerCards />

<!--
[סיני + דור]
- דור: מציג את סיני.
- סיני: מציג את דור.
- סיני: אנחנו בונים בפורט מוצר של software factory, ובמקביל מריצים מפעל על הקוד של עצמנו. כל האתגרים שתראו היום הם אתגרים שלקוחות שלנו ואנחנו נתקלים בהם יום-יום

מעבר (דור): "אז בואו נתחיל ממה שכולם בונים ביום הראשון."
-->

---

# Day one: it works

<UiLine />

<!--
[דור]
- ככה נראה היום הראשון של כמעט כל מפעל.
- נכנס ticket. לדוגמה: לשנות משהו קטן ב-UI.
[CLICK]
- Plan: agent כותב spec.
[CLICK]
- Build: agent פותח PR.
[CLICK]
- Review: בן אדם. אם יש הערות, ה-work item חוזר ל-Build וה-agent מתקן.
[CLICK]
- Release: פה זה כבר לא agent, זה workflow רגיל. הוא ממרג', ה-CD רץ, ובודקים שהכל תקין בפרודקשן.
- וזה עובד. החלק הזה היום כבר יחסית קל, ורוב מי שפה כנראה הגיע לשם.

מעבר: "ואז, אחרי כמה שבועות, מתחילים האתגרים. הראשון: מגיע צוות אחר ושואל, אפשר גם לנו line?"
-->

---
class: q-slide
---

<QKicker :n="1" />

# Can another team build a line?

<div class="q-body">
  <div class="q-card">
    <div class="q-card-title">Team lines</div>
    <div class="ds-lines">
      <div class="ds-line"><div class="ds-team"><span class="i-carbon-screen" />Frontend</div><div class="ds-stations"><i></i><i></i><i class="own"></i><i></i></div></div>
      <div class="ds-line"><div class="ds-team"><span class="i-carbon-currency" />Payments</div><div class="ds-stations"><i></i><i class="own"></i><i class="own"></i><i></i></div></div>
      <div class="ds-line"><div class="ds-team"><span class="i-carbon-security" />Security</div><div class="ds-stations"><i class="own"></i><i></i><i></i><i></i></div></div>
      <div class="ds-line"><div class="ds-team"><span class="i-carbon-activity" />SRE</div><div class="ds-stations"><i class="own"></i><i></i><i class="own"></i><i></i></div></div>
    </div>
    <div class="ds-stems"><i></i><i></i><i></i><i></i></div>
    <div class="ds-base">
      <div class="ds-base-title">Org standards</div>
      <div class="ds-base-items"><span>Line templates</span><span>Shared skills</span><span>Approved agents and MCPs</span><span>Policies</span><span>Review rules</span></div>
    </div>
  </div>
</div>

<!--
[דור]
- האתגר הראשון: אפשר גם לנו line? ה-line הראשון בדרך כלל נבנה על ידי צוות הפלטפורמה. אבל מהר מאוד מגיעים צוותים אחרים: security, SRE, frontend. ולכל אחד יש עבודה שחוזרת על עצמה.
- אם כל צוות בונה לבד, מקבלים כמה מפעלים קטנים שלא מדברים אחד עם השני. לדוגמה: אצלנו היו כמה skills של code review שעשו כמעט אותו דבר.
- מה שעובד: סטנדרט ארגוני שכל line יורש. templates, skills משותפים, agents ו-MCPs מאושרים, ו-policies.
- ובשחור: מה שכל צוות מוסיף לעצמו. ככה כל צוות בונה את ה-line שלו, בלי לפרק את המפעל.

מעבר (לסיני): "וכשיש כבר כמה lines שרצים כל יום, דברים מתחילים להישבר. מה קורה אז?"
-->

---
class: q-slide
---

<QKicker :n="2" />

# What happens when it breaks?

<div class="q-body">
  <div class="q-card rl">
    <div class="q-card-title">Bug-fix line<span class="q-tag">Illustrative</span></div>
    <div class="q-row"><span class="rl-ic warn i-carbon-thumbs-down" /><span class="rl-what">Plan rejected by the owner</span><span class="q-pill warn">Re-plan</span></div>
    <div class="q-row"><span class="rl-ic bad i-carbon-cloud-offline" /><span class="rl-what">Sandbox failed to start</span><span class="q-pill bad">Retry</span></div>
    <div class="q-row"><span class="rl-ic bad i-carbon-unknown" /><span class="rl-what">Agent hallucinated an API</span><span class="q-pill bad">Rebuild</span></div>
    <div class="q-row"><span class="rl-ic warn i-carbon-time" /><span class="rl-what">Stuck, no progress</span><span class="q-pill warn">Escalate</span></div>
  </div>
</div>

<!--
[סיני]
- אז מה קורה כשמשהו נשבר?
- כשמאות או אלפי טיקטים עוברים ביום ב-factory, דברים ישברו, וה-factory שאנחנו בונים צריך לדעת להתמודד איתם.
- זה יכול להיות sandbox שנכשל, או plan שלא אושר, או סתם הזיות של המודל.
- ועם כל סוג שגיאה כזה צריך להתמודד בצורה שונה: plan שלא אושר צריך להחזיר את ה-ticket חזרה לשלב התכנון עם הערות, אבל sandbox שלא עלה כנראה יידרוש retry.
- עם כל הדברים האלה ה-factory אמור להתמודד ולהיות עמיד.

מעבר (לדור): "וכשה-factory יודע לשרוד תקלות, ההנהלה שואלת: כל line כזה, שווה את זה?"
-->

---
class: q-slide
---

<QKicker :n="3" />

# Is this line worth it?

<div class="q-body">
  <div class="q-card">
    <div class="q-card-title">Bug-fix line<span class="q-tag">Illustrative</span></div>
    <div class="fn">
      <div class="fn-row"><span>Work items in</span><div class="fn-bar" style="width:100%"></div><span class="fn-num">120</span></div>
      <div class="fn-row"><span>Plan approved</span><div class="fn-bar" style="width:93%"></div><span class="fn-num">112</span></div>
      <div class="fn-row"><span>PR opened</span><div class="fn-bar" style="width:80%"></div><span class="fn-num">96</span></div>
      <div class="fn-row key"><span>Merged, no human edits</span><div class="fn-bar" style="width:40%"></div><span class="fn-num">48</span></div>
      <div class="fn-row key"><span>…and not reverted</span><div class="fn-bar" style="width:38%"></div><span class="fn-num">46</span></div>
    </div>
    <div class="fn-foot"><span>Biggest drop: <b>PR → merged with no edits</b></span><span>Cost per clean merge: <b>$4.10</b></span></div>
  </div>
</div>

<!--
[דור]
- האתגר השלישי: כל line כזה, שווה את זה? כדי לענות, כל תחנה צריכה מספרים משלה: כמה הצליחו, כמה זמן לקח, כמה retries.
- לדוגמה, פה: נכנסו 120 work items, ורק 46 יצאו בסוף ממורג'ים, בלי שבן אדם נגע, ובלי revert. זה המספר שמעניין.
- וככה גם רואים איפה ה-line דולף. פה זה בין PR ל-merge, כלומר שם צריך לשפר.
- להדגיש: אותם מדדים לכל ה-lines, כדי שאפשר יהיה להשוות ולהחליט מה להרחיב ומה לסגור.

מעבר (לסיני): "ועכשיו, לבעיה שאנחנו שומעים עליה המון, גם מלקוחות."
-->

---
class: q-slide
---

<QKicker :n="4" />

# Who reviews all of this?

<div class="q-body">
  <div class="q-card rv">
    <div class="rv-head"><span>Pull request</span><span>SDLC context</span><span>Risk</span><span>Who reviews</span></div>
    <div class="rv-row">
      <div class="rv-pr"><b>Orders table migration</b><span class="q-chip">billing-core</span></div>
      <span class="rv-arrow i-carbon-arrow-right" />
      <div class="rv-ctx"><span>Tier 1</span><span>Owner: Payments</span><span>DB migration</span></div>
      <span class="rv-arrow i-carbon-arrow-right" />
      <span class="q-pill bad">HIGH</span>
      <span class="rv-arrow i-carbon-arrow-right" />
      <div class="rv-who"><span class="rv-people"><span class="i-carbon-user-filled" /><span class="i-carbon-user-filled" /><span class="i-carbon-user-filled" /></span><b>Deep review</b><small>Owner + 2 seniors</small></div>
    </div>
    <div class="rv-row">
      <div class="rv-pr"><b>Settings page tests</b><span class="q-chip">admin-ui</span></div>
      <span class="rv-arrow i-carbon-arrow-right" />
      <div class="rv-ctx"><span>Tier 3</span><span>Owner: Platform</span><span>Tests only</span></div>
      <span class="rv-arrow i-carbon-arrow-right" />
      <span class="q-pill good">LOW</span>
      <span class="rv-arrow i-carbon-arrow-right" />
      <div class="rv-who"><span class="rv-people none"><span class="i-carbon-bot" /></span><b>No human review</b><small>Merge on checks</small></div>
    </div>
    <div class="rv-foot"><span class="i-ph-check-circle-light" />Focus on where the risk is</div>
  </div>
</div>

<!--
[סיני]
- מי עושה review לכל ה-PRים?
- יש לזה כמה פתרונות. קודם כל, להכניס review agents שעוזרים למפתח בקצה לעשות את ה-review בצורה קלה יותר.
- אבל בנוסף לזה, אנחנו צריכים לדעת מה בדיוק ה-risk של ה-PR ואיזה reviewers צריך כדי לאשר אותו, במטרה להוריד reviews מיותרים.
- לדוגמה: אם יש לנו service שהוא ב-core של המוצר, ומריצים שם migration, כנראה נרצה להעביר את זה review עמוק. אבל אם שינינו טסט באזור פחות קריטי, הוא לא צריך לקבל את אותו היחס.
- כדי לבצע את הלוגיקות האלה אנחנו צריכים להביא את המידע מה-context של ה-SDLC שלנו: מי ה-owner, מה החשיבות של ה-service וכו'.

מעבר: "אבל ברגע שאנחנו נותנים ל-factory להחליט לבד מה צריך review ומה לא, צריך גם לשים לו גבולות. אז איך שמים guardrails?"
-->

---
class: q-slide
---

<QKicker :n="5" />

# How do you put guardrails on it?

<div class="ct">
  <div class="q-card ct-card">
    <span class="q-ic"><span class="i-carbon-user-certification" /></span>
    <div class="ct-head">Human approval</div>
  </div>
  <div class="q-card ct-card">
    <span class="q-ic"><span class="i-carbon-task-approved" /></span>
    <div class="ct-head">Checkpoints</div>
  </div>
  <div class="q-card ct-card">
    <span class="q-ic"><span class="i-carbon-wallet" /></span>
    <div class="ct-head">Spend limits</div>
  </div>
</div>

<!--
[סיני]
- לפני שנותנים למפעל לרוץ כל הלילה, צריך guardrails. שלושה סוגים:
- human approval: איפה בן אדם חייב לאשר לפני שה-line ממשיך. לדוגמה: תוכנית לשירות tier 1, כל דבר שנוגע ב-payments, ו-deploy לפרודקשן. ותמיד נשאר תיעוד של מי אישר ומתי.
- checkpoints: בדיקות אוטומטיות על מה שכל תחנה הוציאה. לתוכנית יש acceptance criteria, הטסטים ירוקים, הסיכון הוערך לפי ה-context, ואין merge כשיש אינצידנט פתוח.
- spend limits: תקציב לכל line, לכל agent ולכל run. ה-agent שנכנס ללולאה בשתיים בלילה נעצר בגבול, ולא בחשבונית של סוף החודש.

מעבר: "וכשהמפעל רץ ככה הרבה, הוא אוסף הרבה מידע. מה אפשר ללמוד ממנו?"
-->

---
class: q-slide
---

<QKicker :n="6" />

# How does the factory keep improving?

<div class="q-body">
  <div class="q-tall">
    <div class="loop">
      <svg viewBox="0 0 304 256" aria-hidden="true">
        <defs><marker id="loop-head" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="head" /></marker></defs>
        <path class="arc" d="M197.6 49.4 A112 86 0 0 1 244.6 79.7" marker-end="url(#loop-head)" />
        <path class="arc" d="M248.7 171.4 A112 86 0 0 1 203.2 204.5" marker-end="url(#loop-head)" />
        <path class="arc" d="M106.4 206.6 A112 86 0 0 1 59.4 176.3" marker-end="url(#loop-head)" />
        <path class="arc" d="M55.3 84.6 A112 86 0 0 1 100.8 51.5" marker-end="url(#loop-head)" />
      </svg>
      <div class="loop-node" style="left:50%;top:16.4%"><b><span class="i-carbon-play-outline" />Run</b></div>
      <div class="loop-node" style="left:86.8%;top:50%"><b><span class="i-carbon-view" />Observe</b></div>
      <div class="loop-node" style="left:50%;top:83.6%"><b><span class="i-carbon-idea" />Learn</b></div>
      <div class="loop-node" style="left:13.2%;top:50%"><b><span class="i-carbon-upgrade" />Improve</b></div>
    </div>
  </div>
</div>

<!--
[סיני]
- המפעל הוא חלק מה-SDLC, ובכל run הוא משאיר מידע: איפה נכשל, איפה בן אדם נכנס, ואיזה context היה חסר.
- וזה בעצם loop: ה-lines רצים, אנחנו רואים איפה נתקעו, מבינים מה חסר, ומתקנים את זה במפעל עצמו. ואז ה-run הבא כבר רץ על מפעל טוב יותר.
- לדוגמה: אם אותה הערה חוזרת בכל review על PRs של agents, היא לא צריכה להיכתב בפעם המאה. היא צריכה להפוך לחוק ב-REVIEW.md או ל-skill.
- להדגיש: הרבה מהתיקונים האלה הם בכלל ב-SDLC: טסט שנכשל כל הזמן, שירות בלי בעלים, runbook חסר. ומזה נהנים גם המפתחים, לא רק ה-agents.

מעבר: "אז ראינו שישה אתגרים. בואו נחזור אליהם."
-->

---
class: own-slide
---

# What you own at scale

<OwnBoard />

<!--
[סיני]

אז ראינו את האתגרים העיקריים - וכנראה בהתחלה זה לא ממש משנה איך תבנו את הLine הראשון זה יעבוד.

וכשהScale גדל אלה חלק מהאתגרים שתתמודדו איתם.

מעבר: ״ועכשיו בקצרה נראה איך Port ו AWS עוזרים עם האתגרים האלה״
-->

---
clicks: 2
---

<div class="flex flex-1 items-center -mx-8 -my-6">
  <MarketMap build class="w-full" style="zoom: 1" />
</div>

<!--
[סיני]
- ככה נראה ה-stack של software factory, ואיפה פורט ו-AWS נמצאים בו. נעבור עליו מלמטה.
- למטה: ה-DevOps platform. CI/CD, observability, incident management, IaC. את זה כבר יש לכם, ואף agent לא מחליף את זה.
[CLICK]
- מעליו: ה-AI infrastructure. פה העבודה קורית: מודלים, harness, סביבות הרצה, agents, AI gateway ו-observability.
- בכתום אפשר לראות איפה AWS נמצאים: Bedrock למודלים, AgentCore harness ל-agent loop, AgentCore להרצה, AgentCore Gateway, ו-AWS DevOps Agent.
[CLICK]
- ומסביב: ה-Factory platform. פה פורט נמצאים, וזה בדיוק המקום של האתגרים שראינו:
  - governance ו-human in the loop: ה-guardrails וה-review לפי סיכון.
  - orchestration: checkpoints, retries ומה קורה כשמשהו נשבר.
  - AI registry: templates ו-skills, כדי שכל צוות יוכל לבנות line על הסטנדרט.
  - SDLC context: מה ה-agent צריך לדעת לפני שהוא נוגע בשירות.
  - engineering intelligence: המדדים, גם של הארגון וגם של כל line.
- להדגיש: את ה-lines ואת מה שמבדל אתכם, תבנו. את השכבה הזו, אין סיבה לבנות מחדש.

מעבר: "תודה."
-->

---
layout: cover
---

# Thank you

<Subtitle>Questions?</Subtitle>

<SpeakerLinks class="mt-12" />

<div class="absolute bottom-10 left-10">
  <img src="./themes/port/public/port-wordmark-black.png" alt="Port" class="h-9 dark:hidden" />
  <img src="./themes/port/public/port-wordmark-white.png" alt="Port" class="h-9 hidden dark:block" />
</div>

<div class="thanks-gif">
  <PhotoBg
    src="/images/thanks.png"
    prompt="Looping GIF: cute white robots on a factory line pass a finished crate down the conveyor and give a thumbs up"
  />
</div>

<ColorDots />

<!--
[סיני + דור]
- שאלות.
-->
