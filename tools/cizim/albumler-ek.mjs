// Albümleri 6'dan 9 resme çıkaran 36 yeni resim. Anahtar = içerikteki kimlik.
import { G } from './grid.mjs';
export const A = {};

// ---------- BAYRAKLAR (şablon: gökyüzü, çim, koyu kenarlı bayrak kutusu x3..20, y5..16)
const flag = (fill) => { const d = G(24, '#cfe8f7'); d.rect(0, 21, 24, 3, '#9cc98a'); d.rect(2, 5, 1, 13, '#2a1d14').rect(21, 5, 1, 13, '#2a1d14').rect(2, 17, 20, 1, '#2a1d14'); fill(d); return d.done(); };
A.f_az = () => flag(d => { d.rect(3, 5, 18, 4, '#00b5e2').rect(3, 9, 18, 4, '#ef3340').rect(3, 13, 18, 4, '#509e2f');
  d.map(8, 9, ['.WWW....', 'WW...W..', 'WW..WWW.', '.WWW.W..'], { W:'#ffffff' }); });   // ay-yıldız
A.f_se = () => flag(d => { d.rect(3, 5, 18, 12, '#006aa7').rect(8, 5, 3, 12, '#fecc02').rect(3, 9, 18, 3, '#fecc02'); });
A.f_nl = () => flag(d => { d.rect(3, 5, 18, 4, '#ae1c28').rect(3, 9, 18, 4, '#ffffff').rect(3, 13, 18, 4, '#21468b'); });

// ---------- TARAFTAR (çim saha zemini)
const pitch = n => { const d = G(n, '#46a863'); for (let y = 0; y < n; y += 6) d.rect(0, y, n, 3, '#3e9a5a'); return d; };
A.t_duduk = () => { const d = pitch(24);
  d.ell(13, 13, 6, 5, '#c9cfd6').rect(4, 9, 9, 5, '#c9cfd6').rect(4, 9, 9, 1, '#eef2f4').ell(13, 13, 2.5, 2, '#5a5f66');
  d.ell(12, 11.5, 2, 1, '#eef2f4'); d.line(18, 12, 21, 4, '#e8384f').line(21, 4, 22, 3, '#e8384f');                 // ip
  return d.done(); };
A.t_krampon = () => { const d = pitch(24);
  d.poly([[3, 10], [10, 9], [14, 12], [21, 13], [21, 17], [3, 17]], '#1a1a1a').rect(3, 17, 18, 2, '#f2f2f2');
  d.line(5, 11, 9, 11, '#ffffff').line(11, 12, 15, 14, '#e8384f').line(12, 13, 16, 15, '#e8384f');
  [4, 8, 12, 16, 19].forEach(x => d.rect(x, 19, 1, 2, '#d9d9d9'));
  return d.done(); };
A.t_atki = () => { const d = pitch(24);
  // düz taraftar atkısı: sarı-lacivert bloklar, iki ucunda saçak
  d.rect(4, 9, 16, 6, '#f2c14a'); for (let x = 4; x < 20; x += 4) d.rect(x, 9, 2, 6, '#2e5f9e');
  d.rect(4, 9, 16, 1, '#fbe28a').rect(4, 14, 16, 1, '#c08a1a');
  for (let y = 9; y < 15; y += 2){ d.rect(1, y, 3, 1, '#f2c14a'); d.rect(20, y, 3, 1, '#2e5f9e'); }
  return d.done(); };

// ---------- HAYVANLAR
A.kopek = () => { const d = G(32, '#f7d9a6');
  d.rect(0, 26, 32, 6, '#e8c084');
  d.ell(16, 16, 10, 9, '#c08a52'); d.ell(7, 13, 3.5, 7, '#7a5a3a'); d.ell(25, 13, 3.5, 7, '#7a5a3a');               // baş ve kulaklar
  d.ell(16, 20, 5.5, 4.5, '#f2e6c8'); d.ell(16, 17.5, 2.2, 1.5, '#2a1d14');                                       // ağız ve burun
  d.ell(12, 13, 1.4, 1.6, '#2a1d14').ell(20, 13, 1.4, 1.6, '#2a1d14').px(12, 12, '#ffffff').px(20, 12, '#ffffff');
  d.rect(15, 21, 3, 3, '#e8678a'); d.line(16, 19, 16, 21, '#2a1d14');                                              // dil
  d.rect(10, 25, 12, 2, '#e8384f').px(16, 27, '#f2c14a');                                                          // tasma
  return d.done(); };
A.fil = () => { const d = G(32, '#bfe3f2');
  d.rect(0, 26, 32, 6, '#9ed36a');
  d.ell(18, 17, 10, 7, '#9aa4b0'); [12, 16, 21, 25].forEach(x => d.rect(x, 21, 3, 6, '#8a94a0'));
  d.ell(9, 13, 5.5, 5.5, '#9aa4b0'); d.ell(12, 13, 4, 5, '#b8c0ca');                                               // baş, kulak
  d.rect(4, 15, 3, 9, '#9aa4b0').rect(3, 23, 3, 2, '#9aa4b0');                                                     // hortum
  d.px(8, 11, '#2a1d14'); d.line(6, 17, 8, 18, '#fbfaf4');                                                         // göz, fildişi
  d.line(28, 15, 30, 19, '#7a848e');
  return d.done(); };
A.zurafa = () => { const d = G(32, '#f6c98a');
  d.rect(0, 28, 32, 4, '#c9a060');
  d.ell(19, 22, 7, 4, '#f2b84a'); [14, 17, 21, 24].forEach(x => d.rect(x, 24, 2, 5, '#f2b84a'));
  d.poly([[10, 6], [13, 6], [16, 21], [12, 21]], '#f2b84a');                                                       // boyun
  d.ell(10, 6, 4, 2.6, '#f2b84a'); d.rect(9, 1, 1, 3, '#8a5a2b').rect(12, 1, 1, 3, '#8a5a2b'); d.px(9, 1, '#5a3a1a').px(12, 1, '#5a3a1a');
  d.px(9, 5, '#2a1d14'); d.px(6, 7, '#8a5a2b');
  [[12, 9], [13, 13], [14, 17], [17, 21], [21, 21], [19, 24], [23, 23]].forEach(([x, y]) => d.rect(x, y, 2, 2, '#b8742a'));
  return d.done(); };

// ---------- LEZZETLER
A.pide = () => { const d = G(24, '#f7e3c6');
  d.poly([[1, 12], [5, 7], [19, 7], [23, 12], [19, 17], [5, 17]], '#d99a4a');                                     // kayık biçimi
  d.poly([[4, 12], [7, 9], [17, 9], [20, 12], [17, 15], [7, 15]], '#b84a2a');                                     // kıymalı iç
  [[8, 11], [11, 13], [14, 11], [16, 13], [10, 10]].forEach(([x, y]) => d.px(x, y, '#7a2a14'));
  [[9, 13], [13, 10], [15, 14]].forEach(([x, y]) => d.px(x, y, '#4ea34a'));
  d.line(5, 8, 18, 8, '#efc07a');
  return d.done(); };
A.kirmizielma = () => { const d = G(24, '#9fd8c8');
  d.ell(9, 14, 6, 6.5, '#d9302a').ell(15, 14, 6, 6.5, '#d9302a').ell(9, 12, 2, 2.5, '#f06a5a');
  d.ell(12, 14, 9, 7, '#b8241a', (x, y, dx, dy) => dx * 0.5 + dy * 0.86 > 0.65);
  d.rect(12, 5, 1, 4, '#6b4a1e'); d.poly([[13, 6], [18, 3], [17, 7]], '#4ea34a');
  return d.done(); };
A.menemen = () => { const d = G(24, '#f2e2c4');
  d.ell(12, 13, 10, 7.5, '#3a3a3a').rect(21, 12, 3, 2, '#3a3a3a');                                                // tava
  d.ell(12, 13, 8.5, 6, '#d9502a');
  [[8, 11], [14, 10], [11, 15], [16, 14]].forEach(([x, y]) => d.ell(x, y, 1.8, 1.4, '#f6d36b'));                   // yumurta
  [[10, 12], [15, 12], [7, 14], [13, 16], [17, 11]].forEach(([x, y]) => d.px(x, y, '#3f8a34'));
  [[12, 11], [9, 16]].forEach(([x, y]) => d.px(x, y, '#a8241a'));
  return d.done(); };

// ---------- UZAY (lacivert gece, yıldızlar)
const space = n => { const d = G(n, '#141a3e'); [[2, 3], [7, 20], [20, 2], [27, 26], [12, 28], [29, 9], [4, 14]].forEach(([x, y]) => { if (x < n && y < n) d.px(x, y, '#fbf3c8'); }); return d; };
A.uydu = () => { const d = space(32);
  d.rect(4, 13, 8, 6, '#2e6fa8').rect(20, 13, 8, 6, '#2e6fa8'); for (let x = 5; x < 12; x += 2) d.rect(x, 13, 1, 6, '#5a9ad0'); for (let x = 21; x < 28; x += 2) d.rect(x, 13, 1, 6, '#5a9ad0');
  d.rect(12, 15, 8, 2, '#a8a8a8'); d.rect(13, 11, 6, 10, '#d9c06a').rect(13, 11, 6, 1, '#f2e08a');
  d.line(16, 11, 16, 6, '#c9cfd6'); d.ell(16, 5, 2.5, 1.2, '#eef2f4');
  return d.done(); };
A.dunya = () => { const d = space(32);
  d.ell(16, 16, 11, 11, '#2e7dba');
  d.poly([[9, 9], [14, 7], [16, 11], [13, 15], [10, 14]], '#4ea34a').poly([[17, 15], [23, 13], [25, 18], [20, 23], [18, 20]], '#4ea34a').poly([[11, 20], [14, 21], [13, 24]], '#4ea34a');
  d.ell(16, 16, 11, 11, '#1f5f9a', (x, y, dx, dy) => dx * 0.6 + dy * 0.6 > 0.75);
  d.ell(12, 10, 2, 1, '#ffffff').ell(21, 22, 2.5, 1, '#ffffff');
  return d.done(); };
A.teleskop = () => { const d = space(32);
  d.poly([[8, 18], [24, 8], [26, 11], [10, 21]], '#c9cfd6').poly([[22, 9], [25, 7], [27, 11], [24, 12]], '#8a94a0');
  d.line(9, 19, 25, 9, '#eef2f4');
  d.line(15, 16, 11, 28, '#7a5a3a').line(15, 16, 19, 28, '#7a5a3a').line(15, 16, 15, 28, '#7a5a3a');           // ayak
  d.ell(26, 4, 2, 2, '#f2d36b');
  return d.done(); };

// ---------- DENİZ
A.denizati = () => { const d = G(32, '#2e8fb8');
  d.rect(0, 28, 32, 4, '#e6c98a'); [[4, 28], [26, 27]].forEach(([x, y]) => d.poly([[x, y], [x + 1, y - 8], [x + 3, y]], '#3e9a5a'));
  d.ell(16, 9, 4, 3.5, '#f2a33a'); d.rect(17, 8, 6, 2, '#f2a33a');                                                // baş, burun
  d.ell(15, 17, 4.5, 6, '#f2a33a'); d.poly([[13, 21], [17, 21], [16, 27], [12, 25]], '#f2a33a');
  d.ell(19, 27, 2.6, 2.6, '#f2a33a'); d.ell(19, 27, 1.2, 1.2, '#2e8fb8');                                           // kıvrık kuyruk
  d.px(16, 8, '#2a1d14'); d.poly([[11, 6], [13, 4], [13, 9]], '#f6c87a');
  for (let y = 13; y < 23; y += 2) d.px(12, y, '#d27b1a'); d.ell(19, 16, 1.5, 2.5, '#f6c87a');
  [[24, 6], [26, 3], [7, 12]].forEach(([x, y]) => d.px(x, y, '#cfeaf6'));
  return d.done(); };
A.yunus = () => { const d = G(32, '#bfe3f2');
  d.rect(0, 20, 32, 12, '#2e7dba'); for (let x = 0; x < 32; x += 6) d.rect(x, 20, 3, 1, '#5aa6d6');
  d.poly([[4, 18], [12, 9], [22, 7], [28, 11], [24, 14], [14, 15], [8, 19]], '#5a7a9a');
  d.poly([[10, 14], [20, 12], [24, 14], [14, 16]], '#c9d6e0');
  d.poly([[15, 8], [18, 3], [20, 7]], '#5a7a9a'); d.poly([[4, 18], [1, 15], [2, 21]], '#5a7a9a'); d.rect(27, 11, 3, 1, '#5a7a9a');
  d.px(23, 10, '#1a1a1a'); d.line(24, 12, 27, 12, '#3a5a7a');
  [[6, 24], [18, 27], [27, 23]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#8fc8f0'));
  return d.done(); };
A.denizanasi = () => { const d = G(32, '#1f4f7a');
  d.ell(16, 12, 9, 7, '#e89ad8', (x, y) => y <= 13); d.ell(16, 11, 6, 4, '#f6c4ec', (x, y) => y <= 12); d.rect(7, 13, 18, 1, '#c86ab8');
  [9, 12, 15, 18, 21, 24].forEach((x, k) => { for (let y = 14; y < 26 + (k % 2) * 3; y++) d.px(x + ((y >> 1) % 2), y, k % 2 ? '#e89ad8' : '#c86ab8'); });
  d.px(13, 9, '#ffffff').px(14, 8, '#ffffff');
  [[4, 6], [27, 4], [5, 26], [26, 28]].forEach(([x, y]) => d.px(x, y, '#5a9ad0'));
  return d.done(); };

// ---------- BAHÇE
A.ari = () => { const d = G(24, '#9ed36a');
  d.ell(7, 6, 3, 2.6, '#f6f2e6').ell(14, 6, 3, 2.6, '#f6f2e6');                                                    // kanatlar
  d.ell(12, 13, 7, 5, '#f2c14a'); [9, 13].forEach(x => d.rect(x, 8, 2, 10, '#2a1d14'));
  d.ell(12, 13, 7, 5, '#f2c14a', (x, y) => x < 9 && d.get(x, y) === '#2a1d14');
  d.ell(5, 13, 2.6, 2.6, '#2a1d14').px(4, 12, '#ffffff'); d.line(4, 10, 3, 7, '#2a1d14').line(6, 10, 7, 7, '#2a1d14');
  d.poly([[19, 12], [22, 13], [19, 14]], '#2a1d14');
  [[3, 20], [18, 20], [20, 3]].forEach(([x, y]) => { d.px(x, y, '#ffffff').px(x + 1, y, '#f2c14a'); });
  return d.done(); };
A.salyangoz = () => { const d = G(24, '#bfe3f2');
  d.rect(0, 18, 24, 6, '#7cc46a');
  d.poly([[2, 18], [4, 14], [20, 14], [22, 18]], '#d9b48a');                                                       // gövde
  d.rect(3, 9, 1, 5, '#d9b48a').rect(6, 9, 1, 5, '#d9b48a'); d.px(3, 8, '#2a1d14').px(6, 8, '#2a1d14');
  d.ell(14, 10, 6, 5.5, '#c0702a'); d.ell(14, 10, 4, 3.6, '#e0954a'); d.ell(14, 10, 2, 1.8, '#c0702a'); d.px(14, 10, '#8a4a1a');
  return d.done(); };
A.sulamakabi = () => { const d = G(24, '#f6e3c1');
  d.rect(0, 19, 24, 5, '#9ed36a');
  d.rect(6, 9, 10, 10, '#4ea3c8').rect(6, 9, 10, 1, '#7ac0e0'); d.ell(11, 9, 5, 1.2, '#2e7da8');
  d.line(16, 15, 21, 9, '#4ea3c8').line(16, 16, 21, 10, '#4ea3c8'); d.rect(20, 8, 3, 2, '#2e7da8');                  // emzik
  d.line(7, 9, 9, 5, '#2e7da8').line(9, 5, 13, 5, '#2e7da8').line(13, 5, 15, 9, '#2e7da8');                       // sap
  [[22, 12], [21, 14], [23, 15], [22, 17]].forEach(([x, y]) => d.px(x, y, '#7ac0e0'));
  d.rect(19, 17, 1, 2, '#3f8a34').px(18, 16, '#4ea34a').px(20, 16, '#4ea34a');                                    // filiz
  return d.done(); };

// ---------- MEVSİMLER
A.simsek = () => { const d = G(24, '#4a5a7a');
  d.ell(7, 6, 5, 3.5, '#a8b4c8').ell(14, 5, 6, 4, '#a8b4c8').ell(18, 7, 4, 3, '#a8b4c8').rect(3, 6, 18, 3, '#a8b4c8').rect(3, 8, 18, 1, '#8a96aa');
  d.poly([[12, 9], [16, 9], [13, 14], [16, 14], [9, 22], [11, 16], [8, 16]], '#f6d33a');
  [[4, 13], [6, 17], [19, 12], [20, 17], [17, 20]].forEach(([x, y]) => d.px(x, y, '#8fc8f0').px(x, y + 1, '#8fc8f0'));
  return d.done(); };
A.yagmurbotu = () => { const d = G(24, '#9fc8e0');
  d.rect(0, 20, 24, 4, '#7a8a9a'); d.ell(12, 21, 9, 1.5, '#5a9ad0');                                              // su birikintisi
  const bot = x => { d.rect(x, 6, 5, 11, '#f2c14a').rect(x, 15, 9, 4, '#f2c14a').rect(x, 18, 9, 1, '#c08a1a').rect(x, 6, 5, 1, '#fbe28a').rect(x + 1, 8, 1, 6, '#fbe28a'); };
  bot(3); bot(12);
  [[2, 2], [10, 3], [20, 1], [16, 4]].forEach(([x, y]) => d.px(x, y, '#ffffff').px(x, y + 1, '#ffffff'));
  return d.done(); };
A.kestanekebap = () => { const d = G(24, '#2b4c7e');
  d.rect(4, 15, 16, 6, '#5a5a5a').rect(3, 14, 18, 2, '#7a7a7a').rect(5, 21, 2, 3, '#4a4a4a').rect(17, 21, 2, 3, '#4a4a4a'); // mangal
  [[6, 17], [10, 18], [14, 17], [17, 18]].forEach(([x, y]) => d.px(x, y, '#f2803a'));
  [[6, 11], [10, 10], [14, 11], [18, 10], [8, 12], [16, 12]].forEach(([x, y]) => { d.ell(x, y, 2, 1.7, '#7a3a1a'); d.px(x, y - 1, '#e8c080'); });  // kestaneler
  [[7, 6], [12, 4], [16, 6]].forEach(([x, y]) => d.px(x, y, '#d9e0ea').px(x + 1, y - 1, '#d9e0ea').px(x, y - 2, '#d9e0ea'));
  [[2, 2], [21, 3], [19, 8]].forEach(([x, y]) => d.px(x, y, '#ffffff'));                                            // kar
  return d.done(); };

// ---------- OYUNCAKLAR
A.topac = () => { const d = G(24, '#f7d9de');
  d.poly([[4, 10], [20, 10], [12, 21]], '#e8384f'); d.rect(4, 10, 16, 2, '#f2c14a'); d.poly([[6, 13], [18, 13], [16, 15], [8, 15]], '#2e7dba');
  d.ell(12, 9, 8, 2, '#f06a80'); d.rect(11, 3, 2, 6, '#8a5a2b');
  d.line(1, 18, 4, 18, '#a89aa8').line(19, 20, 23, 20, '#a89aa8');                                                 // dönme çizgileri
  return d.done(); };
A.yoyo = () => { const d = G(24, '#bfe3f2');
  d.line(12, 0, 12, 7, '#7a7a7a');
  d.ell(12, 14, 7, 7, '#2e9e8a').ell(12, 14, 5, 5, '#5ac8b0').ell(12, 14, 1.5, 1.5, '#1f6a5a'); d.ell(10, 11, 1.5, 1.2, '#b8f0e0');
  return d.done(); };
A.yapiblok = () => { const d = G(24, '#f7e3c6');
  const blk = (x, y, w, c, c2) => { d.rect(x, y, w, 4, c).rect(x, y + 3, w, 1, c2); for (let k = 1; k < w; k += 3) d.rect(x + k, y - 1, 2, 1, c); };
  blk(3, 17, 9, '#e8384f', '#b8241a'); blk(12, 17, 9, '#2e7dba', '#1f5a8a'); blk(6, 12, 9, '#f2c14a', '#c08a1a'); blk(9, 7, 6, '#4ea34a', '#2f7a2a');
  return d.done(); };

// ---------- MÜZİK
A.gitar = () => { const d = G(32, '#f6e3c1');
  // dik duran klasik gitar: sekiz biçimli gövde, düz sap, burgulu baş
  d.ell(16, 24, 7.5, 6, '#c0702a'); d.ell(16, 16, 5.5, 4.5, '#c0702a'); d.rect(12, 18, 8, 3, '#c0702a');
  d.ell(16, 24, 7.5, 6, '#9a5420', (x, y, dx, dy) => dx > 0.5 && dy > -0.3);
  d.ell(16, 19, 2.4, 2.4, '#3a2416');                                                       // ses deliği
  d.rect(15, 2, 3, 13, '#6b4a2a').rect(14, 1, 5, 3, '#3a2416'); [14, 18].forEach(x => d.px(x, 2, '#e0a526'));
  for (let k = 0; k < 3; k++) d.rect(15 + k, 3, 1, 25, k === 1 ? '#fbf3e0' : '#e8dcc0');
  d.rect(13, 27, 7, 1, '#3a2416');                                                          // köprü
  return d.done(); };
A.keman = () => { const d = G(32, '#3a2e5a');
  d.ell(14, 21, 6, 5, '#a8521a').ell(14, 13, 5, 4.5, '#a8521a').rect(11, 16, 6, 2, '#8a3e10');
  d.rect(13, 3, 3, 8, '#3a2416').ell(14.5, 3, 1.5, 1.5, '#3a2416');
  d.line(11, 17, 12, 19, '#2a1d14').line(17, 17, 16, 19, '#2a1d14');                                               // f delikleri
  for (let k = 0; k < 2; k++) d.line(14 + k, 4, 14 + k, 24, '#e8e2d0');
  d.line(4, 28, 27, 6, '#c9a87a').line(4, 29, 27, 7, '#f2e6c8');                                                   // yay
  return d.done(); };
A.darbuka = () => { const d = G(24, '#fff0c8');
  d.ell(12, 6, 6, 1.8, '#f2ead8').ell(12, 6, 6, 1.8, '#c9a87a', (x, y, dx, dy) => dx * dx + dy * dy > 0.6);         // deri
  d.poly([[6, 7], [18, 7], [15, 13], [9, 13]], '#c0392b'); d.poly([[9, 13], [15, 13], [17, 21], [7, 21]], '#c0392b');
  d.rect(9, 12, 6, 2, '#e0a526'); for (let x = 8; x < 17; x += 3) d.px(x, 9, '#e0a526').px(x + 1, 17, '#e0a526');
  d.rect(7, 21, 10, 1, '#8a2418');
  return d.done(); };

// ---------- ULAŞIM
A.itfaiye = () => { const d = G(32, '#bfe3f2');
  d.rect(0, 26, 32, 6, '#7a7a7a').rect(0, 28, 32, 1, '#f2f2f2');
  d.rect(3, 14, 20, 10, '#d9302a').rect(23, 17, 6, 7, '#d9302a').rect(24, 18, 4, 3, '#cfe8f7');
  d.rect(3, 20, 26, 1, '#f2f2f2'); d.rect(5, 11, 16, 2, '#c9cfd6'); for (let x = 6; x < 21; x += 3) d.rect(x, 10, 1, 4, '#c9cfd6');   // merdiven
  d.rect(24, 15, 3, 2, '#2e7dba');                                                                                  // tepe lambası
  [8, 24].forEach(x => { d.ell(x, 25, 2.6, 2.6, '#2a2a2a'); d.px(x, 25, '#a8a8a8'); });
  return d.done(); };
A.motosiklet = () => { const d = G(32, '#bfe3f2');
  d.rect(0, 25, 32, 7, '#7a7a7a');
  [7, 25].forEach(x => { d.ell(x, 22, 4.5, 4.5, '#2a2a2a'); d.ell(x, 22, 2, 2, '#c9cfd6'); });
  d.poly([[8, 18], [14, 14], [22, 14], [25, 20], [12, 21]], '#2e7dba'); d.rect(11, 13, 7, 2, '#2a2a2a');            // gövde, sele
  d.line(22, 14, 25, 9, '#a8a8a8').rect(23, 9, 4, 1, '#2a2a2a'); d.ell(26, 13, 1.4, 1.4, '#f6d36b');
  d.rect(12, 17, 6, 3, '#8a8a8a');
  return d.done(); };
A.traktor = () => { const d = G(32, '#bfe3f2');
  d.rect(0, 24, 32, 8, '#c9a060'); for (let y = 26; y < 32; y += 2) d.rect(0, y, 32, 1, '#a8804a');
  d.rect(12, 14, 13, 7, '#d9302a').rect(5, 8, 9, 13, '#d9302a').rect(6, 9, 7, 6, '#cfe8f7');                       // gövde, kabin
  d.rect(4, 7, 11, 1, '#2a2a2a'); d.rect(20, 9, 2, 5, '#4a4a4a');                                                  // tavan, egzoz
  d.ell(9, 22, 6, 6, '#2a2a2a'); d.ell(9, 22, 2.6, 2.6, '#f2c14a'); d.ell(23, 23, 3.6, 3.6, '#2a2a2a'); d.ell(23, 23, 1.4, 1.4, '#f2c14a');
  return d.done(); };

// ---------- TATLILAR
A.sutlac = () => { const d = G(24, '#9fd8c8');
  d.poly([[4, 10], [20, 10], [18, 20], [6, 20]], '#a8643a').rect(4, 10, 16, 1, '#c98654');                         // toprak kap
  d.ell(12, 10, 8, 2.2, '#fbf3e0'); d.ell(10, 9.6, 3, 1, '#d9963a').ell(15, 10.2, 2, 0.8, '#c8781e');                // kızarık üst
  d.px(13, 9, '#8a4a1a').px(8, 10, '#8a4a1a');                                                                     // tarçın
  d.rect(6, 20, 12, 1, '#7a4a2a');
  return d.done(); };
A.lolipop = () => { const d = G(24, '#f7c6d9');
  d.rect(11, 14, 2, 9, '#fbfaf4');
  d.ell(12, 9, 7, 7, '#e8384f');
  for (let k = 0; k < 28; k++){ const a = k * 0.45, r = 1 + k * 0.22; d.px(12 + Math.cos(a) * r, 9 + Math.sin(a) * r, '#ffffff'); }
  d.ell(12, 9, 7, 7, '#c0233a', (x, y, dx, dy) => dx * dx + dy * dy > 0.82);
  return d.done(); };
A.cikolata = () => { const d = G(24, '#ffe89a');
  d.rect(4, 4, 14, 16, '#6b3a1e'); for (let x = 4; x < 18; x += 5) for (let y = 4; y < 20; y += 4){ d.rect(x, y, 4, 3, '#7e4626'); d.rect(x, y, 4, 1, '#9a5a32'); }
  d.poly([[4, 12], [18, 12], [18, 20], [4, 20]], '#c0392b'); d.rect(4, 12, 14, 1, '#e8584a').rect(8, 14, 6, 3, '#f2c14a');     // ambalaj
  d.poly([[18, 4], [21, 6], [18, 9]], '#f2f2f2');                                                                  // yaldız köşe
  return d.done(); };
