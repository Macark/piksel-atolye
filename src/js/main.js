/* loop */
let lastTs = 0;
function loop(ts){
  requestAnimationFrame(loop);
  const dt = lastTs ? Math.min(1 / 20, (ts - lastTs) / 1000) : 0; lastTs = ts; now += dt;
  if (!A || !$('#paint').classList.contains('on')) return;
  if (mode === 'replay'){ replayT += dt; dirty = true; if (replayT > 5) endReplay(); }
  if (mode === 'paint'){
    if (order.length && left > 0){ if (now - lastHit < 8) DB.stats.time += dt; if (isDaily){ elapsed += dt; $('#ptime').textContent = fmtT(elapsed); } }
    while (pending.length && pending[0].t <= now){ const p = pending.shift(); if (!painted[p.i]){ fillCell(p.i, false); if (p.d !== lastFloodD){ lastFloodD = p.d; note(Math.min(19, p.d), 0.035); } } }
  }
  for (let k = parts.length - 1; k >= 0; k--){ const p = parts[k]; p.life -= dt; if (p.life <= 0){ parts.splice(k, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 9 * dt; }
  for (let k = floats.length - 1; k >= 0; k--) if (now - floats[k].t0 > 1) floats.splice(k, 1);
  if (now - lastHit < 0.35 || now - hintT < 1.3 || parts.length || floats.length || pending.length || holdCell >= 0 || now - flashBadT < 0.35 || now - colorDoneT < 0.9 || (DB.neon && mode === 'paint') || now - magT < 4.1 || now - boomT < 0.5) dirty = true;
  if (dirty){ dirty = false; render(); }
  if (mode === 'paint') persist(false);
  { const zm = document.querySelector('#paint .zoom'); if (zm){ zm.classList.toggle('dim', ptrs.size > 0 || now - lastHit < 1.2); const zf = $('#zFit'); if (zf) zf.hidden = !(A && view.s > fitS * 1.05); } }
}
document.addEventListener('visibilitychange', () => { lastTs = 0; if (document.hidden && A && mode === 'paint') persist(true); });
if (document.fonts && document.fonts.load) { document.fonts.load('700 16px "Pixelify Sans"').then(() => { dirty = true; }).catch(() => {}); document.fonts.load('700 16px Silkscreen', '0123456789').then(() => { dirty = true; }).catch(() => {}); }

(() => { let k = 0; $('#title').innerHTML = $('#title').innerHTML.split('<br>').map(line => [...line].map(ch => `<span style="color:${TCOL[k++ % TCOL.length]}">${ch}</span>`).join('')).join('<br>'); })();
drawArt($('#demo'), HOME_ART);
setMute(); refreshHome();
setTimeout(afterBadge, 900);
requestAnimationFrame(loop);
