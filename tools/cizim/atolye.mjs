// Köfte'nin Atölyesi: eşya çizimleri (saydam zeminli, w×h). Sonuç { w, h, rows, cols }:
// rows satır dizisi ('.' saydam), cols harf → renk. Veri: atolye-veri.mjs.
export function T(w, h){
  const g = new Array(w * h).fill(null);
  const inb = (x, y) => x >= 0 && y >= 0 && x < w && y < h;
  const api = {
    w, h,
    px(x, y, c){ x = Math.round(x); y = Math.round(y); if (inb(x, y)) g[y * w + x] = c; return api; },
    rect(x, y, ww, hh, c){ for (let j = y; j < y + hh; j++) for (let i = x; i < x + ww; i++) api.px(i, j, c); return api; },
    ell(cx, cy, rx, ry, c, test){ for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){ const dx = (x + .5 - cx) / rx, dy = (y + .5 - cy) / ry; if (dx * dx + dy * dy <= 1 && (!test || test(x, y, dx, dy))) g[y * w + x] = c; } return api; },
    poly(pts, c){ for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){ let ins = false; const px = x + .5, py = y + .5; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++){ const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) ins = !ins; } if (ins) g[y * w + x] = c; } return api; },
    line(x0, y0, x1, y1, c){ x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1); const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let e = dx + dy; for (;;){ api.px(x0, y0, c); if (x0 === x1 && y0 === y1) break; const e2 = 2 * e; if (e2 >= dy){ e += dy; x0 += sx; } if (e2 <= dx){ e += dx; y0 += sy; } } return api; },
    map(x0, y0, rows, cmap){ rows.forEach((r, j) => [...r].forEach((ch, i) => { if (cmap[ch]) api.px(x0 + i, y0 + j, cmap[ch]); })); return api; },
    // dış kenar: dolu piksele değen boş piksellere koyu çizgi (eşyalar duvardan ayrılsın)
    outline(c = '#2A1D14'){ const o = g.slice(); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){ if (o[y * w + x]) continue; if ((x > 0 && o[y * w + x - 1]) || (x < w - 1 && o[y * w + x + 1]) || (y > 0 && o[(y - 1) * w + x]) || (y < h - 1 && o[(y + 1) * w + x])) g[y * w + x] = c; } return api; },
    done(){
      const L = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', cols = {}, back = new Map();
      const rows = [];
      for (let y = 0; y < h; y++){ let r = ''; for (let x = 0; x < w; x++){ const c = g[y * w + x]; if (!c){ r += '.'; continue; } if (!back.has(c)){ const k = L[back.size]; back.set(c, k); cols[k] = c; } r += back.get(c); } rows.push(r); }
      return { w, h, rows, cols };
    },
  };
  return api;
}
const O = '#2A1D14';
export const I = {};

/* ----- DUVAR KÂĞIDI (16×16 desen, tekrar eder) ----- */
I.duvar_krem = () => { const d = T(16, 16).rect(0, 0, 16, 16, '#E9D9BC'); d.px(3, 4, '#E2CFAE').px(11, 12, '#E2CFAE'); return d.done(); };
I.duvar_cizgili = () => { const d = T(16, 16).rect(0, 0, 16, 16, '#CFE3D6'); d.rect(0, 0, 3, 16, '#A9CDB8').rect(8, 0, 3, 16, '#A9CDB8'); d.rect(5, 0, 1, 16, '#F2F6F0').rect(13, 0, 1, 16, '#F2F6F0'); return d.done(); };
I.duvar_puanli = () => { const d = T(16, 16).rect(0, 0, 16, 16, '#F2D6DD'); [[3, 3], [11, 11]].forEach(([x, y]) => d.rect(x, y, 2, 2, '#E58FA6')); [[11, 3], [3, 11]].forEach(([x, y]) => d.rect(x, y, 2, 2, '#F7EEF0')); return d.done(); };
I.duvar_cini = () => { const d = T(16, 16).rect(0, 0, 16, 16, '#F4F1EA'); d.rect(0, 0, 16, 1, '#2E6FB8').rect(0, 0, 1, 16, '#2E6FB8');
  d.poly([[8, 3], [11, 8], [8, 13], [5, 8]], '#2E6FB8'); d.poly([[8, 5], [10, 8], [8, 11], [6, 8]], '#3AB0C0'); d.px(8, 8, '#D8302A'); [[2, 2], [14, 2], [2, 14], [14, 14]].forEach(([x, y]) => d.px(x, y, '#D8302A')); return d.done(); };

/* ----- ZEMİN (16×16) ----- */
I.zemin_parke = () => { const d = T(16, 16).rect(0, 0, 16, 16, '#B07A48'); d.rect(0, 7, 16, 1, '#8A5A32').rect(0, 15, 16, 1, '#8A5A32'); d.rect(5, 0, 1, 7, '#8A5A32').rect(12, 8, 1, 7, '#8A5A32'); d.rect(1, 2, 3, 1, '#C08A58').rect(8, 11, 3, 1, '#C08A58'); return d.done(); };
I.zemin_dama = () => { const d = T(16, 16).rect(0, 0, 16, 16, '#F0E8DA'); d.rect(0, 0, 8, 8, '#3A3A48').rect(8, 8, 8, 8, '#3A3A48'); d.px(1, 1, '#5A5A6A').px(9, 9, '#5A5A6A'); return d.done(); };
I.zemin_tas = () => { const d = T(16, 16).rect(0, 0, 16, 16, '#A8A098'); d.rect(0, 0, 16, 1, '#7E766E').rect(0, 0, 1, 8, '#7E766E').rect(0, 8, 16, 1, '#7E766E').rect(8, 8, 1, 8, '#7E766E'); d.px(4, 4, '#C2BAB0').px(12, 12, '#C2BAB0').px(3, 13, '#948C84'); return d.done(); };

/* ----- PENCERE MANZARASI (36×28) ----- */
I.pen_sehir = () => { const d = T(36, 28).rect(0, 0, 36, 28, '#A8D8F0'); d.ell(28, 6, 3, 3, '#FFF0A8');
  [[1, 14, 6], [7, 9, 5], [13, 16, 7], [21, 11, 6], [28, 15, 7]].forEach(([x, y, w], i) => { d.rect(x, y, w, 28 - y, i % 2 ? '#7A8AA8' : '#8E9CB8'); for (let yy = y + 2; yy < 26; yy += 3) for (let xx = x + 1; xx < x + w - 1; xx += 2) d.px(xx, yy, '#F2E6A8'); });
  return d.done(); };
I.pen_gece = () => { const d = T(36, 28).rect(0, 0, 36, 28, '#1A2448'); d.ell(27, 7, 4, 4, '#F6F0C8'); d.ell(29, 6, 3.4, 3.4, '#1A2448');
  [[4, 4], [11, 9], [18, 3], [7, 15], [33, 15], [22, 12]].forEach(([x, y]) => d.px(x, y, '#FFFFFF'));
  [[1, 18, 6], [8, 15, 6], [15, 20, 7], [23, 17, 6], [30, 19, 6]].forEach(([x, y, w]) => { d.rect(x, y, w, 28 - y, '#2E3560'); for (let yy = y + 2; yy < 26; yy += 3) d.px(x + 2, yy, '#F2C85A'); });
  return d.done(); };
I.pen_deniz = () => { const d = T(36, 28).rect(0, 0, 36, 28, '#9ED8F4'); d.ell(8, 6, 3, 3, '#FFF0A8'); d.rect(0, 14, 36, 14, '#2E86C0');
  [[3, 18], [14, 22], [24, 17], [29, 24]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8ACCF0')); d.poly([[20, 13], [24, 6], [24, 13]], '#FFFFFF'); d.rect(18, 13, 9, 2, '#B5583A'); d.ell(4, 25, 6, 4, '#F2D8A0'); return d.done(); };
I.pen_balon = () => { const d = T(36, 28).rect(0, 0, 36, 28, '#F6D8B0'); d.poly([[0, 28], [0, 18], [5, 14], [8, 19], [13, 13], [17, 19], [23, 15], [28, 20], [36, 16], [36, 28]], '#D8A878');
  [[6, 15], [13, 14], [23, 16]].forEach(([x, y]) => d.poly([[x - 1, y + 4], [x + 1, y - 1], [x + 3, y + 4]], '#C08858'));   // peri bacaları
  [[8, 5, '#E2442E'], [20, 3, '#F2C43A'], [29, 7, '#2E86C0']].forEach(([x, y, c]) => { d.ell(x, y, 3, 3.4, c); d.rect(x - 1, y + 4, 2, 2, '#8A5A2A'); });
  return d.done(); };
I.pen_karlidag = () => { const d = T(36, 28).rect(0, 0, 36, 28, '#BFE0F4'); d.poly([[0, 28], [0, 20], [8, 14], [14, 18], [20, 5], [27, 13], [36, 10], [36, 28]], '#8A94A8');
  d.poly([[20, 5], [17, 10], [23, 10]], '#FFFFFF'); d.poly([[8, 14], [6, 16], [10, 16]], '#FFFFFF'); d.rect(0, 23, 36, 5, '#F6F8FC'); return d.done(); };

/* ----- TAVAN LAMBASI (16×16) ----- */
I.tavan_ampul = () => { const d = T(16, 16); d.rect(7, 0, 1, 7, '#3A2A20'); d.rect(5, 6, 6, 2, '#5A4A3A'); d.ell(8, 10.5, 2.6, 3, '#FFF0A8'); d.px(7, 10, '#FFFFFF'); return d.done(); };
I.tavan_avize = () => { const d = T(16, 16); d.rect(7, 0, 1, 5, '#8A6A2A'); d.rect(2, 5, 12, 1, '#E0A526');
  [2, 8, 13].forEach(x => { d.rect(x, 6, 1, 2, '#E0A526'); d.px(x, 8, '#FFF0A8'); });
  for (let k = 0; k < 5; k++){ const x = 8 + Math.round(Math.cos(k * 1.256 - 1.57) * 4), y = 11 + Math.round(Math.sin(k * 1.256 - 1.57) * 3); d.px(x, y, '#F2C43A'); } d.px(8, 11, '#FFF6C8'); return d.done(); };

/* ----- MASA (40×26) ----- */
I.masa_calisma = () => { const d = T(40, 26); d.rect(0, 0, 40, 3, '#9A6A3E'); d.rect(0, 3, 40, 1, '#6E4A2A');
  d.rect(2, 4, 3, 22, '#7A5232'); d.rect(35, 4, 3, 22, '#7A5232'); d.rect(22, 4, 13, 9, '#8A5E38'); d.rect(22, 8, 13, 1, '#6E4A2A'); d.px(28, 6, '#E0A526').px(28, 11, '#E0A526'); return d.outline().done(); };
I.masa_sandik = () => { const d = T(40, 26); d.rect(2, 4, 36, 22, '#A8784A'); d.rect(2, 4, 36, 3, '#8A5A32'); d.rect(2, 14, 36, 2, '#8A5A32');
  [4, 35].forEach(x => d.rect(x, 4, 1, 22, '#5A3A20')); d.rect(17, 12, 6, 6, '#C8A040'); d.px(20, 15, '#5A3A20'); return d.outline().done(); };

/* ----- MASA ÜSTÜ (16×16) ----- */
I.mu_firca = () => { const d = T(16, 16); d.rect(4, 8, 8, 8, '#E2442E'); d.rect(4, 8, 8, 1, '#B8301E');
  d.line(6, 8, 4, 1, '#C8925A'); d.px(4, 0, '#2E86C0').px(4, 1, '#2E86C0'); d.line(8, 8, 9, 2, '#C8925A'); d.px(9, 1, '#F2C43A').px(9, 2, '#F2C43A'); d.line(10, 8, 12, 3, '#C8925A'); d.px(12, 2, '#3AB04A'); return d.outline().done(); };
I.mu_lamba = () => { const d = T(16, 16); d.rect(4, 14, 8, 2, '#3A3A48'); d.rect(7, 6, 2, 8, '#3A3A48'); d.poly([[3, 7], [6, 1], [12, 1], [14, 7]], '#2E9A8A'); d.rect(5, 7, 7, 1, '#FFF0A8'); return d.outline().done(); };
I.mu_sukulent = () => { const d = T(16, 16); d.poly([[4, 10], [12, 10], [11, 16], [5, 16]], '#C8703A'); d.rect(4, 10, 8, 1, '#A85A2A');
  d.ell(8, 8, 4, 2.4, '#5AA06A'); d.ell(8, 6, 2.4, 2, '#7AC08A'); d.px(5, 8, '#3A8A5A').px(11, 8, '#3A8A5A').px(8, 4, '#9AD8A8'); return d.outline().done(); };
I.mu_cayseti = () => { const d = T(16, 16); d.rect(0, 14, 16, 2, '#C0C4CC');                                         // tepsi
  d.ell(5, 9, 3.4, 4.4, '#B8301E'); d.rect(3, 4, 5, 1, '#9A2414'); d.px(9, 7, '#B8301E').px(10, 6, '#B8301E');         // çaydanlık
  d.poly([[11, 8], [15, 8], [14, 11], [15, 14], [11, 14], [12, 11]], '#F6E8D8'); d.rect(12, 10, 2, 4, '#A8401A');      // ince belli bardak
  return d.outline().done(); };
I.mu_yerkure = () => { const d = T(16, 16); d.rect(5, 14, 6, 2, '#6B4A1E'); d.rect(7, 12, 2, 2, '#8A6A3A');
  d.ell(8, 6.5, 5.4, 5.4, '#3A8AD8'); d.poly([[5, 3], [8, 2], [8, 6], [5, 7]], '#5AB04A'); d.poly([[9, 7], [12, 6], [11, 10], [9, 10]], '#5AB04A');
  d.ell(8, 6.5, 6.6, 6.6, '#C8901E', (x, y, dx, dy) => dx * dx + dy * dy > 0.8 && dx > 0.1); return d.outline().done(); };
I.mu_altinfirca = () => { const d = T(16, 16); d.poly([[4, 9], [12, 9], [11, 15], [5, 15]], '#E0A526'); d.rect(4, 9, 8, 1, '#F8DC86'); d.rect(6, 15, 4, 1, '#9A6A08');
  d.line(8, 9, 11, 1, '#9A6A08'); d.rect(11, 0, 2, 3, '#F2C43A'); d.px(12, 0, '#FFF6C8'); d.px(5, 11, '#F8DC86'); return d.outline().done(); };

/* ----- KÖŞE (20×44) ----- */
I.kose_saksi = () => { const d = T(20, 44); d.poly([[5, 34], [15, 34], [14, 44], [6, 44]], '#C8703A'); d.rect(5, 34, 10, 2, '#A85A2A');
  d.ell(10, 27, 6, 7, '#4A9A5A'); d.ell(7, 24, 3, 4, '#5AB06A'); d.ell(13, 23, 3, 4, '#5AB06A'); d.line(10, 34, 10, 22, '#3A7A4A'); return d.outline().done(); };
I.kose_ayaklilamba = () => { const d = T(20, 44); d.rect(6, 41, 8, 3, '#3A3A48'); d.rect(9, 12, 2, 29, '#3A3A48'); d.poly([[3, 12], [6, 2], [14, 2], [17, 12]], '#F2E6C8'); d.rect(3, 12, 14, 1, '#D8C8A0'); d.rect(5, 13, 10, 1, '#FFF6C8'); return d.outline().done(); };
I.kose_sovale = () => { const d = T(20, 44); d.line(4, 44, 9, 2, '#9A6A3E'); d.line(16, 44, 11, 2, '#9A6A3E'); d.line(10, 30, 15, 44, '#7A5232');
  d.rect(2, 8, 16, 18, '#F6F2E6'); d.rect(2, 8, 16, 1, '#C8B8A0'); d.ell(8, 15, 3, 3, '#F2C43A'); d.rect(4, 20, 12, 4, '#3A9A5A'); d.px(13, 13, '#E2442E').px(14, 12, '#E2442E'); d.rect(1, 26, 18, 2, '#7A5232'); return d.outline().done(); };
I.kose_kitaplik = () => { const d = T(20, 44); d.rect(0, 4, 20, 40, '#8A5E38'); d.rect(2, 6, 16, 36, '#5E3E22');
  const cs = ['#E2442E', '#2E86C0', '#F2C43A', '#3AB04A', '#8A4AD8', '#E8783A', '#F6F0E0'];
  [8, 19, 30].forEach((y, r) => { for (let x = 3, k = r; x < 17; x += 2, k++) d.rect(x, y - 2 - (k % 3 === 0 ? 1 : 0), 2, 10 - 8 + 8 - (k % 3 === 0 ? -1 : 0) - 0, cs[k % cs.length]); d.rect(2, y + 8, 16, 1, '#8A5E38'); });
  return d.outline().done(); };
I.kose_zeytin = () => { const d = T(20, 44); d.poly([[4, 34], [16, 34], [14, 44], [6, 44]], '#E8DCC8'); d.rect(4, 34, 12, 2, '#C8B8A0');
  d.line(10, 34, 9, 20, '#7A5A3A'); d.line(9, 26, 6, 20, '#7A5A3A'); d.line(9, 24, 13, 17, '#7A5A3A');
  d.ell(10, 15, 8, 7, '#8AA060'); d.ell(6, 18, 4, 3, '#9AB070'); d.ell(14, 13, 4, 3, '#9AB070');
  [[6, 13], [12, 18], [9, 10], [15, 16]].forEach(([x, y]) => d.px(x, y, '#3A3A2A')); return d.outline().done(); };

/* ----- HALI (72×18) ----- */
I.hali_hasir = () => { const d = T(72, 18); d.ell(36, 9, 34, 8.4, '#D8BC88'); for (let y = 2; y < 17; y += 2) for (let x = (y % 4) ? 4 : 6; x < 68; x += 4) d.px(x, y, '#C0A070'); d.ell(36, 9, 34, 8.4, '#B89860', (x, y, dx, dy) => dx * dx + dy * dy > 0.86); return d.done(); };
I.hali_yuvarlak = () => { const d = T(72, 18); d.ell(36, 9, 34, 8.4, '#3A86C0'); d.ell(36, 9, 28, 6.4, '#F2C43A'); d.ell(36, 9, 22, 4.6, '#E2442E'); d.ell(36, 9, 14, 2.8, '#F6EEDA'); return d.done(); };
I.hali_pati = () => { const d = T(72, 18); d.rect(4, 1, 64, 16, '#E58FA6'); d.rect(6, 3, 60, 12, '#F2C6D2');
  [[16, 9], [36, 9], [56, 9]].forEach(([x, y]) => { d.ell(x, y + 1, 3, 2.4, '#E58FA6'); [[-3, -3], [-1, -4], [1, -4], [3, -3]].forEach(([dx, dy]) => d.px(x + dx, y + dy, '#E58FA6')); }); return d.done(); };
I.hali_post = () => { const d = T(72, 18); d.ell(36, 9, 35, 8.6, '#F2EBDD');
  for (let k = 0; k < 40; k++){ const a = k / 40 * Math.PI * 2, x = 36 + Math.cos(a) * 35, y = 9 + Math.sin(a) * 8.6; d.px(x, y, k % 2 ? '#FFFFFF' : '#E2D8C6'); }
  [[14, 6], [28, 11], [44, 5], [58, 10], [22, 13], [50, 13]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#E2D8C6')); return d.done(); };
I.hali_kilim = () => { const d = T(72, 18); d.rect(4, 1, 64, 16, '#B8302A'); d.rect(4, 1, 64, 2, '#1E2A5A'); d.rect(4, 15, 64, 2, '#1E2A5A');
  [14, 28, 44, 58].forEach(x => { d.poly([[x, 4], [x + 5, 9], [x, 14], [x - 5, 9]], '#E8B030'); d.poly([[x, 6], [x + 3, 9], [x, 12], [x - 3, 9]], '#1E2A5A'); });
  for (let y = 2; y < 17; y += 2){ d.px(2, y, '#E8B030'); d.px(69, y, '#E8B030'); } return d.done(); };

/* ----- KÖFTE'NİN YERİ (40×32) ----- */
I.yatak_koltuk = () => { const d = T(40, 38);                                                          // hasır tırmalama koltuğu (gerçek Köfte'nin koltuğu)
  d.poly([[7, 4], [11, 1], [31, 1], [35, 4], [35, 30], [7, 30]], '#C8A878');                         // eğik yüksek sırt (hasır)
  for (let y = 3; y < 30; y += 2) for (let x = 8 + (y % 4 === 1 ? 1 : 0); x < 35; x += 3) d.px(x, y, '#A88A5A');
  d.rect(3, 28, 36, 4, '#C8A878'); for (let x = 4; x < 38; x += 3) d.px(x, 29, '#A88A5A');           // oturak
  d.poly([[0, 24], [9, 22], [11, 36], [2, 38], [0, 30]], '#D8B888'); d.poly([[31, 22], [40, 24], [40, 38], [33, 36]], '#D8B888');   // ahşap yan kollar
  d.px(3, 28, '#8A6A3A').px(37, 28, '#8A6A3A'); d.px(5, 33, '#8A6A3A').px(36, 33, '#8A6A3A'); return d.outline().done(); };
I.yatak_kutu = () => { const d = T(40, 32); d.rect(4, 12, 32, 20, '#C89A5A'); d.rect(4, 12, 32, 2, '#A87A3A');
  d.poly([[4, 12], [0, 6], [12, 6], [16, 12]], '#D8AA6A'); d.poly([[36, 12], [40, 6], [28, 6], [24, 12]], '#D8AA6A');
  d.rect(14, 20, 12, 1, '#A87A3A'); d.px(20, 24, '#E2442E').px(19, 23, '#E2442E').px(21, 23, '#E2442E'); return d.outline().done(); };
I.yatak_yumusak = () => { const d = T(40, 32); d.ell(20, 24, 19, 8, '#8A5AB8'); d.ell(20, 23, 15, 5.4, '#D8C8F0'); d.ell(20, 18, 19, 4, '#9A6AC8', (x, y) => y < 18); for (let x = 4; x < 38; x += 4) d.px(x, 26, '#6A3A98'); return d.outline().done(); };
I.yatak_kedievi = () => { const d = T(40, 32); d.rect(2, 10, 18, 22, '#C8A878'); d.ell(11, 21, 5, 5, '#5A3A20'); d.poly([[0, 11], [11, 2], [22, 11]], '#A85A3A');   // ev
  d.rect(24, 4, 3, 28, '#D8C8A8'); for (let y = 6; y < 32; y += 3) d.rect(24, y, 3, 1, '#B8A880'); d.rect(20, 2, 18, 4, '#8A5AB8'); d.rect(30, 26, 10, 6, '#8A5AB8');   // tırmalama direği ve platform
  d.line(34, 6, 34, 11, '#F2C43A'); d.ell(34, 12, 1.6, 1.6, '#E2442E'); return d.outline().done(); };

/* ----- MAMA KABI (16×10) ----- */
I.mama_basit = () => { const d = T(16, 10); d.poly([[1, 4], [15, 4], [13, 10], [3, 10]], '#2E86C0'); d.ell(8, 4, 7, 1.6, '#8A5A32'); d.px(6, 3, '#A87040').px(9, 3, '#A87040'); return d.outline().done(); };
I.mama_balik = () => { const d = T(16, 10); d.poly([[1, 4], [15, 4], [13, 10], [3, 10]], '#F6F0E0'); d.ell(8, 4, 7, 1.6, '#8A5A32');
  d.ell(7, 7, 2.4, 1.2, '#E8783A'); d.poly([[9, 7], [11, 6], [11, 8]], '#E8783A'); return d.outline().done(); };

/* ----- OYUNCAK (14×12) ----- */
I.oy_yumak = () => { const d = T(14, 12); d.ell(6, 7, 5, 5, '#E2442E'); d.line(3, 4, 9, 10, '#B8301E'); d.line(2, 7, 8, 3, '#B8301E'); d.line(10, 9, 13, 11, '#E2442E'); return d.outline().done(); };
I.oy_fare = () => { const d = T(14, 12); d.ell(6, 8, 5, 3, '#A8A8B8'); d.ell(3, 5, 1.6, 1.6, '#E8A8B8'); d.px(2, 8, '#1A1A1A'); d.line(11, 8, 13, 5, '#E8A8B8'); return d.outline().done(); };
I.oy_tuy = () => { const d = T(14, 12); d.line(1, 11, 9, 4, '#C8925A'); d.line(9, 4, 11, 1, '#1A1A1A'); d.ell(11, 2, 2.4, 1.4, '#3AB0C0'); d.px(12, 1, '#F2C43A').px(10, 3, '#E2442E'); return d.outline().done(); };

/* ----- KÖFTE (28×26): oturan, koyu çikolata, bakır gözlü. 4 kare: normal, göz kırpma, kuyruk 2 ----- */
function kofte(blink, tail){ const d = T(28, 26), c = '#3B2D28', k = '#2E221E', l = '#4B3A33';
  // kuyruk
  if (tail) d.poly([[20, 22], [26, 18], [27, 13], [25, 13], [24, 18], [19, 20]], k); else d.poly([[20, 22], [26, 22], [27, 17], [25, 17], [24, 21], [19, 20]], k);
  d.ell(14, 19, 8, 7, c); d.ell(14, 21, 5, 4, l);                                                       // gövde, göğüs
  d.ell(14, 9, 8, 6.6, c);                                                                                // geniş yuvarlak baş
  d.poly([[6, 6], [7, 1], [11, 4]], c); d.poly([[22, 6], [21, 1], [17, 4]], c); d.px(8, 3, '#7A4F4C').px(20, 3, '#7A4F4C');   // küçük kulaklar
  if (blink){ d.rect(9, 9, 3, 1, '#140D0B'); d.rect(16, 9, 3, 1, '#140D0B'); }
  else { [9, 16].forEach(x => { d.rect(x, 8, 3, 3, '#CF7A1E'); d.px(x + 1, 8, '#EEA13A'); d.px(x + 1, 9, '#140D0B').px(x + 1, 10, '#140D0B'); d.px(x, 8, '#F6C46A'); }); }
  d.rect(13, 11, 2, 1, '#221815'); d.px(14, 12, '#E48EA0');                                               // burun, dil ucu
  d.line(4, 11, 8, 12, '#D6CEC0'); d.line(4, 13, 8, 13, '#D6CEC0'); d.line(20, 12, 24, 11, '#D6CEC0'); d.line(20, 13, 24, 13, '#D6CEC0');   // bıyıklar
  d.rect(9, 24, 4, 2, l); d.rect(15, 24, 4, 2, l);                                                        // ön patiler
  return d.outline('#140D0B').done(); }
export const KOFTE = { normal:kofte(false, false), blink:kofte(true, false), tail:kofte(false, true) };
