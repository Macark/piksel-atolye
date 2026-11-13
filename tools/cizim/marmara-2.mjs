// Marmara resimleri 2: Kırklareli, Kocaeli, Sakarya, Tekirdağ, Yalova
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2';

// KIRKLARELİ — Dupnisa Mağarası: sarkıt, dikit, yarasalar
A.dupnisa = () => { const d = G(32, '#3a2f2a');
  d.ell(16, 20, 15, 13, '#5a4a40').ell(16, 22, 11, 9, '#7a6656').ell(16, 24, 7, 6, '#9a8470');   // mağara derinliği
  for (let x = 1; x < 31; x += 3){ const h = 3 + (x * 7) % 6; d.poly([[x - 1, 0], [x + 2, 0], [x + 0.5, h]], '#8a7666'); }            // sarkıtlar
  [[5, 31, 7], [11, 31, 5], [22, 31, 6], [27, 31, 8]].forEach(([x, y, h]) => d.poly([[x - 2, y + 1], [x + 2, y + 1], [x, y - h]], '#a89480'));
  d.rect(0, 30, 32, 2, '#6a584a');
  d.ell(16, 28, 4, 1, '#5a8aa8');                                                       // su birikintisi
  // yarasa: gövde + iki yanda sivri kanatlar
  const bat = (x, y) => d.map(x - 4, y - 2, ['.k.....k.', 'kkk.k.kkk', 'kkkkkkkkk', '.k.kkk.k.', '....k....'], { k:'#151010' });
  bat(9, 11); bat(22, 8); bat(15, 16);
  return d.done(); };

// Kırklareli Hardaliyesi: mor içecek, üzüm salkımı, hardal tohumları
A.hardaliye = () => { const d = G(24, '#f4eadc');
  d.poly([[4, 6], [12, 6], [11, 20], [5, 20]], '#e2e8ec').poly([[5, 9], [11, 9], [10.4, 19], [5.6, 19]], '#5a1f4a');
  d.rect(6, 10, 1, 8, '#7a3366').rect(4, 6, 8, 1, '#f6fafc');
  // üzüm salkımı
  [[16, 8], [18, 8], [20, 8], [17, 10], [19, 10], [18, 12], [16, 10], [20, 10], [17, 14], [19, 12]].forEach(([x, y]) => { d.ell(x + .5, y + .5, 1.2, 1.2, '#5a2a6a'); d.px(x, y, '#8a5a9a'); });
  d.rect(18, 5, 1, 3, '#6b4a1e').poly([[19, 5], [23, 3], [22, 7]], '#5a8a3a');
  [[14, 19], [16, 20], [18, 19], [20, 20], [15, 21]].forEach(([x, y]) => d.px(x, y, '#e0b020'));           // hardal tohumu
  return d.done(); };

// Kırklareli Meşe Balı: bal kavanozu, akan bal, meşe yaprağı ve palamut
A.mesebali = () => { const d = G(24, '#f6eddc');
  // yuvarlak bal kavanozu, bez kapak, bal kaşığı
  d.ell(10, 14, 6.5, 6.5, '#e8eef0').ell(10, 15, 5.4, 5.2, '#c8781e').ell(10, 13, 4, 2, '#e09a3a').ell(8, 13, 1, 2.5, '#f0c070');
  d.rect(5, 6, 10, 3, '#c0392b').rect(5, 6, 10, 1, '#d9584a').rect(5, 9, 10, 1, '#8a5a2e');
  d.rect(11, 9, 1, 3, '#c8781e').px(11, 12, '#c8781e');                                // akan bal
  d.poly([[17, 13], [19, 10], [22, 12], [21, 15], [22, 18], [18, 19], [16, 16]], '#5a8a3a').line(16, 18, 21, 11, '#3f6a2a');
  d.ell(19, 21, 1.6, 1.8, '#9a6a34').rect(18, 19, 3, 1, '#6b4a22');
  return d.done(); };

// KOCAELİ — SEKA Kâğıt Müzesi: eski fabrika, baca, dev kâğıt rulosu
A.seka = () => { const d = G(32, SKY);
  d.rect(0, 26, 32, 6, '#8fbf6a');
  d.rect(4, 13, 18, 13, '#b8644a').rect(4, 13, 18, 1, '#cc7a5e');
  for (let x = 4; x < 22; x += 6) d.poly([[x, 13], [x + 3, 9], [x + 6, 13]], '#9a5040');                // testere çatı
  d.rect(24, 4, 3, 22, '#9a5040').rect(24, 4, 3, 1, '#b8644a');                                       // baca
  [[6, 16], [10, 16], [14, 16], [18, 16]].forEach(([x, y]) => d.rect(x, y, 2, 4, '#e8eef2'));
  d.ell(12, 27, 5.5, 4, '#fbfaf4').ell(17, 27, 2.3, 4, '#efece2').ell(17, 27, 1, 1.4, '#9a8a70');      // kâğıt rulosu
  [[22, 2], [20, 0]].forEach(([x, y]) => d.ell(x, y, 2, 1.4, '#e8eef2'));
  return d.done(); };

// İzmit Pişmaniyesi: kutuda lif lif pişmaniye
A.pismaniye = () => { const d = G(24, '#f3e7d6');
  d.poly([[2, 11], [22, 11], [20, 21], [4, 21]], '#c0392b').rect(4, 14, 16, 2, '#e0a526');            // kutu
  const fluff = (x, y) => { d.ell(x, y, 3.4, 2.8, '#fbf2dc'); d.ell(x - 1, y - 1, 1.6, 1, '#ffffff'); for (let k = -2; k <= 2; k += 2) d.px(x + k, y + 1, '#ead8b2'); };
  fluff(7, 10); fluff(13, 9); fluff(18, 10); fluff(10, 6); fluff(16, 5);
  return d.done(); };

// Kandıra Manda Yoğurdu: toprak kâsede kaymaklı yoğurt
A.mandayogurt = () => { const d = G(24, '#e8eef2');
  d.ell(12, 15, 9, 6, '#a8643a').rect(3, 11, 18, 4, '#a8643a').ell(12, 11, 9, 2.6, '#c98654');         // toprak kâse
  d.ell(12, 11, 7.8, 2, '#fbf7ec').ell(12, 10.6, 6, 1.2, '#f2e2b8');                                  // kaymak
  d.rect(3, 15, 18, 1, '#8a4e2a');
  d.rect(17, 2, 1, 8, '#b08a5a').ell(17.5, 9.5, 1.6, 1.2, '#b08a5a');                                 // tahta kaşık
  return d.done(); };

// SAKARYA — Sapanca Gölü: orman, dağlar, sandal
A.sapanca = () => { const d = G(32, SKY);
  d.poly([[0, 12], [7, 6], [14, 10], [22, 5], [32, 11], [32, 15], [0, 15]], '#5a8a6a');
  for (let x = 0; x < 32; x += 3) d.poly([[x + 1, 9 + (x % 4)], [x + 3, 15], [x - 1, 15]], '#2f6a3a');
  d.rect(0, 15, 32, 17, '#4f8fb8').rect(0, 15, 32, 1, '#7ab0d0');
  for (let x = 0; x < 32; x += 3) d.px(x + 1, 17, '#3a6a5a');                                        // ağaç yansıması
  d.poly([[10, 24], [20, 24], [18, 26], [12, 26]], '#a8643a').line(15, 18, 15, 24, '#6b4a1e').poly([[15, 18], [19, 23], [15, 23]], '#fbfaf4'); // sandal
  [[4, 29], [24, 28], [27, 30]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#8fc0de'));
  return d.done(); };

// Adapazarı Islama Köftesi: ıslatılmış ekmek üstünde köfte, biber
A.islama = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 14, 11, 7.5, '#fbf8f0').ell(12, 14, 9.5, 6, '#ece4d4');
  d.rect(4, 12, 15, 5, '#d9783a').rect(4, 12, 15, 1, '#e8985a');                                       // ıslama ekmek
  [[6, 11], [10, 10], [14, 11], [8, 13], [12, 12], [16, 12]].forEach(([x, y]) => { d.rect(x - 1, y - 1, 3, 2, '#6a2e16'); d.px(x - 1, y - 1, '#94482a'); });
  d.ell(19, 18, 2.6, 1.1, '#3f8a34'); d.ell(6, 18, 1.6, 1.4, '#d9382a');
  return d.done(); };

// Sakarya Kabak Tatlısı: şerbetli turuncu kabak dilimleri, ceviz, kaymak
A.kabaktatlisi = () => { const d = G(24, '#f4ecdc');
  d.ell(12, 14, 11, 7, '#fbf8f0').ell(12, 14, 9.5, 5.6, '#ece4d4');
  const dilim = (x, y) => { d.rect(x, y, 6, 4, '#e8741a').rect(x, y, 6, 1, '#f6a050').rect(x + 5, y + 1, 1, 3, '#c45a10').rect(x, y + 3, 5, 1, '#d0661a'); d.px(x + 1, y + 1, '#ffc890'); d.px(x + 2, y, '#7a4a22').px(x + 4, y, '#a8703a').px(x + 3, y + 1, '#7a4a22'); };
  dilim(5, 10); dilim(12, 11); dilim(7, 15);
  d.ell(17.5, 16.5, 2.4, 1.4, '#fffbf0').px(17, 16, '#f2e6c8');
  return d.done(); };

// TEKİRDAĞ — Rakoczi Müzesi: iki katlı ahşap ev, cumba, kırmızı kiremit
A.rakoczi = () => { const d = G(32, SKY);
  d.rect(0, 27, 32, 5, '#8fbf6a');
  d.poly([[3, 10], [16, 4], [29, 10]], '#b5532e');
  d.rect(5, 10, 22, 17, '#efe3c8').rect(5, 18, 22, 1, '#8a6a4a').rect(5, 10, 22, 1, '#8a6a4a');
  d.rect(10, 11, 12, 7, '#f6ecd6').rect(10, 18, 12, 1, '#8a6a4a');                                    // cumba
  [11, 14, 17, 20].forEach(x => d.rect(x, 12, 2, 4, '#4a6a8a'));
  [7, 22].forEach(x => d.rect(x, 20, 3, 4, '#4a6a8a'));
  d.rect(14, 21, 4, 6, '#6a4a2e');
  return d.done(); };

// Tekirdağ Köftesi: uzunca köfteler, piyaz, biber
A.tekirdagkofte = () => { const d = G(24, '#f4e7cf');
  d.ell(12, 13, 11, 8, '#fbf8f0').ell(12, 13, 9.5, 6.5, '#ece4d4');
  [[7, 10], [12, 9], [9, 13], [14, 12]].forEach(([x, y]) => { d.rect(x - 2, y, 5, 2, '#7a3a1a'); d.rect(x - 2, y, 5, 1, '#a8562a'); d.px(x + 2, y + 1, '#5a2a10'); });
  d.ell(17, 16, 2.4, 1.6, '#f8f0d8'); [[16, 16], [18, 15], [17, 17]].forEach(([x, y]) => d.px(x, y, '#3e8e3a'));   // piyaz
  d.ell(7, 17, 2.8, 1, '#3f8a34');
  return d.done(); };

// Hayrabolu Tatlısı: şerbetli dilimler, ceviz
A.hayrabolu = () => { const d = G(24, '#f6ecdc');
  d.rect(2, 7, 20, 13, '#c9cfd6').rect(3, 8, 18, 11, '#e9c070');                                      // tepsi
  for (let x = 3; x < 21; x += 6) d.rect(x + 5, 8, 1, 11, '#c48a3a'); d.rect(3, 13, 18, 1, '#c48a3a');
  [[5, 10], [11, 10], [17, 10], [5, 15], [11, 15], [17, 15]].forEach(([x, y]) => { d.px(x, y, '#8a5a2b').px(x + 1, y + 1, '#b07a42'); d.px(x + 2, y, '#f6dc96'); });
  return d.done(); };

// YALOVA — Yürüyen Köşk: beyaz köşk ve dev çınar
A.yuruyenkosk = () => { const d = G(32, SKY);
  d.rect(0, 26, 32, 6, '#8fbf6a');
  d.rect(4, 26, 26, 1, '#7a7a7a').rect(4, 28, 26, 1, '#7a7a7a');                                     // raylar
  for (let x = 5; x < 30; x += 3) d.rect(x, 26, 1, 3, '#8a6a4a');
  d.rect(4, 15, 14, 11, '#fbfaf4').poly([[3, 15], [11, 10], [19, 15]], '#b5532e');
  [6, 10, 14].forEach(x => d.rect(x, 17, 2, 3, '#4a6a8a')); d.rect(9, 21, 3, 5, '#6a4a2e');
  d.rect(24, 12, 3, 14, '#7a5a3a');                                                                    // çınar gövdesi
  d.ell(23, 9, 8, 7, '#3f8a45').ell(20, 7, 4, 3, '#5aa85a').ell(27, 11, 3, 2.5, '#2f6a3a');
  d.line(24, 14, 18, 12, '#7a5a3a');                                                                   // köşke uzanan dal
  return d.done(); };

// Yalova Kivisi: kesik kivi yarımları
A.kivi = () => { const d = G(24, '#f6efe2');
  const half = (x, y, r) => { d.ell(x, y, r, r, '#8a6a3a'); d.ell(x, y, r - 1, r - 1, '#7cbf3a'); d.ell(x, y, r * 0.4, r * 0.4, '#e9f2c8');
    for (let k = 0; k < 10; k++){ const a = k * 0.628; d.px(x + Math.cos(a) * r * 0.6, y + Math.sin(a) * r * 0.6, '#1a1a1a'); } };
  half(8, 9, 6); half(16, 15, 5.5);
  d.ell(18.5, 6, 3, 2.4, '#8a6a3a').px(17, 5, '#a8865a');                                              // bütün kivi
  return d.done(); };

// Yalova Termal: buharı tüten sıcak su havuzu
A.termal = () => { const d = G(24, '#e2ece8');
  d.ell(12, 16, 10.5, 5.5, '#a8a29a').ell(12, 15.5, 9, 4.2, '#5ab8c4').ell(12, 15, 6, 2.4, '#7fd0d6');
  [[7, 9], [12, 7], [17, 9]].forEach(([x, y]) => { d.px(x, y, '#ffffff').px(x + 1, y - 1, '#ffffff').px(x, y - 2, '#ffffff').px(x + 1, y - 3, '#ffffff').px(x, y - 4, '#f2f6f6'); });
  [[3, 20], [20, 19]].forEach(([x, y]) => d.ell(x, y, 1.6, 1.2, '#8a857e'));
  d.rect(0, 21, 24, 3, '#c9d6c4');
  return d.done(); };
