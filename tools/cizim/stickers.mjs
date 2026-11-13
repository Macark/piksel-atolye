// Sticker paketi: 16x16, çok renkli, '.' saydam. Oyun dış çizgiyi (beyaz + koyu) kendisi ekler.
// node stickers.mjs           → src/content/stickers.json
// node stickers.mjs onizle    → stickers-onizleme.png (oyundaki gibi dış çizgili)
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { writePng, rgb } from './pix.mjs';
const P = (rows) => rows.map(r => r.padEnd(16, '.').slice(0, 16));
const E = '................';
export const ST = [
  // --- sevgi
  { id:'gul', name:'Gül', cols:{ r:'#d8364f', R:'#f06a80', d:'#a01e38', g:'#3f8a34', G:'#6cb64f' }, rows:P([E, '.....rrrrr......', '....rRRrrRr.....', '...rRrddrrRr....', '...rrdRRdrrr....', '...rRrddrrRr....', '....rrRRrrr.....', '.....rrrrr......', '.......g........', '...GG..g..GG....', '..GGGG.g.GGGG...', '...GG..g..GG....', '.......g........', '.......g........', '.......g........', E]) },
  { id:'mektup', name:'Mektup', cols:{ w:'#fbf7ec', s:'#d9cfb8', r:'#e8384f' }, rows:P([E, E, E, '.wwwwwwwwwwwwww.', '.swwwwwwwwwwwws.', '.wswwwwwwwwwwsw.', '.wwswwwwwwwwsww.', '.wwwswwrrwwswww.', '.wwwwsrrrrswwww.', '.wwwwwrrrrwwwww.', '.wwwwwwrrwwwwww.', '.wwwwwwwwwwwwww.', '.wwwwwwwwwwwwww.', E, E, E]) },
  // --- kutlama
  { id:'pasta', name:'Pasta', cols:{ y:'#f6d36b', p:'#f4a6c0', P:'#e8678a', c:'#fbf3e0', b:'#c98654', w:'#ffffff' }, rows:P(['.......y........', '.......y........', '.......w........', '.......w........', '..pppppwppppp...', '.pPpPpPpPpPpPp..', '.pppppppppppppp.', '.cccccccccccccc.', '.cbbbbbbbbbbbbc.', '.cccccccccccccc.', '.pPpPpPpPpPpPp..', '.pppppppppppppp.', '.bbbbbbbbbbbbbb.', E, E, E]) },
  { id:'balon', name:'Balon', cols:{ r:'#e8384f', R:'#f6a0aa', b:'#2e7dba', B:'#8fc8f0', s:'#8a8a8a' }, rows:P([E, '..rrrr....bbbb..', '.rRrrrr..bBbbbb.', '.rRrrrr..bBbbbb.', '.rrrrrr..bbbbbb.', '.rrrrrr..bbbbbb.', '..rrrr....bbbb..', '...rr......bb...', '....s......s....', '....s.....s.....', '.....s...s......', '......s.s.......', '.......s........', '.......s........', E, E]) },
  { id:'partisapka', name:'Parti Şapkası', cols:{ p:'#8a4fb0', y:'#f2c14a', w:'#ffffff', r:'#e8384f' }, rows:P(['.......w........', '......www.......', '.......p........', '......ppp.......', '......pyp.......', '.....pppyp......', '.....ppppp......', '....ppypppp.....', '....pppppyp.....', '...pypppppp.....', '...ppppppyppp...', '..ppppypppppp...', '..yyyyyyyyyyyy..', '..r.r.r.r.r.r...', E, E]) },
  { id:'hediye', name:'Hediye', cols:{ b:'#2e7dba', r:'#e8384f', R:'#f6a0aa' }, rows:P([E, '....rr...rr.....', '...rRrr.rrRr....', '....rrrrrrr.....', '.bbbbbbrbbbbbbb.', '.bbbbbbrbbbbbbb.', '.rrrrrrrrrrrrrr.', '.bbbbbbrbbbbbbb.', '..bbbbbrbbbbbb..', '..bbbbbrbbbbbb..', '..bbbbbrbbbbbb..', '..bbbbbrbbbbbb..', '..bbbbbrbbbbbb..', '..bbbbbrbbbbbb..', E, E]) },
  { id:'kupa', name:'Kupa', cols:{ y:'#f2c14a', Y:'#fbe28a', d:'#c08a1a', b:'#6b4a2a' }, rows:P([E, '..yyyyyyyyyyy...', 'yyyYYyyyyyyyyyy.', 'y.yYYyyyyyyyy.y.', 'y.yYyyyyyyyyy.y.', '.yyYyyyyyyyyyy..', '...yyyyyyyyy....', '....ddyyydd.....', '......yyy.......', '......yyy.......', '.....ddddd......', '....bbbbbbb.....', '....bbbbbbb.....', E, E, E]) },
  // --- hayvanlar
  { id:'kedi', name:'Kedi', cols:{ o:'#f2a33a', O:'#f8c87a', k:'#2a1d14', p:'#f4a6c0', w:'#ffffff' }, rows:P([E, '..o.........o...', '..oo.......oo...', '..oOo.....oOo...', '..ooooooooooo...', '.ooooooooooooo..', '.oookoooookooo..', '.oookoooookooo..', '.ooooooooooooo..', 'wwooooopooooww..', '.ooooookkooooo..', 'wwoooookooooww..', '..ooooooooooo...', '...ooooooooo....', E, E]) },
  { id:'kopek', name:'Köpek', cols:{ b:'#a8703a', d:'#6b4a2a', w:'#f2e6c8', k:'#2a1d14', p:'#e8678a' }, rows:P([E, '..dd.......dd...', '.dddd.....dddd..', '.dddbbbbbbbddd..', '.ddbbbbbbbbbdd..', '.ddbbkbbbkbbdd..', '..dbbbbbbbbbd...', '...bbwwwwwbb....', '...bwwwkwwwb....', '...bwwkkkwwb....', '....wwwkwww.....', '.....wwpww......', '......ppp.......', E, E, E]) },
  { id:'tavsan', name:'Tavşan', cols:{ w:'#fbfaf4', g:'#d9d4c4', p:'#f4a6c0', k:'#2a1d14' }, rows:P(['....ww...ww.....', '....wp...pw.....', '....wp...pw.....', '....wp...pw.....', '....ww...ww.....', '...wwwwwwwww....', '..wwwwwwwwwww...', '..wwkwwwwwkww...', '..wwwwwwwwwww...', '..wpwwwkwwwpw...', '..wwwwwwwwwww...', '...wwwwwwwww....', '....ggggggg.....', E, E, E]) },
  { id:'kelebek', name:'Kelebek', cols:{ p:'#8a4fb0', P:'#c89ae8', y:'#f2c14a', k:'#2a1d14' }, rows:P([E, '..k.......k.....', '...k.....k......', '.pppp.k.pppp....', 'pPPPpp.ppPPPp...', 'pPyPPpkpPPyPp...', 'pPPPPpkpPPPPp...', '.pppppkppppp....', '..pPPpkpPPp.....', '.pPyPpkpPyPp....', '.pPPPp.pPPPp....', '..ppp...ppp.....', E, E, E, E]) },
  { id:'balik', name:'Balık', cols:{ o:'#f08a1c', w:'#ffffff', k:'#2a1d14', b:'#5ab0d0' }, rows:P([E, E, '..........b.....', '.....oooo...b...', '...oowwoooo.....', '..oooowwoooo..oo', '.ookoowwoooooooo', '.oooowwoooooooo.', '..oooowwoooo..oo', '...oowwoooo.....', '.....oooo...b...', '..........b.....', E, E, E, E]) },
  // --- Köfte
  { id:'kofte', name:'Köfte', cols:{ m:'#3b2d28', l:'#5e4a41', o:'#ef9a2e', k:'#0b0706', p:'#e48ea0', n:'#1d1412' }, rows:P([E, '.mm........mm...', '.mlm......mlm...', '.mmmmmmmmmmmm...', 'mmmmmmmmmmmmmm..', 'mmoommmmmmoomm..', 'mmokommmmmokmm..', 'mmoommmmmmoomm..', 'mmmmmmnnmmmmmm..', 'mmmmmmmnmmmmmm..', '.mmmmmmppmmmm...', '..mmmmmppmmm....', '...mmmmmmmm.....', E, E, E]) },
  { id:'koftezzz', name:'Uykucu Köfte', cols:{ m:'#3b2d28', l:'#5e4a41', k:'#0b0706', n:'#1d1412', w:'#ffffff' }, rows:P(['..........wwww..', '............w...', '...........w....', '..........wwww..', E, '.mm........mm...', '.mlm......mlm...', '.mmmmmmmmmmmm...', 'mmmmmmmmmmmmmm..', 'mmkkkmmmmkkkmm..', 'mmmmmmmmmmmmmm..', 'mmmmmmnnmmmmmm..', '.mmmmmmnmmmmm...', '..mmmmmmmmmm....', '...mmmmmmmm.....', E]) },
  { id:'koftekalp', name:'Kalpli Köfte', cols:{ m:'#3b2d28', l:'#5e4a41', r:'#e8384f', R:'#f6a0aa', n:'#1d1412' }, rows:P([E, '.mm........mm...', '.mlm......mlm...', '.mmmmmmmmmmmm...', 'mmmmmmmmmmmmmm..', 'mrRrmmmmmmrRrm..', 'mrrrmmmmmmrrrm..', 'mmrmmmmmmmmrmm..', 'mmmmmmnnmmmmmm..', 'mmmmmmmnmmmmmm..', '.mmmmmmmmmmmm...', '..mmmmmmmmmm....', '...mmmmmmmm.....', E, E, E]) },
  // --- yemek
  { id:'dondurma', name:'Dondurma', cols:{ p:'#f4a6c0', P:'#fbd0dc', w:'#fbf3e0', c:'#c9884a', C:'#a8692e', r:'#e8384f' }, rows:P(['.......r........', '......ppp.......', '.....pPppp......', '....pPpppppp....', '....pppppppp....', '...wwwwwwwwww...', '...wwwwwwwwww...', '....cCcCcCcc....', '....ccCcCcCc....', '.....cCcCcc.....', '.....ccCccc.....', '......cCcc......', '......ccc.......', '.......c........', E, E]) },
  { id:'pizza', name:'Pizza', cols:{ c:'#d9a050', y:'#f6d36b', r:'#d9382a', g:'#4ea34a' }, rows:P([E, '.cccccccccccccc.', '.cyyyyyyyyyyyyc.', '..yyryyyygyyyy..', '..yyyyyyyyyry...', '...yygyyyyyy....', '...yyyyryyyy....', '....yyyyyyg.....', '....yryyyyy.....', '.....yyyyy......', '.....yygyy......', '......yyy.......', '......yy........', '.......y........', E, E]) },
  { id:'cay', name:'Çay', cols:{ g:'#e2e8ec', t:'#b8401a', T:'#d8642a', s:'#e8e2d0', d:'#c9a86a' }, rows:P([E, E, '....gggggggg....', '....gttttttg....', '.....gTtttg.....', '......gttg......', '......gttg......', '.....gtTttg.....', '....gttttttg....', '....gttttttg....', '....gggggggg....', '..ssssssssssss..', '...dddddddddd...', E, E, E]) },
  { id:'simit', name:'Simit', cols:{ b:'#b8642e', B:'#d98a4a', s:'#f6ecd6' }, rows:P([E, '.....bbbbbb.....', '...bbBbBbBbbb...', '..bBbsbbsbBbbb..', '..bbBbb..bbBbb..', '.bBbb.....bbBb..', '.bbb.......bbb..', '.bBb.......bBb..', '.bbb.......bbb..', '.bbBb.....bBbb..', '..bbbBb..bBbb...', '..bBbbsbbsbbb...', '...bbBbBbBbb....', '.....bbbbbb.....', E, E]) },
  { id:'karpuz', name:'Karpuz', cols:{ g:'#3f8a34', w:'#f2f6e2', r:'#e8384f', k:'#2a1d14' }, rows:P([E, E, E, '.rrrrrrrrrrrrrr.', '.rrkrrrrkrrrkrr.', '..rrrrkrrrrrrr..', '..rrrrrrrkrrrr..', '...rkrrrrrrrr...', '....rrrrkrrr....', '.....wwwwwww....', '......ggggg.....', E, E, E, E, E]) },
  // --- doğa
  { id:'gunes', name:'Güneş', cols:{ y:'#f2c14a', Y:'#fbe28a', o:'#f08a1c', k:'#6b4a1e' }, rows:P(['.......o........', '..o....o....o...', '...o.......o....', '.....yyyyy......', '....yYyyyyy.....', 'o..yYyyyyyyy..o.', 'oo.yyykyykyy.oo.', '...yyyyyyyyy....', '...yyykyykyy....', '....yyykkyy.....', '.....yyyyy......', '...o.......o....', '..o....o....o...', '.......o........', E, E]) },
  { id:'bulut', name:'Bulut', cols:{ w:'#ffffff', g:'#d9e8f0' }, rows:P([E, E, E, E, '......wwww......', '.....wwwwww.....', '...wwwwwwwwww...', '..wwwwwwwwwwwww.', '.wwwwwwwwwwwwww.', '.wwwwwwwwwwwwww.', '.gggggggggggggg.', E, E, E, E, E]) },
  { id:'gokkusagi', name:'Gökkuşağı', cols:{ r:'#e8384f', o:'#f08a1c', y:'#f2c14a', g:'#4ea34a', b:'#2e7dba', w:'#ffffff' }, rows:P([E, E, '....rrrrrrrr....', '..rrooooooooor..', '.rooyyyyyyyyoor.', 'royyggggggggyyor', 'roygg......ggyor', 'roygb......bgyor', 'roygb......bgyor', 'wwwgb......bgwww', 'wwww........wwww', E, E, E, E, E]) },
  { id:'papatya', name:'Papatya', cols:{ w:'#ffffff', y:'#f2c14a', Y:'#e0a020', g:'#4ea34a' }, rows:P([E, '.....ww.ww......', '....wwwwwww.....', '..ww.wwwww.ww...', '.wwwwwyyywwwww..', '..wwwyyYyywww...', '.wwwwyYyyywwww..', '..wwwyyyyywww...', '.wwwwwyyywwwww..', '..ww.wwwww.ww...', '....wwwwwww.....', '.......g........', '...gg..g........', '....gggg........', '.......g........', E]) },
  // --- Türkiye
  { id:'nazar', name:'Nazar', cols:{ b:'#1e5aa8', w:'#ffffff', l:'#8fc8f0', k:'#1a1414' }, rows:P([E, '.....bbbbbb.....', '...bbbbbbbbbb...', '..bbbwwwwwwbbb..', '.bbbwwwwwwwwbbb.', '.bbwwllllllwwbb.', '.bbwwllkkllwwbb.', '.bbwwlkkkkllwbb.', '.bbwwllkkllwwbb.', '.bbwwllllllwwbb.', '.bbbwwwwwwwwbbb.', '..bbbwwwwwwbbb..', '...bbbbbbbbbb...', '.....bbbbbb.....', E, E]) },
  { id:'lale', name:'Lale', cols:{ r:'#d8364f', R:'#f06a80', g:'#3f8a34' }, rows:P([E, '....r..r..r.....', '....rr.r.rr.....', '....rrrrrrr.....', '....rRrrrRr.....', '....rRrrrRr.....', '.....rrrrr......', '......rrr.......', '.......g........', '..gg...g........', '...gg..g..gg....', '....gggg.gg.....', '.......gg.......', '.......g........', E, E]) },
  // --- yüz
  { id:'gulen', name:'Gülen Yüz', cols:{ y:'#f2c14a', k:'#2a1d14', p:'#f4a6a0' }, rows:P([E, '.....yyyyyy.....', '...yyyyyyyyyy...', '..yyyyyyyyyyyy..', '.yyyykyyyykyyyy.', '.yyyykyyyykyyyy.', '.yyyyyyyyyyyyyy.', '.ypyyyyyyyyyypy.', '.yykyyyyyyyykyy.', '.yyykkkkkkkkyyy.', '..yyykkkkkkyyy..', '...yyyyyyyyyy...', '.....yyyyyy.....', E, E, E]) },
];

const OUT = fileURLToPath(new URL('../../src/content/stickers.json', import.meta.url));
if (process.argv[2] === 'onizle'){
  // oyundaki gibi: beyaz kalın + koyu ince dış çizgi, 5 px ölçek
  const u = 6, cell = 16 * u + 24, cols = 9, rowsN = Math.ceil(ST.length / cols), W = cols * cell, H = rowsN * cell, img = Array.from({ length:H }, () => new Array(W).fill([216, 200, 168]));
  ST.forEach((s, k) => { const ox = (k % cols) * cell + 12, oy = Math.floor(k / cols) * cell + 12;
    const on = (x, y) => x >= 0 && y >= 0 && x < 16 && y < 16 && s.rows[y][x] !== '.';
    const paint = (pad, colFn) => { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) if (on(x, y)) for (let j = -pad; j < u + pad; j++) for (let i = -pad; i < u + pad; i++){ const X = ox + x * u + i, Y = oy + y * u + j; if (X >= 0 && Y >= 0 && X < W && Y < H) img[Y][X] = colFn(x, y); } };
    paint(4, () => [255, 255, 255]); paint(1, () => [42, 29, 20]); paint(0, (x, y) => rgb(s.cols[s.rows[y][x]])); });
  writePng('stickers-onizleme.png', W, H, (x, y) => img[y][x]);
  console.log(ST.length, 'sticker');
} else {
  fs.writeFileSync(OUT, '[\n' + ST.map(s => ' ' + JSON.stringify(s)).join(',\n') + '\n]\n');
  console.log(ST.length, 'sticker yazıldı');
}
