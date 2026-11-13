// Küçük piksel araçları: PNG yazma, sanat verisini çözme/kodlama
import fs from 'node:fs';
import zlib from 'node:zlib';
const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc32 = b => { let c = -1; for (const x of b) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, c]); };
export function writePng(file, w, h, px){
  const raw = Buffer.alloc(h * (w * 3 + 1));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){ const c = px(x, y), o = y * (w * 3 + 1) + 1 + x * 3; raw[o] = c[0]; raw[o + 1] = c[1]; raw[o + 2] = c[2]; }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  fs.writeFileSync(file, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]));
}
const ALPH = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function decode(a){
  const N = a.n * a.n, idx = new Array(N).fill(0), s = a.px; let i = 0, p = 0;
  while (p < s.length){ const v = ALPH.indexOf(s[p++]); let q = p; while (q < s.length && s.charCodeAt(q) >= 48 && s.charCodeAt(q) <= 57) q++; const r = q > p ? +s.slice(p, q) : 1; p = q; for (let k = 0; k < r && i < N; k++) idx[i++] = v; }
  return idx;
}
export function encode(idx){ let s = '', i = 0; while (i < idx.length){ let j = i; while (j < idx.length && idx[j] === idx[i]) j++; const r = j - i; s += ALPH[idx[i]] + (r > 1 ? r : ''); i = j; } return s; }
export const rgb = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16));
// Birden çok resmi yan yana, her biri `size` piksel kutuda (tam sayı ölçekle) çiz
export function sheet(file, arts, size = 384, gap = 16){
  const W = arts.length * (size + gap) + gap, H = size + 2 * gap, bg = [40, 32, 26];
  const boxes = arts.map((a, k) => { const sc = Math.floor(size / a.n), off = Math.floor((size - sc * a.n) / 2); return { a, sc, x0: gap + k * (size + gap) + off, y0: gap + off, pal: a.pal.map(rgb) }; });
  writePng(file, W, H, (x, y) => { for (const b of boxes){ const gx = Math.floor((x - b.x0) / b.sc), gy = Math.floor((y - b.y0) / b.sc); if (x >= b.x0 && y >= b.y0 && gx < b.a.n && gy < b.a.n) return b.pal[b.a.idx[gy * b.a.n + gx]]; } return bg; });
}
// Satır satır tablo: rows = [[art, art, ...], ...]; her hücre `size` px kutu
export function gridSheet(file, rows, size = 128, gap = 10){
  const cols = Math.max(...rows.map(r => r.length)), W = cols * (size + gap) + gap, H = rows.length * (size + gap) + gap, bg = [40, 32, 26];
  const boxes = []; rows.forEach((r, j) => r.forEach((a, i) => { if (!a) return; const sc = Math.floor(size / a.n), off = Math.floor((size - sc * a.n) / 2); boxes.push({ a, sc, x0: gap + i * (size + gap) + off, y0: gap + j * (size + gap) + off, pal: a.pal.map(rgb) }); }));
  writePng(file, W, H, (x, y) => { for (const b of boxes){ const gx = Math.floor((x - b.x0) / b.sc), gy = Math.floor((y - b.y0) / b.sc); if (x >= b.x0 && y >= b.y0 && gx < b.a.n && gy < b.a.n) return b.pal[b.a.idx[gy * b.a.n + gx]]; } return bg; });
}
