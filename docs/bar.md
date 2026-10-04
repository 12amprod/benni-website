# bar.md — the bar for the relapse archive

Two references. Every number below was **measured** from the live page on 2026-09-14 at
1440×900, not remembered and not eyeballed.

- **Primary — `remyshoots.co.za`** (Awwwards Nominee, Arc Marumo). A photography archive with
  slider / grid / list modes. This is the bar for *behaviour and restraint*.
- **Secondary — the DJ Khaled shot** (Felpis, Dribbble). A still, not a site. It contributes
  three things only: the hard vertical black/cream split, pure black-and-white with no third
  value, and tiny rotated mono labels stacked against a face. It is **not** a bar for layout.

**What is deliberately not being copied:** the reference draws its gallery into a full-viewport
WebGL `<canvas>` (two of them, 1440×900). We are not adding Three.js. Every mechanism below is
reproducible in DOM and CSS — that was the filter for including it.

---

## M1 — The gallery owns the whole viewport, and the page does not scroll

Measured: `canvas.top = 0`, `canvas.height = 900` = exactly `100vh`.
`document.documentElement.scrollWidth === window.innerWidth` (1440). There is no page scroll at
all; changing view mode changes the layout in place.

Photographs bleed to all four edges. There is no content column, no `max-width`, and no section
heading sitting above the gallery introducing it.

**Check:** does the gallery fill the frame edge to edge, with photography touching all four
sides of the screenshot? If there is a margin of page background around the grid, this fails.

## M2 — One type size for the entire interface

Measured across every visible text node:

| style | count |
| --- | ---: |
| `15.12px / 600 / Roboto Mono / uppercase` | **130** |
| `16px / 600 / Roboto Mono / uppercase` | 8 |
| `12px / 600 / Roboto Mono / uppercase` | 1 |
| two one-off Helvetica items (24.3px, 15.6px) | 2 |

92% of all text on the page is a single style. There is **no headline anywhere in the gallery** —
no `<h1>`-scale type, no section title, nothing above ~16px except the wordmark.

**Check:** count distinct rendered text sizes in a gallery screenshot. More than **two** fails.
Any heading larger than ~24px inside the gallery fails.

## M3 — Hierarchy is carried by colour, not by size

Measured text colours: warm grey `rgb(178,174,171)` on **82** elements, white `#ffffff` on **32**,
a dimmer grey `rgb(203,199,194)` on 20. Ratio ≈ **1 white : 2.5 grey**.

The active item is white. Everything else is grey. Same size, same weight, same face — the only
signal that something is current is that it is brighter.

**Check:** is the current/active label distinguishable from its neighbours *without* being bigger
or bolder? If the design reaches for size or weight to mark state, it fails.

## M4 — Exactly one photograph holds colour; every other frame is desaturated and dimmed

True in all three view modes — slider, grid and list. In the grid, 14 frames are visible and
precisely **one** is in colour; the rest are greyscale *and* knocked back in brightness, so the
colour frame reads as lit rather than merely saturated.

**Check:** count colour frames in a resting screenshot with no pointer over the page. The answer
must be exactly **1**. Zero fails (nothing draws the eye); two or more fails (nothing is chosen).

## M5 — The accent is 8 marks, none of them larger than 16px

Measured: 8 accent-red (`rgb(255,49,49)`) elements on the whole screen. Their sizes:
`16×16`, `16×16`, `14×14`, `1×27`, `22×2`, plus **one** short word set in it (`gestures`, 77×21).

There is never a filled accent panel, never an accent-coloured photograph, and never accent type
above label size. The accent is a *cursor* — it marks where you are, and nothing else.

**Check:** total accent area in a screenshot. If any single accent element exceeds ~16px on its
long side (bar one short label), or if accent is used as a background fill, it fails.

## M6 — A 40px gutter on all four sides, and the chrome lives in it

Measured: brand at `top: 40, left: 40`. Header row all at `top: 39–40`. Right-hand nav ends at
`x: 1400` — a 40px right gutter. Bottom chrome occupies `y: 818–868`, i.e. 32–82px above the
bottom edge. A 1px ruler of **555 tick marks**, each 12px tall, runs the full width at `y: 880`,
8px off the bottom edge.

The chrome is a three-column header — brand left, view toggle centre, nav right — and a
four-slot bottom line. It **floats over** the photography; it is not a bar above it.

**Check:** measure the distance from each screen edge to the nearest chrome text. All four should
be ~40px. Chrome sitting in its own opaque band above the photos, rather than over them, fails.

## M7 — Two tempos, and nothing in between

Measured transition durations across the DOM: `0.25s` ×7, `0.3s` ×40, `0.35s` ×2, `0.45s` ×26.
Measured custom properties: `--vt-stage-dur: 1.6s`, `--vt-leave-dur: 1.6s`, `--vt-cross-dur: 1.6s`,
`--vt-cross-delay: .33s`, `--vt-meta-dur: .45s`.

So: **UI ticks at 250–450ms. The stage moves at 1.6s. The 500ms–1500ms band is empty.**
The easing `cubic-bezier(0.4, 0, 0.15, 1)` appears 28 times — the same curve we already ship as
`--ease-ui`.

This corrects the lazy reading of the reference as "everything is slow". Hovering a control is
immediate; moving a photograph is cinematic. Mixing the two — a 900ms hover, or a 300ms page
change — is what makes a site feel merely sluggish instead of deliberate.

**Check:** any transition in the 500–1500ms band on a *control*, or under 1s on a *photograph
changing state*, fails.

---

## Confirmed by measurement, worth noting

The reference's cream is `--cream: #fcf8ef` — byte-identical to the `--color-paper` token
already in `src/styles.css`. The palette decision in `docs/redesign-brief.md` was correct and
does not need revisiting.
