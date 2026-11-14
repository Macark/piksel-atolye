// Doğu Anadolu resimleri 4: Muş, Tunceli, Van
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', DGR = '#2f6a3a';
const ladin = (d, x, y, h, c = DGR) => { for (let k = 0; k < h; k++){ const w = Math.floor(k / 2) + 1; d.rect(x - w + 1, y + k, w * 2 - 1, 1, c); } d.px(x, y + h, '#5a3a1e'); };

// MUŞ — Malazgirt 1071: bozkırda sancaklı atlı
A.malazgirt = () => { const d = G(32, '#f2d6a8');
  d.rect(0, 0, 32, 8, '#f6e2c0'); d.ell(6, 6, 3, 3, '#f08a2a');
  d.poly([[0, 22], [12, 18], [32, 21], [32, 32], [0, 32]], '#c9a868');
  d.ell(16, 20, 6, 3, '#6b4a2a'); d.ell(22, 16, 2, 2.6, '#6b4a2a'); d.rect(21, 13, 2, 3, '#6b4a2a'); d.px(23, 15, '#1a1a1a');   // at
  [11, 13, 18, 20].forEach(x => d.rect(x, 22, 1, 5, '#5a3a1e')); d.line(10, 19, 7, 23, '#3a2416');
  d.rect(14, 12, 4, 6, '#2e5f9e'); d.ell(16, 10.5, 1.8, 1.8, '#f0c8a0'); d.poly([[14, 9], [16, 6], [18, 9]], '#8a8e96');    // süvari, miğfer
  d.rect(12, 3, 1, 15, '#6b4a2a'); d.poly([[13, 3], [19, 4], [13, 7]], '#c0392b');                          // sancak
  return d.done(); };

// Muş Lalesi: ovada kırmızı yabani laleler
A.muslalesi = () => { const d = G(24, '#dff0f6');
  d.rect(0, 16, 24, 8, '#7ab04e'); d.poly([[0, 16], [12, 13], [24, 16]], '#8ac05a');
  const lale = (x, y, h) => { d.rect(x, y, 1, h, '#4f8a3a'); d.line(x - 2, y + h, x - 1, y + 3, '#5aa04a'); d.poly([[x - 2, y], [x - 2, y - 3], [x - 1, y - 2], [x, y - 4], [x + 1, y - 2], [x + 2, y - 3], [x + 2, y]], '#d9282a'); d.px(x - 1, y - 1, '#f05a4a'); };
  lale(6, 9, 10); lale(12, 7, 12); lale(18, 10, 9); lale(9, 14, 6); lale(16, 15, 5);
  return d.done(); };

// Murat Nehri: Muş Ovası'ndan kıvrılarak akan nehir
A.murat = () => { const d = G(32, SKY);
  d.poly([[0, 12], [8, 6], [16, 10], [24, 4], [32, 9], [32, 14], [0, 14]], '#8a8a76');
  d.poly([[6, 8], [8, 6], [10, 8]], '#f6f8fa').poly([[22, 6], [24, 4], [26, 6]], '#f6f8fa');
  d.rect(0, 13, 32, 19, '#9ac85a');
  let x = 4; for (let y = 13; y < 32; y++){ x += Math.sin(y * 0.4) * 1.6; d.rect(Math.round(x + y * 0.4), y, 3 + (y >> 3), 1, '#3a8ac0'); d.px(Math.round(x + y * 0.4) + 1, y, '#8fc8f0'); }
  [[4, 20], [26, 18], [24, 28]].forEach(([a, b]) => { d.rect(a, b, 1, 3, '#6b4a2a'); d.ell(a + 0.5, b - 1, 2, 2, '#4f8a3a'); });
  return d.done(); };

// TUNCELİ — Munzur Vadisi: ormanlık vadi, dağ keçisi
A.munzur = () => { const d = G(32, SKY);
  d.poly([[0, 4], [10, 10], [12, 32], [0, 32]], '#7a7a6a'); d.poly([[32, 3], [22, 10], [20, 32], [32, 32]], '#8a8a7a');
  d.poly([[10, 10], [22, 10], [20, 32], [12, 32]], '#5a9a4a');
  d.poly([[14, 18], [18, 18], [19, 32], [13, 32]], '#4f9ac8'); d.rect(15, 24, 2, 1, '#8fc8f0');
  [[3, 12, 6], [6, 20, 6], [27, 12, 6], [25, 22, 5], [12, 12, 4], [20, 13, 4]].forEach(([x, y, h], i) => ladin(d, x, y, h, i % 2 ? DGR : '#3f7a45'));
  d.ell(27, 6, 2.2, 1.4, '#8a6a4a'); d.rect(26, 7, 1, 2, '#6a4a2a').rect(28, 7, 1, 2, '#6a4a2a'); d.line(29, 5, 30, 2, '#5a4030'); d.line(29, 5, 31, 3, '#5a4030');   // dağ keçisi
  return d.done(); };

// Munzur Gözeleri: kayaların arasından çıkan kaynak suları
A.gozeler = () => { const d = G(32, '#4f8a4a');
  d.poly([[0, 0], [32, 0], [32, 14], [0, 16]], '#8a8a7a');
  [[5, 10], [13, 8], [22, 11], [28, 9]].forEach(([x, y]) => { d.ell(x, y, 2.4, 1.6, '#3a3a36'); d.rect(x - 1, y + 1, 2, 6, '#bfe8f8'); d.px(x, y + 2, '#ffffff'); });   // kaynaklar
  d.rect(0, 18, 32, 14, '#5ab0d0'); d.rect(0, 18, 32, 1, '#8fd0e8'); [[4, 22], [18, 26], [24, 21]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#bfe8f8'));
  [[2, 16], [9, 15], [17, 16], [26, 16]].forEach(([x, y]) => d.ell(x, y, 2, 1, '#6a6a62'));
  return d.done(); };

// Pertek Kalesi: baraj gölü içindeki kale
A.pertek = () => { const d = G(32, SKY);
  d.poly([[0, 12], [10, 8], [22, 11], [32, 7], [32, 15], [0, 15]], '#9a8a6a');
  d.rect(0, 14, 32, 18, '#2e7dba'); [[3, 24], [22, 28], [24, 18]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.ell(15, 22, 7, 2.4, '#8a7a62'); d.rect(10, 13, 10, 9, '#b8a48a'); for (let x = 10; x < 20; x += 2) d.px(x, 12, '#b8a48a');
  d.rect(13, 9, 4, 5, '#c4b096'); d.px(13, 8, '#c4b096').px(15, 8, '#c4b096'); d.rect(14, 16, 2, 3, '#4a3828');
  d.rect(24, 24, 6, 2, '#f6efe0'); d.rect(25, 22, 3, 2, '#c0392b');                                         // feribot
  return d.done(); };

// VAN — Van Kedisi: bembeyaz, bir gözü mavi bir gözü sarı
A.vankedisi = () => { const d = G(32, '#c9e0f0');
  d.rect(0, 24, 32, 8, '#a8c4d8');
  d.ell(15, 20, 8, 6, '#fbfaf6'); d.ell(15, 22, 6, 3, '#eef0f2');
  d.ell(15, 11, 6, 5.4, '#fbfaf6'); d.poly([[9, 9], [10, 3], [13, 7]], '#fbfaf6').poly([[21, 9], [20, 3], [17, 7]], '#fbfaf6');
  d.poly([[10, 7], [10.5, 4.5], [12, 6.5]], '#f2b8c0').poly([[20, 7], [19.5, 4.5], [18, 6.5]], '#f2b8c0');
  d.ell(12.5, 11, 1.4, 1.6, '#3a8ad8'); d.ell(17.5, 11, 1.4, 1.6, '#e0b020'); d.px(12, 11, '#1a1a1a').px(17, 11, '#1a1a1a');
  d.px(15, 13, '#f2a0a8'); d.px(14, 14, '#c9c4c0').px(16, 14, '#c9c4c0');
  d.line(23, 22, 27, 14, '#fbfaf6'); d.line(24, 22, 28, 14, '#fbfaf6'); d.ell(28, 13, 1.4, 1.4, '#fbfaf6');   // kuyruk
  return d.done(); };

// Akdamar Adası: Van Gölü'nde ada ve kilise
A.akdamar = () => { const d = G(32, SKY);
  d.poly([[0, 12], [10, 6], [20, 10], [32, 5], [32, 14], [0, 14]], '#a89a8a');
  d.rect(0, 14, 32, 18, '#3a6ac0'); [[3, 26], [24, 28], [26, 19]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8ab0e8'));
  d.ell(15, 22, 11, 3.4, '#a8946a'); d.ell(15, 20, 9, 3, '#7a9a5a', (x, y) => y < 21);
  d.rect(11, 12, 8, 8, '#c9a88a'); d.rect(14, 8, 3, 4, '#b8987a'); d.poly([[13, 8], [15.5, 5], [18, 8]], '#8a6a5a');
  d.rect(14, 15, 2, 4, '#5a4632'); d.px(12, 14, '#8a6a5a').px(17, 14, '#8a6a5a');
  [[5, 18], [25, 19]].forEach(([x, y]) => { d.rect(x, y, 1, 2, '#6b4a2a'); d.ell(x + 0.5, y - 1, 1.6, 1.6, '#e8a8c8'); });   // badem çiçekleri
  return d.done(); };

// Van Otlu Peyniri: otlarla olgunlaşan peynir, kahvaltı tabağı
A.otlupeynir = () => { const d = G(24, '#f4ead8');  // mavi tabak
  d.ell(12, 14, 11, 7, '#3a6aa8').ell(12, 14, 9.5, 5.8, '#6a9ad0');
  d.rect(6, 10, 8, 7, '#f6f2e6'); d.rect(6, 10, 8, 1, '#ffffff'); [[7, 12], [10, 13], [12, 11], [8, 15], [12, 15], [9, 11]].forEach(([x, y]) => d.px(x, y, '#4f8a3a'));
  d.ell(17, 12, 2.2, 1.6, '#3a1a1a'); d.ell(18, 16, 2, 1.4, '#3f6a2a'); d.px(17, 11, '#6a3a3a');             // zeytin, biber
  d.ell(16, 19, 2, 1, '#e8a526');
  return d.done(); };
