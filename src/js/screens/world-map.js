/* ---------- pixel world map ---------- */
const MAPROWS = '0e0007e6ff03ffe000070021fffffffff000,3fffffffa7c1ff80003ff1ffbffffffffff8,7fffffffe3e1fc1c007feffffffffffffffe,1fffffff21c0e00001f7fffffffffffffff0,3ffffffc0700600003e7ffffffffffffcf80,0e03fffe07e0000021e7fffffffffff81800,0801ffffc7f00000614fffffffffffe03800,0000ffffeffc0000f3fffffffffffff83000,00007ffffffc00003ffffffffffffffc0000,00003fffffc600001ffffffffffffff00000,00003ffffff000001fff5fffffffffe00000,00003fffff000000fede0fffffffffc40000,00003ffffe000000f96fffffffffff080000,00001ffffc000000f02bffffffffe2080000,00001ffffc0000005f003ffffffff1300000,000007fff80000007f803ffffffff0c00000,000007fff0000000fffffffffffff8000000,000003fc10000001ffffff7ffffff8000000,000001f810000003ffffdf1ffffff0000000,0000007800000007fffffff1ffffe8000000,0000003884000007ffffefe07e7e00000000,0000001f81000003ffffe7e07c3e08000000,00000007c0000007fffff780701e08000000,00000000e0000007fffffe00301f0c000000,0000000023800003ffffff00301600000000,000000001ff00001ffffff00081002000000,0000000007fe0000f3ffff00000820000000,0000000007ff000000fffe00001c60000000,000000000fff000000fffc00000de0000000,000000000fffc00000fff800000ce8500000,000000000ffff80000fff0000004003c0000,000000000ffffc00007ff0000003801e0000,000000000ffffc00007ff000000000010000,0000000007fff800007ff000000000400000,0000000003fff000007ff100000002c40000,0000000001fff000007ff300000007fc0000,0000000000fff000007fc30000000ffe0000,0000000000fff000007fc60000003fff0000,0000000000ffc000003fc60000007fff8000,0000000000ff8000003f800000007fff8000,0000000001ff0000001f800000003fff8000,0000000001fe0000001f000000003fff8000,0000000001fc0000000800000000303f8000,0000000001f80000000000000000000f0000,0000000001e0000000000000000000000020,0000000001c0000000000000000000020040,0000000003c0000000000000000000000180,000000000380000000000000000000000100,000000000380000000000000000000000000,000000000300000000000000000000000000,000000000180000000000000000000000000'.split(',').map(h => [...h].map(ch => parseInt(ch, 16).toString(2).padStart(4, '0')).join(''));
const geoXY = id => { const [lat, lon] = GEO[id]; return [(lon + 170) / 2.5 * 5, (72 - lat) / 2.5 * 5]; };
let worldBase = null, mapCv = null, mapCur = -1, mapRaf = 0;
const WAVES = [], CLOUDS = [];
function worldBaseCanvas(){
  if (worldBase) return worldBase;
  const c = document.createElement('canvas'); c.width = 720; c.height = 255; const g = c.getContext('2d');
  g.fillStyle = '#1E3350'; g.fillRect(0, 0, 720, 255);
  MAPROWS.forEach((row, r) => { for (let q = 0; q < row.length; q++) if (row[q] === '1'){ const top = r === 0 || MAPROWS[r - 1][q] !== '1'; g.fillStyle = top ? '#6BC98A' : '#3E8E5A'; g.fillRect(q * 5, r * 5, 5, 5); if (!top && (q * 7 + r * 13) % 11 === 0){ g.fillStyle = '#357C4E'; g.fillRect(q * 5 + 1, r * 5 + 2, 2, 2); } } });
  const rr2 = rng(77);
  for (let k = 0; k < 110; k++) for (let tries = 0; tries < 30; tries++){ const q = Math.floor(rr2() * 144), r = Math.floor(rr2() * 51); if (MAPROWS[r] && MAPROWS[r][q] !== '1'){ WAVES.push({ x:q * 5, y:r * 5 + 2, ph:rr2() * 6.28, sp:0.8 + rr2() * 1.4 }); break; } }
  for (let k = 0; k < 6; k++) CLOUDS.push({ x:rr2() * 760, y:14 + rr2() * 200, w:3 + Math.floor(rr2() * 4), sp:5 + rr2() * 7 });
  worldBase = c; return c;
}
const PLANE_PX = ['....X....', '....XX...', 'X...XXX..', 'XXXXXXXXX', 'X...XXX..', '....XX...', '....X....'];
function drawPlane(g, x, y, dir){
  PLANE_PX.forEach((row, r) => [...row].forEach((ch, q) => { if (ch !== 'X') return; const px = dir < 0 ? 8 - q : q; g.fillStyle = '#0E0B09'; g.fillRect(x - 13 + px * 3 + 1, y - 10 + r * 3 + 1, 3, 3); }));
  PLANE_PX.forEach((row, r) => [...row].forEach((ch, q) => { if (ch !== 'X') return; const px = dir < 0 ? 8 - q : q; g.fillStyle = r === 3 ? '#FFF7EA' : '#E0763F'; g.fillRect(x - 13 + px * 3, y - 10 + r * 3, 3, 3); }));
}
function drawWorldFrame(t){
  const cvs = mapCv; if (!cvs) return; const g = cvs.getContext('2d');
  g.setTransform(2, 0, 0, 2, 0, 0); g.imageSmoothingEnabled = false;
  g.drawImage(worldBaseCanvas(), 0, 0);
  WAVES.forEach(w => { const a = Math.sin(t * w.sp + w.ph); if (a > 0.35){ g.fillStyle = `rgba(160,210,255,${((a - 0.35) * 0.9).toFixed(2)})`; g.fillRect(w.x, w.y, a > 0.85 ? 6 : 3, 2); } });
  const pts = CITIES.map(c => geoXY(c.id));
  const dash = (x0, y0, x1, y1, col, off) => { const d = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.floor(d / 8)); g.fillStyle = col; for (let k = 0; k < n; k++){ const tt = (k + off) / n; if (tt <= 0.02 || tt >= 0.98) continue; g.fillRect(Math.round(x0 + (x1 - x0) * tt) - 1, Math.round(y0 + (y1 - y0) * tt) - 1, 3, 3); } };
  const leg = (k, fn) => { let [x0, y0] = pts[k], [x1, y1] = pts[k + 1]; if (Math.abs(x1 - x0) > 360) x1 += x1 < x0 ? 720 : -720; fn(x0, y0, x1, y1); };
  for (let k = 0; k < CITIES.length - 1; k++){
    const open = !!DB.tickets[CITIES[k + 1].id], col = open ? '#F0B93A' : '#8FA3C6', off = open ? (t * 1.6) % 1 : 0;
    leg(k, (x0, y0, x1, y1) => { dash(x0, y0, x1, y1, col, off); if (x1 > 720 || x1 < 0){ const sh = x1 > 720 ? -720 : 720; dash(x0 + sh, y0, x1 + sh, y1, col, off); } });
  }
  CLOUDS.forEach(cl => { const x = ((cl.x + t * cl.sp) % 800) - 40, w = cl.w * 6; g.fillStyle = 'rgba(255,255,255,0.7)'; g.fillRect(Math.round(x), Math.round(cl.y), w, 5); g.fillRect(Math.round(x) + 6, Math.round(cl.y) - 4, w - 12, 4); g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(Math.round(x) + 3, Math.round(cl.y) + 5, w - 6, 2); });
  g.textBaseline = 'middle'; g.lineJoin = 'round'; g.font = '700 11px Silkscreen, "Pixelify Sans", monospace';
  CITIES.forEach((c, k) => {
    const [x, y] = pts[k], has = !!DB.tickets[c.id], done = cityDone(c), cur = k === mapCur, sz = cur ? 16 : 12;
    if (cur){ const kk = (t % 1.4) / 1.4; g.strokeStyle = `rgba(240,185,58,${(1 - kk).toFixed(2)})`; g.lineWidth = 2; const rr3 = 10 + kk * 12; g.strokeRect(Math.round(x - rr3), Math.round(y - rr3), Math.round(rr3 * 2), Math.round(rr3 * 2)); }
    g.fillStyle = '#0E0B09'; g.fillRect(Math.round(x - sz / 2) - 2, Math.round(y - sz / 2) - 2, sz + 4, sz + 4);
    g.fillStyle = done ? c.color : has ? '#E0763F' : '#6B7890'; g.fillRect(Math.round(x - sz / 2), Math.round(y - sz / 2), sz, sz);
    if (done){ g.fillStyle = '#FFFFFF'; g.fillRect(x - 4, y, 2, 2); g.fillRect(x - 2, y + 2, 2, 2); g.fillRect(x, y, 2, 2); g.fillRect(x + 2, y - 2, 2, 2); }
    else if (cur){ g.fillStyle = '#FFF7EA'; g.fillRect(x - 3, y - 3, 6, 6); }
    else if (!has){ g.fillStyle = '#C9D2E3'; g.fillRect(x - 2, y - 1, 4, 3); g.fillRect(x - 1, y - 3, 2, 2); }
    const [, , dx, dy, al] = GEO[c.id]; g.textAlign = al; g.lineWidth = 3; g.strokeStyle = '#0E0B09'; g.strokeText(c.name, x + dx, y + dy); g.fillStyle = has ? '#FFF7EA' : '#B9C6DE'; g.fillText(c.name, x + dx, y + dy);
  });
  const allDone = CITIES.every(cityDone);
  let pk = mapCur > 0 ? mapCur - 1 : allDone ? Math.floor(t / 3) % (CITIES.length - 1) : -1;
  if (pk >= 0){
    const p = allDone ? (t % 3) / 3 : Math.min(1, (t % 4) / 3), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    leg(pk, (x0, y0, x1, y1) => {
      for (let k = 1; k <= 4; k++){ const pe = Math.max(0, e - k * 0.04); let tx = x0 + (x1 - x0) * pe; tx = ((tx % 720) + 720) % 720; g.fillStyle = `rgba(255,255,255,${0.5 - k * 0.1})`; g.fillRect(Math.round(tx) - 1, Math.round(y0 + (y1 - y0) * pe - Math.sin(Math.PI * pe) * 14) - 1, 2, 2); }
      let px = x0 + (x1 - x0) * e; px = ((px % 720) + 720) % 720;
      drawPlane(g, Math.round(px), Math.round(y0 + (y1 - y0) * e - Math.sin(Math.PI * e) * 14), x1 >= x0 ? 1 : -1);
    });
  } else if (mapCur === 0){
    const [ix, iy] = pts[0]; drawPlane(g, Math.round(ix + Math.cos(t * 1.4) * 18), Math.round(iy - 16 + Math.sin(t * 1.4) * 6), Math.sin(t * 1.4) > 0 ? -1 : 1);
  }
}
function startMap(){
  cancelAnimationFrame(mapRaf);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches){ drawWorldFrame(0); return; }
  const loop = ts => { if (!mapCv || !mapCv.isConnected || !$('#map').classList.contains('on')){ mapRaf = 0; return; } drawWorldFrame(ts / 1000); mapRaf = requestAnimationFrame(loop); };
  drawWorldFrame(performance.now() / 1000); mapRaf = requestAnimationFrame(loop);
}

