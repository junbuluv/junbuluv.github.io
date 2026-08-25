---
name: cv-maintenance
description: >-
  Conventions and workflow for maintaining this academic site's LaTeX CV
  (cv.tex) and the parallel presentation data on the Astro website. Use this
  whenever editing cv.tex, adding/renaming a talk, award, paper, or
  presentation venue, changing how venues are formatted, rebuilding the CV
  PDF, or deploying — even if the user only mentions "the CV", "my talks",
  "presentations", "awards", or "the research page" without naming files.
  Encodes the dual-source venue model (CV Presentations section uses full
  names; web and CV "Presented at" lines use abbreviations for EFA/FIRS/FMA-
  tier venues), the build:cv + pdftotext verification step, and the
  commit → push main → npm run deploy → verify-live sequence so changes
  don't silently ship stale or page-overflowing output.
---

# CV & presentation maintenance

This repo keeps an academic CV (`cv.tex` → `public/cv.pdf`) and an Astro
website **in parallel** — the same talks, papers, and awards appear in both,
in deliberately *different* wording. The biggest failure mode is editing one
surface and forgetting the other, or shipping a CV PDF that silently grew to a
third page. This skill captures the structure and the verify-before-ship
discipline that prevents that.

## The dual-source model (read this first)

A venue or talk can live in up to **three** places. Know which you're editing:

| Surface | File(s) | Wording style |
|---|---|---|
| CV PDF | `cv.tex` (`Presentations`, `Working Papers`, `Honors and Awards`) | **Full** names in `Presentations`; web-style abbreviations in `Presented at:` lines |
| Research page (`/research.html`) | `src/content/papers/<slug>.json` → `presentations[]` | **Abbreviated** |
| Homepage "What's new" feed | `src/content/presentations/<slug>.json` → `venue` + `year` | **Abbreviated** |

The research page and the feed are independent: `research.astro` reads the
**paper's embedded `presentations` array**, not the `presentations`
collection. When a talk is relevant to both, the venue string must be updated
in **both** the paper JSON and the collection file. The feed only surfaces
talks whose `year` equals the current calendar year (resolved at build time).

## Venue formatting convention

**Website** (research page + feed) — one shape: `Venue Year (qualifier)`
- Abbreviate the org: `EFA`, `FIRS`, `FMA`. Year inline, no comma.
- Session/role qualifiers go in **parentheses**, omitted when none:
  `EFA 2026 (Doctoral Tutorial)`, `FIRS 2026 (Ph.D. Student Sessions)`,
  `FMA 2025`, `… Conference 2025 (poster)`.
- In the feed collection the `year` is a separate field, so the `venue`
  string drops the year: `EFA (Doctoral Tutorial)`.
- The research page joins entries with `, ` (`research.astro`).

**CV** (`cv.tex`) — two registers, by section:
- **Presentations section** (the formal record): **full** formal names —
  `European Finance Association Annual Meeting --- Doctoral Tutorial`
  (`---` is the LaTeX em-dash). Never abbreviate here.
- **"Presented at:" lines under Working Papers** (compact cross-reference):
  use the **website's abbreviations** for marquee associations only —
  `EFA Doctoral Tutorial (2026); FIRS Ph.D. Student Sessions (2026);
  FMA (2025)` — plus `UDel--Philadelphia Fed` (`--` = en-dash). Venues with
  no recognized initialism (LaBS workshop, Brown Bags) stay spelled out.
  Poster/role qualifiers go inside the year parenthetical: `(poster, 2025)`.

Keep one style per register — don't mix one abbreviated host into a list of
spelled-out ones (or vice versa). Safe-to-abbreviate tier: EFA, FIRS, FMA
(and peers like AFA, WFA, NBER); everything else spells out.

## cv.tex section structure

- **Working Papers** (`\begin{outerlist}`): each paper is an `\item` with the
  title (often `\href{...}`) and a right-aligned status via `\hfill
  \textit{Under Review}` / `\textit{Work in Progress}`. A per-paper venue
  list can hang beneath the title as `\\ {\small\textit{Presented at: …}}`
  using **semicolons** between venues (several venue names contain internal
  commas, e.g. "The Graduate Center, CUNY", so commas would be ambiguous),
  with years in parentheses.
- **Presentations**: `\textbf{<year>}` headings, each wrapping an
  `\begin{innerlist}` of venues separated by `\vspace{1mm}`.
- **Honors and Awards**: items are `\textit{...}` only — **no `\textbf`**.
  Italic is the house style here; don't reintroduce bold.

Escape `&` as `\&` everywhere in LaTeX.

## Build & verify the CV — never ship blind

`npm run build:cv` runs `pdflatex` twice and copies `cv.pdf` into `public/`.

**Job-market variants**: `npm run build:cv:jm` builds `cv_us.pdf` (letter,
Job Market Paper section, Work Authorization) and `cv_eu.pdf` (A4,
Citizenship, no US immigration status) from the same `cv.tex` via
`\CVUS`/`\CVEU` toggles; paper bodies live in `\PaperSpecialization`/
`\PaperCollateral` macros so branches can't drift. The variants are
**gitignored and never published** — repo is public. After editing
`cv.tex`, rebuild and page-count **all three** (each is tuned to 2 pages).

After any `cv.tex` edit, **always**:

1. `npm run build:cv` and confirm `Output written on cv.pdf (… pages …)`.
2. **Check the page count.** This CV is tuned to **2 pages**. Adding a long
   venue name or list can silently push to 3 — the build won't warn you. If
   it grows, shorten wording or report back rather than shipping it.
3. Verify the actual rendered text with `pdftotext`, because LaTeX source
   looking right ≠ PDF looking right:
   ```bash
   pdftotext public/cv.pdf - | grep -i "<phrase you changed>"
   ```
   `pdftotext` renders `---` as `—`, so search for the em-dash form.

`Overfull \hbox` warnings are pre-existing and benign — they are not build
failures.

## Website data edits

- Add a talk → JSON in `src/content/presentations/<slug>.json`
  (`venue`, `year`, `paper`). Venues containing "Brown Bag" are filtered from
  the feed; only current-year talks appear.
- Add/edit a paper's research-page venue list → its
  `src/content/papers/<slug>.json` `presentations[]` array.
- After editing JSON, sanity-check it parses and rebuild the site:
  ```bash
  npm run build   # static output in dist/
  grep -o "Presented at:[^<]*" dist/research.html   # see rendered lines
  ```
- Keep year-format consistent **across papers** (inline year, no comma) —
  a `…Seminar, 2026` next to `EFA 2026 …` is the kind of drift to fix.

## Ship it: commit → push main → deploy → verify live

The `main` branch holds **source**; GitHub Pages serves the built `dist/`
from `gh-pages`. Per project convention, commit straight to `main` (don't
branch). Steps:

1. Stage **only** the files for this change. Leave unrelated pending edits
   (e.g. a stray `CLAUDE.md` change, local screenshots) out of the commit.
2. Commit, then `git push origin main`.
3. `npm run deploy` (Astro build → `gh-pages -d dist --dotfiles`). The
   `--dotfiles` flag is mandatory so `public/.nojekyll` ships; without it
   Jekyll strips Astro's `_astro/` CSS bundle.
4. **Verify live, and pick the sentinel carefully.** GitHub Pages serves a
   stale CDN copy for ~20–60s. Poll with a cache-buster, and key on a string
   that exists in the **new** build and is **absent** from the old one — a
   substring shared by both (e.g. a word that survived the edit) gives a
   false "it's live" positive:
   ```bash
   for i in $(seq 1 8); do
     out=$(curl -s "https://junbuluv.github.io/research.html?cb=$(date +%s)-$i" | grep -o "<sentinel>")
     [ -n "$out" ] && { echo "live: $out"; break; }
     sleep 20
   done
   ```

## Quick audit checklist

When asked to check consistency across CV + site:
- Same talks present in CV, research page, and (if current-year) the feed?
- Web abbreviated / CV full — and internally consistent within each surface?
- Year format uniform across papers on the web?
- Any venue in the CV's `Presentations` section but missing from a paper's
  `Presented at` list (a likely factual omission)?
- CV still 2 pages? Awards still italic-not-bold?
