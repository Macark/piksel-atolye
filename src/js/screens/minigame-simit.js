/* ---------- mini game: simit for seagulls ---------- */
const MW = 120, MH = 200;
const mcv = $('#mcv'), mctx = mcv.getContext('2d'), mstage = $('#mstage');
const moff = document.createElement('canvas'); moff.width = MW; moff.height = MH; const mo = moff.getContext('2d');
let MG = null, mraf = 0, mscale = 1, mox = 0, moy = 0;
function mresize(){ const r = mstage.getBoundingClientRect(); if (!r.width) return; const d = Math.min(3, window.devicePixelRatio || 1); mcv.width = Math.round(r.width * d); mcv.height = Math.round(r.height * d); mscale = Math.min(mcv.width / MW, mcv.height / MH); mox = (mcv.width - MW * mscale) / 2; moy = (mcv.height - MH * mscale) / 2; }
new ResizeObserver(mresize).observe(mstage);
function openMini(cityId){
  show('mini'); mresize(); $('#miniEnd').classList.remove('on'); $('#miniScore').textContent = '0';
  MG = { city:cityId, t:0, dur:25, gulls:[], simits:[], fx:[], fed:0, spawn:0.4, over:false, wave:0, ready:false };
  $('#mstart').hidden = false; $('#miniScore').textContent = '🐦 0';
  cancelAnimationFrame(mraf); let last = 0;
  const step = ts => { mraf = requestAnimationFrame(step); const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0; last = ts; miniUpdate(dt); miniDraw(); };
  mraf = requestAnimationFrame(step);
}
function stopMini(){ cancelAnimationFrame(mraf); mraf = 0; }
mcv.addEventListener('pointerdown', e => {
  if (!MG || MG.over || !MG.ready) return; e.preventDefault(); ac();
  const r = mcv.getBoundingClientRect(), d = mcv.width / r.width;
  const x = ((e.clientX - r.left) * d - mox) / mscale, y = ((e.clientY - r.top) * d - moy) / mscale;
  if (MG.simits.length >= 4) return;
  MG.simits.push({ sx:60, sy:182, tx:x, ty:Math.min(y, 165), t:0, dur:0.42, done:false });
  tone(320, 0.08, 0, 'triangle', 0.04, 520);
});
function miniUpdate(dt){
  const G = MG; if (!G) return;
  G.wave += dt;
  if (!G.ready){ G.gulls.forEach(g => { g.x += g.vx * dt; g.ph += dt * 8; }); G.gulls = G.gulls.filter(g => g.x > -20 && g.x < MW + 20); if (G.gulls.length < 2) G.gulls.push({ x:MW + 10, y:30 + Math.random() * 60, vx:-20, vy:0, fed:false, ph:0 }); return; }
  if (!G.over){
    G.t += dt; G.spawn -= dt;
    if (G.spawn <= 0){ const left = Math.random() < 0.3; G.gulls.push({ x:left ? -10 : MW + 10, y:18 + Math.random() * 95, vx:(left ? 1 : -1) * (16 + Math.random() * 18), vy:0, fed:false, ph:Math.random() * 6 }); G.spawn = 0.7 + Math.random() * 0.8; }
    if (G.t >= G.dur){ G.over = true; const got = Math.min(30, G.fed); DB.coins += got; save(); setCoins(); $('#miniTxt').textContent = TL('{0} martıyı doyurdun.', G.fed); $('#miniCoins').textContent = TL('+{0} COIN', got); [523, 659, 784].forEach((f, k) => tone(f, 0.15, k * 0.08, 'triangle', 0.06)); DB.flags.gull = Math.max(DB.flags.gull || 0, G.fed); save(); setTimeout(() => { $('#miniEnd').classList.add('on'); afterBadge(); }, 400); }
  }
  G.gulls.forEach(g => { g.x += g.vx * dt; g.y += g.vy * dt; g.ph += dt * (g.fed ? 14 : 8); if (g.fed) g.vy -= 30 * dt; });
  G.gulls = G.gulls.filter(g => g.x > -20 && g.x < MW + 20 && g.y > -20);
  G.simits.forEach(sm => {
    sm.t += dt; const k = Math.min(1, sm.t / sm.dur);
    sm.x = sm.sx + (sm.tx - sm.sx) * k; sm.y = sm.sy + (sm.ty - sm.sy) * k - Math.sin(Math.PI * k) * 14;
    for (const g of G.gulls) if (!g.fed && Math.abs(g.x - sm.x) < 9 && Math.abs(g.y - sm.y) < 8){
      g.fed = true; g.vx *= 1.6; g.vy = -10; sm.done = true; G.fed++; $('#miniScore').textContent = '🐦 ' + G.fed;
      G.fx.push({ x:g.x, y:g.y - 6, t:0, text:'+1' }); G.fx.push({ x:g.x, y:g.y, t:0, heart:true }); note(Math.min(19, G.fed), 0.05); if (navigator.vibrate && !DB.noVibe) try { navigator.vibrate(8); } catch(e){}
      break;
    }
    if (!sm.done && k >= 1){ sm.done = true; if (sm.ty > 128) G.fx.push({ x:sm.x, y:sm.y, t:0, splash:true }); }
  });
  G.simits = G.simits.filter(sm => !sm.done);
  G.fx.forEach(f => f.t += dt); G.fx = G.fx.filter(f => f.t < 0.8);
}
function mr(x, y, w, h, c){ mo.fillStyle = c; mo.fillRect(Math.round(x), Math.round(y), w, h); }
function mdisc(cx, cy, r, c){ for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + r) mr(cx + x, cy + y, 1, 1, c); }
function drawSimit(x, y){ mr(x - 2, y - 3, 5, 1, '#9A5216'); mr(x - 3, y - 2, 7, 5, '#C8772A'); mr(x - 2, y + 3, 5, 1, '#9A5216'); mr(x, y, 1, 1, '#6B3A10'); mr(x - 2, y - 2, 1, 1, '#F5E6C4'); mr(x + 2, y + 1, 1, 1, '#F5E6C4'); }
function miniDraw(){
  const G = MG; if (!G) return;
  mo.clearRect(0, 0, MW, MH);
  mr(0, 0, MW, 40, '#F4B183'); mr(0, 40, MW, 40, '#F7C59A'); mr(0, 80, MW, 50, '#FAD6B0');
  mdisc(92, 34, 9, '#FFE08A');
  mr(0, 118, MW, 12, '#6E5A7A'); [[4,110,6],[14,113,5],[26,108,4],[40,112,8],[62,111,5],[78,114,6],[96,109,5],[108,112,8]].forEach(([x,y,w]) => mr(x, y, w, 130 - y, '#6E5A7A'));
  mr(30, 100, 3, 18, '#5A4A6A'); mr(29, 98, 5, 3, '#4A5A6A'); mr(31, 95, 1, 3, '#4A5A6A');
  mr(0, 130, MW, 70, '#2D6FA3');
  for (let k = 0; k < 7; k++){ const x = ((k * 23 + G.wave * 10) % (MW + 20)) - 10; mr(x, 138 + (k % 3) * 9, 10, 1, '#5B9BD0'); }
  G.gulls.forEach(g => {
    const up = Math.sin(g.ph) > 0, dir = g.vx < 0 ? -1 : 1, x = Math.round(g.x), y = Math.round(g.y);
    mr(x - 4, y, 8, 3, '#FFFFFF'); mr(x + dir * 4 - (dir < 0 ? 2 : 0), y - 1, 3, 3, '#FFFFFF'); mr(x + dir * 7 - (dir < 0 ? 1 : 0), y, 2, 1, '#F2B33D'); mr(x + dir * 5, y - 1, 1, 1, '#1B1B1B');
    mr(x - dir * 6 - (dir > 0 ? 1 : 0), y, 2, 2, '#FFFFFF');
    if (up){ mr(x - 2, y - 4, 3, 4, '#9AA7B3'); mr(x - 3, y - 6, 2, 2, '#2B2B2B'); } else { mr(x - 2, y + 3, 3, 3, '#9AA7B3'); mr(x - 3, y + 6, 2, 1, '#2B2B2B'); }
    if (g.fed) drawSimit(x + dir * 9, y + 2);
  });
  G.simits.forEach(sm => drawSimit(sm.x, sm.y));
  G.fx.forEach(f => {
    if (f.splash){ const r = Math.round(2 + f.t * 8); mr(f.x - r, f.y, 1, 1, '#EAF6FF'); mr(f.x + r, f.y, 1, 1, '#EAF6FF'); mr(f.x - r / 2, f.y - 2, 1, 1, '#EAF6FF'); mr(f.x + r / 2, f.y - 2, 1, 1, '#EAF6FF'); }
    else if (f.heart){ const hx = Math.round(f.x), hy = Math.round(f.y - 10 - f.t * 14); mr(hx - 3, hy, 2, 2, '#E8384F'); mr(hx + 1, hy, 2, 2, '#E8384F'); mr(hx - 3, hy + 1, 6, 2, '#E8384F'); mr(hx - 2, hy + 3, 4, 1, '#E8384F'); mr(hx - 1, hy + 4, 2, 1, '#E8384F'); }
    else { mo.font = '700 9px Silkscreen, "Pixelify Sans", monospace'; mo.textAlign = 'center'; mo.lineWidth = 2; mo.strokeStyle = '#2A1D14'; mo.strokeText(f.text, f.x, f.y - f.t * 10); mo.fillStyle = '#FFE135'; mo.fillText(f.text, f.x, f.y - f.t * 10); }
  });
  mr(0, 172, MW, 2, '#2B3442'); for (let x = 2; x < MW; x += 12) mr(x, 166, 1, 6, '#2B3442'); mr(0, 166, MW, 1, '#2B3442');
  mr(0, 174, MW, 26, '#F4F4F4'); mr(0, 196, MW, 4, '#2B3442');
  mr(52, 180, 16, 8, '#8A5A2B'); mr(52, 180, 16, 2, '#6B4429'); drawSimit(56, 179); drawSimit(63, 178);
  const left = Math.max(0, 1 - G.t / G.dur); mr(4, 4, MW - 8, 3, 'rgba(0,0,0,0.25)'); mr(4, 4, Math.round((MW - 8) * left), 3, '#FFFFFF');
  mctx.fillStyle = '#2D6FA3'; mctx.fillRect(0, 0, mcv.width, mcv.height);
  mctx.imageSmoothingEnabled = false; mctx.drawImage(moff, mox, moy, MW * mscale, MH * mscale);
}
$('#miniBack').onclick = () => { stopMini(); openCity(MG ? MG.city : 'istanbul'); };
$('#miniAgain').onclick = () => openMini(MG.city);
$('#mgo').onclick = () => { if (!MG) return; ac(); MG.ready = true; MG.gulls = []; MG.spawn = 0.2; $('#mstart').hidden = true; tone(660, 0.1); };
$('#miniDone').onclick = () => { $('#miniEnd').classList.remove('on'); stopMini(); openCity(MG.city); };


