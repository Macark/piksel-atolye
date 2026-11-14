// Yeni albümler 4: Spor, Okul
import { G } from './grid.mjs';
export const A = {};

// SPOR
A.basketbol = () => { const d = G(32, '#f2e2c8');
  d.rect(0, 27, 32, 5, '#d8a868');
  d.rect(4, 2, 18, 12, '#ffffff'); d.rect(4, 2, 18, 1, '#c8c8c8'); d.rect(4, 13, 18, 1, '#c8c8c8'); d.rect(4, 2, 1, 12, '#c8c8c8'); d.rect(21, 2, 1, 12, '#c8c8c8');   // pano
  d.rect(10, 6, 6, 1, '#e2442e'); d.rect(10, 6, 1, 5, '#e2442e'); d.rect(15, 6, 1, 5, '#e2442e');                                // kare
  d.rect(8, 12, 10, 1, '#e8602e');                                                                                               // çember
  for (let x = 9; x < 18; x += 2) d.line(x, 13, x + 1, 17, '#f6f6f6'); d.rect(9, 17, 8, 1, '#f6f6f6');                           // file
  d.rect(22, 6, 7, 2, '#5a5a5a'); d.rect(28, 6, 2, 21, '#5a5a5a');                                                               // direk
  d.ell(12, 22, 4.6, 4.6, '#e8782e'); d.line(12, 18, 12, 26, '#5a2a10'); d.line(8, 22, 16, 22, '#5a2a10');                       // top
  d.ell(12, 22, 3, 4.4, '#5a2a10', (x, y, dx) => Math.abs(Math.abs(dx) - 0.9) < 0.18); d.px(10, 19, '#f6a868');
  return d.done(); };

A.voleybol = () => { const d = G(32, '#bfe3f2');
  d.ell(26, 5, 3, 3, '#f6e8a8');
  d.rect(0, 24, 32, 8, '#f2dca0'); [[3, 27], [20, 29], [27, 26]].forEach(([x, y]) => d.px(x, y, '#d8b870'));
  d.rect(2, 14, 1, 13, '#5a5a5a'); d.rect(29, 14, 1, 13, '#5a5a5a');                                       // file direkleri
  d.rect(3, 14, 26, 1, '#f6f6f6'); for (let x = 3; x < 29; x += 2) d.px(x, 15, '#3a3a3a').px(x + 1, 16, '#3a3a3a').px(x, 17, '#3a3a3a'); d.rect(3, 18, 26, 1, '#f6f6f6');   // file
  d.ell(16, 8, 5, 5, '#f6f6f6');                                                                            // top
  d.ell(16, 8, 5, 5, '#2a6ad8', (x, y, dx, dy) => dy < -0.25 && dx > -0.5);
  d.ell(16, 8, 5, 5, '#f2c43a', (x, y, dx, dy) => dx < -0.35 && dy > -0.2);
  d.line(13, 5, 19, 11, '#a8a8a8'); d.px(14, 6, '#ffffff');
  return d.done(); };

A.tenis = () => { const d = G(32, '#3a9a5a');
  d.rect(0, 20, 32, 1, '#f6f6f6'); d.rect(16, 20, 1, 12, '#f6f6f6');                                        // kort çizgileri
  d.ell(12, 11, 7, 8.4, '#e2442e'); d.ell(12, 11, 5.6, 7, '#f2f2e8');                                       // raket kafası
  for (let x = 8; x < 17; x += 2) d.line(x, 5, x, 17, '#c8c8c0'); for (let y = 6; y < 17; y += 2) d.line(7, y, 17, y, '#c8c8c0');
  d.ell(12, 11, 7, 8.4, '#e2442e', (x, y, dx, dy) => dx * dx + dy * dy > 0.66);
  d.poly([[11, 19], [13, 19], [17, 29], [15, 30]], '#e2442e'); d.poly([[15, 26], [17, 25], [19, 30], [17, 31]], '#2a2a2a');   // sap
  d.ell(24, 22, 3.6, 3.6, '#d8f03a'); d.ell(24, 22, 3.6, 3.6, '#f6f6f6', (x, y, dx) => Math.abs(Math.abs(dx) - 0.85) < 0.15);   // top
  return d.done(); };

A.madalya = () => { const d = G(32, '#f6ead2');
  d.poly([[8, 0], [14, 0], [17, 14], [12, 14]], '#e2442e'); d.poly([[24, 0], [18, 0], [15, 14], [20, 14]], '#2a6ad8');   // kurdele
  d.poly([[10, 0], [12, 0], [15, 12], [14, 12]], '#f6f6f6');
  d.ell(16, 21, 8, 8, '#c8901e'); d.ell(16, 21, 7, 7, '#f2c43a'); d.ell(16, 21, 5, 5, '#e8b02a');            // altın madalya
  d.rect(15, 17, 2, 8, '#c8901e'); d.px(14, 18, '#c8901e'); d.rect(14, 25, 4, 1, '#c8901e');                    // 1
  d.px(11, 17, '#fff4c0').px(12, 16, '#fff4c0');
  return d.done(); };

A.bowling = () => { const d = G(32, '#2a2440');
  d.rect(0, 26, 32, 6, '#c8925a'); for (let x = 0; x < 32; x += 4) d.rect(x, 26, 1, 6, '#a8723a');            // pist
  const pin = (x, y) => { d.map(x, y, ['.ww.', '.ww.', '..w.', '.rr.', '.ww.', 'wwww', 'wwww', 'wwww', '.ww.'].map(r => r.replace('..w.', '.ww.')), { w:'#f6f6f2', r:'#e2442e' }); };
  pin(17, 9); pin(22, 9); pin(27, 9); pin(19.5, 15.5); pin(24.5, 15.5);
  d.ell(9, 21, 6, 6, '#2a6ad8'); d.ell(9, 21, 6, 6, '#1e4aa8', (x, y, dx, dy) => dx + dy > 0.7);            // top
  d.px(7, 18, '#14205a').px(10, 18, '#14205a').px(8, 20, '#14205a'); d.px(6, 17, '#7aa8f0');
  return d.done(); };
A.kayak = () => { const d = G(32, '#a8d4f0');
  d.poly([[0, 14], [10, 6], [18, 12], [26, 5], [32, 10], [32, 32], [0, 32]], '#f6f8fc');
  d.poly([[10, 6], [7, 9], [12, 8]], '#d8e4f0'); d.poly([[26, 5], [23, 8], [28, 7]], '#d8e4f0');
  d.poly([[0, 32], [0, 22], [32, 15], [32, 32]], '#ffffff');                                                 // yamaç
  [[3, 26], [25, 18]].forEach(([x, y]) => { d.poly([[x, y - 5], [x - 2, y], [x + 2, y]], '#2a7a4a'); d.px(x, y + 1, '#6b4a1e'); });   // çamlar
  d.line(9, 27, 21, 23, '#e2442e'); d.line(10, 28, 22, 24, '#e2442e');                                      // kayaklar
  d.rect(14, 15, 3, 5, '#2a6ad8'); d.ell(15.5, 13, 1.6, 1.6, '#f2c8a0'); d.rect(14, 11, 3, 1, '#e2442e');    // kayakçı
  d.line(14, 20, 13, 25, '#1e3a6a'); d.line(16, 20, 17, 24, '#1e3a6a');
  d.line(13, 16, 10, 24, '#5a5a5a'); d.line(17, 16, 21, 22, '#5a5a5a');                                     // batonlar
  return d.done(); };

A.okculuk = () => { const d = G(32, '#cfe8c0');
  d.rect(0, 27, 32, 5, '#8ab84e');
  d.rect(14, 22, 1, 6, '#8a6a4a'); d.rect(19, 22, 1, 6, '#8a6a4a');
  [[11, '#f6f6f6'], [9, '#2a2a2a'], [7, '#2a8ad8'], [5, '#e2442e'], [3, '#f2c43a']].forEach(([r, c]) => d.ell(16.5, 13.5, r, r, c));   // hedef
  d.line(17, 13, 29, 4, '#8a5a2a'); d.px(16, 13, '#3a3a3a').px(17, 13, '#3a3a3a');                          // ok
  d.poly([[28, 3], [31, 2], [30, 5]], '#e2442e'); d.poly([[29, 5], [31, 6], [28, 7]], '#e2442e');
  return d.done(); };

A.masatenisi = () => { const d = G(32, '#f2e2c8');
  d.rect(0, 30, 32, 2, '#d8b888');
  d.rect(1, 20, 30, 3, '#2a7a5a'); d.rect(1, 20, 30, 1, '#f6f6f6'); d.rect(1, 22, 30, 1, '#1e5a40');             // masa
  d.rect(4, 23, 2, 7, '#3a3a3a'); d.rect(26, 23, 2, 7, '#3a3a3a');                                             // ayaklar
  d.rect(15, 15, 2, 5, '#3a3a3a'); d.rect(14, 15, 4, 1, '#f6f6f6');                                             // file
  d.ell(8, 8, 5, 5.6, '#e2442e'); d.ell(8, 8, 5, 5.6, '#b8301e', (x, y, dx) => dx > 0.6);                         // raket
  d.rect(10, 12, 3, 5, '#a8784a'); d.rect(10, 12, 3, 1, '#8a5a2a');
  d.ell(23, 9, 1.6, 1.6, '#f6a03a'); d.px(22, 8, '#ffd8a8');                                                   // top
  [[19, 13], [17, 16]].forEach(([x, y]) => d.px(x, y, '#e8c8a0'));
  return d.done(); };
A.kaykay = () => { const d = G(32, '#d8ecf6');
  d.rect(0, 25, 32, 7, '#a8a8a8'); for (let x = 2; x < 32; x += 8) d.rect(x, 28, 4, 1, '#c8c8c8');
  d.poly([[3, 13], [6, 11], [26, 11], [29, 13], [26, 15], [6, 15]], '#2a2a2a');                              // tahta
  d.poly([[4, 13], [6, 12], [26, 12], [28, 13], [26, 14], [6, 14]], '#e2442e');
  for (let x = 9; x < 24; x += 4) d.px(x, 13, '#f2c43a').px(x + 1, 13, '#f2c43a');
  d.rect(8, 16, 4, 2, '#7a7a7a'); d.rect(20, 16, 4, 2, '#7a7a7a');                                           // dingiller
  [8, 11, 20, 23].forEach(x => { d.ell(x + 0.5, 20, 1.8, 1.8, '#f2c43a'); d.px(x, 20, '#c8901e'); });         // tekerlekler
  return d.done(); };

// OKUL
A.canta = () => { const d = G(32, '#f2ecd8');
  d.rect(9, 3, 3, 6, '#1e4a8a'); d.rect(20, 3, 3, 6, '#1e4a8a'); d.rect(9, 2, 14, 2, '#1e4a8a');             // sap
  d.rect(6, 7, 20, 22, '#2a6ad8'); d.rect(6, 7, 20, 2, '#1e4a8a');                                          // gövde
  d.rect(9, 16, 14, 11, '#1e5ab8'); d.rect(9, 16, 14, 1, '#14408a');                                         // ön cep
  d.rect(15, 15, 2, 4, '#f2c43a'); d.rect(15, 18, 2, 1, '#c8901e');                                          // toka
  d.rect(6, 12, 20, 1, '#f2c43a');
  d.ell(12, 22, 1.6, 1.6, '#e2442e'); d.ell(20, 23, 1.4, 1.4, '#3ac06a');                                    // rozetler
  return d.done(); };

A.kursunkalem = () => { const d = G(32, '#f6f0e0');
  d.poly([[5, 26], [21, 6], [26, 10], [10, 30]], '#f2c43a'); d.poly([[13, 16], [21, 6], [23, 8], [15, 18]], '#f6d860');   // gövde
  d.poly([[21, 6], [24, 2], [27, 3], [28, 6], [26, 10]], '#e8a0a8'); d.poly([[20, 7], [23, 4], [27, 9], [25, 11]], '#b8b8c0');   // silgi, kelepçe
  d.line(21, 6, 26, 11, '#8a8a90');
  d.poly([[5, 26], [10, 30], [3, 31]], '#f2d8a8'); d.poly([[3, 29], [5, 30], [2, 31]], '#3a3a3a');           // açılmış uç
  d.line(4, 31, 14, 31, '#8a8a90');
  return d.done(); };

A.silgi = () => { const d = G(32, '#d8e8f2');
  d.poly([[4, 18], [20, 10], [28, 14], [12, 22]], '#f6a8b8'); d.poly([[4, 18], [12, 22], [12, 26], [4, 22]], '#e88a9a'); d.poly([[12, 22], [28, 14], [28, 18], [12, 26]], '#d8788a');   // silgi
  d.poly([[13, 14], [20, 10], [28, 14], [21, 18]], '#2a6ad8'); d.poly([[21, 18], [28, 14], [28, 18], [21, 22]], '#1e4aa8');   // kâğıt kılıf
  d.poly([[12, 22], [21, 18], [21, 22], [12, 26]], '#d8788a');
  [[6, 27], [9, 28], [4, 29], [12, 29]].forEach(([x, y]) => d.px(x, y, '#e88a9a').px(x + 1, y, '#f6a8b8'));   // silgi kırıntıları
  return d.done(); };

A.cetvel = () => { const d = G(32, '#f6f0e0');
  d.rect(1, 11, 30, 10, '#f2c43a'); d.rect(1, 20, 30, 1, '#c8901e'); d.rect(1, 11, 30, 1, '#f6d860');            // cetvel
  for (let x = 3, k = 0; x < 30; x += 2, k++) d.rect(x, 12, 1, k % 5 === 0 ? 5 : 2, '#3a2a1e');                  // çizgiler
  d.px(3, 18, '#e2442e').px(13, 18, '#e2442e').px(23, 18, '#e2442e');
  d.line(20, 25, 29, 25, '#3a5ad8'); d.line(20, 27, 26, 27, '#3a5ad8');
  return d.done(); };
A.defter = () => { const d = G(32, '#d8ecf6');
  d.rect(5, 3, 22, 26, '#e2442e'); d.rect(7, 3, 20, 26, '#f6f6f2');                                          // kapak kenarı, sayfa
  for (let y = 8; y < 28; y += 3) d.rect(9, y, 16, 1, '#a8c8e8');                                            // çizgiler
  d.rect(11, 3, 1, 26, '#f2a0a8');                                                                           // kenar boşluğu çizgisi
  for (let y = 5; y < 28; y += 3) { d.px(5, y, '#8a8a90'); d.px(6, y, '#c8c8d0'); }                           // spiral
  d.line(13, 11, 21, 11, '#3a5ad8'); d.line(13, 14, 19, 14, '#3a5ad8'); d.line(13, 17, 22, 17, '#3a5ad8');      // yazı
  d.ell(21, 23, 2.4, 2.4, '#f2c43a'); d.px(20, 22, '#3a3a3a').px(22, 22, '#3a3a3a'); d.line(20, 24, 22, 24, '#3a3a3a');   // gülen yüz
  return d.done(); };

A.boyakalemleri = () => { const d = G(32, '#f6f0e0');
  const cols = [['#e2442e', '#b8301e'], ['#f2862e', '#c8601e'], ['#f2c43a', '#c89a1e'], ['#3ab04a', '#2a803a'], ['#2a6ad8', '#1e4aa8'], ['#8a4ad8', '#6a2ab0']];
  cols.forEach(([c, k], i) => { const x = 4 + i * 4, y = 4 + (i % 2) * 3;
    d.poly([[x + 1.5, y], [x + 3, y + 3], [x, y + 3]], '#f2d8a8'); d.px(x + 1, y, c).px(x + 2, y, c);       // uç
    d.rect(x, y + 3, 3, 21 - (i % 2) * 3, c); d.rect(x + 2, y + 3, 1, 21 - (i % 2) * 3, k); });
  d.rect(2, 20, 28, 10, '#2a7ad8'); d.rect(2, 20, 28, 2, '#1e5ab8'); d.rect(10, 24, 12, 3, '#f6f6f2');         // kutu
  d.rect(12, 25, 2, 1, '#e2442e').rect(15, 25, 2, 1, '#f2c43a').rect(18, 25, 2, 1, '#3ab04a');
  return d.done(); };

A.makas = () => { const d = G(32, '#e8f2e0');
  d.poly([[15, 16], [26, 2], [28, 3], [17, 17]], '#c8ccd4'); d.poly([[17, 16], [6, 2], [4, 3], [15, 17]], '#e0e4ea');   // bıçaklar
  d.line(26, 2, 17, 16, '#8a8e98'); d.px(16, 16, '#5a5a5a');
  d.ell(10, 24, 5, 4.6, '#e2442e'); d.ell(10, 24, 2.8, 2.4, '#e8f2e0');                                      // sap halkaları
  d.ell(22, 24, 5, 4.6, '#e2442e'); d.ell(22, 24, 2.8, 2.4, '#e8f2e0');
  d.poly([[13, 20], [15, 17], [17, 17], [14, 21]], '#e2442e'); d.poly([[19, 20], [17, 17], [15, 17], [18, 21]], '#e2442e');
  return d.done(); };

A.yerkure = () => { const d = G(32, '#f2ead8');
  d.rect(10, 28, 12, 2, '#6b4a1e'); d.rect(15, 24, 2, 4, '#8a6a3a');                                         // ayak
  d.ell(16, 13, 13, 13, '#c8901e', (x, y, dx, dy) => dx * dx + dy * dy > 0.86 && dx > -0.2);                  // yay kol
  d.ell(16, 13, 10, 10, '#3a8ad8');                                                                          // okyanus
  d.poly([[10, 6], [15, 5], [16, 9], [13, 13], [9, 11]], '#5ab04a'); d.poly([[13, 14], [16, 14], [15, 21], [12, 19]], '#5ab04a');   // kıtalar
  d.poly([[18, 6], [24, 6], [25, 10], [21, 11], [19, 9]], '#5ab04a'); d.poly([[20, 13], [24, 13], [23, 17], [20, 16]], '#5ab04a');
  d.ell(16, 13, 10, 10, '#2a6ab8', (x, y, dx, dy) => dx + dy > 1.1);
  d.px(10, 8, '#a8d4f6').px(11, 7, '#a8d4f6');
  return d.done(); };

A.okulzili = () => { const d = G(32, '#f6ead2');
  d.rect(0, 0, 32, 4, '#b5583a'); d.rect(15, 4, 2, 4, '#5a5a5a');                                            // tavan, askı
  d.poly([[16, 7], [22, 13], [24, 22], [8, 22], [10, 13]], '#f2c43a'); d.ell(16, 9, 5, 3, '#f2c43a');          // zil
  d.poly([[8, 22], [24, 22], [25, 24], [7, 24]], '#c8901e'); d.poly([[11, 12], [13, 10], [12, 20], [10, 20]], '#fff0a0');
  d.ell(16, 26, 2, 2, '#8a6a3a');                                                                            // tokmak
  [[4, 14], [3, 18], [28, 14], [29, 18]].forEach(([x, y], i) => d.line(x, y, x + (i < 2 ? 2 : -2), y + 1, '#e2442e'));   // ses çizgileri
  d.line(5, 10, 6, 12, '#e2442e'); d.line(27, 10, 26, 12, '#e2442e');
  return d.done(); };
