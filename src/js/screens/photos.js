/* ---------- photos ---------- */
let src = null;
function squareFrom(img, w, h){
  const s = Math.min(w, h), c = document.createElement('canvas'); c.width = c.height = 512;
  const g = c.getContext('2d'); g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, 512, 512);
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
  g.drawImage(img, (w - s) / 2, h > w ? (h - s) * 0.3 : (h - s) / 2, s, s, 0, 0, 512, 512);
  return c;
}
function convert(n){
  const k = n <= 24 ? 10 : n <= 32 ? 12 : 16, B = 8, M = n * B;
  const c = document.createElement('canvas'); c.width = c.height = M; const g = c.getContext('2d');
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.drawImage(srcMasked(), 0, 0, M, M);
  const d = g.getImageData(0, 0, M, M).data, px = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){
    let r = 0, gg = 0, b = 0;
    for (let yy = 0; yy < B; yy++) for (let xx = 0; xx < B; xx++){ const i = ((y * B + yy) * M + x * B + xx) * 4; r += d[i]; gg += d[i+1]; b += d[i+2]; }
    r /= B*B; gg /= B*B; b /= B*B;
    [r, gg, b] = fxColor(r, gg, b);
    px.push([Math.max(0, Math.min(255, r)), Math.max(0, Math.min(255, gg)), Math.max(0, Math.min(255, b))]);
  }
  const R = rng(42), N = px.length;
  let cent = [px[Math.floor(R() * N)].slice()];
  const dmin = new Float64Array(N).fill(Infinity);
  while (cent.length < k){
    let sum = 0; for (let i = 0; i < N; i++){ dmin[i] = Math.min(dmin[i], rdist(px[i], cent[cent.length - 1])); sum += dmin[i]; }
    if (sum === 0) break;
    let t = R() * sum, i = 0; for (; i < N - 1; i++){ t -= dmin[i]; if (t <= 0) break; }
    cent.push(px[i].slice());
  }
  const idx = new Uint8Array(N);
  const assign = () => { for (let i = 0; i < N; i++){ let bi = 0, bd = Infinity; for (let j = 0; j < cent.length; j++){ const dd = rdist(px[i], cent[j]); if (dd < bd){ bd = dd; bi = j; } } idx[i] = bi; } };
  for (let it = 0; it < 14; it++){
    assign();
    const acc = cent.map(() => [0, 0, 0, 0]);
    for (let i = 0; i < N; i++){ const a = acc[idx[i]]; a[0] += px[i][0]; a[1] += px[i][1]; a[2] += px[i][2]; a[3]++; }
    cent = cent.map((c0, j) => acc[j][3] ? [acc[j][0] / acc[j][3], acc[j][1] / acc[j][3], acc[j][2] / acc[j][3]] : c0);
  }
  for (let guard = 0; guard < 40; guard++){
    assign();
    const cnt = cent.map(() => 0); for (let i = 0; i < N; i++) cnt[idx[i]]++;
    let drop = -1;
    for (let j = 0; j < cent.length && drop < 0; j++) if (cnt[j] < N * 0.006) drop = j;
    if (drop < 0){
      let best = Infinity, pair = null;
      for (let a = 0; a < cent.length; a++) for (let b = a + 1; b < cent.length; b++){ const dd = rdist(cent[a], cent[b]); if (dd < best){ best = dd; pair = [a, b]; } }
      if (pair && best < 1100){ const [a, b] = pair, w = cnt[a] + cnt[b] || 1; cent[a] = cent[a].map((v, q) => (v * cnt[a] + cent[b][q] * cnt[b]) / w); drop = b; }
    }
    if (drop < 0 || cent.length <= 3) break;
    cent.splice(drop, 1);
  }
  assign();
  const ord = cent.map((c0, j) => j).sort((a, b) => lum(cent[a]) - lum(cent[b]));
  const remap = new Uint8Array(cent.length); ord.forEach((j, q) => remap[j] = q);
  return { n, pal: ord.map(j => hex(cent[j])), idx: Array.from(idx, v => remap[v]) };
}
function drawArt(canvas, art, painted){
  canvas.width = art.n; canvas.height = art.n;
  const g = canvas.getContext('2d'), im = g.createImageData(art.n, art.n), d = im.data, pal = art.pal.map(unhex);
  // boyanmamış kareler için soluk renkler bir kez hesaplanır (her pikselde yeni dizi yok)
  const pale = painted ? pal.map(c => { const k = (255 - lum(c)) * 0.2; return [242 - k, 238 - k, 230 - k]; }) : null;
  for (let i = 0, o = 0; i < art.n * art.n; i++, o += 4){
    const j = art.idx[i], c = painted && !painted[i] ? pale[j] : pal[j];
    d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255;
  }
  g.putImageData(im, 0, 0);
}
// Küçük resimler ekrana yaklaşınca çizilir: 500+ resimde de albüm ekranı hemen açılsın.
// Canvas boyutu baştan verilir (sayfa kaymasın); `draw` görünür olunca bir kez çağrılır.
const lazyIO = typeof IntersectionObserver === 'function' ? new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; const c = e.target; lazyIO.unobserve(c); const f = c._lazy; c._lazy = null; delete c.dataset.lazy; if (f) f();
}), { rootMargin:'400px 0px' }) : null;
function drawArtLazy(canvas, n, draw){
  canvas.width = canvas.height = n;
  if (!lazyIO) return draw();
  canvas._lazy = draw; canvas.dataset.lazy = '1'; lazyIO.observe(canvas);
}
const maskOf = s => { const m = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) m[i] = s.charCodeAt(i) === 49 ? 1 : 0; return m; };

