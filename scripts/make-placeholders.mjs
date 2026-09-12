/**
 * Generates stand-in imagery for every photo slot the client has not supplied.
 *
 * These exist as real files at the exact final dimensions so that dropping in
 * a real photograph is a file replacement with no layout shift and no code
 * change. Each carries a soft warm wash in brand tones plus its slot name, so
 * a placeholder is never mistaken for finished art.
 *
 * Dev-only. Usage: npm run assets:placeholders
 * Slot list and specs: docs/ASSET-MANIFEST.md
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const OUT_DIR = 'public/assets/lifestyle';

/** Warm brand-adjacent washes, cycled so a gallery of slots is not one flat block. */
const WASHES = [
  ['#e9dfcc', '#cfc3a6'],
  ['#dfe4d2', '#bfc9a9'],
  ['#efe2d6', '#d6c0ab'],
  ['#e3ded0', '#c6bda4'],
  ['#eae0d8', '#cdb9ac'],
];

/** slot id -> [width, height]. Mirrors the manifest exactly. */
const SLOTS = [
  ['hero-portrait', 900, 1200],
  ['hero-backdrop', 1920, 1080],
  ['journey-1', 640, 480],
  ['journey-2', 640, 480],
  ['journey-3', 640, 480],
  ['journey-4', 640, 480],
  ['journey-5', 640, 480],
  ['brand-story', 900, 900],
  ['avatar-1', 160, 160],
  ['avatar-2', 160, 160],
  ['avatar-3', 160, 160],
  ['community-1', 600, 600],
  ['community-2', 600, 600],
  ['community-3', 600, 600],
  ['community-4', 600, 600],
  ['community-5', 600, 600],
  ['community-6', 600, 600],
  ['community-7', 600, 600],
];

const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function washSvg(id, width, height, [from, to]) {
  const label = escapeXml(id);
  const fontSize = Math.max(11, Math.round(Math.min(width, height) * 0.055));
  const showLabel = Math.min(width, height) >= 320;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="v" cx="50%" cy="42%" r="72%">
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#6b6a5f" stop-opacity="0.14"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <rect width="${width}" height="${height}" fill="url(#v)"/>
  ${
    showLabel
      ? `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="Georgia, serif" font-size="${fontSize}" fill="#4a4b42" fill-opacity="0.5"
        letter-spacing="${fontSize * 0.08}">${label}</text>`
      : ''
  }
</svg>`);
}

await mkdir(OUT_DIR, { recursive: true });

for (const [index, [id, width, height]] of SLOTS.entries()) {
  const wash = WASHES[index % WASHES.length];
  const svg = washSvg(id, width, height, wash);
  const base = path.join(OUT_DIR, id);
  await sharp(svg).avif({ quality: 55 }).toFile(`${base}.avif`);
  await sharp(svg).webp({ quality: 78 }).toFile(`${base}.webp`);
  console.log(`${id.padEnd(16)} ${width}x${height}`);
}

console.log(`\nWrote ${SLOTS.length} placeholder slots to ${OUT_DIR}`);
