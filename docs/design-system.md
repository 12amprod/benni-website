# relapse — design system

Extracted from `src/styles.css` (the `@theme` block is the only source of tokens; Tailwind v4
is CSS-first and there is no `tailwind.config.js`), plus the hard constraints in `CLAUDE.md`.

This file exists to be **checked against, mechanically**. Every rule below is either true or
false of a given screen. Nothing here is a matter of taste.

---

## 1. Colour

Nine tokens. There are no others. A raw hex value anywhere in JSX or CSS outside the `@theme`
block is a violation.

| Token                  | Value     | Role                                              |
| ---------------------- | --------- | ------------------------------------------------- |
| `--color-canvas`       | `#000000` | The ground. Every photo is a night shot.          |
| `--color-surface`      | `#101012` | Panels                                            |
| `--color-elevated`     | `#1d1d1f` | Raised panels                                     |
| `--color-ink`          | `#f5f5f7` | Text                                              |
| `--color-ink-muted`    | `#a1a1a6` | Secondary text                                    |
| `--color-hairline`     | `#29292d` | Rules and borders                                 |
| `--color-paper`        | `#fcf8ef` | The one light value; the page inverts on it       |
| `--color-relapse`      | `#5ee34a` | Accent, from the poster artwork                   |
| `--color-relapse-pink` | `#ff2d78` | Second accent                                     |

**Spend rules — checkable by looking at one screenshot:**

- `--color-relapse` (green) appears **at most twice per viewport**. It is also the focus-ring
  colour, which does not count against the budget.
- `--color-relapse-pink` appears **at most twice on the entire site**.
- `--color-paper` is used **once per page** as a ground. Currently: the contact panel.
- On a `--color-paper` ground, the focus ring switches to `--color-canvas`
  (`[data-ground="paper"] :focus-visible`). Green on cream is ~1.7:1 and fails.
- Text on canvas is `--color-ink` or `--color-ink-muted`. Opacity modifiers
  (`text-ink/45`, `text-ink/60`) are permitted for labels only, never for body copy.

## 2. Photographic treatment

This is a design rule, not a component detail, because it governs every image on the site.

- Every photograph carries `.plate`: `filter: grayscale(1) contrast(1.08)`.
- Colour returns on `.plate-colour:hover` / `:focus-within`, over `1200ms var(--ease-big)`.
- **The archive sheet carries exactly one lit frame**, `.plate-lit`, which holds its colour at
  rest. Every other frame on the sheet is `.plate-dim` — greyscale *and* knocked back in
  brightness, so the lit one reads as chosen rather than merely saturated.
- Therefore, in a resting screenshot with no pointer over the page: **exactly one photograph is
  in colour, and it is on the archive sheet.** Zero is a violation (nothing is chosen); two or
  more is a violation (nothing is chosen). Every photograph outside the archive sheet is
  monochrome at rest, without exception.

## 3. Typography

Three faces, three jobs. No fourth face. No font-size in `px` anywhere.

| Face             | Token            | Carries                                               |
| ---------------- | ---------------- | ----------------------------------------------------- |
| TeX Gyre Adventor | `--font-display` | Headlines, wordmark, nav, buttons                     |
| JetBrains Mono   | `--font-mono`    | Indices, dates, times, counts, status, the meta line   |
| System sans      | `--font-sans`    | Running prose only                                     |

- Adventor ships **Regular and Bold only**. Display type is `font-bold` or nothing. Any
  `font-medium` / `font-semibold` on display type is a violation.
- `h1, h2, h3` get `--font-display` from the base layer. Do not re-declare it.

**The size scale. Three display sizes exist. There is no fourth.**

| Token            | Value                            | Used for                       |
| ---------------- | -------------------------------- | ------------------------------ |
| `--text-brand`   | `clamp(3.5rem, 15vw, 9rem)` / lh `0.84` | The wordmark **only**   |
| `--text-section` | `clamp(1.75rem, 3.6vw, 2.75rem)` / lh `1.06` | Section headings   |
| `--text-entry`   | `1.125rem` (18px)                | Named entries — act names, edition names |
| `--text-label`   | `0.6875rem` / lh `1.45`          | Every mono label               |

`--text-entry` is the size a *name* is set at inside a list — an act in the lineup, an edition
in the table. It is display type at `--tracking-brand` like the other two. It is currently
rendered via Tailwind's default `text-lg` rather than a token, which is a violation of the
"add a token, don't hardcode" rule and should be tokenised.

- **The wordmark is the only thing on the site allowed to be large.** Nothing else may use
  `--text-brand`.
- Section headings are set in the **regular** weight at `--tracking-brand`. Bold section
  headings read as a sports poster and are a violation.

**Tracking.** Two values, opposite ends:

- `--tracking-brand: -0.04em` — display sizes only. Below ~30px it closes up.
- `--tracking-label: 0.16em` — mono labels.

**The `label` utility** is the single way to set a mono label. It is
`--font-mono` + `--text-label` + `--tracking-label` + `uppercase` + `tabular-nums`.
Hand-rolling those five properties instead of using `label` is a violation.

## 4. Motion

**Two easing curves. A third curve is a violation.**

- `--ease-big: cubic-bezier(0.887, 0, 0.113, 1)` — anything large and spatial
- `--ease-ui: cubic-bezier(0.4, 0, 0.15, 1)` — small UI

**Durations in use** — these are the house tempo; slow is the aesthetic:

| What                    | Duration |
| ----------------------- | -------- |
| `.reveal` fade + rise   | `900ms`  |
| `.mask-reveal` line     | `1100ms` |
| `.wipe-reveal` clip     | `1100ms` |
| `.plate` colour return  | `1200ms` |
| `.diptych-half` flex    | `600ms`  |
| Hero mask-up on load    | `1200ms` |

**Two tempos, and the band between them is empty.** This is measured off the reference
(`docs/bar.md` M7), not invented:

- **Controls and small UI: 250–450ms**, on `--ease-ui`. Hovering a control is immediate.
- **Photographs changing state: 1100–1200ms**, on `--ease-big`. A picture moves cinematically.
- **Nothing sits in the 500–1500ms band on a control**, and nothing under 1s on a photograph.
  A 900ms hover is not "considered", it is sluggish; a 300ms photograph is not "snappy", it is
  cheap. The 600ms diptych flex is the one legacy exception and should migrate to 450ms.

Stagger between siblings is `90ms`, set via `--reveal-delay`.

**Exactly three reveal modifiers exist, and an element carries at most one:**

| Class          | Behaviour            | For                    |
| -------------- | -------------------- | ---------------------- |
| `.reveal`      | fade + rise          | blocks of several things |
| `.mask-reveal` | line out of a mask   | headlines              |
| `.wipe-reveal` | `clip-path` wipe     | photographs            |

**Nothing on the page may start at `opacity: 0` in the prerendered HTML.** Reveals are driven
by `data-reveal="pending"`, which is applied by `src/lib/scroll-motion.ts` **on the client**.
With JS disabled the page must be complete and readable.

## 5. Reduced motion — tiered, not switched off

`@media (prefers-reduced-motion: reduce)` must leave the page composed, not dead:

- Tier 1: large travelling surfaces removed — `.scroll-zoom`, `.hero-exit` get `transform: none`,
  `scroll-behavior: auto`.
- Tier 2: displacement removed but a **220ms cross-fade remains** — `.reveal` keeps opacity,
  loses transform; `.mask-reveal` and `.wipe-reveal` collapse to the same fade.
- The diptych hover-grow does not run at all.

## 6. Layout & spacing

- Content column: `mx-auto max-w-6xl px-5 sm:px-6`. The gallery may break this and go full-bleed;
  if it does, it must do so deliberately and at every breakpoint.
- Section rhythm: `py-28 sm:py-40`, separated by `border-hairline border-t`.
- `--spacing-header: 3rem` — the sticky header. `scroll-padding-top` is set to it.
- `--spacing-metaline: 2.25rem` — reserved on `body` as `padding-block-end`. **Nothing may sit
  underneath the metadata line.**
- **Rules are borders, not gaps.** A gap would make a two-column frame wider than two squares,
  and the row would stop coming out level. Grids use `border-t border-l` on the container and
  `border-r border-b` on each cell.
- No rounded corners on photographic frames. No drop shadows anywhere.

## 7. Structure & accessibility

- Semantic HTML carries accessibility. Real `<h1>`/`<nav>`/`<main>`/`<footer>`, one `<h1>` per
  page, `alt` on every image, visible focus states. ARIA does not get to paper over a `<div>`
  that should have been a `<button>`.
- The metadata line reads `data-meta-index` / `-name` / `-detail` / `-type`, written into the
  markup **at build time** by `metaAttrs()` in `src/lib/section-meta.ts`, so it works from the
  first frame.
- Mobile first. **375px must work.** `document.documentElement.scrollWidth` must equal the
  viewport width — no horizontal scroll, ever.

## 8. Hard constraints from CLAUDE.md

These are not style preferences. Breaking one fails the build or the brief.

- **No backend, no server, no API route, no database.** Every route prerenders; `dist/client` is
  the whole deployable site.
- **No client-side fetching on first paint.** Loaders run at build time.
- **All visitor-facing copy is German and lives in `src/content/site.ts`** — never inline in JSX.
- Import via the `#/*` alias. Never `../../`.
- Components: PascalCase filename, named export, one component per file.
- `src/routeTree.gen.ts` is generated. Never edit it.
- New design values go in the `@theme` block as tokens. Never a hardcoded hex or px font size.
