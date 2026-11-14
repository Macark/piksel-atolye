// İç Anadolu resimleri 2: Kayseri, Kırıkkale, Kırşehir, Konya
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', STEP = '#d9c48a';

// KAYSERİ — Erciyes Dağı: karlı sönmüş yanardağ, kayak pisti
A.erciyes = () => { const d = G(32, SKY);
  d.poly([[0, 26], [12, 8], [15, 5], [18, 6], [21, 9], [32, 24], [32, 26]], '#8a7a6a');
  d.poly([[10, 11], [12, 8], [15, 5], [18, 6], [21, 9], [24, 13], [20, 12], [17, 14], [14, 11], [11, 13]], '#f6f8fa');
  d.rect(0, 25, 32, 7, STEP); [[3, 27], [12, 29], [24, 28]].forEach(([x, y]) => d.rect(x, y, 3, 2, '#c9a878'));
  d.line(14, 14, 10, 24, '#f6f8fa');                                                                          // kayak pisti
  return d.done(); };

// Kayseri Mantısı: minicik mantılar, yoğurt, salçalı tereyağı
A.manti = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 13, 11, 8, '#fbf8f0').ell(12, 13, 9.5, 6.5, '#f2efe6');                                       // yoğurt
  for (let y = 9; y < 18; y += 2) for (let x = 5 + (y % 4 ? 1 : 0); x < 20; x += 2) if (((x - 12) ** 2) / 81 + ((y - 13) ** 2) / 36 < 1) d.px(x, y, '#e8c88a');
  d.ell(12, 13, 4, 2.4, '#d9502a'); d.ell(11, 12.5, 1.5, 0.8, '#f08a5a');                                   // salçalı yağ
  [[8, 10], [16, 15], [14, 9]].forEach(([x, y]) => d.px(x, y, '#3f8a34'));                                  // nane
  return d.done(); };

// Kayseri Pastırması: çemen kaplı pastırma dilimleri
A.pastirma = () => { const d = G(24, '#f4ead8');
  d.rect(2, 15, 20, 4, '#b9895a').rect(2, 15, 20, 1, '#d1a374');
  d.poly([[3, 8], [14, 6], [15, 13], [4, 14]], '#a8321e'); d.poly([[3, 8], [14, 6], [14, 7], [3, 9]], '#c0632a');   // kalıp, çemen kenarı
  [[6, 9], [10, 8], [8, 11], [12, 10]].forEach(([x, y]) => d.px(x, y, '#d9584a'));
  [[16, 9], [17, 11], [18, 13]].forEach(([x, y]) => { d.poly([[x, y], [x + 5, y - 1], [x + 5, y + 1], [x, y + 2]], '#c0402a'); d.px(x, y, '#c0632a'); });   // ince dilimler
  return d.done(); };

// KIRIKKALE — Kızılırmak: kızıl topraklı vadide kıvrılan ırmak
A.kizilirmak = () => { const d = G(32, SKY);
  d.rect(0, 10, 32, 22, '#e2c08a'); d.poly([[0, 10], [8, 7], [18, 9], [32, 6], [32, 12], [0, 12]], '#c8875a');
  let x = 4; for (let y = 10; y < 32; y++){ x += Math.sin(y * 0.45) * 1.4; d.rect(Math.round(x + y * 0.5) - 1, y, 6 + (y >> 3), 1, '#9a3a24'); d.rect(Math.round(x + y * 0.5), y, 4 + (y >> 3), 1, '#c0503a'); d.px(Math.round(x + y * 0.5) + 1, y, '#e07a5a'); }
  [[3, 26], [26, 18], [22, 28]].forEach(([a, b]) => d.ell(a, b, 1.6, 1.2, '#7a9a4a'));
  return d.done(); };

// Keskin Tava: güveçte et, biber, domates
A.keskintava = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 14, 10, 7, '#8a4a2a').ell(12, 13, 9, 5.6, '#a85a32');                                          // toprak tava
  d.ell(12, 13, 7.5, 4.4, '#7a3a1a'); [[9, 12], [13, 11], [15, 14], [10, 15]].forEach(([x, y]) => d.ell(x, y, 1.6, 1.2, '#5a2a10'));
  [[11, 12], [16, 12]].forEach(([x, y]) => d.ell(x, y, 1.4, 1.4, '#d9382a')); d.rect(7, 14, 3, 1, '#3f8a34').rect(14, 10, 3, 1, '#3f8a34');
  d.rect(1, 13, 2, 2, '#6a3a1a').rect(21, 13, 2, 2, '#6a3a1a');
  return d.done(); };

// Delice Beyazı Üzüm: beyaz (sarı-yeşil) üzüm salkımı
A.deliceuzum = () => { const d = G(24, '#eef3e2');
  d.rect(11, 2, 2, 4, '#6b4a1e'); d.poly([[13, 3], [20, 1], [21, 7], [15, 7]], '#5a9a3a').line(14, 4, 20, 3, '#3f7a2a');
  const g = [[8, 7], [11, 7], [14, 7], [17, 7], [9, 10], [12, 10], [15, 10], [10, 13], [13, 13], [16, 13], [11, 16], [14, 16], [12, 19]];
  g.forEach(([x, y]) => { d.ell(x + .5, y + .5, 1.6, 1.6, '#c9d86a'); d.px(x, y, '#eef4a8'); d.px(x + 1, y + 1, '#a8b84a'); });
  return d.done(); };

// KIRŞEHİR — Cacabey Medresesi: gökbilim eğitimi için yapılmış taç kapılı medrese
A.cacabey = () => { const d = G(32, '#1f2a5a');                                                        // gece göğü
  [[3, 3], [8, 6], [25, 4], [29, 9], [14, 2], [20, 7]].forEach(([x, y]) => d.px(x, y, '#fbf3c8'));
  d.rect(0, 27, 32, 5, '#8a7a5a');
  d.rect(4, 14, 24, 13, '#c9b48a').rect(4, 14, 24, 1, '#ddc8a0');
  d.rect(11, 9, 10, 18, '#d9c49a').ell(16, 17, 3, 3, '#5a4a32', (x, y) => y < 18).rect(13, 17, 6, 10, '#5a4a32');
  d.ell(16, 9, 5, 4, '#a8a29a', (x, y) => y < 9);                                                         // kubbe
  d.rect(24, 6, 2, 8, '#c9b48a').poly([[23.5, 6], [25, 3], [26.5, 6]], '#a8a29a');                        // minare
  return d.done(); };

// Ahi Evran: ahilik esnafının sembolü, deri işçiliği tezgâhı
A.ahievran = () => { const d = G(32, '#f2e2c0');
  d.rect(0, 22, 32, 10, '#a8703a').rect(0, 22, 32, 2, '#c08a50');                                         // tezgâh
  d.ell(12, 18, 8, 5, '#b8642e'); d.ell(12, 17, 6, 3.4, '#d0824a');                                       // tabaklanmış deri
  d.line(22, 10, 28, 20, '#8a8a8a'); d.rect(20, 8, 4, 3, '#6b4a2a');                                     // çekiç/bıçak
  d.rect(4, 3, 24, 4, '#6b4a2a').rect(5, 4, 22, 2, '#e0a526');                                          // "esnaf" tabelası
  [[8, 5], [12, 5], [16, 5], [20, 5], [24, 5]].forEach(([x, y]) => d.px(x, y, '#6b4a2a'));
  d.rect(4, 26, 6, 3, '#f2e2c0').rect(24, 25, 5, 4, '#8a5a2b');
  return d.done(); };

// Neşet Ertaş'ın Bağlaması: bozkırın tezenesi
A.neset = () => { const d = G(32, '#d9b878');
  d.poly([[0, 22], [32, 18], [32, 32], [0, 32]], '#c9a868');                                              // bozkır
  d.ell(12, 22, 6, 7, '#8a4a1e'); d.ell(12, 22, 4.6, 5.6, '#a85a28'); d.ell(12, 22, 1.4, 1.4, '#3a2416');    // tekne
  d.line(14, 16, 26, 3, '#6b3a1a').line(15, 17, 27, 4, '#6b3a1a');                                          // sap
  for (let k = 0; k < 6; k++) d.px(18 + k * 1.6, 12 - k * 1.6, '#e0c080');                                   // perdeler
  d.rect(26, 1, 3, 4, '#3a2416'); d.line(12, 24, 26, 4, '#f2e6c8');
  d.poly([[20, 26], [23, 23], [24, 24]], '#f2c14a');                                                       // tezene
  return d.done(); };

// KONYA — Mevlana Müzesi: yeşil kubbe (Kubbe-i Hadra)
A.mevlana = () => { const d = G(32, SKY);
  d.rect(0, 27, 32, 5, '#d9cdb2');
  d.rect(4, 18, 24, 9, '#e9dcc0').rect(4, 18, 24, 1, '#f6ecd6'); [7, 11, 15, 19, 23].forEach(x => d.rect(x, 21, 2, 3, '#6a8a9a'));
  d.ell(10, 18, 3.5, 3, '#8a9aa8', (x, y) => y < 18); d.ell(22, 18, 3.5, 3, '#8a9aa8', (x, y) => y < 18);
  d.rect(14, 8, 6, 10, '#2f9e7a'); for (let y = 9; y < 18; y += 2) d.rect(14, y, 6, 1, '#1f7a5a');           // dilimli yeşil gövde
  d.poly([[13.5, 8], [17, 1], [20.5, 8]], '#2f9e7a').line(17, 1, 17, 8, '#1f7a5a');                          // konik külah
  d.rect(17, 0, 1, 1, '#e0a526');
  return d.done(); };

// Konya Etli Ekmek: incecik upuzun hamur üstünde kıyma
A.etliekmek = () => { const d = G(24, '#f4e8d2');
  d.rect(0, 9, 24, 7, '#e0a858').rect(0, 9, 24, 1, '#f2c47a').rect(0, 15, 24, 1, '#c08038');
  for (let x = 1; x < 24; x += 2) { d.px(x, 11 + (x % 3), '#9a3a1e'); d.px(x + 1, 12 + (x % 2), '#b84a2a'); }
  [[4, 12], [11, 11], [18, 13]].forEach(([x, y]) => d.px(x, y, '#3f8a34'));
  for (let x = 2; x < 24; x += 6) d.rect(x, 9, 1, 7, '#c88a40');                                           // dilim çizgileri
  d.ell(18, 20, 3, 1.6, '#fbfaf4'); d.px(17, 20, '#d9d4c4');                                               // ayran
  return d.done(); };

// Çatalhöyük: çatıdan girilen bitişik kerpiç evler (9000 yıllık)
A.catalhoyuk = () => { const d = G(32, '#f2d6a0');
  d.rect(0, 24, 32, 8, '#c9a060');
  const ev = (x, y, w, h) => { d.rect(x, y, w, h, '#c08a5a').rect(x, y, w, 1, '#d8a878'); };
  ev(2, 14, 8, 10); ev(10, 12, 8, 12); ev(18, 15, 7, 9); ev(25, 13, 6, 11);
  [[5, 14], [13, 12], [27, 13]].forEach(([x, y]) => { d.rect(x, y, 2, 1, '#4a3020'); d.line(x + 1, y, x + 3, y - 5, '#8a6a3a'); d.line(x + 2, y, x + 4, y - 5, '#8a6a3a'); for (let k = 1; k < 5; k++) d.px(x + 1 + k * 0.5 + 0.5, y - k, '#8a6a3a'); });   // tavandaki giriş ve merdiven
  d.rect(12, 18, 4, 3, '#a85a32'); d.px(13, 19, '#f2e6c8');                                               // duvar resmi
  return d.done(); };
