// Atölye önizlemesi: node atolye-onizle.mjs [yuva=eşya ...] → atolye-oda.png, atolye-esyalar.png
import { writePng } from './pix.mjs';
import { data } from './atolye-veri.mjs';
const D = data(), byId = Object.fromEntries(D.items.map(i => [i.id, i]));
const pick = { ...D.defaults };
process.argv.slice(2).forEach(a => { const [s, v] = a.split('='); if (v) pick[s] = v; });
const rgb = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16));
const W = D.room.w, H = D.room.h, buf = new Array(W * H).fill([0, 0, 0]);
const put = (x, y, c) => { if (x >= 0 && y >= 0 && x < W && y < H) buf[y * W + x] = c; };
const blit = (a, x0, y0, tile, tw, th) => {
  const draw = (ox, oy) => a.rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.' && (!tile || (ox + i < x0 + tw && oy + j < y0 + th))) put(ox + i, oy + j, rgb(a.cols[ch])); }));
  if (tile){ for (let y = y0; y < y0 + th; y += a.h) for (let x = x0; x < x0 + tw; x += a.w) draw(x, y); } else draw(x0, y0);
};
const rect = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) put(i, j, rgb(c)); };
const S = Object.fromEntries(D.slots.map(s => [s.id, s]));
const at = id => { const s = S[id], it = byId[pick[id]]; if (s.tile) blit(it.art, s.x, s.y, true, s.w, s.h); else blit(it.art, s.x + Math.floor((s.w - it.art.w) / 2), s.y + s.h - it.art.h); };   // alta ve ortaya hizalı
at('duvar'); at('zemin');
rect(0, 76, 160, 3, '#6E4A2A');                                                                      // süpürgelik
rect(60, 16, 40, 32, '#F6F0E2'); at('pencere'); rect(79, 16, 2, 32, '#F6F0E2'); rect(60, 31, 40, 2, '#F6F0E2'); rect(58, 47, 44, 2, '#D8C8A8');   // pencere çerçevesi
D.frames.forEach(([x, y], k) => { rect(x - 1, y - 1, 18, 18, '#6E4A2A'); rect(x, y, 16, 16, ['#F2C43A', '#3AB0C0', '#E58FA6', '#8ACC6A'][k]); });
rect(D.shelf.x, D.shelf.y, D.shelf.w, 3, '#8A5E38'); rect(D.shelf.x + 4, D.shelf.y + 3, 2, 3, '#6E4A2A'); rect(D.shelf.x + D.shelf.w - 6, D.shelf.y + 3, 2, 3, '#6E4A2A');
D.shelf.spots.forEach(([x, y]) => rect(x + 4, y + 8, 8, 8, '#C8A040'));
['tavan', 'kose', 'masa', 'masaustu', 'hali', 'yatak', 'mama', 'oyuncak'].forEach(at);
const kp = byId[pick.yatak].kofte || [98, 72]; blit(D.kofte.normal, kp[0], kp[1]);
const SC = 4; writePng('atolye-oda.png', W * SC, H * SC, (x, y) => buf[Math.floor(y / SC) * W + Math.floor(x / SC)]);
// eşya tablosu
const cell = 76, cols = 8, rows = Math.ceil((D.items.length + 3) / cols), sheet = new Array(cols * cell * rows * cell).fill([60, 48, 40]);
const all = [...D.items.map(i => i.art), D.kofte.normal, D.kofte.blink, D.kofte.tail];
all.forEach((a, k) => { const sc = Math.max(1, Math.floor(70 / Math.max(a.w, a.h))), ox = (k % cols) * cell + 3, oy = Math.floor(k / cols) * cell + 3;
  a.rows.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; for (let yy = 0; yy < sc; yy++) for (let xx = 0; xx < sc; xx++) sheet[(oy + j * sc + yy) * cols * cell + ox + i * sc + xx] = rgb(a.cols[ch]); })); });
writePng('atolye-esyalar.png', cols * cell, rows * cell, (x, y) => sheet[y * cols * cell + x]);
console.log(D.items.length, 'eşya');
