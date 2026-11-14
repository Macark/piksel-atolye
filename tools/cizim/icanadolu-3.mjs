// İç Anadolu resimleri 3: Nevşehir, Niğde, Sivas, Yozgat
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', STEP = '#d9c48a';

// NEVŞEHİR — Peri Bacaları ve sıcak hava balonları
A.peribacalari = () => { const d = G(32, '#f6d6a8');
  d.rect(0, 0, 32, 10, '#f2c08a');
  const balon = (x, y, c, c2) => { d.ell(x, y, 3, 3.4, c); d.rect(x - 1, y - 3, 2, 7, c2); d.line(x - 2, y + 3, x - 1, y + 5, '#6b4a2a').line(x + 2, y + 3, x + 1, y + 5, '#6b4a2a'); d.rect(x - 1, y + 5, 2, 1, '#8a5a2b'); };
  balon(7, 6, '#e8384f', '#f2c14a'); balon(22, 4, '#2e7dba', '#8fc8f0'); balon(28, 10, '#4ea34a', '#f2c14a');
  d.rect(0, 26, 32, 6, '#d9b888');
  const baca = (x, h) => { d.poly([[x - 3, 27], [x + 3, 27], [x + 1.5, 27 - h], [x - 1.5, 27 - h]], '#e8cfa6'); d.ell(x, 27 - h, 2.6, 1.6, '#8a6a4a'); d.px(x, 23, '#5a4030'); };
  baca(6, 11); baca(13, 14); baca(20, 10); baca(26, 12);
  return d.done(); };

// Avanos Çömleği: Kızılırmak kilinden çömlekler
A.avanoscomlek = () => { const d = G(24, '#f3e6cf');
  d.rect(0, 20, 24, 4, '#c9a060');
  d.ell(8, 14, 5, 6, '#c0603a'); d.rect(6, 6, 4, 3, '#c0603a').rect(5, 6, 6, 1, '#a84a2a'); d.line(13, 10, 14, 15, '#a84a2a');   // testi
  d.rect(4, 13, 8, 1, '#f2d0a0'); d.ell(6, 12, 1, 2.6, '#d8805a');
  d.ell(18, 16, 4, 4, '#b8562e'); d.ell(18, 13, 3, 1, '#8a3a1a'); d.rect(15, 16, 7, 1, '#f2d0a0');            // çanak
  return d.done(); };

// Derinkuyu Yeraltı Şehri: kat kat inen tüneller, taş kapı
A.derinkuyu = () => { const d = G(32, '#6a5a4a');
  d.rect(0, 0, 32, 6, '#d9c48a');
  for (let k = 0; k < 4; k++){ const y = 7 + k * 6, x = 4 + k * 5; d.rect(x, y, 14, 4, '#3a2e26'); d.rect(x, y + 4, 14, 1, '#8a7a62'); d.px(x + 2, y + 1, '#f2c14a'); }   // kat kat odalar, kandil
  d.ell(26, 16, 3.5, 3.5, '#9a8a78'); d.ell(26, 16, 1, 1, '#5a4a3a');                                         // tekerlek taş kapı
  d.line(3, 6, 6, 30, '#7a6a5a');
  return d.done(); };

// NİĞDE — Aladağlar: sivri kayalık zirveler, buzul gölü
A.aladaglar = () => { const d = G(32, SKY);
  d.poly([[0, 22], [5, 10], [8, 14], [12, 4], [16, 12], [20, 6], [24, 13], [28, 8], [32, 16], [32, 26], [0, 26]], '#8a8a96');
  [[12, 4], [20, 6], [28, 8]].forEach(([x, y]) => d.poly([[x - 2, y + 3], [x, y], [x + 2, y + 3]], '#f6f8fa'));
  d.rect(0, 24, 32, 8, '#7ab04e'); d.ell(16, 27, 7, 2, '#4f9ac8'); d.ell(15, 27, 3, 0.8, '#8fc8f0');
  return d.done(); };

// Gümüşler Manastırı: kayaya oyulmuş manastır avlusu
A.gumusler = () => { const d = G(32, SKY);
  d.poly([[0, 8], [32, 6], [32, 32], [0, 32]], '#d9c4a0');
  d.rect(6, 12, 20, 16, '#b8a07a');                                                                          // avlu duvarı
  [[9, 15], [15, 13], [21, 15]].forEach(([x, y]) => { d.rect(x, y, 3, 6, '#5a4632'); d.ell(x + 1.5, y, 1.5, 1.2, '#5a4632'); });
  d.rect(10, 23, 12, 5, '#8a7660'); d.rect(14, 24, 4, 4, '#3a2e22');
  [[3, 18], [28, 20], [4, 26]].forEach(([x, y]) => d.rect(x, y, 2, 2, '#4a3828'));                          // kaya pencereleri
  return d.done(); };

// Niğde Tavası: tavada et, biber, domates, sarımsak
A.nigdetava = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 13, 10, 7, '#3a3a3a').rect(21, 12, 3, 2, '#5a3a22');
  d.ell(12, 13, 8.5, 5.6, '#a8502a'); [[8, 11], [12, 10], [15, 13], [10, 15], [14, 16]].forEach(([x, y]) => d.ell(x, y, 1.6, 1.2, '#6a2a12'));
  [[9, 13], [16, 11]].forEach(([x, y]) => d.ell(x, y, 1.4, 1.4, '#d9382a')); d.rect(11, 13, 3, 1, '#3f8a34').rect(6, 13, 2, 1, '#3f8a34');
  d.px(13, 14, '#f6efe0').px(7, 15, '#f6efe0');
  return d.done(); };

// SİVAS — Divriği Ulu Camii: taş oymacılığı başyapıtı taç kapı
A.divrigi = () => { const d = G(32, '#d9c8ae');
  d.rect(4, 2, 24, 30, '#c9b08a');
  d.ell(16, 12, 7, 7, '#b8986a', (x, y) => y < 13).rect(9, 12, 14, 20, '#b8986a');                           // derin kapı nişi
  d.ell(16, 16, 4, 4, '#4a3828', (x, y) => y < 17).rect(12, 16, 8, 16, '#4a3828');
  for (let k = 0; k < 16; k++){ const a = k * 0.4; d.px(16 + Math.cos(a) * 9 * (k % 2 ? 1 : 0.8), 12 - Math.abs(Math.sin(a)) * 8, '#8a6a42'); }   // oyma süsler
  [[6, 6], [24, 6], [6, 20], [24, 20]].forEach(([x, y]) => { d.ell(x + 1, y + 1, 2, 2, '#a8865a'); d.px(x + 1, y + 1, '#6a4a2a'); });
  for (let y = 4; y < 32; y += 3) { d.px(5, y, '#a8865a'); d.px(26, y, '#a8865a'); }
  return d.done(); };

// Sivas Köftesi: tırnaklı uzun köfteler, közde biber ve domates
A.sivaskofte = () => { const d = G(24, '#f4e7cf');
  d.ell(12, 13, 11, 8, '#fbf8f0').ell(12, 13, 9.5, 6.5, '#ece4d4');
  [[6, 9], [12, 8], [8, 13], [14, 12]].forEach(([x, y]) => { d.ell(x, y + 1, 3, 1.4, '#7a3a1a'); d.px(x - 1, y + 1, '#5a2a10').px(x + 1, y + 1, '#5a2a10'); d.px(x, y, '#a8562a'); });
  d.ell(17, 17, 2.6, 1.1, '#3f8a34'); d.ell(8, 17, 1.8, 1.6, '#d9382a');
  return d.done(); };

// Kangal Köpeği: siyah maskeli iri çoban köpeği
A.kangal = () => { const d = G(32, '#bfe3f2');
  d.rect(0, 25, 32, 7, '#a8c47a');
  d.ell(14, 18, 9, 5.5, '#d9b878'); [7, 11, 17, 21].forEach(x => d.rect(x, 21, 3, 6, '#d9b878'));
  d.line(5, 15, 3, 10, '#d9b878').line(4, 15, 2, 11, '#d9b878'); d.px(2, 10, '#c9a868');                     // kıvrık kuyruk
  d.ell(24, 12, 4.5, 4, '#d9b878'); d.ell(26.5, 13.5, 2.6, 2, '#2a2420'); d.ell(21.5, 10.5, 1.8, 2.6, '#2a2420');   // siyah maske, kulak
  d.px(24, 11, '#1a1a1a'); d.px(28, 13, '#1a1a1a');
  d.rect(20, 15, 4, 2, '#8a2a2a'); for (let x = 20; x < 24; x++) d.px(x, 15, '#c0c0c0');                     // çivili tasma
  return d.done(); };

// YOZGAT — Yozgat Çamlığı Milli Parkı: Türkiye'nin ilk milli parkı
A.camlik = () => { const d = G(32, SKY);
  d.rect(0, 24, 32, 8, '#7ab04e');
  const cam = (x, y, s) => { d.rect(x, y, 1, 4 * s, '#6b4a1e'); for (let k = 0; k < 3; k++) d.poly([[x - (4 - k) * s, y - k * 3 * s + 2], [x + 0.5, y - k * 3 * s - 4 * s + 2], [x + 1 + (4 - k) * s, y - k * 3 * s + 2]], k % 2 ? '#3f7a45' : '#2f6a3a'); };
  cam(5, 24, 1); cam(14, 24, 1.3); cam(24, 24, 1.1); cam(29, 26, 0.8);
  d.rect(18, 26, 6, 3, '#a8703a').rect(18, 25, 6, 1, '#c08a50'); d.rect(18, 29, 1, 2, '#6b4a2a').rect(23, 29, 1, 2, '#6b4a2a');   // piknik masası
  return d.done(); };

// Yozgat Tandır Kebabı: tandırda pişmiş et, pide üstünde
A.tandir = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 15, 11, 6, '#fbf8f0').ell(12, 15, 9.5, 4.8, '#ece4d4');
  d.ell(12, 14, 7, 3.4, '#e0a858');                                                                          // pide
  d.ell(11, 12.5, 5.5, 2.8, '#8a4422'); d.ell(10, 11.5, 2.5, 1.2, '#b8642e'); d.px(14, 12, '#5a2a10');           // tandır eti
  d.ell(18, 17, 1.8, 1.6, '#d9382a'); d.rect(5, 17, 3, 1, '#3f8a34');
  return d.done(); };

// Yozgat Parmak Çöreği: parmak biçimli çörekler
A.parmakcoregi = () => { const d = G(24, '#f6ecdc');
  d.ell(12, 14, 11, 7, '#c9cfd6').ell(12, 13.5, 10, 6, '#eef2f4');
  [[6, 9], [12, 10], [18, 9], [8, 14], [14, 15], [19, 14]].forEach(([x, y]) => { d.rect(x - 2, y, 4, 2, '#d9a050'); d.rect(x - 2, y, 4, 1, '#f2c47a'); d.px(x - 1, y + 1, '#b8803a'); d.px(x + 2, y + 1, '#c9cfd6'); });
  return d.done(); };
