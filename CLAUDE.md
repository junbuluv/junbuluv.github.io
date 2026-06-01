# junbuluv.github.io

Academic personal webpage. **Astro 5 static build**, served by GitHub Pages.
Live: https://junbuluv.github.io

## Stack at a glance

- **Astro 5** with `output: 'static'` and `build.format: 'file'` so URLs are
  `/research.html`, `/teaching.html`, etc. — preserves existing canonicals
  and the hand-maintained sitemap.
- **Tailwind 3** via `@astrojs/tailwind` (no base styles; our own reset in
  `src/styles/global.css`). Burgundy/cream serif palette is the project's
  identity — defined in `tailwind.config.mjs` under `colors` and
  `fontFamily.serif`.
- **Content collections** with Zod schemas for `papers`, `presentations`,
  `awards`, and `teaching` (`src/content/config.ts`). All site data is JSON
  in `src/content/<collection>/`; pages just `getCollection()` and render.
- **Node 22+** required.

Path aliases (`tsconfig.json`): `@components/*`, `@layouts/*`, `@content/*`,
`@styles/*`, `@/*`.

## Where things live

- Pages: `src/pages/{index,research,teaching,contact}.astro`
- Layout: `src/layouts/BaseLayout.astro` (nav + footer + SEO + JSON-LD slot)
- Content collections:
  - `src/content/papers/<slug>.json` — working papers; `research.html` lists them by `order`.
  - `src/content/presentations/<slug>.json` — talks; index "What's new" pulls from here.
  - `src/content/awards/<slug>.json` — fellowships/honors; index "What's new" pulls from here.
  - `src/content/teaching/<slug>.json` — courses; `teaching.html` groups by `institution`.
- Static assets (served at site root): `public/cv.pdf`, `public/discretion.pdf`,
  `public/robots.txt`, `public/sitemap.xml`.
- CV LaTeX source: `cv.tex` at repo root. `npm run build:cv` runs `pdflatex`
  twice and copies `cv.pdf` into `public/`. The regular `npm run build` also
  copies an already-built `cv.pdf` into `public/` so a fresh `npm run build`
  always ships the latest PDF.

## Build / deploy

- **Dev**: `npm run dev` → local preview at <http://localhost:4321>.
- **Typecheck**: `npm run typecheck` (wraps `astro check`).
- **Build**: `npm run build` → static output in `dist/`.
- **CV**: `npm run build:cv` (pdflatex × 2 + copy to `public/`).
- **Deploy**: `npm run deploy` runs the Astro build then `npx gh-pages -d dist
  -b gh-pages` to publish the built output to the `gh-pages` branch.
  GitHub Pages serves from `gh-pages`. The `main` branch holds source only.

  Important: after this migration, the `gh-pages` branch contains the
  **built `dist/` contents**, not source. Don't push `main` to `gh-pages`
  directly — use `npm run deploy`. See `AGENTS.md` for the
  verify-before-deploy checklist.

## Conventions

- Adding a talk → drop a JSON file in `src/content/presentations/<slug>.json`.
  It will appear under the matched paper on `/research.html` and in the
  homepage "What's new" feed (sorted by `year` desc, top 6).
- Adding an award → JSON in `src/content/awards/<slug>.json`. `year` is a
  string ("2026", "2026–2027", "2023, 2025"); What's-new sorts by the
  largest 4-digit year token in that string.
- Adding a course → JSON in `src/content/teaching/<slug>.json`. Use
  `role: "Teaching Assistant"` to render a `(Teaching Assistant)` tag and
  `websiteUrl` for the `[course website]` link.
- Adding a paper → JSON in `src/content/papers/<slug>.json` with required
  `title`, `order`, `abstract`. Optional `coauthors`, `url`, `urlLabel`,
  `status`, `presentations` (free-form strings that override the auto-rendered
  presentations list — currently the research page only reads the embedded
  `presentations` field, not the separate collection).
- URLs: keep `.html` extensions in canonicals, og:url, and `sitemap.xml`
  consistent with `build.format: 'file'`.
- **Sitemap is hand-maintained** at `public/sitemap.xml`. When you add or
  rename a page (or change a PDF URL), update it manually — there is no
  sitemap integration. Keep `<lastmod>` current for changed entries.
- SEO keywords: each page sets its own `keywords` prop on `BaseLayout`.

## Companion docs

- `AGENTS.md` — AI-agent collaboration conventions + verify-before-deploy.
- `ARCHITECTURE.md` — design rationale (why Astro, why Tailwind, why
  hand-maintained sitemap, etc.).

## Local files / gitignore

- `cv.aux`, `cv.log`, `cv.out`, `cv.fls`, `cv.fdb_latexmk`, `cv.synctex.gz` — LaTeX build artifacts
- `node_modules/`, `dist/`, `.astro/` — Node + Astro output
- `preview*.png`, `.DS_Store`, `.playwright-mcp/` — local artifacts
- `scholarship_application_2026-2027/` — private personal documents (W-2s etc.); never commit
