// İç Anadolu hatıraları (16x16, krem zemin) ve rehber Çoban Kaan
import { G } from './grid.mjs';
const BG = '#e8d5b0';
const S0 = (rows, cmap) => G(16, BG).map(0, 0, rows.map(r => r.padEnd(16, '.').slice(0, 16)), cmap).done();
export const S = {};
const E = '................';

// Aksaray
S.ihlara = () => S0([E, E, '..oooooooooooo..', '..obbbbbbbbbbo..', '..obbkbbbbkbbo..', '..obbkbbbbkbbo..', '..obbbbgbbbbbo..', '..obbbbgbbbbbo..', '..obbbgggbbbbo..', '..obbbbwbbbbbo..', '..oooooooooooo..', E, E, E, E, E], { o:'#6a4a2e', b:'#b8865a', k:'#4a3020', g:'#6aa04a', w:'#4f9ac8' });   // kaya kilisesi magneti
S.sultanhani = () => S0([E, E, '..........bb....', '.........bbbb...', '....bb...bbkb...', '...bbbb..bbbb...', '..bbbbbbbbbb....', '..bbbbbbbbb.....', '..bbbbbbbbb.....', '...b..b.b..b....', '...b..b.b..b....', '..pppppppppppp..', E, E, E, E], { b:'#c9955a', k:'#2a1d14', p:'#8a7a62' });   // deve biblosu
S.tuzgolu = () => S0([E, E, '......w.........', '.....wWw...w....', '....wWWWw.wWw...', '....wWwWw.wWw...', '...wWWWWWwwWww..', '...wwWWWwwWWww..', '....wwWwwwWWw...', '.....www.www....', E, E, E, E, E, E], { w:'#d9dce2', W:'#ffffff' });   // tuz kristali
// Ankara
S.anitkabir = () => S0([E, '....rrr..rrr....', '...rwwrrrwwr....', '...rwwrrrwwr....', '....rrrrrrr.....', '......rrr.......', '......r.r.......', '.....rr.rr......', '....rr...rr.....', '...rr.....rr....', E, E, E, E, E, E], { r:'#e30a17', w:'#ffffff' });   // kırmızı beyaz kurdele
S.beypazari = () => S0([E, E, E, '.....gggggg.....', '...gg.g..g.gg...', '..g.g.gggg.g.g..', '..g.ggg..ggg.g..', '..gg.g....g.gg..', '...gggg..gggg...', '.....gggggg.....', E, E, E, E, E, E], { g:'#7a8494' });   // telkari bilezik
S.ankarakecisi = () => S0([E, E, '...wwwwwwwwww...', '...wWwWwWwWww...', '...wwwwwwwwww...', '...wWwWwWwWww...', '...wwwwwwwwww...', '...wWwWwWwWww...', '...wwwwwwwwww...', '...w.w.w.w.w....', E, E, E, E, E, E], { w:'#fbfaf4', W:'#a8703a' });   // tiftik atkı
// Çankırı
S.tuzmagarasi = () => S0([E, '.....oooooo.....', '....oOOOOOOo....', '...oOOyyOOOOo...', '...oOyyyyOOOo...', '...oOOyyOOOOo...', '....oOOOOOOo....', '.....oooooo.....', '......bbbb......', '.....bbbbbb.....', '....bbbbbbbb....', E, E, E, E, E], { o:'#e8a878', O:'#f6c8a0', y:'#fbe2c0', b:'#6b4a2a' });   // tuz lambası
S.yumurtatatlisi = () => S0([E, E, E, E, '...gggggggggg...', '..gwwwwwwwwwwg..', '..gwwyywwyywwg..', '..gwwyywwyywwg..', '..gwwwwwwwwwwg..', '...gggggggggg...', E, E, E, E, E, E], { g:'#8a8e96', w:'#eef2f4', y:'#d9902a' });   // tatlı tabağı
S.ilgaz = () => S0([E, E, E, E, '..kkkkkkkkkkkk..', '.kooooookoooook.', '.kobbbbbkbbbbbk.', '.kobbbbbkbbbbbk.', '.kooooookoooook.', '..kkk......kkk..', E, E, E, E, E, E], { k:'#2a2a2a', o:'#e0761a', b:'#5ab0d0' });   // kayak gözlüğü
// Eskişehir
S.odunpazari = () => S0([E, '..oooooooooooo..', '..o....rr....o..', '..o...rrrr...o..', '..o..rrrrrr..o..', '..o..pppppp..o..', '..o.ppbppbpp.o..', '..o.pppppppp.o..', '..o..ppddpp..o..', '..o..ppddpp..o..', '..oooooooooooo..', E, E, E, E, E], { o:'#6a4a2e', r:'#a8482a', p:'#e8a8b8', b:'#4a6a8a', d:'#6b4a2e' });   // ahşap ev magneti
S.luletasi = () => S0(['..k.........k...', '...k.......k....', '....k.....k.....', '.....k...k......', '......kkk.......', '......www.......', '.....wWWWw......', '.....wWWWw......', '......www.......', E, E, E, E, E, E, E], { k:'#6b4a2a', w:'#e8e2d0', W:'#fbf8ee' });   // lületaşı kolye
S.ciborek = () => S0([E, E, '....gggggggg....', '....gwwwwwwg....', '....gwwwwwwg....', '....gwwwwwwg....', '....gwwwwwwg....', '....gwwwwwwg....', '....gwwwwwwg....', '.....gggggg.....', E, E, E, E, E, E], { g:'#c9cfd6', w:'#fbfaf4' });   // ayran bardağı
// Karaman
S.binbirkilise = () => S0([E, E, '...bryrbybryb...', '...ybrybyrbyb...', '...rybyrbyyrb...', '...bryrbybryb...', '...ybrybyrbyb...', '...rybyrbyyrb...', '...bryrbybryb...', E, E, E, E, E, E, E], { b:'#2e5f9e', r:'#c0392b', y:'#e8c22e' });   // mozaik parça
S.divlepeyniri = () => S0([E, E, E, '......ss........', '.....sss........', '....sss.........', '...sss..........', '..sss...........', '.bbb............', 'bbb.............', 'bb..............', E, E, E, E, E], { s:'#c9cfd6', b:'#6b4a2a' });   // peynir bıçağı
S.ferman = () => S0([E, '..........q.....', '.........q......', '........q.......', '.......q........', '......q.........', '.....bbbb.......', '....bkkkkb......', '....bkkkkb......', '....bbbbbb......', E, E, E, E, E, E], { q:'#e8e2d0', b:'#8a5a2b', k:'#1a1414' });   // divit (hokka ve kalem)
// Kayseri
S.erciyes = () => S0([E, '.......w........', '......www.......', '.....rrrrr......', '....rrrrrrr.....', '...rrwrrrwrr....', '...rrrrrrrrr....', '...wwwwwwwww....', '...rrrrrrrrr....', E, E, E, E, E, E, E], { w:'#ffffff', r:'#c0392b' });   // bere
S.manti = () => S0([E, E, E, E, E, '...bbbbbbbbbbbb.', '..bBBBBBBBBBBBBb', '...bbbbbbbbbbbb.', E, E, E, E, E, E, E, E], { b:'#a8703a', B:'#d9a86a' });   // oklava
S.pastirma = () => S0([E, E, E, E, '...kkkkkkkkkk...', '..kccccccccccck.', '..kcCcccCccccck.', '..kccccccccccck.', '...kkkkkkkkkk...', '....kkkkkkkk....', E, E, E, E, E, E], { k:'#a8643a', c:'#c0402a', C:'#d9603a' });   // çemen kâsesi
// Kırıkkale
S.kizilirmak = () => S0(['..b.............', '...b............', '....b...........', '.....b..........', '......b.........', '.......b........', '........b.......', '.........b.l....', '..........bl....', '...........l....', '...........l....', '.........ffl....', '.........ff.....', E, E, E], { b:'#8a5a2b', l:'#c9cfd6', f:'#e8384f' });   // olta
S.keskintava = () => S0([E, E, E, E, '.h...........h..', '.hbbbbbbbbbbbh..', '..bBBBBBBBBBb...', '..bBBBBBBBBBb...', '...bbbbbbbbb....', E, E, E, E, E, E, E], { h:'#6a3a1a', b:'#8a4a2a', B:'#a85a32' });   // toprak tava
S.deliceuzum = () => S0([E, E, '....h......h....', '.....h....h.....', '...bbbbbbbbbb...', '..bcgcgcgcgcgb..', '..bbbbbbbbbbbb..', '..bwbwbwbwbwbb..', '..bbbbbbbbbbbb..', '...bwbwbwbwbb...', '....bbbbbbbb....', E, E, E, E, E], { h:'#8a5a2b', b:'#a8703a', w:'#c08a50', c:'#c9d86a', g:'#a8b84a' });   // üzüm sepeti
// Kırşehir
S.cacabey = () => S0([E, '.......g........', '......g.g.......', '.....ggggg......', '....g.....g.....', '...g...k...g....', '...g..kkk..g....', '...g...k...g....', '...g.......g....', '....g.....g.....', '.....ggggg......', E, E, E, E, E], { g:'#c9a227', k:'#8a6a1a' });   // usturlap
S.ahievran = () => S0([E, E, E, E, '................', 'bbbbbbbbbbbbbbbb', 'bBbBbBggggBbBbBb', 'bbbbbbgkkgbbbbbb', 'bBbBbBggggBbBbBb', 'bbbbbbbbbbbbbbbb', E, E, E, E, E, E], { b:'#8a4a1e', B:'#a85a28', g:'#c9a227', k:'#8a6a1a' });   // deri kemer
S.neset = () => S0([E, E, E, E, '.....yy.........', '....yyyy........', '...yyYyyy.......', '...yyyyyyy......', '....yyyyyyy.....', '.....yyyyyy.....', '.......yyyy.....', '.........yy.....', E, E, E, E], { y:'#e0a526', Y:'#f6d36b' });   // tezene
// Konya
S.mevlana = () => S0([E, '.......k........', '.......k........', '......kkk.......', '.......s........', '...www.w.www....', '..www.www.www...', '.......w........', '......www.......', '.....wwwww......', '....wwwwwww.....', '...wwwwwwwww....', '..wwwwwwwwwww...', '..ppppppppppp...', E, E], { k:'#8a6a4a', s:'#e8b48a', w:'#fbfaf4', p:'#8a7a62' });   // semazen biblosu
S.etliekmek = () => S0(['...........bb...', '..........bb....', '.........bb.....', '........bb......', '.......bb.......', '......bb........', '..wwwwbb........', '.wwwwwww........', '.wwwwwww........', '.wwwwwww........', '..wwwww.........', E, E, E, E, E], { b:'#8a5a2b', w:'#c9a86a' });   // fırın küreği
S.catalhoyuk = () => S0([E, '.......cc.......', '......cccc......', '......cccc......', '....cccccccc....', '...ccCCccCCcc...', '...cccccccccc...', '..cccCccccCccc..', '..cccccccccccc..', '..cccccccccccc..', '...cccccccccc...', '....pppppppp....', E, E, E, E], { c:'#c08a5a', C:'#a8703a', p:'#8a7a62' });   // kil heykelcik
// Nevşehir
S.peribacalari = () => S0([E, '.....rrrrr......', '....ryyyyyr.....', '...ryrryrrry....', '...ryrryrrry....', '...ryrryrrry....', '....ryyyyyr.....', '.....rrrrr......', '......k.k.......', '......k.k.......', '......bbb.......', '......bbb.......', E, E, E, E], { r:'#e8384f', y:'#f2c14a', k:'#6b4a2a', b:'#8a5a2b' });   // balon magneti
S.avanoscomlek = () => S0([E, '......cccc......', '.......cc.......', '......cccc......', '.....cCcccc.....', '....cCcccccc....', '....cCcccccc....', '....cwwwwwwc....', '....cccccccc....', '.....cccccc.....', '......cccc......', E, E, E, E, E], { c:'#c0603a', C:'#d8805a', w:'#f2d0a0' });   // mini testi
S.derinkuyu = () => S0([E, '.......kk.......', '......k..k......', '.....kkkkkk.....', '.....kyyyyk.....', '.....kyYYyk.....', '.....kyYYyk.....', '.....kyyyyk.....', '.....kkkkkk.....', '......kkkk......', E, E, E, E, E, E], { k:'#4a4a4a', y:'#f2c14a', Y:'#fff0b0' });   // fener
// Niğde
S.aladaglar = () => S0([E, '.....gggggg.....', '....gwwwwwwg....', '...gwwwrwwwwg...', '...gwwwrwwwwg...', '...gwwwkwwwwg...', '...gwwwbwwwwg...', '...gwwwbwwwwg...', '....gwwwwwwg....', '.....gggggg.....', E, E, E, E, E, E], { g:'#c9a227', w:'#fbfaf4', r:'#c0392b', k:'#2a2a2a', b:'#2e5f9e' });   // pusula
S.gumusler = () => S0([E, E, '..pppppppppppp..', '..pyyyyyyyyyyp..', '..pyyyssssyyyp..', '..pyyssssssyyp..', '..pyysrrrrsyyp..', '..pyyrrbbrryyp..', '..pyyrrbbrryyp..', '..pppppppppppp..', E, E, E, E, E, E], { p:'#8a7a62', y:'#e8c87a', s:'#e8b48a', r:'#c0392b', b:'#2e5f9e' });   // fresk parçası
S.nigdetava = () => S0([E, '..............h.', '.............h..', '............h...', '...........h....', '..........h.....', '...cccc..h......', '..cCCCCch.......', '..cCCCCc........', '..cccccc........', '...cccc.........', E, E, E, E, E], { h:'#6b4a2a', c:'#b8642e', C:'#d8844a' });   // bakır kepçe
// Sivas
S.divrigi = () => S0([E, '.bbbbbbbbbbbbbb.', '.bBBBbBBBBbBBBb.', '.bBbBBbBBbBBbBb.', '.bBBbBBkkBBbBBb.', '.bbBBbkkkkbBBbb.', '.bBBbBBkkBBbBBb.', '.bBbBBbBBbBBbBb.', '.bBBBbBBBBbBBBb.', '.bbbbbbbbbbbbbb.', E, E, E, E, E, E], { b:'#8a6a42', B:'#c9b08a', k:'#6a4a2a' });   // taş oyma karo
S.sivaskofte = () => S0([E, E, E, E, '...gggggggggg...', '..g.k.k.k.k.kg..', '..gkkkkkkkkkkg..', '..gbbbbbbbbbbg..', '..gbrbrbrbrbbg..', '...gggggggggg...', '...g........g...', '..gg........gg..', E, E, E, E], { g:'#4a4a4a', k:'#8a8a8a', b:'#3a3a3a', r:'#e05a3a' });   // mini mangal
S.kangal = () => S0([E, E, E, E, '...rrrrrrrrrr...', '..rsrsrsrsrsrr..', '..rrrrrrrrrrrr..', '...rrrrrrrrrr...', '......gg........', '.....gggg.......', '......gg........', E, E, E, E, E], { r:'#8a2a2a', s:'#c0c0c0', g:'#c9a227' });   // köpek tasması
// Yozgat
S.camlik = () => S0([E, '.......g........', '......ggg.......', '.....ggggg......', '......ggg.......', '.....ggggg......', '....ggggggg.....', '.....ggggg......', '....ggggggg.....', '...ggggggggg....', '.......b........', '.....cccccc.....', '.....cCCCCc.....', '......cccc......', E, E], { g:'#2f6a3a', b:'#6b4a1e', c:'#a8643a', C:'#c98654' });   // çam fidanı
S.tandir = () => S0([E, E, '.....cccccc.....', '....cCccccCc....', '...cCcccccccc...', '...ccccccccc....', '...cccckkcccc...', '...ccckkkkccc...', '...cccckkcccc...', '...cccccccccc...', '....cccccccc....', '...pppppppppp...', E, E, E, E], { c:'#c08a5a', C:'#d8a878', k:'#3a2420', p:'#8a7a62' });   // kil tandır biblosu
S.parmakcoregi = () => S0([E, E, E, '..ww............', '..www...........', '...www..........', '....www.........', '.....wwwbbbbbb..', '......wwbBBBBb..', '.......wbbbbbb..', E, E, E, E, E, E], { w:'#c9cfd6', b:'#a8703a', B:'#c08a50' });   // hamur kesici

// Çoban Kaan: kuzu derisi kalpak, keçe kepenek, kaval
export const GUIDE = () => G(16, '#d9e6c0').map(0, 0, [
  '....kkkkkkkk....', '...kKkKkKkKkk...', '...kkkkkkkkkk...', '....ssssssss....', '....sesssses....', '....ssssssss....', '....smmmmmms....',
  '.....ssssss.....', '..ppppssssppp...', '.ppppppppppppp..', '.pPpppppppppPp..', '.ppppppppppppp..', '.pPpppppppppPp..', '.ppppppppppppp.b', '.ppppppppppppbb.', '.pppppppppppbb..'].map(r => r.padEnd(16, '.')),
  { k:'#3a2e2a', K:'#5a4a44', s:'#c98a5a', e:'#2a1d14', m:'#5a3a22', p:'#c9b48a', P:'#a8925e', b:'#8a5a2b' }).done();
