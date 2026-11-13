// Akdeniz resimleri 2: Isparta, Kahramanmaraş, Mersin, Osmaniye
import { G } from './grid.mjs';
export const A = {};

// ISPARTA — Eğirdir Gölü: renk renk göl, dağlar, adacık ve evler
A.egirdir = () => { const d = G(32, '#c9e6f4');
  d.poly([[0, 12], [6, 6], [11, 10], [17, 4], [24, 9], [28, 6], [32, 9], [32, 15], [0, 15]], '#8f86b0');
  d.poly([[13, 8], [17, 4], [21, 7]], '#e8e6f2');                                   // karlı tepe
  d.rect(0, 14, 32, 18, '#2f9fb3');
  d.rect(0, 18, 32, 4, '#3cb5bd').rect(0, 22, 32, 4, '#55c6b6').rect(0, 26, 32, 6, '#7ad3b0'); // renk bantları
  // adacık ve evler
  d.ell(21, 20, 7, 2.2, '#c2a77a').rect(16, 16, 3, 3, '#f3ece0').rect(20, 15, 3, 4, '#efe6d6').rect(24, 16, 2, 3, '#f3ece0');
  d.px(16, 15, '#c0573a').px(17, 15, '#c0573a').px(18, 15, '#c0573a').rect(20, 14, 3, 1, '#c0573a').rect(24, 15, 2, 1, '#c0573a');
  d.line(7, 20, 15, 20, '#c2a77a');                                                  // yol (adaya bağlantı)
  [[3, 25], [10, 28], [26, 27]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#a8e6cc'));
  return d.done(); };

// Isparta Gülyağı: pembe gül ve küçük şişe
A.gulyagi = () => { const d = G(24, '#fbeef2');
  // gül
  d.ell(9, 9, 6, 5.5, '#d8406a').ell(9, 8.5, 4.2, 3.8, '#e8678a').ell(9, 8, 2.4, 2.2, '#f398b0');
  d.line(7, 7, 10, 9, '#b8285a').line(11, 7, 9, 10, '#b8285a');
  d.line(9, 14, 8, 22, '#3f8a34'); d.poly([[8, 17], [3, 15], [4, 18]], '#4ea34a'); d.poly([[9, 19], [13, 17], [12, 20]], '#4ea34a');
  // şişe
  d.rect(16, 6, 2, 3, '#b07a42').rect(15, 9, 4, 1, '#d7c7a8');
  d.ell(17, 15, 4, 5.5, '#e9f2f4').ell(17, 16.5, 3, 3.5, '#f2c45a').px(15, 13, '#ffffff').px(15, 14, '#ffffff');
  d.rect(14, 20, 7, 1, '#cdd8dc');
  return d.done(); };

// Isparta Halısı: madalyonlu halı, bordür, saçaklar
A.halisi = () => { const d = G(24, '#efe3cf');
  d.rect(4, 2, 16, 20, '#9e2a2b');                                                   // zemin
  d.rect(4, 2, 16, 2, '#1f3a5f').rect(4, 20, 16, 2, '#1f3a5f').rect(4, 2, 2, 20, '#1f3a5f').rect(18, 2, 2, 20, '#1f3a5f');
  for (let y = 3; y < 21; y += 2){ d.px(5, y, '#e8c87a'); d.px(18, y, '#e8c87a'); } for (let x = 6; x < 18; x += 2){ d.px(x, 3, '#e8c87a'); d.px(x, 20, '#e8c87a'); }
  d.poly([[12, 6], [17, 12], [12, 18], [7, 12]], '#1f3a5f').poly([[12, 8], [15, 12], [12, 16], [9, 12]], '#e8c87a').poly([[12, 10], [13.6, 12], [12, 14], [10.4, 12]], '#9e2a2b');
  [[8, 6], [16, 6], [8, 17], [16, 17]].forEach(([x, y]) => d.rect(x - 1, y, 2, 2, '#e8c87a'));
  for (let x = 4; x < 20; x += 2){ d.px(x, 1, '#f6efe2'); d.px(x, 22, '#f6efe2'); }   // saçaklar
  return d.done(); };

// KAHRAMANMARAŞ — Kale: tepedeki surlar ve dalgalanan Türk bayrağı
A.marasKale = () => { const d = G(32, '#bfe2f4');
  d.ell(16, 36, 22, 14, '#7d9a4a').ell(16, 37, 20, 12, '#6a8a3e', (x, y) => y > 27);           // tepe
  d.rect(5, 16, 22, 10, '#c9b58f').rect(5, 16, 22, 1, '#ddcaa3');                               // sur
  for (let x = 5; x < 27; x += 3) d.rect(x, 14, 2, 2, '#c9b58f');                               // mazgallar
  d.rect(10, 11, 6, 15, '#bca784').rect(10, 11, 6, 1, '#d4c19b'); for (let x = 10; x < 16; x += 2) d.rect(x, 9, 1, 2, '#bca784'); // kule
  d.rect(12, 21, 2, 5, '#5e4a33').ell(13, 21, 1, 1, '#5e4a33');                                 // kapı
  [[20, 19], [7, 19], [23, 22]].forEach(([x, y]) => d.rect(x, y, 1, 2, '#5e4a33'));
  // bayrak
  d.rect(21, 2, 1, 13, '#6b6b6b');
  d.map(22, 2, ['RRRRRRRRRR','RRWWWRRRRR','RWWRRRRWRR','RWRRRRWWWR','RWWRRRRWRR','RRWWWRRRRR','RRRRRRRRRR'], { R:'#e30a17', W:'#ffffff' });
  return d.done(); };

// Maraş Dondurması: tabakta dilimlenmiş dondurma, bıçak ve çatal
A.dondurma = () => { const d = G(24, '#cfe3f0');
  d.ell(11, 15, 10, 6.5, '#f7f9fb').ell(11, 15, 8.5, 5, '#e3ecf2');
  // dövme dondurma dilimleri: kalın beyaz kalıplar, üstte fıstık
  [[5, 11], [11, 12]].forEach(([x, y]) => { d.rect(x, y, 5, 5, '#fffdf6').rect(x, y + 4, 5, 1, '#e2dccb').rect(x + 4, y, 1, 5, '#ece6d4'); d.px(x + 1, y + 1, '#7fb04a').px(x + 3, y + 2, '#5f9a38').px(x + 2, y + 3, '#7fb04a'); });
  // bıçak: kahverengi sap, gri ağız
  d.rect(20, 3, 2, 5, '#7a4a28').rect(20, 8, 2, 9, '#c9d0d6').rect(21, 8, 1, 9, '#a7b0b8').px(20, 17, '#c9d0d6');
  return d.done(); };

// Maraş Biberi: kâsede pul biber ve kurutulmuş biberler
A.marasbiber = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 16, 9, 5, '#8a5a32').ell(12, 14.5, 8, 3.2, '#b3261e');                 // kâse + pul biber
  for (let k = 0; k < 18; k++) d.px(5 + (k * 7) % 14, 13 + (k * 3) % 3, k % 2 ? '#7a1410' : '#d9452a');
  d.rect(4, 16, 16, 1, '#6e4426');
  // kurutulmuş biberler
  d.poly([[3, 4], [10, 7], [9, 9], [2, 6]], '#a81e18').px(2, 4, '#4f7a2a').px(1, 3, '#4f7a2a');
  d.poly([[13, 3], [21, 6], [20, 8], [12, 5]], '#c22a1e').px(12, 3, '#4f7a2a').px(11, 2, '#4f7a2a');
  d.line(4, 5, 8, 7, '#d9452a').line(14, 4, 19, 6, '#e05a3a');
  return d.done(); };

// MERSİN — Kızkalesi: denizdeki adacıkta kale
A.kizkalesi = () => { const d = G(32, '#f6d9a8');
  d.rect(0, 9, 32, 6, '#f2c48a').rect(0, 0, 32, 9, '#f8e3b8');                       // gün batımı gökyüzü
  d.ell(26, 9, 3, 3, '#f7a84a', (x, y) => y < 15);
  d.rect(0, 15, 32, 17, '#2f86b6').rect(0, 15, 32, 1, '#4fa6d0');
  d.ell(15, 25, 11, 2.6, '#c9a86a');                                                // ada
  d.rect(6, 15, 18, 9, '#b89466').rect(6, 15, 18, 1, '#cfac7a');                    // sur
  for (let x = 6; x < 24; x += 3) d.rect(x, 13, 2, 2, '#b89466');
  d.rect(4, 11, 5, 13, '#a8845a').rect(21, 11, 5, 13, '#a8845a');                   // köşe kuleleri
  for (let x = 4; x < 9; x += 2) d.px(x, 10, '#a8845a'); for (let x = 21; x < 26; x += 2) d.px(x, 10, '#a8845a');
  d.rect(13, 19, 3, 5, '#5a4128'); [[6, 14], [23, 14], [10, 18], [19, 18]].forEach(([x, y]) => d.rect(x, y, 1, 2, '#5a4128'));
  [[2, 28], [9, 30], [24, 28], [28, 30]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#7cc0e2'));
  return d.done(); };

// Mersin Tantunisi: lavaşa sarılı tantuni, limon, maydanoz
A.tantuni = () => { const d = G(24, '#f4e8d2');
  d.rect(0, 17, 24, 7, '#e2cfae');
  d.poly([[3, 15], [17, 6], [21, 11], [7, 20]], '#efd3a0');                         // dürüm
  d.poly([[5, 15], [16, 8], [17.5, 10], [6.5, 17]], '#f7e3bc');
  d.ell(18.5, 8.5, 3, 2.6, '#8e4a26'); d.px(18, 7, '#d9382a').px(19, 9, '#3f8a34').px(20, 8, '#d9382a').px(17, 9, '#3f8a34');
  d.ell(18.5, 8.5, 3.2, 2.8, '#e2c088', (x, y, dx, dy) => dx * dx + dy * dy > 0.75);
  d.ell(5, 21, 3.2, 3.2, '#f5d23a', (x, y) => y <= 21); d.ell(5, 21, 2.2, 2.2, '#fbe98a', (x, y) => y <= 21); d.rect(2, 21, 7, 1, '#fffbe6'); d.px(5, 19, '#f5d23a').px(4, 20, '#f5d23a').px(6, 20, '#f5d23a'); // limon dilimi
  [[11, 20], [13, 21], [15, 20]].forEach(([x, y]) => d.px(x, y, '#3f8a34').px(x, y - 1, '#5aaa48'));
  return d.done(); };

// Mersin Cezeryesi: hindistancevizli turuncu kalıplar ve cevizler
A.cezerye = () => { const d = G(24, '#f6eadb');
  d.ell(12, 16, 11, 5.5, '#ffffff').ell(12, 16, 9.5, 4, '#ece6da');
  const bar = (x, y) => { d.rect(x, y, 6, 4, '#d9781e').rect(x, y, 6, 1, '#fbf3e0').rect(x + 5, y + 1, 1, 3, '#b65f14').rect(x, y + 3, 5, 1, '#c26a18'); d.px(x + 1, y + 2, '#fbf3e0').px(x + 3, y + 1, '#8a5a2b'); };
  bar(4, 13); bar(11, 14); bar(8, 9);
  d.ell(19, 9, 2.4, 2, '#8a5a2b').px(19, 8, '#b07a42');
  return d.done(); };

// OSMANİYE — Karatepe-Aslantaş: kapıdaki bazalt aslan ve yazıtlı taş, çam ormanı
A.karatepe = () => { const d = G(32, '#cbe6c4');
  for (let x = 0; x < 32; x += 5) d.poly([[x + 2, 2], [x + 5, 11], [x - 1, 11]], '#3f7a45');      // çamlar
  d.rect(0, 11, 32, 21, '#8fbf6a');
  // yazıtlı dikilitaş
  d.rect(22, 9, 8, 20, '#59585c').rect(22, 9, 8, 1, '#76757a');
  for (let y = 11; y < 27; y += 2) for (let x = 23; x < 29; x += 2) d.px(x, y, '#3a393d');
  // aslan heykeli: yeleli büyük baş, açık ağız, kalkık kuyruk
  d.rect(4, 18, 13, 8, '#4f4e52').rect(4, 18, 13, 1, '#5f5e63');                     // gövde
  d.rect(4, 26, 3, 4, '#4f4e52').rect(13, 26, 3, 4, '#4f4e52').rect(3, 29, 4, 1, '#3c3b3f').rect(12, 29, 5, 1, '#3c3b3f'); // pençeler
  d.ell(18, 17, 5.2, 6, '#6c6b70');                                                  // yele
  for (let k = 0; k < 8; k++){ const a = k * 0.785; d.px(18 + Math.cos(a) * 5, 17 + Math.sin(a) * 5.6, '#7d7c82'); }
  d.ell(19, 17, 3.2, 3.6, '#58575c');                                                // yüz
  d.px(18, 15, '#e8e2d0').px(19, 15, '#2c2b2f');                                     // göz
  d.rect(20, 18, 3, 3, '#2c2b2f').px(20, 18, '#e8e2d0').px(22, 18, '#e8e2d0').px(20, 20, '#e8e2d0'); // açık ağız, dişler
  d.line(4, 19, 1, 15, '#4f4e52').ell(1, 14, 1.3, 1.3, '#6c6b70');                   // kuyruk ve püskül
  d.rect(3, 30, 16, 2, '#6f8f52');
  return d.done(); };

// Osmaniye Yer Fıstığı: kabuklu ve iç fıstıklar
A.yerfistigi = () => { const d = G(24, '#f3ead6');
  // kabuklu fıstık: iki tombul boğum, ortada bel, üstünde ağ deseni
  const nut = (x, y, flip) => { const s = flip ? -1 : 1;
    d.ell(x - 2.4 * s, y, 2.6, 2.4, '#d6aa6a'); d.ell(x + 2.4 * s, y, 2.8, 2.6, '#d6aa6a'); d.rect(x - (flip ? 1 : 0), y - 1, 1, 3, '#c49556');
    d.px(x, y - 2, '#f3ead6').px(x, y + 2, '#f3ead6');
    d.px(x - 3 * s, y - 1, '#b5844a').px(x - 2 * s, y + 1, '#b5844a').px(x + 2 * s, y - 1, '#b5844a').px(x + 3 * s, y + 1, '#b5844a').px(x + 2 * s, y + 2, '#b5844a');
    d.px(x - 3 * s, y - 2, '#ecc995').px(x + 2 * s, y - 2, '#ecc995'); };
  nut(7, 6); nut(16, 9, true); nut(8, 14, true); nut(17, 17);
  [[4, 20], [10, 21], [13, 19]].forEach(([x, y]) => { d.ell(x, y, 1.8, 1.2, '#b35d3a'); d.px(x - 1, y - 1, '#d07a52'); });
  return d.done(); };

// Karatepe Kilimi: geometrik motifli yün kilim
A.kilim = () => { const d = G(24, '#eadfcb');
  d.rect(3, 3, 18, 18, '#b5281f');
  [[3, 3], [3, 18]].forEach(([x, y]) => d.rect(x, y, 18, 3, '#2a2422'));
  for (let x = 4; x < 21; x += 3){ d.px(x, 4, '#f2e6c8'); d.px(x + 1, 19, '#f2e6c8'); }
  const dia = (cx, cy) => { d.poly([[cx, cy - 3], [cx + 3, cy], [cx, cy + 3], [cx - 3, cy]], '#f2c14a'); d.poly([[cx, cy - 1.5], [cx + 1.5, cy], [cx, cy + 1.5], [cx - 1.5, cy]], '#2a2422'); };
  dia(8, 12); dia(16, 12);
  d.rect(12, 9, 1, 7, '#f2e6c8'); d.rect(10, 12, 5, 1, '#f2e6c8');
  for (let y = 3; y < 21; y += 2){ d.px(2, y, '#f6efe2'); d.px(21, y, '#f6efe2'); }  // saçaklar
  return d.done(); };
