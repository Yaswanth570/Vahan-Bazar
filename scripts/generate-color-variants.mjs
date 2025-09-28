// Generate distinct color variants for each bike image using Sharp
// Usage:
//  1) npm i sharp
//  2) node scripts/generate-color-variants.mjs
// It will read from public/images/* base images and output colorized variants in the same folder.

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const imagesDir = path.resolve(root, 'public', 'images');

// Helper: ensure output dir exists
fs.mkdirSync(imagesDir, { recursive: true });

// Modulate presets for distinct color looks
const PRESETS = {
  blue:    { hue: 200, saturation: 1.2, brightness: 1.0 },
  black:   { saturation: 0.2, brightness: 0.7 },
  red:     { hue: 355, saturation: 1.4, brightness: 1.0 },
  white:   { saturation: 0.2, brightness: 1.1 },
  grey:    { saturation: 0.1, brightness: 0.95 },
  green:   { hue: 120, saturation: 1.3, brightness: 1.0 },
  silver:  { saturation: 0.15, brightness: 1.05 },
};

// Per-bike generation plan (src is existing file under public/images)
const PLAN = [
  {
    src: 'yamaha-mt15.jpg',
    variants: [
      { out: 'yamaha-mt15-blue.jpg', preset: 'blue' },
      { out: 'yamaha-mt15-black.jpg', preset: 'black' },
      { out: 'yamaha-mt15-red.jpg', preset: 'red' },
      { out: 'yamaha-mt15-white.jpg', preset: 'white' },
    ],
  },
  {
    src: 'ather-450x.jpg',
    variants: [
      { out: 'ather-450x-grey.jpg', preset: 'grey' },
      { out: 'ather-450x-green.jpg', preset: 'green' },
      { out: 'ather-450x-white.jpg', preset: 'white' },
      { out: 'ather-450x-black.jpg', preset: 'black' },
    ],
  },
  {
    src: 'honda-activa.jpg',
    variants: [
      { out: 'honda-activa-grey.jpg', preset: 'grey' },
      { out: 'honda-activa-white.jpg', preset: 'white' },
      { out: 'honda-activa-blue.jpg', preset: 'blue' },
      { out: 'honda-activa-black.jpg', preset: 'black' },
    ],
  },
  {
    src: 'royal-enfield-classic.jpg',
    variants: [
      { out: 'royal-enfield-classic-red.jpg', preset: 'red' },
      { out: 'royal-enfield-classic-black.jpg', preset: 'black' },
      { out: 'royal-enfield-classic-grey.jpg', preset: 'grey' },
      { out: 'royal-enfield-classic-blue.jpg', preset: 'blue' },
    ],
  },
  {
    src: 'tvs-iqube.jpg',
    variants: [
      { out: 'tvs-iqube-grey.jpg', preset: 'grey' },
      { out: 'tvs-iqube-white.jpg', preset: 'white' },
      { out: 'tvs-iqube-blue.jpg', preset: 'blue' },
      { out: 'tvs-iqube-black.jpg', preset: 'black' },
    ],
  },
  {
    src: 'bajaj-pulsar.jpg',
    variants: [
      { out: 'bajaj-pulsar-red.jpg', preset: 'red' },
      { out: 'bajaj-pulsar-blue.jpg', preset: 'blue' },
      { out: 'bajaj-pulsar-grey.jpg', preset: 'grey' },
      { out: 'bajaj-pulsar-black.jpg', preset: 'black' },
    ],
  },
  {
    src: 'ola-s1-pro.jpg',
    variants: [
      { out: 'ola-s1-pro-black.jpg', preset: 'black' },
      { out: 'ola-s1-pro-white.jpg', preset: 'white' },
      { out: 'ola-s1-pro-silver.jpg', preset: 'silver' },
      { out: 'ola-s1-pro-blue.jpg', preset: 'blue' },
    ],
  },
  {
    src: 'hero-splendor.jpg',
    variants: [
      { out: 'hero-splendor-black-silver.jpg', preset: 'black' },
      { out: 'hero-splendor-grey-green.jpg', preset: 'green' },
      { out: 'hero-splendor-black-purple.jpg', preset: 'blue' },
      { out: 'hero-splendor-white.jpg', preset: 'white' },
    ],
  },
  {
    src: 'suzuki-access.jpg',
    variants: [
      { out: 'suzuki-access-silver.jpg', preset: 'silver' },
      { out: 'suzuki-access-white.jpg', preset: 'white' },
      { out: 'suzuki-access-grey.jpg', preset: 'grey' },
      { out: 'suzuki-access-black.jpg', preset: 'black' },
    ],
  },
  {
    src: 'future-electric-pro.jpg',
    variants: [
      { out: 'future-electric-pro-black.jpg', preset: 'black' },
      { out: 'future-electric-pro-blue.jpg', preset: 'blue' },
      { out: 'future-electric-pro-silver.jpg', preset: 'silver' },
      { out: 'future-electric-pro-red.jpg', preset: 'red' },
    ],
  },
];

async function go() {
  for (const job of PLAN) {
    const srcPath = path.join(imagesDir, job.src);
    if (!fs.existsSync(srcPath)) {
      console.warn(`[SKIP] Missing source image: ${srcPath}`);
      continue;
    }
    for (const v of job.variants) {
      const outPath = path.join(imagesDir, v.out);
      const mod = PRESETS[v.preset];
      if (!mod) { console.warn(`[SKIP] Missing preset ${v.preset}`); continue; }
      try {
        await sharp(srcPath)
          .modulate({
            hue: mod.hue ?? 0,
            saturation: mod.saturation ?? 1,
            brightness: mod.brightness ?? 1,
          })
          .toFile(outPath);
        console.log(`[OK] ${v.out}`);
      } catch (e) {
        console.error(`[ERR] ${v.out}`, e?.message || e);
      }
    }
  }
}

go().then(() => console.log('Done.')).catch((e) => console.error(e));
