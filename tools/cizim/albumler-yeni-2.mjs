// Yeni albümler 2: Türk Kahvaltısı, Meslekler
import { G } from './grid.mjs';
export const A = {};
const KR = '#f4e8d2';                                                      // krem masa örtüsü
const tabak = (d, cx, cy, rx, ry) => { d.ell(cx, cy, rx, ry, '#3a6aa8'); d.ell(cx, cy, rx - 1.4, ry - 1.2, '#eef2f6'); };

// TÜRK KAHVALTISI
A.balkaymak = () => { const d = G(24, KR);
  tabak(d, 12, 14, 11, 7);
  d.ell(12, 14, 6, 3.6, '#fbf8ec'); d.ell(11, 13, 3.4, 1.6, '#ffffff');                                     // kaymak
  d.poly([[8, 13], [12, 12], [16, 14], [13, 16], [9, 15]], '#e0a526'); d.ell(11, 13.5, 2, 0.8, '#f6d36b');    // bal
  d.rect(18, 4, 4, 2, '#8a5a2b'); d.rect(17, 6, 6, 5, '#f2c14a'); d.rect(18, 7, 2, 3, '#f6d36b');               // bal kavanozu
  d.line(3, 4, 9, 9, '#8a5a2b'); d.ell(10, 10, 1.6, 1.2, '#a8703a');                                         // bal kaşığı
  return d.done(); };

A.beyazpeynir = () => { const d = G(24, KR);
  tabak(d, 12, 14, 11, 7);
  d.rect(6, 10, 8, 6, '#fbfaf4'); d.rect(6, 10, 8, 1, '#ffffff'); d.rect(13, 10, 1, 6, '#e8e4d8'); [[8, 12], [11, 14], [9, 15]].forEach(([x, y]) => d.px(x, y, '#e0dccc'));
  d.rect(14, 12, 5, 4, '#fbfaf4'); d.rect(14, 12, 5, 1, '#ffffff');
  [[17, 10], [6, 17]].forEach(([x, y]) => { d.ell(x, y, 1.6, 1, '#3f8a34'); d.px(x, y - 1, '#5aa04a'); });   // maydanoz
  return d.done(); };

A.zeytin = () => { const d = G(24, KR);
  d.ell(12, 15, 9, 5, '#a8502a'); d.ell(12, 14, 8, 3.6, '#e8c8a0');                                         // toprak kâse
  [[8, 13, '#2a1a24'], [11, 12, '#3a2a30'], [14, 13, '#2a1a24'], [10, 15, '#3a2a30'], [15, 15, '#5a7a2a'], [12, 14, '#6a8a32']].forEach(([x, y, c]) => { d.ell(x, y, 1.6, 1.2, c); d.px(x - 1, y - 1, '#8a8a8a'); });
  d.line(15, 2, 21, 6, '#6b5a3a'); [[16, 3], [18, 4], [20, 5]].forEach(([x, y], i) => d.ell(x, y + (i % 2 ? 1.4 : -1), 1.8, 0.8, '#6a8a4a'));   // zeytin dalı
  d.ell(19, 7, 1.2, 1, '#3a2a30');
  return d.done(); };

A.sucukluyumurta = () => { const d = G(24, KR);
  d.ell(12, 13, 10, 7, '#5a5e66'); d.ell(12, 13, 8.6, 5.8, '#7a7e86'); d.rect(0, 12, 3, 2, '#5a5e66').rect(21, 12, 3, 2, '#5a5e66');   // sahan
  [[8, 11], [12, 16], [16, 11]].forEach(([x, y]) => { d.ell(x, y, 3, 2.4, '#fbfaf4'); d.ell(x, y, 1.3, 1.2, '#f2a01a'); d.px(x - 1, y - 1, '#f6d36b'); });
  [[12, 11], [7, 15], [17, 15], [10, 8], [15, 9]].forEach(([x, y]) => { d.ell(x, y, 1.3, 1.1, '#a8321e'); d.px(x, y, '#d9584a'); });   // sucuk
  return d.done(); };

A.pogaca = () => { const d = G(24, KR);
  d.rect(2, 16, 20, 4, '#b9895a'); d.rect(2, 16, 20, 1, '#d1a374');                                         // tahta tepsi
  const p = (x, y) => { d.ell(x, y, 4, 3, '#d98a3a'); d.ell(x, y - 0.6, 3.4, 2.2, '#e8a858'); d.ell(x - 1, y - 1.4, 1.4, 0.8, '#f6c880'); [[x - 1, y], [x + 1, y - 1], [x + 2, y + 1]].forEach(([a, b]) => d.px(a, b, '#2a2420')); };   // çörekotlu
  p(7, 13); p(16, 13); p(11, 8);
  return d.done(); };

A.recel = () => { const d = G(24, KR);
  d.rect(4, 4, 9, 3, '#e8dcc0'); for (let x = 4; x < 13; x += 2) d.px(x, 4, '#c0392b'); d.rect(5, 7, 7, 1, '#c9a868');   // kapak örtüsü
  d.rect(4, 8, 9, 12, '#dfe8ee'); d.rect(5, 10, 7, 9, '#b8233a'); d.rect(6, 11, 2, 6, '#d9485a'); d.rect(5, 13, 7, 3, '#f6efe0'); d.rect(6, 14, 5, 1, '#c0392b');   // vişne reçeli
  d.ell(18, 17, 4, 1.6, '#eef2f6'); d.ell(18, 16.6, 2.4, 0.8, '#b8233a'); d.line(15, 12, 19, 16, '#c9cfd6');
  [[18, 7], [20, 9]].forEach(([x, y]) => { d.ell(x, y, 1.4, 1.4, '#a8102a'); d.px(x - 1, y - 1, '#e8586a'); d.line(x, y - 1, 19, 4, '#4f8a3a'); });   // vişneler
  return d.done(); };

A.haslanmisyumurta = () => { const d = G(24, KR);
  d.rect(4, 15, 7, 2, '#c0392b'); d.poly([[5, 17], [10, 17], [9, 21], [6, 21]], '#c0392b'); d.rect(5, 21, 6, 1, '#8a2a1e');   // yumurtalık
  d.ell(7.5, 11, 3, 4, '#fbfaf4'); d.px(6, 9, '#ffffff'); d.px(7, 8, '#e8e4d8');
  d.ell(17, 16, 5, 3.4, '#fbfaf4'); d.ell(17, 16, 2.4, 2, '#f2a01a'); d.ell(16.4, 15.4, 0.9, 0.8, '#f6d36b');   // ikiye kesilmiş
  d.px(19, 9, '#c9a868').px(20, 10, '#c9a868');                                                             // tuz
  return d.done(); };

A.gozleme = () => { const d = G(24, KR);
  d.ell(12, 13, 11, 7, '#2a2a2e'); d.ell(12, 13, 10, 6, '#3a3a40');                                        // sac
  d.poly([[3, 13], [12, 7], [21, 13], [12, 19]], '#e8b860'); d.line(3, 13, 21, 13, '#c88a3a');               // katlanmış yufka
  [[7, 11], [10, 10], [14, 10], [17, 12], [8, 15], [13, 16], [16, 15]].forEach(([x, y]) => d.px(x, y, '#a8642a'));   // kızarık lekeler
  d.px(12, 13, '#fbfaf4').px(9, 13, '#fbfaf4').px(15, 13, '#3f8a34');
  return d.done(); };

A.caydanlik = () => { const d = G(24, KR);
  d.ell(12, 18, 7, 4, '#c9cfd6'); d.rect(5, 14, 14, 5, '#c9cfd6'); d.ell(12, 14, 7, 1.6, '#a8aeb6');           // alttaki büyük su kabı
  d.rect(7, 8, 10, 6, '#d9dee4'); d.ell(12, 8, 5, 1.4, '#a8aeb6'); d.rect(11, 5, 2, 2, '#5a5e66');             // üstteki demlik
  d.poly([[17, 10], [21, 7], [21, 8], [18, 12]], '#c9cfd6'); d.poly([[19, 16], [23, 13], [23, 14], [20, 18]], '#b8bec6');   // ağızlar
  d.line(4, 9, 4, 13, '#3a3a3a'); d.line(4, 9, 7, 9, '#3a3a3a');                                            // kulp
  d.rect(8, 10, 2, 3, '#f2f4f6'); d.rect(6, 16, 2, 2, '#eef2f4');
  [[21, 4], [22, 2]].forEach(([x, y]) => d.px(x, y, '#ffffff'));
  return d.done(); };

// MESLEKLER (yüzsüz simgeler)
A.doktor = () => { const d = G(24, '#dff0ee');
  d.rect(3, 4, 18, 16, '#fbfaf6'); d.rect(3, 4, 18, 1, '#e0e4e8');                                         // önlük
  d.rect(11, 4, 2, 16, '#e0e4e8'); d.rect(5, 12, 4, 3, '#e0e4e8');
  d.line(7, 4, 6, 10, '#2a2a3a'); d.line(16, 4, 17, 10, '#2a2a3a'); d.line(6, 10, 11, 15, '#2a2a3a'); d.line(17, 10, 13, 15, '#2a2a3a');   // stetoskop
  d.ell(12, 16, 2, 2, '#8a8e96'); d.ell(12, 16, 1, 1, '#c9cfd6');
  d.rect(15, 7, 4, 4, '#ffffff'); d.rect(16, 8, 2, 2, '#d9282a'); d.rect(15, 8, 4, 2, '#ffffff'); d.rect(16, 7, 2, 4, '#d9282a'); d.rect(15, 8, 1, 2, '#d9282a').rect(18, 8, 1, 2, '#d9282a');   // kırmızı artı
  return d.done(); };

A.itfaiyeci = () => { const d = G(24, '#f6d6a8');
  d.rect(0, 18, 24, 6, '#8a7a6a');
  d.ell(12, 10, 8, 6, '#d9282a', (x, y) => y < 11); d.ell(12, 11, 10, 2, '#b8202a'); d.rect(10, 4, 4, 3, '#f2c14a'); d.rect(11, 5, 2, 1, '#d9282a');   // kask ve arma
  d.px(8, 7, '#f06a6a').px(9, 6, '#f06a6a');
  d.ell(18, 19, 4, 2.4, '#e0a526'); d.ell(18, 19, 2.4, 1.4, '#8a7a6a'); d.line(14, 19, 4, 17, '#e0a526'); d.rect(2, 16, 3, 3, '#8a8e96');   // hortum
  [[3, 14], [1, 12], [4, 11]].forEach(([x, y]) => d.px(x, y, '#8fc8f0'));
  return d.done(); };

A.asci = () => { const d = G(24, '#f6ecd2');
  d.rect(0, 18, 24, 6, '#a8703a').rect(0, 18, 24, 1, '#c08a50');
  d.ell(8, 4, 3.4, 2.6, '#ffffff'); d.ell(5, 5.4, 2.6, 2.2, '#ffffff'); d.ell(11, 5.4, 2.6, 2.2, '#ffffff'); d.rect(5, 6, 7, 5, '#f4f4f0'); d.rect(5, 10, 7, 1, '#d4d4cc');   // aşçı şapkası
  d.ell(17, 15, 5, 3, '#5a5e66'); d.rect(12, 14, 10, 1, '#8a8e96'); d.rect(21, 14, 3, 1, '#2a2a2e');           // tava
  d.ell(16, 13, 2, 1.2, '#fbfaf4'); d.ell(16, 13, 0.9, 0.8, '#f2a01a');                                        // yumurta
  d.line(4, 13, 8, 17, '#c9cfd6'); d.ell(3.5, 12.5, 1.6, 1.2, '#c9cfd6');                                      // kepçe
  return d.done(); };

A.pilot = () => { const d = G(24, '#bfe3f2');
  d.ell(5, 4, 3, 1.4, '#ffffff'); d.ell(19, 20, 3.4, 1.4, '#ffffff');
  d.ell(12, 10, 8, 4, '#1f2a4a', (x, y) => y < 11); d.rect(4, 10, 16, 2, '#1f2a4a'); d.rect(5, 12, 14, 2, '#2a2a2e');   // pilot şapkası, siper
  d.rect(4, 10, 16, 1, '#e0a526'); d.rect(11, 6, 2, 2, '#e0a526');
  d.rect(4, 17, 16, 2, '#e0a526'); d.poly([[4, 17], [1, 15], [3, 18]], '#e0a526').poly([[20, 17], [23, 15], [21, 18]], '#e0a526'); d.ell(12, 18, 2, 2, '#e0a526'); d.px(12, 18, '#1f2a4a');   // kanat rozeti
  return d.done(); };

A.ogretmen = () => { const d = G(24, '#f2e2c0');
  d.rect(1, 2, 22, 14, '#8a5a2b'); d.rect(2, 3, 20, 12, '#2f5a3a');                                         // kara tahta
  d.map(4, 5, ['.w..ww...ww', 'w.w.w.w.w..', 'www.ww..w..', 'w.w.w.w.w..', 'w.w.ww...ww'], { w:'#fbfaf4' });   // tahtada ABC
  d.rect(4, 12, 8, 1, '#c8dccc');
  d.rect(2, 16, 20, 1, '#6b4a1e'); d.rect(6, 16, 3, 1, '#fbfaf4');                                          // tebeşir
  d.ell(18, 20, 2.6, 2.4, '#d9282a'); d.px(18, 17, '#6b4a1e'); d.ell(19, 17.4, 1, 0.6, '#4f8a3a'); d.px(17, 19, '#f08a8a');   // elma
  d.rect(3, 19, 9, 3, '#2e7dba'); d.rect(3, 19, 9, 1, '#5aa0d8');                                           // kitap
  return d.done(); };

A.veteriner = () => { const d = G(24, '#e8f2e0');
  const p = (x, y, r, c) => d.ell(x, y, r, r * 0.9, c);
  p(12, 15, 4.4, '#8a5a3a'); [[6, 9], [10, 6], [14, 6], [18, 9]].forEach(([x, y]) => p(x, y, 2, '#8a5a3a'));   // pati
  d.line(3, 18, 4, 22, '#2a2a3a'); d.line(21, 18, 20, 22, '#2a2a3a'); d.line(4, 22, 12, 22, '#2a2a3a').line(20, 22, 13, 22, '#2a2a3a');
  d.ell(12, 22, 1.6, 1.4, '#8a8e96');                                                                      // stetoskop
  d.rect(10, 14, 4, 2, '#fbfaf6'); d.rect(11, 13, 2, 4, '#fbfaf6'); d.rect(11, 14, 2, 2, '#d9282a');           // artı
  return d.done(); };

A.ressam = () => { const d = G(24, '#f6ecd2');
  d.ell(11, 13, 9, 7, '#d9a868'); d.ell(15, 16, 2, 1.6, '#f6ecd2');                                         // palet, parmak deliği
  [[6, 10, '#d9282a'], [9, 8, '#f2c14a'], [13, 8, '#2e7dba'], [16, 10, '#3f9a4a'], [5, 14, '#ffffff'], [9, 16, '#8a4fb0']].forEach(([x, y, c]) => d.ell(x, y, 1.4, 1.2, c));
  d.line(22, 1, 14, 13, '#8a5a2b'); d.line(23, 2, 15, 14, '#a8703a'); d.rect(14, 13, 2, 2, '#c9cfd6'); d.px(13, 15, '#2e7dba').px(12, 16, '#2e7dba');   // fırça
  return d.done(); };

A.marangoz = () => { const d = G(24, '#f2e2c0');
  d.rect(0, 16, 24, 8, '#c08a50'); for (let y = 18; y < 24; y += 3) d.rect(0, y, 24, 1, '#a8703a');           // tezgâh
  d.rect(3, 3, 3, 12, '#8a5a2b'); d.rect(1, 2, 7, 3, '#5a5e66'); d.rect(0, 2, 2, 2, '#5a5e66');               // çekiç
  d.poly([[10, 6], [22, 4], [22, 10], [10, 10]], '#c9cfd6'); for (let x = 11; x < 22; x += 2) d.px(x, 10, '#8a8e96'); d.rect(7, 5, 4, 6, '#a8321e'); d.rect(8, 7, 2, 2, '#f2e2c0');   // testere
  d.rect(14, 13, 6, 3, '#e0b878'); d.ell(9, 14, 1.4, 0.8, '#e8c890'); d.px(5, 15, '#e8c890');                  // tahta, talaş
  return d.done(); };

A.postaci = () => { const d = G(24, '#dff0f6');
  d.rect(2, 8, 13, 13, '#8a5a2b'); d.rect(2, 8, 13, 4, '#6b4a1e'); d.rect(7, 11, 3, 2, '#e0a526');             // posta çantası
  d.line(3, 8, 9, 1, '#6b4a1e'); d.line(14, 8, 9, 1, '#6b4a1e');
  d.rect(11, 12, 12, 8, '#fbfaf4'); d.line(11, 12, 17, 16, '#c9c4b8'); d.line(22, 12, 17, 16, '#c9c4b8');       // zarf
  d.rect(19, 13, 3, 3, '#d9282a'); d.rect(13, 18, 5, 1, '#8a8e96');
  return d.done(); };
