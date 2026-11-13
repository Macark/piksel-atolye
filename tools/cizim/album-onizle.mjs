// node album-onizle.mjs → albumler-onizleme.png: her satır bir albüm
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { decode, gridSheet } from './pix.mjs';
const dir = fileURLToPath(new URL('../../src/content/albums/', import.meta.url));
const albums = fs.readdirSync(dir).sort().map(f => JSON.parse(fs.readFileSync(dir + f, 'utf8')));
gridSheet('albumler-onizleme.png', albums.map(a => a.items.map(it => ({ n:it.art.n, pal:it.art.pal, idx:decode(it.art) }))), +(process.argv[2] || 80), 6);
albums.forEach(a => console.log(a.id, a.items.map(i => `${i.id}:${i.name}/${i.art.n}${i.fact ? '' : '(bilgisiz)'}`).join(' ')));
