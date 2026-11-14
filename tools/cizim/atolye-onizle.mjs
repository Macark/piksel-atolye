// Atölye önizlemesi: node atolye-onizle.mjs [yuva=eşya ...] [poz=sit|lie|sleep...] → atolye-oda.png, atolye-esyalar.png, atolye-kofte.png
import { writePng } from './pix.mjs';
import { data } from './atolye-veri.mjs';
const D = data(), byId = Object.fromEntries(D.items.map(i => [i.id, i]));
const pick = { ...D.defaults }; let poz = 'sit', yer = 'koltuk';
process.argv.slice(2).forEach(a => { const [s, v] = a.split('='); if (s === 'poz') poz = v; else if (s === 'yer') yer = v; else if (v) pick[s] = v; });
const rgb = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16));
const W = D.room.w, H = D.room.h, buf = new Array(W * H).fill([0, 0, 0]);
const put = (x, y, c) => { if (x >= 0 && y >= 0 && x < W && y < H) buf[y * W + x] = c; };
const blit = (a, x0, y0, tile, tw, th) => {
  const draw = (ox, oy) => a.rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.' && (!tile || (ox + i < x0 + tw && oy + j < y0 + th))) put(ox + i, oy + j, rgb(a.cols[ch])); }));
  if (tile){ for (let y = y0; y < y0 + th; y += a.h) for (let x = x0; x < x0 + tw; x += a.w) draw(x, y); } else draw(x0, y0);
};
const rect = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) put(i, j, rgb(c)); };
const S = Object.fromEntries(D.slots.map(s => [s.id, s]));
const at = id => { const s = S[id], it = byId[pick[id]]; if (s.tile) blit(it.art, s.x, s.y, true, s.w, s.h); else blit(it.art, s.x + Math.floor((s.w - it.art.w) / 2), s.y + s.h - it.art.h); };
at('duvar'); at('zemin');
rect(0, D.room.wallH - 3, W, 3, '#6E4426'); rect(0, D.room.wallH - 3, W, 1, '#9A6838');
const pw = S.pencere; rect(pw.x - 3, pw.y - 3, pw.w + 6, pw.h + 6, '#ECE8E0'); at('pencere'); rect(pw.x + pw.w / 2 - 1, pw.y - 3, 2, pw.h + 6, '#ECE8E0'); rect(pw.x - 3, pw.y + pw.h / 2 - 1, pw.w + 6, 2, '#ECE8E0'); rect(pw.x - 6, pw.y + pw.h + 2, pw.w + 12, 3, '#C8C4BC');
D.frames.forEach(([x, y], k) => { rect(x - 2, y - 2, 26, 26, '#6E4426'); rect(x - 2, y - 2, 26, 1, '#9A6838'); rect(x, y, 22, 22, ['#F2C43A', '#3AB0C0', '#E58FA6', '#8ACC6A'][k]); });
const sh = D.shelf; rect(sh.x, sh.y, sh.w, 4, '#9A6838'); rect(sh.x, sh.y, sh.w, 1, '#C08A52'); rect(sh.x + 6, sh.y + 4, 3, 4, '#6E4426'); rect(sh.x + sh.w - 9, sh.y + 4, 3, 4, '#6E4426');
sh.spots.forEach(([x, y]) => rect(x + 3, y + 4, 10, 12, '#C8A040'));
['somine', 'aski', 'sus', 'tavan', 'kose', 'masa', 'masaustu', 'hali', 'yatak', 'oyuncak', 'su', 'mama'].forEach(at);
blit(D.chair.art, D.chair.x, D.chair.y);
const kp = D.spots[yer]; blit(D.kofte[poz][0], yer === 'zemin' ? kp[0] + 40 : kp[0], kp[1]);
const SC = 3; writePng('atolye-oda.png', W * SC, H * SC, (x, y) => buf[Math.floor(y / SC) * W + Math.floor(x / SC)]);
// tablo
const sheet = (file, arts, cell, cols) => { const rows = Math.ceil(arts.length / cols), Wd = cols * cell, buf2 = new Array(Wd * rows * cell).fill([60, 48, 40]);
  arts.forEach((a, k) => { const sc = Math.max(1, Math.floor((cell - 6) / Math.max(a.w, a.h))), ox = (k % cols) * cell + 3, oy = Math.floor(k / cols) * cell + 3;
    a.rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; for (let yy = 0; yy < sc; yy++) for (let xx = 0; xx < sc; xx++) buf2[(oy + j * sc + yy) * Wd + ox + i * sc + xx] = rgb(a.cols[ch]); })); });
  writePng(file, Wd, rows * cell, (x, y) => buf2[y * Wd + x]); };
sheet('atolye-esyalar.png', [...D.items.map(i => i.art), D.chair.art], 112, 7);
sheet('atolye-kofte.png', Object.values(D.kofte).flat(), 128, 7);
console.log(D.items.length, 'eşya,', Object.values(D.kofte).flat().length, 'Köfte karesi');
