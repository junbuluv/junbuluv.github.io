# Plan: US/EU job-market CV variants (2026-08-25)

## Decisions (interviewed)

- Keep the margin-label template; variants differ in content + paper size only.
- US work-auth line: "U.S. permanent residency application in process; no
  visa sponsorship required." (mechanism only, no marriage detail).
- Variants are **repo-local, never published**: site keeps general `/cv.pdf`;
  `cv_us.pdf` / `cv_eu.pdf` are gitignored build outputs (repo is public, so
  committing them would publish via GitHub anyway).

## Architecture — one source, three outputs

`cv.tex` remains the single source and alone builds the general (website) CV
on A4. Variant builds define a macro before input:

- `\CVUS` → letter paper, Job Market Paper section split, Work Authorization
  section.
- `\CVEU` → A4, Job Market Paper section split, Citizenship section
  (Republic of Korea), **no** green-card mention.
- `\CVJM` is derived from either (shared JM content).

Paper bodies are defined once as `\PaperSpecialization` / `\PaperCollateral`
macros; the JM branch renders paper 1 under its own "Job Market Paper"
section (avoids the long-title `\hfill` collapse), the general branch keeps
both under Working Papers.

## Content changes in all versions

- Teaching entries gain their roles (`--- \textit{Adjunct Lecturer}`) to
  match the site data — sole-instructor evidence matters for the market.

## Build

- `npm run build:cv` unchanged (general → `public/cv.pdf`).
- New `npm run build:cv:jm` → `cv_us.pdf` + `cv_eu.pdf` at repo root via
  `pdflatex -jobname=cv_us "\def\CVUS{}\input{cv.tex}"` (×2 each).
- `.gitignore`: `cv_us.*`, `cv_eu.*`.

## Verify

Page sizes (letter 612×792 / A4 595×842), both variants 2 pages, work-auth
line present only in US, citizenship only in EU, JMP label absent from the
general build, teaching roles in all three. Deploy (general CV changed) and
verify live.
