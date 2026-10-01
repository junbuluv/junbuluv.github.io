# Session log — 2026-09-30 — job-market notice + CV/site sync

## Goal
Add an "on the 2026–2027 job market" notice to the homepage; refresh the
website CV's contents from the job-market master CV while keeping its format.

## Decisions (interview + follow-up)
- CV keeps its margin-label format, A4, 2 pages; abstract for the job market
  paper only (added as a follow-up request).
- Citizenship line ("South Korea, U.S. permanent residency") now on the
  public CV — reverses the 2026-08-25 choice.
- Sync research page, homepage Fields line, teaching page, talk/award names.

## Shipped (main c712106..f8a23fd; site deployed to gh-pages)
- e71942b CV synced to the master; JMP section always on; variant-only
  sections removed.
- 065f043 Papers `section` enum + optional abstract; research page grouped
  into Job Market Paper / Working Papers / Work in Progress.
- 0f212a9 Teaching, talk, and award data per the master.
- 9fcba91 Homepage hero notice (reads the JMP from papers); fields, meta,
  JSON-LD per the master; CV stamp wraps as a unit on phones.
- d2d00ad Sitemap lastmod.
- 3ca6a10 Docs: CLAUDE.md, cv-maintenance skill, AGENTS.md, .gitignore
  comment, plan.
- f8a23fd JMP abstract in the CV.

## Verification
typecheck 0 errors; build clean; all three CV builds 2 pages (A4, letter,
A4); desktop 1280×900 + mobile 390×844 screenshots; abstract toggle works;
live sentinels confirmed (home notice, research WIP heading, teaching
baruchfinance.com, CV fourth reference, CV JMP abstract).

## Remaining items, resolved 2026-10-01 (interview)
- Queens Intro Macro: Jun taught 2023–24 too, so the master was right. The
  teaching page adds Fall 2023 and Spring 2024, and the CV shows Fall
  2022–Spring 2025 (5cd8455).
- UDel–Philadelphia Fed: "(poster)" added to the master CV in the
  job_market repo (b694107); master only, existing school packets untouched
  per that repo's rules. Three unsubmitted packets still have the old line.
- Bio: Jun's wording covering the JMP, credit guarantees, and debtor
  protection (b560f0c).
- Job-market notice now hides itself on the first build after 2027-06-30,
  including the meta-description clause and keywords (23cb9cf).
- build:cv:jm and the letter/A4 copies removed; cv.tex is plain A4 again
  (d6b3df5). Stray home-desktop.png deleted. Sitemap lastmod (a9ec54e).
- Intro tightened from 53 to 23 words: research question plus one topic per
  paper (lender specialization, credit guarantees, debtor protection).
