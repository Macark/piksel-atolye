/* ---------- badges ---------- */
const BTIER = { b:['#8E4E1E','#C9803F','#EDB27A'], s:['#6E7984','#AEB9C4','#E6ECF2'], g:['#9A6A08','#E0A526','#F8DC86'] };
const GLYPH = {
  brush:['........XXX','.......XXXX','......XXXX.','.....XXXX..','....XXXX...','...XXXX....','..rrXX.....','.rrrr......','rrrrr......','rrrr.......','rr.........'],
  palette:['...XXXXX...','.XXoooooXX.','XoroooobooX','XoooooooooX','XogooXXXooX','XoooX...XX.','XoyooX.....','XooooXXXXX.','.XoooooooX.','..XXXXXXX..','...........'],
  crown:['...........','X....X....X','XX..XXX..XX','XXX.XXX.XXX','XXXXXXXXXXX','XXXXXXXXXXX','XXrXXbXXrXX','XXXXXXXXXXX','XXXXXXXXXXX','...........','...........'],
  check:['...........','.........gg','........ggg','.......ggg.','gg....ggg..','ggg..ggg...','.ggggggg...','..ggggg....','...ggg.....','....g......','...........'],
  star:['.....X.....','....XyX....','....XyX....','XXXXXyXXXXX','XyyyyyyyyyX','.XyyyyyyyX.','..XyyyyyX..','.XyyyXyyyX.','.XyyX.XyyX.','XyyX...XyyX','XXX.....XXX'],
  grid:['rrr.bbb.ggg','rrr.bbb.ggg','rrr.bbb.ggg','...........','bbb.yyy.rrr','bbb.yyy.rrr','bbb.yyy.rrr','...........','ggg.rrr.bbb','ggg.rrr.bbb','ggg.rrr.bbb'],
  flame:['.....r.....','....rr.....','....rrr....','...rrrr..r.','..rrryrr.r.','..rryyrrrr.','.rryyyyrrr.','.rryyoyyrr.','.rryooyyrr.','..ryooyyr..','...rrrrr...'],
  calendar:['..X.....X..','XXXXXXXXXXX','XrrrrrrrrrX','XXXXXXXXXXX','XoooooooooX','XooXXXXXooX','XooooooXooX','XoooooXoooX','XooooXooooX','XooooXooooX','XXXXXXXXXXX'],
  drop:['.....X.....','....XbX....','....XbX....','...XbbbX...','...XbbbX...','..XobbbbX..','..XobbbbX..','.XobbbbbbX.','.XbbbbbbbX.','..XbbbbbX..','...XXXXX...'],
  stamp:['...XXXXX...','...XwwwX...','...XwwwX...','....XwX....','....XwX....','.XXXXXXXXX.','.XwwwwwwwX.','.XXXXXXXXX.','...........','.rrrrrrrrr.','...........'],
  globe:['...XXXXX...','..XbbgbbX..','.XbggggbbX.','XbbggbbbbbX','XbbbgbbggbX','XbbbbbgggbX','XbbbbbbggbX','XggbbbbbbbX','.XgggbbbbX.','..XbbbbbX..','...XXXXX...'],
  book:['...........','.XXXX.XXXX.','XooooXooooX','XoXXoXoXXoX','XooooXooooX','XoXXoXoXXoX','XooooXooooX','XoXXoXoXXoX','XooooXooooX','XXXXXXXXXXX','...........'],
  balloon:['...XXXXX...','..XrrrrrX..','.XrorrrrrX.','.XrorrrrrX.','.XrrrrrrrX.','..XrrrrrX..','...XrrrX...','....XXX....','.....X.....','......X....','.....X.....'],
  camera:['...XXX.....','XXXXXXXXXXX','XoooooooorX','XooXXXXXooX','XoXbbbbbXoX','XoXbobbbXoX','XoXbbbbbXoX','XooXXXXXooX','XoooooooooX','XXXXXXXXXXX','...........'],
  bow:['...........','XX.......XX','XrX.....XrX','XrrX...XrrX','XrrrXXXrrrX','XrrrXrXrrrX','XrrrXXXrrrX','XrrX...XrrX','XrX.....XrX','XX.......XX','...........'],
  share:['.....X.....','....XXX....','...XXXXX...','..XXXXXXX..','....XXX....','....XXX....','XX..XXX..XX','XX..XXX..XX','XX.......XX','XXXXXXXXXXX','XXXXXXXXXXX'],
  suitcase:['...........','...XXXXX...','...X...X...','XXXXXXXXXXX','XwwrwwwrwwX','XwwrwwwrwwX','XXXXXXXXXXX','XwwrwwwrwwX','XwwrwwwrwwX','XXXXXXXXXXX','.X.......X.'],
  gull:['...........','...........','XX.......XX','XoX.....XoX','.XoX...XoX.','..XoXXXoX..','...XoooXy..','....XXX....','...........','.bb.bb.bb..','b..b..b..b.']
};
let decoSnap = '';
const decoKey = () => viewRec ? JSON.stringify([viewRec.emo || [], viewRec.frame || 'polaroid', viewRec.stickers || []]) : '';
const nOn = o => Object.values(o || {}).filter(Boolean).length;
const BADGES = [
  { id:'ilk', name:'İlk Fırça', how:'İlk resmini bitir.', t:'b', g:'brush', rib:'#E0763F', goal:1, coin:20, v:() => DB.stats.pics },
  { id:'cirak', name:'Çırak', how:'10 resim bitir.', t:'s', g:'palette', rib:'#2E7DBA', goal:10, coin:40, v:() => DB.stats.pics },
  { id:'usta', name:'Usta Ressam', how:'50 resim bitir.', t:'g', g:'crown', rib:'#C4552C', goal:50, coin:100, v:() => DB.stats.pics },
  { id:'kusursuz', name:'Kusursuz', how:'Bir resmi hiç yanlış dokunmadan bitir.', t:'s', g:'check', rib:'#3E8E5A', goal:1, coin:30, v:() => Object.values(DB.stars).filter(x => x >= 3).length },
  { id:'yildiz', name:'Yıldız Toplayıcı', how:'Toplam 60 yıldız topla.', t:'g', g:'star', rib:'#8A4FB0', goal:60, coin:80, v:() => totalStars() },
  { id:'kare', name:'Kare Kare', how:'Toplam 10.000 kare boya.', t:'s', g:'grid', rib:'#2EB8B0', goal:10000, coin:80, v:() => DB.stats.cells },
  { id:'seri3', name:'Alışkanlık', how:'Günün resmini 3 gün üst üste boya.', t:'b', g:'flame', rib:'#E0763F', goal:3, coin:30, v:() => Math.max(DB.stats.bestStreak || 0, DB.streak ? DB.streak.n : 0) },
  { id:'seri7', name:'Sadık Ressam', how:'Günün resmini 7 gün üst üste boya.', t:'g', g:'calendar', rib:'#E8558F', goal:7, coin:80, v:() => Math.max(DB.stats.bestStreak || 0, DB.streak ? DB.streak.n : 0) },
  { id:'saf', name:'Saf Fırça', how:'Günün resmini hiç güç kullanmadan bitir.', t:'s', g:'drop', rib:'#E0A526', goal:1, coin:30, v:() => DB.flags.pure ? 1 : 0 },
  { id:'damga', name:'İlk Damga', how:'Dünya Turu’nda bir şehri bitir.', t:'b', g:'stamp', rib:'#2E7DBA', goal:1, coin:40, v:() => nOn(DB.stamps) },
  { id:'gezgin', name:'Dünya Gezgini', how:'Dünya Turu’ndaki bütün şehirleri bitir.', t:'g', g:'globe', rib:'#3E8E5A', goal:CITIES.length, coin:150, v:() => nOn(DB.stamps) },
  { id:'album', name:'Koleksiyoncu', how:'Bir albümün bütün resimlerini bitir.', t:'s', g:'book', rib:'#6A5AC8', goal:1, coin:40, v:() => nOn(DB.albumsDone) },
  { id:'etkinlik', name:'Şenlik Ruhu', how:'Bir etkinliğin bütün resimlerini bitir.', t:'g', g:'balloon', rib:'#E8558F', goal:1, coin:50, v:() => nOn(DB.eventsDone) },
  { id:'ani', name:'Anı Defteri', how:'Kendi fotoğrafını boya.', t:'b', g:'camera', rib:'#2EB8B0', goal:1, coin:30, v:() => DB.flags.photo ? 1 : 0 },
  { id:'susle', name:'Süslemeci', how:'Bir hatıra kartına emoji, sticker ya da yeni çerçeve ekle.', t:'b', g:'bow', rib:'#E8558F', goal:1, coin:20, v:() => DB.flags.deco ? 1 : 0 },
  { id:'paylas', name:'Paylaşımcı', how:'Bir resmini paylaş.', t:'b', g:'share', rib:'#2E7DBA', goal:1, coin:20, v:() => DB.flags.share ? 1 : 0 },
  { id:'bavul', name:'Hatıra Avcısı', how:'Dünya Turu’nda rehberlerin sorularını bilerek 10 hatıra topla.', t:'g', g:'suitcase', rib:'#C8772A', goal:10, coin:60, v:() => nOn(DB.souv) },
  { id:'marti', name:'Martı Dostu', how:'Martılara Simit At oyununda bir seferde 15 martı doyur.', t:'s', g:'gull', rib:'#C4552C', goal:15, coin:30, v:() => DB.flags.gull || 0 }
];
DB.badges = DB.badges || {}; DB.flags = DB.flags || {};
const GCOL = { X:'#2A1D14', o:'#FFF7EA', r:'#D7263D', b:'#2E7DBA', g:'#3E8E5A', y:'#F2C230', w:'#C8772A' };
const GCOL_OFF = { X:'#5E544B', o:'#E6DED3', r:'#7D7268', b:'#6E645A', g:'#A2978B', y:'#B0A598', w:'#7D7268' };
function badgeCanvas(b, on){
  const c = document.createElement('canvas'); c.width = 25; c.height = 27; const g = c.getContext('2d');
  const T = on ? BTIER[b.t] : ['#857A6E','#B3A89B','#D3CABF'], ink = '#2A1D14', rib = on ? b.rib : '#968C80', P = on ? GCOL : GCOL_OFF;
  rect(g, 4, 0, 6, 10, ink); rect(g, 5, 0, 4, 10, rib); rect(g, 15, 0, 6, 10, ink); rect(g, 16, 0, 4, 10, rib);
  for (let y = 4; y < 27; y++) for (let x = 0; x < 25; x++){
    const dx = x + 0.5 - 12.5, dy = y + 0.5 - 15.5, d = Math.hypot(dx, dy);
    if (d > 10.95) continue;
    rect(g, x, y, 1, 1, d > 9.9 ? ink : d > 8.6 ? (dx + dy < 0 ? T[2] : T[0]) : T[1]);
  }
  GLYPH[b.g].forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== '.') rect(g, 7 + x, 10 + y, 1, 1, P[ch]); }));
  return c;
}
function checkBadges(){
  const got = [];
  BADGES.forEach(b => { if (!DB.badges[b.id] && b.v() >= b.goal){ DB.badges[b.id] = Date.now(); DB.coins += b.coin; got.push(b); } });
  if (got.length){ save(); setCoins(); }
  return got;
}
function badgeJingle(){ [988, 1319, 1568].forEach((f, k) => tone(f, 0.14, k * 0.07, 'square', 0.05)); if (navigator.vibrate && !DB.noVibe) try { navigator.vibrate([10, 40, 10]); } catch(e){} }
let btT = 0;
function badgeToast(list){
  if (!list.length) return;
  const b = list[0], el = $('#btoast');
  el.innerHTML = ''; el.append(badgeCanvas(b, true));
  const t = document.createElement('div');
  t.innerHTML = `<small>YENİ ROZET</small><b></b><span></span>`;
  t.querySelector('b').textContent = b.name;
  t.querySelector('span').textContent = TL('+{0} coin', list.reduce((a, x) => a + x.coin, 0)) + (list.length > 1 ? `, ${list.length - 1} rozet daha` : '');
  el.append(t); el.setAttribute('aria-label', TL('Yeni rozet: {0}. Rozetleri görmek için dokun.', b.name));
  el.hidden = false; el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
  el.onclick = () => { el.hidden = true; openBadges(b.id); };
  badgeJingle(); clearTimeout(btT); btT = setTimeout(() => { el.hidden = true; }, 3600);
}
const afterBadge = () => { badgeToast(checkBadges()); if (typeof atNotify === 'function') atNotify(3800); };
function showDoneBadges(list){
  const box = $('#doneBadges'); box.innerHTML = ''; box.hidden = !list.length;
  list.forEach(b => {
    const d = document.createElement('button'); d.type = 'button'; d.className = 'bnewi';
    d.append(badgeCanvas(b, true));
    const t = document.createElement('div'); t.innerHTML = '<small>YENİ ROZET</small><b></b><span></span>';
    t.querySelector('b').textContent = b.name; t.querySelector('span').textContent = TL('+{0} coin', b.coin);
    d.append(t); d.setAttribute('aria-label', TL('Yeni rozet: {0}, {1} coin. Rozetleri aç.', b.name, b.coin));
    d.onclick = () => openBadges(b.id);
    box.append(d);
  });
  if (list.length) setTimeout(badgeJingle, 900);
}
let bSel = null;
function openBadges(sel){
  const have = BADGES.filter(b => DB.badges[b.id]).length;
  if (sel) bSel = sel;
  $('#btoast').hidden = true;
  if (!bSel || !BADGES.some(b => b.id === bSel)){
    const near = BADGES.filter(b => !DB.badges[b.id]).sort((a, b) => b.v() / b.goal - a.v() / a.goal)[0];
    bSel = (near || BADGES[0]).id;
  }
  $('#bCount').textContent = TL('{0} / {1} ROZET', have, BADGES.length);
  const G = $('#bGrid'); G.innerHTML = '';
  BADGES.forEach(b => {
    const on = !!DB.badges[b.id], d = document.createElement('button'); d.type = 'button';
    d.className = 'bcell' + (on ? '' : ' off'); d.setAttribute('aria-pressed', String(b.id === bSel));
    d.append(badgeCanvas(b, on));
    const nm = document.createElement('span'); nm.className = 'bname'; nm.textContent = b.name; d.append(nm);
    // Alt satır her hücrede aynı yükseklikte: kazanıldıysa onay, değilse ilerleme çubuğu (hizalar bozulmasın)
    const ft = document.createElement('div'); ft.className = 'bfoot';
    if (on) ft.textContent = '✓ KAZANILDI';
    else { const pr = Math.min(100, Math.floor(b.v() / b.goal * 100)); if (pr > 0) d.classList.add('prog'); ft.innerHTML = `<div class="bbar"><i style="width:${pr}%"></i></div>`; }
    d.append(ft);
    d.setAttribute('aria-label', `${b.name}, ${on ? 'kazanıldı' : 'henüz kazanılmadı'}`);
    d.onclick = () => openBadges(b.id);
    G.append(d);
  });
  const b = BADGES.find(x => x.id === bSel), on = !!DB.badges[b.id], D = $('#bDetail');
  const cur = Math.min(b.goal, b.v()), fmt = n => n.toLocaleString(LOC);
  D.innerHTML = ''; D.append(badgeCanvas(b, on));
  const t = document.createElement('div'); t.innerHTML = '<b></b><p></p>';
  t.querySelector('b').textContent = b.name; t.querySelector('p').textContent = b.how;
  if (on){ const sm = document.createElement('small'); sm.textContent = TL('Kazandın: {0}. Ödül: {1} coin.', new Date(DB.badges[b.id]).toLocaleDateString(LOC, { day:'numeric', month:'long', year:'numeric' }), b.coin); t.append(sm); }
  else {
    if (b.goal > 1){ const bar = document.createElement('div'); bar.className = 'bbar'; bar.innerHTML = `<i style="width:${Math.floor(cur / b.goal * 100)}%"></i>`; t.append(bar); }
    const sm = document.createElement('small'); sm.textContent = (b.goal > 1 ? `${fmt(cur)} / ${fmt(b.goal)}. ` : '') + TL('Ödül: {0} coin.', b.coin); t.append(sm);
  }
  D.append(t);
  $('#badges').classList.add('on'); $('#badgesX').focus();
}
$('#badgesX').onclick = () => $('#badges').classList.remove('on');
$('#statsBadges').onclick = () => openBadges();

