// Doğu Anadolu resimleri 2: Elazığ, Erzincan, Erzurum
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', DGR = '#2f6a3a';

// ELAZIĞ — Harput Kalesi (Süt Kalesi)
A.harput = () => { const d = G(32, SKY);
  d.poly([[0, 24], [6, 16], [26, 14], [32, 22], [32, 32], [0, 32]], '#a8946a');
  d.rect(5, 9, 22, 8, '#c9b08a'); for (let x = 5; x < 27; x += 2) d.px(x, 8, '#c9b08a');
  [[5, 5], [15, 4], [24, 6]].forEach(([x, y]) => { d.rect(x, y, 4, 12, '#b89c74'); d.px(x, y - 1, '#b89c74').px(x + 2, y - 1, '#b89c74'); d.rect(x + 1, y + 3, 2, 2, '#5a4632'); });
  d.rect(2, 22, 6, 5, '#fbfaf4'); d.rect(2, 21, 6, 1, '#d9d4c4'); d.rect(3, 23, 4, 1, '#e8e4d8'); d.ell(5, 21.5, 2, 0.6, '#ffffff');   // süt kovası
  d.rect(0, 28, 32, 4, '#8a7a5a');
  return d.done(); };

// Hazar Gölü: dağlar arasında mavi göl
A.hazar = () => { const d = G(32, SKY);
  d.poly([[0, 16], [8, 6], [16, 12], [24, 5], [32, 14], [32, 20], [0, 20]], '#9a8a6a');
  d.poly([[6, 9], [8, 6], [10, 9]], '#f6f8fa').poly([[22, 8], [24, 5], [26, 8]], '#f6f8fa');
  d.rect(0, 18, 32, 14, '#2e7dba'); d.rect(0, 18, 32, 1, '#5aa8d8'); [[4, 22], [20, 26], [10, 29]].forEach(([x, y]) => d.rect(x, y, 5, 1, '#8fc8f0'));
  d.poly([[18, 22], [26, 22], [24, 24], [19, 24]], '#f6efe0'); d.rect(22, 16, 1, 6, '#6b4a2a'); d.poly([[23, 16], [27, 20], [23, 21]], '#ffffff');   // yelkenli
  return d.done(); };

// Elazığ Öküzgözü Üzümü: iri, koyu tanalı salkım
A.okuzgozu = () => { const d = G(24, '#f2eadc');
  d.rect(11, 1, 2, 4, '#6b4a1e'); d.poly([[13, 2], [20, 0], [21, 6], [15, 6]], '#5a9a3a').line(14, 3, 20, 2, '#3f7a2a');
  const g = [[8, 7], [12, 7], [16, 7], [10, 11], [14, 11], [18, 11], [8, 11], [12, 15], [16, 15], [10, 15], [14, 19], [11, 19]];
  g.forEach(([x, y]) => { d.ell(x, y, 2.1, 2.1, '#3a1a3a'); d.ell(x - 0.4, y - 0.4, 1.4, 1.4, '#5a2a5a'); d.px(x - 1, y - 1, '#a87aa8'); });
  return d.done(); };

// ERZİNCAN — Girlevik Şelalesi: kışın donan şelale
A.girlevik = () => { const d = G(32, '#dfeaf0');
  d.poly([[0, 4], [32, 6], [32, 32], [0, 32]], '#8a7a6a');
  d.poly([[10, 4], [22, 5], [23, 26], [9, 26]], '#6a5a4a');
  for (let x = 12; x < 21; x += 2) { const h = 14 + (x * 3) % 8; d.rect(x, 5, 2, h, '#d8eef8'); d.px(x, 5 + h, '#ffffff'); d.rect(x, 6, 1, h - 2, '#ffffff'); }   // buz sütunları
  d.ell(16, 28, 11, 3.4, '#bfe3f2'); d.ell(16, 27, 6, 1.4, '#ffffff');
  d.rect(0, 0, 32, 3, '#f2f6f8'); [[3, 12], [27, 14], [5, 22]].forEach(([x, y]) => d.ell(x, y, 2, 1, '#f2f6f8'));
  return d.done(); };

// Erzincan Tulum Peyniri: tulum ve beyaz peynir parçaları
A.tulum = () => { const d = G(24, '#f4ead8');
  d.rect(0, 18, 24, 6, '#a8703a').rect(0, 18, 24, 1, '#c08a50');
  d.ell(8, 11, 6, 7, '#b8865a'); d.ell(7, 10, 4, 5, '#d0a070'); d.rect(6, 2, 4, 3, '#8a5a2b'); d.rect(5, 4, 6, 1, '#6b4a2a');   // tulum
  d.ell(17, 15, 5, 3, '#fbf8ee'); d.ell(16, 14, 2, 1, '#ffffff'); [[15, 15], [19, 14], [17, 16]].forEach(([x, y]) => d.px(x, y, '#e8e0cc'));   // peynir
  d.line(20, 7, 22, 12, '#c9cfd6'); d.rect(19, 5, 2, 2, '#6b4a2a');
  return d.done(); };

// Kemaliye Taş Yolu: kayaya oyulmuş tünellerden geçen yol
A.kemaliye = () => { const d = G(32, SKY);
  d.poly([[0, 0], [14, 0], [12, 32], [0, 32]], '#a8846a'); d.poly([[32, 0], [18, 0], [20, 32], [32, 32]], '#9a7a5a');
  d.poly([[14, 0], [18, 0], [20, 32], [12, 32]], SKY); d.rect(13, 26, 6, 6, '#4f9ac8'); d.rect(14, 28, 2, 1, '#8fc8f0');   // Fırat
  d.rect(0, 14, 14, 3, '#8a7a5a');                                                                            // yol
  [0, 4.5, 9].forEach(x => { d.rect(x, 11, 3, 3, '#2a2018'); d.px(x + 1, 10, '#2a2018'); d.rect(x + 3, 10, 1.5, 4, '#a8846a'); });   // ard arda tüneller
  d.rect(0, 13, 14, 1, '#6a5a44');
  d.rect(24, 18, 8, 2, '#8a7a5a'); d.ell(27, 16, 2, 2, '#3a2e22', (a, b) => b < 17); d.rect(25, 17, 4, 1, '#3a2e22');
  return d.done(); };

// ERZURUM — Çifte Minareli Medrese
A.ciftemin = () => { const d = G(32, SKY);
  d.rect(0, 27, 32, 5, '#c9c4b8');
  d.rect(4, 14, 24, 13, '#c09a7a'); d.rect(4, 14, 24, 1, '#a8826a');
  d.rect(12, 10, 8, 17, '#b08a6a'); d.ell(16, 18, 3, 3, '#5a4632', (x, y) => y < 18); d.rect(13, 18, 6, 9, '#5a4632');   // taç kapı
  for (let y = 11; y < 26; y += 2) { d.px(12, y, '#8a6a4a'); d.px(19, y, '#8a6a4a'); }
  [[7, 1], [23, 1]].forEach(([x, y]) => { d.rect(x, y + 2, 3, 12, '#a87a5a'); for (let k = y + 3; k < y + 14; k += 3) d.rect(x, k, 3, 1, '#2e7dba'); d.poly([[x - 0.5, y + 2], [x + 1.5, y], [x + 3.5, y + 2]], '#8a5a3a'); });   // çini süslü minareler
  return d.done(); };

// Cağ Kebabı: yatay şişte pişen kebap, şişten porsiyon
A.cagkebabi = () => { const d = G(24, '#2a2420');
  d.rect(0, 0, 24, 3, '#5a3a22');
  d.rect(2, 4, 3, 12, '#f08a2a'); d.rect(2, 4, 1, 12, '#f6d36b'); d.rect(1, 3, 5, 1, '#3a3a3a').rect(1, 16, 5, 1, '#3a3a3a');   // odun ateşi
  d.ell(14, 10, 8, 3.6, '#8a4422'); d.ell(13, 9, 6, 2, '#b8642e'); for (let x = 8; x < 21; x += 3) d.px(x, 11, '#5a2a10');       // yatay döner
  d.line(4, 10, 23, 10, '#c9cfd6');
  d.ell(12, 20, 9, 2.6, '#fbf8f0'); d.ell(12, 19.5, 6, 1.4, '#e0a858'); d.line(6, 19, 18, 19, '#c9cfd6');                   // şişte porsiyon (lavaş)
  [[9, 19], [12, 19], [15, 19]].forEach(([x, y]) => d.px(x, y, '#8a4422'));
  return d.done(); };

// Oltu Taşı: siyah parlak taştan tespih
A.oltutasi = () => { const d = G(24, '#e8dcc4');
  for (let k = 0; k < 22; k++){ const a = k / 22 * Math.PI * 2, x = 12 + Math.cos(a) * 7, y = 10 + Math.sin(a) * 6; d.ell(x, y, 1.3, 1.3, '#1a1a1e'); d.px(x - 0.5, y - 0.5, '#6a6a7a'); }
  d.rect(11, 16, 2, 3, '#1a1a1e'); d.px(11, 17, '#6a6a7a'); d.rect(10, 19, 4, 2, '#1a1a1e'); d.rect(11, 21, 2, 3, '#3a3a40');   // imame ve püskül
  d.rect(17, 18, 4, 3, '#2a2a30'); d.px(18, 18, '#8a8a9a');                                                 // ham taş
  return d.done(); };
