// node bolge-onizle.mjs akdeniz → akdeniz-onizleme.png: her satır bir il (3 resim + 3 hatıra)
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { decode, gridSheet } from './pix.mjs';
const bolge = process.argv[2];
const iller = JSON.parse(fs.readFileSync(fileURLToPath(new URL(`../../src/content/turkiye/${bolge}.json`, import.meta.url)), 'utf8')).filter(i => i.items);
const A = a => ({ n:a.n, pal:a.pal, idx:decode(a) });
gridSheet(`${bolge}-onizleme.png`, iller.map(i => [...i.items.map(it => A(it.art)), null, ...i.items.map(it => A(it.souvenir.art))]), +(process.argv[3] || 112), 8);
console.log(iller.map(i => i.plaka + ' ' + i.name).join(' | '));
