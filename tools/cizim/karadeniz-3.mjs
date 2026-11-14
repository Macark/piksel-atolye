// Karadeniz resimleri 3: Kastamonu, Ordu, Rize, Samsun
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', SEA = '#2e7dba', DGR = '#2f6a3a';
const ladin = (d, x, y, h, c = DGR) => { for (let k = 0; k < h; k++){ const w = Math.floor(k / 2) + 1; d.rect(x - w + 1, y + k, w * 2 - 1, 1, c); } d.px(x, y + h, '#5a3a1e'); };

// KASTAMONU — Mahmut Bey Camii: ahşap direkli, oymalı tavanlı cami (içi)
A.mahmutbey = () => { const d = G(32, '#c08a50');
  d.rect(0, 0, 32, 9, '#8a5a2b');
  for (let x = 0; x < 32; x += 4){ d.rect(x, 1, 2, 2, '#c0392b'); d.rect(x + 2, 4, 2, 2, '#2e5f9e'); d.rect(x, 7, 4, 1, '#e0a526'); }   // boyalı tavan
  d.rect(0, 9, 32, 1, '#6b3a1a');
  [5, 12, 19, 26].forEach(x => { d.rect(x, 10, 2, 18, '#7a4a22'); d.rect(x - 1, 10, 4, 2, '#5a3416'); d.px(x, 14, '#a8703a'); d.px(x + 1, 20, '#a8703a'); });   // ahşap direkler
  d.rect(0, 28, 32, 4, '#a8321e'); for (let x = 0; x < 32; x += 4) d.rect(x + 1, 29, 2, 2, '#e0a526');            // halı
  d.rect(14, 16, 4, 10, '#e8d8b0'); d.ell(16, 16, 2, 2, '#e8d8b0', (x, y) => y < 16);                             // mihrap
  return d.done(); };

// Taşköprü Sarımsağı: örgü hâlinde sarımsaklar
A.sarimsak = () => { const d = G(24, '#a8703a');
  for (let y = 5; y < 24; y += 6) d.rect(0, y, 24, 1, '#8a5a2b');
  d.line(12, 0, 12, 4, '#e0c080');
  const s = (x, y) => { d.ell(x, y, 3.6, 3.8, '#d9c8a8'); d.ell(x, y, 3, 3.2, '#f6efe0'); d.line(x, y - 3, x, y + 2, '#e0d4bc'); d.line(x - 1.5, y - 2, x - 1.5, y + 2, '#e8dcc8'); d.line(x + 1.5, y - 2, x + 1.5, y + 2, '#e8dcc8'); d.px(x, y - 4, '#e0c080'); d.ell(x + 1, y + 2, 1.4, 0.8, '#d8b8c8'); };
  s(9, 7); s(15, 9); s(9, 13); s(15, 15); s(12, 20);
  d.line(12, 4, 9, 4, '#e0c080');
  return d.done(); };

// Horma Kanyonu: kanyon duvarına asılı ahşap yürüyüş yolu
A.horma = () => { const d = G(32, '#3f7a45');
  d.poly([[0, 0], [12, 0], [10, 32], [0, 32]], '#8a8a7a'); d.poly([[32, 0], [20, 0], [22, 32], [32, 32]], '#7a7a6a');
  d.poly([[12, 0], [20, 0], [22, 32], [10, 32]], '#bfe3f2', ); d.rect(12, 0, 8, 6, '#bfe3f2');
  d.rect(10, 26, 12, 6, '#4f9ac8'); [[12, 28], [17, 30]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#8fc8f0'));
  d.poly([[0, 17], [11, 15], [11, 17], [0, 19]], '#a8703a'); for (let x = 1; x < 11; x += 3) d.line(x, 18, x, 22, '#6b4a2a');   // ahşap yol
  d.line(0, 15, 11, 13, '#6b4a2a');
  [[3, 3, 5], [28, 4, 5], [26, 18, 4]].forEach(([x, y, h]) => ladin(d, x, y, h, '#2f6a3a'));
  return d.done(); };

// ORDU — Boztepe: teleferik, aşağıda şehir ve deniz
A.boztepe = () => { const d = G(32, SKY);
  d.rect(0, 22, 32, 10, SEA); [[4, 26], [20, 29]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.poly([[18, 8], [32, 4], [32, 22], [14, 22]], '#4f8a4a'); d.poly([[0, 20], [18, 18], [20, 22], [0, 22]], '#7ab04e');
  [[2, 18], [6, 17], [10, 18], [14, 17]].forEach(([x, y]) => { d.rect(x, y, 3, 2, '#f6efe0'); d.rect(x, y, 3, 1, '#c0392b'); });
  d.line(0, 16, 31, 3, '#3a3a3a');
  [[8, 13], [20, 8]].forEach(([x, y]) => { d.line(x + 1, y - 1, x + 1, y, '#3a3a3a'); d.rect(x - 1, y + 1, 4, 3, '#e03a3a'); d.rect(x, y + 2, 2, 1, '#bfe3f2'); });   // kabinler
  return d.done(); };

// Yason Burnu: denize uzanan burunda küçük kilise ve deniz feneri
A.yason = () => { const d = G(32, SKY);
  d.rect(0, 18, 32, 14, SEA); [[3, 22], [22, 27], [12, 29]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.poly([[0, 14], [16, 16], [26, 20], [0, 22]], '#6aa84a'); d.poly([[0, 20], [26, 20], [24, 22], [0, 23]], '#8a7a62');
  d.rect(6, 11, 7, 6, '#e8dcc0'); d.poly([[5, 11], [9.5, 7], [14, 11]], '#a8482a'); d.rect(9, 5, 1, 3, '#6b4a2a').rect(8, 6, 3, 1, '#6b4a2a'); d.rect(8, 13, 3, 4, '#5a4632');
  d.rect(20, 10, 3, 9, '#ffffff'); d.rect(20, 13, 3, 2, '#c0392b'); d.rect(19, 8, 5, 2, '#3a3a3a'); d.px(21, 9, '#f6d36b');   // fener
  return d.done(); };

// Çambaşı Yaylası: karlı yaylada kayak
A.cambasi = () => { const d = G(32, SKY);
  d.poly([[0, 12], [12, 6], [22, 10], [32, 5], [32, 32], [0, 32]], '#f2f6f8');
  d.poly([[0, 22], [16, 18], [32, 21], [32, 32], [0, 32]], '#e4ecf0');
  [[3, 8, 6], [8, 10, 5], [26, 6, 6], [30, 9, 5]].forEach(([x, y, h]) => ladin(d, x, y, h));
  d.line(4, 27, 14, 30, '#c0392b').line(5, 26, 15, 29, '#c0392b');                                          // kayaklar
  d.rect(9, 20, 3, 5, '#2e7dba'); d.ell(10.5, 18.5, 1.6, 1.6, '#f0c8a0'); d.rect(9, 17, 3, 1, '#e0a526'); d.rect(9, 25, 1, 2, '#3a3a3a').rect(11, 25, 1, 2, '#3a3a3a');
  d.line(7, 21, 5, 27, '#3a3a3a').line(13, 21, 15, 27, '#3a3a3a');
  return d.done(); };

// RİZE — Çay Bahçeleri: yamaçta sıra sıra çay, sepetli toplayıcı
A.cay = () => { const d = G(32, SKY);
  d.poly([[0, 8], [32, 4], [32, 32], [0, 32]], '#4f9a4a');
  for (let y = 8; y < 32; y += 4) { for (let x = 0; x < 32; x++) { const yy = y - x * 0.12 + Math.sin(x * 0.4); d.px(x, yy, '#2f7a3a'); d.px(x, yy + 1, '#3f8a42'); } }
  d.rect(20, 16, 4, 7, '#c0392b'); d.ell(22, 14.5, 1.8, 1.8, '#f0c8a0'); d.rect(20, 12, 4, 2, '#e8a526');   // toplayıcı, yazma
  d.rect(17, 15, 3, 5, '#a8703a'); for (let y = 16; y < 20; y += 2) d.rect(17, y, 3, 1, '#8a5a2b');           // sırt sepeti
  d.rect(20, 23, 1, 2, '#3a3a3a').rect(23, 23, 1, 2, '#3a3a3a');
  return d.done(); };

// Ayder Yaylası: sisli dağlarda ahşap yayla evleri
A.ayder = () => { const d = G(32, '#dfeaf0');
  d.poly([[0, 14], [8, 4], [16, 10], [26, 2], [32, 8], [32, 32], [0, 32]], '#3f7a45');
  d.rect(0, 9, 32, 2, '#f2f6f8'); d.rect(6, 12, 16, 1, '#f2f6f8');
  d.poly([[0, 22], [32, 19], [32, 32], [0, 32]], '#6aa84a');
  const ev = (x, y) => { d.rect(x, y, 7, 5, '#8a5a2b'); for (let k = x; k < x + 7; k += 2) d.px(k, y + 2, '#6b4a2a'); d.poly([[x - 1, y], [x + 3.5, y - 3], [x + 8, y]], '#6a6e76'); d.rect(x + 1, y + 1, 2, 2, '#f2c14a'); };
  ev(4, 21); ev(15, 23); ev(24, 19);
  [[27, 6, 7], [3, 10, 5]].forEach(([x, y, h]) => ladin(d, x, y, h, '#26583a'));
  return d.done(); };

// Zilkale: yeşil vadide kayalık üstünde kale
A.zilkale = () => { const d = G(32, '#dfeaf0');
  d.poly([[0, 8], [32, 4], [32, 32], [0, 32]], '#3f7a45');
  d.poly([[8, 32], [12, 16], [20, 14], [24, 32]], '#6a6a5a');
  d.rect(11, 9, 11, 7, '#a8947a'); for (let x = 11; x < 22; x += 2) d.px(x, 8, '#a8947a');
  d.rect(15, 3, 4, 7, '#b8a48a'); d.px(15, 2, '#b8a48a').px(17, 2, '#b8a48a'); d.rect(16, 5, 2, 2, '#4a3828'); d.rect(12, 11, 2, 2, '#4a3828');
  d.poly([[0, 28], [8, 26], [10, 32], [0, 32]], '#4f9ac8'); d.rect(0, 27, 6, 1, '#8fc8f0');
  [[3, 14, 6], [28, 12, 7]].forEach(([x, y, h]) => ladin(d, x, y, h, '#26583a'));
  return d.done(); };

// SAMSUN — Bandırma Vapuru: 19 Mayıs 1919
A.bandirma = () => { const d = G(32, SKY);
  d.rect(0, 22, 32, 10, SEA); [[2, 27], [22, 29], [12, 30]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.poly([[3, 18], [29, 18], [26, 24], [6, 24]], '#2a2a2e'); d.rect(5, 21, 22, 1, '#c0392b');                // gövde
  d.rect(9, 14, 13, 4, '#f6efe0'); [11, 14, 17].forEach(x => d.rect(x, 15, 2, 2, '#4a6a8a'));
  d.rect(15, 7, 3, 7, '#2a2a2e'); d.rect(15, 9, 3, 1, '#f6efe0');                                         // baca
  d.ell(19, 5, 2.4, 1.6, '#d9d9d4'); d.ell(22, 4, 2, 1.3, '#e8e8e4');
  d.rect(26, 9, 1, 9, '#6b4a2a'); d.rect(27, 9, 4, 3, '#e30a17'); d.px(28, 10, '#ffffff');                   // bayrak
  return d.done(); };

// Bafra Pidesi: uzun, ince kenarlı kıymalı pide
A.bafrapidesi = () => { const d = G(24, '#f4e8d2');
  d.poly([[1, 12], [5, 8], [19, 8], [23, 12], [19, 16], [5, 16]], '#d9a050');
  d.poly([[3, 12], [6, 9.5], [18, 9.5], [21, 12], [18, 14.5], [6, 14.5]], '#e8bc6a');
  for (let x = 5; x < 20; x += 2) { d.px(x, 11 + (x % 3) % 2, '#9a3a1e'); d.px(x + 1, 12 + (x % 2), '#b84a2a'); }
  [[8, 12], [14, 11], [17, 13]].forEach(([x, y]) => d.px(x, y, '#3f8a34'));
  d.rect(1, 12, 1, 1, '#b8803a').rect(22, 12, 1, 1, '#b8803a');
  d.ell(18, 20, 3, 1.6, '#fbfaf4'); d.px(17, 20, '#d9d4c4');                                               // ayran
  return d.done(); };

// Kızılırmak Deltası Kuş Cenneti: sazlıkta kuşlar
A.kuscenneti = () => { const d = G(32, SKY);
  d.rect(0, 16, 32, 16, '#4f9ac8'); [[3, 24], [18, 28]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  for (let x = 0; x < 32; x += 2){ const h = 5 + (x * 7) % 5; d.line(x, 18, x, 18 - h, x % 4 ? '#7a9a3a' : '#5a8a2a'); d.px(x, 18 - h, '#8a6a3a'); }
  d.rect(0, 18, 32, 2, '#6a8a3a');
  const kus = (x, y) => { d.ell(x, y, 2.4, 1.4, '#ffffff'); d.rect(x + 2, y - 4, 1, 4, '#ffffff'); d.px(x + 3, y - 4, '#e0a526'); d.px(x + 4, y - 4, '#e0a526'); d.line(x - 1, y + 1, x - 1, y + 4, '#3a3a3a'); };
  kus(10, 24); kus(22, 22);
  [[6, 6], [9, 5], [24, 4], [27, 5]].forEach(([x, y]) => { d.px(x, y, '#3a3a3a'); d.px(x - 1, y - 1, '#3a3a3a'); d.px(x + 1, y - 1, '#3a3a3a'); });
  return d.done(); };
