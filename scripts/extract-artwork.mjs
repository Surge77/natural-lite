/**
 * Lifts the client's photography out of the flattened reference comp.
 *
 * The comp arrived as a single 759x1600 PNG with no layered source, so every
 * photograph on the page exists only inside it. Each region below is cropped,
 * upscaled with a high-quality kernel and lightly sharpened.
 *
 * These are genuinely low-resolution sources — see docs/ASSET-MANIFEST.md for
 * the native pixel size of each. They are faithful to the approved design and
 * fine at the sizes the layout renders them, but the client should supply the
 * originals before launch. Dropping a higher-resolution file with the same name
 * into public/assets/lifestyle/ replaces it with no code change.
 *
 * Dev-only. Usage: npm run assets:artwork
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import sharp from 'sharp';

const REFERENCE =
  process.argv[2] ??
  'C:/Users/tdmne/.claude/image-cache/b2dc287c-c816-4949-b0c4-c209137bb081/1.png';

const OUT_DIR = 'public/assets/lifestyle';
const CARD_OUT_DIR = 'public/assets/products';

/**
 * Upscale factor per slot.
 *
 * Interpolation cannot invent detail, so this is chosen to match what the
 * layout actually renders at 2x device pixels — no more. Overshooting just
 * produces larger, softer files.
 */
const SCALE = { hero: 4, card: 4, large: 3, small: 3 };

/** Unsharp mask tuned for upscaled photography: lifts edges, spares flat tone. */
const SHARPEN = { sigma: 1.1, m1: 0.4, m2: 2.4, x1: 2.5, y2: 12, y3: 18 };

/** id -> crop rectangle in the comp's own 759x1600 coordinate space. */
const REGIONS = [
  ['hero-scene', 296, 62, 463, 343],
  ['journey-1', 41, 441, 119, 79],
  ['journey-2', 177, 441, 119, 79],
  ['journey-3', 315, 441, 119, 79],
  ['journey-4', 452, 441, 119, 79],
  ['journey-5', 590, 441, 119, 79],
  ['brand-story', 32, 1021, 288, 121],
  ['avatar-1', 59, 1302, 41, 41],
  ['avatar-2', 280, 1302, 41, 41],
  ['avatar-3', 495, 1302, 41, 41],
  ['community-1', 32, 1396, 92, 92],
  ['community-2', 130, 1396, 92, 92],
  ['community-3', 228, 1396, 92, 92],
  ['community-4', 326, 1396, 92, 92],
  ['community-5', 424, 1396, 92, 92],
  ['community-6', 522, 1396, 92, 92],
];

/**
 * Product grid cells.
 *
 * The comp styles each product as the pouch surrounded by the produce it is
 * made from — a different shot from the bare pouch photographs the client sent
 * over WhatsApp. Those bare pouches are higher resolution and are kept for a
 * future product page; the grid uses these so it matches the approved design.
 *
 * Two rows of five, measured off the comp's own card boundaries.
 */
const CARD_X = [31, 170, 309, 448, 587];
const CARD_W = 126;
const PRODUCT_CARDS = [
  ...['beetroot', 'spinach', 'turmeric', 'moringa', 'amla'].map((slug, i) => [
    `${slug}-card`, CARD_X[i], 621, CARD_W, 107,
  ]),
  ...['tomato', 'carrot', 'onion', 'ginger', 'garlic'].map((slug, i) => [
    `${slug}-card`, CARD_X[i], 773, CARD_W, 108,
  ]),
];

await mkdir(OUT_DIR, { recursive: true });
await mkdir(CARD_OUT_DIR, { recursive: true });

const source = sharp(REFERENCE);
const meta = await source.metadata();
console.log(`Reference ${meta.width}x${meta.height}\n`);

for (const [id, left, top, width, height] of [...REGIONS, ...PRODUCT_CARDS]) {
  const scale = id === 'hero-scene' ? SCALE.hero : id.endsWith('-card') ? SCALE.card : width > 150 ? SCALE.large : SCALE.small;

  const pipeline = sharp(REFERENCE)
    .extract({ left, top, width, height })
    // Upscale in linear light so edges do not darken, then sharpen once at the
    // final size — sharpening before the resize would just be smeared by it.
    .resize({ width: width * scale, kernel: 'lanczos3' })
    .sharpen(SHARPEN)
    .modulate({ saturation: 1.04 })
    .linear(1.03, -3);

  const base = path.join(id.endsWith('-card') ? CARD_OUT_DIR : OUT_DIR, id);
  await pipeline.clone().avif({ quality: 80, effort: 6 }).toFile(`${base}.avif`);
  await pipeline.clone().webp({ quality: 92, effort: 6 }).toFile(`${base}.webp`);

  console.log(
    `${id.padEnd(14)} native ${String(width).padStart(3)}x${String(height).padEnd(3)} -> ${width * scale}x${height * scale}`,
  );
}

console.log(`\nWrote ${REGIONS.length} regions to ${OUT_DIR}`);
