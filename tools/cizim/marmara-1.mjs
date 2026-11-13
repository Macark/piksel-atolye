// Marmara resimleri 1: Balıkesir, Bilecik, Bursa, Çanakkale, Edirne, İstanbul
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2';

// BALIKESİR — Kuş Cenneti: sazlıklı göl, pelikanlar
A.kuscenneti = () => { const d = G(32, SKY);
  d.rect(0, 14, 32, 18, '#5aa6c4').rect(0, 14, 32, 1, '#7cc0d8');
  d.poly([[0, 14], [7, 11], [14, 14]], '#6f9a5a').poly([[18, 14], [26, 10], [32, 13], [32, 14]], '#6f9a5a');
  for (let x = 0; x < 32; x += 2) if (x < 9 || x > 24){ d.rect(x, 22 + (x % 3), 1, 10, '#5f8a3a'); d.rect(x, 21 + (x % 3), 1, 2, '#8a6a3a'); }
  // pelikan: beyaz gövde, uzun turuncu gaga ve altında sarı kese
  const pel = (x, y) => { d.ell(x, y, 3.5, 2, '#ffffff'); d.ell(x - 3, y - 2, 1.3, 1.3, '#ffffff'); d.rect(x - 3, y - 1, 1, 2, '#ffffff');
    d.rect(x - 8, y - 2, 5, 1, '#f2a33a'); d.rect(x - 7, y - 1, 3, 1, '#f7d36b'); d.px(x - 3, y - 3, '#2a2a2a'); d.rect(x + 1, y - 1, 3, 1, '#3a3a3a'); };
  pel(19, 20); pel(25, 26);
  // uçan kuşlar
  [[6, 5], [12, 3], [24, 6]].forEach(([x, y]) => { d.px(x - 1, y, '#3a3a3a').px(x, y + 1, '#3a3a3a').px(x + 1, y, '#3a3a3a').px(x - 2, y - 1, '#3a3a3a').px(x + 2, y - 1, '#3a3a3a'); });
  [[12, 28], [18, 30]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#9ad2e6'));
  return d.done(); };

// Balıkesir Höşmerim: kâsede şerbetli peynir tatlısı, ceviz
A.hosmerim = () => { const d = G(24, '#f3e9d8');
  d.ell(12, 15, 10, 6, '#7a8fa8').ell(12, 14, 9, 4.5, '#9fb2c6');                 // kâse
  d.ell(12, 13.5, 8, 3.6, '#e9c86a').ell(12, 13, 6.5, 2.6, '#f4dc8e');            // höşmerim
  [[9, 12], [13, 13], [15, 12], [11, 14], [8, 14]].forEach(([x, y]) => d.px(x, y, '#9a6a34'));
  d.ell(12, 13, 2, 1, '#fbecb4');
  d.rect(17, 4, 1, 8, '#c9cfd6').ell(17.5, 3.5, 1.5, 1.2, '#c9cfd6');                // kaşık
  return d.done(); };

// Ayvalık Zeytinyağı: şişe ve zeytin dalı
A.ayvalikzeytin = () => { const d = G(24, '#eef3e2');
  d.rect(9, 2, 3, 3, '#5a3a22').rect(8, 5, 5, 2, '#c4ccb8');
  d.ell(10.5, 14.5, 5, 8, '#c9d27a').ell(10.5, 16, 4, 6, '#b8b84a').ell(9, 12, 1, 3, '#e6eaa8');
  d.rect(7, 13, 7, 4, '#f6f2e2').rect(8, 14, 5, 2, '#5a7a3a');                      // etiket
  d.line(14, 20, 22, 9, '#6b5a3a');
  [[16, 17], [18, 14], [20, 11]].forEach(([x, y]) => d.poly([[x, y], [x + 3, y - 2], [x + 2, y + 1]], '#5a8a3a'));
  [[15, 15], [19, 17], [21, 13]].forEach(([x, y]) => d.ell(x + .5, y + .5, 1.2, 1.5, '#3a3a2a'));
  return d.done(); };

// BİLECİK — Ertuğrul Gazi Türbesi: sekizgen gövde, kubbe, servi ağaçları
A.ertugrulgazi = () => { const d = G(32, SKY);
  d.rect(0, 26, 32, 6, '#8fbf6a');
  d.rect(9, 14, 14, 13, '#efe6d2').rect(9, 14, 2, 13, '#d9cdb2').rect(21, 14, 2, 13, '#d9cdb2');
  d.ell(16, 14, 7, 6, '#6a8fb0', (x, y) => y < 14).rect(9, 13, 14, 1, '#c9bfa6');   // kurşun kubbe
  d.rect(15, 5, 2, 3, '#e0a526').px(16, 4, '#e0a526');                               // alem
  [12, 15, 18].forEach(x => { d.rect(x, 17, 2, 4, '#4a5a6a'); d.px(x, 17, '#efe6d2').px(x + 1, 17, '#efe6d2'); });
  d.rect(14, 22, 4, 5, '#6a4a2e').ell(16, 22, 2, 1.5, '#6a4a2e');
  [[4, 26], [28, 26]].forEach(([x, y]) => { d.ell(x, y - 7, 2, 7.5, '#2f6a3a'); d.ell(x - .5, y - 9, 1, 4, '#3f7a45'); d.rect(x, y, 1, 1, '#6b4a1e'); });
  return d.done(); };

// Osmaneli Ayva Lokumu: ayva ve lokumlar
A.ayvalokumu = () => { const d = G(24, '#fbf1e2');
  d.ell(8, 9, 5, 5.5, '#f2cf3a').ell(8, 7, 3, 2.5, '#f7e07a').ell(6.5, 7, 1, 1, '#fff2b0'); // ayva
  d.rect(8, 2, 1, 2, '#6b4a1e').poly([[9, 3], [13, 1], [12, 4]], '#5a8a3a');
  const cube = (x, y) => { d.rect(x, y, 4, 4, '#e8853a').rect(x, y, 4, 1, '#f7c08a').rect(x + 3, y + 1, 1, 3, '#c8642a'); d.px(x + 1, y + 1, '#fbe3c8'); };
  cube(12, 12); cube(17, 14); cube(13, 17); cube(7, 17);
  return d.done(); };

// Osmaneli Lefke Bezi: çizgili, katlanmış el dokuması bez
A.lefkebezi = () => { const d = G(24, '#e8dcc8');
  d.poly([[3, 6], [20, 4], [21, 18], [4, 20]], '#f8f3e6');
  for (let k = 0; k < 4; k++){ const y = 7 + k * 3.4; d.line(3, y, 20, y - 2, k % 2 ? '#2e5f9e' : '#c0392b'); d.line(3, y + 1, 20, y - 1, k % 2 ? '#2e5f9e' : '#c0392b'); }
  d.poly([[4, 20], [21, 18], [22, 21], [5, 22]], '#ddd3bd');                        // kıvrım
  for (let x = 5; x < 22; x += 2) d.px(x, 22, '#cbbf9e');
  return d.done(); };

// BURSA — Cumalıkızık: cumbalı renkli evler, Arnavut kaldırımı, Uludağ
A.cumalikizik = () => { const d = G(32, SKY);
  d.poly([[0, 12], [9, 4], [17, 9], [25, 3], [32, 8], [32, 14], [0, 14]], '#4f8a4a');
  const ev = (x, w, col, roof) => { d.rect(x, 12, w, 14, col); d.poly([[x - 1, 12], [x + w / 2, 8], [x + w + 1, 12]], roof); d.rect(x - 1, 17, w + 2, 6, col).rect(x - 1, 17, w + 2, 1, '#6b4a2e'); // cumba
    d.rect(x + 1, 13, 2, 3, '#4a3a2a').rect(x + w - 3, 13, 2, 3, '#4a3a2a').rect(x + 1, 19, 2, 3, '#4a3a2a').rect(x + w - 3, 19, 2, 3, '#4a3a2a'); for (let y = 12; y < 26; y += 4) d.rect(x, y, w, 1, '#8a6a4a'); };
  ev(1, 9, '#f2d36b', '#b5532e'); ev(11, 9, '#b68ac8', '#a8482a'); ev(22, 9, '#8fc49a', '#b5532e');
  d.rect(0, 26, 32, 6, '#a8a29a'); for (let y = 27; y < 32; y += 2) for (let x = (y % 4); x < 32; x += 4) d.rect(x, y, 2, 1, '#8a857e');
  return d.done(); };

// Bursa Döner (İskender): pide üstünde döner, domates sosu, yoğurt, tereyağı
A.iskender = () => { const d = G(24, '#f4e7cf');
  d.ell(12, 14, 11, 7.5, '#fbf8f0').ell(12, 14, 9.5, 6, '#efe8da');
  d.ell(11, 15, 7.5, 3.6, '#e2b56a');                                              // pide
  d.ell(10.5, 13, 6.5, 3, '#9a4a26'); for (let x = 5; x < 17; x += 2) d.px(x, 12 + (x % 3 ? 1 : 0), '#7a3418').px(x + 1, 13, '#b8643a'); // döner
  d.ell(10.5, 13, 6.8, 3.3, '#c0392b', (x, y, dx, dy) => dx * dx + dy * dy > 0.7);  // domates sosu
  d.ell(8, 12, 2, 0.9, '#f2c94c');                                                  // tereyağı
  d.ell(18.5, 15, 2.6, 2, '#ffffff').ell(18.5, 15, 1.4, 1, '#f2f2ea');              // yoğurt
  d.ell(16, 18.5, 2.5, 1, '#3f8a34'); d.ell(6, 18, 1.6, 1.4, '#d9382a');
  return d.done(); };

// Bursa Kestane Şekeri: parlak kestaneler, altın kâğıtta
A.kestanesekeri = () => { const d = G(24, '#f6ecdc');
  const cup = (x, y) => { d.poly([[x - 4, y], [x + 4, y], [x + 3, y + 4], [x - 3, y + 4]], '#e0a526'); for (let k = -3; k <= 3; k += 2) d.px(x + k, y + 1, '#c08a1a'); };
  const kest = (x, y) => { d.ell(x, y, 3.4, 3, '#7a3a1a'); d.ell(x - 1, y - 1, 1.2, 1, '#b8642e'); d.px(x - 2, y - 2, '#f0c08a'); d.px(x, y - 3, '#5a2a10'); };
  cup(7, 11); kest(7, 9); cup(16, 9); kest(16, 7); cup(12, 18); kest(12, 16);
  return d.done(); };

// ÇANAKKALE — Truva Atı: tekerlekli tahta at
A.truvaati = () => { const d = G(32, SKY);
  d.rect(0, 26, 32, 6, '#d8c08a');
  d.rect(6, 22, 20, 3, '#6b4a2a');                                                   // platform
  [9, 22].forEach(x => { d.ell(x, 26, 2.3, 2.3, '#4a3220'); d.px(x, 26, '#a8865a'); });
  d.rect(8, 13, 15, 8, '#b07a42');                                                   // gövde
  for (let y = 14; y < 21; y += 2) d.rect(8, y, 15, 1, '#97652f');
  [9, 13, 18, 21].forEach(x => d.rect(x, 20, 2, 3, '#97652f'));                      // bacaklar
  d.poly([[19, 14], [23, 5], [27, 6], [24, 15]], '#b07a42');                         // boyun
  d.poly([[23, 5], [29, 6], [29, 9], [25, 9]], '#c08a50');                           // baş
  d.px(26, 7, '#2a1d14'); d.poly([[22, 6], [24, 4], [23, 8]], '#7a4a22');             // göz, yele
  d.line(19, 9, 22, 4, '#7a4a22'); d.line(8, 14, 5, 18, '#7a4a22');                  // yele, kuyruk
  d.rect(12, 16, 4, 3, '#6b4a2a');                                                   // gizli kapak
  return d.done(); };

// Ezine Peyniri: beyaz peynir kalıbı, dilimler, zeytin
A.ezine = () => { const d = G(24, '#dfe9ee');
  d.rect(2, 16, 20, 4, '#b9895a').rect(2, 16, 20, 1, '#d1a374');                    // tahta
  d.rect(4, 8, 10, 8, '#fbfaf2').rect(4, 8, 10, 1, '#ffffff').rect(13, 8, 1, 8, '#e6e2d2');
  [[6, 10], [9, 12], [11, 10], [7, 13]].forEach(([x, y]) => d.px(x, y, '#ebe7d6'));
  d.poly([[15, 11], [20, 10], [20, 16], [15, 16]], '#f7f5ea').line(15, 11, 20, 10, '#ffffff');
  [[17, 7], [20, 6]].forEach(([x, y]) => { d.ell(x, y, 1.4, 1.7, '#3a3a2a'); d.px(x - 1, y - 1, '#6a6a4a'); });
  return d.done(); };

// Çanakkale Şehitler Abidesi: dört ayaklı anıt, bayrak, gelincikler
A.sehitlerabidesi = () => { const d = G(32, '#c9e6f4');
  d.rect(0, 25, 32, 7, '#6f9a52');
  d.rect(9, 7, 14, 4, '#c8c2b6').rect(9, 7, 14, 1, '#ddd8cc');                       // üst blok
  d.rect(9, 11, 4, 15, '#b5ae9f').rect(19, 11, 4, 15, '#b5ae9f').rect(9, 11, 1, 15, '#cfc8ba').rect(19, 11, 1, 15, '#cfc8ba');
  d.rect(7, 25, 18, 2, '#a8a294');
  d.rect(25, 4, 1, 21, '#7a7a7a').map(26, 4, ['RRRRRR', 'RWWRRR', 'RWRRWR', 'RWWRRR', 'RRRRRR'], { R:'#e30a17', W:'#ffffff' });  // bayrak
  [[3, 28], [6, 30], [14, 29], [21, 30], [28, 28], [24, 29]].forEach(([x, y]) => { d.px(x, y, '#d9302a').px(x, y + 1, '#3f7a34'); });
  return d.done(); };

// EDİRNE — Selimiye: büyük kubbe, dört ince minare
A.selimiye = () => { const d = G(32, '#c6e4f4');
  d.rect(0, 27, 32, 5, '#8fbf6a');
  d.rect(7, 18, 18, 9, '#e9dcc0').rect(7, 18, 18, 1, '#f5ead2');
  d.ell(16, 18, 8, 7, '#6f8ea8', (x, y) => y < 18); d.ell(14, 14, 2, 2, '#8eaac0', (x, y) => y < 18); // kubbe
  [[9, 18], [23, 18]].forEach(([x, y]) => d.ell(x, y, 2.5, 2, '#7f9db5', (X, Y) => Y < 18));
  d.rect(15, 9, 2, 2, '#e0a526');
  [3, 6, 25, 28].forEach(x => { d.rect(x, 6, 1, 21, '#f2ead8'); d.poly([[x - 0.5, 6], [x + 0.5, 1], [x + 1.5, 6]], '#6f8ea8'); d.px(x, 14, '#c9bfa6').px(x, 20, '#c9bfa6'); });
  [10, 14, 18, 21].forEach(x => d.rect(x, 21, 1, 3, '#4a5a6a'));
  d.rect(14, 23, 4, 4, '#6a4a2e');
  return d.done(); };

// Edirne Tava Ciğeri: ince dilim kızarmış ciğer, kuru biber, soğan
A.tavaciger = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 13, 11, 8, '#fbf8f0').ell(12, 13, 9.5, 6.5, '#ece4d4');
  [[6, 10], [10, 9], [14, 10], [8, 13], [12, 12], [16, 13], [10, 15]].forEach(([x, y]) => { d.rect(x - 2, y, 4, 2, '#7a3a1a'); d.rect(x - 2, y, 4, 1, '#a8562a'); });
  [[17, 17], [5, 16]].forEach(([x, y]) => { d.ell(x, y, 2.6, 1.2, '#b8241a'); d.px(x - 1, y - 1, '#e05a3a'); });
  d.ell(12, 18, 3, 1.2, '#f2e0ec'); d.ell(12, 18, 1.5, 0.6, '#d8b0c8');
  return d.done(); };

// Edirne Meyve Sabunu: meyve biçimli sabunlar
A.meyvesabunu = () => { const d = G(24, '#eaf2f4');
  d.ell(6, 9, 3.4, 3.6, '#e84a5a').poly([[4, 6], [6, 4], [8, 6]], '#4ea34a'); [[5, 9], [7, 10], [6, 11], [5, 7]].forEach(([x, y]) => d.px(x, y, '#ffd8a0'));  // çilek
  d.ell(17, 8, 3.6, 3.6, '#e2443a').rect(17, 3, 1, 2, '#6b4a1e').px(18, 4, '#4ea34a').px(16, 7, '#ff9a8a'); // elma
  d.poly([[3, 18], [7, 15], [14, 15], [17, 18], [14, 17], [7, 17]], '#f5d23a').px(17, 18, '#6b4a1e'); // muz
  d.ell(19, 17, 2.8, 3.4, '#a8cf4a').ell(19, 14, 1.8, 1.8, '#a8cf4a').rect(19, 11, 1, 2, '#6b4a1e'); // armut
  d.ell(11, 10.5, 2.6, 2.6, '#f0a030').px(10, 9, '#fbd08a');                         // portakal
  return d.done(); };

// İSTANBUL — Ayasofya: büyük kubbe, payandalar, dört minare
A.ayasofya = () => { const d = G(32, '#cbe6f4');
  d.rect(0, 27, 32, 5, '#8fbf6a');
  d.rect(5, 17, 22, 10, '#d99a7a').rect(5, 17, 22, 1, '#e8b496');                  // gövde (pembe-kiremit)
  d.ell(16, 17, 8, 6.5, '#8a8e96', (x, y) => y < 17); d.rect(8, 16, 16, 1, '#c27a5a');
  d.ell(9, 17, 3, 2.5, '#9a9ea6', (x, y) => y < 17); d.ell(23, 17, 3, 2.5, '#9a9ea6', (x, y) => y < 17);
  d.rect(15, 9, 2, 2, '#e0a526');
  [[2, 2], [29, 2]].forEach(([x]) => { d.rect(x, 7, 2, 20, '#e9dcc0'); d.poly([[x - 0.5, 7], [x + 1, 2], [x + 2.5, 7]], '#6f7f8a'); });
  [[4, 1], [27, 1]].forEach(([x]) => { d.rect(x, 10, 1, 17, '#efe4cc'); d.poly([[x - 0.5, 10], [x + 0.5, 6], [x + 1.5, 10]], '#6f7f8a'); });
  [8, 12, 16, 20, 23].forEach(x => d.rect(x, 20, 2, 3, '#5a4a4a'));
  return d.done(); };

// Kapalıçarşı: kemerli koridor, renkli lambalar, dükkânlar
A.kapalicarsi = () => { const d = G(32, '#e9d9b8');
  for (let k = 0; k < 4; k++){ const m = k * 3; d.ell(16, 12 + m, 15 - m * 1.6, 11 - m, k % 2 ? '#c9a87a' : '#d9b98a', (x, y) => y < 12 + m); }
  d.rect(0, 12, 32, 20, '#d9b98a');
  d.rect(0, 12, 6, 16, '#8a5a3a').rect(26, 12, 6, 16, '#8a5a3a');                    // dükkân kapıları
  [[1, 14], [27, 14]].forEach(([x, y]) => { d.rect(x, y, 4, 3, '#c0392b'); d.rect(x, y + 4, 4, 3, '#2e5f9e'); d.rect(x, y + 8, 4, 3, '#e0a526'); });
  d.poly([[6, 28], [26, 28], [20, 18], [12, 18]], '#b8a07a');                         // zemin (derinlik)
  d.rect(12, 14, 8, 4, '#f4e2bc');                                                   // uzaktaki ışık
  [[9, 6, '#c0392b'], [16, 4, '#2e9e8a'], [23, 6, '#e0a526']].forEach(([x, y, c]) => { d.rect(x, 0, 1, y, '#6b4a2e'); d.ell(x, y + 2, 1.8, 2, c); d.px(x, y + 1, '#fff2c0'); });
  return d.done(); };

// Şile Bezi: ince pamuklu bez, kenarı işlemeli
A.silebezi = () => { const d = G(24, '#dfe8ee');
  d.rect(3, 3, 18, 18, '#fbfaf4');
  for (let y = 4; y < 21; y += 2) d.rect(3, y, 18, 1, '#f1efe4');                    // ince dokusu
  for (let x = 3; x < 21; x += 3){ d.px(x + 1, 17, '#c0392b').px(x, 18, '#4ea34a').px(x + 2, 18, '#4ea34a').px(x + 1, 19, '#c0392b'); } // işleme
  for (let x = 3; x < 21; x += 2) d.px(x, 21, '#e8e4d6');                            // saçak
  d.rect(3, 3, 18, 1, '#e6e2d4');
  return d.done(); };
