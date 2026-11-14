// Doğu Anadolu resimleri 3: Hakkari, Iğdır, Kars, Malatya
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', DGR = '#2f6a3a';
const ladin = (d, x, y, h, c = DGR) => { for (let k = 0; k < h; k++){ const w = Math.floor(k / 2) + 1; d.rect(x - w + 1, y + k, w * 2 - 1, 1, c); } d.px(x, y + h, '#5a3a1e'); };

// HAKKARİ — Cilo Dağları: sivri zirveler ve buzullar
A.cilo = () => { const d = G(32, SKY);
  d.poly([[0, 26], [4, 14], [8, 18], [13, 4], [17, 12], [21, 6], [26, 14], [32, 10], [32, 26]], '#6a6a76');
  [[13, 4], [21, 6], [32, 10], [4, 14]].forEach(([x, y]) => d.poly([[x - 3, y + 5], [x, y], [x + 3, y + 5]], '#f6f8fa'));
  d.poly([[10, 16], [16, 15], [20, 22], [12, 24]], '#d8eef8'); d.line(12, 18, 17, 21, '#a8d0e8');            // buzul
  d.rect(0, 25, 32, 7, '#8aa86a'); [[4, 28], [20, 29]].forEach(([x, y]) => d.ell(x, y, 2, 1, '#6a8a4a'));
  return d.done(); };

// Ters Lale: sarkık turuncu çiçekli lale (ağlayan gelin)
A.terslale = () => { const d = G(24, '#dfeef2');
  d.rect(0, 20, 24, 4, '#7a9a5a');
  d.rect(11, 6, 2, 15, '#4f8a3a');
  d.poly([[9, 3], [12, 0], [15, 3]], '#5aa04a'); d.line(12, 1, 12, 5, '#4f8a3a');                            // tepe yaprakları
  [[7, 8], [10, 9], [14, 9], [17, 8], [12, 10]].forEach(([x, y]) => { d.line(12, 6, x, y - 1, '#4f8a3a'); d.poly([[x - 1.5, y - 1], [x + 1.5, y - 1], [x + 1, y + 3], [x - 1, y + 3]], '#e8702a'); d.px(x, y + 3, '#f6d36b'); });
  d.line(9, 20, 7, 14, '#5aa04a').line(15, 20, 17, 14, '#5aa04a');
  return d.done(); };

// Zap Suyu: derin vadide coşkun akan dere
A.zap = () => { const d = G(32, SKY);
  d.poly([[0, 4], [12, 6], [10, 32], [0, 32]], '#8a7a6a'); d.poly([[32, 3], [20, 6], [22, 32], [32, 32]], '#7a6a5a');
  d.poly([[12, 6], [20, 6], [22, 32], [10, 32]], '#5a8a4a');
  let x = 15; for (let y = 8; y < 32; y++){ x += Math.sin(y * 0.5) * 0.8; d.rect(Math.round(x) - 1 - (y >> 3), y, 3 + (y >> 2), 1, '#4f9ac8'); if (y % 3 === 0) d.px(Math.round(x), y, '#ffffff'); }
  [[3, 8, 4], [28, 7, 4], [5, 18, 4]].forEach(([a, b, h]) => ladin(d, a, b, h, '#3f7a45'));
  return d.done(); };

// IĞDIR — Iğdır Kayısısı: dalda turuncu kayısılar
A.igdirkayisi = () => { const d = G(24, '#dff0f6');
  d.line(0, 6, 23, 3, '#6b4a1e'); d.line(0, 7, 23, 4, '#6b4a1e');
  [[4, 2], [14, 1], [20, 6], [9, 9]].forEach(([x, y]) => d.ell(x, y, 2.6, 1.4, '#4f9a4a'));
  [[6, 10], [12, 9], [17, 9], [9, 14], [15, 14]].forEach(([x, y]) => { d.ell(x, y, 2.6, 2.6, '#f29a3a'); d.ell(x + 0.8, y + 0.8, 1.4, 1.4, '#e0703a'); d.px(x - 1, y - 1, '#fbd08a'); });
  d.rect(0, 20, 24, 4, '#a8c47a');
  return d.done(); };

// Aras Kuş Cenneti: nehir kıyısında sazlık ve kuşlar
A.araskus = () => { const d = G(32, SKY);
  d.poly([[0, 12], [16, 10], [32, 12], [32, 14], [0, 14]], '#a8b88a');
  d.rect(0, 14, 32, 18, '#7aa8c0'); [[4, 20], [22, 24], [12, 28]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#bfe0f0'));
  for (let x = 0; x < 10; x += 2) { d.line(x, 31, x, 22 - (x % 3), '#7a8a3a'); d.px(x, 21 - (x % 3), '#8a6a3a'); }
  const kus = (x, y, c) => { d.ell(x, y, 2.4, 1.4, c); d.ell(x + 2, y - 1, 1, 1, c); d.px(x + 3, y - 1, '#e0a526'); d.px(x - 2, y, '#3a3a3a'); };
  kus(16, 18, '#f6f8fa'); kus(24, 21, '#e8a8b8'); kus(14, 24, '#6a6a7a');
  [[20, 5], [24, 4], [8, 6]].forEach(([x, y]) => { d.px(x, y, '#3a3a3a'); d.px(x - 1, y - 1, '#3a3a3a'); d.px(x + 1, y - 1, '#3a3a3a'); });
  return d.done(); };

// Iğdır Ovası: dağlarla çevrili ılık ova, tarlalar
A.igdirova = () => { const d = G(32, SKY);
  d.poly([[0, 14], [6, 6], [12, 10], [20, 3], [28, 9], [32, 7], [32, 16], [0, 16]], '#8a7a7a');
  d.poly([[17, 6], [20, 3], [23, 6]], '#f6f8fa');
  d.rect(0, 15, 32, 17, '#8ab84e');
  for (let y = 17; y < 32; y += 5) for (let x = 0; x < 32; x += 8) d.rect(x + (y % 2) * 4, y, 7, 4, ['#9ac85a', '#c9b85a', '#f6f8fa', '#7aa84a'][(x / 8 + y) % 4 | 0]);   // tarlalar (pamuk beyaz)
  for (let x = 0; x < 32; x += 6) { d.ell(x + 2, 15, 1.6, 1.6, '#4f8a3a'); }
  d.ell(27, 4, 2.2, 2.2, '#f6d36b');
  return d.done(); };

// KARS — Ani Ören Yeri: kızıl taş kalıntılar, surlar
A.ani = () => { const d = G(32, SKY);
  d.rect(0, 22, 32, 10, '#b8a87a'); d.poly([[0, 24], [32, 22], [32, 26], [0, 27]], '#a8986a');
  d.rect(3, 14, 6, 9, '#a8644a'); d.poly([[2, 14], [6, 9], [10, 14]], '#8a4a3a'); d.rect(5, 17, 2, 3, '#4a2a22');   // kilise
  d.rect(14, 10, 8, 13, '#b8745a'); d.ell(18, 10, 4, 3, '#9a5a44', (x, y) => y < 10); d.ell(18, 15, 1.4, 1.4, '#4a2a22', (x, y) => y < 15); d.rect(17, 15, 2, 4, '#4a2a22');
  d.rect(25, 17, 6, 6, '#a8644a'); d.px(25, 16, '#a8644a').px(27, 16, '#a8644a').px(29, 16, '#a8644a');            // yıkık sur
  d.rect(22, 21, 3, 2, '#9a5a44');
  return d.done(); };

// Kars Kaşarı: büyük kaşar tekeri ve dilimler
A.karskasari = () => { const d = G(24, '#f4ead8');
  d.rect(0, 18, 24, 6, '#a8703a').rect(0, 18, 24, 1, '#c08a50');
  d.ell(10, 13, 8, 4, '#e0b84a'); d.rect(2, 9, 16, 4, '#f2d06a'); d.ell(10, 9, 8, 4, '#f6dc8a'); d.ell(10, 9, 6, 2.6, '#fbe8a8');   // teker
  d.poly([[16, 15], [22, 13], [22, 17], [16, 18]], '#f2d06a'); d.poly([[16, 15], [22, 13], [23, 14], [17, 16]], '#fbe8a8');      // dilim
  d.px(7, 9, '#e0b84a').px(12, 10, '#e0b84a');
  return d.done(); };

// Sarıkamış: çam ormanında kayak
A.sarikamis = () => { const d = G(32, SKY);
  d.poly([[0, 10], [32, 4], [32, 32], [0, 32]], '#f2f6f8');
  [[3, 6, 7], [8, 8, 6], [24, 3, 8], [29, 5, 7], [13, 10, 5], [27, 16, 5]].forEach(([x, y, h], i) => { ladin(d, x, y, h, i % 2 ? DGR : '#26583a'); d.px(x, y + 2, '#ffffff'); });
  d.line(5, 28, 16, 25, '#2e7dba').line(6, 29, 17, 26, '#2e7dba');                                           // kayaklar
  d.rect(9, 18, 3, 6, '#c0392b'); d.ell(10.5, 16.5, 1.6, 1.6, '#f0c8a0'); d.rect(9, 14, 3, 2, '#2e7dba'); d.rect(9, 24, 1, 3, '#2a2a2e').rect(11, 23, 1, 3, '#2a2a2e');
  d.line(8, 19, 5, 26, '#3a3a3a').line(13, 19, 15, 25, '#3a3a3a');
  [[20, 12], [18, 20], [26, 26], [4, 14]].forEach(([x, y]) => d.px(x, y, '#d8eaf2'));
  return d.done(); };

// MALATYA — Arslantepe Höyüğü: kerpiç saray kalıntıları, aslan heykeli
A.arslantepe = () => { const d = G(32, SKY);
  d.poly([[0, 22], [6, 12], [26, 12], [32, 22], [32, 32], [0, 32]], '#c9a878');
  for (let k = 0; k < 4; k++) d.rect(6 + k * 5, 15, 4, 6, '#a8805a'); d.rect(5, 21, 22, 1, '#8a6a4a');            // kerpiç duvarlar
  [[8, 16], [18, 16]].forEach(([x, y]) => d.rect(x, y, 1, 3, '#d8b888'));
  d.rect(4, 25, 9, 4, '#8a8a8a'); d.ell(11, 24, 2.4, 2.2, '#8a8a8a'); d.px(12, 23, '#3a3a3a'); d.rect(4, 29, 1, 2, '#6a6a6a').rect(11, 29, 1, 2, '#6a6a6a');   // taş aslan
  d.rect(22, 26, 6, 3, '#c0392b'); d.rect(23, 25, 4, 1, '#c0392b');                                        // kazı kovası
  return d.done(); };

// Malatya Kayısısı: tepside gün kurusu kayısılar
A.malatyakayisi = () => { const d = G(24, '#f6ead2');
  d.rect(1, 6, 22, 14, '#b9895a'); d.rect(2, 7, 20, 12, '#d1a374');
  for (let y = 9; y < 18; y += 4) for (let x = 4 + (y % 8 ? 2 : 0); x < 21; x += 4) { d.ell(x, y, 1.8, 1.6, '#c86a2a'); d.px(x - 1, y - 1, '#e8964a'); d.px(x, y, '#a8501a'); }
  d.ell(20, 3, 2.6, 2.6, '#f29a3a'); d.ell(20.6, 3.6, 1.4, 1.4, '#e0703a'); d.px(21, 0, '#4f8a3a');           // taze kayısı
  return d.done(); };

// Battalgazi Ulu Camii: Selçuklu dönemi tuğla cami
A.battalgazi = () => { const d = G(32, SKY);
  d.rect(0, 26, 32, 6, '#c9b48a');
  d.rect(3, 13, 26, 13, '#b8704a'); for (let y = 14; y < 26; y += 2) for (let x = 3 + (y % 4 ? 0 : 2); x < 29; x += 4) d.rect(x, y, 3, 1, '#a8603a');   // tuğla örgü
  d.ell(19, 13, 5, 4, '#8a7a7a', (x, y) => y < 13);
  d.rect(9, 11, 8, 15, '#c8805a'); d.ell(13, 17, 2.6, 2.6, '#2e7dba', (x, y) => y < 17); d.rect(10, 17, 6, 9, '#4a3028'); d.rect(11, 18, 4, 8, '#3a2018');   // eyvan, çini kemer
  d.rect(26, 4, 3, 9, '#b8704a'); d.poly([[25.5, 4], [27.5, 1], [29.5, 4]], '#8a5a3a');
  return d.done(); };
