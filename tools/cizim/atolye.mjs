// Köfte'nin Atölyesi, 2. sürüm çizimleri: oda 240×180.
// Kurallar: tek ortak palet (her renk 3 ton: gölge, ana, ışık), ışık sol üstten,
// koyu kahve dış çizgi. Sonuç { w, h, rows, cols } ('.' saydam). Veri: atolye-veri.mjs.
export function T(w, h){
  const g = new Array(w * h).fill(null);
  const inb = (x, y) => x >= 0 && y >= 0 && x < w && y < h;
  const api = {
    w, h, g,
    get(x, y){ return inb(x, y) ? g[y * w + x] : null; },
    px(x, y, c){ x = Math.round(x); y = Math.round(y); if (inb(x, y)) g[y * w + x] = c; return api; },
    rect(x, y, ww, hh, c){ for (let j = y; j < y + hh; j++) for (let i = x; i < x + ww; i++) api.px(i, j, c); return api; },
    ell(cx, cy, rx, ry, c, test){ for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){ const dx = (x + .5 - cx) / rx, dy = (y + .5 - cy) / ry; if (dx * dx + dy * dy <= 1 && (!test || test(x, y, dx, dy))) g[y * w + x] = c; } return api; },
    poly(pts, c, test){ for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){ let ins = false; const px = x + .5, py = y + .5; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++){ const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) ins = !ins; } if (ins && (!test || test(x, y))) g[y * w + x] = c; } return api; },
    line(x0, y0, x1, y1, c){ x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1); const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let e = dx + dy; for (;;){ api.px(x0, y0, c); if (x0 === x1 && y0 === y1) break; const e2 = 2 * e; if (e2 >= dy){ e += dy; x0 += sx; } if (e2 <= dx){ e += dx; y0 += sy; } } return api; },
    // gölgeli şekiller: r = [gölge, ana, ışık]; ışık sol üstten
    sEll(cx, cy, rx, ry, r, test){ api.ell(cx, cy, rx, ry, r[1], test); api.ell(cx, cy, rx, ry, r[2], (x, y, dx, dy) => (!test || test(x, y, dx, dy)) && dx + dy < -0.75 && dx * dx + dy * dy > 0.25); api.ell(cx, cy, rx, ry, r[0], (x, y, dx, dy) => (!test || test(x, y, dx, dy)) && dx + dy > 0.6); return api; },
    sRect(x, y, ww, hh, r){ api.rect(x, y, ww, hh, r[1]); api.rect(x, y, ww, 1, r[2]); api.rect(x, y, 1, hh, r[2]); api.rect(x, y + hh - 1, ww, 1, r[0]); api.rect(x + ww - 1, y, 1, hh, r[0]); return api; },
    sPoly(pts, r){ api.poly(pts, r[1]); const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), y0 = Math.min(...ys), x1 = Math.max(...xs), y1 = Math.max(...ys);
      api.poly(pts, r[2], (x, y) => (x - x0) / (x1 - x0 || 1) + (y - y0) / (y1 - y0 || 1) < 0.45); api.poly(pts, r[0], (x, y) => (x - x0) / (x1 - x0 || 1) + (y - y0) / (y1 - y0 || 1) > 1.55); return api; },
    map(x0, y0, rows, cmap){ rows.forEach((r, j) => [...r].forEach((ch, i) => { if (cmap[ch]) api.px(x0 + i, y0 + j, cmap[ch]); })); return api; },
    mirror(){ for (let y = 0; y < h; y++){ const row = g.slice(y * w, y * w + w).reverse(); for (let x = 0; x < w; x++) g[y * w + x] = row[x]; } return api; },
    outline(c = OL){ const o = g.slice(); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){ if (o[y * w + x]) continue; if ((x > 0 && o[y * w + x - 1]) || (x < w - 1 && o[y * w + x + 1]) || (y > 0 && o[(y - 1) * w + x]) || (y < h - 1 && o[(y + 1) * w + x])) g[y * w + x] = c; } return api; },
    done(){
      const L = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', cols = {}, back = new Map(), rows = [];
      for (let y = 0; y < h; y++){ let r = ''; for (let x = 0; x < w; x++){ const c = g[y * w + x]; if (!c){ r += '.'; continue; } if (!back.has(c)){ if (back.size >= L.length) throw new Error('çok renk'); const k = L[back.size]; back.set(c, k); cols[k] = c; } r += back.get(c); } rows.push(r); }
      return { w, h, rows, cols };
    },
  };
  return api;
}
// Ortak palet: [gölge, ana, ışık]
export const OL = '#2A1A12';
export const P = {
  wood:['#6E4426', '#9A6838', '#C08A52'], oak:['#A87C4E', '#D2A872', '#ECCB98'], sisal:['#9C7E52', '#C4A472', '#DCC294'],
  cream:['#D8C6A4', '#EADBBF', '#F6EEDC'], red:['#A82C22', '#D8452E', '#F0745A'], blue:['#22568E', '#2E7DBA', '#5AA6DA'],
  teal:['#1E7A70', '#2EA898', '#6ED0C0'], green:['#2E6A3A', '#4A9A52', '#7CC27A'], yellow:['#B8861C', '#E8B530', '#F6D872'],
  pink:['#B8586E', '#E58FA6', '#F6C2D0'], purple:['#5A3A8A', '#8A5AB8', '#B48ADA'], grey:['#5A5A66', '#8A8A96', '#B8B8C2'],
  stone:['#7A7068', '#A49A90', '#C8C0B6'], terra:['#8E4A26', '#C0703A', '#E09A64'], white:['#C8C4BC', '#ECE8E0', '#FFFFFF'],
  dark:['#24242E', '#3A3A48', '#5A5A6A'], navy:['#141E46', '#1E2A5A', '#34407A'], sky:['#7EB8DE', '#A8D8F0', '#D2ECF8'],
  sand:['#C89A60', '#E0BC80', '#F2D8A8'], mint:['#88B8A0', '#A9CDB8', '#CFE3D6'], gold:['#9A6A08', '#E0A526', '#F8DC86'],
  // Köfte: ana sayfa portresinin renkleri
  fur:['#2E221E', '#3B2D28', '#4B3A33'], furL:['#4B3A33', '#5E4A41', '#6E5A50'],
};
const K = { eye:'#CF7A1E', eyeL:'#EEA13A', eyeH:'#F6C46A', pupil:'#140D0B', nose:'#221815', pink:'#E48EA0', ear:'#7A4F4C', whisk:'#D6CEC0', ol:'#140D0B' };
const R = P;
export const I = {};

/* ===== DUVAR KÂĞIDI (24×24 desen) ===== */
I.duvar_krem = () => { const d = T(24, 24).rect(0, 0, 24, 24, R.cream[1]); [[4, 5], [16, 17], [11, 11], [20, 4], [3, 19]].forEach(([x, y]) => d.px(x, y, R.cream[0])); d.px(17, 8, R.cream[2]).px(8, 20, R.cream[2]); return d.done(); };
I.duvar_cizgili = () => { const d = T(24, 24).rect(0, 0, 24, 24, R.mint[2]); [0, 12].forEach(x => { d.rect(x, 0, 5, 24, R.mint[1]); d.rect(x + 4, 0, 1, 24, R.mint[0]); }); [7, 19].forEach(x => d.rect(x, 0, 1, 24, R.white[2])); return d.done(); };
I.duvar_puanli = () => { const d = T(24, 24).rect(0, 0, 24, 24, R.pink[2]); [[5, 5], [17, 17]].forEach(([x, y]) => { d.ell(x + .5, y + .5, 2.4, 2.4, R.pink[1]); d.px(x - 1, y - 1, '#FBE2E8'); }); [[17, 5], [5, 17]].forEach(([x, y]) => d.ell(x + .5, y + .5, 1.6, 1.6, R.white[2])); return d.done(); };
I.duvar_cini = () => { const d = T(24, 24).rect(0, 0, 24, 24, R.white[1]); d.rect(0, 0, 24, 1, R.blue[0]).rect(0, 0, 1, 24, R.blue[0]);
  d.poly([[12, 3], [18, 12], [12, 21], [6, 12]], R.blue[1]); d.poly([[12, 6], [16, 12], [12, 18], [8, 12]], R.teal[2]); d.poly([[12, 9], [14, 12], [12, 15], [10, 12]], R.blue[0]); d.px(12, 12, R.red[1]);
  [[3, 3], [21, 3], [3, 21], [21, 21]].forEach(([x, y]) => { d.px(x, y, R.red[1]).px(x - 1, y, R.green[1]).px(x + 1, y, R.green[1]); }); return d.done(); };

/* ===== ZEMİN (24×24) ===== */
I.zemin_parke = () => { const d = T(24, 24).rect(0, 0, 24, 24, R.wood[1]);
  for (let r = 0; r < 4; r++){ const y = r * 6; d.rect(0, y, 24, 1, R.wood[0]); d.rect(0, y + 1, 24, 1, R.wood[2]); const off = (r % 2) * 12 + 5; d.rect(off % 24, y, 1, 6, R.wood[0]); d.px((off + 7) % 24, y + 3, R.wood[0]).px((off + 8) % 24, y + 3, R.wood[0]); }
  return d.done(); };
I.zemin_dama = () => { const d = T(24, 24).rect(0, 0, 24, 24, R.cream[2]); d.rect(0, 0, 12, 12, R.dark[1]).rect(12, 12, 12, 12, R.dark[1]);
  d.rect(0, 0, 12, 1, R.dark[2]).rect(12, 12, 12, 1, R.dark[2]); d.rect(12, 0, 12, 1, R.white[2]).rect(0, 12, 12, 1, R.white[2]); d.rect(11, 0, 1, 12, R.dark[0]).rect(23, 12, 1, 12, R.dark[0]); return d.done(); };
I.zemin_tas = () => { const d = T(24, 24).rect(0, 0, 24, 24, R.stone[1]);
  [[0, 0, 13, 11], [13, 0, 11, 11], [0, 11, 8, 13], [8, 11, 16, 13]].forEach(([x, y, w, h]) => { d.rect(x, y, w, 1, R.stone[2]); d.rect(x, y, 1, h, R.stone[2]); d.rect(x, y + h - 1, w, 1, R.stone[0]); d.rect(x + w - 1, y, 1, h, R.stone[0]); });
  d.px(5, 5, R.stone[0]).px(18, 17, R.stone[0]).px(17, 5, R.stone[2]); return d.done(); };

/* ===== PENCERE MANZARASI (60×44) — gün ışığında çizilir; gece/akşam ve mevsim oyunda üstüne eklenir ===== */
const gok = (d, top, bot) => { for (let y = 0; y < 44; y++) d.rect(0, y, 60, 1, y < 18 ? top : bot); };
I.pen_sehir = () => { const d = T(60, 44); gok(d, R.sky[1], R.sky[2]); d.ell(47, 9, 4.5, 4.5, '#FFF0A8'); d.ell(12, 8, 6, 2.4, R.white[2]); d.ell(17, 7, 4, 2.4, R.white[2]);
  [[1, 24, 9], [11, 16, 8], [20, 26, 10], [31, 19, 9], [41, 23, 9], [51, 17, 9]].forEach(([x, y, w], i) => { const r = i % 2 ? R.grey : R.stone; d.sRect(x, y, w, 44 - y, r); for (let yy = y + 3; yy < 42; yy += 4) for (let xx = x + 2; xx < x + w - 2; xx += 3) d.rect(xx, yy, 2, 2, '#F2E6A8'); });
  return d.done(); };
I.pen_gece = () => { const d = T(60, 44); gok(d, R.navy[0], R.navy[1]); d.ell(45, 10, 6, 6, '#F6F0C8'); d.ell(48, 8, 5, 5, R.navy[0]);
  [[6, 5], [17, 12], [27, 4], [11, 22], [55, 22], [36, 15], [22, 9]].forEach(([x, y]) => d.px(x, y, '#FFFFFF'));
  [[1, 28, 9], [11, 24, 9], [21, 31, 10], [32, 26, 9], [42, 29, 9], [52, 25, 8]].forEach(([x, y, w]) => { d.sRect(x, y, w, 44 - y, R.navy); for (let yy = y + 3; yy < 42; yy += 4) d.rect(x + 2 + (yy % 3), yy, 2, 2, '#F2C85A'); });
  return d.done(); };
I.pen_deniz = () => { const d = T(60, 44); gok(d, R.sky[1], R.sky[2]); d.ell(12, 9, 5, 5, '#FFF0A8'); d.rect(0, 22, 60, 22, R.blue[1]); d.rect(0, 22, 60, 2, R.blue[2]);
  [[4, 28], [22, 34], [38, 27], [48, 38], [12, 40]].forEach(([x, y]) => d.rect(x, y, 6, 1, R.sky[2])); d.poly([[33, 21], [39, 8], [39, 21]], R.white[2]); d.poly([[39, 10], [43, 21], [39, 21]], R.white[1]); d.sRect(30, 21, 15, 3, R.terra);
  d.ell(5, 42, 10, 5, R.sand[1]); return d.done(); };
I.pen_balon = () => { const d = T(60, 44); gok(d, '#F2C8A0', '#F6D8B0');
  d.poly([[0, 44], [0, 28], [8, 22], [13, 30], [21, 20], [28, 30], [38, 23], [46, 31], [60, 25], [60, 44]], R.sand[1]); d.poly([[0, 44], [0, 36], [60, 34], [60, 44]], R.sand[0]);
  [[9, 23], [22, 22], [38, 25], [50, 28]].forEach(([x, y]) => d.sPoly([[x - 2, y + 7], [x + 1, y - 2], [x + 4, y + 7]], R.terra));
  [[12, 8, R.red], [31, 5, R.yellow], [48, 11, R.blue]].forEach(([x, y, r]) => { d.sEll(x, y, 4.5, 5, r); d.rect(x - 1, y + 6, 3, 3, R.wood[1]); d.line(x - 3, y + 3, x - 1, y + 6, R.wood[0]); d.line(x + 3, y + 3, x + 1, y + 6, R.wood[0]); });
  return d.done(); };
I.pen_karlidag = () => { const d = T(60, 44); gok(d, R.sky[1], R.sky[2]);
  d.poly([[0, 44], [0, 30], [12, 22], [22, 28], [34, 7], [45, 20], [60, 15], [60, 44]], R.grey[1]); d.poly([[34, 7], [30, 15], [34, 13], [38, 15]], R.white[2]); d.poly([[12, 22], [9, 25], [15, 25]], R.white[2]); d.poly([[60, 15], [55, 18], [60, 19]], R.white[2]);
  d.poly([[34, 7], [45, 20], [36, 20]], R.grey[0]); d.rect(0, 35, 60, 9, R.white[2]); d.rect(0, 35, 60, 1, R.white[1]);
  [[8, 33], [50, 31]].forEach(([x, y]) => { d.poly([[x, y - 7], [x - 3, y], [x + 3, y]], R.green[0]); d.px(x, y - 6, R.white[2]); }); return d.done(); };

/* ===== TAVAN LAMBASI (24×24) ===== */
I.tavan_ampul = () => { const d = T(24, 24); d.rect(11, 0, 2, 9, R.dark[1]); d.sRect(8, 8, 8, 3, R.dark); d.sEll(12, 15.5, 4, 4.5, ['#E8C860', '#FFF0A8', '#FFFFFF']); d.px(10, 13, '#FFFFFF'); return d.outline().done(); };
I.tavan_avize = () => { const d = T(24, 24); d.rect(11, 0, 2, 7, R.gold[0]); d.sRect(3, 7, 18, 2, R.gold);
  [3, 11, 19].forEach(x => { d.rect(x + 1, 9, 1, 3, R.gold[1]); d.ell(x + 1.5, 13, 1.5, 1.8, '#FFF0A8'); });
  for (let k = 0; k < 7; k++){ const a = k / 7 * Math.PI, x = 12 - Math.cos(a) * 8, y = 15 + Math.sin(a) * 5; d.px(x, y, k % 2 ? R.gold[2] : '#FFF6C8'); } d.ell(12, 18, 1.4, 1.4, R.gold[1]); return d.outline().done(); };

/* ===== MASA (60×39) ===== */
I.masa_calisma = () => { const d = T(60, 39); d.sRect(0, 0, 60, 4, R.wood); d.rect(0, 4, 60, 1, R.wood[0]);
  d.sRect(3, 5, 4, 34, R.wood); d.sRect(53, 5, 4, 34, R.wood); d.sRect(32, 5, 21, 14, R.wood); d.rect(33, 11, 19, 1, R.wood[0]);
  [8, 15].forEach(y => d.rect(41, y, 3, 1, R.gold[1])); d.rect(7, 30, 46, 2, R.wood[0]); return d.outline().done(); };
I.masa_sandik = () => { const d = T(60, 39); d.sRect(3, 6, 54, 33, R.oak); d.sRect(3, 6, 54, 5, R.wood); d.rect(3, 22, 54, 3, R.wood[1]);
  [6, 52].forEach(x => d.sRect(x, 6, 2, 33, R.dark)); d.sRect(26, 17, 8, 9, R.gold); d.rect(29, 21, 2, 3, R.dark[0]); return d.outline().done(); };

/* ===== MASA ÜSTÜ (24×24) ===== */
I.mu_firca = () => { const d = T(24, 24); d.sRect(6, 12, 12, 12, R.red); d.rect(6, 12, 12, 2, R.red[0]);
  [[8, 12, 5, 1, R.blue], [11, 12, 12, 2, R.yellow], [15, 12, 19, 4, R.green]].forEach(([x0, y0, x1, y1, r]) => { d.line(x0, y0, x1, y1 + 3, R.oak[1]); d.rect(x1 - 1, y1, 3, 3, r[1]); d.px(x1 - 1, y1, r[2]); }); return d.outline().done(); };
I.mu_lamba = () => { const d = T(24, 24); d.sRect(6, 21, 12, 3, R.dark); d.rect(11, 9, 2, 12, R.dark[1]); d.sPoly([[4, 11], [9, 2], [18, 2], [21, 11]], R.teal); d.rect(6, 11, 13, 1, '#FFF0A8'); d.ell(12.5, 13, 4, 1.4, '#FFF6C8'); return d.outline().done(); };
I.mu_sukulent = () => { const d = T(24, 24); d.sPoly([[6, 15], [18, 15], [16, 24], [8, 24]], R.terra); d.rect(6, 15, 12, 2, R.terra[0]);
  [[12, 9, 3, 5], [7, 12, 4, 2.4], [17, 12, 4, 2.4], [10, 11, 3, 2.4], [14, 11, 3, 2.4]].forEach(([x, y, rx, ry]) => d.sEll(x, y, rx, ry, R.green)); d.px(12, 6, R.green[2]); return d.outline().done(); };
I.mu_cayseti = () => { const d = T(24, 24); d.sRect(0, 21, 24, 3, R.grey);
  d.sEll(8, 14, 5, 6, R.red); d.sRect(5, 7, 7, 2, R.red); d.rect(7, 5, 3, 2, R.red[0]); d.line(13, 12, 16, 10, R.red[1]); d.px(16, 9, R.red[1]);   // demlik
  d.poly([[17, 12], [23, 12], [21, 16], [23, 21], [17, 21], [19, 16]], '#F6E8D8'); d.poly([[18, 15], [22, 15], [21, 16], [22, 20], [18, 20], [19, 16]], '#B8481A'); d.rect(17, 12, 6, 1, R.white[2]);   // ince belli bardak
  return d.outline().done(); };
I.mu_yerkure = () => { const d = T(24, 24); d.sRect(7, 21, 10, 3, R.wood); d.rect(11, 18, 2, 3, R.wood[1]);
  d.sEll(12, 10, 8, 8, R.blue); d.poly([[7, 5], [11, 3], [12, 8], [8, 11]], R.green[1]); d.poly([[13, 11], [17, 9], [16, 15], [13, 15]], R.green[1]); d.px(8, 6, R.green[2]).px(14, 11, R.green[2]);
  d.ell(12, 10, 10, 10, R.gold[1], (x, y, dx, dy) => dx * dx + dy * dy > 0.82 && dx > 0.15); return d.outline().done(); };
I.mu_altinfirca = () => { const d = T(24, 24); d.sPoly([[6, 13], [18, 13], [16, 23], [8, 23]], R.gold); d.rect(6, 13, 12, 1, R.gold[2]); d.sRect(9, 23, 6, 1, R.gold);
  d.line(12, 13, 17, 2, R.wood[1]); d.line(13, 13, 18, 2, R.wood[0]); d.sRect(17, 0, 4, 4, R.gold); d.px(18, 0, '#FFFFFF'); d.px(9, 15, '#FFF6C8'); return d.outline().done(); };

/* ===== KÖŞE (30×66) ===== */
I.kose_saksi = () => { const d = T(30, 66); d.sPoly([[8, 51], [22, 51], [20, 66], [10, 66]], R.terra); d.sRect(7, 49, 16, 3, R.terra);
  d.line(15, 49, 15, 30, R.green[0]); [[15, 26, 8, 9], [9, 36, 6, 7], [21, 35, 6, 7], [12, 20, 5, 6], [19, 22, 5, 6]].forEach(([x, y, rx, ry]) => d.sEll(x, y, rx, ry, R.green)); return d.outline().done(); };
I.kose_ayaklilamba = () => { const d = T(30, 66); d.sRect(9, 62, 12, 4, R.dark); d.rect(14, 18, 2, 44, R.dark[1]); d.rect(14, 18, 1, 44, R.dark[2]);
  d.sPoly([[5, 18], [9, 3], [21, 3], [25, 18]], R.cream); d.rect(5, 18, 21, 1, R.cream[0]); d.ell(15, 20, 7, 1.5, '#FFF6C8'); return d.outline().done(); };
I.kose_sovale = () => { const d = T(30, 66); d.line(6, 66, 13, 4, R.wood[1]); d.line(7, 66, 14, 4, R.wood[0]); d.line(24, 66, 17, 4, R.wood[1]); d.line(15, 44, 23, 66, R.wood[0]);
  d.sRect(3, 12, 24, 26, R.white); d.ell(11, 21, 4, 4, R.yellow[1]); d.rect(5, 30, 20, 6, R.green[1]); d.poly([[13, 30], [18, 24], [23, 30]], R.green[0]); d.ell(20, 18, 2, 2, R.red[1]);
  d.sRect(1, 38, 28, 3, R.wood); d.px(9, 40, R.red[1]).px(13, 40, R.blue[1]).px(17, 40, R.yellow[1]); return d.outline().done(); };
I.kose_kitaplik = () => { const d = T(30, 66); d.sRect(0, 4, 30, 62, R.wood); d.rect(3, 7, 24, 56, R.wood[0]);
  const cs = [R.red, R.blue, R.yellow, R.green, R.purple, R.terra, R.cream, R.teal];
  [9, 26, 43].forEach((y, s) => { let x = 4; for (let k = 0; x < 26; k++){ const r = cs[(k + s * 3) % cs.length], bw = 2 + (k % 3 === 1 ? 1 : 0), bh = 13 - (k % 4 === 2 ? 3 : 0); d.rect(x, y + 14 - bh, bw, bh, r[1]); d.rect(x, y + 14 - bh, 1, bh, r[2]); d.rect(x + 1, y + 16 - bh, bw - 1, 1, r[0]); x += bw; } d.sRect(3, y + 14, 24, 3, R.wood); });
  return d.outline().done(); };
I.kose_zeytin = () => { const d = T(30, 66); d.sPoly([[7, 51], [23, 51], [21, 66], [9, 66]], R.white); d.sRect(6, 49, 18, 3, R.white);
  d.line(15, 50, 14, 30, R.wood[1]); d.line(16, 50, 15, 30, R.wood[0]); d.line(14, 38, 9, 29, R.wood[1]); d.line(15, 35, 21, 25, R.wood[1]);
  const ol = ['#5E7040', '#8AA060', '#B0C488']; [[15, 21, 10, 9], [8, 27, 6, 5], [22, 23, 6, 5], [13, 15, 6, 5]].forEach(([x, y, rx, ry]) => d.sEll(x, y, rx, ry, ol));
  [[9, 20], [19, 26], [14, 15], [22, 21], [7, 28]].forEach(([x, y]) => d.px(x, y, '#2E2A22').px(x, y - 1, '#4A4636')); return d.outline().done(); };

/* ===== HALI (108×27) ===== */
const oval = (d, r, inset = 0) => d.ell(54, 13.5, 53 - inset, 13 - inset * 0.3, r);
I.hali_hasir = () => { const d = T(108, 27); oval(d, R.sand[1]); for (let y = 2; y < 26; y += 2) for (let x = (y % 4 ? 3 : 5); x < 106; x += 4){ d.px(x, y, R.sand[0]); d.px(x + 1, y, R.sand[2]); }
  d.ell(54, 13.5, 53, 13, R.sand[0], (x, y, dx, dy) => dx * dx + dy * dy > 0.88); return d.outline().done(); };
I.hali_yuvarlak = () => { const d = T(108, 27); oval(d, R.blue[1]); d.ell(54, 13.5, 44, 10, R.yellow[1]); d.ell(54, 13.5, 34, 7.4, R.red[1]); d.ell(54, 13.5, 22, 4.6, R.cream[2]);
  d.ell(54, 13.5, 53, 13, R.blue[0], (x, y, dx, dy) => dy > 0.55); return d.outline().done(); };
I.hali_pati = () => { const d = T(108, 27); d.sRect(5, 1, 98, 25, R.pink); d.rect(9, 4, 90, 19, R.pink[2]);
  [[24, 13], [54, 13], [84, 13]].forEach(([x, y]) => { d.ell(x, y + 2, 4.5, 3.6, R.pink[1]); [[-5, -3], [-2, -5], [2, -5], [5, -3]].forEach(([dx, dy]) => d.ell(x + dx, y + dy, 1.4, 1.4, R.pink[1])); }); return d.outline().done(); };
I.hali_post = () => { const d = T(108, 27); d.ell(54, 13.5, 53, 13, R.white[1]);
  for (let k = 0; k < 64; k++){ const a = k / 64 * Math.PI * 2, rr = k % 2 ? 1 : 0.94, x = 54 + Math.cos(a) * 53 * rr, y = 13.5 + Math.sin(a) * 13 * rr; d.px(x, y, k % 3 ? R.white[2] : R.white[0]); }
  for (let k = 0; k < 30; k++){ const x = 10 + (k * 37) % 88, y = 4 + (k * 13) % 19; d.rect(x, y, 3, 1, k % 2 ? R.white[0] : R.white[2]); }
  d.ell(54, 13.5, 53, 13, R.white[0], (x, y, dx, dy) => dy > 0.7); return d.outline('#8A8070').done(); };
I.hali_kilim = () => { const d = T(108, 27); d.rect(5, 1, 98, 25, R.red[1]); d.rect(5, 1, 98, 3, R.navy[1]); d.rect(5, 23, 98, 3, R.navy[1]);
  [20, 42, 66, 88].forEach(x => { d.poly([[x, 5], [x + 8, 13.5], [x, 22], [x - 8, 13.5]], R.yellow[1]); d.poly([[x, 8], [x + 5, 13.5], [x, 19], [x - 5, 13.5]], R.navy[1]); d.px(x, 13, R.red[2]); });
  for (let y = 2; y < 26; y += 2){ d.px(2, y, R.yellow[1]).px(3, y, R.yellow[1]); d.px(104, y, R.yellow[1]).px(105, y, R.yellow[1]); } d.rect(5, 1, 98, 1, R.red[2]); return d.outline().done(); };

/* ===== KÖFTE'NİN YERİ (52×40) ===== */
I.yatak_kutu = () => { const d = T(52, 40); d.sRect(6, 16, 40, 24, R.sand); d.rect(6, 16, 40, 3, R.sand[0]);
  d.sPoly([[6, 16], [0, 7], [16, 7], [20, 16]], R.sand); d.sPoly([[46, 16], [52, 7], [36, 7], [32, 16]], R.sand);
  d.rect(18, 26, 16, 1, R.sand[0]); d.ell(26, 31, 2.4, 2, R.red[1]); d.px(24, 29, R.red[1]).px(28, 29, R.red[1]); return d.outline().done(); };
I.yatak_yumusak = () => { const d = T(52, 40); d.sEll(26, 30, 25, 10, R.purple); d.ell(26, 29, 19, 6.5, R.purple[2]); d.ell(26, 30, 17, 5.4, '#E4D6F4'); for (let x = 5; x < 48; x += 5) d.px(x, 34, R.purple[0]); return d.outline().done(); };
I.yatak_kedievi = () => { const d = T(52, 40); d.sRect(2, 14, 24, 26, R.sand); d.ell(14, 28, 6.4, 7, R.wood[0]); d.sPoly([[0, 15], [14, 3], [28, 15]], R.terra);   // ev
  d.sRect(32, 4, 5, 36, R.sisal); for (let y = 6; y < 40; y += 3) d.rect(32, y, 5, 1, R.sisal[0]); d.sRect(27, 2, 24, 5, R.purple); d.sRect(38, 32, 14, 8, R.purple);   // tırmalama direği, platformlar
  d.line(46, 7, 46, 14, R.yellow[1]); d.sEll(46, 15.5, 2.2, 2.2, R.red); return d.outline().done(); };

/* ===== MAMA KABI (24×15) ===== */
I.mama_basit = () => { const d = T(24, 15); d.sPoly([[1, 6], [23, 6], [20, 15], [4, 15]], R.blue); d.ell(12, 6, 11, 2.6, R.wood[1]); [[8, 5], [13, 5], [16, 6], [10, 6]].forEach(([x, y]) => d.px(x, y, R.wood[2])); return d.outline().done(); };
I.mama_balik = () => { const d = T(24, 15); d.sPoly([[1, 6], [23, 6], [20, 15], [4, 15]], R.white); d.ell(12, 6, 11, 2.6, R.wood[1]);
  d.ell(10, 11, 3.6, 1.8, R.terra[1]); d.poly([[13, 11], [16, 9], [16, 13]], R.terra[1]); d.px(8, 10, R.dark[0]); return d.outline().done(); };

/* ===== OYUNCAK (21×18) ===== */
I.oy_yumak = () => { const d = T(21, 18); d.sEll(9, 10, 7.5, 7.5, R.red); d.line(4, 6, 14, 14, R.red[0]); d.line(3, 10, 12, 4, R.red[0]); d.line(7, 16, 15, 8, R.red[2]); d.line(15, 13, 20, 17, R.red[1]); return d.outline().done(); };
I.oy_fare = () => { const d = T(21, 18); d.sEll(9, 12, 7.5, 4.5, R.grey); d.sEll(4, 8, 2.4, 2.4, R.pink); d.px(3, 12, R.dark[0]); d.px(1, 13, R.pink[1]); d.line(16, 12, 20, 7, R.pink[1]); return d.outline().done(); };
I.oy_tuy = () => { const d = T(21, 18); d.line(1, 17, 13, 6, R.wood[2]); d.line(2, 17, 14, 6, R.wood[0]); d.line(13, 6, 16, 2, R.dark[1]); d.sEll(16, 3, 3.6, 2, R.teal); d.px(18, 2, R.yellow[1]).px(15, 4, R.red[1]); return d.outline().done(); };

/* ===== HASIR KOLTUK (80×62): Köfte'nin gerçek koltuğu, fotoğraftaki gibi yandan.
   İki yanda kıvrımlı açık meşe çerçeve (vidalı), aralarında arkaya yatık, öne doğru sarkan hasır şerit. ===== */
export function koltuk(){
  const d = T(80, 62), oakD = ['#8A6640', '#B48A5C', '#CFA878'];
  // uzak yan çerçeve (arkada, biraz koyu): arka ray + öndeki kıvrık kol + ayak
  d.poly([[30, 1], [35, 3], [11, 44], [6, 42]], oakD[1]); d.poly([[30, 1], [33, 2], [9, 43], [6, 42]], oakD[2]);
  d.sEll(9, 41, 7, 5.5, oakD); d.ell(9, 41, 3.4, 2.4, oakD[0]);                                           // öndeki yuvarlak kol (C biçimi)
  d.poly([[8, 45], [12, 45], [9, 58], [5, 58]], oakD[1]);
  // hasır şerit: arkada yatık sırt, büküm, öne doğru oturak
  const sling = [[32, 3], [70, 7], [56, 40], [48, 54], [10, 46], [16, 34]];
  d.poly(sling, R.sisal[1]);
  d.poly([[16, 34], [56, 40], [48, 54], [10, 46]], R.sisal[2]);                                            // oturak (ışık alan kısım)
  for (let y = 4; y < 54; y += 2) for (let x = 6; x < 72; x += 4){ const o = (y >> 1) % 2 ? 2 : 0, X = x + o, c = d.get(X, y); if (c === R.sisal[1] || c === R.sisal[2]){ d.px(X, y, R.sisal[0]); d.px(X + 1, y, c === R.sisal[2] ? '#E8D4AA' : R.sisal[2]); } }
  d.line(16, 34, 56, 40, R.sisal[0]); d.line(10, 46, 48, 54, '#8A6E46'); d.line(32, 3, 70, 7, R.sisal[0]);  // büküm, ön ve üst kenar
  // yakın yan çerçeve (önde, açık meşe): uzun eğik ray, ortada kol dayanağı, önde kısa ayak, arkada eğik ayak
  d.poly([[69, 4], [75, 7], [55, 50], [49, 50]], R.oak[1]); d.poly([[69, 4], [72, 5], [52, 50], [49, 50]], R.oak[2]);
  d.sEll(60, 34, 7, 4.5, R.oak);                                                                           // kol dayanağı
  d.poly([[48, 48], [55, 48], [52, 61], [45, 61]], R.oak[1]); d.poly([[48, 48], [50, 48], [47, 61], [45, 61]], R.oak[2]);   // ön ayak
  d.poly([[62, 32], [67, 30], [76, 61], [70, 61]], R.oak[1]); d.poly([[67, 30], [69, 30], [76, 61], [74, 61]], R.oak[0]);   // arka ayak
  d.sEll(52, 50, 5, 3.4, R.oak);                                                                           // öndeki yuvarlak uç
  [[66, 14], [60, 27], [53, 44], [50, 56]].forEach(([x, y]) => { d.px(x, y, '#F2F2F2'); d.px(x + 1, y, '#9A9A9A'); });   // vidalar
  return d.outline().done();
}
// Köfte koltukta yayılmış (fotoğraftaki gibi): sırtı hasıra yaslı, arka bacaklar uzanmış, kuyruk öne sarkık
function yayil(o = {}){
  const d = T(52, 54);
  d.sEll(29, 27, 13, 9, F);                                                                                // gövde (arkaya yaslı)
  d.ell(31, 29, 7, 5.5, FL[0]);                                                                            // açık göğüs
  d.poly([[18, 30], [4, 32], [3, 35], [18, 36]], F[1]); d.sEll(4, 33.5, 3, 2, FL);                         // uzanan arka bacak
  d.poly([[22, 33], [10, 37], [10, 40], [24, 37]], F[0]); d.sEll(10, 38.5, 3, 2, FL);                      // diğer arka bacak
  d.poly([[38, 26], [46, 27], [47, 30], [39, 31]], F[1]); d.sEll(46, 28.5, 3, 2, FL);                      // kol dayanağındaki ön pati
  for (let k = 0; k <= 12; k++){ const t = k / 12, x = 20 - 10 * t - 3 * Math.sin(t * 3), y = 33 + 18 * t; d.ell(x, y, 2.6 + t * 0.8, 2.2, k % 3 ? F[1] : F[2]); }   // koltuğun önünden sarkan kabarık kuyruk
  d.sEll(9, 50, 3.6, 3, F);
  bas(d, 33, 13 + (o.breath || 0), o);
  return d.outline(K.ol).done();
}

/* ===== KÖFTE (40×36) — ana sayfa portresinin renkleri: çikolata kahvesi tüy, bakır gözler, küçük kulaklar.
   Önden: oturma (normal, göz kırpma, kuyruk), esneme 3, sevinme 2, aç/küskün 2.
   Yandan (sağa bakar, sola yürürken aynalanır): yürüme 4, uzanma 2, uyuma 2, yeme 3, top taşıma 2. ===== */
const F = R.fur, FL = R.furL;
function bas(d, cx, cy, o = {}){
  // geniş yuvarlak baş (British Shorthair), küçük yuvarlak kulaklar
  const ear = (x, s) => { d.poly([[x - 4 * s, cy - 4], [x - 1 * s, cy - 10.5], [x + 3 * s, cy - 6]], F[1]); d.poly([[x - 2.5 * s, cy - 5], [x - 1 * s, cy - 8.5], [x + 1.5 * s, cy - 6]], K.ear); };
  if (!o.flat){ ear(cx - 7, 1); ear(cx + 7, -1); } else { d.poly([[cx - 11, cy - 3], [cx - 9, cy - 7], [cx - 5, cy - 6]], F[1]); d.poly([[cx + 11, cy - 3], [cx + 9, cy - 7], [cx + 5, cy - 6]], F[1]); }
  d.sEll(cx, cy, 11, 9, F); d.ell(cx - 5, cy + 3.5, 4.5, 3.4, FL[0]); d.ell(cx + 5, cy + 3.5, 4.5, 3.4, FL[0]);   // dolgun yanaklar
  d.px(cx - 3, cy - 6, F[0]).px(cx, cy - 7, F[0]).px(cx + 3, cy - 6, F[0]).px(cx, cy - 5, F[0]);                // alındaki tekir çizgileri
  if (o.closed){ d.rect(cx - 6, cy, 4, 1, K.pupil); d.rect(cx + 3, cy, 4, 1, K.pupil); }
  else if (o.half){ [cx - 6, cx + 3].forEach(x => { d.rect(x, cy, 4, 2, K.eye); d.rect(x, cy - 1, 4, 1, F[0]); d.px(x + 1, cy, K.pupil).px(x + 2, cy, K.pupil); }); }
  else if (o.heart){ [cx - 6, cx + 3].forEach(x => { d.px(x, cy - 1, '#E8384F').px(x + 2, cy - 1, '#E8384F').rect(x, cy, 4, 1, '#E8384F').rect(x + 1, cy + 1, 2, 1, '#E8384F'); }); }
  else { [cx - 6, cx + 3].forEach(x => { d.rect(x, cy - 2, 4, 4, K.eye); d.rect(x, cy - 2, 4, 1, K.eyeL); d.px(x, cy - 2, K.eyeH); d.rect(x + 1, cy - 1, 2, 3, K.pupil); d.px(x + 2, cy - 1, '#FFFFFF'); }); }
  d.rect(cx - 1, cy + 3, 3, 2, K.nose); d.px(cx, cy + 5, K.nose);
  if (o.mouth === 'yawn'){ d.ell(cx + 0.5, cy + 7, 3, 2.4, '#5A2A2A'); d.ell(cx + 0.5, cy + 8, 1.6, 1, K.pink); }
  else if (o.mouth === 'big'){ d.ell(cx + 0.5, cy + 7.5, 4, 3, '#5A2A2A'); d.ell(cx + 0.5, cy + 8.5, 2.4, 1.4, K.pink); }
  else if (o.tongue) d.px(cx, cy + 6, K.pink);
  if (!o.noWhisk){ d.line(cx - 13, cy + 3, cx - 7, cy + 4, K.whisk); d.line(cx - 13, cy + 6, cx - 7, cy + 5, K.whisk); d.line(cx + 7, cy + 4, cx + 13, cy + 3, K.whisk); d.line(cx + 7, cy + 5, cx + 13, cy + 6, K.whisk); }
}
function onden(o = {}){
  const d = T(40, 36), lift = o.lift || 0, sq = o.squash || 0;
  // kuyruk (sağ yandan)
  if (o.tail === 'up') d.poly([[28, 30 - lift], [34, 22 - lift], [35, 14 - lift], [37, 14 - lift], [37, 24 - lift], [31, 32 - lift]], F[0]);
  else if (o.tail === 'down') d.poly([[28, 32 - lift], [36, 34 - lift], [38, 33 - lift], [37, 35 - lift], [28, 35 - lift]], F[0]);
  else d.poly([[27, 32 - lift], [35, 31 - lift], [37, 26 - lift], [39, 26 - lift], [38, 33 - lift], [28, 35 - lift]], F[0]);
  d.sEll(20, 27 - lift + sq, 11.5, 8.5 - sq, F); d.ell(20, 29 - lift + sq, 6, 5 - sq * 0.5, FL[0]);                     // gövde, açık göğüs
  if (o.paws === 'up'){ d.sEll(10, 20 - lift, 3, 3.4, F); d.sEll(30, 20 - lift, 3, 3.4, F); }
  else { d.sEll(15, 34 - lift, 3.4, 2, FL); d.sEll(25, 34 - lift, 3.4, 2, FL); }
  bas(d, 20, 13 - lift + sq, o);
  return d.outline(K.ol).done();
}
function yandan(o = {}){
  const d = T(40, 36), b = o.body || 0, step = o.step;
  if (o.lie){                                                                                      // uzanma: karnının üstünde, patiler önde
    d.poly([[4, 30], [1, 24], [3, 22], [6, 28]], F[0]);
    d.sEll(17, 29, 14, 6.5, F); d.ell(17, 32, 9, 3, FL[0]); d.sEll(31, 34, 4, 1.8, FL); d.sEll(25, 34, 3.6, 1.8, FL);
    yuz(d, 31, 22 + (o.breath || 0), o); return d.outline(K.ol).done(); }
  if (o.curl){                                                                                     // kıvrılıp uyuma: top gibi, baş patilerin üstünde, kuyruk önden sarılı
    const br = o.breath || 0;
    d.sEll(18, 27 - br * 0.5, 15, 8.5 + br * 0.5, F);
    d.ell(18, 24 - br * 0.5, 10, 3, FL[0], (x, y, dx, dy) => dy < 0);                              // sırttaki ışık
    d.poly([[4, 30], [12, 34], [26, 35], [33, 32], [26, 33], [12, 32]], FL[1]);                     // öne sarılan kuyruk
    d.sEll(30, 27, 7, 6, F); d.ell(29, 25, 4, 2, FL[0]);                                            // baş
    d.poly([[26, 23], [28, 18], [31, 22]], F[1]); d.px(28, 20, K.ear); d.poly([[32, 22], [35, 18], [36, 24]], F[1]);
    d.rect(28, 27, 4, 1, K.pupil); d.rect(33, 27, 3, 1, K.pupil); d.px(31, 30, K.nose);             // kapalı gözler, burun
    d.sEll(25, 32, 3, 1.6, FL); return d.outline(K.ol).done(); }
  // kuyruk
  if (o.tailUp) d.poly([[6, 22], [2, 14], [3, 8], [6, 9], [5, 15], [9, 21]], F[0]); else d.poly([[6, 23], [1, 20], [0, 15], [3, 15], [4, 19], [8, 21]], F[0]);
  // bacaklar (yürüme adımı)
  const leg = (x, dx, c) => d.rect(x + dx, 27, 3, 7, c);
  const s = step === undefined ? 0 : [[-1, 1], [0, 0], [1, -1], [0, 0]][step % 4];
  leg(9, s[0], F[0]); leg(25, s[1], F[0]); d.rect(9 + s[0], 33, 3, 2, FL[0]); d.rect(25 + s[1], 33, 3, 2, FL[0]);
  d.sEll(18, 23 + b, 13, 7, F); d.ell(19, 26 + b, 9, 3, FL[0]);
  leg(13, s[1], F[1]); leg(28, s[0], F[1]); d.rect(13 + s[1], 33, 3, 2, FL[1]); d.rect(28 + s[0], 33, 3, 2, FL[1]);
  if (o.eat){ yuz(d, 32, 26 + (o.chew || 0), { ...o, down:true }); }
  else yuz(d, 31, 14 + b, o);
  if (o.ball){ d.sEll(38, 22 + b, 2.6, 2.6, R.red); }
  return d.outline(K.ol).done();
}
function yuz(d, cx, cy, o){   // yandan baş
  d.poly([[cx - 6, cy - 5], [cx - 4, cy - 11], [cx, cy - 6]], F[1]); d.poly([[cx - 5, cy - 6], [cx - 4, cy - 9], [cx - 2, cy - 6]], K.ear);
  d.poly([[cx + 1, cy - 6], [cx + 4, cy - 10.5], [cx + 6, cy - 5]], F[1]);
  d.sEll(cx, cy, 8.5, 7.5, F); d.ell(cx + 3, cy + 3, 4.5, 3, FL[0]);
  if (o.closed || o.down) d.rect(cx + 1, cy - 1, 4, 1, K.pupil);
  else { d.rect(cx + 1, cy - 2, 4, 4, K.eye); d.rect(cx + 1, cy - 2, 4, 1, K.eyeL); d.rect(cx + 3, cy - 1, 2, 3, K.pupil); d.px(cx + 4, cy - 1, '#FFFFFF'); }
  d.rect(cx + 7, cy + 2, 2, 2, K.nose); if (o.tongue) d.px(cx + 7, cy + 5, K.pink);
  d.line(cx + 4, cy + 4, cx + 10, cy + 3, K.whisk); d.line(cx + 4, cy + 5, cx + 10, cy + 6, K.whisk);
}
export function kofteFrames(){
  return {
    sit:[onden({}), onden({ closed:true }), onden({ tail:'up' }), onden({ tongue:true })],
    yawn:[onden({ closed:true, mouth:'yawn' }), onden({ closed:true, mouth:'big', tail:'up' }), onden({ half:true })],
    happy:[onden({ squash:2, tail:'up' }), onden({ lift:4, paws:'up', tail:'up', mouth:'yawn' }), onden({ heart:true, tail:'up' })],
    sad:[onden({ half:true, flat:true, tail:'down' }), onden({ closed:true, flat:true, tail:'down' })],
    walk:[0, 1, 2, 3].map(k => yandan({ step:k, body:k % 2 ? -1 : 0, tailUp:true })),
    lie:[yandan({ lie:true, closed:false }), yandan({ lie:true, breath:1 })],
    lounge:[yayil({}), yayil({ closed:true }), yayil({ tongue:true })],
    sleep:[yandan({ curl:true }), yandan({ curl:true, breath:1 })],
    eat:[yandan({ eat:true }), yandan({ eat:true, chew:1 }), yandan({ eat:true, tongue:true })],
    carry:[0, 2].map(k => yandan({ step:k, ball:true, tailUp:true })),
  };
}
