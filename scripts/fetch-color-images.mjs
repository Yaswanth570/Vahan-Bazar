#!/usr/bin/env node
// Fetch color-specific images via Google Custom Search and save them locally.
// Usage example:
//   GOOGLE_API_KEY=xxx GOOGLE_CSE_ID=yyy node scripts/fetch-color-images.mjs \
//     --id 1 --brand "Yamaha" --model "MT 15" --slug "yamaha-mt15" \
//     --colors "Metallic Black,Dark Matte Blue" --per 3

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const API_KEY = process.env.GOOGLE_API_KEY;
const CSE_ID = process.env.GOOGLE_CSE_ID;

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      args[key] = val;
    }
  }
  return args;
}

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function downloadTo(url, filePath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(filePath, buf);
}

async function main() {
  const args = parseArgs(process.argv);
  if (!API_KEY || !CSE_ID) {
    console.error('Missing GOOGLE_API_KEY or GOOGLE_CSE_ID env vars.');
    process.exit(1);
  }

  const bikeId = String(args.id || '').trim();
  const brand = args.brand || '';
  const model = args.model || '';
  const slug = args.slug || slugify(`${brand} ${model}`);
  const per = Number(args.per || 3);
  const colors = (args.colors || '').split(',').map(s => s.trim()).filter(Boolean);

  if (!bikeId || !brand || !model || colors.length === 0) {
    console.error('Required: --id, --brand, --model, --colors');
    process.exit(1);
  }

  const outBase = path.join(projectRoot, 'public', 'images', 'colors', slug);
  await ensureDir(outBase);

  const colorMap = {};

  for (const color of colors) {
    const colorSlug = slugify(color);
    const outDir = path.join(outBase, colorSlug);
    await ensureDir(outDir);

    const query = `${brand} ${model} ${color} studio side profile motorcycle two wheeler white background`;
    const url = `https://www.googleapis.com/customsearch/v1?searchType=image&safe=active&cx=${encodeURIComponent(CSE_ID)}&key=${encodeURIComponent(API_KEY)}&q=${encodeURIComponent(query)}&num=${per}`;

    console.log(`Searching images for: ${query}`);
    let data;
    try {
      data = await fetchJSON(url);
    } catch (e) {
      console.error('Search failed:', e.message);
      continue;
    }

    const items = (data.items || []).slice(0, per);
    const saved = [];

    for (let i = 0; i < items.length; i++) {
      const link = items[i].link;
      const ext = path.extname(new URL(link).pathname).toLowerCase() || '.jpg';
      const filename = `image_${String(i + 1).padStart(2, '0')}${ext}`;
      const outFile = path.join(outDir, filename);
      try {
        console.log('Downloading', link);
        await downloadTo(link, outFile);
        saved.push(`/images/colors/${slug}/${colorSlug}/${filename}`);
      } catch (e) {
        console.warn('Skip failed image:', link, e.message);
      }
    }

    if (saved.length) {
      colorMap[color] = saved;
    }
  }

  // Update mapping file src/data/colorImages.ts
  const mapPath = path.join(projectRoot, 'src', 'data', 'colorImages.ts');
  let existing = {};
  try {
    const content = await fs.readFile(mapPath, 'utf8');
    const match = content.match(/export const colorImages: ColorImageMap = (.*);/s);
    if (match) {
      existing = JSON.parse(match[1]);
    }
  } catch {}

  existing[bikeId] = { ...(existing[bikeId] || {}), ...colorMap };

  const fileContent = `export type ColorImageMap = Record<string, Record<string, string[]>>;\nexport const colorImages: ColorImageMap = ${JSON.stringify(existing, null, 2)};\n`;
  await fs.writeFile(mapPath, fileContent, 'utf8');

  console.log('Done. Updated colorImages map and downloaded assets.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
