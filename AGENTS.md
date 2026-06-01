# AGENTS

Conventions for AI agents (Claude Code and friends) editing **junbuluv.github.io**.

## Identity

This is a single-author academic webpage — homepage, research, teaching, contact,
plus a downloadable CV. It is not a CMS or a courseware site. Optimize for:

1. **Authority signal.** Typos, broken links, or stale dates undermine
   credibility with reviewers, search committees, and editors.
2. **Permanence.** Citations and SEO depend on stable URLs and canonicals.
   Don't change page paths without also updating `public/sitemap.xml` and
   every `canonical` / `og:url` reference.

## House style

- Prose: third-person bio, first-person abstracts. Past tense for completed
  presentations; future/no-tense for scheduled ones.
- Citations: paper titles in title case; venue names spelled out on first
  mention (e.g. "European Finance Association Annual Meeting" before "EFA").
- Dates: en-dash (`–`) for ranges in display copy; en-dash (`--`) in LaTeX.
- Year-only is fine when the month is uncertain; never invent precise dates.

## Code expectations

- **Content-first**: page text lives in `src/content/<collection>/*.json`,
  not inside `.astro` files. If a value is going to change yearly, it's
  data, not markup.
- **Schemas are the contract**: extend `src/content/config.ts` (Zod) before
  adding a new field. Don't read undeclared fields off `data` — it won't
  type-check.
- **Tailwind only**: no inline `<style>` blocks except the abstract toggle's
  marker reset on `research.astro`. New colors go through
  `tailwind.config.mjs` (`ink`, `cream`, `rule`).
- **No JS frameworks**: this site is HTML + a few lines of inline JS. Don't
  introduce React, Vue, or stateful islands.
- **Comments**: rare; only for non-obvious *why* (e.g. award-year sort
  heuristic). Identifier names should carry the rest.

## Verify-before-deploy checklist

Before `npm run deploy`:

1. `npm run typecheck` — must pass.
2. `npm run build` — must compile cleanly; check `dist/` has the four
   `.html` pages plus `cv.pdf`.
3. Open `npm run preview` and load each page in a browser. Confirm:
   - Burgundy/cream palette intact, serif fonts loaded.
   - "What's new" feed reflects the latest entry you added.
   - `/cv.pdf` downloads the freshly compiled PDF.
4. If you added or renamed a page, update `public/sitemap.xml` (it is
   hand-maintained — there is no sitemap integration).

## What not to do

- Don't push `main` directly to `gh-pages`. The deploy contract is
  `npm run deploy` (built `dist/` → `gh-pages` branch).
- Don't commit `cv.aux`, `cv.log`, `cv.out`, `node_modules/`, or `dist/`.
- Don't commit anything from `scholarship_application_2026-2027/`.
- Don't add tracking scripts, analytics, or third-party embeds. The site
  ships zero JS by default; keep it that way.
- Don't invent presentation dates, venues, or coauthor lists. Ask first.
