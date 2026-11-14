// Karadeniz resimleri 2: Çorum, Düzce, Giresun, Gümüşhane, Karabük
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', SEA = '#2e7dba', DGR = '#2f6a3a';
const ladin = (d, x, y, h, c = DGR) => { for (let k = 0; k < h; k++){ const w = Math.floor(k / 2) + 1; d.rect(x - w + 1, y + k, w * 2 - 1, 1, c); } d.px(x, y + h, '#5a3a1e'); };

// ÇORUM — Hattuşa: Aslanlı Kapı
A.hattusa = () => { const d = G(32, SKY);
  d.rect(0, 26, 32, 6, '#c9b06a');
  d.rect(0, 10, 32, 16, '#b8a07a'); for (let y = 12; y < 26; y += 4) for (let x = (y % 8 ? 0 : 3); x < 32; x += 6) d.rect(x, y, 1, 4, '#9a845e');
  d.rect(0, 10, 32, 1, '#9a845e');
  d.rect(5, 6, 6, 20, '#a8906a').rect(21, 6, 6, 20, '#a8906a');                                              // kapı kuleleri
  d.ell(16, 13, 5, 5, SKY, (x, y) => y < 13); d.rect(11, 13, 10, 13, SKY);                                  // kemerli açıklık
  const aslan = (x, f) => { const s = f ? 1 : -1;
    d.ell(x, 13, 3.4, 3.4, '#d9c49a'); d.ell(x, 13, 2.6, 2.6, '#e8d8b0');                                     // yele ve baş
    d.px(x + s, 12, '#3a2e22'); d.rect(x + (f ? 1 : -2), 14, 2, 1, '#6a5a44');                               // göz, ağız
    d.rect(x - 2, 16, 4, 8, '#d9c49a'); d.rect(x - 2, 23, 4, 1, '#8a7454'); d.px(x + s, 18, '#b8a07a'); };
  aslan(9, true); aslan(23, false);
  return d.done(); };

// Çorum Leblebisi: kâsede sarı ve beyaz leblebi
A.leblebi = () => { const d = G(24, '#f4ead8');
  d.ell(12, 15, 10, 6, '#8a4a2a'); d.ell(12, 13, 9, 3, '#a85a32');
  for (let y = 10; y < 15; y++) for (let x = 4; x < 21; x += 2) if (((x - 12) ** 2) / 72 + ((y - 13) ** 2) / 9 < 1.2) { const c = (x + y) % 4 ? '#e8c06a' : '#f6efe0'; d.ell(x + (y % 2) * 0.8, y, 1.1, 1, c); d.px(x + (y % 2) * 0.8 + 0.4, y - 0.4, '#fbf3c8'); }
  [[19, 20], [5, 20]].forEach(([x, y]) => d.ell(x, y, 1.1, 1, '#e8c06a'));
  return d.done(); };

// Hitit Güneş Kursu: Alacahöyük'te bulunan bronz kurs
A.guneskursu = () => { const d = G(32, '#2a3a4a');
  d.rect(0, 28, 32, 4, '#4a3a2a');
  d.ell(16, 21, 12, 13, '#b8803a', (x, y) => y < 21); d.ell(16, 21, 9.5, 10.5, '#2a3a4a', (x, y) => y < 21);   // kalın yay
  for (let k = -8; k <= 8; k += 4) { d.line(16 + k - 4, 20, 16 + k + 4, 12, '#c08a4a'); d.line(16 + k + 4, 20, 16 + k - 4, 12, '#c08a4a'); }   // kafes
  d.ell(16, 21, 12, 13, '#2a3a4a', (x, y) => y < 21 && ((x + .5 - 16) / 12) ** 2 + ((y + .5 - 21) / 13) ** 2 > 1);
  d.ell(16, 21, 12, 13, '#b8803a', (x, y) => y < 21 && ((x + .5 - 16) / 9.5) ** 2 + ((y + .5 - 21) / 10.5) ** 2 > 1);
  [[16, 8], [10, 10], [22, 10], [6, 14], [26, 14]].forEach(([x, y]) => { d.ell(x, y - 1, 1.4, 1.4, '#e0a858'); });   // yay üstündeki toplar
  d.rect(4, 21, 24, 2, '#8a5a2b'); d.rect(14, 23, 4, 5, '#8a5a2b'); d.rect(11, 27, 10, 1, '#6a4a22');
  return d.done(); };

// DÜZCE — Güzeldere Şelalesi: ormanda kademeli şelale
A.guzeldere = () => { const d = G(32, '#3f7a45');
  d.poly([[8, 0], [24, 0], [22, 26], [10, 26]], '#6a6a5a');
  d.rect(13, 0, 6, 26, '#8fc8f0'); for (let y = 0; y < 26; y += 3) d.rect(14 + (y % 2), y, 2, 2, '#ffffff'); d.rect(12, 11, 8, 1, '#6a6a5a');
  d.ell(16, 28, 12, 4, '#4f9ac8'); d.ell(16, 27, 6, 1.6, '#ffffff');
  [[3, 3, 7], [27, 2, 8], [4, 15, 6], [28, 16, 6]].forEach(([x, y, h], i) => ladin(d, x, y, h, i % 2 ? DGR : '#26583a'));
  return d.done(); };

// Konuralp Antik Tiyatrosu: yamaçtaki taş basamaklar
A.konuralp = () => { const d = G(32, SKY);
  d.rect(0, 10, 32, 22, '#5f8a4a');
  for (let k = 0; k < 6; k++){ d.ell(16, 28, 15 - k * 1.8, 16 - k * 2, k % 2 ? '#c9b48a' : '#b8a07a', (x, y) => y < 28); }
  d.ell(16, 28, 5, 4, '#d9c8a0', (x, y) => y < 28);
  d.rect(0, 28, 32, 4, '#a8946a'); [[4, 27], [10, 26]].forEach(([x, y]) => d.rect(x, y, 2, 3, '#e8dcc0'));
  [[3, 6, 5], [29, 5, 6]].forEach(([x, y, h]) => ladin(d, x, y, h));
  return d.done(); };

// Akçakoca Ceneviz Kalesi: deniz kıyısındaki kale kalıntısı
A.akcakoca = () => { const d = G(32, SKY);
  d.rect(0, 20, 32, 12, SEA); [[3, 24], [18, 28], [24, 23]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.poly([[0, 20], [0, 12], [10, 9], [20, 13], [22, 20]], '#5f8a4a'); d.poly([[0, 20], [22, 20], [20, 22], [0, 22]], '#8a7a62');
  d.rect(5, 6, 4, 8, '#a8947a'); d.px(5, 5, '#a8947a').px(7, 5, '#a8947a'); d.rect(9, 8, 8, 5, '#b8a48a'); d.rect(11, 6, 2, 2, '#b8a48a').rect(15, 7, 2, 1, '#b8a48a');
  d.rect(6, 9, 2, 2, '#4a3828'); d.rect(12, 10, 2, 3, '#4a3828');
  d.ell(27, 7, 2.2, 2.2, '#f6d36b');
  return d.done(); };

// GİRESUN — Giresun Adası: kıyı açığında ağaçlı ada
A.giresunadasi = () => { const d = G(32, SKY);
  d.rect(0, 16, 32, 16, SEA); [[2, 20], [24, 26], [8, 29], [26, 19]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  d.ell(16, 18, 9, 3, '#8a7a62'); d.ell(16, 15, 8, 5, '#3f7a45', (x, y) => y < 18); [[12, 12], [16, 11], [20, 12]].forEach(([x, y]) => d.ell(x, y, 2.4, 2.2, '#4f9a4a'));
  d.rect(3, 23, 5, 1, '#8a5a2b'); d.poly([[3, 22], [8, 22], [7, 24], [4, 24]], '#c0392b'); d.rect(5, 19, 1, 3, '#6b4a2a');   // kayık
  d.poly([[0, 10], [5, 9], [5, 16], [0, 16]], '#6a8a6a');
  return d.done(); };

// Giresun Tombul Fındığı: dalında yeşil kabuklu fındıklar
A.tombulfindik = () => { const d = G(24, '#eef3e2');
  d.line(0, 4, 23, 2, '#6b4a1e'); d.poly([[4, 3], [10, 0], [12, 4]], '#4f9a4a').poly([[15, 3], [22, 0], [21, 5]], '#4f9a4a');
  const f = (x, y) => { d.poly([[x - 3, y - 3], [x + 3, y - 3], [x + 2, y], [x - 2, y]], '#7ab04e'); d.ell(x, y + 2, 2.8, 3, '#a8642e'); d.ell(x - 0.8, y + 1.4, 1, 1.2, '#c8844a'); d.rect(x - 2, y, 4, 1, '#d9b06a'); };
  f(7, 9); f(13, 11); f(18, 8);
  [[5, 20], [11, 19], [17, 20]].forEach(([x, y]) => { d.ell(x, y, 2.2, 2.2, '#a8642e'); d.px(x - 1, y - 1, '#c8844a'); d.rect(x - 1, y + 1, 3, 1, '#d9b06a'); });
  return d.done(); };

// Kümbet Yaylası: yeşil yaylada ahşap evler, sis
A.kumbet = () => { const d = G(32, SKY);
  d.poly([[0, 14], [10, 8], [20, 12], [32, 7], [32, 32], [0, 32]], '#6aa84a');
  d.poly([[0, 20], [14, 16], [32, 19], [32, 32], [0, 32]], '#7ab84e');
  const ev = (x, y) => { d.rect(x, y, 6, 4, '#8a5a2b'); d.poly([[x - 1, y], [x + 3, y - 3], [x + 7, y]], '#5a5e66'); d.rect(x + 1, y + 1, 1, 1, '#f2c14a'); d.rect(x + 4, y + 2, 1, 2, '#4a3020'); };
  ev(5, 19); ev(18, 22); ev(25, 16);
  d.rect(2, 11, 12, 1, '#eef4f6').rect(18, 9, 10, 1, '#eef4f6');
  [[12, 27], [4, 28]].forEach(([x, y]) => { d.rect(x, y, 3, 2, '#f6efe0'); d.px(x + 3, y, '#f6efe0'); });   // koyunlar
  return d.done(); };

// GÜMÜŞHANE — Karaca Mağarası: damlataşları
A.karaca = () => { const d = G(32, '#3a2e2a');
  for (let x = 0; x < 32; x += 3){ const h = 4 + (x * 7) % 9; d.poly([[x, 0], [x + 3, 0], [x + 1.5, h]], x % 2 ? '#d9b88a' : '#e8c89a'); }
  for (let x = 1; x < 32; x += 4){ const h = 3 + (x * 5) % 7; d.poly([[x, 32], [x + 3, 32], [x + 1.5, 32 - h]], x % 2 ? '#c9a878' : '#e0bc8a'); }
  d.ell(16, 18, 6, 3, '#5a8aa8'); d.ell(15, 18, 3, 1, '#8fc8f0');
  [[8, 12], [24, 14]].forEach(([x, y]) => { d.px(x, y, '#f6d36b'); d.px(x, y + 1, '#f2c14a'); });
  return d.done(); };

// Gümüşhane Pestili ve Kömesi: dut pestili ruloları ve köme
A.pestil = () => { const d = G(24, '#f4ead8');
  d.rect(0, 18, 24, 6, '#a8703a').rect(0, 18, 24, 1, '#c08a50');
  d.rect(2, 8, 11, 7, '#8a4a2a'); d.rect(2, 8, 11, 1, '#a85a32'); for (let x = 3; x < 13; x += 3) d.px(x, 11, '#6a3418');   // pestil tabakası
  d.ell(5, 16, 2.6, 2.6, '#7a3a1e'); d.ell(5, 16, 1.4, 1.4, '#a8642e'); d.ell(10, 16, 2.6, 2.6, '#7a3a1e'); d.ell(10, 16, 1.4, 1.4, '#a8642e');   // rulo
  d.rect(15, 4, 3, 14, '#9a5a2a'); for (let y = 5; y < 18; y += 2) d.ell(16.5, y, 2, 1, '#b8742e'); d.rect(16, 2, 1, 2, '#6b4a2a');   // köme (sucuk biçimli)
  d.rect(20, 7, 2, 11, '#9a5a2a'); for (let y = 8; y < 18; y += 2) d.ell(21, y, 1.6, 1, '#b8742e');
  return d.done(); };

// Tomara Şelalesi: kayalıktan dökülen şelale
A.tomara = () => { const d = G(32, SKY);
  d.poly([[0, 4], [32, 6], [32, 32], [0, 32]], '#6a7a5a');
  d.poly([[10, 6], [22, 6], [24, 24], [8, 24]], '#5a5a50');
  d.rect(13, 6, 6, 18, '#d8eef8'); d.rect(14, 6, 2, 18, '#ffffff'); d.rect(17, 8, 1, 14, '#ffffff');
  d.ell(16, 26, 11, 4, '#4f9ac8'); d.ell(16, 25, 7, 1.6, '#eef8fc');
  [[3, 6, 7], [28, 7, 7], [5, 18, 5], [27, 18, 5]].forEach(([x, y, h]) => ladin(d, x, y, h, '#3f7a45'));
  return d.done(); };

// KARABÜK — Safranbolu Evleri: beyaz badanalı, ahşap cumbalı konaklar
A.safranbolu = () => { const d = G(32, SKY);
  d.poly([[0, 12], [32, 8], [32, 32], [0, 32]], '#7ab04e');
  const ev = (x, y, w) => { d.rect(x, y, w, 10, '#f6efe0'); d.rect(x - 1, y + 4, w + 2, 1, '#6b4a2a'); d.rect(x, y + 4, 1, 6, '#8a5a2b').rect(x + w - 1, y + 4, 1, 6, '#8a5a2b');
    d.poly([[x - 2, y], [x + w / 2, y - 4], [x + w + 2, y]], '#a8482a'); for (let i = x + 1; i < x + w - 1; i += 3) { d.rect(i, y + 1, 2, 2, '#4a6a8a'); d.rect(i, y + 6, 2, 2, '#4a6a8a'); } };
  ev(2, 12, 10); ev(19, 10, 11); ev(11, 19, 10);
  d.rect(0, 29, 32, 3, '#a8947a'); for (let x = 0; x < 32; x += 3) d.px(x, 30, '#8a7a62');
  return d.done(); };

// Safranbolu Safranı: mor çiçek, kırmızı tepecikler
A.safran = () => { const d = G(24, '#eef0e2');
  d.rect(0, 19, 24, 5, '#7ab04e');
  const ç = (x, y, s) => { d.rect(x, y + 4, 1, 19 - y - 4, '#4f8a3a'); d.line(x - 2, 19, x - 1, y + 6, '#6aa84a'); d.line(x + 2, 19, x + 1, y + 6, '#6aa84a');
    d.poly([[x - 3 * s, y], [x, y - 3 * s], [x + 3 * s, y], [x + 1, y + 4], [x - 1, y + 4]], '#8a5ac0'); d.poly([[x - 1, y - 1], [x, y - 4 * s], [x + 1, y - 1]], '#a87ad8');
    d.line(x, y + 1, x - 2, y - 2, '#d9382a'); d.line(x, y + 1, x + 2, y - 2, '#d9382a'); d.px(x, y - 2, '#e8a526'); };
  ç(7, 10, 1.2); ç(16, 8, 1.4);
  d.ell(19, 21, 3, 1.4, '#f6efe0'); [[18, 21], [20, 20], [19, 21]].forEach(([x, y]) => d.px(x, y, '#d9382a'));   // tabakta safran telleri
  return d.done(); };

// Karabük Demir Çelik: fabrika bacaları, kızgın çelik
A.demircelik = () => { const d = G(32, '#f2c48a');
  d.rect(0, 0, 32, 8, '#f6d6a8');
  d.rect(0, 16, 32, 16, '#5a5e66'); d.rect(2, 12, 12, 6, '#6a6e76'); d.poly([[2, 12], [8, 8], [14, 12]], '#4a4e56');
  [[17, 4], [22, 2], [27, 5]].forEach(([x, y]) => { d.rect(x, y, 3, 14, '#7a7e86'); d.rect(x, y + 3, 3, 1, '#c0392b'); d.ell(x + 1.5, y - 2, 2.4, 1.6, '#d9d9d4'); });
  d.rect(4, 22, 24, 3, '#3a3e46'); d.rect(6, 23, 12, 1, '#f08a2a'); d.rect(8, 23, 6, 1, '#f6d36b');           // kızgın çelik şerit
  [[5, 14], [9, 14]].forEach(([x, y]) => d.rect(x, y, 2, 2, '#f2c14a'));
  d.rect(0, 28, 32, 4, '#3a3e46');
  return d.done(); };
