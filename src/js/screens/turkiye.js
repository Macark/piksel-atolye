/* ---------- Türkiye Turu ---------- */
const TR_OUT = [[26.03,40.73],[26.33,40.95],[26.6,41.35],[26.63,41.6],[26.33,41.73],[26.6,41.97],[27.05,42.08],[27.6,41.95],[28.03,41.98],[28.1,41.63],[28.68,41.35],[29.1,41.23],[29.6,41.17],[30.3,41.2],[30.7,41.12],[31.4,41.25],[31.8,41.45],[32.3,41.73],[33.0,41.97],[33.9,41.98],[34.6,41.95],[35.1,42.07],[35.2,41.75],[35.9,41.73],[36.35,41.3],[37.1,41.35],[37.6,41.1],[38.4,40.93],[39.3,41.0],[40.0,40.97],[40.55,41.05],[41.0,41.2],[41.55,41.53],[42.5,41.45],[42.85,41.55],[43.47,41.12],[43.73,40.75],[43.6,40.45],[43.9,40.0],[44.6,39.75],[44.82,39.65],[44.4,39.4],[44.08,39.2],[44.3,38.9],[44.25,38.4],[44.45,38.0],[44.25,37.8],[44.6,37.45],[44.79,37.15],[44.25,37.25],[43.6,37.25],[42.8,37.33],[42.36,37.11],[41.5,37.08],[40.8,37.12],[40.0,36.82],[39.2,36.67],[38.3,36.85],[37.8,36.75],[37.1,36.65],[36.68,36.82],[36.55,36.4],[36.5,36.0],[36.15,35.82],[35.92,35.92],[35.92,36.1],[35.95,36.42],[36.1,36.6],[36.2,36.9],[35.85,36.78],[35.4,36.57],[34.9,36.75],[34.6,36.78],[34.2,36.55],[33.9,36.3],[33.4,36.12],[32.85,36.02],[32.4,36.15],[31.95,36.55],[31.3,36.8],[30.7,36.87],[30.55,36.5],[30.4,36.22],[29.9,36.2],[29.6,36.15],[29.1,36.6],[28.8,36.7],[28.3,36.8],[27.4,36.68],[27.6,36.95],[27.25,37.0],[27.25,37.35],[27.25,37.9],[26.85,38.15],[26.3,38.3],[26.45,38.65],[26.85,38.6],[26.9,39.05],[26.65,39.3],[27.0,39.6],[26.07,39.48],[26.15,39.98],[26.18,40.05],[26.27,40.3],[26.55,40.5],[26.8,40.62],[26.4,40.62]];
const TR_WATER = [
  [[26.2,40.03],[26.4,40.2],[26.6,40.35],[26.7,40.45],[27.1,40.6],[27.5,40.97],[28.0,41.0],[28.6,41.0],[29.0,41.0],[29.4,40.82],[29.9,40.75],[29.4,40.7],[29.1,40.42],[28.6,40.38],[28.0,40.38],[27.8,40.52],[27.45,40.4],[26.9,40.38],[26.5,40.15],[26.3,40.03]],
  [[42.35,38.75],[42.7,38.95],[43.1,38.88],[43.35,39.02],[43.6,38.75],[43.4,38.45],[43.0,38.35],[42.6,38.45],[42.35,38.6]],
  [[33.25,38.95],[33.55,38.98],[33.62,38.6],[33.35,38.55]]
];
const TRM = { lon0:25.4, lat0:42.35, k:Math.cos(39 * Math.PI / 180), cols:120, rows:52, px:8 };
TRM.s = (45.1 - TRM.lon0) * TRM.k / TRM.cols;
const inPoly = (x, y, P) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++){ const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
let TRGRID = null;
function trGrid(){
  if (TRGRID) return TRGRID;
  const g = new Int16Array(TRM.cols * TRM.rows).fill(-1);
  const pts = ILLER.map(i => [(i.geo[1] - TRM.lon0) * TRM.k, TRM.lat0 - i.geo[0]]);
  for (let r = 0; r < TRM.rows; r++) for (let c = 0; c < TRM.cols; c++){
    const x = (c + 0.5) * TRM.s, y = (r + 0.5) * TRM.s, lon = TRM.lon0 + x / TRM.k, lat = TRM.lat0 - y;
    if (!inPoly(lon, lat, TR_OUT) || TR_WATER.some(w => inPoly(lon, lat, w))) continue;
    let best = 0, bd = 1e9; pts.forEach(([px, py], k) => { const d = (px - x) * (px - x) + (py - y) * (py - y); if (d < bd){ bd = d; best = k; } });
    g[r * TRM.cols + c] = best;
  }
  return TRGRID = g;
}
const mixC = (a, b, t) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A1 = p(a), B1 = p(b); return '#' + A1.map((v, i) => Math.round(v + (B1[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
function drawTRMap(cv){
  const g = trGrid(), P = TRM.px; cv.width = TRM.cols * P; cv.height = TRM.rows * P;
  const x = cv.getContext('2d'); x.fillStyle = '#1E3350'; x.fillRect(0, 0, cv.width, cv.height);
  const col = ILLER.map(i => ilDone(i) ? i.color : ilOpen(i) ? mixC('#EFE4CC', i.color, 0.45) : i.items.length ? mixC('#EFE4CC', i.color, 0.14) : '#EFE4CC');
  const edge = ILLER.map(i => ilDone(i) ? mixC(i.color, '#000000', 0.25) : '#D3C3A2');
  for (let r = 0; r < TRM.rows; r++) for (let c = 0; c < TRM.cols; c++){
    const v = g[r * TRM.cols + c]; if (v < 0) continue;
    const nb = [[1,0],[-1,0],[0,1],[0,-1]].some(([dc, dr]) => { const cc = c + dc, rr = r + dr; if (cc < 0 || rr < 0 || cc >= TRM.cols || rr >= TRM.rows) return false; const w = g[rr * TRM.cols + cc]; return w >= 0 && w !== v; });
    x.fillStyle = nb ? edge[v] : col[v]; x.fillRect(c * P, r * P, P, P);
  }
  x.font = 'bold 15px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  IL_OPEN.forEach(i => {
    const px = (i.geo[1] - TRM.lon0) * TRM.k / TRM.s * P, py = (TRM.lat0 - i.geo[0]) / TRM.s * P, op = ilOpen(i);
    x.fillStyle = '#2A1D14'; x.fillRect(px - 17, py - 30, 34, 22); x.fillStyle = i.id === DB.trHome ? '#F2B33D' : op ? '#FFFFFF' : '#B8AE9C'; x.fillRect(px - 15, py - 28, 30, 18);
    x.fillStyle = '#2A1D14'; x.fillText(plk(i.plaka), px, py - 18); x.fillRect(px - 2, py - 8, 4, 8);
  });
}
let ILNB = null;
function ilNb(c){
  if (c.nb) return c.nb.map(p => ILLER.find(i => i.plaka === p)).filter(Boolean);
  if (!ILNB){ ILNB = {}; ILLER.forEach(i => ILNB[i.id] = new Set()); const g = trGrid();
    for (let r = 0; r < TRM.rows; r++) for (let q = 0; q < TRM.cols; q++){ const v = g[r * TRM.cols + q]; if (v < 0) continue;
      [[1,0],[0,1]].forEach(([dc, dr]) => { const cc = q + dc, rr = r + dr; if (cc >= TRM.cols || rr >= TRM.rows) return; const w = g[rr * TRM.cols + cc]; if (w >= 0 && w !== v){ ILNB[ILLER[v].id].add(ILLER[w].id); ILNB[ILLER[w].id].add(ILLER[v].id); } }); } }
  return [...ILNB[c.id]].map(id => ILLER.find(i => i.id === id));
}
function ilOpen(c){
  if (!c.items.length) return false;
  return !!(DB.trOpen[c.id] || c.id === DB.trHome || ilDone(c) || c.items.some(it => DB.done[it.id] || DB.wip[it.id]) || ilNb(c).some(ilDone));
}
function ilLocked(c){
  const nbs = ilNb(c).map(n => n.name.charAt(0) + n.name.slice(1).toLocaleLowerCase('tr')).join(', ');
  ask(`${c.name} için komşularından birini bitir: ${nbs}. Hemen gitmek istersen bilet: ${TR_TICKET} coin.`, 'BİLET AL', () => {
    if (DB.coins < TR_TICKET){ msg(`Bilet için ${TR_TICKET} coin gerekiyor, sende ${DB.coins} var. Resim boyayarak ya da reklam izleyerek coin kazanabilirsin.`); return; }
    DB.coins -= TR_TICKET; DB.trOpen[c.id] = true; save(); setCoins(); openIl(c.id);
  });
}
function trStart(id){
  const home = ILLER.find(i => i.id === id); let start = home;
  if (!home.items.length){ const d = c => (c.geo[0] - home.geo[0]) ** 2 + ((c.geo[1] - home.geo[1]) * 0.78) ** 2; start = IL_OPEN.slice().sort((a, b) => d(a) - d(b))[0]; }
  DB.trHome = home.id; DB.trOpen[start.id] = true; save();
  openTr();
  if (start !== home) msg(`${home.name} henüz hazır değil. Geldiğinde senin için ücretsiz açılacak. O zamana kadar başlangıç ilin: ${start.name}.`);
}
function trPicker(L0, change){
  const box = document.createElement('div'); box.className = 'passport box trpick';
  const opts = ILLER.slice().sort((a, b) => a.name.localeCompare(b.name, 'tr')).map(i => `<option value="${i.id}">${i.name} (${plk(i.plaka)})${i.items.length ? '' : ' · yakında'}</option>`).join('');
  box.innerHTML = `<h3>MEMLEKETİN NERESİ?</h3><p class="muted" style="font-size:14px;margin:-4px 0 10px">Türkiye Turu’na kendi ilinden başla. İl bitince komşu iller açılır, harita memleketinden etrafa doğru boyanır.</p><select id="trSel" aria-label="İl seç"><option value="">İl seç</option>${opts}</select><div class="row2" style="margin-top:10px"><button class="btn primary" type="button" id="trGo">BAŞLA</button><button class="btn" type="button" id="trAny">${change ? 'VAZGEÇ' : 'FARK ETMEZ'}</button></div>`;
  L0.append(box);
  box.querySelector('#trGo').onclick = () => { const v = box.querySelector('#trSel').value; if (!v){ box.querySelector('#trSel').focus(); return; } trStart(v); };
  box.querySelector('#trAny').onclick = () => change ? openTr() : trStart(IL_OPEN[Math.floor(Math.random() * IL_OPEN.length)].id);
}
function trAt(cv, e){
  const r = cv.getBoundingClientRect(), c = Math.floor((e.clientX - r.left) / r.width * TRM.cols), rr = Math.floor((e.clientY - r.top) / r.height * TRM.rows);
  if (c < 0 || rr < 0 || c >= TRM.cols || rr >= TRM.rows) return null; const v = trGrid()[rr * TRM.cols + c]; return v < 0 ? null : ILLER[v];
}
function openTr(change){
  setCoins(); origin = { screen:'tr' };
  const L0 = $('#trList'); L0.innerHTML = '';
  if (!DB.trHome || change === true){ trPicker(L0, change === true); }
  const doneN = ILLER.filter(ilDone).length;
  L0.insertAdjacentHTML('beforeend', `<div class="tourhead box"><div class="row"><b>İLLER</b><span>${doneN}/${ILLER.length} il tamam</span></div><div class="abar" style="--ac:#B3261E;margin-top:8px"><i style="width:${doneN / ILLER.length * 100}%"></i></div><p class="trsub">${IL_OPEN.length} ilin resimleri hazır, diğerleri yakında. ${DB.trHome ? `Memleketin: ${ILLER.find(i => i.id === DB.trHome).name} 🏠 <button type="button" class="linkbtn" id="trChange">değiştir</button>` : ''}</p></div>`);
  const tc = L0.querySelector('#trChange'); if (tc) tc.onclick = () => openTr(true);
  const wrap = document.createElement('div'); wrap.className = 'mapwrap trwrap'; wrap.style.marginTop = '12px';
  const mc = document.createElement('canvas'); mc.setAttribute('role', 'img'); mc.setAttribute('aria-label', 'Piksel Türkiye haritası; bitirdiğin iller bölge rengine boyanır');
  drawTRMap(mc); wrap.append(mc); L0.append(wrap);
  mc.onclick = e => { const il = trAt(mc, e); if (!il) return; if (!DB.trHome){ msg('Önce memleketini seç, tur oradan başlasın.'); return; } if (!il.items.length) msg(`${plk(il.plaka)} ${il.name} yakında geliyor.`); else if (ilOpen(il)) openIl(il.id); else ilLocked(il); };
  L0.insertAdjacentHTML('beforeend', '<p class="maphint">Haritayı sağa sola kaydır. Bir il bitince komşuları açılır. Bitirdiğin iller bölge rengine boyanır.</p>');
  const list = document.createElement('div'); list.className = 'illist';
  const rank = i => ilDone(i) ? 1 : ilOpen(i) ? 0 : 2;
  IL_OPEN.slice().sort((a, b) => rank(a) - rank(b) || a.plaka - b.plaka).forEach(i => {
    const got = i.items.filter(it => DB.done[it.id]).length, op = ilOpen(i);
    const b = document.createElement('button'); b.type = 'button'; b.className = 'ilcard box'; b.style.setProperty('--ic', i.color);
    b.innerHTML = `<span class="pl">${plk(i.plaka)}</span><canvas width="16" height="16"></canvas><span><b>${i.name}${i.id === DB.trHome ? ' 🏠' : ''}</b><small>${op ? `${got}/${i.items.length} resim${ilDone(i) ? ' ✓' : ''}` : `🔒 Komşusu bitince açılır · bilet ${TR_TICKET}`}</small></span>`;
    if (!op) b.classList.add('locked');
    const art = getArt(i.items[0].id); drawArt(b.querySelector('canvas'), art, DB.done[i.items[0].id] ? null : new Uint8Array(art.n * art.n));
    b.onclick = () => op ? openIl(i.id) : ilLocked(i); list.append(b);
  });
  L0.append(list);
  const rg = document.createElement('div'); rg.className = 'passport box'; rg.style.marginTop = '16px';
  rg.innerHTML = '<h3>BÖLGELER</h3><div class="regs"></div>';
  TRK.regions.forEach(r => { const all = ILLER.filter(i => i.region === r.id), d = all.filter(ilDone).length; rg.querySelector('.regs').insertAdjacentHTML('beforeend', `<span style="--rc:${r.color}"><i></i>${r.name} <small>${d}/${all.length}</small></span>`); });
  L0.append(rg);
  if (IL_OPEN.some(i => i.items.some(it => SOUV[it.id]))) L0.append(souvBox(IL_OPEN, 'YÖRE SANDIĞI', 'Her il resmini bitirince rehber bir soru sorar. Bilirsen o yöreden bir hatıra buraya girer.'));
  show('trmap');
  const f = ILLER.find(i => i.id === DB.trHome) || IL_OPEN[0]; if (f) setTimeout(() => { wrap.scrollLeft = (f.geo[1] - TRM.lon0) * TRM.k / TRM.s / TRM.cols * 840 - wrap.clientWidth / 2; }, 0);
}
function openIl(id){
  const c = ILLER.find(x => x.id === id); if (!c || !c.items.length) return; if (!ilOpen(c)){ ilLocked(c); return; }
  origin = { screen:'il', il:id }; setCoins(); $('#cityBack').onclick = openTr;
  $('#cityName').textContent = plk(c.plaka) + ' · ' + c.name;
  const B = $('#cityBody'); B.innerHTML = ''; B.style.setProperty('--sc', c.color);
  B.insertAdjacentHTML('beforeend', `<div class="guide box"><canvas class="avatar" id="guideAv" width="16" height="16" aria-hidden="true"></canvas><div><b>${c.guide.name}</b><p>${c.guide.line}</p></div></div>`);
  drawArt($('#guideAv'), guideArt(c.id));
  B.append(cityCards(c));
  B.insertAdjacentHTML('beforeend', ilDone(c) ? `<p class="cityprize">${c.name} tamam. Türkiye haritanda ${TR_REG[c.region].name} rengine boyandı.</p>` : '<p class="cityprize">İlin bütün resimlerini boya: +50 coin ve il Türkiye haritanda renklenir.</p>');
  show('city');
}

