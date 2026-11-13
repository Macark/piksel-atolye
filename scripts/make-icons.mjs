// Uygulama simgelerini içerikteki Köfte portresinden (content.json > home) üretir.
// Çıktı: src/public/icons/*.png. Kullanım: node scripts/make-icons.mjs
// Bağımlılık yok: PNG, Node'un zlib'i ile elle yazılıyor.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'public', 'icons');
const content = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'content', 'content.json'), 'utf8'));

// oyundaki decodeArt ile aynı çözüm
const ALPH = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function decode(a){
  const N = a.n * a.n, idx = new Array(N).fill(0), s = a.px; let i = 0, p = 0;
  while (p < s.length){
    const v = ALPH.indexOf(s[p++]); let q = p;
    while (q < s.length && s.charCodeAt(q) >= 48 && s.charCodeAt(q) <= 57) q++;
    const r = q > p ? +s.slice(p, q) : 1; p = q;
    for (let k = 0; k < r && i < N; k++) idx[i++] = v;
  }
  return idx;
}
const rgb = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16));

const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc32 = b => { let c = -1; for (const x of b) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, c]); };
function png(size, px){ // px(x, y) -> [r,g,b]
  const raw = Buffer.alloc(size * (size * 3 + 1));
  for (let y = 0; y < size; y++){ raw[y * (size * 3 + 1)] = 0; for (let x = 0; x < size; x++){ const c = px(x, y), o = y * (size * 3 + 1) + 1 + x * 3; raw[o] = c[0]; raw[o + 1] = c[1]; raw[o + 2] = c[2]; } }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

const art = content.home, n = art.n, idx = decode(art), pal = art.pal.map(rgb);
const bg = pal[idx[0]]; // köşedeki zemin rengi
// Her piksel tam sayı büyüklükte, kalan boşluk zemin rengiyle dolar (keskin piksel görünümü).
// pad: kenar payı (Android "maskable" simgeleri kenarları kırpar, onlara daha geniş pay)
function icon(size, padRatio){
  const cell = Math.floor(size * (1 - 2 * padRatio) / n), off = Math.floor((size - cell * n) / 2);
  return png(size, (x, y) => { const gx = Math.floor((x - off) / cell), gy = Math.floor((y - off) / cell); return gx < 0 || gy < 0 || gx >= n || gy >= n ? bg : pal[idx[gy * n + gx]]; });
}
fs.mkdirSync(OUT, { recursive: true });
const list = [['apple-touch-icon.png', 180, 0.04], ['icon-192.png', 192, 0.04], ['icon-512.png', 512, 0.04], ['icon-maskable-512.png', 512, 0.12], ['favicon-32.png', 32, 0]];
for (const [f, s, p] of list){ fs.writeFileSync(path.join(OUT, f), icon(s, p)); console.log(f, s + 'px'); }
