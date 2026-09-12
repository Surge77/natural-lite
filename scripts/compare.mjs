/**
 * Builds a side-by-side of the reference comp and the current build so layout
 * drift is measured rather than eyeballed. Dev-only.
 * Usage: node scripts/compare.mjs <screenshot.png> [outfile] [comp]
 */
import process from 'node:process';
import sharp from 'sharp';

const shot = process.argv[2];
const out = process.argv[3] ?? 'scratch-compare.png';
const REF = process.argv[4] ?? 'assets-source/design-comp.jpeg';
const WIDTH = 700;

const ref = await sharp(REF).resize({ width: WIDTH }).toBuffer();
const refMeta = await sharp(ref).metadata();
const mine = await sharp(shot).resize({ width: WIDTH }).toBuffer();
const mineMeta = await sharp(mine).metadata();

const height = Math.max(refMeta.height, mineMeta.height);
console.log(`reference ${refMeta.width}x${refMeta.height}  build ${mineMeta.width}x${mineMeta.height}`);
console.log(`build is ${(mineMeta.height / refMeta.height * 100 - 100).toFixed(1)}% taller than the comp`);

await sharp({ create: { width: WIDTH * 2 + 12, height, channels: 3, background: '#222' } })
  .composite([
    { input: ref, top: 0, left: 0 },
    { input: mine, top: 0, left: WIDTH + 12 },
  ])
  .png()
  .toFile(out);
console.log('wrote', out);
