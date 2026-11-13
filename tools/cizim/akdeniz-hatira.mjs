// Akdeniz hatıraları (16x16, krem zemin) ve Kaptan Deniz portresi
import { G } from './grid.mjs';
const BG = '#e8d5b0';
const S0 = (rows, cmap) => G(16, BG).map(0, 0, rows, cmap).done();
export const S = {};

S.taskopru = () => S0([
  '................', '................', '.oooooooooooooo.', '.osssssssssssso.', '.osssssssssssso.', '.osssssssssssso.',
  '.obbbbbbbbbbbbo.', '.obwwbbwwbbwwbo.', '.owwwwwwwwwwwwo.', '.owwwwwwwwwwwwo.', '.oooooooooooooo.', '................',
  '................', '................', '................', '................'],
  { o:'#6a4a2e', s:'#a8d8f0', b:'#c8a878', w:'#3f8fc0' });
S.adanakebap = () => S0([
  '................', '................', '.....dddddd.....', '...ddllllllld...', '..dllllkllllld..', '..dlllllllkllld.', '.dllkllllllllld.',
  '.dlllllllllllld.', '.dllllllkllllld.', '..dllkllllllld..', '..dllllllllld...', '...dddllllddd...', '......dddd......', '................', '................', '................'],
  { d:'#c9984f', l:'#ecd09a', k:'#a8763a' });
S.salgam = () => S0([
  '................', '......cc........', '......cc........', '......gg........', '.....gwwg.......', '.....gwwg.......', '....gppppg......',
  '....gpPppg......', '....gpPppg......', '....gpPppg......', '....gpPppg......', '....gppppg......', '....gggggg......', '................', '................', '................'],
  { c:'#c0392b', g:'#d9e8ee', w:'#f4fbfd', p:'#7a1f3d', P:'#a3365c' });
S.aspendos = () => S0([
  '................', '...yyyyyyyyy....', '..yYYYYYYYYYy...', '..yYYYYYYYYYy...', '..yYkkYYYkkYy...', '..yYkkYYYkkYy...', '..yYYYYYYYYYy...',
  '..yYYYYYYYYYy...', '..yYYkYYYkYYy...', '...yYYkkkYYy....', '...yYYYYYYYy....', '....yYYYYYy.....', '.....yyyyy......', '...........r....', '..........rr....', '................'],
  { y:'#a8781e', Y:'#e8b84a', k:'#3a2a18', r:'#c0392b' });
S.piyaz = () => S0([
  '................', '................', '.....dddddd.....', '.....llllll.....', '....jjjjjjjj....', '....jttttttj....', '....jttttttj....',
  '....jttttttj....', '....jtlltttj....', '....jttttttj....', '....jttttttj....', '....jttttttj....', '....jjjjjjjj....', '................', '................', '................'],
  { d:'#8a5a2e', l:'#b07a42', j:'#dfe8ea', t:'#d9bf8a' });
S.finike = () => S0([
  '................', '.......cc.......', '.......cc.......', '......gggg......', '.....gwwwwg.....', '....gwwwwwwg....', '....gwwwwwwg....',
  '....goooooog....', '....goOOOOog....', '....goOggOog....', '....goOOOOog....', '....goooooog....', '....gwwwwwwg....', '....gggggggg....', '................', '................'],
  { c:'#c08a40', g:'#cfe2e8', w:'#f2f8fa', o:'#f08a1c', O:'#f7b55a' });
S.salda = () => S0([
  '................', '................', '.pppppppppppppp.', '.pssssssssssssp.', '.pssssssssssssp.', '.pttttttttttttp.', '.ptttTTTTttttTp.',
  '.pttttttttttttp.', '.pwwwwwwwwwwwwp.', '.pwwwwwwwwwwwwp.', '.pppppppppppppp.', '................', '................', '................', '................', '................'],
  { p:'#fbf7ee', s:'#bfe6f6', t:'#3fc1c9', T:'#9be8e4', w:'#ffffff' });
S.burdursis = () => S0([
  '................', '................', '...b............', '...bb...........', '....ggg.........', '...gGGgg........', '....gggggg......',
  '.....gkggggg....', '......gggkgg....', '.......ggggggg..', '.........gkggg..', '...........ggg..', '............g...', '................', '................', '................'],
  { b:'#6b4a1e', g:'#3f8a34', G:'#6cb64f', k:'#24301c' });
S.cevizezmesi = () => S0([
  '................', '................', '......bbbb......', '....bBBbbBBb....', '...bBbbBBbbBb...', '...bbBbbbbBbb...', '..bBbbBbBbbBbb..',
  '..bbBbbbbBbbbb..', '..bBbbBbbbBbBb..', '...bbBbbBbbbb...', '...bBbbbbBbBb...', '....bbBbbbbb....', '......bbbb......', '................', '................', '................'],
  { b:'#8a5a2b', B:'#b98448' });
S.stpierre = () => S0([
  '................', '.......y........', '......yYy.......', '.......y........', '................', '....cccccccc....', '...cCCCCCCCCcc..',
  '..cCCCCCCCCCCcc.', '..cccccccccccc..', '...cc......cc...', '................', '................', '................', '................', '................', '................'],
  { y:'#f2b23f', Y:'#fff0b0', c:'#9c5a2e', C:'#c47a40' });
S.kunefe = () => S0([
  '................', '................', '................', '...cccccccccc...', '.hcCCCCCCCCCCch.', '.hcCooooooooCch.', '..cCoOoOoooOCc..',
  '..cCooOoooOoCc..', '..cCoooOoOooCc..', '..cCCCCCCCCCCc..', '...cccccccccc...', '................', '................', '................', '................', '................'],
  { c:'#8e4a20', C:'#d27b3a', h:'#6e3a18', o:'#f2b23f', O:'#5aa83a' });
S.kagitkebap = () => S0([
  '................', '................', '.........l......', '........lL......', '.......lLl..l...', '......lLl..lL...', '.....bLl..lLl...',
  '....b.l..lLl....', '...b.....Ll.....', '..b.....l.......', '.b..............', '................', '................', '................', '................', '................'],
  { b:'#7a5a2e', l:'#3f7a34', L:'#6aa84a' });
S.egirdir = () => S0([
  '................', '................', '.oooooooooooooo.', '.osssssssssssso.', '.osssssmsssssso.', '.ossssmmmssssso.', '.osssmmmmmsssso.',
  '.owwwwwwmwwwwwo.', '.owbbbbbbbbbbwo.', '.owwbbbbbbbbwwo.', '.owwwwwwwwwwwwo.', '.oooooooooooooo.', '................', '................', '................', '................'],
  { o:'#6a4a2e', s:'#c9e6f4', m:'#f4efe6', w:'#3cb5bd', b:'#b5652e' });
S.gulyagi = () => S0([
  '................', '.......kk.......', '.......kk.......', '......gggg......', '.....gppppg.....', '....gpppPppg....', '....gppPPPpg....',
  '....gpppPppg....', '....gppppppg....', '....gpwwwwpg....', '....gpwrrwpg....', '....gpwwwwpg....', '....gppppppg....', '.....gggggg.....', '................', '................'],
  { k:'#b07a42', g:'#d9c4cc', p:'#f4b8c8', P:'#e8678a', w:'#ffffff', r:'#d8406a' });
S.halisi = () => S0([
  '................', '.......o........', '......o.o.......', '.......o........', '.......o........', '...nnnnnnnnnn...', '...nrrrrrrrrn...',
  '...nrryyyyrrn...', '...nryynnyyrn...', '...nryynnyyrn...', '...nrryyyyrrn...', '...nrrrrrrrrn...', '...nnnnnnnnnn...', '...w.w.w.w.w....', '................', '................'],
  { o:'#b8b8b8', n:'#1f3a5f', r:'#9e2a2b', y:'#e8c87a', w:'#f6efe2' });
S.marasKale = () => S0([
  '................', '.....gggggg.....', '...ggrrrrrrgg...', '..grrrrrrrrrrg..', '..grrwwrrrrrrg..', '.grrwwrrrrwrrrg.', '.grrwrrrrwwwrrg.',
  '.grrwrrrrrwrrrg.', '.grrwwrrrrrrrrg.', '..grrwwrrrrrrg..', '..grrrrrrrrrrg..', '...ggrrrrrrgg...', '.....gggggg.....', '................', '................', '................'],
  { g:'#c9a227', r:'#e30a17', w:'#ffffff' });
S.dondurma = () => S0([
  '................', '.....wwwwww.....', '....wWWWWWWw....', '...wWWgWWWWWw...', '...wWWWWWgWWw...', '...wwwwwwwwww...', '....cCcCcCcc....',
  '....cccCcCcc....', '.....cCcCcc.....', '.....ccCccc.....', '......cCcc......', '......ccc.......', '.......c........', '................', '................', '................'],
  { w:'#e8e2d0', W:'#fffdf6', g:'#7fb04a', c:'#c9884a', C:'#a8692e' });
S.marasbiber = () => S0([
  '.......b........', '.......b........', '......gbg.......', '.....rrbrr......', '.....rRbrr......', '......rbr.......', '.....rrbrr......',
  '.....rRbrr......', '......rbr.......', '.....rrbrr......', '.....rRbrr......', '......rbr.......', '.......b........', '.......b........', '................', '................'],
  { b:'#8a6a3e', g:'#4f7a2a', r:'#b3261e', R:'#e05a3a' });
S.kizkalesi = () => S0([
  '................', '................', '.....pPpPpP.....', '...pPpPpPpPpP...', '..pPpPpPpPpPpP..', '..pPpPpPpPpPpP..', '..pPpPpPpPpPpP..',
  '...pPpPpPpPpP...', '....pPpPpPpP....', '.....pPpPpP.....', '......pPpP......', '.....ppppPp.....', '.....pp..pp.....', '................', '................', '................'],
  { p:'#d98a7a', P:'#f6c4b4' });
S.tantuni = () => S0([
  '................', '................', '................', '.....yyyyy......', '...yyYYYYYyy....', '..yYYyYYyYYYy...', '..yYYYyyYYYYy...',
  '.yYYyYYyYYyYYy..', '.yyyyyyyyyyyyy..', '.wwwwwwwwwwwww..', '................', '................', '................', '................', '................', '................'],
  { y:'#e6c21e', Y:'#fbe98a', w:'#fffbe6' });
S.cezerye = () => S0([
  '.........g.g....', '..........g.....', '.........gGg....', '........ooo.....', '.......oOo......', '......oOo.......', '.....oOo........',
  '....oOo.........', '...oOo..........', '..ooo...........', '..o.............', '................', '................', '................', '................', '................'],
  { g:'#3f8a34', G:'#6cb64f', o:'#e0761a', O:'#f6a04a' });
S.karatepe = () => S0([
  '................', '................', '........mmm.....', '.......mfffm....', '.......mfekfm...', '.......mffffm...', '..t....mfkkfm...',
  '..t.bbbbmmmm....', '...bbbbbbbbb....', '...bbbbbbbbb....', '...bb.....bb....', '...bb.....bb....', '..dddddddddddd..', '..dddddddddddd..', '................', '................'],
  { m:'#7d7c82', f:'#58575c', e:'#e8e2d0', k:'#2c2b2f', t:'#4f4e52', b:'#4f4e52', d:'#a08a6e' });
S.yerfistigi = () => S0([
  '................', '................', '.....rrrrrr.....', '.....rRRRRr.....', '....jjjjjjjj....', '....jbbbbbbj....', '....jbwwwwbj....',
  '....jbwppwbj....', '....jbwwwwbj....', '....jbbbbbbj....', '....jbbbbbbj....', '....jjjjjjjj....', '................', '................', '................', '................'],
  { r:'#c0392b', R:'#e05a3a', j:'#dfe8ea', b:'#a8692e', w:'#f6efe2', p:'#d6aa6a' });
S.kilim = () => S0([
  '................', '.....kkkkkk.....', '....k......k....', '....k......k....', '..rrrrrrrrrrrr..', '..rkkkkkkkkkkr..', '..ryyrrrrryyrr..',
  '..rryyrrryyrrr..', '..rrryyryyrrrr..', '..rryyrrryyrrr..', '..ryyrrrrryyrr..', '..rkkkkkkkkkkr..', '..rrrrrrrrrrrr..', '................', '................', '................'],
  { k:'#2a2422', r:'#b5281f', y:'#f2c14a' });

// Kaptan Deniz: kaptan şapkası, güneş yanığı yüz, bıyık, çizgili tişört
export const GUIDE = () => G(16, '#bfe3f2').map(0, 0, [
  '................', '....wwwwwwww....', '...wwwwwwwwww...', '...wwwgggwwww...', '..kkkkkkkkkkkk..', '....ssssssss....', '....sesssses....',
  '....ssssssss....', '....ssmmmmss....', '.....ssssss.....', '......ssss......', '...bbwwbbwwbb...', '..bbwwbbwwbbww..', '..wwbbwwbbwwbb..', '..bbwwbbwwbbww..', '..wwbbwwbbwwbb..'],
  { w:'#fbfbf6', g:'#e0a526', k:'#1f2a3a', s:'#c98a5a', e:'#2a1d14', m:'#5a3a22', b:'#2e5f9e' }).done();
