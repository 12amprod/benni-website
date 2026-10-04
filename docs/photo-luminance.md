# Measured luminance of every archive photograph

Rec.709 luma (`0.2126R + 0.7152G + 0.0722B`) on a 0–255 scale, computed from each JPEG
downsampled to 32px. This is the basis a CSS `grayscale()` filter uses, so these numbers
predict what the frame looks like once the `.plate` filter is applied.

Measured 2026-09-19, over the 65 frames in `public/images/timflp` — every one of them
shot or filmed by @timflp.archive. Regenerate by downsampling with `sips -Z 32 -s format bmp`
and averaging.

## Why this set needs a different curve from the last one

The archive this replaced was twenty frames off two nights in one club: everything was dark,
everything was lit by the same four lamps, and `(52 / mean) ^ 0.85` landed all of it in one
band. This set is not that. It runs from a night clip at mean **18.1**
(`narcotic-keine-luft-cover`) to a bare winter forest at **140.5** (`narcotic-intro-cover`) —
a **7.8x spread** — because it holds a hardtechno set in an industrial hall, a football pitch
at noon and an alpine lake, and those are not the same photograph.

At exponent 0.85 the old formula asked for a lift below the 0.65 floor on more than half the
frames, which is the formula saying it is the wrong shape rather than saying the pictures are
wrong. The curve in use is therefore:

    lift = clamp((64 / mean) ^ 0.6, 0.65, 2.0)

A gentler exponent normalises less on purpose. Pulling a night and a noon to the same grey
would be the one edit that makes a body of work look like a filter.

**Result: source spread 18.1 → 140.5 (7.8x) becomes 36.2 → 91.3 (2.5x) after the lift.**
Clamped at the floor: `narcotic-intro-cover`.
Clamped at the ceiling: `narcotic-keine-luft-cover` — the darkest frame in the archive, and it stays a dark frame.

## Per-frame

| file | mean | p10 | p50 | p90 | lift | after |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| narcotic-keine-luft-cover | 18.1 | 6.9 | 7.0 | 41.7 | 2.00 | 36.2 |
| relapse-beach-01 | 23.2 | 8.9 | 14.3 | 49.3 | 1.84 | 42.6 |
| relapse-beach-03 | 27.6 | 9.6 | 16.6 | 56.3 | 1.65 | 45.6 |
| relapse-beach-05 | 32.6 | 11.7 | 21.8 | 67.1 | 1.50 | 49.0 |
| dont-think-02 | 35.3 | 1.1 | 12.9 | 106.8 | 1.43 | 50.4 |
| relapse-beach-08 | 37.8 | 9.9 | 23.7 | 82.7 | 1.37 | 51.7 |
| bone-stew-08 | 46.5 | 27.7 | 33.5 | 90.1 | 1.21 | 56.3 |
| bone-stew-01 | 47.5 | 24.7 | 30.8 | 91.0 | 1.20 | 57.0 |
| relapse-beach-02 | 48.0 | 13.7 | 28.9 | 107.8 | 1.19 | 57.1 |
| bone-stew-04 | 50.0 | 28.7 | 36.6 | 93.8 | 1.16 | 58.0 |
| relapse-beach-06 | 53.9 | 15.0 | 39.4 | 105.4 | 1.11 | 59.8 |
| august-03 | 55.5 | 25.5 | 45.1 | 91.0 | 1.09 | 60.5 |
| bone-stew-02 | 59.7 | 26.9 | 52.8 | 104.9 | 1.04 | 62.1 |
| alte-muster-cover-01 | 60.4 | 12.9 | 44.1 | 136.7 | 1.03 | 62.3 |
| bone-stew-07 | 60.6 | 31.7 | 50.3 | 106.3 | 1.03 | 62.4 |
| cte-remix-cover | 61.0 | 26.6 | 48.3 | 116.9 | 1.03 | 62.8 |
| dont-think-03 | 61.8 | 4.5 | 46.9 | 133.2 | 1.02 | 63.0 |
| relapse-beach-09 | 64.2 | 8.9 | 39.6 | 180.3 | 1.00 | 64.2 |
| petrikirchplatzfest-05 | 71.0 | 21.3 | 37.4 | 217.4 | 0.94 | 66.7 |
| meisterfeier-05 | 72.3 | 25.7 | 58.5 | 132.5 | 0.93 | 67.3 |
| relapse-beach-04 | 72.4 | 17.6 | 49.4 | 174.1 | 0.93 | 67.3 |
| narcotic-shoot-01 | 74.8 | 14.6 | 55.9 | 168.4 | 0.91 | 68.1 |
| meisterfeier-01 | 74.8 | 15.4 | 56.7 | 169.2 | 0.91 | 68.1 |
| dont-think-01 | 77.9 | 16.0 | 65.8 | 166.3 | 0.89 | 69.3 |
| berggrenzlauf-07 | 78.2 | 18.0 | 69.0 | 141.0 | 0.89 | 69.6 |
| august-01 | 78.2 | 16.3 | 59.7 | 165.6 | 0.89 | 69.6 |
| winter-01 | 79.3 | 33.6 | 67.8 | 144.9 | 0.88 | 69.8 |
| august-02 | 79.8 | 29.4 | 65.3 | 177.1 | 0.88 | 70.3 |
| summer-04 | 80.6 | 29.3 | 72.6 | 149.1 | 0.87 | 70.2 |
| summer-01 | 80.6 | 39.1 | 69.7 | 139.4 | 0.87 | 70.2 |
| berggrenzlauf-01 | 81.3 | 12.0 | 85.0 | 151.0 | 0.87 | 70.7 |
| bone-stew-05 | 81.4 | 29.7 | 63.3 | 164.6 | 0.87 | 70.8 |
| city-stories-cover | 81.4 | 26.1 | 51.9 | 172.0 | 0.87 | 70.8 |
| weg-03 | 85.0 | 41.1 | 76.4 | 142.0 | 0.84 | 71.4 |
| berggrenzlauf-02 | 85.1 | 20.0 | 68.0 | 172.0 | 0.84 | 71.5 |
| relapse-teaser-cover | 86.0 | 1.9 | 97.5 | 172.4 | 0.84 | 72.3 |
| bone-stew-03 | 87.2 | 28.5 | 94.8 | 125.4 | 0.83 | 72.4 |
| bone-stew-09 | 87.7 | 36.1 | 85.1 | 146.1 | 0.83 | 72.8 |
| berggrenzlauf-03 | 88.7 | 21.0 | 78.0 | 183.0 | 0.82 | 72.7 |
| petrikirchplatzfest-04 | 89.4 | 32.4 | 83.2 | 157.6 | 0.82 | 73.3 |
| summer-03 | 90.0 | 39.5 | 76.2 | 176.5 | 0.82 | 73.8 |
| meisterfeier-06 | 92.4 | 30.1 | 84.7 | 187.2 | 0.80 | 73.9 |
| august-04 | 93.1 | 53.4 | 91.4 | 137.1 | 0.80 | 74.5 |
| petrikirchplatzfest-07 | 93.4 | 26.9 | 90.7 | 163.4 | 0.80 | 74.7 |
| taub-cover | 95.8 | 31.8 | 62.9 | 231.6 | 0.79 | 75.7 |
| weg-01 | 96.4 | 33.3 | 74.6 | 229.5 | 0.78 | 75.2 |
| meisterfeier-13 | 97.6 | 46.0 | 77.4 | 207.1 | 0.78 | 76.1 |
| petrikirchplatzfest-02 | 97.9 | 28.8 | 96.1 | 167.9 | 0.77 | 75.4 |
| dont-think-04 | 100.3 | 10.4 | 118.4 | 171.9 | 0.76 | 76.3 |
| meisterfeier-03 | 100.6 | 8.4 | 51.5 | 212.1 | 0.76 | 76.5 |
| petrikirchplatzfest-06 | 102.3 | 37.5 | 96.8 | 169.3 | 0.75 | 76.7 |
| winter-07 | 103.2 | 48.4 | 93.2 | 179.1 | 0.75 | 77.4 |
| winter-04 | 104.0 | 8.2 | 97.8 | 206.0 | 0.75 | 78.0 |
| meisterfeier-04 | 104.4 | 11.7 | 93.1 | 201.3 | 0.75 | 78.3 |
| weg-02 | 105.8 | 21.7 | 91.5 | 206.8 | 0.74 | 78.3 |
| summer-02 | 105.8 | 59.5 | 105.2 | 145.9 | 0.74 | 78.3 |
| petrikirchplatzfest-01 | 107.2 | 51.2 | 100.5 | 180.9 | 0.73 | 78.2 |
| meisterfeier-02 | 107.5 | 15.2 | 69.9 | 233.1 | 0.73 | 78.5 |
| weg-05 | 112.2 | 32.0 | 79.8 | 230.6 | 0.71 | 79.7 |
| meisterfeier-11 | 112.4 | 24.0 | 69.7 | 231.3 | 0.71 | 79.8 |
| petrikirchplatzfest-08 | 113.1 | 35.9 | 118.0 | 183.5 | 0.71 | 80.3 |
| petrikirchplatzfest-03 | 116.9 | 48.5 | 112.7 | 192.3 | 0.70 | 81.9 |
| narcotic-cover-01 | 117.6 | 72.4 | 95.4 | 235.7 | 0.69 | 81.1 |
| winter-02 | 125.7 | 33.2 | 126.9 | 221.3 | 0.67 | 84.2 |
| narcotic-intro-cover | 140.5 | 38.6 | 140.0 | 244.1 | 0.65 | 91.3 |

Watch the p10 column when adding a frame. A negative whose 10th percentile is already near
zero gains haze rather than detail when it is lifted — its midtones come up and its shadows
stay on the floor. A frame that cannot be printed legibly does not belong on the sheet.
