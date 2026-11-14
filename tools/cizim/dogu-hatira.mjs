// Doğu Anadolu hatıraları (16x16, krem zemin) ve rehber Kayakçı Aras
import { G } from './grid.mjs';
const BG = '#e8d5b0';
const S0 = (rows, cmap) => () => G(16, BG).map(0, 0, rows.map(r => r.padEnd(16, '.').slice(0, 16)), cmap).done();
const D = f => () => { const d = G(16, BG); f(d); return d.done(); };
const mag = f => D(d => { d.rect(2, 3, 12, 10, '#6a4a2e'); d.rect(3, 4, 10, 8, '#bfe3f2'); f(d); });
const kart = f => D(d => { d.rect(2, 3, 12, 10, '#fbfaf4'); d.rect(3, 4, 10, 8, '#bfe3f2'); f(d); });
const kavanoz = (c, c2) => D(d => { d.rect(5, 3, 6, 2, '#c0392b'); d.rect(4, 5, 8, 9, '#dfe8ee'); d.rect(5, 6, 6, 7, c); d.rect(5, 6, 6, 1, c2); d.px(6, 8, c2); d.rect(5, 9, 6, 2, '#f6efe0'); });
const tas = (c, c2) => D(d => { d.poly([[4, 10], [6, 6], [10, 5], [12, 8], [11, 12], [6, 12]], c); d.poly([[6, 7], [9, 6], [8, 8]], c2); d.rect(3, 12, 10, 1, '#b8a07a'); });
export const S = {};
const E = '................';

// Ağrı
S.agridagi = kart(d => { d.poly([[3, 12], [8, 5], [13, 12]], '#7a6a6a'); d.poly([[6, 8], [8, 5], [10, 8]], '#ffffff'); d.rect(3, 11, 10, 1, '#c9b878'); });   // dağ kartpostalı
S.ishakpasa = mag(d => { d.rect(3, 4, 10, 8, '#f2d6a8'); d.rect(4, 8, 8, 4, '#e0c8a0'); d.ell(9, 8, 2, 1.6, '#c9ae84', (x, y) => y < 8); d.rect(5, 5, 1, 4, '#e0c8a0'); d.rect(7, 9, 2, 3, '#6a4a32'); });   // saray magneti
S.meteor = tas('#4a4a52', '#8a8a96');   // göktaşı parçası
// Ardahan
S.cildir = S0([E, E, E, '...rrrr..rrrr...', '...rwwr..rwwr...', '...rrrr..rrrr...', '..rrrrr..rrrrr..', '..rrrrr..rrrrr..', '..rrrrr..rrrrr..', '..rrrr....rrrr..', '...rr......rr...', E, E, E, E, E], { r:'#c0392b', w:'#fbfaf4' });   // yün eldiven
S.ardahankaz = D(d => { d.line(4, 13, 11, 3, '#8a8e96'); d.poly([[8, 7], [12, 1], [14, 3], [10, 9]], '#fbfaf6'); d.line(9, 8, 13, 2, '#d9d9d4'); d.px(4, 13, '#2a2a2e'); });   // kaz tüyü kalem
S.damal = D(d => { d.ell(8, 4, 2, 2, '#f0c8a0'); d.ell(8, 3, 2.6, 1.6, '#c0392b', (x, y) => y < 3); d.poly([[6, 6], [10, 6], [12, 13], [4, 13]], '#2e5f9e'); d.rect(5, 11, 6, 1, '#f2c14a'); d.px(7, 4, '#2a1d14').px(9, 4, '#2a1d14'); });   // mini damal bebeği
// Bingöl
S.yuzenadalar = D(d => { d.line(3, 13, 11, 3, '#8a5a2b'); d.line(4, 13, 12, 3, '#a8703a'); d.ell(12, 3, 2, 3, '#a8703a'); d.ell(12, 3, 1, 2, '#c08a50'); });   // sandal küreği
S.bingolbali = D(d => { d.line(3, 13, 9, 6, '#8a5a2b'); for (let k = 0; k < 4; k++) d.ell(10 + k * 0.6, 5 - k * 0.6, 2.4 - k * 0.2, 1.2, k % 2 ? '#c08a50' : '#a8703a'); d.px(9, 8, '#e0a526').px(9, 9, '#e0a526'); });   // bal kaşığı
S.bingolgoller = D(d => { [[5, 6, '#c86ad8'], [8, 4, '#f2c14a'], [11, 6, '#5a8ad8'], [7, 8, '#e8708a'], [10, 8, '#ffffff']].forEach(([x, y, c]) => { d.line(8, 13, x, y, '#4f8a3a'); d.ell(x, y, 1.4, 1.4, c); }); d.rect(6, 11, 4, 1, '#c0392b'); });   // yayla çiçeği demeti
// Bitlis
S.nemrut = tas('#1a1a22', '#5a5a6a');   // obsidyen taşı
S.ahlat = mag(d => { d.rect(3, 4, 10, 8, '#9a6a5a'); for (let y = 5; y < 12; y += 3) for (let x = 4; x < 12; x += 3) { d.px(x + 1, y, '#c89888'); d.px(x, y + 1, '#c89888'); d.px(x + 2, y + 1, '#c89888'); d.px(x + 1, y + 2, '#c89888'); } });   // taş oyma magneti
S.bitliskale = D(d => { d.ell(8, 8, 5, 5, '#c9a227'); d.ell(8, 8, 4, 4, '#e0b84a'); d.rect(5, 8, 6, 3, '#a8861a'); d.rect(6, 6, 1, 2, '#a8861a').rect(9, 6, 1, 2, '#a8861a'); d.rect(7, 9, 2, 2, '#e0b84a'); });   // kale rozeti
// Elazığ
S.harput = D(d => { d.rect(4, 5, 8, 8, '#c9cfd6'); d.rect(4, 5, 8, 1, '#a8aeb6'); d.rect(5, 6, 6, 1, '#fbfaf4'); d.ell(8, 3, 4, 2, '#8a8e96', (x, y) => y < 4); d.ell(8, 3, 3, 1.4, BG, (x, y) => y < 4); d.rect(5, 9, 6, 1, '#a8aeb6'); });   // süt kovası biblosu
S.hazar = D(d => { d.poly([[3, 11], [13, 11], [11, 13], [5, 13]], '#8a5a2b'); d.rect(8, 3, 1, 8, '#6b4a2a'); d.poly([[9, 3], [13, 10], [9, 10]], '#fbfaf4'); d.poly([[7, 5], [7, 10], [4, 10]], '#c0392b'); });   // yelkenli biblosu
S.okuzgozu = mag(d => { d.rect(3, 4, 10, 8, '#f2eadc'); [[6, 6], [8, 6], [10, 6], [7, 8], [9, 8], [8, 10]].forEach(([x, y]) => d.ell(x, y, 1.1, 1.1, '#5a2a5a')); d.rect(8, 4, 1, 2, '#6b4a1e'); });   // üzüm salkımı magneti
// Erzincan
S.girlevik = S0([E, '.......w........', '.....w.w.w......', '......www.......', '...w.wwwww.w....', '....www.www.....', '.wwwww...wwwww..', '....www.www.....', '...w.wwwww.w....', '......www.......', '.....w.w.w......', '.......w........', E, E, E, E], { w:'#5aa0d8' });   // kar tanesi süsü
S.tulum = D(d => { d.ell(8, 9, 4, 5, '#b8865a'); d.ell(7, 8, 2.4, 3.4, '#d0a070'); d.rect(7, 2, 2, 3, '#8a5a2b'); d.rect(6, 4, 4, 1, '#6b4a2a'); });   // peynir tulumu biblosu
S.kemaliye = kart(d => { d.rect(3, 4, 4, 8, '#a8846a'); d.rect(9, 4, 4, 8, '#9a7a5a'); d.rect(3, 7, 4, 2, '#2a2018'); d.rect(9, 9, 4, 1, '#8a7a5a'); d.rect(7, 10, 2, 2, '#4f9ac8'); });   // taş yol kartpostalı
// Erzurum
S.ciftemin = D(d => { d.rect(3, 3, 10, 10, '#2e7dba'); d.rect(4, 4, 8, 8, '#4f9ac8'); d.poly([[8, 4], [12, 8], [8, 12], [4, 8]], '#fbfaf4'); d.poly([[8, 6], [10, 8], [8, 10], [6, 8]], '#2e5f9e'); });   // çini karo
S.cagkebabi = D(d => { d.ell(8, 9, 6, 4, '#c87a3a'); d.ell(8, 9, 4.6, 2.8, '#e8a060'); d.ell(8, 9, 2.6, 1.4, '#c87a3a'); d.px(5, 8, '#fbd0a0'); });   // bakır tabak
S.oltutasi = D(d => { for (let k = 0; k < 14; k++){ const a = k / 14 * Math.PI * 2; d.px(8 + Math.cos(a) * 5, 6 + Math.sin(a) * 4, '#1a1a1e'); } d.rect(7, 10, 2, 3, '#1a1a1e'); d.rect(7, 13, 2, 2, '#4a4a52'); });   // oltu taşı tespih
// Hakkari
S.cilo = D(d => { for (let k = 0; k < 3; k++) d.ell(8, 8, 5 - k * 1.4, 4 - k * 1.1, k % 2 ? BG : '#e0761a'); d.ell(8, 8, 1, 0.8, BG); d.line(12, 9, 14, 14, '#e0761a'); d.rect(2, 5, 3, 2, '#8a8e96'); });   // dağcı halatı
S.terslale = mag(d => { d.rect(3, 4, 10, 8, '#dfeef2'); d.rect(8, 6, 1, 6, '#4f8a3a'); [[6, 7], [8, 8], [10, 7]].forEach(([x, y]) => { d.line(8, 6, x, y - 1, '#4f8a3a'); d.rect(x - 1, y, 2, 2, '#e8702a'); }); d.px(8, 4, '#5aa04a'); });   // çiçek magneti
S.zap = D(d => { d.line(4, 13, 10, 4, '#e0a526'); d.line(5, 13, 11, 4, '#c08a1a'); d.poly([[9, 4], [12, 1], [14, 3], [11, 6]], '#c0392b'); d.poly([[2, 14], [5, 11], [6, 13], [3, 15]], '#c0392b'); });   // rafting küreği
// Iğdır
S.igdirkayisi = D(d => { d.rect(3, 4, 10, 9, '#f2c14a'); d.rect(3, 4, 10, 2, '#c0392b'); [[5, 8], [8, 9], [11, 8], [6, 11], [10, 11]].forEach(([x, y]) => { d.ell(x, y, 1.3, 1.1, '#c86a2a'); }); });   // kayısı kurusu paketi
S.araskus = D(d => { d.ell(7, 9, 4, 3, '#c0703a'); d.ell(6, 8, 2, 1.4, '#e0904a'); d.poly([[10, 8], [14, 7], [14, 10], [10, 10]], '#c0703a'); d.px(5, 8, '#2a1d14'); d.rect(5, 12, 4, 1, '#8a4a1e'); });   // kuş düdüğü
S.igdirova = D(d => { d.line(8, 14, 8, 7, '#6b4a2a'); [[6, 6], [10, 5], [8, 3]].forEach(([x, y]) => { d.ell(x, y, 2, 1.8, '#fbfaf6'); d.px(x, y + 1, '#d9d4c4'); }); d.line(8, 10, 5, 8, '#6b4a2a').line(8, 9, 11, 7, '#6b4a2a'); });   // pamuk dalı
// Kars
S.ani = tas('#a8644a', '#c88a6a');   // kızıl taş
S.karskasari = D(d => { d.rect(4, 3, 8, 10, '#c9cfd6'); for (let y = 4; y < 12; y += 2) for (let x = 5; x < 11; x += 2) d.px(x + (y % 4 ? 1 : 0), y, '#6a6e76'); d.rect(6, 13, 4, 2, '#3a3a3a'); });   // peynir rendesi
S.sarikamis = S0([E, '.....bbbbb......', '....bbbbbbb.....', '....bbbbbbb.....', '..b.bbbbbbb.....', '.bbbbbbbbbb.....', '.bbbbbbbbbb.....', '..bbbbbbbbb.....', '....bbbbbbb.....', '....bwbwbwb.....', '....wwwwwww.....', '....wwwwwww.....', E, E, E, E], { b:'#2e7dba', w:'#fbfaf4' });   // kayak eldiveni
// Malatya
S.arslantepe = D(d => { d.ell(8, 9, 5, 4, '#a8805a'); d.ell(8, 9, 3.6, 2.8, '#c8a07a'); d.px(7, 8, '#6a4a2a').px(9, 10, '#6a4a2a').line(6, 10, 10, 8, '#6a4a2a'); d.rect(7, 3, 2, 3, '#8a6a4a'); });   // kil mühür
S.malatyakayisi = kavanoz('#e8802a', '#f2a04a');   // kayısı reçeli
S.battalgazi = D(d => { d.ell(8, 8, 6, 6, '#fbfaf4'); d.ell(8, 8, 5, 5, '#2e7dba'); d.ell(8, 8, 3.4, 3.4, '#fbfaf4'); d.ell(8, 8, 1.6, 1.6, '#c0392b'); [[8, 3], [3, 8], [13, 8], [8, 13]].forEach(([x, y]) => d.px(x, y, '#fbfaf4')); });   // çini tabak
// Muş
S.malazgirt = D(d => { d.rect(3, 2, 1, 12, '#6b4a2a'); d.poly([[4, 2], [13, 4], [4, 8]], '#c0392b'); d.px(7, 4, '#f2c14a').px(8, 5, '#f2c14a'); d.rect(2, 14, 4, 1, '#6b4a2a'); });   // sancak
S.muslalesi = kart(d => { d.rect(3, 9, 10, 3, '#7ab04e'); [[5, 7], [8, 6], [11, 7]].forEach(([x, y]) => { d.rect(x, y, 1, 4, '#4f8a3a'); d.rect(x - 1, y - 2, 3, 2, '#d9282a'); }); });   // lale kartpostalı
S.murat = tas('#8a8a96', '#b8b8c4');   // dere taşı
// Tunceli
S.munzur = D(d => { d.ell(7, 10, 4, 2.4, '#8a6a4a'); d.ell(11, 7, 1.6, 1.6, '#8a6a4a'); d.line(11, 6, 13, 2, '#5a4030').line(12, 6, 14, 3, '#5a4030'); [5, 9].forEach(x => d.rect(x, 12, 1, 2, '#6a4a2a')); d.px(12, 7, '#1a1a1a'); d.rect(3, 14, 10, 1, '#8a7a62'); });   // dağ keçisi biblosu
S.gozeler = D(d => { d.rect(6, 2, 4, 2, '#2e7dba'); d.rect(7, 4, 2, 1, '#bfe3f2'); d.rect(5, 5, 6, 9, '#bfe3f2'); d.rect(6, 6, 4, 7, '#8fc8f0'); d.rect(7, 7, 1, 5, '#ffffff'); });   // su şişesi
S.pertek = D(d => { d.rect(2, 5, 12, 7, '#f2d06a'); d.rect(2, 5, 12, 1, '#c0392b'); d.line(10, 5, 10, 12, '#a88a3a'); d.rect(4, 7, 4, 1, '#6a5a3a').rect(4, 9, 3, 1, '#6a5a3a'); d.rect(11, 8, 2, 1, '#6a5a3a'); });   // feribot bileti
// Van
S.vankedisi = D(d => { d.ell(8, 10, 4, 3.4, '#fbfaf6'); d.ell(8, 6, 3, 2.6, '#fbfaf6'); d.poly([[5, 5], [5.5, 2], [7, 4]], '#fbfaf6').poly([[11, 5], [10.5, 2], [9, 4]], '#fbfaf6'); d.px(7, 6, '#3a8ad8').px(9, 6, '#e0b020'); d.px(8, 7, '#f2a0a8'); d.rect(4, 13, 8, 1, '#c9c4c0'); });   // kedi biblosu
S.akdamar = D(d => { d.line(3, 13, 12, 4, '#6b4a2a'); d.line(7, 9, 4, 6, '#6b4a2a'); [[12, 4], [10, 6], [8, 8], [4, 6], [6, 11]].forEach(([x, y]) => { d.ell(x, y, 1.4, 1.4, '#f2c8d8'); d.px(x, y, '#e8708a'); }); });   // badem çiçeği dalı
S.otlupeynir = D(d => { d.ell(8, 9, 6, 4, '#3a6aa8'); d.ell(8, 9, 5, 3, '#6a9ad0'); d.rect(5, 7, 4, 3, '#f6f2e6'); d.px(6, 8, '#4f8a3a').px(7, 9, '#4f8a3a'); d.ell(11, 9, 1.2, 1, '#3a1a1a'); });   // kahvaltı tabağı

// Rehber: Kayakçı Aras — ponponlu bere, kafasında kayak gözlüğü, mavi mont
export const GUIDE = () => G(16, '#dbeaf4').map(0, 0, [
  '.......w........', '.....rrrrr......', '....rrrrrrr.....', '...rwrwrwrwr....', '...kggkkggk.....', '...ssssssss.....', '...sesssess.....', '...ssssssss.....',
  '...sssmmsss.....', '....ssssss......', '..bbbbbbbbbb..p.', '.bbbbwwbbbbbb.p.', '.bbbbbbbbbbbb.p.', '.bbbbbbbbbbbbbp.', '.bbbbbbbbbbbb.p.', '.bbbbbbbbbbbb.p.'].map(r => r.padEnd(16, '.').slice(0, 16)),
  { w:'#ffffff', r:'#c0392b', k:'#2a2a2e', g:'#e0a526', s:'#f0c8a0', e:'#2a1d14', m:'#c0504a', b:'#2e7dba', p:'#8a8e96' }).done();
