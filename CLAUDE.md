# junbuluv.github.io

Academic personal webpage. **Astro 5 static build**, served by GitHub Pages.
Live: https://junbuluv.github.io

## Stack at a glance

- **Astro 5** with `output: 'static'` and `build.format: 'file'` so URLs are
  `/research.html`, `/teaching.html`, etc. — preserves existing canonicals
  and the hand-maintained sitemap.
- **Tailwind 3** via `@astrojs/tailwind` (no base styles; our own reset in
  `src/styles/global.css`). Navy/oxford serif palette is the project's
  identity — Baruch navy `#05336B` over a cool near-white base, defined in
  `tailwind.config.mjs` under `colors` (the `navy` token group drives links,
  active nav, the solid header band, the CV button, badges, and 1px
  hairlines; `paper.card` is the card surface) and `fontFamily.serif`. The
  reusable `.card` component class (soft surface + hover lift) lives in
  `src/styles/global.css` and is used by the What's-new feed and research
  papers.
- **Content collections** with Zod schemas for `papers`, `presentations`,
  `awards`, and `teaching` (`src/content/config.ts`). All site data is JSON
  in `src/content/<collection>/`; pages just `getCollection()` and render.
- **Node 22+** required.

Path aliases (`tsconfig.json`): `@components/*`, `@layouts/*`, `@content/*`,
`@styles/*`, `@/*`.

## Where things live

- Pages: `src/pages/{index,research,teaching,contact}.astro`
- Layout: `src/layouts/BaseLayout.astro` (nav + footer + SEO + JSON-LD slot + `<ClientRouter />`)
- Content collections:
  - `src/content/papers/<slug>.json` — working papers; `research.html` lists them by `order`.
  - `src/content/presentations/<slug>.json` — talks; the index "What's new" feed pulls current-year talks from here (Brown Bag venues are filtered out).
  - `src/content/awards/<slug>.json` — fellowships/honors; only awards with `"includeInFeed": true` (and a year spanning the current year) appear in What's new.
  - `src/content/teaching/<slug>.json` — courses; `teaching.html` groups by `institution`.
  - `src/content/materials/<slug>.json` — job-market documents (CV today; research/teaching statements later). The homepage's "Latest version" stamp reads `materials/cv.json` → `updated`.
- Site-wide data module: `src/data/profiles.ts` — single source of truth for SSRN/LinkedIn/GitHub URLs (drives `rel="me"`, JSON-LD `sameAs`, and the contact page list).
- Static assets (served at site root): `public/cv.pdf`, `public/discretion.pdf`,
  `public/headshot.jpg`, `public/favicon.svg`, `public/robots.txt`,
  `public/sitemap.xml`, `public/.nojekyll`, `public/google*.html`.
- CV LaTeX source: `cv.tex` at repo root. `npm run build:cv` runs `pdflatex`
  twice and copies `cv.pdf` into `public/`. The regular `npm run build` also
  copies an already-built `cv.pdf` into `public/` so a fresh `npm run build`
  always ships the latest PDF.

## Build / deploy

- **Dev**: `npm run dev` → local preview at <http://localhost:4321>.
- **Typecheck**: `npm run typecheck` (wraps `astro check`).
- **Build**: `npm run build` → static output in `dist/`.
- **Format**: `npm run format` (prettier over `src/**/*.{ts,astro,json,css,md}`).
- **CV**: `npm run build:cv` (pdflatex × 2 + copy to `public/`).
- **Deploy**: `npm run deploy` runs the Astro build then `npx gh-pages -d dist
  -b gh-pages --dotfiles` to publish the built output to the `gh-pages`
  branch. GitHub Pages serves from `gh-pages`. The `main` branch holds
  source only.

  Important: after this migration, the `gh-pages` branch contains the
  **built `dist/` contents**, not source. Don't push `main` to `gh-pages`
  directly — use `npm run deploy`. See `AGENTS.md` for the
  verify-before-deploy checklist.

  `--dotfiles` is required because `public/.nojekyll` must ship; without it
  GitHub Pages runs Jekyll, which silently strips Astro's `_astro/` CSS
  bundle (Jekyll excludes any `_underscore` directory).

## Conventions

- Adding a talk → drop a JSON file in `src/content/presentations/<slug>.json`.
  It will appear under the matched paper on `/research.html` and (unless the
  venue contains "Brown Bag" — those are filtered) in the homepage
  "What's new" feed — but **only if its `year` equals the current calendar
  year**. The feed is scoped to the current year (resolved at build time via
  `new Date().getFullYear()`, so it auto-rolls on the next deploy each year),
  capped at 8 items, and grouped under a single year heading.
- Adding an award → JSON in `src/content/awards/<slug>.json`. `year` is a
  string ("2026", "2026–2027", "2023, 2025"). Awards are **opt-in** for the
  homepage feed: set `"includeInFeed": true` to surface one (default is
  CV/research-record only). An opted-in award appears in What's new only when
  its year span includes the current year, and it displays under the current
  year (a "2026–2027" fellowship shows under 2026, not 2027).
- Adding a course → JSON in `src/content/teaching/<slug>.json`. `role` is one
  of `Adjunct Lecturer` (default) | `Instructor of Record` | `Teaching
  Assistant`; it renders in a muted meta line beneath the title as
  `<role> · <semesters>`. Use `websiteUrl` for the `[course website]` link.
- Adding a paper → JSON in `src/content/papers/<slug>.json` with required
  `title`, `order`, `abstract`. Optional `coauthors`, `url`, `urlLabel`,
  `status`, `presentations` (free-form strings). The research page reads
  this embedded `presentations` field, **not** the `presentations`
  collection — duplicate the venue string in both places when relevant.
- URLs: keep `.html` extensions in canonicals, og:url, and `sitemap.xml`
  consistent with `build.format: 'file'`.
- **Sitemap is hand-maintained** at `public/sitemap.xml`. When you add or
  rename a page (or change a PDF URL), update it manually — there is no
  sitemap integration. Keep `<lastmod>` current for changed entries.
- SEO keywords: each page sets its own `keywords` prop on `BaseLayout`.
- Styling new UI → follow the navy/oxford system: use the `navy` tokens
  (`text-navy`, `border-navy`, `bg-navy-tint`, `border-navy-line`) for
  accents, the `.card` class (`src/styles/global.css`) for list/panel
  surfaces, and `inline-block border-b border-navy pb-1` for section `<h2>`
  underlines. The site header is a **solid navy band** (`bg-navy` in
  `BaseLayout.astro`) with white nav text; its inactive links use the
  literal `text-[#c8d4e6]`.
  The **neutral base** (non-accent) tokens, also in `tailwind.config.mjs`:
  `text-ink` (body, slate) / `text-ink-soft` (secondary text), `border-rule`
  (default borders & dividers), `bg-paper` (page) / `bg-paper-alt` (chips,
  panels) / `bg-paper-card` (the `.card` surface). Reach for navy only
  for accents; everything else uses ink/rule/paper. The CV PDF's link color
  (`\definecolor{navy}` in `cv.tex`) and `public/favicon.svg` match the
  same navy — keep all three in sync if the accent ever changes.

## Gotchas

- **View Transitions / ClientRouter**: page-level scripts must re-arm on
  `astro:page-load`, not `DOMContentLoaded`/`load`. Cross-page navigation is
  client-routed, so the document is not re-parsed and `DOMContentLoaded` only
  fires once per session. See `BaseLayout.astro` (scroll-reveal observer) and
  `research.astro` (abstract toggle) for the pattern.
- **Sitemap drift**: `public/sitemap.xml` is hand-maintained. Update
  `<lastmod>` and add new URLs by hand when you ship a new page or PDF.
- **Headshot is dual-purpose**: `public/headshot.jpg` is both the homepage
  portrait (rendered in an `aspect-[4/5]` container with `object-cover` in
  `index.astro`) **and** the site's `og:image` / JSON-LD `image` (set in
  `index.astro` and `BaseLayout.astro`). Keep it a ~800×1000 **4:5 portrait**
  — a square or low-res source crops awkwardly and looks pixelated when the
  4:5 box upscales it. Re-export from a high-res original (e.g. `sips` on
  macOS) rather than upscaling the existing file.

## Companion docs

- `AGENTS.md` — AI-agent collaboration conventions + verify-before-deploy.
- `ARCHITECTURE.md` — design rationale (why Astro, why Tailwind, why
  hand-maintained sitemap, etc.).
- `docs/superpowers/specs/` & `docs/superpowers/plans/` — design specs and
  implementation plans from brainstormed feature work (e.g. the burgundy
  design refresh).

## Local files / gitignore

- `cv.aux`, `cv.log`, `cv.out`, `cv.fls`, `cv.fdb_latexmk`, `cv.synctex.gz` — LaTeX build artifacts
- `node_modules/`, `dist/`, `.astro/` — Node + Astro output
- `preview*.png`, `.DS_Store`, `.playwright-mcp/` — local artifacts
- `.superpowers/` — Visual Companion brainstorm mockups (session-local)
- `scholarship_application_2026-2027/` — private personal documents (W-2s etc.); never commit
