// Yeni albümler 5: Motifler, Manzaralar
import { G } from './grid.mjs';
export const A = {};
const KR = '#f2e2c0', KZ = '#b8302a', LC = '#1e2a5a', SR = '#e8b030', YS = '#2a7a5a';   // kilim renkleri
// Ayna simetrisi: verilen sol yarı fonksiyonu (x < n/2) iki yana çizer
const mirror = (d, f) => { f((x, y, c) => { d.px(x, y, c); d.px(d.n - 1 - x, y, c); }); };

// MOTİFLER
A.nazar = () => { const d = G(32, '#f6efe0');
  d.line(16, 0, 16, 5, '#8a6a3a');
  [[11, '#1e3aa8'], [8.6, '#f6f6f6'], [6.6, '#7ac8f0'], [4, '#1a1a2a']].forEach(([r, c]) => d.ell(16, 17, r, r, c));
  d.px(14, 15, '#ffffff').px(15, 14, '#ffffff');
  d.ell(16, 17, 11, 11, '#14287a', (x, y, dx, dy) => dx + dy > 1.15);
  return d.done(); };

A.lale = () => { const d = G(32, '#f6f2e6');
  d.rect(0, 0, 32, 2, '#1e5ab8'); d.rect(0, 30, 32, 2, '#1e5ab8'); d.rect(0, 0, 2, 32, '#1e5ab8'); d.rect(30, 0, 2, 32, '#1e5ab8');   // çini kenarı
  d.rect(2, 2, 28, 1, '#3ab0c0'); d.rect(2, 29, 28, 1, '#3ab0c0'); d.rect(2, 2, 1, 28, '#3ab0c0'); d.rect(29, 2, 1, 28, '#3ab0c0');
  d.line(16, 15, 16, 27, YS); d.line(15, 15, 15, 27, YS);
  mirror(d, p => { for (let y = 17; y < 27; y++){ const w = Math.round(Math.sin((y - 17) / 10 * Math.PI) * 4); for (let x = 15 - w - 1; x < 14; x++) if (x > 14 - w - 3) p(x, y, '#3a9a5a'); } });   // yapraklar
  d.poly([[11, 6], [13, 9], [16, 4], [19, 9], [21, 6], [21, 12], [19, 15], [13, 15], [11, 12]], '#d8302a');   // sivri lale
  d.poly([[16, 4], [14, 10], [16, 14], [18, 10]], '#f05a4a');
  d.px(13, 12, '#a8201a').px(19, 12, '#a8201a');
  return d.done(); };

A.elibelinde = () => { const d = G(32, KR);
  d.rect(0, 0, 32, 3, KZ); d.rect(0, 29, 32, 3, KZ); for (let x = 1; x < 32; x += 4) { d.px(x, 1, SR); d.px(x + 2, 30, SR); }
  // eller belde kadın figürü: baş, kollar dirsekten kırılıp bele dayanır, etek üçgeni (kilimdeki gibi basamaklı)
  d.map(7, 4, [
    '........r........',
    '.......rrr.......',
    '......rrbrr......',
    '.......rrr.......',
    '........r........',
    '...rrrrrrrrrrr...',
    '..r....rrr....r..',
    '.r.....rrr.....r.',
    'r......rrr......r',
    '.r.....rrr.....r.',
    '..r....rrr....r..',
    '...rr..rrr..rr...',
    '.....rrryrrr.....',
    '......rryrr......',
    '.....rrryrrr.....',
    '....rrryyyrrr....',
    '...rrryyyyyrrr...',
    '..rrrryyyyyrrrr..',
    '.rrrrrrrrrrrrrrr.',
    '...r.........r...',
    '...r.........r...'], { r:KZ, b:LC, y:SR });
  return d.done(); };
A.kocboynuzu = () => { const d = G(32, KZ);
  d.rect(0, 0, 32, 2, LC); d.rect(0, 30, 32, 2, LC);
  mirror(d, p => {
    for (let y = 8; y < 26; y++) p(15, y, KR);                                                  // gövde
    // kıvrık boynuz: gövdeden yukarı-dışa çıkar, aşağı kıvrılır
    [[14, 9], [13, 8], [12, 7], [11, 6], [10, 6], [9, 6], [8, 7], [7, 8], [7, 9], [7, 10], [8, 11], [9, 11], [10, 10], [10, 9]].forEach(([x, y]) => p(x, y, KR));
    [[14, 24], [13, 25], [12, 26], [11, 27], [10, 27], [9, 27], [8, 26], [7, 25], [7, 24], [7, 23], [8, 22], [9, 22], [10, 23], [10, 24]].forEach(([x, y]) => p(x, y, KR));
    [[13, 15], [12, 14], [11, 14], [11, 16], [12, 18], [13, 17]].forEach(([x, y]) => p(x, y, SR));
    [[9, 8], [8, 9], [9, 25], [8, 24]].forEach(([x, y]) => p(x, y, SR));
  });
  d.ell(16, 16.5, 2, 3, LC);
  return d.done(); };

A.hayatagaci = () => { const d = G(32, LC);
  d.rect(0, 0, 32, 2, KZ); d.rect(0, 30, 32, 2, KZ); d.rect(0, 0, 2, 32, KZ); d.rect(30, 0, 2, 32, KZ);
  d.rect(15, 6, 2, 22, '#c8925a');                                                               // gövde
  mirror(d, p => {
    [[8, 9], [10, 14], [12, 19]].forEach(([w, y]) => { for (let k = 0; k < w; k++) p(15 - k, y - Math.round(k * 0.5), '#c8925a'); });   // dallar
    [[7, 4], [5, 9], [7, 13], [4, 18], [9, 22]].forEach(([x, y], i) => { p(x, y, i % 2 ? SR : '#3ab0a0'); p(x + 1, y, i % 2 ? SR : '#3ab0a0'); p(x, y + 1, i % 2 ? SR : '#3ab0a0'); p(x + 1, y + 1, i % 2 ? KZ : '#2a8a7a'); });   // yaprak/meyve
    for (let k = 0; k < 4; k++) p(15 - k, 27 + Math.min(k, 1), '#c8925a');                         // kökler
  });
  d.ell(16, 4, 2, 2, SR);
  return d.done(); };

A.cintemani = () => { const d = G(32, '#f6ecd2');
  const b = '#2a4aa8', r = '#c8302a';
  [[9, 8], [16, 4], [23, 8], [9, 21], [16, 17], [23, 21]].forEach(([x, y], i) => { if (i === 1 || i === 4) return; });
  [[11, 7], [16, 3.5], [21, 7]].forEach(([x, y]) => { d.ell(x, y + 3, 3, 3, b); d.ell(x, y + 3, 1.4, 1.4, '#f6ecd2'); });   // üç top
  for (const yy of [19, 25]) for (let x = 2; x < 30; x++){ const y = yy + Math.round(Math.sin(x * 0.55) * 2); d.px(x, y, r); d.px(x, y + 1, r); }   // dalgalı iki çizgi
  return d.done(); };

A.selcukluyildizi = () => { const d = G(32, '#1e3a5a');
  const t = '#3ab0c0', k = '#f2e2c0';
  const sq = (rot, c) => { const p = []; for (let i = 0; i < 4; i++){ const a = rot + i * Math.PI / 2; p.push([16 + Math.cos(a) * 13, 16 + Math.sin(a) * 13]); } d.poly(p, c); };
  sq(Math.PI / 4, t); sq(0, t);                                                                     // iki kare: sekiz köşeli yıldız
  const sq2 = (rot, c) => { const p = []; for (let i = 0; i < 4; i++){ const a = rot + i * Math.PI / 2; p.push([16 + Math.cos(a) * 10, 16 + Math.sin(a) * 10]); } d.poly(p, c); };
  sq2(Math.PI / 4, '#1e3a5a'); sq2(0, '#1e3a5a');
  const sq3 = (rot, c) => { const p = []; for (let i = 0; i < 4; i++){ const a = rot + i * Math.PI / 2; p.push([16 + Math.cos(a) * 8.6, 16 + Math.sin(a) * 8.6]); } d.poly(p, c); };
  sq3(Math.PI / 4, k); sq3(0, k);
  d.ell(16, 16, 3.4, 3.4, KZ); d.ell(16, 16, 1.4, 1.4, SR);
  return d.done(); };

A.suyolu = () => { const d = G(32, KR);
  for (const y0 of [2, 26]) { d.rect(0, y0, 32, 4, LC); for (let x = 0; x < 32; x++){ const y = y0 + 1 + Math.abs((x % 6) - 3) * 2 / 3; d.px(x, Math.round(y), '#7ac8f0'); } }   // su yolu bordürleri
  mirror(d, p => { for (let k = 0; k <= 9; k++) { p(16 - k - 1, 16 - 9 + k, KZ); p(16 - k - 1, 16 + 8 - k, KZ); } });   // göbek (dörtgen)
  d.poly([[16, 9], [23, 16], [16, 23], [9, 16]], SR); d.poly([[16, 12], [20, 16], [16, 20], [12, 16]], KZ); d.ell(16, 16, 1.4, 1.4, KR);
  return d.done(); };

A.karanfil = () => { const d = G(32, '#f6f6f0');
  d.rect(0, 0, 32, 2, '#1e5ab8'); d.rect(0, 30, 32, 2, '#1e5ab8'); d.rect(0, 0, 2, 32, '#1e5ab8'); d.rect(30, 0, 2, 32, '#1e5ab8');
  d.line(16, 17, 16, 28, '#2a7a5a');
  d.poly([[16, 25], [5, 17], [7, 16], [16, 22]], '#2a8ab8'); d.poly([[16, 23], [27, 15], [25, 14], [16, 20]], '#2a8ab8');   // saz yaprakları
  d.ell(16, 12, 9, 8, '#d8302a', (x, y) => y <= 12);                                                  // yelpaze gibi açılan taç
  for (let k = 0; k < 9; k++){ const a = Math.PI * (1 + (k + 0.5) / 9), x = 16 + Math.cos(a) * 9, y = 12 + Math.sin(a) * 8; d.px(x, y, '#f6f6f0'); }   // dişli kenar
  for (let k = 1; k < 5; k++){ const a = Math.PI * (1 + k / 5); d.line(16, 12, 16 + Math.cos(a) * 7, 12 + Math.sin(a) * 6, '#f05a4a'); }   // yaprak çizgileri
  d.poly([[12, 12], [20, 12], [18, 17], [14, 17]], '#2a7a5a'); d.line(14, 13, 18, 13, '#3a9a6a');     // çanak
  return d.done(); };
A.daggolu = () => { const d = G(32, '#a8d8f0');
  d.ell(6, 5, 4, 1.4, '#f6f6f6');
  d.poly([[0, 17], [9, 4], [16, 12], [23, 3], [32, 15], [32, 17]], '#6a7a8a');
  d.poly([[9, 4], [6, 8], [12, 8]], '#f6f6f6'); d.poly([[23, 3], [20, 7], [26, 7]], '#f6f6f6');
  d.rect(0, 15, 32, 3, '#3a8a4a'); for (let x = 1; x < 32; x += 3) d.poly([[x, 17], [x + 1, 12], [x + 2, 17]], '#2a6a3a');   // çamlar
  d.rect(0, 18, 32, 14, '#3a7ac0');
  d.poly([[0, 18], [9, 31], [16, 23], [23, 32], [32, 20], [32, 18]], '#5a8ab8');                     // göldeki yansıma
  [[4, 22], [18, 26], [26, 21]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#a8d4f6'));
  return d.done(); };

A.gunbatimi = () => { const d = G(32, '#f6b84a');
  ['#5a3a8a', '#8a4a9a', '#c85a8a', '#e8786a', '#f29a5a'].forEach((c, i) => d.rect(0, i * 3, 32, 3, c));   // gökyüzü bantları
  d.ell(16, 19, 6, 6, '#ffe08a', (x, y) => y < 19);                                                // güneş
  d.rect(0, 19, 32, 13, '#2a4a7a');
  for (let y = 20; y < 31; y += 2) { const w = 10 - (y - 20) * 0.6; d.rect(Math.round(16 - w / 2), y, Math.round(w), 1, '#f6c86a'); }   // ışık yolu
  d.poly([[0, 19], [0, 14], [5, 16], [9, 19]], '#2a2440');                                          // burun
  return d.done(); };

A.col = () => { const d = G(32, '#f6e0a8');
  d.ell(25, 6, 3.4, 3.4, '#fff4c0');
  d.ell(8, 22, 14, 7, '#e8b860'); d.ell(26, 25, 12, 7, '#d8a050'); d.rect(0, 26, 32, 6, '#e8b860');   // kum tepeleri
  d.ell(10, 27, 6, 2, '#3a9ab8');                                                                   // vaha suyu
  d.line(14, 26, 16, 15, '#8a5a2a'); d.line(15, 26, 17, 15, '#8a5a2a');                              // hurma ağacı
  [[-6, 2], [-4, -2], [4, -2], [6, 2], [0, -4]].forEach(([dx, dy]) => d.line(17, 15, 17 + dx, 15 + dy, '#3a8a3a'));
  [[-5, 3], [5, 3]].forEach(([dx, dy]) => d.line(17, 15, 17 + dx, 15 + dy, '#2a6a2a'));
  d.ell(5, 25, 2, 1.6, '#5aa04a');
  return d.done(); };

A.selale = () => { const d = G(32, '#bfe3f2');
  d.poly([[0, 0], [12, 0], [12, 22], [0, 24]], '#7a6a5a'); d.poly([[20, 0], [32, 0], [32, 24], [20, 22]], '#6a5a4a');   // kayalıklar
  d.ell(4, 3, 5, 3, '#4a9a4a'); d.ell(28, 2, 5, 3, '#4a9a4a');
  d.rect(12, 0, 8, 24, '#7ac8f0'); for (let x = 13; x < 20; x += 2) d.rect(x, 0, 1, 24, '#d8f0fc');  // şelale
  d.rect(0, 23, 32, 9, '#3a8ac0'); d.ell(16, 24, 7, 2.4, '#f6faff');                                  // havuz, köpük
  [[3, 27], [24, 28], [10, 30]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#7ac0e8'));
  return d.done(); };

A.camormani = () => { const d = G(32, '#d8eef2');
  d.ell(25, 6, 3, 3, '#f6e8a8');
  d.rect(0, 26, 32, 6, '#5a8a3a');
  const cam = (x, y, h, c) => { for (let k = 0; k < h; k++) { const w = Math.floor(k / 2) + 1; d.rect(x - w, y + k, w * 2 + 1, 1, c); } d.rect(x, y + h, 1, 2, '#6b4a1e'); };
  cam(4, 10, 15, '#2a6a3a'); cam(27, 11, 14, '#2a6a3a'); cam(11, 6, 19, '#1e5a30'); cam(20, 8, 17, '#2a7a40'); cam(16, 14, 11, '#3a8a4a');
  return d.done(); };

A.karlidag = () => { const d = G(32, '#28305a');
  [[3, 3], [10, 6], [20, 2], [28, 5], [15, 9]].forEach(([x, y]) => d.px(x, y, '#f6f6f6'));
  d.poly([[0, 20], [10, 8], [18, 15], [26, 7], [32, 13], [32, 22], [0, 22]], '#c8d4e8');
  d.rect(0, 21, 32, 11, '#f2f6fc');
  d.rect(9, 18, 12, 9, '#8a5a2a'); for (let y = 19; y < 27; y += 2) d.rect(9, y, 12, 1, '#6a4020');  // ahşap ev
  d.poly([[7, 19], [15, 12], [23, 19]], '#f6f6f6'); d.poly([[8, 19], [15, 13.5], [22, 19], [21, 19]], '#e0e8f2');   // karlı çatı
  d.rect(12, 21, 3, 3, '#f6c84a'); d.rect(17, 22, 3, 5, '#5a3a1a');                                   // sıcak pencere, kapı
  d.rect(19, 12, 2, 4, '#5a3a2a'); [[20, 10], [21, 8], [20, 6]].forEach(([x, y]) => d.ell(x, y, 1.4, 1, '#a8a8b8'));   // baca, duman
  [[4, 25], [27, 24]].forEach(([x, y]) => { d.poly([[x, y - 6], [x - 2, y], [x + 2, y]], '#2a6a4a'); d.px(x, y - 5, '#f6f6f6').px(x - 1, y - 2, '#f6f6f6'); });
  return d.done(); };

A.lavanta = () => { const d = G(32, '#f6d8b8');
  d.ell(24, 7, 4, 4, '#ffe8a8'); d.ell(8, 4, 4, 1.4, '#ffffff');
  d.rect(0, 13, 32, 2, '#8aa86a');
  for (let i = 0; i < 6; i++){                                                                    // perspektifli sıralar
    const x0 = -6 + i * 8.5, y0 = 32, x1 = 10 + i * 2.4, y1 = 15;
    d.poly([[x0 - 2.5, y0], [x1 - 0.6, y1], [x1 + 0.6, y1], [x0 + 2.5, y0]], i % 2 ? '#8a5ac8' : '#9a6ad8');
    d.line(x0 + 3.5, y0, x1 + 1, y1, '#6a8a4a');
  }
  [[4, 30], [12, 29], [21, 30], [28, 28]].forEach(([x, y]) => d.px(x, y, '#c8a0f0'));
  return d.done(); };

A.kuzeyisiklari = () => { const d = G(32, '#0e1a30');
  [[2, 2], [9, 4], [22, 2], [29, 6], [5, 9], [26, 12]].forEach(([x, y]) => d.px(x, y, '#e8e8f6'));
  for (let x = 0; x < 32; x++){ const y = 10 + Math.round(Math.sin(x * 0.3) * 3);                 // ışık perdeleri
    d.rect(x, y - 5, 1, 4, '#2a8a6a'); d.rect(x, y - 2, 1, 3, '#4ae0a0'); d.px(x, y + 1, '#2a8a6a'); if (x % 3 === 0) d.px(x, y - 6, '#6a4aa8'); }
  d.poly([[0, 24], [8, 19], [15, 23], [23, 18], [32, 22], [32, 32], [0, 32]], '#d8e4f0');
  d.poly([[0, 32], [0, 27], [32, 25], [32, 32]], '#f2f6fc');
  [[5, 28], [27, 26]].forEach(([x, y]) => d.poly([[x, y - 5], [x - 2, y], [x + 2, y]], '#14302a'));
  return d.done(); };

A.pirincteras = () => { const d = G(32, '#bfe3f2');
  d.ell(6, 4, 4, 1.4, '#f6f6f6');
  const cs = ['#6ac03a', '#5ab030', '#4aa02a', '#6ac03a', '#5ab030', '#4aa02a', '#6ac03a'];
  for (let i = 0; i < 7; i++){ const y = 8 + i * 3.4, sh = Math.round(Math.sin(i * 0.9) * 2);    // basamaklar
    d.poly([[0, y + 2 + sh], [10, y + sh], [22, y + 1 - sh], [32, y - sh], [32, 32], [0, 32]], cs[i]);
    d.line(0, Math.round(y + 2 + sh), 10, Math.round(y + sh), '#3a7a24'); d.line(10, Math.round(y + sh), 22, Math.round(y + 1 - sh), '#3a7a24'); d.line(22, Math.round(y + 1 - sh), 32, Math.round(y - sh), '#3a7a24'); }
  for (let i = 0; i < 7; i++){ const y = Math.round(10 + i * 3.4); d.rect(3 + (i * 5) % 20, y, 3, 1, '#a8e0f0'); }   // tarlalardaki su parıltısı
  d.rect(0, 29, 32, 3, '#8ac8e8');
  d.ell(26, 6, 2.6, 3.4, '#2a7a3a'); d.rect(26, 9, 1, 2, '#6b4a1e');
  return d.done(); };

A.muska = () => { const d = G(32, LC);
  d.rect(0, 0, 32, 2, SR); d.rect(0, 30, 32, 2, SR);
  d.poly([[16, 4], [27, 20], [5, 20]], KZ); d.poly([[16, 8], [23.5, 18.5], [8.5, 18.5]], KR); d.poly([[16, 11], [20.6, 17.5], [11.4, 17.5]], KZ);   // muska üçgeni
  d.ell(16, 15.4, 1.2, 1.2, SR);
  [8, 12, 16, 20, 24].forEach((x, i) => { d.rect(x, 21, 1, 5, i % 2 ? SR : KR); d.rect(x - 1, 26, 3, 2, i % 2 ? SR : KR); });   // püsküller
  return d.done(); };

A.akrep = () => { const d = G(32, '#f2e2c0');
  d.rect(0, 0, 32, 3, YS); d.rect(0, 29, 32, 3, YS); for (let x = 2; x < 32; x += 5) { d.px(x, 1, KR); d.px(x, 30, KR); }
  const c = '#b8302a';
  d.rect(15, 9, 2, 14, c); d.poly([[16, 12], [20, 16], [16, 20], [12, 16]], c); d.poly([[16, 14], [18, 16], [16, 18], [14, 16]], SR);   // gövde ve göbek
  mirror(d, p => {
    for (let k = 0; k < 5; k++) p(14 - k, 12 - k, c); p(9, 7, c); p(8, 7, c); p(8, 8, c);             // üst kıskaçlar (kanca)
    for (let k = 0; k < 5; k++) p(14 - k, 20 + k, c); p(9, 25, c); p(8, 25, c); p(8, 24, c);          // alt bacaklar
    for (let k = 0; k < 4; k++) p(13 - k, 16, c); p(9, 15, c); p(9, 17, c);                            // yan bacaklar
  });
  d.rect(15, 5, 2, 4, c); d.rect(14, 5, 4, 1, c);                                                       // kuyruk ucu
  return d.done(); };
