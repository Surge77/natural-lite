# Natural Lite — homepage

Pixel-faithful React build of the client-approved homepage comp for Natural Lite,
a women-led D2C superfood powder brand.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type-check then production build |
| `npm run typecheck` | Type gate only |
| `npm run test` | Vitest suite |
| `npm run test:coverage` | Coverage report |
| `npm run lint` | oxlint |
| `npm run assets:prepare` | Rebuild product pouch images from the client JPEGs |
| `npm run assets:placeholders` | Regenerate tinted placeholder images |
| `npm run tokens:extract` | Re-sample brand colours from the reference comp |

The three asset commands are dev-only; their output is committed, so a fresh
clone needs nothing but `npm install`.

They read the client's original photography and the design comp from
`assets-source/`, which is gitignored because that material is not ours to
publish. Point them elsewhere by passing a path (`npm run tokens:extract -- <comp>`).
Without that folder the app still builds and runs — only these tools need it.

## Stack

Vite 8 · React 19 · TypeScript 6 (strict) · Tailwind v4 · Vitest

## How it is organised

Three tiers, dependency flowing one way: **primitives → composites → sections → page**.

```
src/
├── components/
│   ├── primitives/   atoms — Button, Icon, Section, ResponsiveImage, SealBadge…
│   ├── composites/   molecules — ProductCard, JourneyStep, TestimonialCard…
│   ├── sections/     one per band of the comp
│   └── layout/       page chrome
├── data/             all copy, imagery and ordering — the only place content lives
├── styles/           tokens.css (design tokens) + globals.css
├── hooks/            carousel, cart, focus trap, scroll lock, sticky header…
├── context/          cart state + reducer
└── lib/              class merge, currency, constants
```

**No component holds a content string.** Every heading, description, price and
image slot is declared in `src/data/`, so copy changes never open a component.
That layer is also the seam a real commerce API would replace.

### Changing things

| To change | Edit |
|---|---|
| Any copy on the page | `src/data/*.ts` |
| Brand colours, type scale, spacing | `src/styles/tokens.css` |
| A photograph | drop a file in `public/assets/` — see `docs/ASSET-MANIFEST.md` |
| Products or prices | `src/data/products.ts` |
| Navigation or footer links | `src/data/navigation.ts` |

## Design tokens

Colours were **measured from the comp**, not estimated — `npm run tokens:extract`
samples the reference PNG and prints the exact values. Type sizes are fluid
`clamp()` ranges, so there are no jumps at breakpoints.

## Accessibility

WCAG 2.2 AA. Landmarks and a single `h1`; skip link; focus ring that clears 3:1
on both cream and green; ≥44px touch targets; focus trap, `Esc` and scroll lock
on the mobile drawer; `aria-live` on cart changes; keyboard-operable dropdown and
carousel; `prefers-reduced-motion` honoured; `forced-colors` fallback.

One contrast defect in the source design was corrected: gold on cream measures
2.31:1, so gold is decorative only and gold-looking *text* uses a darker gold at
4.74:1. See `docs/CLIENT-QUESTIONS.md`.

## Responsive

Mobile-first, verified at 360 / 390 / 768 / 820 / 1024 / 1280 / 1440 / 1920.
Products stay two-up on phones rather than dropping to one. The journey row and
testimonials become native scroll-snap strips; the footer columns become
keyboard-native `<details>` accordions.

## Known limitations

Read `docs/ASSET-MANIFEST.md` and `docs/CLIENT-QUESTIONS.md` before launch. In
short: the new AI-assisted lifestyle photography requires client approval,
prices and contact details remain provisional, and the code-drawn logo should
be replaced when the official SVG is supplied.
