# Architecture

Why **junbuluv.github.io** is built the way it is. For commands, see `CLAUDE.md`.
For collaboration conventions, see `AGENTS.md`.

## The core idea

This is an academic CV site that needs to satisfy three constraints:

1. **Be indexable.** Search engines and citation crawlers must find every
   paper, presentation, and contact link without executing JavaScript.
2. **Be maintainable by one person.** Adding a talk should be one new file,
   not a multi-page diff.
3. **Survive long URLs.** `research.html` has been linked from CVs and
   SSRN pages for years. The migration must not break those.

The shape that emerges:

```
                Astro 5 (static output, build.format: 'file')
                ─────────────────────────────────────────────
src/content/                       dist/                   gh-pages branch
papers/*.json                ──►   research.html      ──►  /research.html
presentations/*.json         ──►   index.html         ──►  /index.html
awards/*.json                ──►     (What's new)
teaching/*.json              ──►   teaching.html      ──►  /teaching.html
                                   contact.html       ──►  /contact.html
public/cv.pdf                ──►   cv.pdf             ──►  /cv.pdf
public/sitemap.xml           ──►   sitemap.xml        ──►  /sitemap.xml
```

`npm run deploy` builds and force-pushes `dist/` to `gh-pages`. GitHub Pages
serves `gh-pages`; `main` is the source-of-truth working branch.

## Why Astro

- **Zero JS by default.** Every page is plain HTML at rest. The only client
  script is the abstract-toggle handler on `research.html` — a handful of
  lines, no framework.
- **Content collections.** Adding a talk is a JSON file. Zod schemas in
  `src/content/config.ts` mean a missing `year` is a build error, not a
  silently broken page.
- **`build.format: 'file'`.** Astro defaults to directory-style URLs
  (`/research/`); we override to `.html` so the years of existing inbound
  links keep working.

## Why Tailwind (no JS framework)

The original site was hand-written CSS with custom properties (`--accent`,
`--cream`, etc.). Tailwind lets us keep that vocabulary as a typed config
(`tailwind.config.mjs`) and apply it inline without losing the burgundy/cream
serif identity. No React or other framework — the site has no interactive
state worth managing in JS.

## Why content collections, not MDX

The site has prose in five places (bio, paper abstracts, contact lines, and
the institution headings on teaching/research). None of it has math, code,
or embedded components. JSON entries with a Zod schema give us validation
and typed access; MDX would be overkill and complicate localization later.

## Why hand-maintained `sitemap.xml`

The `@astrojs/sitemap` integration auto-discovers pages but cannot include
arbitrary assets like `/cv.pdf` and `/discretion.pdf` without extra
configuration, and it generates a sitemap-index that splits across files.
For a four-page site with two indexed PDFs, a hand-maintained
`public/sitemap.xml` is simpler and preserves the existing URL.

## Why `gh-pages` npm package for deploy

The previous workflow mirrored `main` to `gh-pages`. After migrating to a
build pipeline, `gh-pages` must contain `dist/` contents, not source. The
`gh-pages` npm package (`npx gh-pages -d dist`) is a one-line deploy that:

- Creates an orphan-branch commit on `gh-pages` containing only `dist/`.
- Force-updates the remote `gh-pages` branch.
- Leaves `main` untouched, so source and built output never collide.

## File layout (annotated)

```
.
├── CLAUDE.md            # project memory for Claude Code (commands, conventions)
├── AGENTS.md            # AI-agent collaboration rules
├── ARCHITECTURE.md      # this file
├── astro.config.mjs     # static output, file-format URLs, Tailwind integration
├── tailwind.config.mjs  # burgundy/cream palette + Palatino serif stack
├── tsconfig.json        # strict Astro tsconfig + path aliases
├── package.json         # scripts: dev, build, build:cv, deploy, typecheck
├── cv.tex               # LaTeX source of record for the CV
├── cv.pdf               # built CV (copied to public/ during build)
├── public/              # static assets shipped at site root
│   ├── cv.pdf
│   ├── discretion.pdf
│   ├── sitemap.xml      # hand-maintained
│   ├── robots.txt
│   └── google*.html     # Search Console verification
└── src/
    ├── content/
    │   ├── config.ts            # Zod schemas for all collections
    │   ├── papers/*.json
    │   ├── presentations/*.json
    │   ├── awards/*.json
    │   └── teaching/*.json
    ├── layouts/
    │   └── BaseLayout.astro     # nav + footer + SEO + JSON-LD slot
    ├── pages/
    │   ├── index.astro          # bio + "What's new" feed
    │   ├── research.astro       # papers + presentations
    │   ├── teaching.astro       # courses by institution
    │   └── contact.astro
    └── styles/
        └── global.css           # Tailwind directives + body reset
```
