/* ---------- Köfte'nin Atölyesi ----------
   Oyuncunun "yuva"sı: coin ve ödüllerle süslenen tek oda. Biten resimler çerçevelere asılır,
   hatıralar rafta durur. Oda verisi ve eşyalar içerikte (src/content/atolye.json).
   Kayıt: DB.atolye = { var:{eşya:true}, yuva:{yuva:eşya}, cerceve:[4], raf:[3], yeni:[eşya] }
   Eski kayıtlarda alan yoksa başlangıç eşyalarıyla kurulur; başka hiçbir kayıt alanına dokunulmaz.
   Performans: oda değişince bir kez çizilir; sürekli güncellenen tek şey Köfte'nin küçük katmanı
   (yalnızca atölye ekranı açıkken, saniyede ~8 kare). */
const AT = CONTENT.atolye;
const AT_ITEM = Object.fromEntries(AT.items.map(i => [i.id, i]));
const AT_SLOT = Object.fromEntries(AT.slots.map(s => [s.id, s]));
const AT_DRAW = ['tavan', 'kose', 'masa', 'masaustu', 'hali', 'yatak', 'mama', 'oyuncak'];   // çizim sırası (arkadan öne)
const AT_TABS = [...AT.slots.map(s => ({ id:s.id, name:s.name })), { id:'cerceve', name:'Çerçeveler' }, { id:'raf', name:'Raf' }];

function atData(){
  const a = DB.atolye = DB.atolye || {};
  a.var = a.var || {}; a.yuva = a.yuva || {}; a.yeni = a.yeni || [];
  a.cerceve = Array.isArray(a.cerceve) ? a.cerceve : []; while (a.cerceve.length < AT.frames.length) a.cerceve.push(null);
  a.raf = Array.isArray(a.raf) ? a.raf : []; while (a.raf.length < AT.shelf.spots.length) a.raf.push(null);
  AT.items.forEach(it => { if (it.start) a.var[it.id] = true; });
  AT.slots.forEach(s => { const cur = AT_ITEM[a.yuva[s.id]]; if (!cur || cur.slot !== s.id || !a.var[cur.id]) a.yuva[s.id] = AT.defaults[s.id]; });
  return a;
}
// Ödül koşulu: bölgenin bütün illeri bitti / rozet kazanıldı / albüm bitti
function atRewardOk(r){
  if (!r) return false;
  if (r.type === 'region'){ const all = ILLER.filter(i => i.region === r.id); return all.length > 0 && all.every(ilDone); }
  if (r.type === 'badge') return !!(DB.badges && DB.badges[r.id]);
  if (r.type === 'album') return !!(DB.albumsDone && DB.albumsDone[r.id]);
  return false;
}
function atRewardText(r){
  if (r.type === 'region') return TL('{0} bölgesindeki bütün illeri bitirince kazanılır.', TR_REG[r.id] ? trx(TR_REG[r.id].name) : r.id);
  if (r.type === 'badge'){ const b = BADGES.find(x => x.id === r.id); return TL('“{0}” rozetini kazanınca gelir: {1}', b ? trx(b.name) : r.id, b ? trx(b.how) : ''); }
  if (r.type === 'album'){ const al = ALBUMS.find(x => x.id === r.id); return TL('{0} albümünü bitirince kazanılır.', al ? trx(al.name) : r.id); }
  return '';
}
// Hak edilen ödül eşyalarını ver (eski oyunculara geriye dönük de). Yeni gelenleri döndürür.
function atCheck(){
  const a = atData(), got = [];
  AT.items.forEach(it => { if (it.reward && !a.var[it.id] && atRewardOk(it.reward)){ a.var[it.id] = true; a.yeni.push(it.id); got.push(it); } });
  if (got.length) save();
  atDot(); return got;
}
function atDot(){ const d = $('#atDot'); if (d) d.hidden = !(DB.atolye && DB.atolye.yeni && DB.atolye.yeni.length); }
// Bildirim: rozet bildirimiyle aynı yerde, kısa süre
let atToastT = 0;
function atNotify(delay){
  const got = atCheck(); if (!got.length) return;
  setTimeout(() => {
    const el = $('#btoast'), it = got[0]; el.innerHTML = '';
    const c = atSprite(it.art, 2); c.className = 'attoastimg'; el.append(c);
    const t = document.createElement('div'); t.innerHTML = '<small></small><b></b><span></span>';
    t.querySelector('small').textContent = trx('ATÖLYEN İÇİN YENİ EŞYA!');
    t.querySelector('b').textContent = trx(it.name);
    t.querySelector('span').textContent = got.length > 1 ? TL('ve {0} eşya daha', got.length - 1) : trx('Köfte’nin atölyesinde seni bekliyor.');
    el.append(t); el.setAttribute('aria-label', TL('Atölyen için yeni eşya: {0}. Atölyeyi açmak için dokun.', trx(it.name)));
    el.hidden = false; el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
    el.onclick = () => { el.hidden = true; $('.ov.on') && document.querySelectorAll('.ov.on').forEach(o => o.classList.remove('on')); openAtolye(it.slot); };
    badgeJingle(); clearTimeout(atToastT); atToastT = setTimeout(() => { el.hidden = true; }, 4200);
  }, delay || 0);
}

/* çizim */
const atCache = new WeakMap();
function atSprite(art, sc = 1){
  let base = atCache.get(art);
  if (!base){
    base = document.createElement('canvas'); base.width = art.w; base.height = art.h;
    const g = base.getContext('2d'), im = g.createImageData(art.w, art.h), d = im.data, col = {};
    Object.entries(art.cols).forEach(([k, h]) => { col[k] = unhex(h); });
    art.rows.forEach((r, y) => { for (let x = 0; x < r.length; x++){ const ch = r[x]; if (ch === '.') continue; const c = col[ch], o = (y * art.w + x) * 4; d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255; } });
    g.putImageData(im, 0, 0); atCache.set(art, base);
  }
  if (sc === 1) return base;
  const c = document.createElement('canvas'); c.width = art.w * sc; c.height = art.h * sc; const g = c.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(base, 0, 0, c.width, c.height); return c;
}
function atPlace(g, it, s){
  const sp = atSprite(it.art);
  if (s.tile){ for (let y = s.y; y < s.y + s.h; y += it.art.h) for (let x = s.x; x < s.x + s.w; x += it.art.w){ const w = Math.min(it.art.w, s.x + s.w - x), h = Math.min(it.art.h, s.y + s.h - y); g.drawImage(sp, 0, 0, w, h, x, y, w, h); } }
  else g.drawImage(sp, s.x + Math.floor((s.w - it.art.w) / 2), s.y + s.h - it.art.h);   // alta ve ortaya hizalı
}
function atPicCanvas(ref){
  // çerçevedeki resim: { t:'i', id } hazır resim ya da { t:'f', d } kendi fotoğrafı (tarihle bulunur)
  let art = null;
  if (ref && ref.t === 'i' && ITEMS[ref.id] && DB.done[ref.id]) art = getArt(ref.id);
  else if (ref && ref.t === 'f'){ const p = DB.gallery.find(x => x.date === ref.d); if (p) art = p; }
  if (!art) return null;
  const c = document.createElement('canvas'); drawArt(c, art); return c;
}
const atPicCache = new Map();
function atPic(ref){ const k = JSON.stringify(ref); if (!atPicCache.has(k)) atPicCache.set(k, atPicCanvas(ref)); return atPicCache.get(k); }
function atRoomDraw(g, over){
  const a = atData(), pick = id => AT_ITEM[(over && over[id]) || a.yuva[id]];
  g.imageSmoothingEnabled = false; g.clearRect(0, 0, AT.room.w, AT.room.h);
  atPlace(g, pick('duvar'), AT_SLOT.duvar); atPlace(g, pick('zemin'), AT_SLOT.zemin);
  rect(g, 0, AT.room.wallH - 2, AT.room.w, 3, '#6E4A2A');                                                                 // süpürgelik
  const pw = AT_SLOT.pencere;                                                                                              // pencere çerçevesi
  rect(g, pw.x - 2, pw.y - 2, pw.w + 4, pw.h + 4, '#F6F0E2'); atPlace(g, pick('pencere'), pw);
  rect(g, pw.x + pw.w / 2 - 1, pw.y - 2, 2, pw.h + 4, '#F6F0E2'); rect(g, pw.x - 2, pw.y + pw.h / 2 - 1, pw.w + 4, 2, '#F6F0E2'); rect(g, pw.x - 4, pw.y + pw.h + 1, pw.w + 8, 2, '#D8C8A8');
  AT.frames.forEach(([x, y], k) => {                                                                                       // çerçeveler
    rect(g, x - 1, y - 1, 18, 18, '#6E4A2A');
    const pc = atPic(a.cerceve[k]);
    if (pc) g.drawImage(pc, 0, 0, pc.width, pc.height, x, y, 16, 16); else { rect(g, x, y, 16, 16, '#F6F0E2'); rect(g, x + 6, y + 7, 4, 2, '#D8C8A8'); }
  });
  const sh = AT.shelf;                                                                                                     // raf ve hatıralar
  rect(g, sh.x, sh.y, sh.w, 3, '#8A5E38'); rect(g, sh.x + 4, sh.y + 3, 2, 3, '#6E4A2A'); rect(g, sh.x + sh.w - 6, sh.y + 3, 2, 3, '#6E4A2A');
  sh.spots.forEach(([x, y], k) => { const id = a.raf[k]; if (id && SOUV[id] && DB.souv[id]){ const c = document.createElement('canvas'); drawArt(c, decodeArt(SOUV[id].art, id)); g.drawImage(c, x, y); } });
  AT_DRAW.forEach(id => atPlace(g, pick(id), AT_SLOT[id]));
}
const atRoomCv = $('#atRoom'), atKCv = $('#atKofte');
let atOver = null;
function atRender(){ atRoomDraw(atRoomCv.getContext('2d'), atOver); atKKey = ''; atKDraw(); }

/* Köfte: göz kırpar, kuyruk sallar; dokununca tepki verir */
let atLoopT = 0, atNextBlink = 0, atBlinkTo = 0, atTailTo = 0, atNextTail = 0, atHopTo = 0, atKKey = '', atBubT = 0;
function atKPos(){ const y = AT_ITEM[(atOver && atOver.yatak) || atData().yuva.yatak]; return (y && y.kofte) || [98, 76]; }
function atKDraw(){
  const now = performance.now(), blink = now < atBlinkTo, tail = now < atTailTo && Math.floor(now / 180) % 2 === 0, hop = now < atHopTo ? -2 : 0;
  const [x, y] = atKPos(), key = blink + '|' + tail + '|' + hop + '|' + x + '|' + y;
  if (key === atKKey) return; atKKey = key;
  const g = atKCv.getContext('2d'); g.clearRect(0, 0, AT.room.w, AT.room.h);
  g.drawImage(atSprite(blink ? AT.kofte.blink : tail ? AT.kofte.tail : AT.kofte.normal), x, y + hop);
}
function atLoop(){
  atLoopT = 0; if (!$('#atolye').classList.contains('on')) return;
  const now = performance.now();
  if (now > atNextBlink){ atBlinkTo = now + 160; atNextBlink = now + 2400 + Math.random() * 3200; }
  if (now > atNextTail){ atTailTo = now + 1100; atNextTail = now + 3000 + Math.random() * 4000; }
  atKDraw(); atLoopT = setTimeout(atLoop, 120);
}
const AT_LINES = ['Miyav!', 'Mırrr…', 'Mama vakti mi?', 'Bugün ne boyuyoruz?', 'Atölyemiz çok güzel oldu.', 'Biraz daha sev beni.'];
function atMeow(){
  atHopTo = performance.now() + 260; atKKey = ''; atKDraw();
  tone(880, 0.07, 0, 'triangle', 0.05); tone(660, 0.1, 0.08, 'triangle', 0.05);
  if (navigator.vibrate && !DB.noVibe) try { navigator.vibrate(12); } catch(e){}
  const b = $('#atBubble'), [x, y] = atKPos();
  b.textContent = trx(AT_LINES[Math.floor(Math.random() * AT_LINES.length)]);
  b.style.left = ((x + 14) / AT.room.w * 100) + '%'; b.style.top = ((y - 2) / AT.room.h * 100) + '%'; b.hidden = false;
  clearTimeout(atBubT); atBubT = setTimeout(() => { b.hidden = true; }, 1800);
}

/* seçim ve eşya listesi */
let atTab = 'yatak', atFrame = 0, atSpot = 0, atPickId = null;
function atStatus(it){
  const a = atData();
  if (a.yuva[it.slot] === it.id) return { kind:'on', text:trx('Kullanılıyor') };
  if (a.var[it.id]) return { kind:'have', text:trx('Sende') };
  if (it.reward) return { kind:'lock', text:trx('Ödül') };
  if (it.stars && totalStars() < it.stars) return { kind:'stars', text:TL('{0} yıldız', it.stars) };
  return { kind:'buy', text:TL('{0} coin', it.price) };
}
function atBuildTabs(){
  const box = $('#atSlots'), keep = box.scrollLeft; box.innerHTML = '';
  AT_TABS.forEach(t => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = trx(t.name);
    b.setAttribute('aria-pressed', String(t.id === atTab));
    if (AT_SLOT[t.id] && DB.atolye.yeni.some(id => AT_ITEM[id] && AT_ITEM[id].slot === t.id)){ const i = document.createElement('i'); i.className = 'atnew'; b.append(i); }
    b.onclick = () => atSelect(t.id); box.append(b);
  });
  box.scrollLeft = keep;
}
function atSelect(tab, extra){
  atTab = tab; atPickId = null; atOver = null;
  if (tab === 'cerceve' && extra !== undefined) atFrame = extra;
  if (tab === 'raf' && extra !== undefined) atSpot = extra;
  atBuildTabs(); atBuildItems(); atSelText(); atRender();
  const on = $('#atSlots [aria-pressed="true"]'); if (on) on.scrollIntoView({ block:'nearest', inline:'nearest' });
}
function atThumb(c, it){ const s = AT_SLOT[it.slot]; if (s.tile){ const k = document.createElement('canvas'); k.width = k.height = 32; const g = k.getContext('2d'); atPlace(g, it, { x:0, y:0, w:32, h:32, tile:true }); return k; } return atSprite(it.art); }
function atBuildItems(){
  const box = $('#atItems'), a = atData(); box.innerHTML = ''; box.className = 'atgrid';
  if (atTab === 'cerceve' || atTab === 'raf'){
    const isF = atTab === 'cerceve', n = isF ? AT.frames.length : AT.shelf.spots.length, cur = isF ? atFrame : atSpot;
    const row = document.createElement('div'); row.className = 'seg atpos'; row.style.gridTemplateColumns = `repeat(${n},minmax(0,1fr))`;
    for (let k = 0; k < n; k++){ const b = document.createElement('button'); b.type = 'button'; b.textContent = (isF ? trx('Çerçeve') : trx('Yer')) + ' ' + (k + 1); b.setAttribute('aria-pressed', String(k === cur)); b.onclick = () => atSelect(atTab, k); row.append(b); }
    box.append(row);
    const list = document.createElement('div'); list.className = 'atpics'; box.append(list);
    const add = (label, ref, draw, on) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'atitem'; b.setAttribute('aria-pressed', String(!!on)); b.setAttribute('aria-label', label);
      const c = document.createElement('canvas'); c.className = 'atpic'; b.append(c);
      if (draw) drawArtLazy(c, 16, () => draw(c)); else { c.width = c.height = 1; b.classList.add('empty'); }
      b.onclick = () => { if (isF) a.cerceve[atFrame] = ref; else a.raf[atSpot] = ref; save(); atPicCache.clear(); atBuildItems(); atSelText(); atRender(); tone(740, 0.06); };
      list.append(b);
    };
    add(trx('Boş'), null, null, !(isF ? a.cerceve[cur] : a.raf[cur]));
    if (isF){
      const curRef = JSON.stringify(a.cerceve[cur]);
      DB.gallery.slice().reverse().forEach(p => add(p.caption || trx('Fotoğrafın'), { t:'f', d:p.date }, c => drawArt(c, p), curRef === JSON.stringify({ t:'f', d:p.date })));
      Object.keys(ITEMS).filter(id => DB.done[id]).forEach(id => add(trx(ITEMS[id].name), { t:'i', id }, c => drawArt(c, getArt(id)), curRef === JSON.stringify({ t:'i', id })));
    } else {
      Object.keys(DB.souv || {}).filter(id => SOUV[id]).forEach(id => add(trx(SOUV[id].name), id, c => drawArt(c, decodeArt(SOUV[id].art, id)), a.raf[cur] === id));
    }
    if (list.children.length < 2){ const p = document.createElement('p'); p.className = 'muted atempty'; p.textContent = isF ? trx('Resim bitirdikçe burada asabileceğin resimler çıkar.') : trx('Turlarda rehberlerin sorularını bildikçe hatıra kazanırsın; burada sergileyebilirsin.'); box.append(p); }
    return;
  }
  AT.items.filter(it => it.slot === atTab).forEach(it => {
    const st = atStatus(it), b = document.createElement('button'); b.type = 'button'; b.className = 'atitem at-' + st.kind;
    b.setAttribute('aria-pressed', String(atPickId ? atPickId === it.id : st.kind === 'on'));
    const k = atThumb(null, it), c = document.createElement('canvas'); c.width = k.width; c.height = k.height; c.getContext('2d').drawImage(k, 0, 0); c.className = 'atthumb';
    const nm = document.createElement('b'); nm.textContent = trx(it.name);
    const sm = document.createElement('small'); sm.textContent = (st.kind === 'lock' ? '🔒 ' : st.kind === 'stars' ? '★ ' : '') + st.text;
    b.append(c, nm, sm);
    if (DB.atolye.yeni.includes(it.id)){ const i = document.createElement('i'); i.className = 'atnew'; b.append(i); }
    b.onclick = () => atPick(it.id);
    box.append(b);
  });
}
function atPick(id){
  const it = AT_ITEM[id], a = atData(); atPickId = id;
  a.yeni = a.yeni.filter(x => x !== id); save(); atDot();
  atOver = a.yuva[it.slot] === id ? null : { [it.slot]:id };   // denemek için odada önizle
  atBuildTabs(); atBuildItems(); atSelText(); atRender();
}
function atSelText(){
  const t = $('#atSelText'), act = $('#atAct'), a = atData(); act.hidden = true; act.onclick = null;
  if (atTab === 'cerceve'){ t.textContent = TL('Çerçeve {0}: asmak istediğin resmi seç.', atFrame + 1); return; }
  if (atTab === 'raf'){ t.textContent = TL('Raftaki {0}. yer: sergilemek istediğin hatırayı seç.', atSpot + 1); return; }
  const it = AT_ITEM[atPickId || a.yuva[atTab]], st = atStatus(it);
  if (!atPickId || st.kind === 'on'){ t.textContent = TL('{0}: {1}. Değiştirmek için aşağıdan bir eşya seç.', trx(AT_SLOT[atTab].name), trx(it.name)); return; }
  if (st.kind === 'have'){ t.textContent = trx(it.name); act.hidden = false; act.textContent = trx('YERLEŞTİR'); act.onclick = () => atUse(it); return; }
  if (st.kind === 'lock'){ t.textContent = trx(it.name) + ': ' + atRewardText(it.reward); return; }
  if (st.kind === 'stars'){ t.textContent = TL('{0}: {1} yıldız gerekli, sende {2} var. Resimleri hatasız bitirerek yıldız toplarsın.', trx(it.name), it.stars, totalStars()); return; }
  t.textContent = trx(it.name); act.hidden = false; act.textContent = TL('SATIN AL · {0}', it.price); act.onclick = () => atBuy(it);
}
function atUse(it){ const a = atData(); a.yuva[it.slot] = it.id; atOver = null; atPickId = null; save(); tone(740, 0.06); atBuildItems(); atSelText(); atRender(); }
function atBuy(it){
  if (DB.coins < it.price) return needCoins(TL('{0} için {1} coin gerekiyor, sende {2} var.', trx(it.name), it.price, DB.coins), () => atBuy(it));
  const a = atData(); DB.coins -= it.price; a.var[it.id] = true; setCoins();
  [659, 880, 1175].forEach((f, k) => tone(f, 0.1, k * 0.06, 'triangle', 0.05));
  if (navigator.vibrate && !DB.noVibe) try { navigator.vibrate(20); } catch(e){}
  atUse(it);
}
// Odaya dokununca: Köfte, çerçeve, raf ya da üstteki eşyanın yuvası seçilir
atRoomCv.addEventListener('click', e => {
  const r = atRoomCv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * AT.room.w, y = (e.clientY - r.top) / r.height * AT.room.h;
  const [kx, ky] = atKPos(); if (x >= kx + 3 && x < kx + 25 && y >= ky && y < ky + 26) return atMeow();
  const fk = AT.frames.findIndex(([fx, fy]) => x >= fx - 1 && x < fx + 17 && y >= fy - 1 && y < fy + 17); if (fk >= 0) return atSelect('cerceve', fk);
  const sk = AT.shelf.spots.findIndex(([sx, sy]) => x >= sx && x < sx + 16 && y >= sy && y < sy + 17); if (sk >= 0) return atSelect('raf', sk);
  const hit = AT_DRAW.slice().reverse().find(id => { const s = AT_SLOT[id]; return x >= s.x && x < s.x + s.w && y >= s.y && y < s.y + s.h; })
    || (AT_SLOT.pencere && x >= AT_SLOT.pencere.x && x < AT_SLOT.pencere.x + AT_SLOT.pencere.w && y >= AT_SLOT.pencere.y && y < AT_SLOT.pencere.y + AT_SLOT.pencere.h ? 'pencere' : null)
    || (y < AT.room.wallH ? 'duvar' : 'zemin');
  atSelect(hit);
});
function openAtolye(tab){
  atData(); atCheck(); atOver = null; atPicCache.clear();
  show('atolye'); setCoins();
  const first = DB.atolye.yeni.length ? AT_ITEM[DB.atolye.yeni[0]].slot : null;
  atSelect(tab || first || atTab);
  $('#atolye').scrollTop = 0;
  atNextBlink = performance.now() + 900; atNextTail = performance.now() + 2000;
  clearTimeout(atLoopT); atLoop();
}
$('#atBack').onclick = () => { clearTimeout(atLoopT); atLoopT = 0; atOver = null; show('home'); refreshHome(); };
$('#demo').addEventListener('click', () => openAtolye());
$('#atLink').onclick = () => openAtolye();
// Paylaşım: odanın büyük hâli paylaşım penceresine kart olarak gider
$('#atShare').onclick = () => {
  const S = 6, k = document.createElement('canvas'); k.width = AT.room.w * S + 48; k.height = AT.room.h * S + 120;
  const g = k.getContext('2d'); g.fillStyle = '#FFF7EA'; g.fillRect(0, 0, k.width, k.height); g.fillStyle = '#2A1D14'; g.fillRect(18, 18, k.width - 36, AT.room.h * S + 12);
  const room = document.createElement('canvas'); room.width = AT.room.w; room.height = AT.room.h; const rg = room.getContext('2d'); atRoomDraw(rg, null);
  rg.drawImage(atSprite(AT.kofte.normal), ...atKPos());
  g.imageSmoothingEnabled = false; g.drawImage(room, 24, 24, AT.room.w * S, AT.room.h * S);
  g.fillStyle = '#2A1D14'; g.textAlign = 'center'; g.font = '700 46px "Pixelify Sans", monospace'; g.fillText(trx('KÖFTE’NİN ATÖLYESİ'), k.width / 2, AT.room.h * S + 92);
  cardCanvas = k; viewArt = { n:2, pal:['#3B2D28', '#C8A878', '#E9D9BC', '#E0763F'], idx:[0, 1, 2, 3] }; viewCtx = { atolye:true };
  shareFor = 'atolye'; shareOpt.emo = []; emoSel = -1; $('#shareText').value = trx('Köfte’nin atölyesini süsledim! 🐱🎨');
  buildShareChips(); renderShare(); $('#share').classList.add('on'); $('#shareGo').focus();
};
