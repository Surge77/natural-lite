# Asset Manifest

Every image slot on the homepage, where it comes from, and what to send to replace it.

## How replacement works

Each slot is declared once in `src/data/` with its dimensions, alt text and
`<source>` list, and rendered by the single `ResponsiveImage` primitive. To
replace any image, drop `<id>.avif` and `<id>.webp` into the folder named below
using the same id. **No code changes, no layout shift** — the aspect-ratio box is
driven by the declared dimensions, not by the file.

If you send originals in any format, `npm run assets:artwork` and
`npm run assets:prepare` can be repointed to regenerate the web derivatives.

---

## 1a. Product grid shots — extracted from the comp

The comp styles each product as the pouch **surrounded by the produce it is made
from**. That is a different shot from the bare pouches the client sent, so the
grid uses crops of the comp instead.

| Slot | Native crop | Output | Folder |
|---|---|---|---|
| `beetroot-card` … `garlic-card` (10) | 126×107 each | 504×428, AVIF + WebP | `public/assets/products/` |

**Quality: low.** 126px of native content rendered at ~240px. Ask the client for
the ten composed product shots at 1000×850 or larger.

---

## 1b. Product pouches — client-supplied, good quality

Source: the ten JPEGs supplied over WhatsApp. Processed by `npm run assets:prepare`.

| Slot | Native content | Output | Folder |
|---|---|---|---|
| `beetroot` … `garlic` (10) | ~290×445 within a 1080×1350 canvas | 220×330 and 440×660, AVIF + WebP | `public/assets/products/` |

Each source was a mostly-white canvas with the pouch occupying only the middle
~8% of the pixels. The pipeline finds the content bounds, crops, normalises all
ten to one frame so the grid never jitters, and samples each pouch's own colour
into `accentColor`.

**Quality: fine.** These are the sharpest photography in the project. They are
**not currently used on the homepage** — the grid needs the produce composition
above — but they are ready for a product detail page.

---

## 2. Photography — extracted from the comp, LOW RESOLUTION

The comp arrived as a single flattened 759×1600 PNG. No layered file and no
separate photography was supplied, so every photograph below was cropped out of
it by `npm run assets:artwork` and upscaled 3–4× with a Lanczos kernel and a tuned unsharp mask.

These are faithful to the approved design and acceptable at the sizes the layout
renders them, but they are **interpolated, not true resolution**. Request the
originals before launch.

| Slot | Native crop | Output | Renders at | Priority |
|---|---|---|---|---|
| `hero-scene` | 463×343 | 1852×1372 | ~890px wide | **High** — largest element on the page |
| `journey-1` … `journey-5` | 119×79 each | 357×237 | ~220px wide | Medium |
| `brand-story` | 288×121 | 864×363 | ~480px wide | Medium |
| `avatar-1` … `avatar-3` | 41×41 each | 123×123 | 56px circle | Low — small enough to hold up |
| `community-1` … `community-6` | 92×92 each | 276×276 | ~150px square | Low |

Folder: `public/assets/lifestyle/`

### What to request from the client

| Slot | What it shows | Ideal delivery |
|---|---|---|
| `hero-scene` | Woman in saree behind the five pouches on a kitchen counter with fresh produce | 2800×2074 or larger, same composition |
| `journey-1` | Woman farmer harvesting leafy greens | 1280×850, 3:2 |
| `journey-2` | Worker in hairnet and mask sorting produce | 1280×850, 3:2 |
| `journey-3` | Technician at a microscope | 1280×850, 3:2 |
| `journey-4` | Three women packing pouches | 1280×850, 3:2 |
| `journey-5` | Woman holding a pouch by a window | 1280×850, 3:2 |
| `brand-story` | Woman eating from a bowl at her kitchen table | 1728×726, ~2.4:1 |
| `avatar-1/2/3` | Head-and-shoulders of Priya S., Neha R., Anjali M. | 320×320 square |
| `community-1…6` | Instagram-style product and lifestyle squares | 800×800 square |

---

## 3. Text baked into the hero artwork

The gold **100% Natural** seal and the three lines **“Rooted in Nature. / Driven
by Women. / Made for Wellness.”** are part of the supplied hero photograph, not
separate elements, so they ship inside `hero-scene`.

They are described in that image's alt text, so the content reaches assistive
technology. But text inside an image cannot be resized, translated or
re-flowed, and it softens on upscale.

**To fix properly:** send the hero photograph *without* the seal and lettering.
They will then be rendered as live text and a live SVG seal — the `SealBadge`
primitive that already draws them is still in the codebase and in use in the
Trust band.

---

## 4. Drawn in code, no file needed

| Element | Where |
|---|---|
| NL logo lockup | `src/components/composites/logo/` |
| 100% Natural seal | `src/components/primitives/seal-badge/` |
| 44 interface icons | `src/components/primitives/icon/symbols/` |
| Botanical ornament | `src/components/sections/brand-story-section/` |
| Gold rule + diamond | `src/components/primitives/ornament-divider/` |
| Payment marks (UPI, Visa, Mastercard, RuPay) | `src/components/composites/payment-methods/payment-marks.tsx` |

These are markup, so they stay sharp at any size and re-tint per context. If the
client supplies official logo or payment-brand SVGs, each is a single-file swap.
