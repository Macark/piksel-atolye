/* ---------- photos ---------- */
let src = null;
function squareFrom(img, w, h){
  const s = Math.min(w, h), c = document.createElement('canvas'); c.width = c.height = 512;
  const g = c.getContext('2d'); g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, 512, 512);
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
  g.drawImage(img, (w - s) / 2, h > w ? (h - s) * 0.3 : (h - s) / 2, s, s, 0, 0, 512, 512);
  return c;
}
/* Fotoğrafı boyanabilir piksel resme çevirir.
   1) Her kare için blok ortalaması yerine "ayrıntı koruyan" seçim: blokta belirgin koyu ayrıntı
      (göz, kaş, ağız, kontur) varsa koyu kısım alınır; yoksa uçlar atılıp orta değerler alınır
      (gürültü ve parlama bulanıklık yapmaz).
   2) Hafif otomatik kontrast (yarı güçte; en koyu ve en açık %0,4 dışarıda).
   3) Kenarları koruyan yumuşatma: her kare, rengi kendine yakın komşularının ortalamasını alır
      (aynı renkteki alanlar düzleşir, sınırlar keskin kalır).
   4) Renkler OKLab'da (göze yakın renk uzayı) k-means++ ile seçilir.
   5) Çok az kullanılan ve birbirine çok yakın renkler birleşir; tek başına kalan kareler komşulara katılır. */
const LIN8 = new Float32Array(256).map((_, i) => { const v = i / 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
function toLab(r, g, b){
  r = LIN8[r | 0]; g = LIN8[g | 0]; b = LIN8[b | 0];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
}
function fromLab(c){
  const L = c[0], a = c[1], b = c[2], l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  const g8 = v => { const t = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(Math.max(0, v), 1 / 2.4) - 0.055; return Math.max(0, Math.min(255, t * 255)); };
  return [g8(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), g8(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), g8(-0.0041960863 * l - 0.7034186168 * m + 1.7076147010 * s)];
}
const labDist = (a, b) => { const x = a[0] - b[0], y = a[1] - b[1], z = a[2] - b[2]; return x * x + 2 * (y * y + z * z); };
const clamp8 = v => v < 0 ? 0 : v > 255 ? 255 : v;
let convCv = null;
function convert(n, kk, from){
  const k = kk || 12, B = n > 40 ? 6 : 8, M = n * B, Q = B * B;
  if (!convCv) convCv = document.createElement('canvas');
  const c = convCv; c.width = c.height = M; const g = c.getContext('2d', { willReadFrequently:true });
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.drawImage(from || src, 0, 0, M, M);
  const d = g.getImageData(0, 0, M, M).data, tot = M * M;
  const hist = new Uint32Array(256); for (let i = 0; i < d.length; i += 4) hist[(0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2]) | 0]++;
  let lo = 0, hi = 255, acc = 0;
  for (let v = 0; v < 256; v++){ acc += hist[v]; if (acc > tot * 0.004){ lo = v; break; } }
  acc = 0; for (let v = 255; v >= 0; v--){ acc += hist[v]; if (acc > tot * 0.004){ hi = v; break; } }
  const S0 = hi - lo > 40 ? 255 / (hi - lo) : 1, sc = (1 + S0) / 2, off = lo * S0 / (1 + S0) * (S0 > 1 ? 1 : 0);   // yarı güçte: (v + tam ayar) / 2
  const N = n * n, px = new Array(N), bl = new Int32Array(Q), lv = new Float32Array(Q), ord = Array.from({ length:Q }, (_, q) => q);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){
    for (let yy = 0, q = 0; yy < B; yy++) for (let xx = 0; xx < B; xx++, q++){ const i = ((y * B + yy) * M + x * B + xx) * 4; bl[q] = i; lv[q] = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2]; ord[q] = q; }
    ord.sort((a, b) => lv[a] - lv[b]);
    const mn = lv[ord[0]], mx = lv[ord[Q - 1]], md = lv[ord[Q >> 1]];
    let a0, a1;
    if (md - mn > 1.5 * (mx - md) && md - mn > 60){ a0 = 0; a1 = Q >> 2; }   // koyu ayrıntı
    else { a0 = Q >> 2; a1 = Q - (Q >> 2); }                                  // orta değerler
    let r = 0, gg = 0, b = 0; for (let t = a0; t < a1; t++){ const i = bl[ord[t]]; r += d[i]; gg += d[i+1]; b += d[i+2]; }
    const w = a1 - a0, v = fxColor((r / w - off) * sc, (gg / w - off) * sc, (b / w - off) * sc);
    px[y * n + x] = toLab(clamp8(v[0]), clamp8(v[1]), clamp8(v[2]));
  }
  const cp = px.map(p => p.slice());
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){
    const c0 = cp[y * n + x]; let s0 = 0, s1 = 0, s2 = 0, w = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++){
      const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= n || Y >= n) continue;
      const q = cp[Y * n + X]; if (labDist(c0, q) < 0.006){ const ww = dx || dy ? 1 : 2; s0 += q[0] * ww; s1 += q[1] * ww; s2 += q[2] * ww; w += ww; }
    }
    px[y * n + x] = [s0 / w, s1 / w, s2 / w];
  }
  // renk seçiminde ortadaki kareler (çoğu fotoğrafta yüz ya da konu) daha ağır sayılır: konuya daha çok ton kalır
  const wt = new Float32Array(N);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){ const dx = (x + 0.5) / n - 0.5, dy = (y + 0.5) / n - 0.45; wt[y * n + x] = 1 + 2.5 * Math.exp(-(dx * dx + dy * dy) / 0.045); }
  const R = rng(42); let cent = [px[Math.floor(R() * N)].slice()];
  const dmin = new Float64Array(N).fill(Infinity);
  while (cent.length < k){
    let sum = 0; for (let i = 0; i < N; i++){ dmin[i] = Math.min(dmin[i], labDist(px[i], cent[cent.length - 1]) * wt[i]); sum += dmin[i]; }
    if (sum === 0) break;
    let t = R() * sum, i = 0; for (; i < N - 1; i++){ t -= dmin[i]; if (t <= 0) break; }
    cent.push(px[i].slice());
  }
  const idx = new Uint8Array(N);
  const assign = () => { for (let i = 0; i < N; i++){ let bi = 0, bd = Infinity; for (let j = 0; j < cent.length; j++){ const dd = labDist(px[i], cent[j]); if (dd < bd){ bd = dd; bi = j; } } idx[i] = bi; } };
  const update = () => { const s = cent.map(() => [0, 0, 0, 0]); for (let i = 0; i < N; i++){ const a = s[idx[i]], w0 = wt[i]; a[0] += px[i][0] * w0; a[1] += px[i][1] * w0; a[2] += px[i][2] * w0; a[3] += w0; } cent = cent.map((c0, j) => s[j][3] ? [s[j][0] / s[j][3], s[j][1] / s[j][3], s[j][2] / s[j][3]] : c0); };
  for (let it = 0; it < 14; it++){ assign(); update(); }
  for (let guard = 0; guard < 40 && cent.length > 3; guard++){
    assign();
    const cnt = cent.map(() => 0); for (let i = 0; i < N; i++) cnt[idx[i]]++;
    let drop = cnt.findIndex(v => v < N * 0.005);
    if (drop < 0){
      let best = Infinity, pair = null;
      for (let a = 0; a < cent.length; a++) for (let b = a + 1; b < cent.length; b++){ const dd = labDist(cent[a], cent[b]); if (dd < best){ best = dd; pair = [a, b]; } }
      if (pair && best < 0.0025){ const [a, b] = pair, w = cnt[a] + cnt[b] || 1; cent[a] = cent[a].map((v, q) => (v * cnt[a] + cent[b][q] * cnt[b]) / w); drop = b; }
    }
    if (drop < 0) break;
    cent.splice(drop, 1); assign(); update();
  }
  assign();
  // tek başına kalan kare (8 komşusunun hiçbiri aynı renk değil): komşuların çoğunluğu aynı renkse ona katılır
  const o = idx.slice();
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){
    const i = y * n + x, cnt = new Map(); let same = 0, all = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++){
      if (!dx && !dy) continue; const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= n || Y >= n) continue;
      const v = o[Y * n + X]; all++; if (v === o[i]) same++; cnt.set(v, (cnt.get(v) || 0) + 1);
    }
    if (!same){ let bv = -1, bc = 0; cnt.forEach((c0, v) => { if (c0 > bc){ bc = c0; bv = v; } }); if (bc >= all * 0.5) idx[i] = bv; }
  }
  return finishArt(n, cent.map(fromLab), idx);
}
// Kullanılmayan renkleri at, paleti koyudan açığa diz.
function finishArt(n, rgb, idx){
  const used = new Uint8Array(rgb.length); for (const v of idx) used[v] = 1;
  const keep = rgb.map((c, j) => j).filter(j => used[j]).sort((a, b) => lum(rgb[a]) - lum(rgb[b]));
  const remap = new Uint8Array(rgb.length); keep.forEach((j, q) => remap[j] = q);
  return { n, pal: keep.map(j => hex(rgb[j])), idx: Array.from(idx, v => remap[v]) };
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

