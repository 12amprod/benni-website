# Fonts

`TeX Gyre Adventor` — the display face for every heading, the wordmark and the navigation.

## Why this one

The *White Pony* artwork is set in **ITC Avant Garde Gothic**, which is a commercial
Monotype/ITC licence and cannot be shipped with a website. TeX Gyre Adventor is the end of
a chain of legitimate clones of it: ITC Avant Garde Gothic → URW Gothic L (released by
URW++ under the GUST Font License) → TeX Gyre Adventor (GUST e-foundry). It keeps Avant
Garde's metrics and shapes — the perfectly circular `o`, the very high x-height, the short
ascenders — so headlines read as the album does.

## Provenance

- Source: <https://www.gust.org.pl/projects/e-foundry/tex-gyre/adventor>, `qag2_501otf.zip` (v5.01)
- Converted OTF → WOFF2 with `fonttools`, glyphs untouched, no subsetting.
- Licence: GUST Font License (LPPL 1.3c based), full text in `GUST-FONT-LICENSE.txt`.
  It permits redistribution; keep that file next to the fonts.

Self-hosted rather than pulled from a font CDN: this is a German site with no backend, and
a third-party font request would be both a privacy problem and the only network call the
page cannot control.
