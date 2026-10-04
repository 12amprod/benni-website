# Design loop — relapse archive/gallery

Bar: `docs/bar.md` (M1–M7) · System: `docs/design-system.md` · Scope: archive / gallery · Ceiling: none

| Piece | Round | Brief | System | Craft | Outcome |
| --- | ---: | --- | --- | --- | --- |
| A — contact sheet | 1 | FAIL | FAIL | FAIL | 3 gaps → round 2 |
| A — contact sheet | 2 | – | – | – | building |
| B — gallery chrome | – | – | – | – | not started |
| C — view modes | – | – | – | – | not started |

## Gap history

### Piece A, round 1

- **Brief — FAIL.** No edition provenance. The subheading promises `relapse beach` and
  `relapse vol.3`; nothing in the sheet says which frame is which. "Functionally a mood board
  with numbers on it." Also: frames 02/07/09/13 unreadable at 288px.
- **System — FAIL** (2 of 14 rules). Both were defects in `design-system.md` itself:
  - "300ms is below the 400ms minimum" — the spec contradicted the *measured* bar (M7:
    controls run 250–450ms). §4 rewritten to the two-tempo rule. Builder was right.
  - 18px display type outside the size scale — **real**. Act names use Tailwind `text-lg`,
    an untokenised size. §3 now names `--text-entry`; needs tokenising.
- **Craft — FAIL.** Picked the reference as better, by pixel measurement. Reference greys sit
  at mean luminance 57, spread 34; ours at mean 19.8, range 4.4–44.7, with 6 of 15 frames
  effectively black. `brightness(0.6)` on underexposed night photography makes holes, not a
  held-back state. M4 passed on count while its mechanism was broken.
  - Out of scope, routed to piece B: nav has **no active state** (every item grey, `ARCHIV`
    the dimmest, while the footer marks it white); chrome gutters 169/171 horizontal vs
    16/13 vertical; nav cluster 14px off centre; `INSTAGRAM` 4px off its row's baseline.
  - Discounted: flat black bands above/below the grid — an artifact of screenshotting a
    scrolling page, not a defect.
