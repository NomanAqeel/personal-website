<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Date versions (experience & education dates)

`lib/content.ts` keeps two sets of dates for the experience entries and the education entry, selected by the `DATE_VERSION` constant (`"original"` or `"freelancer"`). Only the active set is rendered; the other stays in the code. The order of the experience windows also follows the active set (`DATE_SETS[version].order`).

- When Noman says **"original version dates"** (or "original dates lagao"): set `DATE_VERSION = "original"`.
- When Noman says **"freelancer dates"** (or "freelancer version"): set `DATE_VERSION = "freelancer"`.
- Never show both; never edit the inactive set unless asked. To change a date, edit it inside `DATE_SETS` for the right version only.
- **The CV follows the same switch.** `npm run cv` renders `cv/resume.template.html` with the active version's dates and experience order (`cv/build.mjs` reads `lib/content.ts`), rebuilds `public/Noman_Aqeel_CV.pdf` and `public/cv-pages/*.jpg`. So switching = change `DATE_VERSION`, run `npm run cv`, verify two pages, commit the content change **and** the regenerated PDF/images together. Site and CV must never show different date sets.
- Date placeholders in the template are `{{date:turing}}`, `{{date:innoviast}}`, `{{date:revelo-3d}}`, `{{date:revelo}}`, `{{date:web}}`, `{{date:education}}`; experience blocks are wrapped in `<!-- exp:<id> --> … <!-- /exp:<id> -->` and reordered automatically.

| Entry | original | freelancer |
| --- | --- | --- |
| Turing - AI Model Trainer / Data Analyst | Jan 2026 – Present | Jan 2026 – Present |
| INNOVIAST - Founder | Jun 2025 – Jun 2026 | Jun 2025 – Present |
| Revelo - 3D Developer (AI Model Training) | Sep 2026 – Oct 2026 · Remote | Aug 2026 – Nov 2026 · Remote |
| Revelo - AI Model (Opus 4.6) Evaluator | Project-based · 1 month | Project-based · 4 months |
| Freelancing, YoungDev & Cosmicode - Web Developer | 2024 – 2025 | 2023 – 2025 |
| Education - BS CS, Superior University | Nov 2022 – Jun 2026 | Nov 2021 – Jun 2025 |
| Experience order | Turing, Revelo 3D, Revelo Evaluator, INNOVIAST, Web | Turing, INNOVIAST, Revelo 3D, Revelo Evaluator, Web |
