/* ---------- Köfte'nin bakımı: rahat oyun, ceza yok ----------
   Üç gösterge (Tokluk, Mutluluk, Enerji) 0-100; oyun kapalıyken de gerçek saate göre ilerler.
   Köfte hastalanmaz, kaçmaz. Acıkınca mama kabının yanında "Mama?" der; mutsuzken kulakları düşer.
   Bakım, sevme, top ve resim bitirmek dostluk puanı verir; seviye atladıkça kıyafet, hareket, eşya ve
   ödül maması açılır. Her gün bir hediye getirir. Bütün sayılar içerikte (atolye.json › bakim).
   Kayıt: DB.kofte (yeni alan; eski kayıtlarda yoksa başlangıç değerleriyle kurulur). */
const BK = AT.bakim, KIY_DEF = AT.kiyafet, MAMA = Object.fromEntries(BK.mamalar.map(m => [m.id, m]));
const kClamp = v => Math.max(0, Math.min(100, v));
const kGun = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
// Örnek anının eski alt yazısı değişti; eski kayıtlarda da güncellenir
(DB.gallery || []).forEach(p => { if (p.caption === 'Kral Köfte') p.caption = 'Köfte'; });
function kData(){
  const k = DB.kofte = DB.kofte || {};
  if (k.tok === undefined){ Object.assign(k, { tok:BK.baslangic.tok, mut:BK.baslangic.mut, ener:BK.baslangic.ener, dost:0, lv:1, t:Date.now() }); k.mama = { ...BK.baslangic.mama }; }
  k.mama = k.mama || {};
  ['kofte', 'tavuk'].forEach(o => { if (k.mama[o]){ k.mama.odul = (k.mama.odul || 0) + k.mama[o]; delete k.mama[o]; } });   // eski ödül maması sıvı ödül mamasına dönüşür
  k.giy = k.giy || {}; k.acik = k.acik || {}; k.acik.kiyafet = k.acik.kiyafet || {}; k.acik.hareket = k.acik.hareket || {};
  if (k.gun !== kGun()){ k.gun = kGun(); k.bugun = { besle:0, sev:0, top:0, hediye:0, sevMut:0 }; }
  k.bugun = k.bugun || { besle:0, sev:0, top:0, hediye:0, sevMut:0 };
  return k;
}
// Gerçek saate göre ilerlet. offline: oyun kapalıyken geçen süre (enerji dinlenmeyle dolar)
function kTick(offline){
  const k = kData(), now = Date.now(), h = Math.max(0, Math.min(24 * 14, (now - (k.t || now)) / 3600000)); k.t = now;
  k.tok = kClamp(k.tok - BK.dusus.tok * h); k.mut = kClamp(k.mut - BK.dusus.mut * h);
  if (offline) k.ener = kClamp(k.ener + BK.offlineEnerji * h);
  return h;
}
function kMood(){ const k = DB.kofte; if (!k) return ''; if (k.tok < BK.esik.ac) return 'ac'; if (k.mut < BK.esik.kus) return 'kus'; return ''; }
function kLevelOf(p){ let lv = 1; BK.seviyeler.forEach(s => { if (p >= s.puan) lv = s.lv; }); return lv; }
// Dostluk puanı: türüne göre günlük sınırla
function kDost(tur, adet = 1){
  const k = kData(), lim = BK.dostluk.sinir[tur], per = BK.dostluk.puan[tur] || 0;
  let gain = per * adet;
  if (lim !== undefined){ const left = Math.max(0, lim - (k.bugun[tur] || 0)); gain = Math.min(gain, left); k.bugun[tur] = (k.bugun[tur] || 0) + gain; }
  if (gain <= 0) return 0;
  const before = k.lv; k.dost += gain; k.lv = kLevelOf(k.dost);
  for (let lv = before + 1; lv <= k.lv; lv++) kLevelUp(lv);
  return gain;
}
function kLevelUp(lv){
  const k = kData(), s = BK.seviyeler.find(x => x.lv === lv); if (!s) return;
  const yeni = [];
  if (s.kiyafet){ k.acik.kiyafet[s.kiyafet] = true; yeni.push(trx(KIY_DEF[s.kiyafet].name)); }
  if (s.hareket){ k.acik.hareket[s.hareket] = true; yeni.push(trx(s.hareket === 'dans' ? 'Sevinç dansı' : 'Sırtüstü yuvarlanma')); }
  if (s.mama) Object.entries(s.mama).forEach(([m, n]) => { k.mama[m] = (k.mama[m] || 0) + n; yeni.push(TL('{0} × {1}', n, trx(MAMA[m].name))); });
  if (s.esya){ const it = AT_ITEM[s.esya]; if (it) yeni.push(trx(it.name)); }
  save(); atCheck();
  kToast(TL('DOSTLUK SEVİYESİ {0}!', lv), yeni.join(', '));
  if ($('#atolye').classList.contains('on')){ kSet('happy', 500, () => kSet('sit', 2500)); kHearts(6); kPanel(); }
}
let kToastT = 0;
function kToast(baslik, alt){
  const el = $('#btoast'); el.innerHTML = '';
  const c = atSprite(AT.kofte.happy[2], 1); const k2 = document.createElement('canvas'); k2.width = 40; k2.height = 36; k2.getContext('2d').drawImage(c, 0, 0); k2.className = 'attoastimg'; el.append(k2);
  const t = document.createElement('div'); t.innerHTML = '<small></small><b></b><span></span>';
  t.querySelector('small').textContent = trx('KÖFTE'); t.querySelector('b').textContent = baslik; t.querySelector('span').textContent = alt || '';
  el.append(t); el.hidden = false; el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
  el.onclick = () => { el.hidden = true; if (!$('#atolye').classList.contains('on')){ document.querySelectorAll('.ov.on').forEach(o => o.classList.remove('on')); openAtolye('kofte'); } };
  badgeJingle(); clearTimeout(kToastT); kToastT = setTimeout(() => { el.hidden = true; }, 4200);
}
// Resim bitince: +1 kuru mama ve dostluk (finish.js çağırır)
function kofteResim(){ const k = kData(); kTick(false); k.mama.kuru = (k.mama.kuru || 0) + BK.resimMama; kDost('resim'); save(); }

/* ----- ekrandaki etkiler ----- */
const KFX = { hearts:[], bowl:null, ball:null, gift:null, flying:null };
function kDyn(){ return KFX.hearts.length || KFX.flying || KFX.gift || KS.mode === 'carry'; }
function kHearts(n){ const [x, y] = atKPos(), w = atKFr ? atKFr.w : 40; for (let i = 0; i < n; i++) KFX.hearts.push({ x:x + w / 2 - 4 + (Math.random() * 16 - 8), y:y + 6, t0:performance.now() + i * 90 }); }
function kBehind(g){
  const bowl = AT_SLOT.mama, it = AT_ITEM[atData().yuva.mama];
  if (KFX.bowl){ const sp = atSprite(AT.fx['mama_' + KFX.bowl]); g.drawImage(sp, bowl.x + Math.floor((bowl.w - sp.width) / 2), bowl.y + bowl.h - (it ? it.art.h : 15) - sp.height + 5); }
  if (KFX.ball && !KFX.flying && KS.mode !== 'carry') g.drawImage(atSprite(AT.fx.top), KFX.ball.x - 3, KFX.ball.y - 3);
}
function kFront(g, now){
  KFX.hearts = KFX.hearts.filter(h => now - h.t0 < 900);
  KFX.hearts.forEach(h => { const t = (now - h.t0) / 900; if (t < 0) return; g.globalAlpha = 1 - t * 0.6; g.drawImage(atSprite(AT.fx.kalp), Math.round(h.x + Math.sin(t * 6) * 2), Math.round(h.y - t * 22)); g.globalAlpha = 1; });
  if (KFX.flying){ const f = KFX.flying, t = Math.min(1, (now - f.t0) / f.ms), x = f.x0 + (f.x1 - f.x0) * t, y = f.y0 + (f.y1 - f.y0) * t - Math.sin(t * Math.PI) * 30;
    g.drawImage(atSprite(AT.fx.top), Math.round(x - 3), Math.round(y - 3)); if (t >= 1){ KFX.flying = null; const done = f.done; if (done) done(); } }
  if (KS.mode === 'carry'){ const [x, y] = atKPos(), fr = atKFr; if (fr){ const mx = KS.face < 0 ? x + 1 : x + fr.w - 6; g.drawImage(atSprite(AT.fx.top), mx, y + 19); } }
  if (KFX.gift){ const [x, y] = atKPos(); g.drawImage(atSprite(AT.fx.hediye), x + (KS.face < 0 ? -6 : (atKFr ? atKFr.w : 40) - 4), y + 24); }
}
// Kıyafetler: hareketin çapa noktasına göre boyna ve başa çizilir
function kWear(g, fr, x, y, flip){
  const k = DB.kofte; if (!k || !k.giy) return;
  const mode = KS.mode === 'dans' ? 'happy' : KS.mode === 'sit' && kMood() === 'kus' ? 'sad' : KS.mode, an = AT.anchor[mode]; if (!an) return;
  const set = AT.kofte[mode === 'sad' ? 'sad' : mode], idx = set ? Math.max(0, set.indexOf(fr)) : 0;
  const pt = v => Array.isArray(v[0]) ? v[Math.min(idx, v.length - 1)] : v;
  const put = (id, p, bottom) => { if (!id || !KIY_DEF[id]) return; const a = KIY_DEF[id].art, sp = atSprite(a); let px = p[0]; if (flip) px = fr.w - px;
    g.drawImage(sp, Math.round(x + px - a.w / 2), Math.round(y + p[1] - (bottom ? a.h - 3 : 1))); };
  put(k.giy.boyun, pt(an.n), false); put(k.giy.bas, pt(an.b), true);
}
// Askıdaki kıyafetler (açılanlar)
function kAskiDraw(g){
  const k = DB.kofte, s = AT_SLOT.aski; if (!k || !k.acik) return;
  Object.keys(k.acik.kiyafet).filter(id => KIY_DEF[id]).slice(0, 3).forEach((id, i) => { const a = KIY_DEF[id].art; g.drawImage(atSprite(a), s.x + [5, 13, 21][i] - Math.floor(a.w / 2) + 1, s.y + 9); });
}

/* ----- Köfte'nin ihtiyaçları davranışı yönlendirir (atolye.js kIdle çağırır) ----- */
let kAskT = 0;
function kNeedIdle(){
  const k = DB.kofte; if (!k) return false;
  if (kBallMode && k.ener >= BK.esik.uyku){ kSet('sit', 3000); return true; }                    // top beklerken yerinde dursun
  if (k.ener < BK.esik.uyku && KS.mode !== 'sleep'){ atSay(trx('Uykum geldi…')); kToChair('sleep'); return true; }
  if (k.tok < BK.esik.ac){
    const [kx, ky] = AT.spots.kap;
    if (Math.hypot(KS.x - kx, KS.y - ky) > 3){ kDown(() => kWalk(kx, ky, () => { KS.face = 1; kSet('sad', 6000); })); return true; }
    kSet('sad', 6000); if (performance.now() - kAskT > 15000){ kAskT = performance.now(); atSay(trx('Mama?')); } return true;
  }
  return false;
}
function kTrick(){
  const k = DB.kofte; if (!k) return false; const h = Object.keys(k.acik.hareket || {}); if (!h.length) return false;
  const m = h[Math.floor(Math.random() * h.length)]; kDown(() => kSet(m, 1600, () => kSet('sit', 2500))); return true;
}

/* ----- panel: göstergeler, dostluk, düğmeler ----- */
function kPanel(){
  const k = kData(), bar = (id, v) => { const el = $(id); el.style.setProperty('--v', Math.round(v) + '%'); el.parentElement.setAttribute('aria-label', el.parentElement.dataset.n + ': ' + Math.round(v)); el.parentElement.classList.toggle('low', v < 30); };
  bar('#kTok', k.tok); bar('#kMut', k.mut); bar('#kEner', k.ener);
  const cur = BK.seviyeler.find(s => s.lv === k.lv), next = BK.seviyeler.find(s => s.lv === k.lv + 1);
  $('#kLv').textContent = TL('Dostluk {0}', k.lv);
  $('#kDostBar').style.setProperty('--v', next ? Math.round((k.dost - cur.puan) / (next.puan - cur.puan) * 100) + '%' : '100%');
  $('#kDostTxt').textContent = next ? TL('{0}/{1}', k.dost, next.puan) : TL('{0}', k.dost);
  $('#kBall').textContent = kBallMode ? trx('BİTİR') : trx('TOP OYNA');
}
// Köfte sekmesi: mamalar ve kıyafetler
function kBuildTab(){
  const box = $('#atItems'), k = kData(); box.innerHTML = ''; box.className = 'kgrid';
  const h = t => { const p = document.createElement('p'); p.className = 'dl'; p.textContent = t; box.append(p); };
  h(trx('MAMALAR'));
  BK.mamalar.forEach(m => {
    const n = k.mama[m.id] || 0, b = document.createElement('button'); b.type = 'button'; b.className = 'kmama';
    const c = atSprite(AT.fx['pak_' + m.id] || AT.fx['mama_' + m.id], 3); c.className = 'atthumb'; c.style.width = c.width / 2 + 'px';
    const t = document.createElement('span'); t.innerHTML = '<b></b><small></small>'; t.querySelector('b').textContent = trx(m.name) + (n ? ' × ' + n : '');
    t.querySelector('small').textContent = TL('Tokluk +{0}, mutluluk +{1}', m.tok, m.mut);
    const act = document.createElement('i'); act.textContent = n ? trx('VER') : m.price ? TL('AL · {0}', m.price) : trx('ÖDÜL');
    b.append(c, t, act); b.disabled = !n && !m.price;
    b.onclick = () => { if (n) kFeed(m.id); else if (m.price) kBuyMama(m); };
    box.append(b);
  });
  h(trx('KIYAFETLER'));
  const row = document.createElement('div'); row.className = 'chips kkiy'; box.append(row);
  const chip = (label, on, fn, lock) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = label; b.setAttribute('aria-pressed', String(!!on)); if (lock){ b.disabled = true; b.classList.add('lock'); } b.onclick = fn; row.append(b); };
  chip(trx('Kıyafetsiz'), !k.giy.boyun && !k.giy.bas, () => { k.giy = {}; save(); kBuildTab(); atKKey = ''; atKFr = null; });
  BK.seviyeler.filter(s => s.kiyafet).forEach(s => { const id = s.kiyafet, d = KIY_DEF[id], have = k.acik.kiyafet[id];
    chip(have ? trx(d.name) : '🔒 ' + TL('Seviye {0}', s.lv), k.giy[d.yer] === id, () => { k.giy[d.yer] = k.giy[d.yer] === id ? null : id; save(); kBuildTab(); atKKey = ''; atKFr = null; kSet('happy', 400, () => kSet('sit', 2500)); }, !have); });
  const p = document.createElement('p'); p.className = 'muted atempty';
  const next = BK.seviyeler.find(s => s.lv === k.lv + 1);
  p.textContent = next ? TL('Besle, sev, top oyna, resim bitir: dostluk puanı kazan. Seviye {0} için {1} puan kaldı.', next.lv, next.puan - k.dost) : trx('Köfte’yle en iyi dostsunuz!');
  box.append(p);
}
function kBuyMama(m){
  if (DB.coins < m.price) return needCoins(TL('{0} için {1} coin gerekiyor, sende {2} var.', trx(m.name), m.price, DB.coins), () => kBuyMama(m));
  const k = kData(); DB.coins -= m.price; k.mama[m.id] = (k.mama[m.id] || 0) + 1; save(); setCoins(); tone(784, 0.08); kBuildTab();
}
function kFeedOpen(){ atSelect('kofte'); $('#atSelText').textContent = trx('Bir mama seç; kaba dökülsün, Köfte koşup yesin.'); }
// Besleme: kaba mama dökülür, Köfte koşup yer
let kFeeding = false;
function kFeed(id){
  const k = kData(), m = MAMA[id]; if (!m || !(k.mama[id] > 0) || kFeeding) return;
  k.mama[id]--; kFeeding = true; KFX.bowl = id; save(); kBuildTab(); tone(523, 0.06); tone(659, 0.06, 0.06);
  const [kx, ky] = AT.spots.kap;
  const eat = () => { KS.face = 1; kSet('eat', m.ozel ? 1800 : 2400, () => {
    KFX.bowl = null; kFeeding = false; k.tok = kClamp(k.tok + m.tok); k.mut = kClamp(k.mut + m.mut); kDost('besle'); save(); kPanel();
    if (m.ozel){ kSet('happy', 700, () => kSet('sit', 3000)); kHearts(id === 'odul' ? 8 : 5); atSay(trx(id === 'odul' ? 'Ödül maması! Bayılırım!' : 'Ton balığı! Mmm…')); }
    else { kSet('sit', 3000); atSay(trx('Mmm, doydum.')); kHearts(2); }
    if (navigator.vibrate && !DB.noVibe) try { navigator.vibrate(15); } catch(e){}
  }); };
  if (KS.mode === 'sleep'){ KS.mode = 'sit'; }                                                  // mama sesiyle uyanır
  kDown(() => kWalk(kx, ky, eat));
}
// Sevme: Köfte'nin üstünde parmak gezdirince kalpler çıkar
let kPet = null;
function kOnKofte(x, y){ const [kx, ky] = atKPos(), w = atKFr ? atKFr.w : 40, h = atKFr ? atKFr.h : 36; return x >= kx + 2 && x < kx + w - 2 && y >= ky + 2 && y < ky + Math.min(h, 44); }
function kRoomXY(e){ const r = atRoomCv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * AT.room.w, (e.clientY - r.top) / r.height * AT.room.h]; }
atRoomCv.addEventListener('pointerdown', e => { const [x, y] = kRoomXY(e); if (!kBallMode && kOnKofte(x, y)){ kPet = { moved:0, last:0, x, y }; } });
atRoomCv.addEventListener('pointermove', e => {
  if (!kPet) return; const [x, y] = kRoomXY(e); if (Math.hypot(x - kPet.x, y - kPet.y) < 3) return; kPet.x = x; kPet.y = y;
  if (!kOnKofte(x, y)) return; const now = performance.now(); if (now - kPet.last < 220) return; kPet.last = now; kPet.moved++;
  kStroke();
});
['pointerup', 'pointercancel', 'pointerleave'].forEach(n => atRoomCv.addEventListener(n, () => { if (kPet && kPet.moved) kPet.end = performance.now(); setTimeout(() => { kPet = null; }, 0); }));
function kStroke(){
  const k = kData();
  if (KS.mode === 'sleep'){ KS.zzz = Math.min(3, KS.zzz + 1); atKKey = ''; return; }                // uyurken uyanmaz
  if (k.bugun.sevMut < BK.sevme.gunluk){ const g2 = Math.min(BK.sevme.mut, BK.sevme.gunluk - k.bugun.sevMut); k.mut = kClamp(k.mut + g2); k.bugun.sevMut += g2; }
  kDost('sev'); kHearts(1); save(); kPanel();
  tone(196 + Math.random() * 30, 0.12, 0, 'sine', 0.035);                                          // mırlama
  if (navigator.vibrate && !DB.noVibe) try { navigator.vibrate(5); } catch(e){}
  if (KS.mode === 'sit' || KS.mode === 'walk') kSet('sit', 2500);
}
// Top oyunu: odada bir yere dokun, top oraya gider, Köfte getirir
let kBallMode = false;
function kBallToggle(){ kBallMode = !kBallMode; kPanel(); if (kBallMode){ if (KS.mode === 'sleep') { kBallMode = false; kPanel(); return atSay(trx('Zzz… (Köfte uyuyor)')); } atSay(trx('Odada bir yere dokun, topu atayım!')); } }
function kThrow(x, y){
  const k = kData(); if (KFX.flying || KS.mode === 'carry' || KS.mode === 'walk' && KS.then && KS.then.top) return;
  const [x0, fy, x1] = ZEMIN(), tx = Math.max(x0 + 4, Math.min(x1 + 34, x)), ty = Math.max(fy + 26, Math.min(AT.room.h - 8, y));
  tone(660, 0.05); KFX.ball = { x:tx, y:ty };
  KFX.flying = { x0:120, y0:AT.room.h - 4, x1:tx, y1:ty, t0:performance.now(), ms:420, done:() => {
    const back = () => { kSet('carry', 0); KS.tx = 120 - 20; KS.ty = fy; KS.face = KS.tx >= KS.x ? 1 : -1; KS.mode = 'carry';
      KS.then = () => { KFX.ball = { x:120, y:fy + 34 }; k.mut = kClamp(k.mut + BK.top.mut); k.ener = kClamp(k.ener - BK.top.enerji); kDost('top'); save(); kPanel(); kHearts(2);
        if (k.ener < BK.esik.uyku){ kBallMode = false; kPanel(); atSay(trx('Yoruldum… biraz uyuyayım.')); kToChair('sleep'); } else kSet('happy', 400, () => kSet('sit', 2000)); }; };
    const go = () => kWalk(tx - 20 + (tx > KS.x ? -6 : 6), fy, back); go.top = true;
    kDown(go);
  } };
}
// atolye.js kStep yürüme bitişini 'walk' için yapar; 'carry' de aynı yürüme gibi ilerlesin
const kStepBase = kStep;
kStep = function(now){
  if (KS.mode === 'carry'){
    const dt = Math.max(0, Math.min(0.2, (now - atLast) / 1000 || 0)); atLast = Math.max(atLast, now);
    const dx = KS.tx - KS.x, dy = KS.ty - KS.y, dist = Math.hypot(dx, dy), v = 40 * dt;
    if (dist <= v){ KS.x = KS.tx; KS.y = KS.ty; const t = KS.then; KS.then = null; kSet('sit', 1500); if (t) t(); } else { KS.x += dx / dist * v; KS.y += dy / dist * v; }
    return;
  }
  kStepBase(now);
};
// Oda tıklamaları: top modu, mama kabı ve sevme, atölyenin genel tıklamasından önce yakalanır
atRoomCv.addEventListener('click', e => {
  const [x, y] = kRoomXY(e);
  if (kPet && kPet.moved){ e.stopImmediatePropagation(); return; }                                    // okşama bir dokunuş sayılmasın
  if (kBallMode && !kOnKofte(x, y)){ e.stopImmediatePropagation(); return kThrow(x, y); }
  const b = AT_SLOT.mama; if (x >= b.x - 2 && x < b.x + b.w + 2 && y >= b.y - 6 && y < b.y + b.h){ e.stopImmediatePropagation(); return kFeedOpen(); }
}, true);

/* ----- bakım döngüsü: ekran açıkken saniyede bir ----- */
let kCareT = 0;
function kCare(){
  kCareT = 0; if (!$('#atolye').classList.contains('on')) return;
  const k = kData(); kTick(false);
  if (KS.mode === 'sleep'){ k.ener = kClamp(k.ener + BK.uykuDolum); if (k.ener >= BK.esik.uyan && k.ener - BK.uykuDolum < BK.esik.uyan){ kDown(() => kSet('yawn', 900, () => kSet('sit', 2500))); } else if (k.ener < BK.esik.uyan) KS.until = Math.max(KS.until, performance.now() + 2000); }
  kPanel(); kCareT = setTimeout(kCare, 1000);
}
// Günlük hediye: atölye günün ilk açılışında Köfte bir şey getirir
function kGift(){
  const k = kData(); if (k.hediye === kGun()) return; k.hediye = kGun();
  const r = Math.random(), o = BK.hediye.oran; let text;
  if (r < o.coin){ const c = BK.hediye.coin[0] + Math.floor(Math.random() * (BK.hediye.coin[1] - BK.hediye.coin[0] + 1)); DB.coins += c; setCoins(); text = TL('{0} coin', c); }
  else if (r < o.coin + o.kuru){ k.mama.kuru = (k.mama.kuru || 0) + BK.hediye.kuruAdet; text = TL('{0} kuru mama', BK.hediye.kuruAdet); }
  else { k.mama.balik = (k.mama.balik || 0) + 1; text = trx('1 balık'); }
  kDost('hediye'); save();
  KFX.gift = true; kDown(() => kWalk(110, ZEMIN()[1], () => { kSet('happy', 600, () => kSet('sit', 3000)); atSay(TL('Sana hediye getirdim: {0}!', text)); [784, 988, 1319].forEach((f, i) => tone(f, 0.1, i * 0.07, 'triangle', 0.05)); setTimeout(() => { KFX.gift = null; }, 2600); kPanel(); }));
  return text;
}
$('#kFeed').onclick = () => kFeedOpen();
$('#kBall').onclick = () => kBallToggle();
// atölye açılınca: geçen süreyi işle, bakım döngüsünü başlat, hediyeyi ver
const openAtolyeBase = openAtolye;
openAtolye = function(tab){
  kData(); kTick(true); save(); kBallMode = false;
  openAtolyeBase(tab); kPanel(); clearTimeout(kCareT); kCare();
  setTimeout(() => { if ($('#atolye').classList.contains('on')) kGift(); }, 1200);
};
// Köfte sekmesi atölyenin sekme sistemine bağlanır
const atBuildItemsBase = atBuildItems;
atBuildItems = function(){ if (atTab === 'kofte') return kBuildTab(); atBuildItemsBase(); };
const atSelTextBase = atSelText;
atSelText = function(){ if (atTab === 'kofte'){ $('#atAct').hidden = true; $('#atSelText').textContent = trx('Köfte’yi besle, kıyafet seç. Okşamak için parmağını Köfte’nin üstünde gezdir.'); return; } atSelTextBase(); };
