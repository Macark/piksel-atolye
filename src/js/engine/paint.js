/* ---------- paint ---------- */
const cv = $('#cv'), ctx = cv.getContext('2d'), stage = $('#stage');
let A = null, painted, popT, order, remain, left, sel = 0, dpr = 1, view = {s:10, ox:0, oy:0}, fitS = 10, dirty = true, now = 0, mode = 'paint';
let kovaArmed = false, kovaCost = 10, bombArmed = false, magT = -9, boomT = -9, boomC = -1, wrong = 0, elapsed = 0, usedPower = false, isDaily = false, bombCost = 15;
const fmtT = t => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');
let combo = 0, lastHit = -9, flashBad = -1, flashBadT = -9, colorDoneJ = -1, colorDoneT = -9, hintI = -1, hintT = -9;
const parts = [], floats = [], pending = [];
const ptrs = new Map(); let gesture = null, lastPaint = null, downAt = null, holdStart = 0, holdCell = -1, lastFloodD = -1;

function startPaint(art, saved){
  A = { id:art.id || null, name:art.name || (art.id ? ITEMS[art.id].name : 'FOTOĞRAFIN'), n:art.n, pal:art.pal, rgb:art.pal.map(unhex), idx:art.idx };
  const NN = A.n * A.n;
  painted = new Uint8Array(NN); popT = new Float32Array(NN).fill(-9); order = [];
  if (saved && saved.painted){ painted = maskOf(saved.painted); order = (saved.order || []).slice(); }
  remain = A.pal.map(() => 0); left = 0;
  for (let i = 0; i < NN; i++) if (!painted[i]){ remain[A.idx[i]]++; left++; }
  sel = remain.findIndex(r => r > 0); if (sel < 0) sel = 0;
  if (saved && typeof saved.sel === 'number' && remain[saved.sel] > 0) sel = saved.sel;
  mode = 'paint'; parts.length = 0; floats.length = 0; pending.length = 0; colorDoneT = -9; holdCell = -1;
  gtipAt = (A.id && ITEMS[A.id] && (ITEMS[A.id].album.kind === 'city' || ITEMS[A.id].album.kind === 'il') && FACTS[A.id] && left > 8) ? Math.floor(left * 0.5) : 0; $('#gtip').hidden = true;
  wrong = (saved && saved.wrong) || 0; bombArmed = false; kovaArmed = false; magT = -9;
  elapsed = (saved && saved.elapsed) || 0; usedPower = !!(saved && saved.pw); isDaily = !!(A.id && ITEMS[A.id] && ITEMS[A.id].album.kind === 'daily'); $('#ptime').hidden = !isDaily; $('#ptime').textContent = fmtT(elapsed); $('#tip').textContent = 'Numaralı karelere dokun ya da parmağını sür';
  $('#pname').textContent = A.name.toLocaleUpperCase('tr');
  buildPal(); buildPowers(); show('paint'); resize(); fit(); updateProg(); persist(true);
  $('#tip').classList.toggle('off', order.length > 0);
  if (left === 0) finish();
}
function buildPal(){
  const p = $('#pal'); p.innerHTML = '';
  A.pal.forEach((c, j) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'sw';
    const ink = inkFor(A.rgb[j]), halo = ink === INK_DARK ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.6)';
    b.innerHTML = `<b style="background:${c};color:${ink};--halo:${halo};flex-direction:column;line-height:1">${j + 1}${DB.cb ? `<span class="cbm" style="color:${ink}">${CBSYM[j % CBSYM.length]}</span>` : ''}</b><small></small>`;
    b.onclick = () => { if (sel === j && remain[j] > 0) seek(j); else { sel = j; refreshPal(); dirty = true; } };
    p.append(b);
  });
  refreshPal();
}
function refreshPal(){
  [...$('#pal').children].forEach((b, j) => {
    b.setAttribute('aria-pressed', String(j === sel));
    b.classList.toggle('done', remain[j] === 0);
    b.querySelector('small').textContent = remain[j] === 0 ? '' : remain[j];
    b.setAttribute('aria-label', TL('Renk {0}, {1}', j + 1, remain[j] === 0 ? 'bitti' : remain[j] + ' kare kaldı'));
  });
  const el = $('#pal').children[sel]; if (el) el.scrollIntoView({ inline:'center', block:'nearest', behavior:'smooth' });
}
function updateProg(){
  const NN = A.n * A.n, p = Math.floor((NN - left) / NN * 100);
  $('#pct').textContent = pct(p); $('#pfill').style.width = p + '%';
}
let lastSave = 0;
function persist(force){
  if (!A || mode !== 'paint') return;
  if (!force && now - lastSave < 2) return; lastSave = now;
  let s = ''; for (let i = 0; i < painted.length; i++) s += painted[i] ? '1' : '0';
  if (A.id){ if (order.length) DB.wip[A.id] = { painted:s, order, sel, wrong, elapsed, pw:usedPower }; }
  else DB.current = { n:A.n, pal:A.pal, idx:A.idx, painted:s, order, sel, wrong };
  save();
}

function resize(){
  const r = stage.getBoundingClientRect(); if (!r.width) return;
  dpr = Math.min(3, window.devicePixelRatio || 1);
  const old = fitS;
  cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
  fitS = Math.min(cv.width, cv.height) * 0.9 / (A ? A.n : 32);
  if (A && view.s === old) fit();
  dirty = true;
}
new ResizeObserver(resize).observe(stage);
function fit(){ if (!A) return; view.s = fitS; view.ox = (cv.width - A.n * view.s) / 2; view.oy = (cv.height - A.n * view.s) / 2; dirty = true; }
function zoomAt(px, py, f){
  const ns = Math.max(fitS * 0.8, Math.min(70 * dpr, view.s * f));
  const wx = (px - view.ox) / view.s, wy = (py - view.oy) / view.s;
  view.s = ns; view.ox = px - wx * ns; view.oy = py - wy * ns; dirty = true;
}
$('#zIn').onclick = () => zoomAt(cv.width / 2, cv.height / 2, 1.5);
$('#zOut').onclick = () => zoomAt(cv.width / 2, cv.height / 2, 1 / 1.5);
$('#zFit').onclick = fit;
function seek(j){
  const cx = (cv.width / 2 - view.ox) / view.s, cy = (cv.height / 2 - view.oy) / view.s;
  let best = -1, bd = Infinity;
  for (let i = 0; i < A.idx.length; i++){ if (painted[i] || A.idx[i] !== j) continue; const x = i % A.n + .5, y = Math.floor(i / A.n) + .5, d = (x - cx) ** 2 + (y - cy) ** 2; if (d < bd){ bd = d; best = i; } }
  if (best < 0) return;
  const s = Math.max(view.s, 26 * dpr), x = best % A.n + .5, y = Math.floor(best / A.n) + .5;
  view.s = s; view.ox = cv.width / 2 - x * s; view.oy = cv.height / 2 - y * s; hintI = best; hintT = now; dirty = true;
}

/* input */
function local(e){ const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr]; }
cv.addEventListener('pointerdown', e => {
  if (mode !== 'paint') return;
  e.preventDefault(); cv.setPointerCapture(e.pointerId);
  ptrs.set(e.pointerId, local(e)); ac();
  if (ptrs.size === 1){ gesture = null; lastPaint = local(e); downAt = lastPaint; holdStart = now; holdCell = cellAt(...lastPaint); if (bombArmed){ const ci = holdCell; holdCell = -1; lastPaint = null; if (ci >= 0) explode(ci); return; } if (kovaArmed){ const ci = holdCell; holdCell = -1; lastPaint = null; if (ci >= 0) pourKova(ci); return; } paintAt(...lastPaint, true); }
  else { holdCell = -1; startGesture(); }
});
cv.addEventListener('pointermove', e => {
  if (!ptrs.has(e.pointerId)) return;
  ptrs.set(e.pointerId, local(e));
  if (gesture) moveGesture();
  else if (ptrs.size === 1 && lastPaint){
    const p = local(e), d = Math.hypot(p[0] - lastPaint[0], p[1] - lastPaint[1]), st = Math.max(1, Math.ceil(d / (view.s * 0.4)));
    if (downAt && Math.hypot(p[0] - downAt[0], p[1] - downAt[1]) > view.s * 0.6) holdCell = -1;
    for (let k = 1; k <= st; k++) paintAt(lastPaint[0] + (p[0] - lastPaint[0]) * k / st, lastPaint[1] + (p[1] - lastPaint[1]) * k / st);
    lastPaint = p;
  }
});
function endPtr(e){ ptrs.delete(e.pointerId); holdCell = -1; if (ptrs.size === 0){ gesture = null; lastPaint = null; persist(true); } else if (gesture) startGesture(); }
['pointerup','pointercancel'].forEach(n => cv.addEventListener(n, endPtr));
function centroid(){ const ps = [...ptrs.values()]; const c = ps.reduce((a, p) => [a[0] + p[0] / ps.length, a[1] + p[1] / ps.length], [0, 0]); const d = ps.length > 1 ? Math.hypot(ps[0][0] - ps[1][0], ps[0][1] - ps[1][1]) : 1; return [c, d]; }
function startGesture(){ lastPaint = null; const [c, d] = centroid(); gesture = { c, d, s:view.s, ox:view.ox, oy:view.oy }; }
function moveGesture(){
  const [c, d] = centroid(), g = gesture;
  const ns = Math.max(fitS * 0.8, Math.min(70 * dpr, g.s * (ptrs.size > 1 ? d / g.d : 1)));
  const wx = (g.c[0] - g.ox) / g.s, wy = (g.c[1] - g.oy) / g.s;
  view.s = ns; view.ox = c[0] - wx * ns; view.oy = c[1] - wy * ns; dirty = true;
}
cv.addEventListener('wheel', e => { e.preventDefault(); const [x, y] = local(e); zoomAt(x, y, e.deltaY < 0 ? 1.15 : 1 / 1.15); }, { passive:false });

function cellAt(px, py){ const x = Math.floor((px - view.ox) / view.s), y = Math.floor((py - view.oy) / view.s); return (x < 0 || y < 0 || x >= A.n || y >= A.n) ? -1 : y * A.n + x; }
function paintAt(px, py, tap){
  const i = cellAt(px, py); if (i < 0 || painted[i]) return;
  if (A.idx[i] !== sel){ if (tap){ wrong++; DB.stats.wrong++; flashBad = i; flashBadT = now; tone(150, 0.07, 0, 'square', 0.03); dirty = true; } return; }
  combo = now - lastHit < 0.5 ? combo + 1 : 0; DB.stats.taps++;
  fillCell(i, true);
  note(combo);
}
function fillCell(i, live){
  if (painted[i]) return;
  const j = A.idx[i];
  painted[i] = 1; popT[i] = now; order.push(i); remain[j]--; left--; dirty = true; lastHit = now; DB.stats.cells++; if (gtipAt && left <= gtipAt){ gtipAt = 0; showGuideTip(); }
  const x = i % A.n + .5, y = Math.floor(i / A.n) + .5, c = A.pal[j];
  for (let k = 0; k < 4; k++){ const a = Math.random() * TAU, sp = 2 + Math.random() * 3; parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, life: 0.45, max: 0.45, c: k ? c : '#FFFFFF' }); }
  if (parts.length > 500) parts.splice(0, parts.length - 500);
  if (navigator.vibrate && !DB.noVibe) try { navigator.vibrate(4); } catch(err){}
  $('#tip').classList.add('off');
  updateProg();
  if (remain[j] === 0){
    colorDoneJ = j; colorDoneT = now;
    [0, 4, 7, 12].forEach((s2, k) => tone(523 * Math.pow(2, s2 / 12), 0.14, k * 0.07, 'triangle', 0.06));
    floats.push({ x, y: y - 0.8, t0: now, text: 'RENK ' + (j + 1) + ' TAMAM!', big: true });
    if (j === sel){ const nxt = remain.findIndex((r, q) => r > 0 && q > sel), any = remain.findIndex(r => r > 0); sel = nxt >= 0 ? nxt : any >= 0 ? any : sel; }
    refreshPal();
  } else {
    const sm = $('#pal').children[j]; if (sm) sm.querySelector('small').textContent = remain[j];
  }
  if (left === 0) setTimeout(finish, 700);
}
function flood(start){
  const j = A.idx[start], n = A.n, seen = new Uint8Array(n * n), q = [[start, 0]]; seen[start] = 1;
  while (q.length){
    const [i, d] = q.shift();
    if (!painted[i]) pending.push({ i, t: now + d * 0.035, d });
    const x = i % n, y = Math.floor(i / n);
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx, dy]) => { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= n || Y >= n) return; const k = Y * n + X; if (!seen[k] && A.idx[k] === j){ seen[k] = 1; q.push([k, d + 1]); } });
  }
  pending.sort((a, b) => a.t - b.t);
}


