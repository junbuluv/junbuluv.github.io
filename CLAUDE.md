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
- Layout: `src/layouts/BaseLayout.astro` (nav + footer + SEO + JSON-LD slot + `<ClientRouter />`)
- Content collections:
  - `src/content/papers/<slug>.json` — working papers; `research.html` lists them by `order`.
  - `src/content/presentations/<slug>.json` — talks; the index "What's new" feed pulls from here (Brown Bag venues are filtered out).
  - `src/content/awards/<slug>.json` — fellowships/honors; What's new pulls from here.
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
  "What's new" feed (sorted by `year` desc, top 8, grouped by year).
- Adding an award → JSON in `src/content/awards/<slug>.json`. `year` is a
  string ("2026", "2026–2027", "2023, 2025"); What's-new sorts by the
  largest 4-digit year token in that string.
- Adding a course → JSON in `src/content/teaching/<slug>.json`. Use
  `role: "Teaching Assistant"` to render a `(Teaching Assistant)` tag and
  `websiteUrl` for the `[course website]` link.
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

## Gotchas

- **View Transitions / ClientRouter**: page-level scripts must re-arm on
  `astro:page-load`, not `DOMContentLoaded`/`load`. Cross-page navigation is
  client-routed, so the document is not re-parsed and `DOMContentLoaded` only
  fires once per session. See `BaseLayout.astro` (scroll-reveal observer) and
  `research.astro` (abstract toggle) for the pattern.
- **Sitemap drift**: `public/sitemap.xml` is hand-maintained. Update
  `<lastmod>` and add new URLs by hand when you ship a new page or PDF.

## Companion docs

- `AGENTS.md` — AI-agent collaboration conventions + verify-before-deploy.
- `ARCHITECTURE.md` — design rationale (why Astro, why Tailwind, why
  hand-maintained sitemap, etc.).

## Local files / gitignore

- `cv.aux`, `cv.log`, `cv.out`, `cv.fls`, `cv.fdb_latexmk`, `cv.synctex.gz` — LaTeX build artifacts
- `node_modules/`, `dist/`, `.astro/` — Node + Astro output
- `preview*.png`, `.DS_Store`, `.playwright-mcp/` — local artifacts
- `scholarship_application_2026-2027/` — private personal documents (W-2s etc.); never commit
