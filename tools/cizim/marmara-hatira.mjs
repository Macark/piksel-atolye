// Marmara hatıraları (16x16, krem zemin) ve rehber Elif Abla
import { G } from './grid.mjs';
const BG = '#e8d5b0';
const S0 = (rows, cmap) => G(16, BG).map(0, 0, rows.map(r => r.padEnd(16, '.')), cmap).done();
export const S = {};
const E = '................';

S.kuscenneti = () => S0([E, E, '..kk......kk....', '.kssk....kssk...', '.kssk....kssk...', '.kssk....kssk...', '.kssskkkksssk...', '.kssk.kk.kssk...', '.kggk....kggk...', '.kggk....kggk...', '.kkkk....kkkk...', E, E, E, E, E],
  { k:'#2a2a2a', s:'#5a5a5a', g:'#8fc0de' });                                   // dürbün
S.hosmerim = () => S0([E, '.......bb.......', '......bBBb......', '......bBBb......', '......bBBb......', '.......bb.......', '.......b........', '.......b........', '.......b........', '.......b........', '.......b........', '.......b........', '.......b........', E, E, E],
  { b:'#9a6a34', B:'#c0905a' });                                                // ahşap kaşık
S.ayvalikzeytin = () => S0([E, E, E, '...gggggggggg...', '..gGGGGGGGGGGg..', '..gGGgggGGGGGg..', '..gGgGGGgGGGGg..', '..gGGgggGGGGGg..', '..gGGGGGGGGGGg..', '...gggggggggg...', E, E, E, E, E, E],
  { g:'#7a8a3a', G:'#b8c46a' });                                                // zeytinyağlı sabun
S.ertugrulgazi = () => S0([E, '..b.............', '..bb............', '..b.b...........', '..b..b.......a..', '..b...b.....aa..', '..ssssssssssaaa.', '..b...b.....aa..', '..b..b.......a..', '..b.b...........', '..bb............', '..b.............', E, E, E, E],
  { b:'#8a5a2b', s:'#6b4a1e', a:'#a8a8a8' });                                   // ok ve yay
S.ayvalokumu = () => S0([E, '.......b........', '......bl........', '.....yyyy.......', '....yyYYyy......', '...yyYYyyyy.....', '...yyYyyyyy.....', '...yyyyyyyyy....', '...yyyyyyyyy....', '....yyyyyyy.....', '.....yyyyy......', '......yyy.......', E, E, E, E],
  { b:'#6b4a1e', l:'#5a8a3a', y:'#e8c22e', Y:'#f6e07a' });                       // ayva
S.lefkebezi = () => S0([E, E, E, E, '..bbb......bbb..', '.bWWWbbbbbbWWWb.', '.bWWWWWWWWWWWWb.', '.bWWWbbbbbbWWWb.', '..bbb......bbb..', '.......t........', '.......t........', E, E, E, E, E],
  { b:'#8a5a2b', W:'#c0905a', t:'#f2e6c8' });                                   // dokuma mekiği
S.cumalikizik = () => S0([E, '.......r........', '......rrr.......', '.....rrrrr......', '....rrrrrrr.....', '....yyyyyyy.....', '...yyyyyyyyy....', '...ywwyyywwy....', '...yyyyyyyyy....', '...ywwyyywwy....', '....yyyyyyy.....', '....yyydyyy.....', '....yyydyyy.....', E, E, E],
  { r:'#b5532e', y:'#f2d36b', w:'#4a3a2a', d:'#6b4a2e' });                       // cumba magneti
S.iskender = () => S0([E, E, E, E, '..h..........h..', '.hhccccccccccch.', '..cCCCCCCCCCCc..', '..cCCCCCCCCCCc..', '...cCCCCCCCCc...', '....cccccccc....', E, E, E, E, E, E],
  { h:'#6e3a18', c:'#8e4a20', C:'#d27b3a' });                                   // bakır sahan
S.kestanesekeri = () => S0([E, E, '.......t........', '......tbb.......', '.....bbbbbb.....', '....bbBbbbbb....', '...bbBBbbbbbb...', '...bbbbbbbbbb...', '...bbbbbbbbbb...', '...ccccccccccc..', '....cccccccccc..', '.....cccccccc...', E, E, E, E],
  { t:'#c9a86a', b:'#7a3a1a', B:'#b8642e', c:'#d9b07a' });                       // kestane
S.truvaati = () => S0([E, '..........hh....', '.........hhhe...', '........hh......', '...bbbbbhh......', '..bbbbbbbb......', '..bbbbbbbb......', '..b.b..b.b......', '..b.b..b.b......', '.pppppppppp.....', '..w......w......', E, E, E, E, E],
  { h:'#c08a50', e:'#2a1d14', b:'#b07a42', p:'#6b4a2a', w:'#4a3220' });          // tahta at biblosu
S.ezine = () => S0([E, E, '....gggggggg....', '...gGGGGGGGGg...', '...gGwwwwwwGg...', '...gGwbbbbwGg...', '...gGwwwwwwGg...', '...gGGGGGGGGg...', '...gGGGGGGGGg...', '...gGGGGGGGGg...', '...gggggggggg...', E, E, E, E, E],
  { g:'#8a8e96', G:'#c9cfd6', w:'#ffffff', b:'#2e5f9e' });                       // peynir tenekesi
S.sehitlerabidesi = () => S0([E, '....rr..rr......', '...rrrrrrrr.....', '..rrrrkkrrrr....', '..rrrkkkkrrr....', '..rrrrkkrrrr....', '...rrrrrrrr.....', '....rrrrrr......', '.......g........', '.......g..gg....', '.......ggg......', '.......g........', '.......g........', E, E, E],
  { r:'#d9302a', k:'#1a1414', g:'#3f7a34' });                                   // gelincik
S.selimiye = () => S0([E, '.bbbbbbbbbbbbbb.', '.bwwwwwwwwwwwwb.', '.bwwwwwrrwwwwwb.', '.bwwwwrrrrwwwwb.', '.bwwwwrrrrwwwwb.', '.bwwwwwrrwwwwwb.', '.bwwwwwggwwwwwb.', '.bwwwwggggwwwwb.', '.bwwwwwggwwwwwb.', '.bwwwwwwwwwwwwb.', '.bbbbbbbbbbbbbb.', E, E, E, E],
  { b:'#2e5f9e', w:'#f6f2e8', r:'#c0392b', g:'#3f8a5a' });                       // lale çinisi
S.tavaciger = () => S0([E, '.......ss.......', '.......ss.......', '......kkkk......', '.....kssssk.....', '......kssk......', '......kkkk......', '.....kkkkkk.....', '.....kkkkkk.....', '.....kk..kk.....', '.....kk..kk.....', '....ss....ss....', E, E, E, E],
  { s:'#c98a5a', k:'#2a1d14' });                                                 // güreşçi biblosu (kispetli)
S.meyvesabunu = () => S0([E, '......gggg......', '.......gg.......', '.....rrrrrr.....', '....rryrrrrr....', '....rrrrryrr....', '....ryrrrrrr....', '.....rrryrr.....', '.....rrrrrr.....', '......rryr......', '.......rr.......', E, E, E, E, E],
  { g:'#4ea34a', r:'#e84a5a', y:'#ffd8a0' });                                    // çilek sabun
S.ayasofya = () => S0([E, '.gggggggggggggg.', '.gbybybybybybyg.', '.gybybybybybybg.', '.gbybyyyyybybyg.', '.gyby.....ybybg.', '.gbyy..r..yybyg.', '.gyby.rrr.ybybg.', '.gbyy..r..yybyg.', '.gyby.....ybybg.', '.gbybyyyyybybyg.', '.gybybybybybybg.', '.gggggggggggggg.', E, E, E].map(r => r.replace(/./g, (m, i) => m)),
  { g:'#c9a227', b:'#2e5f9e', y:'#e8c22e', r:'#c0392b' });          // mozaik karo
S.kapalicarsi = () => S0([E, '.......k........', '.......k........', '......ggg.......', '.....grrrg......', '....grYrrrg.....', '....grrrYrg.....', '....grYrrrg.....', '.....grrrg......', '......ggg.......', '.......g........', E, E, E, E, E],
  { k:'#3a3a3a', g:'#c9a227', r:'#c0392b', Y:'#ffd23a' });                       // renkli fener
S.silebezi = () => S0([E, '....bbbbbbb.....', '...b.......b....', '..b..wwwww..b...', '..b.wwrwwww.b...', '..b.wgrgwww.b...', '..b.wwrwwww.b...', '..b.wwwwwww.b...', '...b.wwwww.b....', '....bbbbbbb.....', E, E, E, E, E, E],
  { b:'#a8703a', w:'#fbfaf4', r:'#c0392b', g:'#4ea34a' });                       // nakış kasnağı
S.dupnisa = () => S0([E, '.......o........', '......o.o.......', '.......o........', '.......o........', '.k.....k.....k..', 'kkk...kkk...kkk.', 'kkkkkkkkkkkkkkk.', '.kkk.kkkkk.kkk..', '......kkk.......', '.......k........', E, E, E, E, E],
  { o:'#b8b8b8', k:'#2a2020' });                                                 // yarasa anahtarlık
S.hardaliye = () => S0([E, '.......b.ll.....', '.......bll......', '.....pPpPp......', '....pPpPpPp.....', '.....pPpPpP.....', '....pPpPpPp.....', '.....pPpPp......', '......pPpP......', '.......pP.......', '.......p........', E, E, E, E, E],
  { b:'#6b4a1e', l:'#5a8a3a', p:'#5a2a6a', P:'#8a5a9a' });                       // üzüm salkımı
S.mesebali = () => S0([E, E, '......b.b.......', '.....bbbbb......', '....bBbbbbb.....', '....bbbbbbb.....', '.....aaaaa......', '....aAaaaaa.....', '....aaaaaaa.....', '....aaaaaaa.....', '.....aaaaa......', '......aaa.......', E, E, E, E],
  { b:'#6b4a22', B:'#8a6a3a', a:'#9a6a34', A:'#c0905a' });                       // palamut
S.seka = () => S0([E, E, '.......w........', '.......wW.......', '.......wWW......', '.......wWWW.....', '......wwWWWW....', '.......w........', '.bbbbbbbbbbbbbb.', '..bBBBBBBBBBBb..', '...bbbbbbbbbb...', '....tttttttt....', '..tttttttttttt..', E, E, E],
  { w:'#ffffff', W:'#eef0f2', b:'#f6f2e6', B:'#ddd8cc', t:'#5ab0d0' });          // kâğıt gemi
S.pismaniye = () => S0([E, E, '....ffffffff....', '...fFfFfFfFff...', '...ffffffffff...', '..rrrrrrrrrrrr..', '..rrrrrrrrrrrr..', '..ryyyyyyyyyyr..', '..rrrrrrrrrrrr..', '..rrrrrrrrrrrr..', '..rrrrrrrrrrrr..', E, E, E, E, E],
  { f:'#fbf2dc', F:'#ffffff', r:'#c0392b', y:'#e0a526' });                       // pişmaniye kutusu
S.mandayogurt = () => S0([E, E, E, '..hh.......hh...', '...hkkkkkkkh....', '..kkkkkkkkkkk...', '.kkwkkkkkwkkkk..', '.kkkkkkkkkkkkk..', '..kkkkkkkkkkk...', '..kkkkkkkkkkk...', '..kk.kk..kk.kk..', '..kk.kk..kk.kk..', E, E, E, E],
  { h:'#d9cdb2', k:'#3a3434', w:'#e8e2d0' });                                    // manda biblosu
S.sapanca = () => S0([E, E, '.......w........', '.......wW.......', '.......wWW......', '.......wWWW.....', '.......w........', '..bbbbbbbbbbbb..', '...bBBBBBBBBb...', '....bbbbbbbb....', '..ttttttttttttt.', E, E, E, E, E],
  { w:'#fbfaf4', W:'#e8e6dc', b:'#a8643a', B:'#c98654', t:'#5aa0c8' });          // sandal
S.islama = () => S0([E, E, '.......gg.......', '......g.........', '....rrrrrr......', '...rrRrrrrr.....', '..rrRRrrrrrr....', '..rrrrrrrrrr....', '..rrrrrrrkrr....', '..rrrkrrrrrr....', '...rrrrrrrr.....', '....rrrrrr......', E, E, E, E],
  { g:'#4ea34a', r:'#d9382a', R:'#f07a62', k:'#7a1a10' });                       // közde domates
S.kabaktatlisi = () => S0([E, '.......g........', '......gg........', '....wwwwwww.....', '...wwWwwWwww....', '..wwWwwWwwWww...', '..wwWwwWwwWww...', '..wwWwwWwwWww...', '..wwWwwWwwWww...', '...wwWwwWwww....', '....wwwwwww.....', E, E, E, E, E],
  { g:'#5a7a3a', w:'#f2efe4', W:'#d9d4c4' });                                    // beyaz kabak
S.rakoczi = () => S0([E, E, '..oooo..........', '.o....o.........', '.o....o.........', '.o....oyyyyyyy..', '.o....o.....y.y.', '..oooo......y.y.', E, E, E, E, E, E, E, E],
  { o:'#b8902e', y:'#b8902e' });                                                 // eski anahtar
S.tekirdagkofte = () => S0([E, '.......g........', '......gg........', '.....wwww.......', '....wWwwWw......', '...wwWwwWww.....', '...wwWwwWww.....', '...wwWwwWww.....', '....wWwwWw......', '.....wwww.......', '......cc........', E, E, E, E, E],
  { g:'#4ea34a', w:'#f2e6c8', W:'#d9c08a', c:'#c9a86a' });                       // Tekirdağ soğanı
S.hayrabolu = () => S0([E, '......gggg......', '.......gg.......', '.....gGGGGg.....', '....gGGGGGGg....', '....gssssssg....', '....gssssssg....', '....gssssssgg...', '....gssssssg.g..', '....gssssssgg...', '....gggggggg....', E, E, E, E, E],
  { g:'#c9cfd6', G:'#eef2f4', s:'#e8b44a' });                                    // şerbet sürahisi
S.yuruyenkosk = () => S0([E, '.......l........', '......lll.......', '..l..lllll..l...', '..llllllllllll..', '...llllllllll...', '..llllllllllll..', '.lllllllllllll..', '...lll.ll.lll...', '.......b........', '.......b........', '.......b........', E, E, E, E],
  { l:'#5a9a3a', b:'#6b4a1e' });                                                 // çınar yaprağı
S.kivi = () => S0([E, '.......l........', '......lll.......', '.....l.b.l......', '.......b........', '.......b........', '....bbbbbbb.....', '....ppppppp.....', '....pPPPPPp.....', '....pPPPPPp.....', '.....ppppp......', E, E, E, E, E],
  { l:'#5a9a3a', b:'#6b4a1e', p:'#a8643a', P:'#7a4a2a' });                       // kivi fidanı
S.termal = () => S0([E, E, E, '..wwwwwwwwwwww..', '..wbwbwbwbwbww..', '..wwwwwwwwwwww..', '..wbwbwbwbwbww..', '..wwwwwwwwwwww..', '..wbwbwbwbwbww..', '..wwwwwwwwwwww..', '..ffffffffffff..', E, E, E, E, E],
  { w:'#ffffff', b:'#7fc0d8', f:'#d9e8ee' });                                    // havlu

// Elif Abla: koyu saç, Bursa ipeğinden mavi eşarp, gülümseme
export const GUIDE = () => G(16, '#e9d8f0').map(0, 0, [
  '................', '.....hhhhhh.....', '....hhhhhhhh....', '...hhhhhhhhhh...', '...hhssssssshh..', '...hssesssessh..', '...hssssssssh...',
  '...hsssmmsssh...', '...hhssssssh....', '....hhssssh.....', '.....bbsbbb.....', '...bbBbbBbbbb...', '..bbBbbBbbBbbb..', '..ppppppppppppp.', '..ppppppppppppp.', '..ppppppppppppp.'].map(r => r.padEnd(16, '.')),
  { h:'#3a2418', s:'#e8b48a', e:'#2a1d14', m:'#c0504a', b:'#2e7dba', B:'#8fc8f0', p:'#f2efe6' }).done();
