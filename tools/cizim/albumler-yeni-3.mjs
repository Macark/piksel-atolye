// Yeni albümler 3: Kuşlar, Böcekler
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2';
const goz = (d, x, y, c = '#1a1a1a') => { d.px(x, y, c); };
const dal = (d, y, c = '#7a5230') => { d.rect(0, y, 32, 2, c); d.px(5, y - 1, c).px(26, y + 2, c).px(27, y + 3, c); };

// KUŞLAR
A.flamingo = () => { const d = G(32, '#cfeaf0');
  d.rect(0, 25, 32, 7, '#7cc0d0'); [[3, 27], [12, 29], [22, 27], [27, 30]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#a8dbe6'));
  const p = '#f28aa0', k = '#d8607a';
  d.ell(16, 13, 6, 4, p); d.poly([[10, 12], [6, 10], [9, 14]], k);                     // gövde, kuyruk
  d.ell(18, 13, 3.4, 2.6, k);                                                          // kanat
  for (let y = 4; y < 11; y++) d.px(21 + Math.round(Math.sin(y * 0.9)), y, p).px(22 + Math.round(Math.sin(y * 0.9)), y, p);   // S boyun
  d.ell(23, 4, 2.2, 1.8, p); goz(d, 23, 3);
  d.rect(24, 4, 2, 1, '#f6efe0'); d.px(25, 5, '#1a1a1a').px(26, 5, '#1a1a1a');         // gaga
  d.rect(16, 17, 1, 9, '#d8607a'); d.line(16, 20, 19, 18, '#d8607a'); d.line(19, 18, 17, 16, '#d8607a');   // tek bacak, kıvrık bacak
  d.rect(15, 26, 3, 1, '#d8607a');
  return d.done(); };

A.papagan = () => { const d = G(32, '#bfe8c8');
  d.ell(4, 4, 5, 4, '#8fd09a'); d.ell(28, 6, 5, 4, '#8fd09a');
  dal(d, 22);
  const r = '#e23a2e';
  d.ell(16, 12, 4.2, 4.2, r); d.ell(16, 17, 4.6, 5, r);                                   // baş, gövde
  d.ell(19, 17, 3, 4.4, '#2a7ad8'); d.rect(19, 14, 3, 2, '#f2c43a');                     // kanat: mavi, sarı şerit
  d.poly([[15, 21], [19, 21], [20, 31], [17, 31]], '#2a7ad8'); d.poly([[15, 21], [17, 21], [16, 30]], r);   // uzun kuyruk
  d.ell(13, 11, 2, 1.6, '#f6efe0'); goz(d, 13, 11);                                       // yüzdeki beyaz
  d.poly([[10, 11], [12, 10], [12, 14], [10, 13]], '#3a3a3a'); d.px(10, 13, '#2a2a2a');   // eğri gaga
  d.rect(14, 21, 2, 1, '#6a6a6a').rect(17, 21, 2, 1, '#6a6a6a');
  return d.done(); };

A.tukan = () => { const d = G(32, '#a8dca0');
  d.ell(3, 26, 6, 6, '#6ab05a'); d.ell(29, 27, 5, 5, '#6ab05a');
  dal(d, 24, '#6b4a1e');
  d.ell(19, 15, 5, 7, '#1e1e1e');                                                        // gövde
  d.ell(18, 10, 3.6, 3, '#f6f0d8');                                                      // beyaz boğaz
  d.ell(17, 7, 3.4, 3, '#1e1e1e'); d.ell(16, 7, 1.4, 1.2, '#7ad0f0'); goz(d, 16, 7);       // baş, mavi göz çevresi
  d.poly([[13, 5], [3, 7], [4, 10], [13, 9]], '#f2a020'); d.poly([[13, 5], [5, 6], [3, 7], [13, 7]], '#f6d040');   // dev gaga
  d.px(3, 8, '#1e1e1e').px(4, 9, '#d8402a');
  d.rect(17, 22, 1, 2, '#3a7ad0').rect(20, 22, 1, 2, '#3a7ad0'); d.rect(16, 20, 6, 1, '#d8402a');   // ayak, kırmızı alt
  d.poly([[20, 21], [23, 21], [25, 30], [22, 30]], '#1e1e1e');
  return d.done(); };

A.kartal = () => { const d = G(32, '#f6d8a8');
  d.poly([[0, 32], [0, 24], [7, 17], [13, 23], [19, 15], [27, 22], [32, 19], [32, 32]], '#8a7a6a');
  d.poly([[7, 17], [5, 19], [9, 19]], '#f6f0e8'); d.poly([[19, 15], [17, 17.5], [21, 17.5]], '#f6f0e8');
  const b = '#5a3a1e', k = '#3a2410';
  d.poly([[16, 8], [1, 4], [3, 7], [9, 10], [15, 12]], b); d.poly([[16, 8], [31, 4], [29, 7], [23, 10], [17, 12]], b);   // kanatlar
  [2, 5, 8].forEach(x => d.line(x, 5, x - 1, 7, k)); [29, 26, 23].forEach(x => d.line(x, 5, x + 1, 7, k));                 // kanat uçları
  d.ell(16, 11, 2.6, 4, b); d.ell(16, 6, 2, 2, '#e8c870');                                // gövde, altın ense
  d.px(15, 6, '#1a1a1a'); d.px(16, 7, '#f2c43a').px(16, 8, '#f2c43a');                     // göz, gaga
  d.poly([[14, 14], [18, 14], [17, 17], [15, 17]], '#f6f0e8');                             // kuyruk
  return d.done(); };

A.leylek = () => { const d = G(32, SKY);
  d.ell(26, 5, 3, 3, '#f6e8a8');
  d.rect(10, 22, 12, 10, '#b5583a'); d.rect(9, 21, 14, 2, '#8a4028');                     // baca
  for (let y = 24; y < 32; y += 3) d.rect(10, y, 12, 1, '#9a4a30');
  d.ell(16, 19, 8, 2.6, '#8a6a3a'); for (let x = 9; x < 24; x += 2) d.px(x, 17, '#6a4a22').px(x + 1, 21, '#6a4a22');   // yuva
  d.ell(16, 13, 5, 3.4, '#f6f6f2'); d.poly([[11, 12], [14, 15], [20, 15], [22, 12], [18, 14]], '#1e1e1e');   // gövde, siyah kanat ucu
  d.rect(17, 4, 2, 8, '#f6f6f2'); d.ell(18.5, 4, 2, 1.6, '#f6f6f2'); goz(d, 18, 3);        // boyun, baş
  d.poly([[20, 3], [27, 6], [20, 5]], '#e2442e');                                          // kırmızı gaga
  d.rect(14, 16, 1, 2, '#e2442e').rect(17, 16, 1, 2, '#e2442e');
  return d.done(); };

A.tavuskusu = () => { const d = G(32, '#f2ecd2');
  d.rect(0, 27, 32, 5, '#8ab84e');
  d.ell(16, 13, 14, 12, '#2a8a5a', (x, y) => y < 22);                                      // açık kuyruk
  d.ell(16, 13, 11, 9.4, '#3aa86a', (x, y) => y < 22);
  for (let k = 0; k < 9; k++){ const a = Math.PI * (1.05 + k * 0.1125), x = 16 + Math.cos(a) * 9.5, y = 15 + Math.sin(a) * 9;
    d.ell(x, y, 1.8, 1.8, '#e2c43a'); d.ell(x, y, 1.1, 1.1, '#1e5ab8'); d.px(x, y, '#1a2a5a'); }
  for (let k = 0; k < 6; k++){ const a = Math.PI * (1.12 + k * 0.15), x = 16 + Math.cos(a) * 5.6, y = 16 + Math.sin(a) * 5.4; d.ell(x, y, 1.2, 1.2, '#1e5ab8'); }
  d.ell(16, 21, 3, 4.4, '#1e5ab8'); d.ell(16, 15, 1.6, 2.4, '#1e5ab8');                     // gövde, boyun
  d.ell(16, 12, 1.8, 1.6, '#1e5ab8'); d.px(15, 12, '#f6f6f2'); d.px(16, 13, '#e2c43a');    // baş
  [[15, 9], [16, 8], [17, 9]].forEach(([x, y]) => d.px(x, y, '#1e5ab8')); d.px(16, 7, '#3aa86a');   // tepelik
  d.rect(15, 25, 1, 2, '#8a6a4a').rect(17, 25, 1, 2, '#8a6a4a');
  return d.done(); };

A.marti = () => { const d = G(32, '#cfe8f6');
  d.rect(0, 22, 32, 10, '#3a86c0'); [[2, 25], [10, 28], [19, 24], [25, 29]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#7ab8e0'));
  d.ell(5, 6, 4, 1.6, '#f6f6f6'); d.ell(27, 9, 4, 1.4, '#f6f6f6');
  d.ell(16, 13, 6, 3.2, '#f6f6f6');                                                        // gövde
  d.poly([[13, 12], [4, 6], [6, 11], [12, 14]], '#a8b4c0'); d.poly([[4, 6], [3, 8], [6, 9]], '#2a2a2a');   // arka kanat
  d.poly([[17, 12], [26, 4], [25, 9], [19, 14]], '#c0cad4'); d.poly([[26, 4], [27, 7], [25, 7]], '#2a2a2a');   // ön kanat
  d.ell(22, 12, 2.4, 2, '#f6f6f6'); goz(d, 22, 11);
  d.rect(24, 12, 3, 1, '#f2c43a'); d.px(25, 13, '#e2442e');                                // sarı gaga, kırmızı nokta
  d.poly([[10, 13], [7, 12], [8, 15]], '#f6f6f6');
  return d.done(); };

A.kizilgerdan = () => { const d = G(32, '#dfeaf2');
  [[3, 3], [9, 8], [26, 4], [29, 12], [5, 15], [21, 9]].forEach(([x, y]) => d.px(x, y, '#ffffff'));
  dal(d, 23, '#6b4a1e'); d.rect(0, 22, 32, 1, '#f6f6f6');                                   // dalda kar
  d.ell(15, 16, 7, 6, '#8a6a4a');                                                           // gövde (kahve)
  d.ell(13, 17, 4.6, 4.6, '#e86a2e');                                                       // turuncu göğüs ve yüz
  d.ell(15, 20, 4.6, 2.6, '#f2ece2');                                                       // açık karın
  d.ell(19, 15, 3.6, 3.6, '#7a5a3a');                                                       // kanat
  d.poly([[21, 17], [27, 14], [27, 17], [22, 19]], '#7a5a3a');                               // kuyruk
  goz(d, 11, 13); d.px(12, 12, '#8a6a4a');
  d.rect(7, 15, 2, 1, '#3a2a1e');                                                           // gaga
  d.rect(13, 21, 1, 2, '#5a3a2a').rect(16, 21, 1, 2, '#5a3a2a');
  return d.done(); };

A.yalicapkini = () => { const d = G(32, '#cfe6d8');
  d.rect(0, 24, 32, 8, '#4a9aa8'); [[3, 27], [14, 29], [22, 26]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8acad4'));
  d.ell(28, 20, 3, 5, '#6ab05a'); d.ell(2, 21, 3, 4, '#6ab05a');
  d.line(4, 20, 26, 16, '#7a5230'); d.line(4, 21, 26, 17, '#7a5230');                        // dal
  d.ell(16, 12, 4, 4.6, '#1e8ad8');                                                         // sırt (parlak mavi)
  d.ell(15, 13, 3, 3.4, '#f2862e');                                                         // turuncu göğüs
  d.ell(15, 8, 3.2, 2.8, '#1e8ad8'); d.rect(13, 9, 3, 1, '#f2862e'); d.px(16, 9, '#f6f6f2');   // baş, yanak
  goz(d, 15, 8);
  d.rect(5, 8, 8, 1, '#2a2a2a'); d.rect(8, 9, 5, 1, '#2a2a2a');                              // uzun gaga
  d.poly([[18, 14], [22, 19], [20, 19], [17, 16]], '#1660a8');                               // kuyruk
  for (let y = 10; y < 15; y += 2) d.px(18, y, '#7ad0f6');
  d.px(15, 17, '#e2442e').px(16, 17, '#e2442e');
  return d.done(); };

// BÖCEKLER
A.karinca = () => { const d = G(32, '#f2e2b8');
  d.rect(0, 24, 32, 8, '#b8905a'); [[4, 27], [17, 29], [26, 26]].forEach(([x, y]) => d.px(x, y, '#8a6a3a'));
  d.poly([[17, 3], [29, 8], [24, 14], [16, 9]], '#5ab04a'); d.line(17, 4, 26, 11, '#3a8a3a');   // taşıdığı yaprak
  const k = '#3a2416';
  d.ell(8, 18, 4.4, 3.4, k); d.ell(14, 17, 2.4, 1.8, k); d.ell(19, 15, 2.8, 2.6, k);          // karın, göğüs, baş
  d.px(20, 14, '#f6f0e0');
  d.line(20, 13, 23, 9, k); d.line(18, 12, 18, 9, k);                                          // antenler (yaprağı tutar)
  [[12, 18, 9, 23], [14, 18, 14, 23], [15, 18, 19, 23]].forEach(([a, b, c2, e]) => { d.line(a, b, (a + c2) / 2, b + 2, k); d.line((a + c2) / 2, b + 2, c2, e, k); });
  return d.done(); };

A.cekirge = () => { const d = G(32, '#e8f2c8');
  d.rect(0, 26, 32, 6, '#8ab84e'); for (let x = 1; x < 32; x += 3) d.line(x, 26, x + 1, 22, '#6a9a3a');
  const g = '#6ac03a', k = '#3a8a2a';
  d.ell(15, 15, 9, 3, g); d.ell(24, 13, 3, 3.2, g); goz(d, 25, 12);                           // gövde, baş
  d.poly([[9, 13], [21, 12], [20, 14], [9, 15]], '#4aa02a');                                   // kanat
  for (let x = 9; x < 20; x += 3) d.px(x, 17, k);
  d.line(14, 15, 9, 7, k); d.line(9, 7, 5, 18, k); d.line(15, 15, 10, 8, g); d.line(10, 8, 6, 18, g);   // büyük arka bacak
  d.line(20, 17, 19, 21, k); d.line(22, 16, 23, 21, k);
  d.line(26, 11, 30, 3, k); d.line(25, 10, 27, 2, k);                                          // antenler
  return d.done(); };

A.yusufcuk = () => { const d = G(32, '#d8eef0');
  d.rect(0, 26, 32, 6, '#5aa0b8'); d.line(3, 26, 2, 18, '#5a9a3a'); d.line(29, 26, 30, 17, '#5a9a3a');
  const w = '#f6fbff', e = '#a8d4e8';
  [[[15, 9], [3, 5], [2, 9], [14, 11]], [[17, 9], [29, 5], [30, 9], [18, 11]], [[15, 12], [4, 14], [5, 17], [15, 13]], [[17, 12], [28, 14], [27, 17], [17, 13]]].forEach(p => d.poly(p, w));
  [[3, 7, 14, 10], [29, 7, 18, 10], [5, 15, 15, 13], [27, 15, 17, 13]].forEach(([a, b, c2, e2]) => d.line(a, b, c2, e2, e));
  d.rect(15, 8, 2, 5, '#1e6ab8'); d.rect(15, 13, 2, 16, '#2a8ad8'); for (let y = 14; y < 29; y += 2) d.rect(15, y, 2, 1, '#1e6ab8');   // gövde
  d.ell(16, 7, 2.2, 1.8, '#1e6ab8'); d.px(15, 6, '#7ae0f0').px(16, 6, '#7ae0f0');                   // baş, iri gözler
  return d.done(); };

A.atesbocegi = () => { const d = G(32, '#14203a');
  [[3, 4], [11, 2], [24, 3], [29, 9], [6, 11], [19, 6]].forEach(([x, y]) => d.px(x, y, '#e8e8c8'));
  d.rect(0, 26, 32, 6, '#1e3a24'); for (let x = 0; x < 32; x += 2) d.line(x, 26, x + 1, 22 + (x % 3), '#2a5030');
  [[5, 18], [26, 15], [9, 7], [28, 22]].forEach(([x, y]) => { d.px(x, y, '#f6f08a'); d.px(x + 1, y, '#a8a040'); });   // uzaktaki ateş böcekleri
  d.ell(16, 18, 6, 6, '#3a4a24'); d.ell(16, 18, 4.4, 4.4, '#7a7a2a');                            // ışık halesi
  d.ell(16, 19, 2.6, 3, '#f6f05a'); d.px(16, 19, '#ffffd0');                                     // parlayan karın
  d.ell(16, 13, 2.4, 3, '#3a2a1e'); d.poly([[13, 12], [16, 11], [15, 18]], '#5a4a3a'); d.poly([[19, 12], [16, 11], [17, 18]], '#5a4a3a');   // kanat kınları
  d.ell(16, 10, 1.6, 1.4, '#e2442e'); d.line(15, 9, 13, 6, '#3a2a1e'); d.line(17, 9, 19, 6, '#3a2a1e');
  return d.done(); };

A.gergedanbocegi = () => { const d = G(32, '#e8dcc0');
  d.rect(0, 25, 32, 7, '#8a6a4a'); d.ell(26, 26, 5, 2, '#6a8a3a');
  const k = '#3a2416', p = '#5a3a24';
  d.ell(14, 18, 8, 5.4, k); d.ell(12, 16, 4, 2.4, p); d.line(9, 15, 15, 14, '#8a6a4a');          // parlak kabuk
  d.line(14, 13, 14, 23, '#1e140c');                                                             // kınların ayrımı
  d.ell(23, 17, 3, 3.4, k);                                                                      // baş
  d.poly([[24, 15], [29, 6], [30, 7], [26, 16]], k); d.poly([[29, 6], [31, 4], [30, 7]], k);      // büyük boynuz
  d.poly([[22, 14], [21, 10], [23, 13]], k);
  [[10, 22, 7, 26], [14, 23, 13, 27], [18, 22, 21, 26], [21, 20, 25, 24]].forEach(([a, b, c2, e]) => d.line(a, b, c2, e, k));
  return d.done(); };

A.peygamberdevesi = () => { const d = G(32, '#f2ecd2');
  d.line(2, 30, 30, 22, '#7a5230'); d.line(2, 31, 30, 23, '#7a5230');                            // dal
  const g = '#6ab83a', k = '#4a902a';
  d.poly([[8, 25], [20, 18], [21, 20], [9, 27]], g); d.poly([[10, 24], [19, 19], [19, 20], [10, 25]], k);   // uzun karın
  d.rect(19, 9, 2, 11, g);                                                                        // dik göğüs
  d.poly([[18, 5], [23, 5], [22, 8], [20, 9], [19, 8]], g); d.px(18, 5, '#f6f6a8').px(23, 5, '#f6f6a8'); d.px(18, 6, '#1a1a1a').px(23, 6, '#1a1a1a');   // üçgen baş
  d.line(19, 4, 15, 1, k); d.line(22, 4, 26, 1, k);
  d.line(20, 11, 15, 10, g); d.line(15, 10, 15, 14, g); d.line(21, 11, 25, 10, g); d.line(25, 10, 24, 14, g);   // dua eden ön bacaklar
  d.line(16, 21, 15, 26, k); d.line(19, 20, 21, 25, k);
  return d.done(); };

A.tirtil = () => { const d = G(32, '#e8f2d8');
  d.poly([[1, 26], [16, 16], [31, 22], [18, 30]], '#5ab04a'); d.line(2, 26, 30, 22, '#3a8a3a');   // yaprak
  [[6, 19], [9, 17], [12, 16], [15, 16], [18, 17], [21, 17], [24, 16]].forEach(([x, y], k) => { d.ell(x, y, 2, 2, k % 2 ? '#8ad03a' : '#a8e04a'); d.px(x, y + 2, '#3a5a1e'); });
  d.ell(27, 14, 2.6, 2.6, '#6ab03a'); d.px(28, 13, '#1a1a1a'); d.px(26, 13, '#1a1a1a'); d.px(27, 15, '#e2442e');   // baş
  d.line(26, 12, 25, 9, '#3a5a1e'); d.line(28, 12, 29, 9, '#3a5a1e');
  [[9, 15], [15, 14], [21, 15]].forEach(([x, y]) => d.px(x, y, '#f2c43a'));
  return d.done(); };

A.orumcek = () => { const d = G(32, '#2a3448');
  const w = '#b8c4d4';
  for (let k = 0; k < 8; k++){ const a = k * Math.PI / 4; d.line(16, 14, 16 + Math.cos(a) * 18, 14 + Math.sin(a) * 18, w); }   // ağ telleri
  [4, 8, 12].forEach(r => { for (let k = 0; k < 8; k++){ const a = k * Math.PI / 4, b = (k + 1) * Math.PI / 4; d.line(16 + Math.cos(a) * r, 14 + Math.sin(a) * r, 16 + Math.cos(b) * r, 14 + Math.sin(b) * r, w); } });
  d.line(16, 0, 16, 18, '#e8eef6');
  const k = '#1a1a1a';
  d.ell(16, 22, 3, 3.6, k); d.ell(16, 18, 2, 1.8, k); d.px(15, 18, '#e2442e').px(17, 18, '#e2442e');   // gövde, gözler
  for (const s of [-1, 1]) [[19, 6, 15, 10, 13], [20, 7, 18, 10, 19], [21, 7, 22, 10, 25], [22, 6, 25, 9, 29]].forEach(([y, kx, ky, fx, fy]) => { d.line(16 + s * 2, y, 16 + s * kx, ky, k); d.line(16 + s * kx, ky, 16 + s * fx, fy, k); });
  return d.done(); };

A.agustosbocegi = () => { const d = G(32, '#d8ecf6');
  d.ell(27, 6, 5, 4, '#6ab05a'); d.ell(29, 13, 4, 3, '#5aa04a');
  d.rect(3, 0, 16, 32, '#8a6a4a'); for (let y = 1; y < 32; y += 5) { d.line(4, y, 6, y + 2, '#6a4a2e'); d.line(17, y + 2, 15, y + 4, '#6a4a2e'); }   // ağaç gövdesi
  const g = '#3a5a2a', v = '#5a7a6a';
  d.poly([[11, 10], [5, 14], [6, 27], [11, 30]], '#dceef2'); d.poly([[11, 10], [17, 14], [16, 27], [11, 30]], '#cfe4ea');   // çadır gibi saydam kanatlar
  d.line(11, 10, 6, 26, v); d.line(11, 10, 16, 26, v); d.line(7, 18, 10, 26, v); d.line(15, 18, 12, 26, v); d.line(11, 11, 11, 29, v);
  d.ell(11, 12, 3.4, 3, g); d.ell(11, 8, 4, 2, g);                                          // göğüs, geniş baş
  d.px(7, 8, '#e2442e').px(15, 8, '#e2442e'); d.px(10, 7, '#8ab060').px(12, 7, '#8ab060');  // yandaki kırmızı gözler
  d.rect(10, 11, 2, 2, '#5a8a3a');
  return d.done(); };

A.saka = () => { const d = G(32, '#e8eed8');
  d.ell(26, 26, 6, 6, '#c8a8d8'); d.ell(4, 27, 4, 5, '#c8a8d8');                                   // devedikeni çiçekleri
  d.line(18, 31, 21, 20, '#6a8a4a'); d.ell(21, 19, 3, 2.4, '#b88ac8'); for (let x = 19; x < 24; x++) d.px(x, 17, '#9a6ab0');   // devedikeni
  d.ell(14, 15, 7, 5.4, '#c8a078');                                                                  // gövde (açık kahve)
  d.ell(14, 18, 5, 2.6, '#f2ece0');                                                                  // açık karın
  d.ell(10, 10, 4, 3.6, '#1e1e1e');                                                                  // siyah baş
  d.ell(10, 11, 3, 2.4, '#f6f6f2'); d.ell(8, 10, 2, 1.8, '#d8302a');                                // beyaz yanak, kırmızı yüz
  d.px(9, 9, '#1a1a1a'); d.rect(4, 10, 2, 1, '#e8c8a8');                                            // göz, gaga
  d.poly([[13, 13], [22, 12], [25, 16], [15, 17]], '#1e1e1e'); d.rect(15, 14, 8, 2, '#f2c43a');      // siyah kanat, sarı şerit
  [[17, 13], [20, 13]].forEach(([x, y]) => d.px(x, y, '#f6f6f2'));
  d.poly([[21, 14], [29, 15], [28, 17], [22, 17]], '#1e1e1e'); d.px(28, 16, '#f6f6f2');               // kuyruk
  d.line(12, 20, 12, 22, '#6a5a4a'); d.line(15, 20, 16, 22, '#6a5a4a'); d.rect(9, 22, 12, 1, '#7a5230');   // ayak, dal
  return d.done(); };
