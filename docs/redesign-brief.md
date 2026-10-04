# relapse — redesign brief

A paste-ready prompt for an AI coding agent, plus the research behind it.

The reference site was taken apart on 2026-09-13 by fetching its HTML and its stylesheet.
Every value quoted below is copied from that source, not remembered.

---

## The prompt

> Paste everything between the rules into Claude Code, opened in this repository.

---

You are rebuilding **relapse** — a techno-and-rap event series at Hafenbar Hettstedt, plus
the photo archive of every edition so far. The site is German, static, and already exists in
this repo (React 19, TanStack Start, Tailwind v4, prerendered to `dist/client`, no backend).

Do not start over. Restructure what is here, keeping the constraints in `CLAUDE.md` intact:
all visitor-facing copy stays in `src/content/site.ts`, design tokens stay in the `@theme`
block of `src/styles.css`, and every route must still prerender to static HTML.

### The feeling

Three references, in priority order.

1. **Deftones — White Pony (2000).** Already the North Star of this repo: the wordmark is
   set in TeX Gyre Adventor because White Pony is set in ITC Avant Garde Gothic. Extend it.
   Washed-out, cold, lots of empty space, letters set almost touching
   (`--tracking-brand: -0.04em`). Sensual rather than aggressive. Never loud.

2. **A black-and-white diptych** — one frame split across the middle: the upper half a
   figure in black leather against near-black, the lower half the same pose against bright
   cream. Hard light, sunglasses, no colour. This split is not decoration; make it the
   site's structural signature. It becomes the entry gate and the login screen.

3. **remyshoots.co.za** — for craft, not for looks. Copy its restraint and its timing, not
   its layout. It is a photography portfolio; this is a party. Steal the engineering.

### The palette

Keep the existing dark ground and the poster accents already in `src/styles.css`:

| token                   | value     | role                                   |
| ----------------------- | --------- | -------------------------------------- |
| `--color-canvas`        | `#000000` | the ground; every photo is a night shot |
| `--color-surface`       | `#101012` | panels                                  |
| `--color-elevated`      | `#1d1d1f` | raised panels                           |
| `--color-ink`           | `#f5f5f7` | text                                    |
| `--color-ink-muted`     | `#a1a1a6` | secondary text                          |
| `--color-hairline`      | `#29292d` | rules and borders                       |
| `--color-relapse`       | `#5ee34a` | the accent, from the poster artwork     |
| `--color-relapse-pink`  | `#ff2d78` | second accent, used sparingly           |

Add exactly one token: a warm cream for the light half of every split.

```css
--color-paper: #fcf8ef;
```

That is the cream the reference site uses (`--cream:#fcf8ef`). It is warmer than white and
it is what makes the dark half read as *night* instead of as *off*.

Spend colour in one place per screen. Green is the accent; cream is structure; pink appears
maybe twice on the whole site.

### The typography

`--font-display` (TeX Gyre Adventor) already carries headlines, wordmark, nav, buttons.
It ships Regular and Bold only, so display type is `font-bold` or nothing.

Add a third role the site is currently missing: a **monospace utility face** for indices,
timecodes, dates, counts and status labels. The reference site pairs Inter with Roboto Mono
for exactly this. Self-host one woff2 next to the Adventor files and register it as
`--font-mono`. Everything technical — `01 / 08`, `23:00`, `vol.4`, `[geschlossen]` — is set
in it, uppercase, letter-spaced, small. This single addition is what will make the site read
as engineered rather than as a template.

### The structure

Keep the existing sections (`vol4`, `events`, `lineup`, `galerie`, `termine`, `location`,
`kontakt`) and the components that render them. Restructure how they are entered and moved
between:

- **An entry gate** before the homepage — see below.
- **A persistent chrome**: the header, the ticker and a bottom metadata line that survive
  navigation and morph rather than reload.
- **A metadata line** pinned to the bottom edge, mono, four slots — index, name, tag, type.
  The reference calls these `.meta-slot.meta-index / .meta-name / .meta-tag / .meta-type`.
  On the gallery it reads the current photo; on a lineup entry it reads the act. It is the
  HUD of a camera, and it is the cheapest way to make a site feel considered.
- **The gallery gets view modes**: slider, grid, list — one toggle, three layouts over the
  same data, the way the reference switches `.landing.view-slider.chrome-slider`.

### The motion

This is the part to get right, and none of it needs a 3D library.

**Page transitions — use the native View Transitions API, not a JS library.** This is what
the reference actually does, and it surprised me: there is no GSAP, no Barba, no Framer
Motion in its CSS. It names persistent elements and lets the browser tween between states.

```css
/* on the elements that survive navigation */
.site-header  { view-transition-name: chrome-top; }
.meta-line    { view-transition-name: chrome-bottom; }
.nav-drop     { view-transition-name: chrome-menu; }
```

```css
/* the whole choreography lives in tokens, so it can be retimed in one place */
:root {
  --vt-stage-dur:   1.6s;
  --vt-leave-dur:   1.6s;
  --vt-cross-dur:   1.6s;
  --vt-cross-delay: .33s;
  --vt-sheet-dur:   1s;
  --vt-meta-dur:    .45s;
  --vt-meta-in-delay: .45s;
  --vt-leave-fade:  .25s;
  --vt-ease: cubic-bezier(.887, 0, .113, 1);
}

::view-transition-old(.stage) { animation: stage-out var(--vt-stage-dur) var(--vt-ease) both; }
::view-transition-new(.stage) { animation: stage-in  var(--vt-stage-dur) var(--vt-ease) both; }
```

Two details worth copying exactly:

- **1.6 seconds.** That is four to five times longer than a normal UI transition, and it is
  the single biggest reason the reference feels cinematic instead of snappy. Slow is the
  aesthetic. Hold it.
- **Direction-aware reverse.** Every transition has a `-back` twin
  (`stage-in` / `stage-in-back`, `meta-out` / `meta-out-back`) so navigating backwards
  plays the animation in reverse rather than replaying it forwards. Set a
  `data-direction="forward|back"` attribute on `<html>` before starting the transition and
  select on it.

**Easing.** Use `cubic-bezier(.887, 0, .113, 1)` for anything large and spatial — it is an
almost symmetric hard-in, hard-out curve that makes big movement feel weighted. Use
`cubic-bezier(.4, 0, .15, 1)` for small UI. Two curves, nothing else.

**Masked text reveal.** Wrap each line in a clipping box and slide the line up out of it.
The negative-margin trick is what stops descenders being sliced off:

```css
.reveal-mask {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  margin-top: -0.25em;   /* give the mask room for ascenders/descenders */
  padding-top: 0.25em;   /* ...without moving the text */
}
```

Drive it with a `data-reveal` attribute and one `IntersectionObserver`, not a library. The
reference homepage carries twenty of them. Critically: the text must be **visible at rest**
and animate from there, never parked at `opacity: 0` waiting for a script that may not run.

**Directional wipes** with `clip-path`, animating `inset(0 0 0 100%)` → `inset(0)` for a
left-to-right reveal and `inset(0 100% 0 0)` for the mirror. Cheap, GPU-friendly, and the
reason its project transitions look like a film cut.

**An iris.** A fixed, full-bleed layer that opens a radial hole like a camera aperture —
the reference calls it `.iris-layer` and drives it with `--vig-size: 45% → 90%` and
`--vig-radius: min(114vh, 114vw)`. Use it once, on entry. It is a photography metaphor and
this is a photo archive.

**Micro-interactions**, in descending order of value: a custom cursor (`cursor: none` plus a
tracked element, with `mix-blend-mode: exclusion` so it inverts whatever it crosses); a
`cursor: grab` draggable gallery slider; `backdrop-filter: blur(20px)` on the menu overlay;
`overscroll-behavior: none` on the scroll container so the page never rubber-bands.

**Smooth scrolling.** Add Lenis. It is the one animation dependency worth the bytes, and
`ScrollTrigger`-style effects are unconvincing without it.

**Accessibility is not optional here.** The reference wraps its motion in four separate
`@media (prefers-reduced-motion: reduce)` blocks, including one that disables the view
transitions themselves. Do the same. Keep visible focus states. The gallery must be
keyboard-navigable.

### The entry gate and the login

Both are the diptych. Build the component once, use it twice.

`<SplitGate>` — two halves, full viewport, divided by a single hairline. One half is
`--color-canvas`, the other `--color-paper`, text inverted on each. Hovering or focusing a
half grows it (`flex: 1` → `flex: 1.6`) over `.6s` on `cubic-bezier(.887,0,.113,1)`; the
other half shrinks. On a phone it stacks vertically — which is the source diptych's own
orientation, so mobile is the truer layout, not the degraded one.

**Use 1 — the entry gate.** Before the homepage, in front of a muted looping clip, with a
preloader counting `00%` → `100%` in mono. The two options mirror the reference's own
`enter with sound` / `[enter without]`:

- dark half: **mit ton betreten**
- light half: **[ohne ton]**

The choice is stored in `localStorage` so returning visitors skip the gate. Wrap every read
and write in `try/catch` — it throws in private windows.

**Use 2 — the admin login**, at `/admin`, visually near-identical, two options:

- dark half: **crew-login** — SSO, the real path
- light half: **[per e-mail]** — magic link fallback

Same component, same timing, different labels and a form. Someone who has seen the entry
gate recognises the login instantly. That recognition is the whole idea.

### The CMS — and the one real catch

**Read this before building the login.** This site has no backend and no server at runtime.
That is deliberate and it is in `CLAUDE.md`. A login screen implies authentication, which
implies a server — so the naive version of this feature breaks the site's best property.

It does not have to. The reference site runs on **Sanity** and is still statically served.
The pattern:

1. Content lives in Sanity. The CMS hosts its own auth and its own API; you run no server.
2. The public site fetches content in **TanStack Router route loaders, which run at build
   time**. Content is baked into the HTML. Visitors get plain static files, as today.
3. `/admin` is a **client-only route excluded from prerendering** that mounts Sanity Studio.
   It authenticates against Sanity, not against you. Your `<SplitGate>` is the skin on top
   of Sanity's own auth call.
4. Publishing in the Studio fires a webhook that rebuilds and redeploys the site.

Net result: a real CMS, a real login, and `dist/client` is still the entire deployable site.

Do not add an API route, a database or a session cookie. If the Sanity path is rejected,
stop and say so rather than quietly introducing a server.

### Order of work

Do these in order and verify each with `pnpm typecheck && pnpm check` before moving on.
Ship visual changes only after `pnpm build && pnpm preview`, since the prerendered output
is what visitors actually get.

1. Add `--color-paper` and the `--font-mono` face to `src/styles.css`.
2. Build the bottom metadata line and the mono label system. Smallest change, largest
   perceived jump.
3. Convert headlines to `.reveal-mask` reveals driven by one `IntersectionObserver`.
4. Add Lenis and the custom cursor.
5. Add View Transitions to the persistent chrome, with the timing tokens above.
6. Build `<SplitGate>` and wire it up as the entry gate.
7. Give the gallery its three view modes and the draggable slider.
8. Only then: Sanity, `/admin`, and the login skin.

### Acceptance

- Every route still prerenders; `dist/client` is still the whole site.
- The page is readable and complete with JavaScript disabled.
- 375px wide works, and the diptych stacks there.
- `prefers-reduced-motion: reduce` disables transitions, reveals and the view transitions.
- Nothing on the page starts at `opacity: 0`.
- All visitor-facing German copy is still in `src/content/site.ts`.

---

## What the reference actually does

Measured from `remyshoots.co.za`'s served HTML and its stylesheet
(`/_next/static/chunks/0gj70in27zsfq.css`, 64 KB) on 2026-09-13.

**Stack.** Next.js with Turbopack, Three.js, Sanity. Fonts are Inter and Roboto Mono,
self-hosted as subset woff2 via `next/font`. Awwwards **Nominee**, 12 September 2026, by
Arc Marumo. Its own description: *"Documenting emotion, movement and meaning."*

**Density of motion**, by raw count in that one stylesheet:

| technique                  | count |
| -------------------------- | ----: |
| `transition`               |   141 |
| `transform`                |   115 |
| `will-change`              |    25 |
| `@keyframes`               |    23 |
| `cubic-bezier`             |    16 |
| `clip-path`                |    12 |
| `mask`                     |    10 |
| `filter`                   |     8 |
| `backdrop-filter`          |     4 |
| `prefers-reduced-motion`   |     4 |
| `mix-blend-mode`           |     3 |

**The keyframes, grouped.** The naming tells you the architecture:

- `proj-stage-in` / `-out` / `-in-back` / `-out-back` — the image stage, both directions
- `proj-meta-in` / `-out` / `-in-back` / `-out-back` — the metadata HUD, offset from the stage
- `proj-wipe-leftward` / `-rightward`, `proj-clip-to-left` — the directional wipes
- `proj-sheet-hold`, `proj-stage-fade` — the holds between
- `gt-click-point` / `-pulse` / `-move` / `-pinch`, `gt-drag-open` / `-move` / `-closed`,
  `gt-view-open` / `-press` / `-closed` — animated hand hints teaching the gestures

**The surprise.** There is no animation library in the CSS. Transitions are the browser's
own View Transitions API: `view-transition-name: proj-chrome-top / -bottom / -menu` on the
persistent UI, and `::view-transition-old|new|group(.proj-stage | .proj-meta | .proj-chrome)`
to choreograph it. The `--vt-*` custom properties are the entire timing system.

**The Three.js** is almost certainly the `.fisheye-toggle` — a barrel-distortion shader over
the gallery, switched by a `.haptic-switch`. That is the most advanced and least essential
part of the site. Leave it for last, or never.

**Awwwards-listed elements:** Pre Loader, Gallery Navigation, Project Transition, Gestures,
mobile and desktop versions. Tagged: Fashion, Film & TV, Photography, Animation, Clean,
Portfolio, Transitions, Gallery, Interaction Design.

---

## Skills and where to learn them

Roughly in the order they pay off. The first four cover most of what makes the reference
feel the way it does.

| # | Skill | Where |
| - | ----- | ----- |
| 1 | CSS transforms, `clip-path`, masks, easing | MDN — *Using CSS transitions*, *clip-path* |
| 2 | View Transitions API | developer.chrome.com/docs/web-platform/view-transitions |
| 3 | `IntersectionObserver` for scroll reveals | MDN — *Intersection Observer API* |
| 4 | Smooth scroll | lenis.darkroom.engineering |
| 5 | Timeline animation | gsap.com/docs — free since 2024, ScrollTrigger included |
| 6 | React-idiomatic motion | motion.dev (formerly Framer Motion) |
| 7 | Headless CMS | sanity.io/docs — the reference's own CMS |
| 8 | WebGL / shaders | threejs.org/manual, then thebookofshaders.com |
| 9 | R3F, if you want shaders inside React | r3f.docs.pmnd.rs plus drei |

**Where this genre is taught.** Codrops (tympanus.net/codrops) is the single best source —
its tutorials are precisely this kind of site, with source. Awwwards Elements
(awwwards.com/elements) catalogues 40+ component categories — preloaders, transitions,
cursors, galleries, and a login/sign-up category worth browsing before building `/admin`.
Olivier Larose (blog.olivierlarose.com) writes the React versions. Osmo (osmo.supply)
publishes production-grade interaction components.

**A warning worth taking seriously.** Every technique above is cheap to add and expensive to
remove. The reference is restrained: two easing curves, one accent colour, one metaphor
(the camera), and slow timing. It is not a pile of effects. Add one thing at a time, look at
it on a phone, and stop earlier than feels right.
