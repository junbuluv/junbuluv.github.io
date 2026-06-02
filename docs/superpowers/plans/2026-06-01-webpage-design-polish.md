# Webpage Design Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a restrained burgundy accent and light structural polish (soft cards, 1px hairlines, hover micro-interactions) to junbuluv.github.io without a layout overhaul.

**Architecture:** Introduce a `burgundy` token group and a `cream.card` surface in the Tailwind config, add a reusable `.card` component class in `global.css`, repoint links and accent elements at burgundy, and apply 1px burgundy hairlines/underlines plus soft cards across the four pages. Cream background and brown body text are unchanged.

**Tech Stack:** Astro 5 (static), Tailwind 3 (`@astrojs/tailwind`), TypeScript (`astro check`). No test framework — verification is `npm run typecheck`, `npm run build`, and grepping the built `dist/` output for expected classes/values, plus a manual `npm run dev` visual check at the end.

**Spec:** `docs/superpowers/specs/2026-06-01-webpage-design-polish-design.md`

---

### Task 1: Add burgundy + cream.card palette tokens

**Files:**
- Modify: `tailwind.config.mjs:6-19`

- [ ] **Step 1: Add the tokens and fix the stale comment**

Replace the `colors` block (currently lines 6–19) with:

```js
      colors: {
        // Burgundy accent over a warm cream/brown base. Burgundy drives links,
        // active nav, the CV button, badges, and 1px hairlines; ink/cream/rule
        // remain the neutral base.
        ink: {
          DEFAULT: '#34302d', // body text
          soft: '#6e6862',    // secondary text
          accent: '#5c524a',  // legacy taupe (kept for non-accent borders)
          hover: '#7a6e64',   // legacy hover
        },
        burgundy: {
          DEFAULT: '#7a2e3a', // links, active nav, CV button, badge text, hairlines
          hover: '#9a4452',   // link / interactive hover
          tint: '#f6e9eb',    // badge background, faint fills
          line: '#d8b6bc',    // soft burgundy border (badges, card hover)
        },
        cream: {
          DEFAULT: '#f7f3e9', // page background
          alt: '#ede8da',     // chip / panel background
          card: '#fffdf8',    // card surface (a hair lighter than the page)
        },
        rule: '#ddd8d2',      // borders, dividers
      },
```

- [ ] **Step 2: Verify the config is valid and builds**

Run: `npm run build`
Expected: build completes, "4 page(s) built", no Tailwind/config error. (Tailwind only emits utilities once they're used, so no CSS changes yet — this step just confirms the config parses.)

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.mjs
git commit -m "Add burgundy accent + cream.card palette tokens"
```

---

### Task 2: Global link color + reusable .card class

**Files:**
- Modify: `src/styles/global.css:16-27` (link colors), `:29` (components layer), `:74-89` (reduced-motion)

- [ ] **Step 1: Repoint links to burgundy**

Replace the `a` / `a:hover` rules (currently lines 16–26) with:

```css
  a {
    @apply text-burgundy no-underline;
    transition:
      color 200ms ease,
      text-decoration-color 200ms ease,
      background-color 200ms ease;
  }

  a:hover {
    @apply text-burgundy-hover underline;
  }
```

- [ ] **Step 2: Add the `.card` component class**

Inside `@layer components { ... }`, immediately after the opening line `@layer components {` (line 29), insert:

```css
  /* Soft raised card used for the What's-new feed and research papers.
     Gentle hover lift; border warms to burgundy. */
  .card {
    @apply rounded-lg border border-rule bg-cream-card p-4;
    transition:
      transform 150ms ease,
      border-color 150ms ease,
      box-shadow 150ms ease;
  }

  .card:hover {
    @apply border-burgundy-line;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(122, 46, 58, 0.08);
  }
```

- [ ] **Step 3: Disable the card lift under reduced-motion**

Inside the existing `@media (prefers-reduced-motion: reduce)` block, after the `.reveal { ... }` rule (around line 88), add:

```css
  .card:hover {
    transform: none;
    box-shadow: none;
  }
```

- [ ] **Step 4: Build and verify burgundy + card CSS is emitted**

Run: `npm run build && grep -ro "7a2e3a" dist/_astro/*.css | head -1`
Expected: at least one match (the burgundy link color is now compiled into the CSS bundle).

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "Burgundy links + reusable .card component class"
```

---

### Task 3: Header hairline, active-nav underline, theme-color

**Files:**
- Modify: `src/layouts/BaseLayout.astro:41` (theme-color), `:63` (header border), `:76-81` (active nav)

- [ ] **Step 1: Update the mobile theme-color to burgundy**

Replace line 41:

```html
    <meta name="theme-color" content="#7a2e3a" />
```

- [ ] **Step 2: Make the header bottom hairline burgundy**

Replace the `<header ...>` opening tag (line 63):

```html
    <header class="sticky top-0 z-50 border-b border-burgundy bg-cream/80 backdrop-blur-md">
```

(`border-b` is 1px by default in Tailwind — this is the thin hairline.)

- [ ] **Step 3: Burgundy active nav with a 1px underline**

Replace the `class:list` array for nav items (currently lines 76–81) with:

```astro
                  class:list={[
                    'text-[0.92rem] tracking-[0.02em] hover:no-underline',
                    item.key === active
                      ? 'border-b border-burgundy pb-0.5 font-semibold text-burgundy'
                      : 'text-ink-soft hover:text-burgundy',
                  ]}
```

- [ ] **Step 4: Build and verify**

Run: `npm run build && grep -o "border-burgundy" dist/index.html | head -1`
Expected: match found (active nav underline class present in built homepage).

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "Burgundy nav hairline, active underline, theme-color"
```

---

### Task 4: Homepage — CV button, section heading, year label, feed cards

**Files:**
- Modify: `src/pages/index.astro:136` (CV button), `:151` (section heading), `:156` (year label), `:155-164` (feed items)

- [ ] **Step 1: Burgundy CV button**

Replace the CV button `<a>` class (line 136):

```astro
                class="inline-block rounded border border-burgundy px-5 py-2 text-[0.93rem] transition-colors hover:bg-burgundy hover:text-white hover:no-underline"
```

- [ ] **Step 2: Underline the "What's new" heading (1px burgundy)**

Replace line 151:

```astro
    <h2 class="mb-5 inline-block border-b border-burgundy pb-1 text-[1.3rem] font-bold text-ink">What's new</h2>
```

- [ ] **Step 3: Burgundy year label**

Replace line 156:

```astro
            <h3 class="mb-2 text-[0.95rem] font-semibold tracking-wide text-burgundy">{year}</h3>
```

- [ ] **Step 4: Convert feed rows to soft cards**

Replace the `<ul>...</ul>` feed block (currently lines 157–164) with:

```astro
            <ul class="space-y-2.5">
              {items.map((item) => (
                <li class="card flex items-start gap-3 text-[0.95rem] leading-snug">
                  <span class="mt-[1px] inline-block whitespace-nowrap rounded-md border border-burgundy-line bg-burgundy-tint px-2 py-[2px] text-[0.7rem] uppercase tracking-wide text-burgundy">
                    {item.type}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
```

- [ ] **Step 5: Typecheck, build, and verify the cards rendered**

Run: `npm run typecheck && npm run build && grep -o 'class="card flex' dist/index.html | head -1`
Expected: typecheck 0 errors; build OK; grep finds the feed card class in the built homepage.

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro
git commit -m "Homepage: burgundy CV button, heading underline, feed cards"
```

---

### Task 5: Research papers as soft cards

**Files:**
- Modify: `src/pages/research.astro:38` (section heading), `:39-42` (paper list/cards)

- [ ] **Step 1: Underline the "Working Papers" heading**

Replace line 38:

```astro
    <h2 class="mb-5 inline-block border-b border-burgundy pb-1 text-[1.3rem] font-bold text-ink">Working Papers</h2>
```

- [ ] **Step 2: Card-ify each paper, burgundy list markers**

Replace the `<ol>` opening tag (line 39) and the `<li>` opening tag (line 42):

```astro
    <ol class="list-decimal space-y-5 pl-6 marker:font-semibold marker:text-burgundy">
```

```astro
          <li class="card reveal text-[0.98rem] leading-relaxed">
```

(Leave everything inside the `<li>` — title, links, status, coauthors, the `.abstract-wrapper` toggle, and presentations — exactly as-is. The `armAbstracts()` script and its `astro:page-load` listener are unchanged, per the CLAUDE.md View-Transitions gotcha.)

- [ ] **Step 3: Typecheck, build, verify**

Run: `npm run typecheck && npm run build && grep -o 'class="card reveal' dist/research.html | head -1`
Expected: typecheck 0 errors; build OK; grep finds the paper card class.

- [ ] **Step 4: Commit**

```bash
git add src/pages/research.astro
git commit -m "Research: papers as soft cards with burgundy markers"
```

---

### Task 6: Teaching + contact accents

**Files:**
- Modify: `src/pages/teaching.astro:27` (heading), `:34` (institution heading); `src/pages/contact.astro:18` (heading)

- [ ] **Step 1: Underline the "Teaching" heading**

Replace `src/pages/teaching.astro` line 27:

```astro
    <h2 class="mb-5 inline-block border-b border-burgundy pb-1 text-[1.3rem] font-bold text-ink">Teaching</h2>
```

- [ ] **Step 2: Burgundy institution sub-headings**

Replace `src/pages/teaching.astro` line 34:

```astro
            <h3 class="mb-2 mt-4 text-[1rem] font-semibold text-burgundy">{institution}</h3>
```

- [ ] **Step 3: Underline the "Contact" heading**

Replace `src/pages/contact.astro` line 18:

```astro
    <h2 class="mb-5 inline-block border-b border-burgundy pb-1 text-[1.3rem] font-bold text-ink">Contact</h2>
```

(Contact links and profile links inherit burgundy automatically from the global `a` color set in Task 2 — no per-link change needed.)

- [ ] **Step 4: Typecheck, build, verify both pages**

Run: `npm run typecheck && npm run build && grep -l "border-burgundy" dist/teaching.html dist/contact.html`
Expected: typecheck 0 errors; build OK; both `dist/teaching.html` and `dist/contact.html` listed (heading underline present on each).

- [ ] **Step 5: Commit**

```bash
git add src/pages/teaching.astro src/pages/contact.astro
git commit -m "Teaching + contact: burgundy heading underline and accents"
```

---

### Task 7: Update CLAUDE.md palette documentation

**Files:**
- Modify: `CLAUDE.md` (Stack at a glance — Tailwind bullet)

- [ ] **Step 1: Document the new tokens and the .card class**

In the Tailwind bullet under "Stack at a glance", replace:

```markdown
- **Tailwind 3** via `@astrojs/tailwind` (no base styles; our own reset in
  `src/styles/global.css`). Burgundy/cream serif palette is the project's
  identity — defined in `tailwind.config.mjs` under `colors` and
  `fontFamily.serif`.
```

with:

```markdown
- **Tailwind 3** via `@astrojs/tailwind` (no base styles; our own reset in
  `src/styles/global.css`). Burgundy/cream serif palette is the project's
  identity — defined in `tailwind.config.mjs` under `colors` (the `burgundy`
  token group drives links, active nav, the CV button, badges, and 1px
  hairlines; `cream.card` is the card surface) and `fontFamily.serif`. The
  reusable `.card` component class (soft surface + hover lift) lives in
  `src/styles/global.css` and is used by the What's-new feed and research
  papers.
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "Document burgundy palette tokens and .card class in CLAUDE.md"
```

---

### Task 8: Final verification and deploy

**Files:** none (verification + deploy only)

- [ ] **Step 1: Full typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: 0 errors; "4 page(s) built".

- [ ] **Step 2: Visual check in the dev server**

Run: `npm run dev` and open <http://localhost:4321>. Confirm:
- Burgundy hairline under the nav is thin (1px); active nav item is burgundy with a 1px underline.
- "What's new" / section headings have a 1px burgundy underline; year label is burgundy.
- Feed items and research papers are soft cards; hovering lifts them and warms the border; the CV button fills burgundy on hover.
- Links across pages are burgundy.
- With OS "reduce motion" on, cards do not lift/transform.

Stop the dev server when done (Ctrl-C).

- [ ] **Step 3: Deploy (only after the above looks right)**

Run: `npm run deploy`
Expected: build + `gh-pages` publish, ending in "Published".

- [ ] **Step 4: Stop the visual companion server (cleanup)**

The brainstorm companion auto-exits after 30 min idle; no action required. Mockups persist under `.superpowers/brainstorm/` (gitignored).

---

## Self-Review

**Spec coverage:** Palette tokens (T1) ✓; global links + `.card` + reduced-motion (T2) ✓; header hairline + active underline + theme-color (T3) ✓; hero CV button + heading underline + year label + feed cards (T4) ✓; research cards with untouched abstract toggle (T5) ✓; teaching/contact accents, no cards (T6) ✓; CLAUDE.md follow-up (T7) ✓; verification + deploy gate (T8) ✓. The spec's "hero spacing tighten" is minor and folded into T4's button/heading edits; no separate task needed since the existing hero spacing is already close and no value is changed.

**Placeholder scan:** No TBD/TODO; every code step shows exact code and every verify step shows an exact command + expected output.

**Type/name consistency:** Token utilities used downstream (`text-burgundy`, `bg-burgundy-tint`, `border-burgundy-line`, `bg-cream-card`, `text-burgundy-hover`) all map to tokens defined in Task 1 / used in Task 2. The `.card` class defined in Task 2 is referenced in Tasks 4 and 5. Consistent.
