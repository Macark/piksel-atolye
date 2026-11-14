// Köfte'nin Atölyesi, 2. aşama çizimleri: yeni eşyalar, kıyafetler, mama ve efektler.
// Aynı palet ve kurallar (atolye.mjs): gölge/ana/ışık, ışık sol üstten, koyu kahve dış çizgi.
import { T, P as R } from './atolye.mjs';
export const I2 = {};
I2.bos = () => T(1, 1).done();                                                                      // boş yuva (şömine, süs)
// oyuncak (21×18)
I2.oy_top = () => { const d = T(21, 18); d.sEll(10, 10, 7, 7, R.red); d.ell(10, 10, 7, 7, R.white[2], (x, y, dx, dy) => Math.abs(dy) < 0.22); d.px(7, 6, '#FFFFFF'); return d.outline().done(); };
I2.oy_ip = () => { const d = T(21, 18); d.sRect(2, 8, 4, 4, R.blue); d.sRect(15, 8, 4, 4, R.blue); for (let x = 6; x < 15; x++){ d.px(x, 9 + (x % 2), R.cream[1]); d.px(x, 10 - (x % 2), R.terra[1]); } d.line(2, 12, 0, 16, R.cream[1]); d.line(19, 12, 20, 16, R.cream[1]); return d.outline().done(); };
I2.oy_sepet = () => { const d = T(21, 18); d.sPoly([[2, 7], [19, 7], [17, 18], [4, 18]], R.sisal); for (let y = 9; y < 18; y += 2) for (let x = 4; x < 18; x += 3) d.px(x + (y % 4 ? 1 : 0), y, R.sisal[0]);
  d.sEll(7, 6, 3.4, 3.4, R.red); d.sEll(14, 5, 3, 3, R.blue); d.line(10, 7, 12, 1, R.wood[1]); d.sEll(12, 1.5, 2, 1.5, R.teal); d.sRect(2, 7, 17, 2, R.sisal); return d.outline().done(); };
// su kabı (20×13), mama kabının yanında
I2.su_kabi = () => { const d = T(20, 13); d.sPoly([[1, 5], [19, 5], [16, 13], [4, 13]], R.teal); d.ell(10, 5, 9, 2.2, R.sky[1]); d.px(6, 4, '#FFFFFF').px(7, 4, R.sky[2]); return d.outline().done(); };
I2.su_seramik = () => { const d = T(20, 13); d.sPoly([[1, 5], [19, 5], [16, 13], [4, 13]], R.white); d.ell(10, 5, 9, 2.2, R.sky[1]); d.px(6, 4, '#FFFFFF'); d.rect(5, 9, 10, 1, R.pink[1]); return d.outline().done(); };
// tasma askısı (26×20), duvarda; açılan kıyafetler üstünde asılı görünür
I2.aski_tasma = () => { const d = T(26, 20); d.sRect(1, 2, 24, 4, R.wood); [5, 13, 21].forEach(x => { d.rect(x, 6, 1, 3, R.dark[1]); d.px(x + 1, 8, R.dark[1]); }); d.px(3, 4, R.gold[1]).px(22, 4, R.gold[1]); return d.outline().done(); };
// Köfte'nin yatağı (52×40)
I2.yatak_tunel = () => { const d = T(52, 40); d.sEll(26, 26, 25, 13, R.sisal); d.ell(26, 26, 25, 13, R.sisal[0], (x, y, dx, dy) => dy > 0.65);
  for (let k = 0; k < 8; k++) d.line(4 + k * 6, 16, 4 + k * 6, 37, R.sisal[0]); d.sEll(44, 26, 6, 9, ['#3A2A1A', '#4A3622', '#5A4430']); d.ell(44, 26, 4, 7, '#2A1A10'); d.sEll(10, 14, 3, 3, R.red); d.line(10, 11, 12, 6, R.dark[1]); return d.outline().done(); };
// masa üstü (24×24)
I2.mu_plak = () => { const d = T(24, 24); d.sRect(1, 13, 22, 9, R.wood); d.sEll(10, 15, 8, 3, R.dark); d.ell(10, 15, 2.4, 1, R.red[1]); d.line(18, 13, 14, 15, R.grey[2]); d.rect(17, 11, 3, 3, R.grey[1]);
  d.sPoly([[16, 2], [23, 0], [22, 10], [18, 11]], R.gold); d.rect(17, 10, 2, 3, R.gold[0]); d.rect(3, 22, 2, 2, R.wood[0]); d.rect(19, 22, 2, 2, R.wood[0]); return d.outline().done(); };
I2.mu_akvaryum = () => { const d = T(24, 24); d.sRect(1, 4, 22, 18, R.sky); d.rect(2, 5, 20, 3, R.sky[2]); d.rect(1, 20, 22, 2, R.sand[1]);
  d.line(6, 20, 5, 12, R.green[1]); d.line(7, 20, 9, 14, R.green[0]); d.line(18, 20, 19, 13, R.green[1]); d.ell(13, 12, 3, 1.8, R.terra[1]); d.poly([[16, 12], [18, 10], [18, 14]], R.terra[1]); d.px(12, 11, R.dark[0]);
  d.px(9, 9, '#FFFFFF').px(10, 7, '#FFFFFF'); d.sRect(0, 2, 24, 3, R.dark); d.sRect(0, 22, 24, 2, R.dark); return d.outline().done(); };
// halı (108×27)
I2.hali_yolluk = () => { const d = T(108, 27); d.rect(2, 5, 104, 17, R.red[1]); d.rect(2, 5, 104, 2, R.navy[1]); d.rect(2, 20, 104, 2, R.navy[1]);
  for (let x = 10; x < 100; x += 12){ d.poly([[x, 9], [x + 4, 13.5], [x, 18], [x - 4, 13.5]], R.yellow[1]); d.px(x, 13, R.navy[1]); } d.rect(2, 5, 104, 1, R.red[2]); for (let y = 6; y < 22; y += 2){ d.px(0, y, R.cream[1]); d.px(107, y, R.cream[1]); } return d.outline().done(); };
I2.hali_kareli = () => { const d = T(108, 27); d.rect(3, 1, 102, 25, R.mint[2]); for (let y = 1; y < 26; y += 6) for (let x = 3; x < 105; x += 12) d.rect(x + ((y / 6 | 0) % 2) * 6, y, 6, 6, R.mint[1]);
  d.rect(3, 1, 102, 1, '#FFFFFF'); d.rect(3, 25, 102, 1, R.mint[0]); return d.outline().done(); };
// şömine (58×49), duvar dibinde
I2.somine = () => { const d = T(56, 40); d.sRect(2, 5, 52, 35, R.stone); d.sRect(0, 1, 56, 5, R.wood); for (let y = 8; y < 40; y += 5) for (let x = 3 + ((y / 5 | 0) % 2) * 4; x < 53; x += 9) d.rect(x, y, 1, 4, R.stone[0]);
  d.rect(14, 15, 28, 25, '#2A1E1A'); d.ell(28, 15, 14, 5, '#2A1E1A', (x, y) => y < 15); d.sRect(16, 33, 24, 3, R.wood);
  d.ell(28, 30, 8, 6, '#E8602E', (x, y) => y < 33); d.ell(28, 31, 5, 4, '#F2C43A', (x, y) => y < 33); d.ell(28, 32, 2.6, 2.4, '#FFF0A8', (x, y) => y < 33); return d.outline().done(); };
// süsler (68×10), pencerenin üstünde
const yay = (x, a) => Math.round(Math.sin(x / 68 * Math.PI) * a);
I2.sus_celenk = () => { const d = T(68, 10); for (let x = 2; x < 66; x++){ const y = 3 + yay(x, 4); d.rect(x, y - 1, 1, 3, x % 3 ? R.green[1] : R.green[0]); }
  [[8, 4], [22, 6], [34, 7], [46, 6], [60, 4]].forEach(([x, y], i) => d.sEll(x, y + 1, 1.6, 1.6, i % 2 ? R.red : R.gold)); d.sEll(34, 3, 3, 2, R.red); return d.outline().done(); };
I2.sus_fener = () => { const d = T(68, 10); for (let x = 2; x < 66; x++) d.px(x, 1 + yay(x, 3), R.dark[1]);
  [[10, R.red], [24, R.gold], [44, R.teal], [58, R.red]].forEach(([x, r]) => { const y = 2 + yay(x, 3); d.sEll(x, y + 4, 2.4, 3, r); d.rect(x - 1, y + 1, 2, 1, R.gold[0]); d.px(x, y + 4, '#FFF0A8'); });
  d.sEll(34, 5, 2.4, 2.4, R.gold); d.px(35, 4, R.navy[1]); return d.outline().done(); };
I2.sus_isik = () => { const d = T(68, 10); for (let x = 2; x < 66; x++) d.px(x, 2 + yay(x, 4), R.green[0]);
  for (let x = 5, k = 0; x < 64; x += 5, k++){ const y = 3 + yay(x, 4); d.rect(x, y, 2, 3, [R.red[2], R.yellow[2], R.blue[2], R.green[2]][k % 4]); } return d.done(); };

/* ===== KIYAFETLER (Köfte'nin boynuna ya da başına) ===== */
export const KIY = {};
KIY.tasma_kirmizi = () => { const d = T(14, 4); d.sRect(0, 0, 14, 3, R.red); d.sEll(7, 3, 1.6, 1.4, R.gold); return d.done(); };
KIY.fular_mavi = () => { const d = T(16, 8); d.sRect(0, 0, 16, 3, R.blue); d.sPoly([[3, 2], [13, 2], [8, 8]], R.blue); d.px(6, 4, R.white[2]).px(9, 5, R.white[2]); return d.outline().done(); };
KIY.papyon = () => { const d = T(12, 6); d.sPoly([[0, 0], [5, 2], [0, 5]], R.red); d.sPoly([[12, 0], [7, 2], [12, 5]], R.red); d.sRect(5, 1, 2, 3, R.red); d.px(2, 2, R.white[2]).px(9, 2, R.white[2]); return d.outline().done(); };
KIY.bere_kirmizi = () => { const d = T(16, 8); d.sEll(8, 5, 8, 3.6, R.red); d.rect(1, 6, 14, 2, R.red[0]); d.rect(7, 0, 2, 2, R.red[1]); return d.outline().done(); };
KIY.tac = () => { const d = T(14, 9); d.sRect(1, 5, 12, 4, R.gold); [1, 6, 11].forEach(x => d.poly([[x, 5], [x + 1, 0], [x + 2, 5]], R.gold[1])); d.px(7, 6, R.red[1]).px(3, 6, R.blue[1]).px(11, 6, R.blue[1]); return d.outline().done(); };

/* ===== MAMA, OYUN VE EFEKTLER ===== */
export const FX = {};
FX.mama_kuru = () => { const d = T(16, 5); d.ell(8, 4, 7, 3, R.wood[1], (x, y) => y < 4); [[4, 2], [8, 1], [11, 2], [6, 3], [10, 3]].forEach(([x, y]) => d.px(x, y, R.wood[2])); return d.done(); };
FX.mama_yas = () => { const d = T(16, 5); d.ell(8, 4, 7, 3, R.terra[1], (x, y) => y < 4); d.px(6, 2, R.terra[2]).px(10, 2, R.pink[1]); return d.done(); };
FX.mama_balik = () => { const d = T(16, 7); d.sEll(7, 4, 5, 2.4, R.grey); d.poly([[11, 4], [15, 1], [15, 7]], R.grey[1]); d.px(4, 3, R.dark[0]); d.line(6, 3, 6, 5, R.grey[0]); return d.outline().done(); };
FX.mama_kofte = () => { const d = T(16, 7); [[4, 4], [9, 3], [12, 5]].forEach(([x, y]) => { d.sEll(x, y, 3, 2.2, R.terra); d.px(x - 1, y - 1, R.terra[2]); }); d.px(7, 6, R.green[1]).px(8, 6, R.green[1]); return d.outline().done(); };
FX.top = () => { const d = T(7, 7); d.sEll(3.5, 3.5, 3.5, 3.5, R.red); d.ell(3.5, 3.5, 3.5, 3.5, R.white[2], (x, y, dx, dy) => Math.abs(dy) < 0.25); d.px(2, 1, '#FFFFFF'); return d.done(); };
FX.kalp = () => { const d = T(7, 6); d.map(0, 0, ['.xx.xx.', 'xyxxxxx', 'xxxxxxx', '.xxxxx.', '..xxx..', '...x...'], { x:'#E8384F', y:'#F6A0B0' }); return d.done(); };
FX.hediye = () => { const d = T(12, 12); d.sRect(1, 4, 10, 8, R.purple); d.rect(5, 4, 2, 8, R.gold[1]); d.sRect(0, 3, 12, 3, R.purple); d.rect(5, 3, 2, 3, R.gold[1]); d.poly([[6, 3], [2, 0], [3, 3]], R.gold[1]); d.poly([[6, 3], [10, 0], [9, 3]], R.gold[1]); return d.outline().done(); };
