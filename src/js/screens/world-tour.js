/* ---------- world tour ---------- */
const PLANE = '<svg class="plane" width="34" height="34" viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true"><path fill="#2A1D14" d="M5 0h2v4h5v2h-5v3h2v2h-6v-2h2v-3h-5v-2h5z"></path><path fill="#FFFFFF" d="M6 1h0.6v4h4.4v0.6h-4.4v3.6h-0.6z"></path></svg>';
function setCoins(){ document.querySelectorAll('.coinN').forEach(el => el.textContent = DB.coins); document.querySelectorAll('.starN').forEach(el => el.textContent = totalStars()); }
const cityDone = c => c.items.every(it => DB.done[it.id]);
function openMap(){
  setCoins();
  const L = $('#mapList'); L.innerHTML = '';
  {
    const cur0 = CITIES.findIndex(c => DB.tickets[c.id] && !cityDone(c));
    const wrap = document.createElement('div'); wrap.className = 'mapwrap';
    const mc = document.createElement('canvas'); mc.setAttribute('role', 'img'); mc.setAttribute('aria-label', 'Piksel dünya haritası ve şehirler arasındaki rota');
    const doneN = CITIES.filter(cityDone).length;
    L.insertAdjacentHTML('beforeend', `<div class="tourhead box"><div class="row"><b>ROTA</b><span>${doneN}/${CITIES.length} şehir tamam</span></div><div class="tsegs">${CITIES.map((c, k) => `<i class="${k === cur0 ? 'now' : ''}" style="background:${cityDone(c) ? c.color : DB.tickets[c.id] ? 'var(--accent)' : 'var(--panel)'}"></i>`).join('')}</div></div>`);
    mc.width = 1440; mc.height = 510; mapCv = mc; mapCur = cur0; wrap.append(mc); L.append(wrap); wrap.style.marginTop = '12px';
    L.insertAdjacentHTML('beforeend', '<p class="maphint">Haritayı sağa sola kaydır. Bir şehre dokununca o şehir açılır.</p>');
    mc.onclick = e => {
      const r = mc.getBoundingClientRect(), x = (e.clientX - r.left) * 720 / r.width, y = (e.clientY - r.top) * 255 / r.height;
      let best = null, bd = 26; CITIES.forEach(c => { const [px, py] = geoXY(c.id), d = Math.hypot(px - x, py - y); if (d < bd){ bd = d; best = c; } });
      if (!best) return;
      if (DB.tickets[best.id]) openCity(best.id); else { const st = document.getElementById('stop-' + best.id); if (st) st.scrollIntoView({ behavior:'smooth', block:'center' }); }
    };
    const focus = CITIES[cur0 >= 0 ? cur0 : 0];
    setTimeout(() => { wrap.scrollLeft = geoXY(focus.id)[0] * 1000 / 720 - wrap.clientWidth / 2; }, 0);
    setTimeout(startMap, 0);
  }
  const pass = document.createElement('div'); pass.className = 'passport box'; pass.style.marginTop = '16px';
  pass.innerHTML = '<h3>' + (CITIES.every(cityDone) ? 'ALTIN PASAPORT' : 'PASAPORT') + '</h3><div class="stamps"></div>';
  CITIES.forEach((c, k) => {
    const got = !!DB.stamps[c.id], art = getArt(c.items[0].id);
    const d = document.createElement('div'); d.className = 'stampbox' + (got ? ' got' : '');
    if (got){ DB.seenStamps = DB.seenStamps || {}; if (!DB.seenStamps[c.id]){ d.classList.add('fresh'); d.style.animationDelay = (k * 0.12) + 's'; DB.seenStamps[c.id] = true; save(); } }
    d.style.setProperty('--sc', c.color); d.style.setProperty('--rot', [-4, 3, -2, 4, -3, 2][k % 6] + 'deg');
    const cv3 = document.createElement('canvas'); drawArt(cv3, art, got ? null : new Uint8Array(art.n * art.n));
    const nm = document.createElement('span'); nm.textContent = got ? c.name : '?';
    d.append(cv3, nm); d.setAttribute('aria-label', got ? TL('{0} damgası alındı', c.name) : 'Henüz alınmamış damga');
    pass.querySelector('.stamps').append(d);
  });
  L.append(pass);
  L.append(souvBox());
  const route = document.createElement('div'); route.className = 'route';
  let current = CITIES.findIndex(c => DB.tickets[c.id] && !cityDone(c));
  CITIES.forEach((c, k) => {
    const prevDone = k === 0 || cityDone(CITIES[k - 1]), has = !!DB.tickets[c.id], done = cityDone(c);
    const got = c.items.filter(it => DB.done[it.id]).length;
    const el = document.createElement(has ? 'button' : 'div'); el.className = 'stop box' + (!has && !prevDone ? ' locked' : '');
    if (has) el.type = 'button';
    el.id = 'stop-' + c.id; if (k === current) el.classList.add('cur');
    el.style.setProperty('--sc', c.color);
    let st, extra = '';
    if (done){ st = 'Tamamlandı. Damga pasaportunda.'; }
    else if (has){ st = TL('{0}/{1} resim boyandı', got, c.items.length); extra = `<div class="bar"><i style="width:${got / c.items.length * 100}%"></i></div>`; }
    else if (prevDone){ const ts = totalStars(); if (ts < (c.stars || 0)){ st = TL('★ {0} yıldız gerekli, sende {1} var. Resimleri hatasız boyayarak yıldız topla.', c.stars, ts); } else { st = 'Bilet alınca gidebilirsin.'; extra = `<button class="buy" type="button" ${DB.coins < c.price ? 'disabled' : ''}>BİLET AL ${COINSVG}${c.price}</button>` + (DB.coins < c.price ? `<span class="st">${c.price - DB.coins} coin eksik. Resim boyayarak ya da reklam izleyerek kazanabilirsin.</span><button class="adbtn" type="button">REKLAM İZLE +50 ${COINSVG}</button><button class="adbtn shopbtn" type="button">COIN SATIN AL</button>` : ''); } }
    else { st = TL('Önce {0} şehrini bitir.', CITIES[k - 1].name); }
    el.innerHTML = (k === current ? PLANE : '') + `<div class="stoprow"><span class="scv"></span><div class="stx"><div class="row"><span class="cn">${c.name}</span><span class="st">${done ? '✓' : has ? 'GİT' : ''}</span></div><span class="st">${st}</span>${!has && c.power ? `<span class="st">Burada açılır: <b>${POWERS[c.power].name}</b></span>` : ""}</div></div>${extra}`;
    { const cart = getArt(c.items[0].id), ccv = document.createElement('canvas'); drawArt(ccv, cart, has ? null : new Uint8Array(cart.n * cart.n)); el.querySelector('.scv').append(ccv); }
    if (has) el.onclick = () => openCity(c.id);
    const adb = el.querySelector('.adbtn'); if (adb) adb.onclick = () => watchAd(50, openMap);
    const shb = el.querySelector('.shopbtn'); if (shb) shb.onclick = () => openShop(openMap);
    const buy = el.querySelector('.buy');
    if (buy) buy.onclick = () => {
      if (DB.coins < c.price) return;
      DB.coins -= c.price; DB.tickets[c.id] = true; save();
      [523, 784, 1047].forEach((f, q) => tone(f, 0.15, q * 0.08, 'triangle', 0.06));
      openCity(c.id);
    };
    route.append(el);
  });
  L.append(route);
  if (CITIES.every(cityDone)){
    pass.style.borderColor = 'var(--gold)';
    const nPic = CITIES.reduce((t, c) => t + c.items.length, 0), nStar = CITIES.reduce((t, c) => t + c.items.reduce((u, it) => u + (DB.stars[it.id] || 0), 0), 0);
    L.insertAdjacentHTML('afterbegin', `<div class="box" style="margin-top:6px;padding:16px 14px;text-align:center;border-color:var(--gold)"><div style="font-size:27px;font-weight:700;line-height:1.05;color:var(--gold);text-shadow:2px 2px 0 var(--line)">DÜNYA TURU TAMAM!</div><p style="font-size:15px;margin-top:8px">${TL('{0} şehir, {1} resim, ★ {2}. Altın pasaportun hazır.', CITIES.length, nPic, nStar)}</p></div>`);
    L.insertAdjacentHTML('beforeend', '<p class="cityprize">Bütün şehirleri gezdin. Yeni şehirler yakında eklenecek.</p>');
  }
  const dm = document.createElement('button'); dm.type = 'button'; dm.className = 'linkbtn'; dm.style.cssText = 'display:block;margin:18px auto 0';
  dm.textContent = REAL_DB ? 'Önizlemeyi kapat, kendi ilerlememe dön' : 'Turun tamamlanmış hâlini göster (önizleme)';
  dm.onclick = toggleDemo; L.append(dm);
  show('map');
}
function toggleDemo(){
  if (REAL_DB){ DB = REAL_DB; REAL_DB = null; }
  else {
    REAL_DB = DB; DB = JSON.parse(JSON.stringify(DB));
    CITIES.forEach(c => { DB.tickets[c.id] = true; DB.stamps[c.id] = true; c.items.forEach(it => { const art = getArt(it.id); if (!DB.done[it.id]) DB.done[it.id] = { order:Array.from({ length:art.n * art.n }, (_, i) => i), date:Date.now() }; DB.stars[it.id] = 3; delete DB.wip[it.id]; }); });
    DB.coins = Math.max(DB.coins, 1200);
  }
  openMap(); $('#mapList').scrollTop = 0;
}
function cityCards(c){
  const cards = document.createElement('div'); cards.className = 'cards big';
  c.items.forEach(it => {
    const art = getArt(it.id), done = !!DB.done[it.id], w = DB.wip[it.id];
    const b = document.createElement('button'); b.type = 'button'; b.className = 'card';
    const pic = document.createElement('div'); pic.className = 'pic';
    const cv2 = document.createElement('canvas'); drawArt(cv2, art, done ? null : (w ? maskOf(w.painted) : new Uint8Array(art.n * art.n)));
    pic.append(cv2);
    if (done) pic.insertAdjacentHTML('beforeend', '<span class="badge" aria-hidden="true">✓</span>');
    else if (w){ const p = Math.round(w.order.length / (art.n * art.n) * 100); pic.insertAdjacentHTML('beforeend', `<span class="wip"><i style="width:${p}%"></i></span>`); }
    const nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = it.name; if (done && DB.stars[it.id]) nm.insertAdjacentHTML('beforeend', '<br><span class="stars">' + starStr(DB.stars[it.id]) + '</span>');
    b.append(pic, nm);
    b.setAttribute('aria-label', `${it.name}, ${done ? 'boyandı' : w ? 'yarım kaldı' : 'boyanmadı'}`);
    b.onclick = () => done ? viewDone({ ...art, order:DB.done[it.id].order }, it.name.toLocaleUpperCase('tr'), { id:it.id }) : startBuiltin(it.id);
    cards.append(b);
  });
  return cards;
}
function openCity(id){
  const c = CITIES.find(x => x.id === id); origin = { screen:'city', city:id }; setCoins(); $('#cityBack').onclick = openMap;
  $('#cityName').textContent = c.name;
  const B = $('#cityBody'); B.innerHTML = ''; B.style.setProperty('--sc', c.color);
  B.insertAdjacentHTML('beforeend', `<div class="guide box"><canvas class="avatar" id="guideAv" width="16" height="16" aria-hidden="true"></canvas><div><b>${c.guide.name}</b><p>${c.guide.line}</p></div></div>`);
  drawArt($('#guideAv'), guideArt(c.id));
  B.append(cityCards(c));
  const mg = MINIS[c.id];
  if (mg) B.insertAdjacentHTML('beforeend', mg.ready ? `<button class="minicard box" type="button" id="miniBtn"><b>MİNİ OYUN</b><span>${mg.name}</span><small>${mg.desc}</small></button>` : `<div class="minicard box locked"><b>MİNİ OYUN</b><span>${mg.name}</span><small>Yakında</small></div>`);
  if (mg && mg.ready) $('#miniBtn').onclick = () => openMini(c.id);
  const mcEl = B.querySelector('.minicard'); if (mcEl) B.querySelector('.guide').after(mcEl);
  if (c.power) B.insertAdjacentHTML('beforeend', `<p class="cityprize">Bu şehirle açılan güç: <b>${POWERS[c.power].name}</b>. <span>${POWERS[c.power].desc}</span></p>`);
  B.insertAdjacentHTML('beforeend', cityDone(c) ? '<p class="cityprize">Bu şehir tamam. Pasaportuna damgası basıldı.</p>' : '<p class="cityprize">Şehrin tüm resimlerini boya: +100 coin ve pasaport damgası.</p>');
  show('city');
}
const AD_MAX = 5;
function today(){ const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
function adLeft(){ if (!DB.ads || DB.ads.d !== today()) DB.ads = { d:today(), n:0 }; return AD_MAX - DB.ads.n; }
function watchAd(reward, after){
  if (adLeft() <= 0){ msg('Bugünkü reklam hakkın bitti. Yarın yenilenir; resim boyayarak da coin kazanabilirsin.'); return; }
  const ok = $('#adOk'), fill = $('#adFill'); let t = 5;
  $('#adInfo').textContent = TL('Sonuna kadar izlersen +{0} coin. Bugün kalan hak: {1}.', reward, adLeft());
  ok.disabled = true; ok.textContent = t; fill.style.width = '0%';
  $('#ad').classList.add('on');
  const iv = setInterval(() => { t--; fill.style.width = ((5 - t) / 5 * 100) + '%'; if (t > 0) ok.textContent = t; else { clearInterval(iv); ok.disabled = false; ok.textContent = TL('+{0} COIN AL', reward); ok.focus(); } }, 1000);
  ok.onclick = () => { DB.ads.n++; DB.coins += reward; save(); setCoins(); [659, 880, 1175].forEach((f, k) => tone(f, 0.12, k * 0.07, 'triangle', 0.06)); $('#ad').classList.remove('on'); if (after) after(); };
}
$('#trBack').onclick = () => { show('home'); refreshHome(); };
$('#tourBtn').onclick = openMap; $('#trBtn').onclick = openTr;
$('#dailyBtn').onclick = () => { const ds = dailyState(); origin = { screen:'home' }; if (ds.done && DB.done[ds.id]) viewDone({ ...getArt(ds.id), order:DB.done[ds.id].order }, 'GÜNÜN RESMİ', { id:ds.id }); else startBuiltin(ds.id); };
$('#collBtn').onclick = () => openColl('albums');
$('#memBtn').onclick = () => openColl('memories');
$('#dealBtn').onclick = () => openColl('deals');
$('#photoBtn').onclick = () => $('#add').classList.add('on');
$('#mapBack').onclick = () => { show('home'); refreshHome(); };
$('#cityBack').onclick = openMap;


