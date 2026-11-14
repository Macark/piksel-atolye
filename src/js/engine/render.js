/* render */
let replayT = 0;
// Kareler için 3×5 piksel rakam fontu: her boyutta keskin ve okunaklı (1–99)
const DIGITS = ['111101101101111','010110010010111','111001111100111','111001011001111','101101111001001','111100111001111','111100111101111','111001001001001','111101111101111','111101111001111'];
const NUMCACHE = new Map();
function numSprite(num, u, col){
  const key = num + '|' + u + '|' + col; let c = NUMCACHE.get(key); if (c) return c;
  if (NUMCACHE.size > 400) NUMCACHE.clear();
  const str = String(num), w = (str.length * 4 - 1) * u, h = 5 * u;
  c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); g.fillStyle = col;
  [...str].forEach((d, k) => { const bits = DIGITS[+d]; for (let r = 0; r < 5; r++) for (let q = 0; q < 3; q++) if (bits[r * 3 + q] === '1') g.fillRect((k * 4 + q) * u, r * u, u, u); });
  NUMCACHE.set(key, c); return c;
}
function drawNum(g, num, cx, cy, s, col){
  const len = String(num).length, wU = len * 4 - 1;
  const u = Math.max(1, Math.min(Math.floor(s * (DB.bigNum ? 0.66 : 0.5) / 5), Math.floor(s * 0.8 / wU)));
  const sp = numSprite(num, u, col);
  g.drawImage(sp, Math.round(cx + (s - sp.width) / 2), Math.round(cy + (s - sp.height) / 2));
}
// Masa zemini: ortası hafif aydınlık, çok silik piksel noktaları. Ekrana sabittir (tablo kayarken
// zemin yerinde durur, göz yormaz). Boyut ya da tema değişince bir kez çizilir, her karede tek kopya.
let deskCv = null, deskKey = '', deskCol = null;
function desk(){
  const cs = getComputedStyle(stage), bg = cs.backgroundColor, key = cv.width + 'x' + cv.height + bg + dpr;
  if (key === deskKey) return deskCv;
  deskKey = key; deskCv = deskCv || document.createElement('canvas'); deskCv.width = cv.width; deskCv.height = cv.height;
  const g = deskCv.getContext('2d'), W = cv.width, H = cv.height, rs = getComputedStyle(document.documentElement);
  const dark = lum((bg.match(/[0-9.]+/g) || [0, 0, 0]).map(Number)) < 100;
  deskCol = { panel:rs.getPropertyValue('--panel').trim() || '#FFF7EA', line:rs.getPropertyValue('--line').trim() || '#2A1D14', shadow:dark ? 'rgba(0,0,0,0.45)' : 'rgba(42,29,20,0.22)' };
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  const rg = g.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, Math.max(W, H) * 0.7);
  rg.addColorStop(0, dark ? 'rgba(255,236,214,0.07)' : 'rgba(255,255,255,0.35)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = rg; g.fillRect(0, 0, W, H);
  const step = Math.round(14 * dpr), d = Math.max(1, Math.round(2 * dpr));
  g.fillStyle = dark ? 'rgba(255,236,214,0.05)' : 'rgba(42,29,20,0.07)';
  for (let y = step / 2; y < H; y += step) for (let x = step / 2; x < W; x += step) g.fillRect(Math.round(x), Math.round(y), d, d);
  return deskCv;
}
function render(){
  const g = ctx, n = A.n, s = view.s;
  g.drawImage(desk(), 0, 0);
  // tablo çerçevesi: kâğıt rengi kenar, koyu çizgi ve piksel gölge
  const pad = Math.round(Math.max(4 * dpr, Math.min(12 * dpr, s * 0.4))), lw = Math.max(2, Math.round(2 * dpr)), W = n * s;
  g.fillStyle = deskCol.shadow; g.fillRect(view.ox - pad + 5 * dpr, view.oy - pad + 5 * dpr, W + pad * 2, W + pad * 2);
  g.fillStyle = deskCol.line; g.fillRect(view.ox - pad - lw, view.oy - pad - lw, W + (pad + lw) * 2, W + (pad + lw) * 2);
  g.fillStyle = deskCol.panel; g.fillRect(view.ox - pad, view.oy - pad, W + pad * 2, W + pad * 2);
  const x0 = Math.max(0, Math.floor(-view.ox / s)), y0 = Math.max(0, Math.floor(-view.oy / s));
  const x1 = Math.min(n, Math.ceil((cv.width - view.ox) / s)), y1 = Math.min(n, Math.ceil((cv.height - view.oy) / s));
  const replay = mode === 'replay', rp = replay ? Math.floor(order.length * Math.min(1, replayT / 4.2)) : 0;
  const shown = replay ? new Uint8Array(n * n) : null;
  if (replay) for (let k = 0; k < rp; k++) shown[order[k]] = 1;
  // Sayılar kare en az 10 (büyük numarada 8) ekran pikseli olunca çizilir; rakam her zaman karenin içine sığacak
  // boyutta seçildiği için üst üste binmez. Daha küçükte seçili rengin karelerine o rengin noktası konur (selDot).
  const numbers = !replay && s >= (DB.bigNum ? 8 : 10) * dpr, selDot = !replay && !numbers, grid = !replay && s >= 9 * dpr, cbm = !replay && DB.cb && s >= 12 * dpr;
  const neon = !replay && DB.neon, bevel = !replay && s >= 12 * dpr, shimmer = !replay && now - colorDoneT < 0.8, pops = [];
  g.font = `700 ${Math.floor(s * (DB.bigNum ? 0.62 : 0.46))}px "Pixelify Sans", ui-monospace, monospace`; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++){
    const i = y * n + x, cx = view.ox + x * s, cy = view.oy + y * s, c = A.rgb[A.idx[i]];
    const on = replay ? shown[i] : painted[i];
    if (on){
      const t = now - popT[i];
      if (!replay && t >= 0 && t < 0.28){ pops.push(i); g.fillStyle = 'rgba(255,255,255,0.9)'; g.fillRect(cx, cy, s + 0.5, s + 0.5); continue; }
      g.fillStyle = A.pal[A.idx[i]]; g.fillRect(cx, cy, s + 0.5, s + 0.5);
      if (bevel){ const b = Math.max(1, s * 0.09); g.fillStyle = 'rgba(255,255,255,0.16)'; g.fillRect(cx, cy, s, b); g.fillRect(cx, cy, b, s); g.fillStyle = 'rgba(0,0,0,0.14)'; g.fillRect(cx, cy + s - b, s, b); g.fillRect(cx + s - b, cy, b, s); }
      if (cbm){ g.save(); g.font = `${Math.floor(s * 0.42)}px sans-serif`; g.fillStyle = lum(A.rgb[A.idx[i]]) > 140 ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.7)'; g.fillText(CBSYM[A.idx[i] % CBSYM.length], cx + s / 2, cy + s / 2); g.restore(); }
      if (neon){ const a = 0.1 + 0.14 * Math.sin(now * 3 + x * 0.7 + y * 0.45); if (a > 0){ g.fillStyle = `rgba(255,255,255,${a})`; g.fillRect(cx + s * 0.22, cy + s * 0.22, s * 0.56, s * 0.56); } }
      if (shimmer && A.idx[i] === colorDoneJ){ const w = (x + y) / (2 * n), p = (now - colorDoneT) / 0.7 * 1.4 - 0.2, a = 1 - Math.abs(w - p) / 0.12; if (a > 0){ g.fillStyle = `rgba(255,255,255,${0.6 * a})`; g.fillRect(cx, cy, s + 0.5, s + 0.5); } }
    } else {
      const l = lum(c), base = 246 - (255 - l) * 0.16;
      const isSel = !replay && A.idx[i] === sel;
      g.fillStyle = isSel ? '#B7B0A4' : `rgb(${base|0},${(base - 3)|0},${(base - 9)|0})`;
      g.fillRect(cx, cy, s + 0.5, s + 0.5);
      if (numbers) drawNum(g, A.idx[i] + 1, cx, cy, s, isSel ? '#1A1410' : '#6E665B');
      else if (selDot && isSel){ const d = Math.max(1, Math.round(s * 0.5)), o = (s - d) / 2; g.fillStyle = A.pal[A.idx[i]]; g.fillRect(cx + o, cy + o, d, d); }
    }
  }
  if (grid){
    g.strokeStyle = 'rgba(60,50,40,0.14)'; g.lineWidth = 1; g.beginPath();
    for (let x = x0; x <= x1; x++){ const X = Math.round(view.ox + x * s) + 0.5; g.moveTo(X, view.oy + y0 * s); g.lineTo(X, view.oy + y1 * s); }
    for (let y = y0; y <= y1; y++){ const Y = Math.round(view.oy + y * s) + 0.5; g.moveTo(view.ox + x0 * s, Y); g.lineTo(view.ox + x1 * s, Y); }
    g.stroke();
  }
  for (const i of pops){
    const x = i % n, y = Math.floor(i / n), t = (now - popT[i]) / 0.28;
    const c1 = 1.70158, c3 = c1 + 1, e = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    const k = 0.25 + 0.75 * e, cx = view.ox + (x + .5) * s, cy = view.oy + (y + .5) * s;
    g.fillStyle = A.pal[A.idx[i]]; g.fillRect(cx - s * k / 2, cy - s * k / 2, s * k, s * k);
  }
  if (flashBad >= 0 && now - flashBadT < 0.3){
    const x = flashBad % n, y = Math.floor(flashBad / n), a = 1 - (now - flashBadT) / 0.3, sh = Math.sin((now - flashBadT) * 60) * s * 0.08 * a;
    g.strokeStyle = `rgba(200,40,30,${a})`; g.lineWidth = 2 * dpr; g.strokeRect(view.ox + x * s + 1 + sh, view.oy + y * s + 1, s - 2, s - 2);
  }
  for (const p of parts){ const a = p.life / p.max, sz = s * 0.28; g.globalAlpha = Math.min(1, a * 1.5); g.fillStyle = p.c; g.fillRect(view.ox + p.x * s - sz / 2, view.oy + p.y * s - sz / 2, sz, sz); }
  g.globalAlpha = 1;
  for (const f of floats){
    const t = (now - f.t0) / 1.0; if (t > 1) continue;
    const X = view.ox + f.x * s, Y = view.oy + f.y * s - t * 40 * dpr, fs = (f.big ? 22 : 18) * dpr;
    g.font = `700 ${fs}px "Pixelify Sans", ui-monospace, monospace`; g.globalAlpha = 1 - t * t;
    g.lineWidth = 4 * dpr; g.strokeStyle = '#1A1410'; g.strokeText(f.text, X, Y); g.fillStyle = f.big ? '#FFE135' : '#FFFFFF'; g.fillText(f.text, X, Y);
    g.globalAlpha = 1;
  }
  if (now - magT < 4){
    const a = 0.55 + 0.45 * Math.sin((now - magT) * 8); g.strokeStyle = `rgba(255,214,40,${a})`; g.lineWidth = Math.max(2, s * 0.14);
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++){ const i = y * n + x; if (!painted[i] && A.idx[i] === sel) g.strokeRect(view.ox + x * s + 1, view.oy + y * s + 1, s - 2, s - 2); }
  }
  if (now - boomT < 0.45){
    const k = (now - boomT) / 0.45, x = boomC % n, y = Math.floor(boomC / n);
    g.strokeStyle = `rgba(242,179,61,${1 - k})`; g.lineWidth = 6 * dpr; g.beginPath(); g.arc(view.ox + (x + .5) * s, view.oy + (y + .5) * s, s * (0.5 + 3.2 * k), 0, TAU); g.stroke();
  }
  if (hintI >= 0 && now - hintT < 1.2){
    const x = hintI % n, y = Math.floor(hintI / n), k = (now - hintT) / 1.2;
    g.strokeStyle = `rgba(196,85,44,${1 - k})`; g.lineWidth = 3 * dpr;
    const pad = s * (0.2 + k); g.strokeRect(view.ox + x * s - pad, view.oy + y * s - pad, s + pad * 2, s + pad * 2);
  }
  g.strokeStyle = '#2A1D14'; g.lineWidth = 2 * dpr; g.strokeRect(view.ox, view.oy, n * s, n * s);
}

