// Karadeniz hatıraları (16x16, krem zemin) ve rehber Çaycı Zeynep
import { G } from './grid.mjs';
const BG = '#e8d5b0';
const S0 = (rows, cmap) => () => G(16, BG).map(0, 0, rows.map(r => r.padEnd(16, '.').slice(0, 16)), cmap).done();
const D = f => () => { const d = G(16, BG); f(d); return d.done(); };
// çerçeveli magnet: içine küçük resim
const mag = f => D(d => { d.rect(2, 3, 12, 10, '#6a4a2e'); d.rect(3, 4, 10, 8, '#bfe3f2'); f(d); });
const kavanoz = (c, c2) => D(d => { d.rect(5, 3, 6, 2, '#c0392b'); d.rect(4, 5, 8, 9, '#dfe8ee'); d.rect(5, 6, 6, 7, c); d.rect(5, 6, 6, 1, c2); d.px(6, 8, c2); d.rect(5, 9, 6, 2, '#f6efe0'); });
export const S = {};
const E = '................';

// Amasya
S.kralkaya = mag(d => { d.rect(3, 4, 10, 8, '#b8a07a'); d.rect(5, 6, 3, 5, '#4a3828'); d.rect(9, 6, 3, 5, '#4a3828'); d.rect(3, 11, 10, 1, '#4f9ac8'); });   // kral mezarı magneti
S.yaliboyu = D(d => { d.rect(4, 6, 8, 7, '#f2e6c8'); d.poly([[3, 6], [8, 2], [13, 6]], '#a8482a'); d.rect(3, 9, 10, 1, '#6b4a2a'); d.rect(5, 7, 2, 2, '#4a6a8a').rect(9, 7, 2, 2, '#4a6a8a'); d.rect(7, 10, 2, 3, '#6b4a2a'); d.rect(3, 13, 10, 1, '#8a7a62'); });   // ahşap ev biblosu
S.amasyaelma = D(d => { d.ell(9, 10, 4, 3.6, '#d9382a'); d.ell(8, 9, 1.2, 1, '#f6a0a0'); d.rect(9, 5, 1, 2, '#6b4a1e'); d.ell(5, 4, 2, 2, '#c9cfd6'); d.ell(5, 4, 1, 1, BG); d.line(6, 5, 8, 6, '#c9cfd6'); });   // elma anahtarlık
// Artvin
S.karagol = D(d => { d.rect(2, 3, 12, 10, '#fbfaf4'); d.rect(3, 4, 10, 8, '#bfe3f2'); d.rect(3, 7, 10, 5, '#3f7a45'); d.ell(8, 10, 4, 1.6, '#3a7a8a'); d.px(4, 6, '#2f6a3a').px(11, 6, '#2f6a3a'); });   // kartpostal
S.yusufeli = D(d => { d.ell(8, 9, 6, 5, '#e8384f', (x, y) => y < 10); d.rect(2, 9, 12, 2, '#c02a3f'); d.rect(5, 5, 2, 1, '#f6efe0').rect(9, 5, 2, 1, '#f6efe0'); d.rect(4, 11, 1, 2, '#3a3a3a').rect(11, 11, 1, 2, '#3a3a3a'); });   // rafting kaskı
S.kafkasari = D(d => { d.rect(3, 4, 10, 9, '#6a4a2e'); d.rect(4, 5, 8, 7, '#f6d36b'); d.ell(8, 8.5, 2.6, 1.6, '#e0a526'); d.px(7, 8, '#2a2420').px(9, 8, '#2a2420'); d.ell(7, 6.6, 1.2, 0.9, '#ffffff').ell(9, 6.6, 1.2, 0.9, '#ffffff'); });   // arı magneti
// Bartın
S.amasra = D(d => { d.ell(10, 5, 2.6, 3.4, '#a8703a'); d.ell(10, 5, 1.6, 2.4, '#c08a50'); d.line(9, 8, 4, 14, '#a8703a'); d.line(10, 8, 5, 14, '#8a5a2b'); });   // ahşap kaşık
S.guzelcehisar = D(d => { [[4, 5, 9], [6, 4, 10], [8, 6, 8], [10, 5, 9]].forEach(([x, y, h], i) => d.rect(x, y, 2, h, i % 2 ? '#4a4a52' : '#5a5a64')); d.rect(3, 13, 10, 1, '#3a3a42'); });   // bazalt taşı
S.bartinagda = D(d => { d.rect(3, 6, 10, 7, '#3a6aa8'); d.rect(3, 5, 10, 2, '#6a9ad0'); [[5, 9], [8, 10], [11, 9]].forEach(([x, y]) => d.ell(x, y, 1.4, 1.2, '#fbfaf4')); d.rect(7, 4, 2, 1, '#e0a526'); });   // şeker kutusu
// Bayburt
S.bayburtkale = mag(d => { d.rect(3, 8, 10, 4, '#a8946a'); d.rect(4, 6, 2, 3, '#c4a878').rect(7, 5, 2, 4, '#c4a878').rect(10, 6, 2, 3, '#c4a878'); d.rect(3, 11, 10, 1, '#4f9ac8'); });   // kale magneti
S.baksi = D(d => { d.rect(3, 3, 10, 11, '#a8321e'); d.rect(4, 4, 8, 9, '#c0402a'); [[8, 5], [6, 8], [10, 8], [8, 11]].forEach(([x, y]) => { d.px(x, y, '#f2c14a'); d.px(x - 1, y, '#2e5f9e'); d.px(x + 1, y, '#2e5f9e'); }); for (let x = 3; x < 13; x += 2) d.px(x, 14, '#c9a868'); });   // dokuma kilim
S.lordolmasi = S0([E, E, E, E, E, '...gggggggggg...', '..gwwwwwwwwwwg..', '..gwwWWwwWWwwg..', '...gwwwwwwwwg...', '....gggggggg....', E, E, E, E, E, E], { g:'#8a5a2b', w:'#fbfaf4', W:'#f2e6c8' });   // kaymak kâsesi
// Bolu
S.abant = D(d => { d.rect(3, 7, 7, 4, '#c0392b'); d.rect(4, 5, 5, 2, '#3a3a3a'); d.ell(5, 12, 1.6, 1.6, '#3a3a3a').ell(9, 12, 1.6, 1.6, '#3a3a3a'); d.rect(10, 9, 3, 1, '#8a5a2b'); d.rect(12, 7, 2, 4, '#8a5a3a'); d.px(13, 6, '#8a5a3a'); });   // fayton biblosu
S.yedigoller = D(d => { d.poly([[8, 2], [12, 6], [11, 11], [8, 13], [5, 11], [4, 6]], '#d9822a'); d.line(8, 3, 8, 14, '#8a4a1a'); d.line(8, 7, 11, 5, '#8a4a1a').line(8, 7, 5, 5, '#8a4a1a').line(8, 10, 11, 8, '#8a4a1a').line(8, 10, 5, 8, '#8a4a1a'); });   // sonbahar yaprağı
S.mengen = D(d => { d.ell(8, 5, 3, 2.4, '#ffffff'); d.ell(5, 6, 2.4, 2, '#ffffff'); d.ell(11, 6, 2.4, 2, '#ffffff'); d.rect(5, 7, 7, 5, '#f2f2ee'); d.rect(5, 11, 7, 1, '#c9c9c4'); d.px(6, 4, '#d9d9d4').px(10, 5, '#d9d9d4'); });   // aşçı şapkası
// Çorum
S.hattusa = D(d => { d.rect(3, 12, 10, 2, '#8a7454'); d.ell(6, 6, 3, 3, '#d9c49a'); d.ell(6, 6, 2, 2, '#e8d8b0'); d.px(7, 5, '#3a2e22'); d.rect(5, 8, 6, 4, '#d9c49a'); d.rect(10, 8, 2, 4, '#c9b48a'); d.rect(5, 11, 1, 1, '#8a7454').rect(10, 11, 1, 1, '#8a7454'); });   // hitit aslanı biblosu
S.leblebi = D(d => { d.poly([[4, 6], [12, 6], [13, 14], [3, 14]], '#c9a868'); d.rect(5, 4, 6, 2, '#a8864a'); d.rect(5, 6, 6, 1, '#c0392b'); [[6, 9], [9, 10], [7, 12], [10, 12]].forEach(([x, y]) => d.ell(x, y, 1, 1, '#e8c06a')); });   // leblebi kesesi
S.guneskursu = D(d => { d.line(3, 1, 8, 6, '#6b4a2a').line(13, 1, 8, 6, '#6b4a2a'); d.ell(8, 12, 5, 5, '#b8803a', (x, y) => y < 12); d.ell(8, 12, 3.5, 3.5, BG, (x, y) => y < 12); d.line(6, 9, 10, 11, '#c08a4a').line(10, 9, 6, 11, '#c08a4a'); d.rect(4, 12, 8, 1, '#8a5a2b'); });   // güneş kursu kolye
// Düzce
S.guzeldere = D(d => { d.rect(6, 2, 4, 2, '#3a3a3a'); d.ell(8, 9, 4, 5, '#4f8a6a'); d.ell(7, 8, 1.4, 3, '#6aaa8a'); d.rect(5, 6, 6, 1, '#3a5a4a'); d.line(4, 4, 6, 3, '#6b4a2a'); });   // su matarası
S.konuralp = D(d => { d.ell(8, 8, 5, 5, '#c9a227'); d.ell(8, 8, 4, 4, '#e0b84a'); d.ell(8, 7, 1.6, 2, '#a8861a'); d.rect(7, 9, 2, 2, '#a8861a'); [[4, 8], [12, 8], [8, 4], [8, 12]].forEach(([x, y]) => d.px(x, y, '#a8861a')); });   // antik sikke
S.akcakoca = D(d => { d.rect(7, 3, 2, 9, '#5a5e66'); d.ell(8, 3, 1.6, 1.6, '#5a5e66'); d.ell(8, 3, 0.7, 0.7, BG); d.rect(5, 5, 6, 1, '#5a5e66'); d.ell(8, 11, 5, 3, '#5a5e66', (x, y) => y > 11); d.px(3, 11, '#5a5e66').px(12, 11, '#5a5e66'); });   // çapa magneti
// Giresun
S.giresunadasi = D(d => { d.poly([[2, 9], [14, 9], [12, 13], [4, 13]], '#c0392b'); d.rect(2, 9, 12, 1, '#8a2a1e'); d.rect(5, 11, 6, 1, '#f6efe0'); d.rect(8, 3, 1, 6, '#6b4a2a'); d.poly([[9, 3], [12, 6], [9, 7]], '#fbfaf4'); });   // kayık biblosu
S.tombulfindik = kavanoz('#a8642e', '#c8844a');   // fındık kavanozu
S.kumbet = S0([E, '......rrrr......', '......rwwr......', '......rrrr......', '......wwww......', '......rrrr......', '......wwww......', '......rrrr......', '......wwwwww....', '......rrrrrrr...', '.......rrrrr....', E, E, E, E, E], { r:'#c0392b', w:'#fbfaf4' });   // yün çorap
// Gümüşhane
S.karaca = D(d => { d.rect(4, 6, 8, 5, '#3a3e46'); d.rect(12, 5, 2, 7, '#5a5e66'); d.ell(13, 8, 1.2, 2.6, '#f6d36b'); d.rect(5, 4, 4, 2, '#5a5e66'); d.rect(5, 7, 6, 1, '#8a8e96'); });   // el feneri
S.pestil = D(d => { d.rect(3, 5, 10, 8, '#8a4a2a'); d.rect(3, 5, 10, 1, '#a85a32'); d.rect(5, 8, 6, 3, '#f6efe0'); d.rect(6, 9, 4, 1, '#8a4a2a'); d.px(4, 12, '#6a3418').px(11, 7, '#6a3418'); });   // pestil paketi
S.tomara = D(d => { d.ell(8, 7, 6, 4, '#2e7dba', (x, y) => y < 7); for (let x = 3; x < 14; x += 3) d.px(x, 6, '#5aa0d8'); d.rect(8, 7, 1, 6, '#3a3a3a'); d.px(7, 13, '#3a3a3a').px(6, 12, '#3a3a3a'); });   // şemsiye
// Karabük
S.safranbolu = D(d => { d.ell(7, 10, 4, 3.4, '#c87a3a'); d.ell(6, 9, 1.4, 1.2, '#e8a060'); d.rect(5, 5, 4, 3, '#c87a3a'); d.rect(4, 5, 6, 1, '#a85a28'); d.line(10, 9, 13, 6, '#8a4a1a'); d.line(10, 10, 13, 7, '#8a4a1a'); });   // bakır cezve
S.safran = D(d => { d.rect(6, 3, 4, 2, '#8a5a2b'); d.rect(5, 5, 6, 8, '#eef2f4'); d.rect(6, 7, 4, 5, '#d9382a'); d.px(7, 8, '#e8a526').px(8, 10, '#e8a526'); d.rect(5, 13, 6, 1, '#c9cfd6'); });   // safran şişesi
S.demircelik = S0([E, E, E, '......yyyy......', '....yyyyyyyy....', '...yyyyyyyyyy...', '...yyyyYYyyyy...', '...yyyyyyyyyy...', '..yyyyyyyyyyyy..', '.bbbbbbbbbbbbbb.', E, E, E, E, E, E], { y:'#f2c14a', Y:'#fbe08a', b:'#c9a227' });   // baret
// Kastamonu
S.mahmutbey = D(d => { d.rect(2, 3, 12, 10, '#8a5a2b'); d.rect(3, 4, 10, 8, '#c08a50'); [[5, 6], [8, 6], [11, 6], [6, 9], [10, 9]].forEach(([x, y]) => { d.px(x, y, '#c0392b'); d.px(x - 1, y + 1, '#2e5f9e'); d.px(x + 1, y + 1, '#2e5f9e'); d.px(x, y + 1, '#e0a526'); }); });   // ahşap oyma pano
S.sarimsak = D(d => { d.line(8, 1, 8, 4, '#c9a868'); [[6, 6], [10, 7], [7, 10], [10, 12]].forEach(([x, y]) => { d.ell(x, y, 2.6, 2.6, '#b8a07a'); d.ell(x, y, 2.1, 2.1, '#fbfaf4'); d.line(x, y - 2, x, y + 1, '#c9b48a'); d.px(x + 1, y + 1, '#d8b8c8'); }); });   // sarımsak örgüsü
S.horma = D(d => { d.line(5, 2, 11, 14, '#8a5a2b'); d.line(6, 2, 12, 14, '#a8703a'); d.rect(4, 1, 3, 2, '#6b4a2a'); d.rect(5, 5, 2, 2, '#c0392b'); });   // yürüyüş bastonu
// Ordu
S.boztepe = mag(d => { d.rect(3, 9, 10, 3, '#2e7dba'); d.rect(3, 8, 10, 1, '#4f8a4a'); d.line(3, 6, 12, 4, '#3a3a3a'); d.rect(6, 6, 3, 3, '#e03a3a'); d.px(7, 7, '#bfe3f2'); });   // teleferik magneti
S.yason = D(d => { d.poly([[2, 12], [8, 3], [14, 12]], '#e8a888'); d.poly([[3, 11], [8, 4], [13, 11]], '#f6c8a8'); for (let k = 0; k < 5; k++) d.line(8, 4, 3 + k * 2.5, 12, '#c0785a'); d.rect(2, 12, 12, 1, '#c0785a'); });   // deniz kabuğu
S.cambasi = D(d => { d.ell(8, 7, 5, 5, '#d8eef8'); d.ell(8, 9, 3.4, 1.4, '#ffffff'); d.rect(7, 5, 2, 3, '#2f6a3a'); d.px(8, 4, '#2f6a3a'); [[5, 5], [10, 4], [11, 7]].forEach(([x, y]) => d.px(x, y, '#ffffff')); d.rect(4, 12, 8, 2, '#8a5a2b'); });   // kar küresi
// Rize
S.cay = S0([E, E, '....gggggggg....', '....grrrrrrg....', '....grrrrrrg....', '.....grrrrg.....', '......grrg......', '.....grrrrg.....', '....grrrrrrg....', '....grrrrrrg....', '....gggggggg....', '...pppppppppp...', '....pppppppp....', E, E, E], { g:'#e8eef2', r:'#b8321e', p:'#c9a227' });   // çay bardağı
S.ayder = kavanoz('#e0a526', '#f6d36b');   // anzer balı kavanozu
S.zilkale = D(d => { d.ell(5, 5, 3, 3, '#8a7a5a'); d.ell(5, 5, 1.6, 1.6, BG); d.rect(7, 5, 7, 2, '#8a7a5a'); d.rect(11, 7, 1, 3, '#8a7a5a').rect(13, 7, 1, 2, '#8a7a5a'); });   // eski anahtar
// Samsun
S.bandirma = S0([E, '.p..............', '.prrrrrrrrrrrrr.', '.prrrwwwrrrrrrr.', '.prrwwrrrrrrrrr.', '.prwwrrrrrrwrrr.', '.prwwrrrrrwwwrr.', '.prwwrrrrrrwrrr.', '.prrwwrrrrrrrrr.', '.prrrwwwrrrrrrr.', '.prrrrrrrrrrrrr.', '.p..............', '.p..............', '.p..............', '.p..............', E], { p:'#6b4a2a', r:'#e30a17', w:'#ffffff' });   // Türk bayrağı
S.bafrapidesi = D(d => { d.rect(3, 6, 10, 7, '#c0392b'); d.rect(3, 5, 10, 2, '#e0a526'); for (let y = 8; y < 13; y += 2) for (let x = 4; x < 12; x += 3) d.rect(x, y, 2, 1, '#fbe0e8'); });   // lokum kutusu
S.kuscenneti = D(d => { d.rect(3, 6, 4, 6, '#3a3a3a'); d.rect(9, 6, 4, 6, '#3a3a3a'); d.rect(7, 7, 2, 3, '#5a5a5a'); d.ell(5, 12, 2, 1.4, '#4f9ac8').ell(11, 12, 2, 1.4, '#4f9ac8'); d.px(4, 4, '#8a5a2b').px(12, 4, '#8a5a2b'); });   // dürbün
// Sinop
S.inceburun = D(d => { d.rect(6, 5, 4, 8, '#ffffff'); d.rect(6, 8, 4, 2, '#c0392b'); d.rect(5, 4, 6, 1, '#3a3a3a'); d.rect(6, 3, 4, 1, '#f6d36b'); d.poly([[5, 3], [8, 0], [11, 3]], '#c0392b'); d.rect(4, 13, 8, 1, '#8a7a62'); });   // deniz feneri biblosu
S.sinopmantisi = D(d => { d.ell(8, 9, 5, 4.4, '#c9a868'); d.rect(5, 4, 6, 2, '#a8864a'); d.line(5, 5, 11, 5, '#6b4a2a'); [[6, 9], [9, 8], [8, 11], [10, 11]].forEach(([x, y]) => { d.ell(x, y, 1.2, 1, '#8a5a2b'); d.px(x, y, '#a8703a'); }); });   // ceviz torbası
S.hamsilos = D(d => { d.ell(7, 8, 5, 2, '#5a7aa0'); d.ell(7, 7.5, 4, 1, '#a8c0d8'); d.poly([[11, 8], [14, 5], [14, 11]], '#5a7aa0'); d.px(4, 7, '#1a1a1a'); d.rect(3, 9, 6, 1, '#d9e4ee'); });   // hamsi magneti
// Tokat
S.ballica = D(d => { d.poly([[8, 2], [11, 6], [10, 12], [6, 12], [5, 6]], '#d8b8e0'); d.poly([[8, 2], [8, 12], [6, 12], [5, 6]], '#c09ad0'); d.px(9, 5, '#ffffff'); d.rect(4, 12, 8, 2, '#8a7a62'); });   // kristal taş
S.tokatkebabi = D(d => { d.line(2, 13, 13, 2, '#8a8e96'); d.rect(1, 13, 2, 2, '#6b4a2a'); [[5, 10, '#7a3a1a'], [7, 8, '#4a2a4a'], [9, 6, '#d9382a'], [11, 4, '#7a3a1a']].forEach(([x, y, c]) => d.ell(x, y, 1.5, 1.5, c)); });   // kebap şişi
S.yazma = D(d => { d.rect(4, 2, 8, 6, '#6b4a2a'); d.rect(5, 3, 6, 4, '#8a5a2b'); d.rect(7, 0, 2, 2, '#5a3a1e'); d.rect(4, 8, 8, 6, '#a8321e'); [[6, 10], [9, 10], [7, 12]].forEach(([x, y]) => d.px(x, y, '#f2e2c0')); });   // yazma kalıbı
// Trabzon
S.sumela = D(d => { d.rect(2, 3, 12, 10, '#fbfaf4'); d.rect(3, 4, 10, 8, '#3f7a45'); d.rect(4, 4, 8, 6, '#7a7a6a'); d.rect(5, 6, 6, 3, '#e8dcc0'); d.px(6, 7, '#4a6a8a').px(9, 7, '#4a6a8a'); });   // manastır kartpostalı
S.uzungol = D(d => { d.ell(7, 8, 5, 2.4, '#7a9a8a'); d.ell(7, 7.4, 4, 1.2, '#c9b0b8'); [[4, 7], [6, 8], [8, 7]].forEach(([x, y]) => d.px(x, y, '#3a5a4a')); d.poly([[11, 8], [14, 5], [14, 11]], '#7a9a8a'); d.px(4, 7, '#1a1a1a'); });   // alabalık magneti
S.akcaabat = D(d => { d.ell(5, 9, 3, 4, '#8a4a1e'); d.ell(5, 9, 1.8, 2.6, '#a85a28'); d.rect(7, 5, 6, 2, '#6b3a1a'); d.rect(12, 4, 2, 4, '#3a2416'); d.line(3, 13, 13, 4, '#f2e6c8'); });   // kemençe
// Zonguldak
S.komur = D(d => { d.rect(6, 3, 4, 2, '#3a3a3a'); d.rect(5, 5, 6, 8, '#5a5e66'); d.rect(6, 6, 4, 5, '#f6d36b'); d.rect(7, 7, 2, 3, '#fbf3c8'); d.rect(5, 13, 6, 1, '#3a3a3a'); d.rect(7, 1, 2, 2, '#5a5e66'); });   // madenci lambası
S.gokgol = D(d => { d.line(4, 3, 8, 7, '#8a5a2b').line(12, 3, 8, 7, '#8a5a2b'); d.ell(8, 10, 3, 3, '#5a5a64'); d.ell(7, 9, 1.2, 1.2, '#8a8a92'); });   // taş kolye
S.osmanlicilegi = kavanoz('#c03a5a', '#e8708a');   // çilek reçeli

// Rehber: Çaycı Zeynep — keşanlı başörtüsü, sırtında çay sepeti
export const GUIDE = () => G(16, '#cfe6d0').map(0, 0, [
  '.....oooooo.....', '....oOooOooo....', '...oooooooooo...', '...osssssssoBBBB', '...osesssesoBccB', '...osssssssoBccB', '...osssmmssoBccB',
  '....ossssso.BccB', '..bbbbsssbbbBccB', '.bbbbbbbbbbbBccB', '.bWbbbbbbbbWBBBB', '.bbbbbbbbbbbb...', '.bWbbbbbbbbWb...', '.bbbbbbbbbbbb...', '.bbbbbbbbbbbb...', '.bbbbbbbbbbbb...'].map(r => r.padEnd(16, '.').slice(0, 16)),
  { o:'#e0761a', O:'#f6c14a', s:'#f0c8a0', e:'#2a1d14', m:'#c0504a', b:'#2a2a2e', W:'#c0392b', B:'#8a5a2b', c:'#c08a50' }).done();
