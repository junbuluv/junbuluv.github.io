# Webpage Design Polish — Burgundy Accent + Light Structural Refresh

**Date:** 2026-06-01
**Status:** Approved (design), pending implementation plan
**Scope:** Visual polish only. No content, routing, build, or deploy changes.

## Goal

Introduce slight color contrast and improve the overall design of
junbuluv.github.io without a layout overhaul. Today the palette is entirely
warm neutrals (cream background, brown text, taupe links) with no real accent.
We add one restrained **burgundy** accent and a light structural refresh
(spacing, soft cards, hover micro-interactions), keeping the academic,
serif, calm character intact.

## Decisions (locked during brainstorming)

- **Accent:** Burgundy (option A), at **"Medium" intensity** — accent on
  interactive elements **plus** thin hairlines/underlines on structure.
- **All burgundy hairlines/underlines are 1px** (header under-rule, section
  heading underline, active-nav underline). Thin and consistent.
- Cream background and brown body text are unchanged.
- Polish scope: **all four** — spacing & rhythm, content cards, hero/header
  polish, micro-interactions.

## Palette additions (`tailwind.config.mjs`)

Add a `burgundy` token group; keep `ink`, `cream`, `rule` as-is. Fix the stale
comment that calls the existing taupe "burgundy."

```js
burgundy: {
  DEFAULT: '#7a2e3a', // links, active nav, CV button, badge text, hairlines
  hover:   '#9a4452', // link / interactive hover
  tint:    '#f6e9eb', // badge background, faint fills
  line:    '#d8b6bc', // soft burgundy border (badge border, card hover border)
},
cream: {
  DEFAULT: '#f7f3e9',
  alt:     '#ede8da',
  card:    '#fffdf8', // NEW: feed/paper card surface (a hair lighter than bg)
},
```

`rule` (`#ddd8d2`) remains the default neutral border for cards at rest.

## Component changes

### Global (`src/styles/global.css`)
- Links: `text-ink-accent` → **burgundy DEFAULT**; hover → **burgundy hover**
  with underline (transition timing unchanged).
- Add a reusable `.card` component class: `cream.card` background, 1px `rule`
  border, rounded, padded; hover lifts (`translateY(-2px)`), border → `burgundy.line`,
  soft burgundy-tinted shadow. Hover transforms must be disabled under the
  existing `prefers-reduced-motion` block.

### Header / nav (`src/layouts/BaseLayout.astro`)
- Header `border-b border-rule` → **1px burgundy** bottom border.
- Active nav item: burgundy text + **1px** burgundy underline. Inactive items
  unchanged (soft → burgundy on hover).
- `theme-color` meta stays `#5c524a` or updates to burgundy — cosmetic only;
  update to `#7a2e3a` for consistency.
- Footer: keep, align color with palette (minor).

### Homepage (`src/pages/index.astro`)
- **Hero:** tighten spacing/rhythm; keep headshot frame (border-rule).
- **CV button:** border burgundy, hover fills burgundy with white text.
- **Section heading** ("What's new"): inline, with a **1px** burgundy underline.
- **Year label:** burgundy, semibold.
- **Feed items:** plain `<li>` rows → **soft cards** (`.card`), badge +
  text laid out in a row; hover lift. Badge: burgundy text, `burgundy.line`
  border, `burgundy.tint` background.

### Research (`src/pages/research.astro`)
- Each paper wraps in the same **soft card** (`.card`). Abstract toggle and its
  `astro:page-load` re-arm logic stay exactly as-is (per CLAUDE.md gotcha).
- Status/links adopt burgundy.

### Teaching (`src/pages/teaching.astro`)
- Keep the muted meta-line list (no cards — avoid over-carding). Apply spacing
  consistency; institution headings and `[course website]` links adopt burgundy.

### Contact (`src/pages/contact.astro`)
- Spacing consistency; profile links adopt burgundy via the global link color
  (likely no per-page change needed).

## Non-goals (YAGNI)

- No new pages, no layout/column changes, no font change.
- No dark mode.
- No new dependencies.
- Teaching/contact do not get card treatment.

## Verification

- `npm run typecheck` clean.
- `npm run build`; spot-check `dist/index.html`, `research.html`,
  `teaching.html`, `contact.html` render with the new classes.
- Visual check at `npm run dev`: burgundy hairlines are 1px; cards lift on
  hover; CV button fills on hover; reduced-motion disables transforms.
- Deploy via `npm run deploy` only after user confirms the live preview.

## CLAUDE.md follow-up

The "Stack at a glance" palette note says burgundy/cream and is now accurate;
add the `burgundy` token + `cream.card` to the documented palette and note the
`.card` component class.
