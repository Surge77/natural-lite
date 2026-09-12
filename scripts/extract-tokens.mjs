/**
 * Samples the client's reference comp to derive exact brand colours.
 * Dev-only: run once to confirm the palette in src/styles/tokens.css.
 * Usage: npm run tokens:extract
 */
import process from 'node:process';

import sharp from 'sharp';

// The comp is client material, so it lives in gitignored assets-source/ rather
// than in the repo. This JPEG is a re-encode of the PNG originally sampled; the
// band colours and contrast ratios in tokens.css reproduce from it exactly.
const REFERENCE = process.argv[2] ?? 'assets-source/design-comp.jpeg';

const toHex = (r, g, b) =>
  '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('').toUpperCase();

/** Relative luminance per WCAG 2.x. */
const luminance = (r, g, b) => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const contrast = (a, b) => {
  const [l1, l2] = [luminance(...a), luminance(...b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/** Most frequent colour in a horizontal strip, quantised to 8 levels/channel. */
function dominantInBand(data, width, height, channels, fromY, toY) {
  const counts = new Map();
  const y0 = Math.max(0, Math.floor(fromY * height));
  const y1 = Math.min(height, Math.ceil(toY * height));

  for (let y = y0; y < y1; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const i = (y * width + x) * channels;
      const key =
        ((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3);
      const entry = counts.get(key);
      if (entry) {
        entry.n += 1;
        entry.r += data[i];
        entry.g += data[i + 1];
        entry.b += data[i + 2];
      } else {
        counts.set(key, { n: 1, r: data[i], g: data[i + 1], b: data[i + 2] });
      }
    }
  }

  return [...counts.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((e) => [Math.round(e.r / e.n), Math.round(e.g / e.n), Math.round(e.b / e.n)]);
}

const BANDS = [
  ['announcement bar', 0.0, 0.012],
  ['site header', 0.016, 0.05],
  ['hero', 0.055, 0.24],
  ['journey', 0.26, 0.36],
  ['products grid', 0.38, 0.56],
  ['impact band', 0.577, 0.638],
  ['brand story', 0.645, 0.715],
  ['trust', 0.725, 0.775],
  ['testimonials', 0.785, 0.845],
  ['community', 0.855, 0.915],
  ['footer', 0.925, 0.985],
];

const { data, info } = await sharp(REFERENCE)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

console.log(`\nReference: ${info.width}x${info.height}\n`);
console.log('Band'.padEnd(18), 'Dominant  2nd       3rd');
console.log('-'.repeat(52));

for (const [name, from, to] of BANDS) {
  const top = dominantInBand(data, info.width, info.height, info.channels, from, to);
  console.log(name.padEnd(18), top.map((c) => toHex(...c)).join('   '));
}

const GOLD = [197, 162, 83];
const CREAM = [253, 249, 240];
const GOLD_DARK = [138, 107, 40];
console.log('\nContrast checks (WCAG AA body text needs 4.5:1):');
console.log('  gold #C5A253 on cream :', contrast(GOLD, CREAM).toFixed(2) + ':1');
console.log('  gold-dark #8A6B28 on cream :', contrast(GOLD_DARK, CREAM).toFixed(2) + ':1');
