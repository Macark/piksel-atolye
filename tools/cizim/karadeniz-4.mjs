// Karadeniz resimleri 4: Sinop, Tokat, Trabzon, Zonguldak
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', SEA = '#2e7dba', DGR = '#2f6a3a';
const ladin = (d, x, y, h, c = DGR) => { for (let k = 0; k < h; k++){ const w = Math.floor(k / 2) + 1; d.rect(x - w + 1, y + k, w * 2 - 1, 1, c); } d.px(x, y + h, '#5a3a1e'); };

// SİNOP — İnceburun Feneri: Türkiye'nin en kuzey noktası
A.inceburun = () => { const d = G(32, SKY);
  d.rect(0, 20, 32, 12, SEA); [[3, 24], [20, 28], [26, 23]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.poly([[0, 18], [14, 20], [22, 23], [0, 25]], '#6aa84a'); d.poly([[0, 23], [22, 23], [20, 25], [0, 26]], '#8a7a62');
  d.rect(9, 7, 4, 13, '#ffffff'); d.rect(8, 6, 6, 2, '#3a3a3a'); d.rect(9, 4, 4, 2, '#f6d36b'); d.poly([[8, 4], [11, 1], [14, 4]], '#c0392b');
  d.rect(9, 11, 4, 1, '#d9d9d4'); d.rect(10, 16, 2, 4, '#4a6a8a');
  d.poly([[13, 4], [24, 1], [24, 7]], '#fbf3c8');                                                        // ışık
  d.rect(26, 4, 1, 4, '#c0392b'); d.poly([[27, 4], [30, 5], [27, 6]], '#c0392b');                          // kuzey işareti bayrakçık
  return d.done(); };

// Sinop Mantısı: yoğurtlu, cevizli mantı
A.sinopmantisi = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 13, 11, 8, '#3a6aa8').ell(12, 13, 9.5, 6.5, '#f2efe6');
  for (let y = 9; y < 18; y += 3) for (let x = 6 + (y % 2 ? 1.5 : 0); x < 19; x += 3) if (((x - 12) ** 2) / 64 + ((y - 13) ** 2) / 30 < 1) { d.ell(x, y, 1.4, 1.1, '#e8c88a'); d.px(x, y - 1, '#f6e0b0'); }
  [[9, 11], [14, 14], [12, 9], [16, 11], [8, 15]].forEach(([x, y]) => d.rect(x, y, 1, 1, '#8a5a2b'));       // ceviz
  d.ell(12, 13, 2.6, 1.6, '#d9502a');
  return d.done(); };

// Hamsilos Koyu: ormanla çevrili dar koy
A.hamsilos = () => { const d = G(32, '#3f7a45');
  d.poly([[10, 0], [22, 0], [20, 14], [18, 32], [14, 32], [12, 14]], SEA);
  d.poly([[14, 0], [18, 0], [17, 10], [15, 10]], '#4f9ac8'); [[15, 18], [16, 24]].forEach(([x, y]) => d.rect(x, y, 2, 1, '#8fc8f0'));
  d.poly([[9, 0], [12, 14], [14, 32], [12, 32], [10, 14], [7, 0]], '#e8d8a8'); d.poly([[23, 0], [20, 14], [18, 32], [20, 32], [22, 14], [25, 0]], '#e8d8a8');   // kum kıyı
  [[3, 4, 6], [5, 16, 7], [3, 26, 5], [28, 3, 6], [27, 15, 7], [29, 25, 5]].forEach(([x, y, h], i) => ladin(d, x, y, h, i % 2 ? DGR : '#26583a'));
  d.rect(15, 21, 3, 1, '#f6efe0'); d.px(16, 20, '#c0392b');                                               // tekne
  return d.done(); };

// TOKAT — Ballıca Mağarası: renkli damlataşları ve sarkıtlar
A.ballica = () => { const d = G(32, '#4a3a3a');
  for (let x = 0; x < 32; x += 3){ const h = 5 + (x * 5) % 10; d.poly([[x, 0], [x + 3, 0], [x + 1.5, h]], ['#e8c8a8', '#d9a888', '#f2dcc0'][x % 3]); }
  for (let x = 0; x < 32; x += 4){ const h = 4 + (x * 3) % 8; d.poly([[x, 32], [x + 4, 32], [x + 2, 32 - h]], ['#d9b898', '#c89878', '#e8c8a8'][x % 3]); }
  d.rect(6, 18, 2, 10, '#f2dcc0'); d.rect(6, 15, 2, 3, '#e8c8a8');                                       // sütun
  [[14, 14], [22, 12], [18, 20]].forEach(([x, y]) => { d.px(x, y, '#8fc8f0'); });
  d.ell(22, 26, 5, 1.6, '#5a8aa8');
  return d.done(); };

// Tokat Kebabı: şişte kuzu, patlıcan, patates, domates
A.tokatkebabi = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 14, 11, 7, '#fbf8f0').ell(12, 14, 9.5, 5.8, '#ece4d4');
  d.line(2, 10, 22, 16, '#8a8e96');
  [[5, 11, '#7a3a1a'], [8, 12, '#4a2a4a'], [11, 12, '#e8c06a'], [14, 13, '#7a3a1a'], [17, 14, '#d9382a'], [19, 15, '#4a2a4a']].forEach(([x, y, c]) => d.ell(x, y, 1.6, 1.8, c));
  d.ell(9, 17, 2, 1, '#3f8a34'); d.rect(14, 17, 3, 1, '#3f8a34'); d.px(6, 15, '#e8c06a').px(16, 9, '#e8c06a');
  return d.done(); };

// Tokat Yazması: kalıpla basılmış desenli yazma
A.yazma = () => { const d = G(24, '#f6efe0');
  d.rect(2, 2, 20, 20, '#f2e2c0'); d.rect(2, 2, 20, 1, '#a8321e').rect(2, 21, 20, 1, '#a8321e').rect(2, 2, 1, 20, '#a8321e').rect(21, 2, 1, 20, '#a8321e');
  for (let y = 5; y < 20; y += 5) for (let x = 5; x < 20; x += 5){ d.px(x + 1, y, '#a8321e'); d.px(x, y + 1, '#a8321e'); d.px(x + 2, y + 1, '#a8321e'); d.px(x + 1, y + 2, '#a8321e'); d.px(x + 1, y + 1, '#2a2a2a'); d.px(x + 1, y + 3, '#3f6a2a'); }
  d.rect(16, 15, 6, 6, '#6b4a2a'); d.rect(17, 16, 4, 4, '#8a5a2b'); d.rect(18, 13, 2, 2, '#5a3a1e');        // ahşap kalıp
  return d.done(); };

// TRABZON — Sümela Manastırı: sarp kayalıkta manastır
A.sumela = () => { const d = G(32, '#dfeaf0');
  d.rect(0, 0, 32, 32, '#3f7a45');
  d.poly([[4, 0], [28, 0], [26, 22], [6, 22]], '#7a7a6a'); d.poly([[8, 4], [24, 4], [22, 16], [10, 16]], '#5a5a50');   // kaya ve oyuk
  d.rect(10, 9, 13, 7, '#e8dcc0'); d.rect(10, 9, 13, 1, '#a8482a');
  [11, 14, 17, 20].forEach(x => { d.rect(x, 10, 2, 2, '#4a6a8a'); d.rect(x, 13, 2, 2, '#4a6a8a'); });
  [[2, 18, 7], [29, 18, 7], [6, 24, 6], [25, 24, 6], [15, 25, 6]].forEach(([x, y, h], i) => ladin(d, x, y, h, i % 2 ? DGR : '#26583a'));
  return d.done(); };

// Uzungöl: dağlar arasında göl ve minareli cami
A.uzungol = () => { const d = G(32, SKY);
  d.poly([[0, 16], [8, 4], [14, 12], [22, 3], [32, 14], [32, 20], [0, 20]], '#3f7a45'); d.poly([[6, 7], [8, 4], [10, 7]], '#f2f6f8').poly([[20, 6], [22, 3], [24, 6]], '#f2f6f8');
  d.rect(0, 20, 32, 12, '#3a8aa8'); [[3, 24], [20, 28]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.rect(10, 15, 9, 5, '#f6efe0'); d.poly([[9, 15], [14.5, 12], [20, 15]], '#5a5e66'); d.rect(20, 9, 2, 11, '#f6efe0'); d.poly([[19.5, 9], [21, 6], [22.5, 9]], '#5a5e66');
  d.rect(10, 21, 9, 3, '#8ad0e0'); d.rect(20, 21, 2, 6, '#8ad0e0');                                      // yansıma
  return d.done(); };

// Akçaabat Köftesi: tabakta köfte, piyaz, biber
A.akcaabat = () => { const d = G(24, '#f4e7cf');
  d.ell(12, 13, 11, 8, '#fbf8f0').ell(12, 13, 9.5, 6.5, '#ece4d4');
  [[7, 10], [11, 9], [15, 10], [9, 13], [13, 13]].forEach(([x, y]) => { d.ell(x, y, 2, 1.4, '#6a3018'); d.px(x - 1, y - 1, '#8a4a2a'); });
  d.ell(16, 17, 3, 1.6, '#f2e6c8'); [[15, 17], [17, 16]].forEach(([x, y]) => d.px(x, y, '#d9c8a0'));      // piyaz
  d.rect(5, 16, 4, 1, '#3f8a34'); d.px(9, 16, '#2f6a28'); d.ell(19, 13, 1.4, 1.2, '#d9382a');
  return d.done(); };

// ZONGULDAK — Kömür Madeni: kasklı madenci, vagon
A.komur = () => { const d = G(32, '#3a3430');
  d.rect(0, 0, 32, 4, '#5a4a3a'); [4, 16, 28].forEach(x => { d.rect(x, 0, 2, 26, '#8a5a2b'); }); d.rect(0, 4, 32, 2, '#8a5a2b');   // tahkimat
  d.rect(0, 26, 32, 6, '#2a2420'); d.rect(0, 27, 32, 1, '#7a7e86');
  d.rect(19, 19, 10, 6, '#6a6e76'); d.rect(19, 18, 10, 2, '#1a1a1a'); [[21, 25], [27, 25]].forEach(([x, y]) => d.ell(x, y, 1.4, 1.4, '#3a3e46'));   // vagon + kömür
  d.ell(10, 12, 2.6, 2.6, '#f0c8a0'); d.ell(10, 10.5, 3, 2, '#f2c14a', (x, y) => y < 11); d.px(11, 9, '#fbf3c8');   // kask ve lamba
  d.rect(8, 15, 5, 7, '#3a5a8a'); d.rect(8, 22, 2, 4, '#2a2a2e').rect(11, 22, 2, 4, '#2a2a2e');
  d.line(13, 16, 16, 13, '#8a5a2b'); d.rect(15, 12, 3, 1, '#8a8e96');                                      // kazma
  return d.done(); };

// Gökgöl Mağarası: içinden dere akan mağara
A.gokgol = () => { const d = G(32, '#3a3a40');
  d.ell(16, 18, 14, 14, '#5a5a62'); d.ell(16, 20, 11, 11, '#2a2a30');
  for (let x = 6; x < 27; x += 3) d.poly([[x, 9], [x + 2, 9], [x + 1, 9 + 2 + (x % 4)]], '#8a8a92');
  d.poly([[8, 32], [12, 24], [20, 24], [24, 32]], '#3a7ab0'); d.rect(14, 26, 4, 1, '#8fc8f0'); d.rect(12, 29, 3, 1, '#8fc8f0');
  d.rect(4, 24, 4, 1, '#a8703a'); d.rect(24, 24, 4, 1, '#a8703a'); [[9, 16], [23, 15]].forEach(([x, y]) => d.px(x, y, '#f6d36b'));
  return d.done(); };

// Ereğli Osmanlı Çileği: pembe, kokulu çilekler
A.osmanlicilegi = () => { const d = G(24, '#f3ead6');
  d.ell(12, 18, 10, 3.6, '#b9895a'); d.ell(12, 17, 9, 2.6, '#d1a374');
  const c = (x, y) => { d.poly([[x - 3, y - 1], [x + 3, y - 1], [x + 1, y + 4], [x - 1, y + 4]], '#e8708a'); d.ell(x, y - 1, 3, 1.6, '#e8708a'); [[x - 1, y], [x + 1, y + 1], [x, y + 2], [x - 2, y - 1]].forEach(([a, b]) => d.px(a, b, '#fbe0a0')); d.poly([[x - 2, y - 2], [x, y - 4], [x + 2, y - 2]], '#3f8a34'); };
  c(7, 12); c(13, 11); c(18, 13); c(10, 15); c(16, 16);
  d.rect(2, 19, 20, 3, '#a8703a'); for (let x = 3; x < 22; x += 3) d.px(x, 20, '#8a5a2b');
  return d.done(); };
