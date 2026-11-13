// Akdeniz resimleri 1: Adana, Antalya, Burdur, Hatay
import { G } from './grid.mjs';
export const A = {};

// ADANA — Taşköprü: Seyhan üzerinde taş kemerli köprü, arkada camii silueti
A.taskopru = () => { const d = G(32, '#a8d8f0');
  d.rect(0, 20, 32, 12, '#3f8fc0');                       // nehir
  // arkada cami silueti (kubbe + minareler)
  d.ell(16, 13, 4.5, 3.5, '#8fb2cc').rect(11, 13, 11, 5, '#8fb2cc');
  [6, 9, 23, 26].forEach(x => { d.rect(x, 7, 1, 11, '#8fb2cc'); d.px(x, 6, '#8fb2cc'); });
  d.rect(0, 17, 32, 3, '#9cc7a0');                         // karşı kıyı yeşil
  // köprü gövdesi
  d.rect(0, 14, 32, 3, '#c8a878').rect(0, 14, 32, 1, '#e0c597').rect(0, 17, 32, 6, '#b8935f');
  // kemerler (alttan su görünür)
  [3, 11, 19, 27].forEach(x => { d.ell(x + 1, 23, 3.2, 4.2, '#3f8fc0', (X, Y) => Y >= 18); d.ell(x + 1, 23, 3.2, 4.2, '#2f78a8', (X, Y) => Y >= 22); });
  d.rect(0, 22, 32, 1, '#2f78a8');
  // taş derzleri
  for (let x = 1; x < 32; x += 4) d.px(x, 15, '#a8865a'); for (let x = 3; x < 32; x += 4) d.px(x, 18, '#9a7a4e');
  // su parıltıları
  [[4, 27], [12, 29], [21, 26], [27, 29], [8, 30]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#7fc0e4'));
  return d.done(); };

// Adana Kebabı: lavaş üstünde uzun kebap, domates, biber, soğan
A.adanakebap = () => { const d = G(24, '#f6e7c8');
  d.ell(12, 14, 11, 7, '#e3bf83').ell(12, 13.5, 10, 6, '#edcf98');     // lavaş
  d.rect(1, 10, 22, 1, '#9aa1a8').px(0, 10, '#7d848b').px(23, 10, '#7d848b'); // yassı şiş
  d.ell(12, 11.5, 9.5, 2.3, '#8a4422'); for (let x = 4; x < 21; x += 3) d.px(x, 11, '#6a2f16').px(x + 1, 12, '#a85a30');
  d.ell(5, 17, 2.2, 2.2, '#d8392b').px(4, 16, '#f07a62');                 // közde domates
  d.ell(10, 18, 3.4, 1.4, '#4f9a3a').px(13, 18, '#2f6a24');               // biber
  d.ell(17, 17.5, 3, 1.8, '#b35a86').ell(17, 17.5, 1.6, 0.8, '#e8c4d8');   // sumaklı soğan
  return d.done(); };

// Adana Şalgamı: mor şalgam bardağı ve siyah havuç
A.salgam = () => { const d = G(24, '#fbe9d6');
  d.rect(0, 19, 24, 5, '#e8cfae');
  d.poly([[5, 5], [14, 5], [13, 21], [6, 21]], '#d9e8ee');                 // bardak
  d.poly([[6, 8], [13, 8], [12.4, 20], [6.6, 20]], '#7a1f3d');             // şalgam
  d.rect(7, 9, 1, 9, '#a3365c').rect(6, 8, 7, 1, '#9b2d50');
  d.rect(5, 5, 9, 1, '#f4fbfd');
  // siyah havuç
  d.poly([[15, 12], [19, 11], [22, 20], [21, 21]], '#3b1530'); d.line(16, 12, 20, 19, '#5a2348');
  d.rect(15, 9, 1, 3, '#4f9a3a').px(14, 8, '#4f9a3a').px(17, 8, '#4f9a3a').px(16, 9, '#6cb64f');
  return d.done(); };

// ANTALYA — Aspendos: yarım daire oturma sıraları ve sahne binası
A.aspendos = () => { const d = G(32, '#bfe3f2');
  // oturma sıraları: sahneden bakınca uçları yukarı kalkan yaylar
  const tones = ['#e0b47a', '#c9985e'];
  for (let y = 4; y < 24; y++) for (let x = 0; x < 32; x++){ const u = (x + .5 - 16) / 16, b = y + 7 * u * u; if (b >= 9){ const k = Math.floor((b - 9) / 2); d.px(x, y, tones[k % 2]); } }
  for (let x = 0; x < 32; x++){ const u = (x + .5 - 16) / 16; d.px(x, Math.round(9 - 7 * u * u), '#f0d3a0'); }
  // basamak arası merdivenler
  [8, 16, 24].forEach(x => { for (let y = 6; y < 24; y++) if (d.get(x, y) !== '#bfe3f2') d.px(x, y, '#a87a46'); });
  // sahne binası ve kemerli açıklıklar
  d.rect(0, 23, 32, 9, '#c4834a').rect(0, 23, 32, 1, '#dc9a5e');
  [2, 8, 14, 20, 26].forEach(x => { d.rect(x, 26, 4, 5, '#5a3218'); d.ell(x + 2, 26.5, 2, 1.5, '#5a3218'); });
  d.rect(0, 31, 32, 1, '#8a5a2e');
  d.ell(27, 3.5, 2.2, 2.2, '#f7d36b');
  return d.done(); };

// Antalya Piyazı: tahinli fasulye, yumurta, maydanoz, domates
A.piyaz = () => { const d = G(24, '#cfe6ea');
  d.ell(12, 13, 11, 9, '#f7f5ef').ell(12, 13, 9, 7, '#ece2cc');           // tabak + tahin
  const beans = [[7, 11], [10, 9], [13, 10], [16, 12], [9, 14], [12, 13], [15, 15], [11, 17], [7, 15], [17, 9]];
  beans.forEach(([x, y]) => d.rect(x, y, 2, 1, '#fffaf0').px(x, y + 1, '#e2d6b6'));
  d.ell(16.5, 16.5, 2.5, 2, '#ffffff').ell(16.5, 16.5, 1.2, 1, '#f5c02e'); // yumurta
  [[8, 9], [14, 8], [6, 13], [12, 16], [18, 13], [10, 12]].forEach(([x, y]) => d.px(x, y, '#3e8e3a'));
  [[11, 10], [8, 17], [15, 11]].forEach(([x, y]) => d.px(x, y, '#d8392b'));
  return d.done(); };

// Finike Portakalı: iki portakal ve yapraklar
A.finike = () => { const d = G(24, '#e6f3fb');
  d.ell(9, 14, 6.5, 6.5, '#f08a1c').ell(16, 16, 5.5, 5.5, '#f39a2a');
  d.ell(7.5, 12, 2, 1.6, '#ffc069').ell(14.5, 14.5, 1.6, 1.2, '#ffc069');
  d.ell(9, 14, 6.5, 6.5, '#d26f10', (x, y, dx, dy) => dx * 0.5 + dy * 0.86 > 0.72);
  d.ell(16, 16, 5.5, 5.5, '#d26f10', (x, y, dx, dy) => dx * 0.5 + dy * 0.86 > 0.72);
  d.poly([[9, 8], [13, 4], [15, 6], [11, 9]], '#3d8a3a').line(10, 8, 14, 5, '#2a6a2a');
  d.poly([[8, 8], [4, 5], [3, 7], [7, 9]], '#4ea34a');
  d.px(9, 8, '#6b4a1e');
  return d.done(); };

// BURDUR — Salda Gölü: turkuaz su, beyaz kumsal, çamlar
A.salda = () => { const d = G(32, '#bfe6f6');
  d.poly([[0, 11], [8, 7], [15, 10], [22, 6], [32, 10], [32, 14], [0, 14]], '#7d9fb0'); // dağlar
  d.rect(0, 13, 32, 3, '#3c7a46'); [2, 6, 10, 15, 20, 25, 29].forEach(x => d.poly([[x, 10], [x + 2, 14], [x - 2, 14]], '#2f6a3a'));
  d.rect(0, 16, 32, 10, '#3fc1c9').rect(0, 16, 32, 2, '#2aa6b5').rect(0, 22, 32, 4, '#6fd8d6');
  d.ell(16, 34, 24, 9, '#f6f4ee').ell(16, 35, 24, 9, '#ffffff', (x, y) => y > 28);  // beyaz kumsal
  [[5, 19], [13, 18], [22, 20], [27, 18]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#9be8e4'));
  return d.done(); };

// Burdur Şiş: şişte köfteler, közde biber ve domates
A.burdursis = () => { const d = G(24, '#f3e2c4');
  d.ell(12, 14, 11, 7.5, '#fbf7ef').ell(12, 14, 9.5, 6, '#efe6d6');
  d.line(2, 15, 22, 9, '#9aa1a8');
  [[5, 14], [9, 13], [13, 12], [17, 10.8]].forEach(([x, y]) => { d.ell(x, y, 2.2, 1.7, '#7d3a1d'); d.px(x - 1, y - 1, '#a5552d'); });
  d.ell(7, 18.5, 3.2, 1.3, '#3f8a34').px(10, 18, '#2a6024');
  d.ell(15, 18, 2, 1.8, '#d23a2a').px(14, 17, '#f07a62');
  d.px(18, 16, '#3f8a34').px(19, 16, '#3f8a34');
  return d.done(); };

// Burdur Ceviz Ezmesi: rulo dilimleri ve ceviz
A.cevizezmesi = () => { const d = G(24, '#f4ead6');
  d.rect(0, 18, 24, 6, '#dcc39a');
  // rulo
  d.rect(3, 9, 12, 6, '#c08a52').rect(3, 9, 12, 1, '#d6a36a').rect(3, 14, 12, 1, '#9c6a38');
  d.ell(15, 12, 1.6, 3, '#e0b47c');
  // dilimler
  [[6, 19], [12, 19.5]].forEach(([x, y]) => { d.ell(x, y, 2.6, 1.8, '#c99558'); d.ell(x, y, 1.6, 1, '#e2bb84'); d.px(x, y, '#7a4b22'); });
  // ceviz içleri: iki loblu, kıvrımlı
  [[19, 10], [19.5, 16.5]].forEach(([x, y]) => { d.ell(x - 1.4, y, 1.8, 2.6, '#8a5a2b'); d.ell(x + 1.4, y, 1.8, 2.6, '#8a5a2b'); d.px(x, y - 2, '#f4ead6'); d.px(x, y + 2, '#f4ead6'); d.px(x - 2, y - 1, '#b98448').px(x + 1, y, '#b98448').px(x - 1, y + 1, '#5e3a18').px(x + 2, y - 1, '#5e3a18'); });
  return d.done(); };

// HATAY — St. Pierre: kayaya oyulmuş taş cephe, üç kemerli kapı
A.stpierre = () => { const d = G(32, '#b9dcef');
  d.poly([[0, 4], [10, 2], [20, 3], [32, 1], [32, 32], [0, 32]], '#a08a6e'); // kaya yamacı
  [[3, 8], [26, 6], [28, 12], [4, 14]].forEach(([x, y]) => d.rect(x, y, 2, 1, '#8a755a'));
  d.rect(6, 10, 20, 20, '#d8c39c').rect(6, 10, 20, 1, '#ecdcb8');           // cephe
  d.poly([[6, 10], [16, 5], [26, 10]], '#cbb48a');                           // üçgen alınlık
  d.ell(16, 8.5, 1.5, 1.5, '#6a4a2e');                                      // yuvarlak pencere
  [8, 14, 20].forEach(x => { d.rect(x, 21, 4, 9, '#4a3220'); d.ell(x + 2, 21, 2, 2, '#4a3220'); });
  [9, 15, 21].forEach(x => d.rect(x, 13, 2, 3, '#4a3220').px(x, 13, '#d8c39c'));
  d.rect(0, 30, 32, 2, '#7d6a50');
  return d.done(); };

// Antakya Künefesi: bakır tavada altın künefe, fıstık
A.kunefe = () => { const d = G(24, '#f5e9da');
  d.ell(12, 12, 10.5, 10.5, '#b5652e').ell(12, 12, 9.5, 9.5, '#d27b3a');   // bakır tava
  d.ell(12, 12, 8.5, 8.5, '#e09a2c').ell(12, 12, 7, 7, '#f2b23f');          // künefe
  for (let k = 0; k < 14; k++){ const a = k * 0.9, r = 2 + (k % 4) * 1.4; d.px(12 + Math.cos(a) * r, 12 + Math.sin(a) * r, '#c9781e'); }
  [[10, 9], [14, 10], [11, 14], [15, 14], [8, 12], [13, 7], [16, 12]].forEach(([x, y]) => d.px(x, y, '#5aa83a'));
  d.ell(12, 12, 10.5, 10.5, '#8e4a20', (x, y, dx, dy) => dx * dx + dy * dy > 0.86);
  return d.done(); };

// Hatay Kağıt Kebabı: kâğıtta pişmiş kıyma, domates, biber
A.kagitkebap = () => { const d = G(24, '#e9d9c0');
  d.poly([[2, 5], [21, 3], [22, 20], [3, 21]], '#fbf3e2');                 // kâğıt
  d.poly([[2, 5], [21, 3], [22, 20], [3, 21]], '#c9a06a', () => false);
  d.line(2, 5, 21, 3, '#8a5a2e').line(21, 3, 22, 20, '#a87440').line(22, 20, 3, 21, '#8a5a2e').line(3, 21, 2, 5, '#a87440');
  d.ell(12, 12, 7, 5.5, '#8e4a26').ell(12, 12, 7, 5.5, '#a95b30', (x, y, dx, dy) => dx * -0.5 + dy * -0.8 > 0.4);
  [[9, 10], [14, 11], [11, 14]].forEach(([x, y]) => d.ell(x + .5, y + .5, 1.3, 1.3, '#d9382a'));
  [[13, 8], [16, 13], [8, 13]].forEach(([x, y]) => d.rect(x, y, 2, 1, '#3f8a34'));
  d.px(10, 12, '#f2d07a').px(15, 10, '#f2d07a');
  return d.done(); };
