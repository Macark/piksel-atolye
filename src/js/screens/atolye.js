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
const AT_DRAW = ['somine', 'aski', 'sus', 'tavan', 'kose', 'masa', 'masaustu', 'hali', 'yatak', 'oyuncak', 'su', 'mama'];   // çizim sırası (arkadan öne)
const AT_TABS = [{ id:'kofte', name:'Köfte' }, ...AT.slots.map(s => ({ id:s.id, name:s.name })), { id:'cerceve', name:'Çerçeveler' }, { id:'raf', name:'Raf' }];

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
  if (r.type === 'dostluk') return !!(DB.kofte && DB.kofte.lv >= r.id);
  if (r.type === 'event') return !!(DB.eventsDone && DB.eventsDone[r.id]);
  return false;
}
function atRewardText(r){
  if (r.type === 'region') return TL('{0} bölgesindeki bütün illeri bitirince kazanılır.', TR_REG[r.id] ? trx(TR_REG[r.id].name) : r.id);
  if (r.type === 'badge'){ const b = BADGES.find(x => x.id === r.id); return TL('“{0}” rozetini kazanınca gelir: {1}', b ? trx(b.name) : r.id, b ? trx(b.how) : ''); }
  if (r.type === 'album'){ const al = ALBUMS.find(x => x.id === r.id); return TL('{0} albümünü bitirince kazanılır.', al ? trx(al.name) : r.id); }
  if (r.type === 'dostluk') return TL('Köfte’yle dostluk seviyesi {0} olunca gelir.', r.id);
  if (r.type === 'event'){ const ev = EVENTS.find(x => x.id === r.id); return TL('{0} etkinliğini bitirince kazanılır.', ev ? trx(ev.name) : r.id); }
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
// Gün saati ve mevsim (gerçek saate göre): pencere manzarası ve odanın ışığı buna göre değişir
let atTimeTest = null;   // test için sabitlenebilir: { part, season }
function atTime(){
  if (atTimeTest) return atTimeTest;
  const d = new Date(), h = d.getHours(), m = d.getMonth();
  return { part:h >= 6 && h < 9 ? 'sabah' : h >= 9 && h < 17 ? 'gun' : h >= 17 && h < 20 ? 'aksam' : 'gece', season:m === 11 || m <= 1 ? 'kis' : m <= 4 ? 'ilkbahar' : m <= 7 ? 'yaz' : 'sonbahar' };
}
function atWindowFx(g, s, tm){
  const tint = { sabah:'rgba(255,196,150,0.18)', aksam:'rgba(236,112,56,0.32)', gece:'rgba(8,14,44,0.62)' }[tm.part];
  if (tint){ g.fillStyle = tint; g.fillRect(s.x, s.y, s.w, s.h); }
  const r = rng(7), dots = (n, cols, yMax) => { for (let k = 0; k < n; k++){ g.fillStyle = cols[k % cols.length]; g.fillRect(s.x + Math.floor(r() * s.w), s.y + Math.floor(r() * (yMax || s.h)), 1, 1); } };
  if (tm.part === 'gece') dots(10, ['#FFFFFF', '#F6F0C8'], s.h * 0.45);
  if (tm.season === 'kis') dots(26, ['#FFFFFF', '#E8F0FA']);
  else if (tm.season === 'sonbahar') dots(16, ['#E8A23A', '#C8602A', '#F2C43A']);
  else if (tm.season === 'ilkbahar') dots(16, ['#F6C2D0', '#FFFFFF', '#F28AA0']);
}
// Gece: oda kararır, lambaların çevresi sıcak ışıkla aydınlanır (basamaklı, piksel görünümünde)
function atNight(g, a){
  const W = AT.room.w, H = AT.room.h, im = g.getImageData(0, 0, W, H), d = im.data;
  const L = [AT.lights.tavan, ...['kose', 'masaustu', 'somine'].map(id => AT.lights[a.yuva[id]]).filter(Boolean)];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++){
    let t = 0; L.forEach(([lx, ly, lr]) => { const v = 1 - Math.hypot(x - lx, (y - ly) * 1.15) / lr; if (v > t) t = v; });
    t = Math.ceil(Math.max(0, t) * 3) / 3;                                                   // 3 basamak
    const o = (y * W + x) * 4, k = 0.5 + 0.5 * t;
    d[o] = Math.min(255, d[o] * (k * (0.92 + 0.16 * t))); d[o + 1] = d[o + 1] * k * (0.94 + 0.02 * t); d[o + 2] = d[o + 2] * k * (1.18 - 0.36 * t);
  }
  g.putImageData(im, 0, 0);
}
function atRoomDraw(g, over, tm){
  const a = atData(), pick = id => AT_ITEM[(over && over[id]) || a.yuva[id]]; tm = tm || atTime();
  g.imageSmoothingEnabled = false; g.clearRect(0, 0, AT.room.w, AT.room.h);
  atPlace(g, pick('duvar'), AT_SLOT.duvar); atPlace(g, pick('zemin'), AT_SLOT.zemin);
  rect(g, 0, AT.room.wallH - 3, AT.room.w, 3, '#6E4426'); rect(g, 0, AT.room.wallH - 3, AT.room.w, 1, '#9A6838');            // süpürgelik
  const pw = AT_SLOT.pencere;                                                                                                 // pencere
  rect(g, pw.x - 3, pw.y - 3, pw.w + 6, pw.h + 6, '#ECE8E0'); atPlace(g, pick('pencere'), pw); atWindowFx(g, pw, tm);
  rect(g, pw.x + pw.w / 2 - 1, pw.y - 3, 2, pw.h + 6, '#ECE8E0'); rect(g, pw.x - 3, pw.y + pw.h / 2 - 1, pw.w + 6, 2, '#ECE8E0');
  rect(g, pw.x - 3, pw.y - 3, pw.w + 6, 1, '#FFFFFF'); rect(g, pw.x - 6, pw.y + pw.h + 2, pw.w + 12, 3, '#C8C4BC'); rect(g, pw.x - 6, pw.y + pw.h + 2, pw.w + 12, 1, '#ECE8E0');
  AT.frames.forEach(([x, y], k) => {                                                                                          // çerçeveler
    rect(g, x - 2, y - 2, 26, 26, '#6E4426'); rect(g, x - 2, y - 2, 26, 1, '#9A6838'); rect(g, x - 2, y - 2, 1, 26, '#9A6838');
    const pc = atPic(a.cerceve[k]);
    if (pc) g.drawImage(pc, 0, 0, pc.width, pc.height, x, y, 22, 22); else { rect(g, x, y, 22, 22, '#ECE8E0'); rect(g, x + 8, y + 10, 6, 2, '#C8C4BC'); }
  });
  const sh = AT.shelf;                                                                                                        // raf ve hatıralar
  rect(g, sh.x, sh.y, sh.w, 4, '#9A6838'); rect(g, sh.x, sh.y, sh.w, 1, '#C08A52'); rect(g, sh.x, sh.y + 3, sh.w, 1, '#6E4426');
  rect(g, sh.x + 6, sh.y + 4, 3, 4, '#6E4426'); rect(g, sh.x + sh.w - 9, sh.y + 4, 3, 4, '#6E4426');
  sh.spots.forEach(([x, y], k) => { const id = a.raf[k]; if (id && SOUV[id] && DB.souv[id]){ const c = document.createElement('canvas'); drawArt(c, decodeArt(SOUV[id].art, id)); g.drawImage(c, x, y); } });
  AT_DRAW.forEach(id => atPlace(g, pick(id), AT_SLOT[id]));
  if (typeof kAskiDraw === 'function') kAskiDraw(g);                                                                         // askıdaki kıyafetler
  g.drawImage(atSprite(AT.chair.art), AT.chair.x, AT.chair.y);                                                                // Köfte'nin hasır koltuğu (sabit)
  if (tm.part === 'gece') atNight(g, { yuva:{ ...a.yuva, ...(over || {}) } });
}
const atRoomCv = $('#atRoom'), atKCv = $('#atKofte');
let atOver = null;
function atRender(){ atRoomDraw(atRoomCv.getContext('2d'), atOver); atKKey = ''; atKDraw(); }
// Büyütme: oda ekran genişliğini doldurur (kenar boşluğuna taşar, ortalı). Tam sayı kat ekranın en az
// %94'ünü dolduruyorsa o seçilir (her piksel eşit); yoksa genişlik doldurulur. İkisinde de "pixelated"
// çizim olduğu için bulanıklık olmaz; yüksek yoğunluklu ekranda pikseller arasında en çok 1 cihaz pikseli fark olur.
function atFit(){
  const wrap = $('#atRoomWrap'), avail = Math.max(120, $('#atolye').clientWidth - 6), dpr = window.devicePixelRatio || 1;
  const k = Math.max(1, Math.floor(avail * dpr / AT.room.w)), wi = AT.room.w * k / dpr;
  const w = wi >= avail * 0.94 ? wi : Math.floor(avail * dpr) / dpr, h = Math.round(w * AT.room.h / AT.room.w * dpr) / dpr;
  wrap.style.width = w + 'px'; wrap.style.height = h + 'px';
  [atRoomCv, atKCv].forEach(c => { c.style.width = w + 'px'; c.style.height = h + 'px'; });
}
addEventListener('resize', () => { if ($('#atolye').classList.contains('on')) atFit(); });

/* Köfte: odada kendi kendine yaşar. Yürür, koltuğa çıkıp uzanır, kıvrılıp uyur, esner.
   Dokununca sevinir; uyurken dokununca uyanmaz, sadece "zzz" büyür. */
const KS = { mode:'sit', x:0, y:0, face:1, tx:0, ty:0, then:null, until:0, t0:0, zzz:0 };
let atLoopT = 0, atKKey = '', atBubT = 0, atLast = 0;
const KOLTUK = () => AT.spots.koltuk, ZEMIN = () => AT.spots.zemin;
function atKPos(){ return [Math.round(KS.x), Math.round(KS.y)]; }
function kSet(mode, ms, then){ KS.mode = mode; KS.t0 = performance.now(); KS.until = KS.t0 + (ms || 0); KS.then = then || null; if (mode !== 'sleep') KS.zzz = 0; atKKey = ''; }
function kWalk(x, y, then){ KS.tx = x; KS.ty = y; KS.face = x >= KS.x ? 1 : -1; kSet('walk', 0, then); }
// Koltukta iki hâl: "lounge" (fotoğraftaki gibi yayılmış) ve "sleep" (kıvrılmış). Ayrı noktalara çizilir.
function kOnChair(){ return KS.y === KOLTUK()[1] || KS.y === AT.spots.yayil[1]; }
function kChairPose(rest){ const sp = rest === 'sleep' ? KOLTUK() : AT.spots.yayil; KS.x = sp[0]; KS.y = sp[1]; KS.face = -1; kSet(rest === 'sleep' ? 'sleep' : 'lounge', rest === 'sleep' ? 26000 : 12000); }
function kToChair(rest){                                                                     // koltuğa git: önüne yürü, zıpla, yayıl ya da kıvrılıp uyu
  if (kOnChair()) return kChairPose(rest);
  const fy = ZEMIN()[1];
  kWalk(KOLTUK()[0] + 6, fy, () => { KS.y = KOLTUK()[1]; kSet('happy', 360, () => kChairPose(rest)); });
}
function kDown(then){ const [, fy] = ZEMIN(); if (KS.y !== fy){ KS.y = fy; KS.x = KOLTUK()[0] - 6; } then(); }
function kIdle(){
  if (typeof kNeedIdle === 'function' && kNeedIdle()) return;                                    // uyku, açlık önce gelir (kofte.js)
  const night = atTime().part === 'gece', r = Math.random(), onChair = kOnChair();
  if (onChair){ if (KS.mode === 'lounge' && r < (night ? 0.6 : 0.3)) return kChairPose('sleep'); if (KS.mode === 'lounge' && r < 0.55) return kChairPose('lie'); return kDown(() => kSet('sit', 2500)); }
  const [x0, fy, x1] = ZEMIN();
  if (r < 0.38) return kWalk(x0 + Math.random() * (x1 - x0), fy, () => kSet('sit', 4000 + Math.random() * 4000));
  if (r < 0.58) return kToChair('lie');
  if (r < (night ? 0.8 : 0.66)) return kToChair('sleep');
  if (r < 0.76) return kSet('yawn', 900, () => kSet('sit', 3000));
  if (typeof kTrick === 'function' && r < 0.84 && kTrick()) return;                               // açılan hareketler (dans, yuvarlanma)
  kSet('sit', 4000 + Math.random() * 5000);
}
function kStep(now){
  const dt = Math.max(0, Math.min(0.2, (now - atLast) / 1000 || 0)); atLast = Math.max(atLast, now);
  if (KS.mode === 'walk'){
    const dx = KS.tx - KS.x, dy = KS.ty - KS.y, dist = Math.hypot(dx, dy), v = 34 * dt;
    if (dist <= v){ KS.x = KS.tx; KS.y = KS.ty; const t = KS.then; kSet('sit', 2000); if (t) t(); }
    else { KS.x += dx / dist * v; KS.y += dy / dist * v; }
    return;
  }
  if (KS.until && now > KS.until){ const t = KS.then; KS.until = 0; if (t) t(); else kIdle(); }
}
function kFrame(now){
  const t = now - KS.t0, F = AT.kofte, cyc = (arr, ms) => arr[Math.floor(now / ms) % arr.length];
  switch (KS.mode){
    case 'walk': return cyc(F.walk, 140);
    case 'lie': return cyc(F.lie, 900);
    case 'lounge': { const ph = now % 6000; return ph < 170 ? F.lounge[1] : ph > 4200 && ph < 4700 ? F.lounge[2] : F.lounge[0]; }
    case 'sleep': return cyc(F.sleep, 1100);
    case 'yawn': return F.yawn[Math.min(2, Math.floor(t / 300))];
    case 'happy': return F.happy[Math.min(2, Math.floor(t / 130))];
    case 'eat': return cyc(F.eat, 260);
    case 'sad': return cyc(F.sad, 1400);
    case 'carry': return cyc(F.carry, 140);
    case 'dans': return F.happy[[0, 1, 2, 1][Math.floor(now / 160) % 4]];
    case 'yuvarlan': return F.sleep[Math.floor(now / 200) % 2];
    default: { if (typeof kMood === 'function' && kMood() === 'kus') return cyc(F.sad, 1400); const ph = now % 5200; return ph < 160 ? F.sit[1] : ph > 3000 && ph < 3900 && Math.floor(ph / 220) % 2 ? F.sit[2] : F.sit[0]; }
  }
}
const KSIDE = new Set(['walk', 'lie', 'sleep', 'eat', 'carry', 'yuvarlan']);
let atKFr = null;
function atKDraw(){
  const now = performance.now(), fr = kFrame(now), [x, y] = atKPos(), side = KSIDE.has(KS.mode);
  const zz = KS.mode === 'sleep' ? Math.floor(now / 500) % 3 + KS.zzz * 10 : -1, key = x + '|' + y + '|' + KS.face + '|' + zz;
  const dyn = typeof kDyn === 'function' && kDyn();
  if (!dyn && fr === atKFr && key === atKKey) return; atKFr = fr; atKKey = key;
  const g = atKCv.getContext('2d'); g.imageSmoothingEnabled = false; g.clearRect(0, 0, AT.room.w, AT.room.h);
  const sp = atSprite(fr);
  if (typeof kBehind === 'function') kBehind(g);                                                 // mama kabındaki mama, yerdeki top
  if (side && KS.face < 0){ g.save(); g.translate(x + fr.w, y); g.scale(-1, 1); g.drawImage(sp, 0, 0); g.restore(); } else g.drawImage(sp, x, y);
  if (typeof kWear === 'function') kWear(g, fr, x, y, side && KS.face < 0);                       // kıyafetler
  if (typeof kFront === 'function') kFront(g, now);                                               // kalpler, hediye, uçan top
  if (KS.mode === 'sleep'){                                                                  // "zzz": küçük piksel z'ler yukarı süzülür, dokundukça artar
    const n = 1 + (Math.floor(now / 500) % 3) + Math.min(3, KS.zzz), zx = x + (KS.face < 0 ? 4 : 30), zy = y + 14;
    g.fillStyle = '#F6F0E0';
    for (let k = 0; k < n; k++){ const s = k > 2 ? 2 : 1, px = zx + k * 4, py = zy - k * 6;
      g.fillRect(px, py, 3 * s, s); g.fillRect(px + 2 * s, py + s, s, s); g.fillRect(px + s, py + 2 * s, s, s); g.fillRect(px, py + 3 * s, 3 * s, s); }
  }
}
function atLoop(){
  atLoopT = 0; if (!$('#atolye').classList.contains('on')) return;
  const now = performance.now(); kStep(now); atKDraw();
  atLoopT = setTimeout(atLoop, KS.mode === 'walk' ? 60 : 110);
}
const AT_LINES = ['Miyav!', 'Mırrr…', 'Mama vakti mi?', 'Bugün ne boyuyoruz?', 'Atölyemiz çok güzel oldu.', 'Biraz daha sev beni.'];
function atSay(text){
  const b = $('#atBubble'), [x, y] = atKPos();
  b.textContent = text; b.style.left = ((x + 20) / AT.room.w * 100) + '%'; b.style.top = ((y + 2) / AT.room.h * 100) + '%'; b.hidden = false;
  clearTimeout(atBubT); atBubT = setTimeout(() => { b.hidden = true; }, 1800);
}
function atMeow(){
  if (KS.mode === 'sleep'){ KS.zzz = Math.min(3, KS.zzz + 1); atKKey = ''; return atSay(trx('Zzz…')); }
  if (KS.mode === 'lounge'){ KS.until = performance.now() + 8000; atKFr = null; }                 // koltukta yayılmışken sadece mırlar
  else { const back = KS.mode === 'lie' ? 'lie' : 'sit'; kSet('happy', 400, () => kSet(back, back === 'lie' ? 6000 : 2500)); }
  tone(880, 0.07, 0, 'triangle', 0.05); tone(660, 0.1, 0.08, 'triangle', 0.05);
  if (navigator.vibrate && !DB.noVibe) try { navigator.vibrate(12); } catch(e){}
  atSay(trx(AT_LINES[Math.floor(Math.random() * AT_LINES.length)]));
}
// Resim asılınca: Köfte çerçevenin altına gidip bakar ve sevinir
function kLookAt(k){ const [fx] = AT.frames[k], [x0, fy, x1] = ZEMIN(); kDown(() => kWalk(Math.max(x0, Math.min(x1, fx - 9)), fy, () => kSet('happy', 450, () => kSet('sit', 3000)))); }

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
// Küçük resim: tam sayı katıyla büyütülür, CSS boyutu cihaz pikseline göre ayarlanır (keskin)
function atThumb(it, box = 54){
  const s = AT_SLOT[it.slot]; let base = atSprite(it.art);
  if (s.tile){ base = document.createElement('canvas'); base.width = base.height = it.art.w * 2; atPlace(base.getContext('2d'), it, { x:0, y:0, w:base.width, h:base.height, tile:true }); }
  const dpr = window.devicePixelRatio || 1, sc = Math.max(1, Math.floor(box * dpr / Math.max(base.width, base.height)));
  const c = document.createElement('canvas'); c.width = base.width * sc; c.height = base.height * sc; const g = c.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(base, 0, 0, c.width, c.height);
  c.style.width = c.width / dpr + 'px'; c.style.height = c.height / dpr + 'px'; c.className = 'atthumb'; return c;
}
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
      b.onclick = () => { if (isF) a.cerceve[atFrame] = ref; else a.raf[atSpot] = ref; save(); atPicCache.clear(); atBuildItems(); atSelText(); atRender(); tone(740, 0.06); if (isF && ref) kLookAt(atFrame); };
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
    const c = atThumb(it);
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
  const [kx, ky] = atKPos(), kw = atKFr ? atKFr.w : 40, kh = atKFr ? atKFr.h : 36; if (x >= kx + 2 && x < kx + kw - 2 && y >= ky + 2 && y < ky + Math.min(kh, 44)) return atMeow();
  const ch = AT.chair; if (x >= ch.x && x < ch.x + ch.art.w && y >= ch.y && y < ch.y + ch.art.h){ kToChair('lie'); return atSay(trx('Koltuğuma gidiyorum!')); }   // koltuğa dokununca Köfte koltuğa gider
  const fk = AT.frames.findIndex(([fx, fy]) => x >= fx - 2 && x < fx + 24 && y >= fy - 2 && y < fy + 24); if (fk >= 0) return atSelect('cerceve', fk);
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
  atFit(); if (!KS.x) kChairPose('lie');   // ilk açılışta koltuğunda yayılmış
  atLast = performance.now(); clearTimeout(atLoopT); atLoop();
}
$('#atBack').onclick = () => { clearTimeout(atLoopT); atLoopT = 0; atOver = null; show('home'); refreshHome(); };
$('#demo').addEventListener('click', () => openAtolye());
$('#atLink').onclick = () => openAtolye();
// Paylaşım: odanın büyük hâli paylaşım penceresine kart olarak gider
$('#atShare').onclick = () => {
  const S = 4, k = document.createElement('canvas'); k.width = AT.room.w * S + 48; k.height = AT.room.h * S + 120;
  const g = k.getContext('2d'); g.fillStyle = '#FFF7EA'; g.fillRect(0, 0, k.width, k.height); g.fillStyle = '#2A1D14'; g.fillRect(18, 18, k.width - 36, AT.room.h * S + 12);
  const room = document.createElement('canvas'); room.width = AT.room.w; room.height = AT.room.h; const rg = room.getContext('2d'); atRoomDraw(rg, null);
  rg.drawImage(atKCv, 0, 0);
  g.imageSmoothingEnabled = false; g.drawImage(room, 24, 24, AT.room.w * S, AT.room.h * S);
  g.fillStyle = '#2A1D14'; g.textAlign = 'center'; g.font = '700 46px "Pixelify Sans", monospace'; g.fillText(trx('KÖFTE’NİN ATÖLYESİ'), k.width / 2, AT.room.h * S + 92);
  cardCanvas = k; viewArt = { n:2, pal:['#3B2D28', '#C8A878', '#E9D9BC', '#E0763F'], idx:[0, 1, 2, 3] }; viewCtx = { atolye:true };
  shareFor = 'atolye'; shareOpt.emo = []; emoSel = -1; $('#shareText').value = trx('Köfte’nin atölyesini süsledim! 🐱🎨');
  buildShareChips(); renderShare(); $('#share').classList.add('on'); $('#shareGo').focus();
};
