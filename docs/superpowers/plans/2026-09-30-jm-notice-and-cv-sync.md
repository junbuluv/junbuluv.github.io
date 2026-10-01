# Plan: job-market notice + sync site/CV to the job-market master (2026-09-30)

## Decisions (interviewed)

- Homepage gets a job-market notice in the hero (approved verdict): navy-tint
  panel with a navy left rule, between the affiliation line and the bio,
  "I am on the 2026–2027 job market." + "Job Market Paper: <title> [PDF]".
- Website CV keeps its **format** (margin-label template, A4, 2 pages, no
  abstracts) but takes its **contents** from the job-market master CV
  (`job_market/materials/master/documents/cv.tex`, outside this repo).
- Public CV now carries the master's citizenship line
  ("South Korea, U.S. permanent residency") — reverses the 2026-08-25 choice.
- Sync all four site surfaces to the master: research page, homepage Fields
  line, teaching page, talk/award names.

## Content rule

Master wins on what is listed and how it is named (new/renamed papers,
coauthors, award names, references, dropped items). Where the master only
compresses detail that keeps the record accurate — exact semesters (Queens
Intro Macro gap year), the UDel/Philly Fed "poster" qualifier, per-year brown
bags, department lines — keep the website's precise version and flag it.

## CV (`cv.tex` → `public/cv.pdf`)

- Name "Jun Yoo"; contact = GC CUNY / New York, email, website (no LinkedIn).
- Education drops College of Staten Island; "B.A. in Economics".
- Research Fields: financial intermediation, empirical corporate finance,
  and small-business lending.
- Job Market Paper section always on (drop `\CVJM` + paper macros);
  Presented at: EFA Doctoral Tutorial (2026); FIRS Ph.D. Student Session (2026).
- Working Papers: Do Credit Guarantees Create Value? (w/ Bickmore);
  Debtor Protection and Home-Equity Pledging in Small-Business Lending
  (w/ Allen, Tourre). Work in Progress: CLO skin-in-the-game (w/ Zhang, Verhoff).
- Presentations: master's set/order, full names, FIRS "Session" singular,
  FMA North America sessions.
- Research Experience (3 RAs); TA moves to Teaching; teaching per master
  (adjunct first, Spring 2026 micro, "Fall 2025–Present", baruchfinance.com).
- Fellowships and Grants (master names); Additional Information
  (Software, Languages, Citizenship); References 2×2 incl. Vijverberg,
  Allen marked dissertation chair.
- Variant-only Work Authorization / Citizenship sections removed (now
  redundant/contradictory); `build:cv:jm` keeps letter/A4 copies.
- Verify: 2 pages for all three builds; pdftotext spot checks.

## Site

- `papers` schema: `section` enum (Job Market Paper / Working Papers /
  Work in Progress), `abstract` optional. Research page renders one section
  per group (JMP unnumbered). Paper JSON synced; `rules-discretion` →
  `debtor-protection`; two new papers.
- Homepage: notice panel reads the JMP entry; Fields line, meta description,
  keywords, JSON-LD `knowsAbout` per master; `materials/cv.json` updated.
- Teaching: econ-102 + Spring 2026; course links → baruchfinance.com.
- Talks/awards: FIRS "Ph.D. Student Session", FMA "Doctoral Student
  Consortium", travel-grant + research-grant names per master.
- Sitemap `<lastmod>` for /, research, teaching, cv.pdf.
- Docs: CLAUDE.md, cv-maintenance skill, AGENTS.md palette line.

## Ship

typecheck → build → visual check (desktop + mobile) → commits (CV; research;
data; homepage; docs) → push main → deploy → verify live with a new-only
sentinel.
