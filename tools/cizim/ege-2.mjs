// Ege resimleri 2: Kütahya, Manisa, Muğla, Uşak
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2';

// KÜTAHYA — Aizanoi: Zeus Tapınağı'nın ayakta kalan sütunları
A.aizanoi = () => { const d = G(32, SKY);
  d.rect(0, 26, 32, 6, '#a8c47a');
  d.rect(3, 23, 26, 3, '#d6caae').rect(3, 23, 26, 1, '#e8dcc0');                                         // podyum
  [5, 10, 15, 20, 25].forEach((x, k) => { const top = k === 4 ? 14 : 8; d.rect(x, top, 3, 23 - top, '#efe6d2'); d.rect(x + 2, top, 1, 23 - top, '#d6caae'); d.rect(x - 1, top - 1, 5, 1, '#d6caae'); });
  d.rect(4, 6, 19, 2, '#e8dcc0').rect(4, 6, 19, 1, '#fbf6ea');                                          // arşitrav parçası
  [[26, 25], [28, 24], [1, 25]].forEach(([x, y]) => d.rect(x, y, 2, 1, '#c9b89a'));                       // devrik taşlar
  return d.done(); };

// Kütahya Çinisi: mavi-beyaz desenli çini tabak
A.cini = () => { const d = G(24, '#eef3f6');
  d.ell(12, 12, 10.5, 10.5, '#1f4a8a'); d.ell(12, 12, 9.5, 9.5, '#fbfaf4');
  for (let k = 0; k < 12; k++){ const a = k * 0.5236; d.px(12 + Math.cos(a) * 8, 12 + Math.sin(a) * 8, '#2e7dba'); d.px(12 + Math.cos(a) * 8.6, 12 + Math.sin(a) * 8.6, '#2e7dba'); }
  d.ell(12, 12, 4, 4, '#2e7dba'); d.ell(12, 12, 2.4, 2.4, '#fbfaf4'); d.ell(12, 12, 1, 1, '#c0392b');
  for (let k = 0; k < 24; k++){ const a = k * 0.2618; d.px(12 + Math.cos(a) * 9, 12 + Math.sin(a) * 9, k % 2 ? '#2e7dba' : '#5ab0d8'); }
  // dört yönde lale motifi
  [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(([u, v]) => { const x = 12 + u * 6, y = 12 + v * 6; d.ell(x, y, 1.5, 1.5, '#c0392b'); d.px(x + v, y - u, '#c0392b').px(x - v, y + u, '#c0392b'); d.px(x - u * 2, y - v * 2, '#3f8a5a').px(x - u * 1, y - v * 1, '#3f8a5a'); });
  [[8, 8], [16, 8], [8, 16], [16, 16]].forEach(([x, y]) => d.px(x, y, '#2e7dba'));
  return d.done(); };

// Dumlupınar: Başkomutanlık Meydan Muharebesi anıtı, bayrak
A.dumlupinar = () => { const d = G(32, '#c9e6f4');
  d.rect(0, 26, 32, 6, '#8fb85a');
  d.rect(9, 22, 14, 4, '#a8a294').rect(11, 19, 10, 3, '#b8b2a4');                                       // kaide
  d.poly([[13, 19], [19, 19], [17, 5], [15, 5]], '#cfc8ba'); d.poly([[16, 19], [19, 19], [17, 5], [16, 5]], '#b8b2a4');   // anıt
  d.rect(5, 6, 1, 20, '#7a7a7a').map(6, 6, ['RRRRRR', 'RWWRRR', 'RWRRWR', 'RWWRRR', 'RRRRRR'], { R:'#e30a17', W:'#ffffff' });
  [[24, 28], [27, 29], [3, 29]].forEach(([x, y]) => d.px(x, y, '#d9302a').px(x, y + 1, '#3f7a34'));
  return d.done(); };

// MANİSA — Spil Dağı ve Manisa lalesi
A.spil = () => { const d = G(32, SKY);
  d.poly([[0, 18], [8, 8], [14, 12], [20, 5], [27, 10], [32, 8], [32, 22], [0, 22]], '#6a8a6a');
  d.poly([[18, 7], [20, 5], [22, 7]], '#e8eef0');
  d.rect(0, 20, 32, 12, '#7ab04e');
  const lale = (x, y) => { d.rect(x, y, 1, 6, '#3f7a34'); d.ell(x + .5, y - 1, 2, 2.4, '#d9302a'); d.px(x, y - 3, '#d9302a').px(x - 1, y - 3, '#d9302a').px(x + 1, y - 3, '#d9302a'); d.px(x, y - 1, '#f2c14a'); d.px(x - 1, y + 3, '#4ea34a').px(x + 1, y + 2, '#4ea34a'); };
  lale(6, 24); lale(12, 26); lale(19, 24); lale(25, 26); lale(15, 21);
  return d.done(); };

// Mesir Macunu: kâğıda sarılı mesir, kavanoz, baharat
A.mesir = () => { const d = G(24, '#f6ead6');
  d.rect(4, 6, 9, 12, '#e8eef0').rect(4, 4, 9, 2, '#c0392b').rect(5, 8, 7, 9, '#7a3a1a').rect(5, 8, 7, 1, '#9a5a2a');   // kavanoz
  const sar = (x, y) => { d.rect(x, y, 4, 3, '#fbf8ee'); d.px(x - 1, y + 1, '#e8e0cc').px(x + 4, y + 1, '#e8e0cc'); d.px(x + 1, y + 1, '#c0392b').px(x + 2, y + 1, '#c0392b'); };
  sar(15, 9); sar(16, 14); sar(14, 19); sar(19, 18);
  [[3, 21], [6, 22], [9, 21]].forEach(([x, y]) => d.px(x, y, '#e0a526').px(x + 1, y, '#a85a1a'));          // baharat
  return d.done(); };

// Kula Jeoparkı: sönmüş volkan konisi, kara lav taşları
A.kula = () => { const d = G(32, '#f2d6a0');
  d.poly([[2, 28], [12, 10], [15, 8], [18, 8], [21, 10], [30, 28]], '#5a4a44'); d.poly([[13, 10], [15, 8], [18, 8], [20, 10], [16, 11]], '#3a2e2a');
  d.poly([[16, 11], [21, 10], [30, 28], [20, 28]], '#4a3c38');
  d.rect(0, 26, 32, 6, '#8a7a5a'); [[4, 27], [10, 29], [22, 28], [27, 30]].forEach(([x, y]) => d.rect(x, y, 3, 2, '#2a2220'));
  [[6, 24], [26, 24]].forEach(([x, y]) => { d.rect(x, y - 3, 1, 3, '#6b4a1e'); d.ell(x, y - 4, 2, 1.6, '#5a8a3a'); });
  return d.done(); };

// MUĞLA — Bodrum Kalesi: denize uzanan şövalye kalesi
A.bodrumkale = () => { const d = G(32, SKY);
  d.rect(0, 22, 32, 10, '#2e86c1'); for (let x = 0; x < 32; x += 6) d.rect(x, 22, 3, 1, '#5aa6d6');
  d.rect(4, 16, 24, 7, '#d9c49a').rect(4, 16, 24, 1, '#e8d6b0'); for (let x = 4; x < 28; x += 3) d.rect(x, 15, 2, 1, '#d9c49a');
  d.rect(8, 8, 5, 9, '#c9b48a').rect(19, 6, 5, 11, '#c9b48a'); [8, 10, 12].forEach(x => d.px(x, 7, '#c9b48a')); [19, 21, 23].forEach(x => d.px(x, 5, '#c9b48a'));
  [[10, 11], [21, 9], [21, 13], [15, 19]].forEach(([x, y]) => d.rect(x, y, 1, 2, '#5a4128'));
  d.rect(25, 18, 1, 6, '#6b4a1e').poly([[26, 18], [30, 20], [26, 22]], '#fbfaf4');                       // yelkenli gulet
  d.rect(23, 23, 7, 1, '#a8643a');
  return d.done(); };

// Ölüdeniz: kumsal dili, turkuaz lagün, yamaç paraşütü
A.oludeniz = () => { const d = G(32, SKY);
  d.poly([[0, 10], [10, 4], [20, 8], [32, 5], [32, 18], [0, 18]], '#3f7a45');
  d.rect(0, 16, 32, 16, '#1f8ab8'); d.ell(12, 22, 9, 4, '#5ad0d0'); d.ell(12, 22, 6, 2.4, '#8ae6e0');      // lagün
  d.poly([[2, 26], [12, 26], [26, 18], [28, 19], [14, 28], [2, 28]], '#f2e2b0');                          // kumsal dili
  d.ell(24, 6, 4, 1.4, '#e8384f', (x, y) => y <= 6); d.line(21, 6, 23, 10, '#4a4a4a').line(27, 6, 24, 10, '#4a4a4a'); d.rect(23, 10, 2, 2, '#2e5f9e');   // paraşüt
  return d.done(); };

// Muğla Çam Balı: çam dalı ve koyu bal kavanozu
A.cambali = () => { const d = G(24, '#eef3e2');
  d.ell(10, 15, 6, 6, '#e8eef0').ell(10, 16, 5, 4.8, '#8a4a14').ell(10, 14, 3.4, 1.6, '#b06a20').ell(8, 14, 0.8, 2, '#d08a3a');
  d.rect(5, 7, 10, 3, '#5a8a3a').rect(5, 7, 10, 1, '#7aa85a');
  d.line(14, 4, 22, 12, '#6b4a1e');
  for (let k = 0; k < 7; k++){ const x = 15 + k, y = 5 + k; d.px(x, y - 2, '#2f6a3a').px(x + 2, y, '#2f6a3a').px(x - 1, y - 1, '#3f7a45'); }
  d.ell(21, 16, 1.6, 2.4, '#a8703a'); d.px(21, 15, '#c08a50');                                            // çam kozalağı
  return d.done(); };

// UŞAK — Ulubey Kanyonu: derin vadi ve cam seyir terası
A.ulubey = () => { const d = G(32, SKY);
  d.poly([[0, 8], [32, 8], [32, 32], [0, 32]], '#c08a5a');
  d.poly([[8, 8], [24, 8], [20, 20], [18, 32], [13, 32], [12, 20]], '#8fbfe0');                           // vadi boşluğu
  d.poly([[8, 8], [12, 20], [13, 32], [10, 32], [9, 20], [6, 8]], '#9a6a3a').poly([[24, 8], [20, 20], [18, 32], [21, 32], [23, 20], [26, 8]], '#9a6a3a');
  d.rect(14, 28, 4, 4, '#4f9ac8');                                                                         // çay
  d.rect(0, 8, 32, 1, '#7ab04e');
  d.rect(4, 7, 9, 1, '#c9e6f4').rect(4, 6, 9, 1, '#8a8a8a'); for (let x = 4; x < 13; x += 2) d.px(x, 5, '#8a8a8a');   // cam teras
  [[22, 14], [9, 18]].forEach(([x, y]) => d.ell(x, y, 1.6, 1.2, '#4f8a3a'));
  return d.done(); };

// Uşak Halısı: madalyonlu, kırmızı zeminli halı
A.usakhali = () => { const d = G(24, '#efe3cf');
  d.rect(3, 2, 18, 20, '#b8281f');
  d.rect(3, 2, 18, 2, '#e8c87a').rect(3, 20, 18, 2, '#e8c87a').rect(3, 2, 2, 20, '#e8c87a').rect(19, 2, 2, 20, '#e8c87a');
  for (let y = 3; y < 21; y += 2){ d.px(4, y, '#1f3a5f'); d.px(19, y, '#1f3a5f'); }
  d.ell(12, 12, 5.5, 4, '#1f3a5f'); d.ell(12, 12, 3.5, 2.4, '#e8c87a'); d.ell(12, 12, 1.4, 1, '#b8281f');   // oval madalyon (Uşak tarzı)
  [[7, 6], [17, 6], [7, 17], [17, 17]].forEach(([x, y]) => d.ell(x, y, 1.6, 1.4, '#1f3a5f'));
  for (let x = 3; x < 21; x += 2){ d.px(x, 1, '#f6efe2'); d.px(x, 22, '#f6efe2'); }
  return d.done(); };

// Uşak Helvası: tepside dilimlenmiş helva
A.usakhelvasi = () => { const d = G(24, '#f4ead8');
  d.ell(12, 14, 10.5, 7, '#8a8e96').ell(12, 13.5, 9.5, 6, '#c9cfd6');
  d.ell(12, 13, 8, 4.6, '#d9a85a'); d.line(4, 13, 20, 13, '#b8843a'); d.line(12, 9, 12, 17, '#b8843a');
  [[8, 11], [15, 11], [9, 15], [16, 15]].forEach(([x, y]) => d.px(x, y, '#f2d090'));
  return d.done(); };
