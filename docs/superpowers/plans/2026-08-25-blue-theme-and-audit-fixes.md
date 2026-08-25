# Plan: audit fixes + Baruch-navy theme exploration (2026-08-25)

## Decisions (interviewed)

- Primary accent: **Baruch navy #05336B** (official Baruch blue), replacing burgundy.
- Base stays **warm cream + serif** — accent swap only, no layout/base rework.
- **Mockup screenshots first**: recolor on a local branch, screenshot all 4 pages,
  get approval before deploying. GC azure (#005DAA) rejected as primary
  (weaker contrast on cream; reads CUNY-system rather than finance-academic).
- FIN 3610 course-website link confirmed intentional (shared hub site) — no change.

## Phase 1 — audit fixes (ship now, independent of theme)

1. `src/content/materials/cv.json`: `updated` → `2026-08-25` (homepage stamp).
2. `public/sitemap.xml`: bump `<lastmod>` to 2026-08-25 for `/`, `research.html`,
   `cv.pdf` (all changed today). Teaching/contact untouched.
3. Coauthor style: `rules-discretion.json` `coauthors` → only actual coauthors
   (drop self); `research.astro` renders `with A and B` (CV register).
4. Brown Bag symmetry: append
   `Baruch College & The Graduate Center, CUNY Brown Bag Seminars 2025`
   to `lender-specialization.json` `presentations[]`.
5. Build, verify rendered output, commit → push main → deploy → verify live.

## Phase 2 — navy theme mockup (no deploy)

1. Branch `blue-theme`. Value-swap the `burgundy` token group in
   `tailwind.config.mjs` to a navy scale derived from #05336B
   (DEFAULT / tint / line; keep token *names* for the mockup).
2. Check `src/styles/global.css` + `favicon.svg` for hard-coded burgundy.
3. Local build + Playwright screenshots of home/research/teaching/contact.
4. Present screenshots. If approved → ship phase: rename tokens
   (burgundy → accent or navy), recolor `favicon.svg`, update `cv.tex`
   link color (`\definecolor{burgundy}` → navy) so PDF matches site,
   deploy, verify live, update CLAUDE.md palette description + skill.
