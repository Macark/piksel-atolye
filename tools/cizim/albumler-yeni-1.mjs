// Yeni albümler 1: Dinozorlar, Çiftlik
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2';
const zemin = (d, c = '#8ab84e', y = 26) => d.rect(0, y, d.n, d.n - y, c);
const goz = (d, x, y) => { d.px(x, y, '#ffffff'); d.px(x + 1, y, '#1a1a1a'); };

// DİNOZORLAR
A.trex = () => { const d = G(32, '#f2e2b8'); zemin(d, '#b8a060');
  const c = '#5a9a4a', k = '#3f7a35';
  d.ell(15, 17, 7, 5, c); d.poly([[8, 16], [1, 22], [2, 24], [10, 20]], c);                                     // gövde, kuyruk
  d.ell(23, 9, 6, 4, c); d.rect(18, 10, 4, 6, c);                                                             // baş, boyun
  d.rect(22, 12, 7, 2, '#f6efe0'); for (let x = 22; x < 29; x += 2) d.px(x, 12, c);                           // ağız, dişler
  goz(d, 23, 7); d.px(27, 9, k);
  d.rect(20, 16, 3, 1, k); d.px(22, 17, k);                                                                   // kısa kollar
  d.rect(12, 21, 3, 6, k); d.rect(17, 21, 3, 6, k); d.rect(11, 26, 5, 1, '#2f5a28'); d.rect(16, 26, 5, 1, '#2f5a28');
  [[12, 14], [15, 13], [9, 18]].forEach(([x, y]) => d.px(x, y, k));
  return d.done(); };

A.triceratops = () => { const d = G(32, '#f2e2b8'); zemin(d, '#b8a060');
  const c = '#c97a3a', k = '#a85a2a';
  d.ell(13, 18, 9, 5.4, c); d.poly([[4, 17], [0, 20], [5, 21]], c);
  d.ell(23, 13, 5, 6, '#e0a060'); d.ell(23, 13, 3.6, 4.6, '#c97a3a');                                         // kemik yaka
  d.ell(25, 18, 4.4, 3, c); d.poly([[28, 17], [31, 19], [28, 20]], '#8a5a2a');                                // baş, gaga
  d.line(24, 15, 29, 10, '#f6efe0'); d.line(22, 15, 25, 10, '#f6efe0'); d.line(28, 17, 30, 15, '#f6efe0');      // üç boynuz
  goz(d, 25, 17);
  [7, 11, 16, 20].forEach(x => d.rect(x, 22, 3, 5, k));
  [[10, 16], [14, 15], [17, 17]].forEach(([x, y]) => d.px(x, y, k));
  return d.done(); };

A.brakiyozor = () => { const d = G(32, SKY); zemin(d);
  const c = '#7a9ab8', k = '#5a7a98';
  d.ell(11, 20, 8, 5, c); d.poly([[4, 19], [0, 24], [1, 25], [6, 22]], c);
  d.poly([[15, 17], [22, 4], [25, 5], [19, 19]], c); d.ell(25, 4, 3, 2, c); goz(d, 25, 3);                    // uzun boyun, baş
  [6, 10, 14, 17].forEach(x => d.rect(x, 23, 3, 4, k));
  d.rect(28, 10, 1, 16, '#6b4a1e'); d.ell(28.5, 9, 3.4, 3, '#3f7a35'); d.ell(27, 8, 1.4, 1.2, '#4f9a4a');      // ağaç
  return d.done(); };

A.stegozor = () => { const d = G(32, '#f2e2b8'); zemin(d, '#b8a060');
  const c = '#8aa84a', k = '#6a8a3a';
  for (let i = 0; i < 6; i++){ const x = 8 + i * 3, h = 4 + (i > 1 && i < 4 ? 2 : 0); d.poly([[x, 15], [x + 1.5, 15 - h], [x + 3, 15]], '#d9603a'); }   // sırt plakaları
  d.ell(16, 18, 9, 5, c); d.poly([[7, 18], [1, 17], [2, 20], [8, 21]], c);
  [[2, 15], [4, 15]].forEach(([x, y]) => d.line(x, y + 2, x - 1, y, '#f6efe0'));                              // kuyruk dikenleri
  d.ell(26, 20, 3.4, 2.4, c); goz(d, 26, 19);
  [10, 14, 18, 22].forEach(x => d.rect(x, 22, 3, 5, k));
  return d.done(); };

A.ankilozor = () => { const d = G(32, '#f2e2b8'); zemin(d, '#b8a060');
  const c = '#a88a5a', k = '#7a6440';
  d.ell(15, 19, 10, 5, c); for (let y = 15; y < 20; y += 2) for (let x = 7 + (y % 4 ? 1 : 0); x < 24; x += 3) d.ell(x, y, 1, 0.8, k);   // zırh
  d.poly([[5, 19], [0, 18], [0, 21], [5, 21]], c); d.ell(1.5, 19.5, 2.2, 2, '#6a5a3a');                      // kuyruk topuzu
  d.ell(26, 20, 3.6, 2.6, c); goz(d, 27, 19); d.px(24, 17, '#f6efe0').px(28, 18, '#f6efe0');
  [9, 13, 18, 21].forEach(x => d.rect(x, 23, 3, 4, k));
  return d.done(); };

A.pteranodon = () => { const d = G(32, '#f6c88a');
  d.rect(0, 24, 32, 8, '#3a6aa8'); d.poly([[0, 24], [8, 18], [14, 24]], '#6a5a4a');
  d.ell(26, 5, 3, 3, '#f6e8a8');
  const c = '#a87a5a';
  d.poly([[3, 14], [14, 10], [16, 13], [6, 17]], c); d.poly([[29, 12], [18, 10], [16, 13], [27, 16]], c);      // kanatlar
  d.ell(16, 12, 3, 2, '#c8946a'); d.poly([[18, 10], [25, 8], [19, 12]], '#c8946a'); d.poly([[16, 10], [13, 6], [17, 10]], '#c8946a');   // gaga, ibik
  goz(d, 17, 10);
  return d.done(); };

A.dinoyumurta = () => { const d = G(24, '#e8d8b0');
  d.ell(12, 19, 10, 3.6, '#b8a060'); d.ell(12, 18, 9, 2.4, '#d9c48a');                                         // yuva
  for (let k = 0; k < 9; k++) d.line(3 + k * 2, 20, 5 + k * 2, 16, '#a88a4a');
  const yum = (x, y, c, c2) => { d.ell(x, y, 3, 4, c); [[x - 1, y - 2], [x + 1, y + 1], [x - 1, y + 2]].forEach(([a, b]) => d.px(a, b, c2)); d.px(x - 1, y - 3, '#ffffff'); };
  yum(8, 13, '#f2ead8', '#8ab84e'); yum(15, 12, '#f2ead8', '#8ab84e');
  d.ell(12, 15, 2.6, 3.4, '#e8dcc0'); d.line(10, 14, 14, 16, '#6a5a3a'); d.px(12, 13, '#6a5a3a');            // çatlayan yumurta
  return d.done(); };

A.fosil = () => { const d = G(24, '#c9a878');
  for (let y = 0; y < 24; y += 6) d.rect(0, y, 24, 1, '#b8946a');
  [[12, 12, 9, '#8a6a46'], [13, 12, 7.6, '#e0c898'], [12.4, 11.4, 6.2, '#8a6a46'], [13, 12, 4.8, '#e0c898'], [12.6, 11.6, 3.4, '#8a6a46'], [12.8, 12, 2, '#e0c898'], [12.6, 11.8, 0.9, '#8a6a46']].forEach(([x, y, r, c]) => d.ell(x, y, r, r * 0.92, c));   // amonit sarmalı
  for (let k = 0; k < 16; k++){ const a = k / 16 * Math.PI * 2; d.line(12 + Math.cos(a) * 6.6, 12 + Math.sin(a) * 6.1, 12 + Math.cos(a) * 8.4, 12 + Math.sin(a) * 7.8, '#a8865a'); }   // kaburgalar
  d.line(1, 22, 4, 20, '#8a6a46');
  return d.done(); };

A.gokdasi = () => { const d = G(32, '#2a1f4a');
  [[3, 3], [9, 2], [14, 6], [29, 14], [5, 12]].forEach(([x, y]) => d.px(x, y, '#fbf3c8'));
  d.line(30, 1, 20, 11, '#f08a2a'); d.line(31, 2, 21, 12, '#f6d36b'); d.line(29, 1, 19, 10, '#e0502a');      // kuyruk
  d.ell(19, 12, 2.6, 2.6, '#8a6a5a'); d.px(18, 11, '#c8a090');
  d.poly([[0, 32], [0, 24], [8, 22], [12, 15], [16, 22], [32, 25], [32, 32]], '#4a3a3a');                  // yanardağ
  d.poly([[11, 16], [13, 16], [14, 20], [10, 20]], '#e0502a'); d.ell(12, 13, 2.4, 1.6, '#8a8a8a');
  d.rect(22, 26, 1, 4, '#2f4a28'); d.ell(22.5, 25, 2, 1.6, '#3f6a35');
  return d.done(); };

// ÇİFTLİK
A.ahir = () => { const d = G(32, SKY); zemin(d, '#7ab04e', 25);
  d.rect(6, 12, 20, 14, '#c0392b'); d.poly([[4, 13], [16, 4], [28, 13]], '#8a2a1e'); d.poly([[7, 13], [16, 6], [25, 13]], '#c0392b');
  d.rect(12, 17, 8, 9, '#f6efe0'); d.line(12, 17, 19, 25, '#f6efe0'); d.rect(13, 18, 6, 7, '#8a2a1e'); d.line(13, 18, 18, 24, '#f6efe0').line(18, 18, 13, 24, '#f6efe0');   // çapraz kapı
  d.rect(14, 9, 4, 3, '#f6efe0'); d.rect(15, 10, 2, 2, '#6a3a2a');
  d.rect(0, 22, 6, 1, '#f6efe0').rect(26, 22, 6, 1, '#f6efe0'); [1, 4, 27, 30].forEach(x => d.rect(x, 21, 1, 5, '#f6efe0'));   // çit
  return d.done(); };

A.inek = () => { const d = G(32, SKY); zemin(d, '#7ab04e', 25);
  d.ell(14, 17, 9, 5, '#fbfaf6'); [[11, 15, 3, 2], [17, 18, 2.6, 2], [8, 19, 2, 1.6]].forEach(([x, y, a, b]) => d.ell(x, y, a, b, '#2a2420'));   // benekler
  d.ell(25, 13, 4, 3.4, '#fbfaf6'); d.ell(27, 15, 2.6, 1.8, '#f2b8c0'); d.px(26, 15, '#a86a70').px(28, 15, '#a86a70'); goz(d, 24, 12);
  d.px(23, 9, '#e8d8b0').px(27, 9, '#e8d8b0'); d.px(22, 11, '#2a2420');
  [8, 11, 16, 19].forEach(x => d.rect(x, 21, 2, 5, '#fbfaf6')); [8, 11, 16, 19].forEach(x => d.rect(x, 25, 2, 1, '#3a3a3a'));
  d.line(5, 15, 3, 21, '#fbfaf6'); d.px(3, 22, '#2a2420'); d.ell(14, 22, 2, 1, '#f2b8c0');
  return d.done(); };

A.tavuk = () => { const d = G(32, '#f6ecd2'); zemin(d, '#c9b06a', 25);
  d.ell(13, 17, 7, 6, '#fbfaf6'); d.poly([[6, 15], [3, 10], [8, 13]], '#fbfaf6'); d.ell(12, 18, 4, 3, '#e8e4dc');   // gövde, kuyruk, kanat
  d.ell(19, 10, 3.4, 3.4, '#fbfaf6'); d.poly([[18, 6], [19, 5], [20, 6], [21, 5], [22, 7], [18, 7]], '#d9282a'); d.poly([[22, 10], [25, 11], [22, 12]], '#e0a526'); d.ell(21, 13, 1, 1.4, '#d9282a'); goz(d, 19, 9);
  d.rect(11, 22, 1, 4, '#e0a526').rect(15, 22, 1, 4, '#e0a526');
  const civ = x => { d.ell(x, 23, 2, 1.8, '#f6d36b'); d.ell(x + 1, 21, 1.4, 1.4, '#f6d36b'); d.px(x + 2, 21, '#e07a1a'); d.px(x + 1, 20, '#1a1a1a'); };
  civ(23); civ(27);
  return d.done(); };

A.koyun = () => { const d = G(32, SKY); zemin(d, '#7ab04e', 25);
  [[9, 15], [13, 13], [17, 13], [21, 15], [11, 19], [15, 19], [19, 19], [15, 16]].forEach(([x, y]) => d.ell(x, y, 3.4, 3, '#fbfaf6'));   // yün
  [[10, 14], [16, 12], [20, 18]].forEach(([x, y]) => d.px(x, y, '#e0dcd4'));
  d.ell(25, 16, 3, 3.4, '#3a3430'); d.ell(23, 13, 1.4, 1, '#3a3430'); goz(d, 25, 15); d.ell(25, 13, 2, 1, '#fbfaf6');
  [10, 13, 17, 20].forEach(x => d.rect(x, 21, 2, 5, '#3a3430'));
  return d.done(); };

A.korkuluk = () => { const d = G(32, '#f6d6a0');
  d.rect(0, 22, 32, 10, '#e0b84a'); for (let x = 0; x < 32; x += 3) d.line(x, 22, x + 1, 31, '#c99a2a');      // buğday tarlası
  d.rect(15, 8, 2, 20, '#8a5a2b'); d.rect(6, 12, 20, 2, '#8a5a2b');                                          // direk
  d.ell(16, 7, 3.4, 3, '#e8c88a'); d.poly([[11, 5], [21, 5], [18, 1], [14, 1]], '#6a4a2a'); d.rect(10, 5, 12, 1, '#6a4a2a');   // kafa, şapka
  d.px(15, 7, '#2a2420').px(17, 7, '#2a2420'); d.line(15, 9, 17, 9, '#2a2420');
  d.poly([[11, 11], [21, 11], [20, 21], [12, 21]], '#c0392b'); for (let y = 12; y < 21; y += 3) d.rect(12, y, 8, 1, '#2e5f9e');   // ekose gömlek
  [[6, 14], [26, 14], [14, 21], [18, 21]].forEach(([x, y]) => d.line(x, y, x + (x < 16 ? -1 : 1), y + 2, '#e0b84a'));   // saman uçları
  d.px(27, 5, '#2a2420').px(26, 4, '#2a2420').px(28, 4, '#2a2420');                                        // kuş
  return d.done(); };

A.samanbalyasi = () => { const d = G(24, SKY); zemin(d, '#8ab84e', 18);
  d.ell(9, 13, 7, 6, '#e0b84a'); for (let r = 1; r < 6; r += 2) d.ell(9, 13, r, r * 0.85, (r % 4) ? '#c99a2a' : '#f2d06a', (x, y, a, b) => a * a + b * b > 0.6); d.ell(9, 13, 1, 1, '#c99a2a');   // rulo balya
  d.rect(14, 10, 9, 9, '#e8c45a'); for (let y = 11; y < 19; y += 2) d.rect(14, y, 9, 1, '#d4a83a'); d.rect(17, 10, 1, 9, '#8a5a2b').rect(20, 10, 1, 9, '#8a5a2b');   // kare balya
  return d.done(); };

A.at = () => { const d = G(32, SKY); zemin(d, '#7ab04e', 25);
  const c = '#9a5a2a', k = '#5a3418';
  d.ell(14, 16, 8, 4.4, c); d.poly([[19, 14], [23, 5], [27, 7], [23, 15]], c); d.ell(26, 7, 3, 2, c); d.ell(28, 8, 1.6, 1.4, '#7a4420');   // gövde, boyun, baş
  d.poly([[20, 12], [22, 4], [23, 5], [21, 13]], k); d.px(23, 4, k).px(24, 4, c); goz(d, 25, 6);              // yele, kulak
  d.poly([[6, 14], [2, 22], [4, 22], [7, 17]], k);                                                          // kuyruk
  [8, 11, 17, 20].forEach(x => { d.rect(x, 19, 2, 6, c); d.rect(x, 25, 2, 1, '#2a2420'); });
  return d.done(); };

A.keci = () => { const d = G(32, SKY);
  d.poly([[0, 32], [0, 22], [10, 18], [20, 22], [26, 16], [32, 18], [32, 32]], '#9a8a7a');
  const c = '#fbfaf6';
  d.ell(13, 13, 6, 3.6, c); d.ell(20, 9, 2.6, 2.4, c); d.poly([[21, 10], [23, 12], [21, 13]], c); d.line(22, 12, 22, 14, '#e0dcd4');   // gövde, baş, sakal
  d.line(19, 7, 17, 4, '#8a7a6a').line(20, 7, 19, 4, '#8a7a6a'); goz(d, 20, 9);                               // boynuzlar
  d.px(7, 11, c).px(6, 10, c);
  [9, 11, 15, 17].forEach(x => { d.rect(x, 16, 1, 4, c); d.px(x, 20, '#3a3a3a'); });
  d.poly([[6, 21], [18, 20], [16, 23], [8, 23]], '#8a7a6a');                                               // kaya
  return d.done(); };

A.ordek = () => { const d = G(32, SKY);
  d.rect(0, 20, 32, 12, '#4f9ac8'); [[3, 24], [20, 28], [24, 22]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.poly([[0, 20], [6, 17], [10, 20]], '#7ab04e'); for (let x = 1; x < 7; x += 2) d.line(x, 20, x, 14, '#5a8a3a');
  d.ell(16, 19, 7, 4, '#fbfaf6'); d.poly([[9, 18], [6, 15], [11, 17]], '#fbfaf6'); d.ell(15, 19, 3.4, 2, '#e8e4dc');
  d.ell(22, 12, 3, 3, '#3f8a5a'); d.rect(21, 14, 2, 3, '#3f8a5a'); d.rect(20, 16, 4, 1, '#fbfaf6'); d.poly([[24, 12], [28, 13], [24, 14]], '#e0a526'); goz(d, 22, 11);
  d.ell(16, 23, 7, 0.8, '#3a7ab0');
  return d.done(); };
