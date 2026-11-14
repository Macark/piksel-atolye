// Karadeniz resimleri 1: Amasya, Artvin, Bartın, Bayburt, Bolu
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', SEA = '#2e7dba', GRN = '#4f9a4a', DGR = '#2f6a3a';
const ladin = (d, x, y, h, c = DGR) => { for (let k = 0; k < h; k++){ const w = Math.floor(k / 2) + 1; d.rect(x - w + 1, y + k, w * 2 - 1, 1, c); } d.px(x, y + h, '#5a3a1e'); };

// AMASYA — Kral Kaya Mezarları: kayalığa oyulmuş kemerli mezarlar
A.kralkaya = () => { const d = G(32, SKY);
  d.poly([[0, 4], [10, 2], [22, 5], [32, 3], [32, 26], [0, 26]], '#b8a07a');
  d.poly([[0, 4], [10, 2], [22, 5], [32, 3], [32, 6], [0, 7]], '#9a845e');
  [[4, 10], [14, 9], [24, 11]].forEach(([x, y]) => { d.rect(x - 1, y - 1, 8, 12, '#8a7454'); d.ell(x + 3, y + 1, 3, 2.5, '#5a4632', (a, b) => b < y + 2); d.rect(x, y + 1, 6, 9, '#5a4632'); d.rect(x + 1, y + 2, 4, 8, '#3a2e22'); });
  d.rect(0, 26, 32, 6, '#4f9ac8'); d.rect(0, 26, 32, 1, '#8fc8f0'); for (let x = 2; x < 32; x += 6) d.rect(x, 29, 3, 1, '#8fc8f0');   // Yeşilırmak
  return d.done(); };

// Yalıboyu Evleri: ırmak kıyısında cumbalı ahşap evler
A.yaliboyu = () => { const d = G(32, SKY);
  d.poly([[0, 12], [8, 4], [16, 8], [24, 3], [32, 9], [32, 14], [0, 14]], '#b8a07a');
  const ev = (x, w, c, r) => { d.rect(x, 10, w, 12, c); d.poly([[x - 1, 10], [x + w / 2, 6], [x + w + 1, 10]], r); d.rect(x - 1, 15, w + 2, 1, '#6b4a2a'); d.rect(x + 1, 12, 2, 2, '#4a6a8a').rect(x + w - 3, 12, 2, 2, '#4a6a8a'); d.rect(x + 1, 17, 2, 2, '#4a6a8a').rect(x + w - 3, 17, 2, 2, '#4a6a8a'); };
  ev(1, 9, '#f2e6c8', '#a8482a'); ev(11, 9, '#e8a878', '#8a3a22'); ev(22, 9, '#f6efe0', '#a8482a');
  d.rect(0, 22, 32, 2, '#8a7a62'); for (let x = 0; x < 32; x += 2) d.px(x, 22, '#6a5a44');
  d.rect(0, 24, 32, 8, '#4f9ac8'); [[3, 26], [14, 28], [24, 26]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.swap('#4f9ac8', '#6aaed6', (x, y) => y >= 24 && y < 27 && (x % 10 < 8)); // evlerin yansıması
  return d.done(); };

// Amasya Misket Elması: küçük, kırmızı yanaklı elmalar
A.amasyaelma = () => { const d = G(24, '#f3ead6');
  d.ell(12, 18, 10, 3.6, '#b9895a'); d.ell(12, 17, 9, 2.6, '#d1a374');                                         // sepet ağzı
  const elma = (x, y) => { d.ell(x, y, 3.2, 3, '#e8c84a'); d.ell(x + 0.6, y + 0.4, 2.6, 2.4, '#d9382a'); d.px(x - 1, y - 1, '#f6e8a0'); d.px(x, y - 3, '#6b4a1e'); };
  elma(7, 13); elma(13, 12); elma(18, 14); elma(10, 16); elma(16, 17);
  d.poly([[14, 8], [18, 6], [17, 9]], '#4f9a4a'); d.rect(2, 19, 20, 3, '#a8703a'); for (let x = 3; x < 22; x += 3) d.px(x, 20, '#8a5a2b');
  return d.done(); };

// ARTVİN — Karagöl: ladin ormanıyla çevrili göl
A.karagol = () => { const d = G(32, SKY);
  d.poly([[0, 14], [8, 6], [16, 11], [24, 5], [32, 12], [32, 18], [0, 18]], '#6a8a7a');
  d.rect(0, 16, 32, 16, '#3f7a45');
  d.ell(16, 24, 12, 5, '#2a5a6a'); d.ell(16, 24, 10, 3.6, '#3a7a8a'); [[11, 23], [19, 25]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#6aa8b8'));
  [[2, 13, 7], [6, 15, 6], [26, 13, 7], [30, 15, 6], [4, 26, 5], [28, 26, 5]].forEach(([x, y, h]) => ladin(d, x, y, h));
  return d.done(); };

// Yusufeli Barajı: Türkiye'nin en yüksek barajı, vadide kemer duvar
A.yusufeli = () => { const d = G(32, SKY);
  d.poly([[0, 6], [9, 10], [9, 32], [0, 32]], '#8a7a6a'); d.poly([[32, 5], [23, 10], [23, 32], [32, 32]], '#7a6a5a');
  d.rect(0, 6, 9, 2, '#4f8a4a'); d.rect(25, 5, 7, 2, '#4f8a4a');
  d.rect(9, 9, 14, 3, '#3a7ab0'); d.rect(9, 9, 14, 1, '#8fc8f0');                                           // baraj gölü (arkada)
  d.poly([[8, 12], [24, 12], [21, 30], [11, 30]], '#d9d6cc'); d.rect(8, 11, 16, 1, '#b8b4a8');             // kemer gövde
  for (let y = 15; y < 30; y += 4) d.rect(10 + (y - 12) / 6, y, 12 - (y - 12) / 3, 1, '#c4c0b4');
  d.rect(14, 26, 4, 4, '#ffffff'); d.rect(12, 30, 8, 2, '#8fc8f0');                                        // savak suyu
  return d.done(); };

// Kafkas Arısı: Macahel'in arısı ve kovanı
A.kafkasari = () => { const d = G(24, '#dff0d0');
  d.rect(0, 19, 24, 5, '#7ab04e');
  d.rect(3, 9, 9, 10, '#c08a50'); d.poly([[2, 9], [7.5, 5], [13, 9]], '#8a5a2b'); d.rect(3, 13, 9, 1, '#a8703a'); d.rect(6, 16, 3, 1, '#3a2416');   // kovan
  const ari = (x, y) => { d.ell(x, y, 2.6, 1.6, '#e0a526'); d.px(x - 1, y, '#2a2420').px(x + 1, y, '#2a2420'); d.px(x + 2, y, '#2a2420'); d.ell(x - 0.5, y - 1.8, 1.4, 1, '#eef6fb'); d.ell(x + 1, y - 1.8, 1.2, 0.9, '#eef6fb'); };
  ari(17, 6); ari(19, 12); ari(15, 15);
  [[20, 19], [16, 20]].forEach(([x, y]) => { d.ell(x, y, 1.4, 1.4, '#e86aa0'); d.px(x, y, '#f2c14a'); });
  return d.done(); };

// BARTIN — Amasra: yarımada üstünde kale surları, deniz
A.amasra = () => { const d = G(32, SKY);
  d.rect(0, 18, 32, 14, SEA); [[3, 22], [20, 27], [10, 29]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.poly([[4, 20], [8, 14], [20, 12], [27, 15], [29, 20]], '#5f8a4a');
  d.rect(9, 9, 14, 6, '#b8a48a'); for (let x = 9; x < 23; x += 2) d.px(x, 8, '#b8a48a'); d.rect(13, 6, 4, 4, '#a8947a'); d.px(13, 5, '#a8947a').px(15, 5, '#a8947a');   // sur ve kule
  d.rect(14, 11, 2, 4, '#4a3828');
  d.rect(0, 17, 6, 2, '#8a7a62'); d.ell(3, 19, 1.6, 1.4, SEA);                                            // Kemere köprüsü
  [[24, 17], [27, 18]].forEach(([x, y]) => { d.rect(x, y, 3, 1, '#f6efe0'); d.px(x + 1, y - 1, '#f6efe0'); });
  return d.done(); };

// Güzelcehisar Lav Sütunları: denizde altıgen bazalt sütunlar
A.guzelcehisar = () => { const d = G(32, SKY);
  d.rect(0, 20, 32, 12, SEA); [[2, 24], [22, 28], [12, 30]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  for (let i = 0; i < 9; i++){ const x = 6 + i * 2.2, h = 8 + ((i * 7) % 5) + (i > 2 && i < 6 ? 4 : 0); d.rect(Math.round(x), 22 - h, 2, h, i % 2 ? '#4a4a52' : '#5a5a64'); d.px(Math.round(x), 22 - h, '#7a7a84'); }
  d.poly([[4, 23], [28, 23], [27, 25], [5, 25]], '#3a3a42');
  d.ell(28, 6, 2.2, 2.2, '#f6d36b');
  return d.done(); };

// Bartın Ağda Tatlısı: şeker ağdası, cevizle
A.bartinagda = () => { const d = G(24, '#f4ead8');
  d.ell(12, 14, 11, 7, '#3a6aa8').ell(12, 14, 9.5, 5.8, '#6a9ad0');
  [[7, 11], [12, 10], [17, 11], [9, 15], [15, 15]].forEach(([x, y]) => { d.ell(x, y, 2.8, 2, '#d9cdb2'); d.ell(x, y, 2.3, 1.5, '#f6efe0'); d.ell(x, y, 1.6, 1, '#fbfaf4'); d.px(x + 1, y - 1, '#ffffff'); });
  [[10, 12], [14, 13], [12, 16]].forEach(([x, y]) => { d.rect(x, y, 2, 1, '#8a5a2b'); d.px(x, y + 1, '#6b4a1e'); });   // ceviz
  return d.done(); };

// BAYBURT — Bayburt Kalesi: tepe üstünde kale, Çoruh kıyısı
A.bayburtkale = () => { const d = G(32, SKY);
  d.poly([[0, 22], [6, 14], [26, 12], [32, 20], [32, 26], [0, 26]], '#a8946a');
  d.rect(5, 8, 22, 7, '#c4a878'); for (let x = 5; x < 27; x += 2) d.px(x, 7, '#c4a878');
  [[5, 4], [14, 3], [23, 5]].forEach(([x, y]) => { d.rect(x, y, 4, 11, '#b8986a'); for (let k = 0; k < 4; k += 2) d.px(x + k, y - 1, '#b8986a'); d.rect(x + 1, y + 3, 2, 2, '#5a4632'); });
  d.rect(0, 26, 32, 6, '#7ab04e'); d.poly([[0, 28], [32, 27], [32, 30], [0, 31]], '#4f9ac8');            // Çoruh
  return d.done(); };

// Baksı Müzesi: bozkırda tepe üstünde taş müze
A.baksi = () => { const d = G(32, SKY);
  d.poly([[0, 20], [10, 13], [22, 12], [32, 18], [32, 32], [0, 32]], '#c9b06a');
  d.poly([[0, 24], [12, 20], [32, 23], [32, 32], [0, 32]], '#b8984a');
  d.rect(9, 8, 14, 7, '#d9cdb2'); d.poly([[8, 8], [16, 4], [24, 8]], '#8a7a62'); d.rect(11, 10, 3, 5, '#4a3828').rect(18, 10, 3, 3, '#6a8a9a');
  d.rect(23, 11, 6, 4, '#c9bc9e'); d.rect(25, 12, 2, 2, '#6a8a9a');
  [[4, 26], [26, 28], [16, 29]].forEach(([x, y]) => d.ell(x, y, 1.6, 1, '#8a9a4a'));
  return d.done(); };

// Bayburt Lor Dolması: lor ve evelikle sarılmış dolmalar
A.lordolmasi = () => { const d = G(24, '#f4ead8');
  d.ell(12, 14, 11, 7, '#fbf8f0').ell(12, 14, 9.5, 5.8, '#ece4d4');
  [[7, 11], [12, 10], [17, 11], [9, 15], [15, 15]].forEach(([x, y]) => { d.ell(x, y, 3.4, 2, '#3f6a22'); d.ell(x, y - 0.3, 2.8, 1.3, '#5a8a32'); d.line(x - 2, y, x + 2, y, '#7aaa4a'); d.px(x - 3, y, '#f6efe0'); });
  d.ell(19, 17, 2, 1.2, '#fbfaf4'); d.px(18, 17, '#f2e6c8');                                              // kaymak
  return d.done(); };

// BOLU — Abant Gölü: ormanla çevrili göl, sonbahar renkleri
A.abant = () => { const d = G(32, SKY);
  d.rect(0, 12, 32, 20, '#4f8a4a');
  d.ell(16, 22, 13, 6, '#3a7ab0'); d.ell(16, 22, 11, 4.6, '#4f9ac8'); [[10, 21], [18, 23]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  [[2, 9, 6], [6, 11, 5], [27, 9, 6], [30, 12, 5], [12, 10, 4], [20, 9, 4]].forEach(([x, y, h], i) => ladin(d, x, y, h, i % 2 ? DGR : '#3f7a45'));
  [[24, 14], [8, 15]].forEach(([x, y]) => d.ell(x, y, 2.2, 2, '#e0761a'));
  d.rect(22, 28, 5, 2, '#f6efe0').rect(23, 27, 1, 1, '#f6efe0');                                        // fayton/kayık
  return d.done(); };

// Yedigöller: basamak basamak yedi küçük göl
A.yedigoller = () => { const d = G(32, '#dff0d0');
  d.rect(0, 0, 32, 32, '#5a9a4a');
  [[6, 5, 4], [16, 7, 4], [25, 6, 4], [9, 14, 5], [22, 15, 5], [7, 24, 4], [20, 25, 6]].forEach(([x, y, r]) => { d.ell(x, y, r, r * 0.6, '#3a7ab0'); d.ell(x - 0.5, y - 0.3, r * 0.7, r * 0.35, '#5aa8d8'); });
  [[13, 3], [29, 11], [3, 18], [15, 20], [28, 22], [12, 29]].forEach(([x, y], i) => ladin(d, x, y, 4, i % 2 ? DGR : '#d9822a'));
  return d.done(); };

// Mengen Aşçıları: aşçı şapkası, tencere, kepçe
A.mengen = () => { const d = G(24, '#f4ead8');
  d.rect(0, 18, 24, 6, '#a8703a').rect(0, 18, 24, 1, '#c08a50');
  d.ell(8, 6, 3, 2.4, '#ffffff'); d.ell(5, 7, 2.4, 2, '#ffffff'); d.ell(11, 7, 2.4, 2, '#ffffff'); d.rect(5, 8, 7, 3, '#f2f2ee'); d.rect(5, 10, 7, 1, '#d9d9d4');   // aşçı şapkası
  d.rect(12, 12, 9, 6, '#8a8e96'); d.rect(11, 12, 11, 1, '#a8aeb6'); d.rect(10, 14, 1, 2, '#5a5e66').rect(22, 14, 1, 2, '#5a5e66');   // tencere
  [[14, 10], [17, 9], [19, 10]].forEach(([x, y]) => d.px(x, y, '#e8eef2'));                               // buhar
  d.line(3, 13, 6, 17, '#8a5a2b'); d.ell(7, 17.5, 1.5, 1, '#c9cfd6');                                       // kepçe
  return d.done(); };
