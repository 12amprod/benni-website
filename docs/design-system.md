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

The bar is **apple.com**, measured off its iPhone and MacBook Pro pages on 2026-11-19 — not
the slow, cinematic tempo `docs/bar.md` M7 recorded off remyshoots, which this replaces.
Quick and soft is the aesthetic. Slow reads as heavy, not as considered.

**Two easing curves. A third curve is a violation.** Both are apple.com's own.

- `--ease-ui: cubic-bezier(0.4, 0, 0.6, 1)` — anything changing state. Soft out, soft in, no
  overshoot. (118 rules on the MacBook Pro page use it.)
- `--ease-enter: cubic-bezier(0, 0, 0.2, 1)` — anything arriving on screen; it decelerates
  into place.

**Durations** — tokens in `:root` in `src/styles.css`, except hover/press, which use Tailwind's
`duration-300`:

| What                                   | Duration | Token / class        |
| -------------------------------------- | -------- | -------------------- |
| Hover, press, menu, controls           | `300ms`  | `duration-300`       |
| Page change (crossfade)                | `350ms`  | `--duration-page`    |
| Photograph into / out of enlarged view | `450ms`  | `--duration-photo`   |
| Stepping between enlarged photographs  | `300ms`  | `--duration-step`    |
| A frame rising into place              | `650ms`  | `--duration-reveal`  |

Nothing takes a second. apple.com's controls run at 240–500ms and its content arrives in
about 650ms; there is no third, slower tempo.

**How frames arrive — one movement, two triggers.** A frame fades up the last 30px into place
(apple.com's StaggeredFadeIn), staggered 130ms from its neighbour, at most four steps deep:

- The first six frames on a page, counted across all its groups, rise as the page opens —
  `motion-safe:animate-rise`, a CSS animation that runs from first paint without JavaScript.
- Every later frame waits below the fold and rises when it is scrolled to — `reveal()` in
  `src/lib/motion.ts` sets `data-reveal` on it **on the client**, and only if it mounted below
  the fold. Nothing on screen is ever hidden by script, so nothing flashes.

**Nothing waits on JavaScript to become visible.** With JS disabled every picture is there; the
opening frames still rise, because that is CSS.

**The enlarged view grows out of the grid** — the zoom of the iPhone's Photos app, as a view
transition named `photo`: the frame grows into the whole picture and shrinks back into its
place on close. The click waits up to 300ms for the picture so the frame grows into it.

**Surfaces over the page are frosted** — `backdrop-blur` with `backdrop-saturate-180` over a
translucent `canvas`, as apple.com's bars are: the phone bar and the phone menu.

**Not on this site, because apple.com has none of them:** a preloader or counter, a custom
cursor, smooth-scroll hijacking, WebGL distortion, a bounce.

## 5. Reduced motion — nothing moves

With `prefers-reduced-motion: reduce` the page is complete and still: no opening rise
(`motion-safe:`), no scroll reveal (`prefersMotion()` in `src/lib/motion.ts`), no view
transitions (neither started nor animated), no menu fade. Every state change still happens —
it simply happens at once.

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
