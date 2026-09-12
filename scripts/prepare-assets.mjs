/**
 * Turns the client's raw pouch photos into web assets.
 *
 * Each source is a 1080x1350 canvas that is almost entirely white — the pouch
 * itself occupies only ~270x408px in the middle. This crops to the real content,
 * normalises every pouch to one frame so the product grid never jitters, emits
 * AVIF/WebP at two widths, and samples each pouch's own accent colour.
 *
 * Dev-only. Output is committed, so contributors never need to run it.
 * Usage: npm run assets:prepare
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import sharp from 'sharp';

// Client photography lives outside the repo (gitignored) — only the processed
// output in OUT_DIR is committed. Override with argv[2] to point elsewhere.
const SOURCE_DIR = process.argv[2] ?? 'assets-source';
const OUT_DIR = 'public/assets/products';

/** Source filename -> product slug. Order confirmed against the pouch labels. */
const SOURCES = [
  ['WhatsApp Image 2026-09-12 at 10.44.03 AM.jpeg', 'garlic'],
  ['WhatsApp Image 2026-09-12 at 10.44.04 AM (1).jpeg', 'onion'],
  ['WhatsApp Image 2026-09-12 at 10.44.04 AM (2).jpeg', 'ginger'],
  ['WhatsApp Image 2026-09-12 at 10.44.04 AM.jpeg', 'carrot'],
  ['WhatsApp Image 2026-09-12 at 10.44.05 AM (1).jpeg', 'tomato'],
  ['WhatsApp Image 2026-09-12 at 10.44.05 AM.jpeg', 'amla'],
  ['WhatsApp Image 2026-09-12 at 10.44.06 AM (1).jpeg', 'beetroot'],
  ['WhatsApp Image 2026-09-12 at 10.44.06 AM.jpeg', 'moringa'],
  ['WhatsApp Image 2026-09-12 at 10.44.07 AM (1).jpeg', 'turmeric'],
  ['WhatsApp Image 2026-09-12 at 10.44.07 AM.jpeg', 'spinach'],
];

/** 2:3 frame, sized so the card's ~110px render stays crisp past 2x. */
const FRAME = { width: 440, height: 660 };
const WIDTHS = [220, 440];
const BBOX_THRESHOLD = 18;
const BBOX_PADDING = 0.04;

const toHex = (r, g, b) =>
  '#' + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('');

/** Bounding box of everything that differs from the corner background colour. */
function contentBox(data, width, height, channels) {
  const at = (x, y) => {
    const i = (y * width + x) * channels;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const bg = at(2, 2);
  const differs = (c) =>
    Math.max(
      Math.abs(c[0] - bg[0]),
      Math.abs(c[1] - bg[1]),
      Math.abs(c[2] - bg[2]),
    ) > BBOX_THRESHOLD;

  let x0 = width;
  let y0 = height;
  let x1 = 0;
  let y1 = 0;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (!differs(at(x, y))) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }

  const padX = Math.round((x1 - x0) * BBOX_PADDING);
  const padY = Math.round((y1 - y0) * BBOX_PADDING);
  return {
    left: Math.max(0, x0 - padX),
    top: Math.max(0, y0 - padY),
    width: Math.min(width, x1 + padX) - Math.max(0, x0 - padX),
    height: Math.min(height, y1 + padY) - Math.max(0, y0 - padY),
  };
}

/**
 * The pouch's brand colour lives in the saturated lower band. Averaging the
 * most-saturated pixels there beats picking a swatch by eye.
 */
function accentColor(data, width, height, channels) {
  const picks = [];
  for (let y = Math.floor(height * 0.62); y < height * 0.9; y++) {
    for (let x = Math.floor(width * 0.1); x < width * 0.9; x += 2) {
      const i = (y * width + x) * channels;
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      if (max < 40 || max > 240) continue;
      if ((max - min) / max < 0.35) continue;
      picks.push([r, g, b]);
    }
  }
  if (picks.length === 0) return '#4a7a3c';
  const sum = picks.reduce((a, c) => [a[0] + c[0], a[1] + c[1], a[2] + c[2]], [0, 0, 0]);
  return toHex(sum[0] / picks.length, sum[1] / picks.length, sum[2] / picks.length);
}

await mkdir(OUT_DIR, { recursive: true });
const manifest = {};

for (const [file, slug] of SOURCES) {
  const source = path.join(SOURCE_DIR, file);
  const { data, info } = await sharp(source)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const box = contentBox(data, info.width, info.height, info.channels);
  const accent = accentColor(data, info.width, info.height, info.channels);

  // One shared frame: contain on white so pouches of differing widths align.
  const framed = await sharp(source)
    .extract(box)
    .resize(FRAME.width, FRAME.height, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .toBuffer();

  for (const width of WIDTHS) {
    const suffix = width === FRAME.width ? '@2x' : '';
    const base = path.join(OUT_DIR, `${slug}${suffix}`);
    const resized = () =>
      sharp(framed).resize({
        width,
        height: Math.round((width / FRAME.width) * FRAME.height),
        fit: 'fill',
      });
    // AVIF first, WebP as the <img src>. No PNG: it costs ~40x the bytes for
    // a fallback no current browser needs, and blows the page weight budget.
    await resized().avif({ quality: 62 }).toFile(`${base}.avif`);
    await resized().webp({ quality: 82 }).toFile(`${base}.webp`);
  }

  manifest[slug] = {
    accentColor: accent,
    sourceContent: `${box.width}x${box.height}`,
    width: WIDTHS[0],
    height: Math.round((WIDTHS[0] / FRAME.width) * FRAME.height),
  };
  console.log(
    `${slug.padEnd(10)} crop ${String(box.width).padStart(4)}x${box.height}  accent ${accent}`,
  );
}

await writeFile(
  path.join(OUT_DIR, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
);
console.log(`\nWrote ${Object.keys(manifest).length} products to ${OUT_DIR}`);
