# junbuluv.github.io

Academic personal webpage. Static site served by GitHub Pages.
Live: https://junbuluv.github.io

## Structure

- `index.html`, `research.html`, `teaching.html`, `contact.html` — main pages
- `style.css` — shared styles
- `cv.tex` → `cv.pdf` — CV (LaTeX source + compiled PDF)
- `sitemap.xml`, `robots.txt` — SEO
- `.claude/settings.local.json` — Claude permission config (not memory)

## Build / deploy

- **CV**: `pdflatex cv.tex` (run twice for cross-references)
- **Site deploy**: push to BOTH `main` AND `gh-pages` branches. GitHub Pages
  serves from `gh-pages`; `main` is the source-of-truth working branch.
  Pushing to `main` alone does NOT deploy.

## Conventions

- URLs: trailing slashes consistent across `<link rel="canonical">`,
  `og:url`, and `sitemap.xml` entries — keep them in sync.
- All pages include matching SEO keywords (`<meta name="keywords">`).

## Local files / gitignore

- `cv.aux`, `cv.log`, `cv.out`, `cv.fls`, `cv.fdb_latexmk`, `cv.synctex.gz` — LaTeX build artifacts
- `preview*.png`, `.DS_Store`, `.playwright-mcp/` — local artifacts
- `scholarship_application_2026-2027/` — private personal documents (W-2s etc.); never commit
