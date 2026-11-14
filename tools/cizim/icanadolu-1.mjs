// İç Anadolu resimleri 1: Aksaray, Ankara, Çankırı, Eskişehir, Karaman
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', STEP = '#d9c48a';

// AKSARAY — Ihlara Vadisi: derin kanyon, dere, kayaya oyulmuş kilise kapıları
A.ihlara = () => { const d = G(32, SKY);
  d.poly([[0, 6], [10, 6], [12, 32], [0, 32]], '#b8865a').poly([[22, 6], [32, 6], [32, 32], [20, 32]], '#b8865a');
  d.poly([[10, 6], [12, 6], [14, 32], [12, 32]], '#9a6a42').poly([[20, 6], [22, 6], [20, 32], [18, 32]], '#9a6a42');
  d.poly([[12, 6], [20, 6], [18, 32], [14, 32]], '#6aa04a');                                              // vadi tabanı yeşil
  d.poly([[15, 32], [17, 32], [16.5, 12], [15.5, 12]], '#4f9ac8');                                        // Melendiz Çayı
  [[4, 12], [6, 20], [25, 14], [27, 22]].forEach(([x, y]) => { d.rect(x, y, 2, 3, '#4a3020'); d.px(x, y - 1, '#4a3020').px(x + 1, y - 1, '#4a3020'); });
  [[14, 16], [18, 22], [13, 26]].forEach(([x, y]) => d.ell(x, y, 1.5, 2, '#3f7a34'));
  return d.done(); };

// Sultanhanı Kervansarayı: taç kapı ve sur duvarları
A.sultanhani = () => { const d = G(32, SKY);
  d.rect(0, 27, 32, 5, STEP);
  d.rect(2, 12, 28, 15, '#d9b88a').rect(2, 12, 28, 1, '#ecd2a6'); [2, 29].forEach(x => d.rect(x, 10, 2, 17, '#c9a878'));
  d.rect(10, 6, 12, 21, '#e8cca0').rect(10, 6, 12, 1, '#f6e2bc');                                        // taç kapı
  d.ell(16, 13, 4, 4, '#a8865a', (x, y) => y < 14); d.rect(12, 13, 8, 14, '#a8865a');                     // kemer çerçeve
  d.ell(16, 15, 2.6, 2.6, '#4a3020', (x, y) => y < 16); d.rect(14, 15, 5, 12, '#4a3020');                  // kapı açıklığı
  for (let y = 8; y < 26; y += 3){ d.px(11, y, '#b8865a').px(20, y, '#b8865a'); }                          // taş süslemeler
  return d.done(); };

// Tuz Gölü: bembeyaz tuz kabuğu ve sığ pembe-mavi su
A.tuzgolu = () => { const d = G(32, '#c9e6f4');
  d.rect(0, 12, 32, 20, '#f8f6f0'); d.poly([[0, 12], [32, 12], [32, 14], [0, 15]], '#d9c48a');
  d.ell(16, 20, 12, 4, '#c8dde8'); d.ell(14, 20, 7, 2, '#e8c8d8');
  for (let k = 0; k < 9; k++) d.line(2 + k * 3, 26 + (k % 2), 4 + k * 3, 29 - (k % 2), '#e2ded2');          // tuz çatlakları
  [[24, 18], [8, 23], [20, 26]].forEach(([x, y]) => d.rect(x, y, 2, 1, '#ffffff'));
  d.ell(26, 5, 2.5, 2.5, '#f7d36b');
  return d.done(); };

// ANKARA — Anıtkabir: sütunlu anıt yapı ve geniş tören meydanı
A.anitkabir = () => { const d = G(32, '#c6e4f4');
  d.rect(0, 22, 32, 10, '#e2d6bc'); for (let x = 0; x < 32; x += 4) d.rect(x, 22, 2, 10, '#d6caae');      // meydan
  d.rect(2, 18, 28, 4, '#d9cdb2').rect(1, 21, 30, 1, '#c9bda2');                                        // basamaklar
  d.rect(4, 7, 24, 11, '#efe6d2').rect(3, 6, 26, 2, '#f6efe0');
  for (let x = 5; x < 28; x += 3) d.rect(x, 8, 1, 10, '#d6caae');                                      // sütunlar
  d.rect(14, 4, 4, 2, '#e9dcc0').rect(15, 0, 1, 4, '#7a7a7a').map(16, 0, ['RRRR', 'RWRR', 'RRRR'], { R:'#e30a17', W:'#ffffff' });
  return d.done(); };

// Beypazarı Kurusu: çubuk biçimli kuru pastalar, çay
A.beypazari = () => { const d = G(24, '#f4e8d4');
  d.ell(12, 15, 11, 6, '#fbf8f0').ell(12, 15, 9.5, 4.6, '#ece4d4');
  [[4, 13], [6, 15], [5, 17]].forEach(([x, y]) => { d.rect(x, y, 9, 2, '#d9a050'); d.rect(x, y, 9, 1, '#efc078'); for (let k = 1; k < 9; k += 2) d.px(x + k, y + 1, '#b8803a'); });
  d.poly([[16, 7], [21, 7], [20, 15], [17, 15]], '#e2e8ec').poly([[16.5, 9], [20.5, 9], [19.8, 14], [17.2, 14]], '#b8401a');   // çay
  d.rect(15, 15, 7, 1, '#c9a86a');
  return d.done(); };

// Ankara Keçisi: uzun, kıvırcık beyaz tiftikli keçi
A.ankarakecisi = () => { const d = G(32, '#bfe3f2');
  d.rect(0, 26, 32, 6, '#a8c47a');
  d.ell(15, 18, 9, 6, '#f8f6ee'); for (let x = 7; x < 24; x += 2) for (let y = 13; y < 24; y += 3) d.px(x + (y % 2), y, '#e2ded2');   // kıvırcık tiftik
  [9, 12, 18, 21].forEach(x => d.rect(x, 22, 2, 5, '#e8e4d8'));
  d.ell(24, 12, 3.4, 3, '#f8f6ee'); d.px(25, 11, '#2a1d14'); d.ell(27, 13.5, 1.2, 1, '#e8b8a8');
  d.line(23, 9, 21, 5, '#c9b89a').line(24, 9, 23, 4, '#c9b89a').line(21, 5, 19, 5, '#c9b89a');           // kıvrık boynuzlar
  d.rect(22, 15, 2, 3, '#f8f6ee'); d.line(7, 16, 4, 14, '#f8f6ee');
  return d.done(); };

// ÇANKIRI — Tuz Mağarası: tuz kayasına oyulmuş galeri, ışıklar
A.tuzmagarasi = () => { const d = G(32, '#4a3e36');
  d.ell(16, 20, 15, 14, '#b8a48a'); d.ell(16, 22, 11, 10, '#d9c8ae'); d.ell(16, 24, 7, 7, '#efe2cc');
  for (let k = 0; k < 6; k++) d.line(3 + k * 5, 10 + (k % 2) * 2, 5 + k * 5, 30, '#c9b498');                // tuz katmanları
  [[9, 14], [16, 11], [23, 14]].forEach(([x, y]) => { d.px(x, y, '#ffe9a8').px(x, y + 1, '#f2c14a'); });   // lambalar
  d.rect(0, 30, 32, 2, '#a8947a'); d.rect(13, 26, 6, 4, '#8a7a62');                                      // vagonet
  [14, 18].forEach(x => d.ell(x, 30, 1, 1, '#3a2e26'));
  return d.done(); };

// Çankırı Yumurta Tatlısı: şerbetli yumurta biçimli tatlılar
A.yumurtatatlisi = () => { const d = G(24, '#f6ecdc');
  d.ell(12, 14, 11, 7, '#c9cfd6').ell(12, 13.5, 10, 6, '#eef2f4');
  [[7, 12], [12, 11], [17, 12], [9, 16], [15, 16]].forEach(([x, y]) => { d.ell(x, y, 2.4, 1.8, '#d9902a'); d.ell(x - .5, y - .5, 1.2, 0.8, '#f2c070'); });
  return d.done(); };

// Ilgaz Dağı: karlı zirve, çam ormanı, kayakçı
A.ilgaz = () => { const d = G(32, SKY);
  d.poly([[0, 22], [10, 8], [16, 4], [22, 9], [32, 18], [32, 32], [0, 32]], '#f6f8fa');
  d.poly([[16, 4], [22, 9], [32, 18], [32, 22], [20, 14]], '#d9e4ee');
  for (let x = 1; x < 32; x += 3) d.poly([[x, 20 + (x % 4)], [x + 2, 28], [x - 2, 28]], '#2f6a3a');
  d.rect(0, 28, 32, 4, '#f6f8fa');
  d.line(18, 12, 23, 14, '#4a4a4a'); d.rect(20, 10, 1, 2, '#e8384f'); d.px(20, 9, '#e8b48a');             // kayakçı
  return d.done(); };

// ESKİŞEHİR — Odunpazarı Evleri: renkli cumbalı ahşap evler
A.odunpazari = () => { const d = G(32, SKY);
  d.rect(0, 27, 32, 5, '#a8a29a');
  const ev = (x, w, col, roof) => { d.rect(x, 13, w, 14, col).poly([[x - 1, 13], [x + w / 2, 9], [x + w + 1, 13]], roof);
    d.rect(x - 1, 17, w + 2, 5, col).rect(x - 1, 22, w + 2, 1, '#6b4a2e'); d.rect(x + 1, 14, 2, 2, '#4a6a8a').rect(x + w - 3, 14, 2, 2, '#4a6a8a').rect(x + 2, 18, w - 4, 3, '#4a6a8a'); d.rect(x + w / 2 - 1, 24, 2, 3, '#6b4a2e'); };
  ev(1, 9, '#e8a8b8', '#a8482a'); ev(11, 9, '#9fd0e8', '#b5532e'); ev(22, 9, '#f2d36b', '#a8482a');
  return d.done(); };

// Eskişehir Lületaşı: beyaz taştan oyma pipo/obje
A.luletasi = () => { const d = G(24, '#3a4a5a');
  d.ell(11, 13, 6, 6.5, '#fbf8ee'); d.ell(11, 11, 4, 3.6, '#ece4d4'); d.ell(11, 10, 3, 2.4, '#2a2420');   // oyma kâse
  d.ell(9, 15, 1.4, 1.6, '#e2d8c4').ell(13, 16, 1.4, 1.6, '#e2d8c4').px(11, 17, '#e2d8c4');              // oyma süs
  d.poly([[16, 15], [22, 12], [22, 14], [16, 17]], '#fbf8ee'); d.rect(21, 11, 2, 3, '#2a2a2a');
  return d.done(); };

// Eskişehir Çibörek: yarım ay biçimli kızarmış börek
A.ciborek = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 15, 11, 6, '#fbf8f0').ell(12, 15, 9.5, 4.8, '#ece4d4');
  d.ell(11, 15, 7.5, 5, '#e0a050', (x, y) => y <= 15); d.rect(4, 15, 15, 1, '#c08030');
  for (let x = 5; x < 18; x += 2) d.px(x, 15, '#f2c070');                                                  // kenar kıvrımı
  d.ell(9, 12, 2, 1, '#f2c070'); d.px(13, 11, '#c08030');
  d.ell(19, 13, 2, 1.4, '#ffffff');                                                                       // ayran
  return d.done(); };

// KARAMAN — Binbir Kilise: dağ eteğinde taş kilise kalıntıları
A.binbirkilise = () => { const d = G(32, SKY);
  d.poly([[0, 18], [8, 9], [16, 13], [24, 6], [32, 14], [32, 22], [0, 22]], '#8a9a6a');
  d.rect(0, 21, 32, 11, STEP);
  d.rect(6, 15, 10, 10, '#8a7a6a').ell(11, 15, 5, 4, '#8a7a6a', (x, y) => y < 15);                          // apsis
  d.ell(11, 19, 2, 2.5, '#4a3e36', (x, y) => y < 20).rect(9, 19, 4, 6, '#4a3e36');
  d.rect(20, 18, 7, 7, '#9a8a78'); d.rect(22, 20, 2, 5, '#4a3e36'); d.rect(20, 17, 3, 1, '#9a8a78');
  [[4, 26], [28, 27], [17, 28]].forEach(([x, y]) => d.rect(x, y, 2, 1, '#7a6a5a'));
  return d.done(); };

// Divle Obruğu Tulum Peyniri: obrukta olgunlaşan tulum peyniri
A.divlepeyniri = () => { const d = G(24, '#4a3e36');
  d.ell(12, 24, 14, 10, '#6a5a4a'); d.ell(12, 6, 3, 2, '#bfe3f2');                                      // obruk ağzından ışık
  d.poly([[7, 9], [17, 9], [19, 19], [5, 19]], '#d9c49a'); d.ell(12, 9, 5, 1.6, '#c9b48a');                 // deri tulum
  d.line(12, 9, 12, 5, '#8a6a4a'); for (let y = 11; y < 19; y += 3) d.line(6, y, 18, y, '#c0a878');
  d.ell(18, 21, 3, 2, '#fbf6e8'); d.px(17, 20, '#e8dcc0');                                                // peynir parçası
  return d.done(); };

// Karamanoğlu Mehmet Bey Fermanı: Türkçe fermanı (13 Mayıs 1277)
A.ferman = () => { const d = G(24, '#e9d8b8');
  d.rect(4, 3, 16, 17, '#f6ecd2'); d.ell(12, 3, 9, 1.4, '#c9a86a'); d.ell(12, 20, 9, 1.4, '#c9a86a');
  for (let y = 7; y < 18; y += 2) d.rect(6, y, 12, 1, '#4a3a2a');                                          // yazı satırları
  d.ell(12, 5, 2.5, 1.2, '#c0392b');                                                                      // tuğra yerine mühür
  d.ell(16, 18, 1.8, 1.8, '#c0392b'); d.px(16, 18, '#e8584a');
  return d.done(); };
