# Asset manifest

Every image slot on the homepage, its source, and the required replacement format.

## Product catalogue

The ten product cards use the pouch photographs the client supplied over
WhatsApp, kept in `assets-source/` at the repo root. That folder is gitignored —
only the processed output below is committed. The asset pipeline removes the
large empty canvas, normalises every pouch to a 2:3 frame, and emits responsive
AVIF and WebP files.

| Slots | Output | Folder |
|---|---|---|
| `beetroot` … `garlic` | 220×330 and 440×660, AVIF + WebP | `public/assets/products/` |

Run `npm run assets:prepare` after replacing the source photographs in
`assets-source/`, or pass a different folder: `npm run assets:prepare -- <dir>`.
The product grid deliberately does not use the old `*-card` screenshot crops.

For final production photography, request lossless pouch cutouts or studio
compositions at 1200px high or larger. The supplied WhatsApp JPEGs are much
cleaner than the screenshot crops but still contain compression.

## Art-directed lifestyle photography

The original comp supplied only tiny flattened photographs. Those crops have
been replaced by high-resolution, AI-assisted reference-matched photographs.
They preserve the approved cream, green, warm-wood visual direction and the
subject of each section without scaling 79px photographs into large cards.

| Slots | Web outputs | Intended render |
|---|---|---|
| `hero-scene` | 1457×1079, AVIF + WebP | desktop hero |
| `hero-mobile` | 900×1124, AVIF + WebP | mobile 4:5 hero |
| `journey-1` … `journey-5` | 640×427 and 1280×853 | process cards |
| `brand-story` | 960×400 and 1800×750 | wide story image |
| `avatar-1` … `avatar-3` | 160×160 and 320×320 | testimonial portraits |
| `community-1` … `community-6` | 420×420 and 840×840 | community grid |

All responsive variants are declared through `src/data/images.ts` and rendered
by `ResponsiveImage`. Replace both the base and `@2x` files together to avoid a
mix of art directions on high-density screens.

### Approval note

The new lifestyle and social photographs are production-quality drafts, not
documentary evidence. Obtain client approval before publication. If the brand
has real farmer, employee, customer, or facility photography, replace the
corresponding files while retaining the same aspect ratios.

## Hero text

The seal and the three lines “Rooted in Nature / Driven by Women / Made for
Wellness” are now live HTML/SVG. Neither the desktop nor mobile photograph
contains promotional text. This keeps the message sharp, responsive,
translatable, and available to assistive technology.

## Drawn in code

| Element | Location |
|---|---|
| NL logo lockup | `src/components/composites/logo/` |
| 100% Natural seal | `src/components/primitives/seal-badge/` |
| Interface and trust icons | `src/components/primitives/icon/symbols/` |
| Botanical ornament | `src/components/sections/brand-story-section/` |
| Gold rule and diamond | `src/components/primitives/ornament-divider/` |
| Payment marks | `src/components/composites/payment-methods/` |

Replace the code-drawn logo and payment marks with official SVG assets when the
client supplies them.
