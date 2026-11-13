/* finish, done view, replay */
let viewArt = null, viewCtx = {};
function finish(){
  if (mode !== 'paint' || !A) return;
  $('#gtip').hidden = true; gtipAt = 0;
  mode = 'done';
  [523, 659, 784, 1047, 1319].forEach((f, k) => tone(f, 0.2, k * 0.09, 'square', 0.06));
  const art = { id:A.id, n:A.n, pal:A.pal, idx:A.idx, order:order.slice(), date:Date.now() };
  const stars = wrong === 0 ? 3 : wrong <= 5 ? 2 : 1, base = Math.min(200, Math.round(A.n * A.n / 8)); DB.stats.pics++;
  let title = 'BİTTİ!', sub = '', ctxv = {}, coins = base;
  if (A.id){
    const first = !DB.done[A.id], prev = DB.stars[A.id] || 0;
    coins = first ? base : (stars > prev ? Math.round(base / 2) : 0);
    DB.done[A.id] = { order:art.order, date:art.date }; delete DB.wip[A.id];
    DB.stars[A.id] = Math.max(prev, stars);
    const al = ITEMS[A.id].album;
    if (al.kind === 'daily' && DB.daily && DB.daily.id === A.id && !DB.daily.done){ const rw = dailyReward(); DB.daily.done = true; DB.daily.time = Math.round(elapsed); DB.daily.pw = usedPower; DB.stats.daily[DB.daily.date] = Math.round(elapsed); if (!usedPower) DB.flags.pure = true; coins += rw.bonus; const brd = dailyBoard(usedPower ? 'free' : 'pure'), rk = brd.findIndex(x => x.me) + 1; title = 'GÜNÜN RESMİ TAMAM!'; sub = TL('Süren: {0}{1}. {2} sıralamada {3}/{4}. Seri: {5} gün, günlük ödül +{6} coin.', fmtT(elapsed), usedPower ? ' (güç kullanarak)' : '', usedPower ? 'Serbest' : 'Güçsüz', rk, brd.length, rw.n, rw.bonus); [784, 988, 1175, 1568].forEach((f, k) => tone(f, 0.25, 0.5 + k * 0.12, 'triangle', 0.07)); }
    if (al.kind === 'event' && al.items.every(it => DB.done[it.id]) && !(DB.eventsDone || {})[al.id]){ DB.eventsDone = DB.eventsDone || {}; DB.eventsDone[al.id] = true; coins += al.reward; DB.frames[al.frame] = true; title = 'ETKİNLİK TAMAM!'; sub = TL('{0} bitti! Ödülün: +{1} coin ve {2} çerçevesi.', al.name, al.reward, FRAMES[al.frame].name); [784, 988, 1175, 1568].forEach((f, k) => tone(f, 0.25, 0.5 + k * 0.12, 'triangle', 0.07)); }
    if (al.kind === 'sponsor' && first){ title = 'KUPON KAZANDIN!'; sub = TL('{0}: {1}.', al.brand, al.offer); }
    if (al.items.every(it => DB.done[it.id])){
      if (al.kind === 'city' && !DB.stamps[al.id]){ DB.stamps[al.id] = true; coins += 100; title = al.name + ' TAMAM!'; sub = TL('{0}: “{1}” Pasaportuna damga basıldı, +100 coin.', al.guide.name, BYE[al.id] || 'Yolun açık olsun!'); }
      else if (al.kind === 'il' && !DB.ilDone[al.id]){ DB.ilDone[al.id] = true; coins += 50; title = al.name + ' TAMAM!'; const nn = ilNb(al).filter(n => n.items.length && !n.items.some(it => DB.done[it.id])).map(n => n.name); sub = `${al.guide.name}: “${BYE[al.id] || 'Yolun açık olsun!'}” Türkiye haritanda ${al.name} renklendi, +50 coin.` + (nn.length ? ` Açılan komşular: ${nn.join(', ')}.` : ''); }
      else if (al.kind === 'album' && !DB.albumsDone[al.id]){ DB.albumsDone[al.id] = al.items.length; coins += 50; title = 'ALBÜM TAMAM!'; sub = TL('{0} albümünü bitirdin. Albüm ödülü: +50 coin.', al.name); }
      // Albüme yeni resimler eklenmişse (eski kayıtta true ya da daha küçük sayı): ödül tekrar verilmez, kutlama mesajı gösterilir
      else if (al.kind === 'album' && (DB.albumsDone[al.id] === true || DB.albumsDone[al.id] < al.items.length)){ DB.albumsDone[al.id] = al.items.length; title = 'ALBÜM YİNE TAMAM!'; sub = TL('{0} albümünü yeni resimleriyle birlikte yine tamamladın.', al.name); }
      if (sub) [784, 988, 1175, 1568].forEach((f, k) => tone(f, 0.25, 0.5 + k * 0.12, 'triangle', 0.07));
    }
    ctxv = { id:A.id };
  } else {
    DB.gallery.push({ n:art.n, pal:art.pal, idx:art.idx, order:art.order, date:art.date }); DB.current = null; DB.flags.photo = true;
    ctxv = { photo:DB.gallery.length - 1 };
  }
  DB.coins += coins;
  const newB = checkBadges();
  save();
  viewDone(art, title, ctxv, sub, coins, stars);
  showDoneBadges(newB);
}
function viewDone(art, title, ctxv, sub, coins, stars){
  viewArt = art; viewCtx = ctxv || {}; $('#doneBadges').hidden = true; $('#doneBadges').innerHTML = '';
  const st = stars || (viewCtx.id ? DB.stars[viewCtx.id] || 0 : 0);
  $('#doneStars').hidden = !st;
  if (st) $('#doneStars').innerHTML = `<span aria-label="${st} yıldız">${starStr(st)}</span><small>${!stars ? 'En iyi sonucun' : st === 3 ? 'Hiç yanlış dokunuş yok!' : st === 2 ? 'Çok az hata. 3 yıldız için hiç yanlış dokunma.' : 'Tekrar boyayıp yıldızını artırabilirsin.'}</small>`;
  $('#againBtn').hidden = !viewCtx.id || (DB.stars[viewCtx.id] || 0) >= 3 || ITEMS[viewCtx.id].album.kind === 'daily';
  $('#rankBtn').hidden = !(viewCtx.id && ITEMS[viewCtx.id].album.kind === 'daily');
  $('#againBtn').onclick = () => { $('#done').classList.remove('on'); const a2 = getArt(viewCtx.id); startPaint({ ...a2, name:ITEMS[viewCtx.id].name }, null); };
  const rec = viewCtx.id ? DB.done[viewCtx.id] : (viewCtx.photo !== undefined ? DB.gallery[viewCtx.photo] : null);
  viewRec = rec;
  const fact = viewCtx.id ? FACTS[viewCtx.id] : null; $('#doneFact').hidden = !fact; if (fact) $('#doneFact').innerHTML = '<b>Biliyor muydun?</b> ' + fact;
  renderQuiz();
  const spn = viewCtx.id && ITEMS[viewCtx.id].album.kind === 'sponsor' ? ITEMS[viewCtx.id].album : null;
  $('#doneCoupon').hidden = !spn; if (spn) $('#doneCoupon').innerHTML = `<span>${TL('{0} kuponun', spn.brand)}</span><b>${spn.coupon}</b><span>${spn.offer}</span><small>Örnek kupon. Gerçek uygulamada markanın verdiği, sana özel ve tek kullanımlık bir kod çıkar.</small>`;
  const dstr = new Date((rec && rec.date) || art.date || Date.now()).toLocaleDateString(LOC, { day:'numeric', month:'long', year:'numeric' });
  const cap = rec && typeof rec.caption === 'string' ? rec.caption : (viewCtx.id ? trx(ITEMS[viewCtx.id].name) + ', ' + dstr : dstr);
  $('#capIn').value = cap; renderCard(art, cap);
  $('#capIn').oninput = () => { renderCard(art, $('#capIn').value); if (rec) rec.caption = $('#capIn').value; };
  $('#capIn').onchange = () => save();
  $('#doneTitle').textContent = title;
  $('#doneTitle').classList.toggle('gold', title !== 'BİTTİ!' && title !== 'FOTOĞRAFIN' && !!sub);
  $('#doneSub').hidden = !sub; $('#doneSub').textContent = sub || '';
  $('#doneCoins').hidden = !coins; $('#doneCoins').textContent = coins ? TL('+{0} COIN', coins) : '';
  $('#dblBtn').hidden = !coins || adLeft() <= 0;
  $('#dblBtn').onclick = () => watchAd(coins, () => { $('#doneCoins').textContent = TL('+{0} COIN', coins * 2); $('#dblBtn').hidden = true; });
  $('#delBtn').hidden = viewCtx.photo === undefined;
  const grp = viewCtx.id ? ITEMS[viewCtx.id].album : null;
  const nx = viewCtx.photo === undefined ? nextOf(viewCtx.id) : null;
  const toMap = !nx && grp && (grp.kind === 'city' || grp.kind === 'il') && grp.items.every(it => DB.done[it.id]);
  const nb = $('#nextBtn');
  nb.hidden = !nx && !toMap; nb.textContent = toMap ? 'HARİTA' : 'SIRADAKİ';
  nb.onclick = () => { $('#done').classList.remove('on'); if (toMap){ A = null; mode = 'paint'; grp.kind === 'il' ? openTr() : openMap(); } else startBuiltin(nx); };
    $('#done').classList.add('on'); $('#doneBack').focus();
}
function startView(art){
  A = { id:art.id || null, name:'', n:art.n, pal:art.pal, rgb:art.pal.map(unhex), idx:art.idx };
  painted = new Uint8Array(art.n * art.n).fill(1); popT = new Float32Array(art.n * art.n).fill(-9);
  order = (art.order && art.order.length) ? art.order.slice() : Array.from({ length:art.n * art.n }, (_, i) => i);
  remain = A.pal.map(() => 0); left = 0; parts.length = 0; floats.length = 0; pending.length = 0;
  $('#pname').textContent = 'TEKRAR'; buildPal(); buildPowers(); updateProg();
}
$('#replayBtn').onclick = () => {
  $('#done').classList.remove('on');
  startView(viewArt); show('paint'); resize(); fit();
  mode = 'replay'; replayT = 0; $('#replayBar').classList.add('on'); $('#tip').classList.add('off'); dirty = true;
};
$('#skipBtn').onclick = endReplay;
$('#decoBtn').onclick = openDeco;
document.querySelectorAll('#decoTabs button').forEach(b => b.onclick = () => { document.querySelectorAll('#decoTabs button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); document.querySelectorAll('#deco .dpane').forEach(pn => pn.hidden = pn.dataset.p !== b.dataset.p); });
(() => {
  const wrap = $('#decoWrap'), over = $('#decoOver'), img = $('#decoImg'); let drag = -1;
  const list = () => (viewRec && viewRec.emo) || [];
  const norm = e => { const r = img.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, r]; };
  const layout = () => { const r = img.getBoundingClientRect(); over.innerHTML = ''; list().forEach(o => { const sp = document.createElement('span'); sp.textContent = o.e; sp.style.left = (o.x * 100) + '%'; sp.style.top = (o.y * 100) + '%'; sp.style.fontSize = (o.s * r.width) + 'px'; sp.style.setProperty('--r', o.r + 'rad'); over.append(sp); }); };
  const redo = () => { renderCard(viewArt, $('#capIn').value); save(); };
  wrap.addEventListener('pointerdown', e => {
    const [x, y, r] = norm(e), L2 = list(); let hit = -1;
    for (let i = L2.length - 1; i >= 0; i--){ const o = L2[i]; if (Math.hypot((o.x - x) * r.width, (o.y - y) * r.height) < Math.max(24, o.s * r.width * 0.6)){ hit = i; break; } }
    emoSel = hit; $('#emoCtl').hidden = hit < 0;
    if (hit < 0) return;
    e.preventDefault(); drag = hit; wrap.setPointerCapture(e.pointerId);
    img.src = cardBaseURL; layout(); over.hidden = false;
  });
  wrap.addEventListener('pointermove', e => {
    if (drag < 0) return; const [x, y] = norm(e), o = list()[drag]; if (!o) return;
    o.x = Math.max(0.03, Math.min(0.97, x)); o.y = Math.max(0.03, Math.min(0.97, y));
    const sp = over.children[drag]; if (sp){ sp.style.left = (o.x * 100) + '%'; sp.style.top = (o.y * 100) + '%'; }
  });
  const end = () => { if (drag < 0) return; drag = -1; over.hidden = true; redo(); };
  wrap.addEventListener('pointerup', end); wrap.addEventListener('pointercancel', end);
  $('#emoPlus').onclick = () => { const o = list()[emoSel]; if (o){ o.s = Math.min(0.5, o.s * 1.25); redo(); } };
  $('#emoMinus').onclick = () => { const o = list()[emoSel]; if (o){ o.s = Math.max(0.06, o.s / 1.25); redo(); } };
  $('#emoDel').onclick = () => { const L2 = list(); if (L2[emoSel]){ L2.splice(emoSel, 1); emoSel = -1; redo(); } };
})();
$('#decoOk').onclick = () => { if (viewRec && decoKey() !== decoSnap) DB.flags.deco = true; save(); $('#deco').classList.remove('on'); afterBadge(); };
$('#decoOk2').onclick = () => $('#decoOk').click();
$('#doneBack').onclick = () => $('#toColl').click();
$('#doneX').onclick = () => $('#toColl').click();
$('#shareX').onclick = () => $('#shareClose').click();
$('#setupX').onclick = () => $('#backBtn').click();
$('#addX').onclick = () => $('#addClose').click();
$('#shopX').onclick = () => $('#shopClose').click();
// Paylaşım mesajı: hazır bir öneriyle dolu gelir; oyuncu düzenleyebilir, silebilir ya da kendisi yazabilir.
const shareDefault = () => { const nm = viewCtx.id && ITEMS[viewCtx.id] ? trx(ITEMS[viewCtx.id].name) : ($('#capIn').value || '').trim(); return nm ? TL('Piksel Atölye\'de "{0}" resmini kare kare boyadım! 🎨', nm) : TL('Piksel Atölye\'de kare kare boyadım! 🎨'); };
$('#shareBtn').onclick = () => { if (shareFor !== viewArt){ shareOpt.emo = []; emoSel = -1; shareFor = viewArt; $('#shareText').value = shareDefault(); } buildShareChips(); renderShare(); $('#share').classList.add('on'); $('#shareGo').focus(); };
document.querySelectorAll('#fmtSeg button').forEach(b => b.onclick = () => { shareFmt = b.dataset.f; renderShare(); });
$('#shareClose').onclick = () => $('#share').classList.remove('on');
$('#shareGo').onclick = async () => {
  DB.flags.share = true; save(); afterBadge();
  try {
    const blob = await new Promise(r => shareCanvas.toBlob(r, 'image/png'));
    const file = new File([blob], 'piksel-atolye.png', { type:'image/png' });
    const text = $('#shareText').value.trim(), data = { files:[file], title:trx('Piksel Atölye') };
    if (text) data.text = text; // bazı uygulamalar (ör. Instagram) resimle birlikte metni almaz; WhatsApp, Mesajlar vb. alır
    if (navigator.canShare && navigator.canShare(data)){ await navigator.share(data); return; }
    if (navigator.canShare && navigator.canShare({ files:[file] })){ delete data.text; await navigator.share(data); return; }
  } catch(e){ if (e && e.name === 'AbortError') return; }
  msg('Bu önizlemede paylaşım menüsü açılamıyor. Resme basılı tutup kaydet, sonra istediğin uygulamada paylaş. Gerçek uygulamada bu buton doğrudan Instagram ve WhatsApp’ı açar.');
};
function endReplay(){ mode = 'done'; $('#replayBar').classList.remove('on'); dirty = true; $('#done').classList.add('on'); }
function backToOrigin(){ A = null; mode = 'paint'; $('#replayBar').classList.remove('on'); if (origin.screen === 'home'){ show('home'); refreshHome(); } else if (origin.screen === 'event') openEvent(origin.id); else if (origin.screen === 'city') openCity(origin.city); else if (origin.screen === 'il') openIl(origin.il); else if (origin.screen === 'tr') openTr(); else openColl(origin.tab, origin.album); }
$('#toColl').onclick = () => { $('#done').classList.remove('on'); backToOrigin(); };
$('#delBtn').onclick = () => { if (viewCtx.photo !== undefined) ask('Bu anı silinsin mi? Geri getirilemez.', 'SİL', () => { DB.gallery.splice(viewCtx.photo, 1); save(); $('#done').classList.remove('on'); A = null; mode = 'paint'; openColl(); }); };
$('#paintBack').onclick = () => { if (mode === 'paint') persist(true); backToOrigin(); };

