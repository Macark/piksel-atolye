/* ---------- yüz aksesuarları ----------
   Aksesuar fotoğrafa değil, piksel resme eklenir: önce fotoğraf piksele çevrilir, sonra aksesuar
   aynı ızgarada kendi temiz renkleriyle ve bir kare kalınlığında koyu kenar çizgisiyle çizilir.
   Böylece renkleri fotoğrafla karışıp bulanıklaşmaz.
   Yerleşim iki göz noktasıyla yapılır: gözlerin ortası, aralarındaki mesafe (boyut) ve
   eğimi (baş yana yatıksa aksesuar da yatar). Kamerada noktaları yüz takibi (face.js) canlı
   günceller; hazırlama ekranında kullanıcı sürükleyerek düzeltebilir.
   Çizim birimi u = yüz genişliği (≈ göz mesafesi × 2,2); 0,0 noktası iki gözün ortası,
   y aşağı doğru artar: alın üstü ≈ -0.55u, burun ucu ≈ +0.3u, ağız ≈ +0.5u. */
const OUTLINE = '#22160F';
const MASKS = {
  yok:{ name:'Yok' },
  kopek:{ name:'Köpek', draw(g, u){
    [-1, 1].forEach(sd => { ell(g, sd * u*0.5, -u*0.5, u*0.17, u*0.36, '#9A6640', sd * 0.45); ell(g, sd * u*0.5, -u*0.44, u*0.09, u*0.24, '#6B4226', sd * 0.45); });
    ell(g, 0, u*0.3, u*0.15, u*0.1, '#1E1A1A'); ell(g, -u*0.05, u*0.27, u*0.045, u*0.03, '#FFFFFF');
    rr(g, -u*0.09, u*0.5, u*0.18, u*0.24, u*0.08, '#F27A9B'); rect(g, -u*0.015, u*0.5, u*0.03, u*0.13, '#C9506F');
  }},
  kedi:{ name:'Kedi', bare:['#3A2416'], draw(g, u){
    [-1, 1].forEach(sd => {
      poly(g, [sd * u*0.5, -u*0.5, sd * u*0.4, -u*1.0, sd * u*0.1, -u*0.66], '#E58B3A');
      poly(g, [sd * u*0.42, -u*0.56, sd * u*0.37, -u*0.86, sd * u*0.2, -u*0.66], '#F9B4C4');
      rect(g, sd > 0 ? u*0.16 : -u*0.56, u*0.34, u*0.4, u*0.06, '#3A2416'); rect(g, sd > 0 ? u*0.16 : -u*0.54, u*0.46, u*0.38, u*0.06, '#3A2416');
    });
    poly(g, [-u*0.09, u*0.25, u*0.09, u*0.25, 0, u*0.36], '#E8667A');
  }},
  tavsan:{ name:'Tavşan', draw(g, u){
    [-1, 1].forEach(sd => { ell(g, sd * u*0.2, -u*1.02, u*0.14, u*0.46, '#FFFFFF', sd * 0.14); ell(g, sd * u*0.2, -u*0.98, u*0.07, u*0.33, '#F9B4C4', sd * 0.14); });
    ell(g, 0, u*0.3, u*0.08, u*0.06, '#F27A9B');
    rect(g, -u*0.09, u*0.5, u*0.18, u*0.15, '#FFFFFF'); rect(g, -u*0.012, u*0.5, u*0.024, u*0.15, '#C8C8D0');
  }},
  ayi:{ name:'Ayıcık', draw(g, u){
    [-1, 1].forEach(sd => { circ(g, sd * u*0.44, -u*0.68, u*0.17, '#8B5A33'); circ(g, sd * u*0.44, -u*0.68, u*0.09, '#C9946A'); });
    ell(g, 0, u*0.3, u*0.11, u*0.08, '#2A1A12');
  }},
  kurbaga:{ name:'Kurbağa', draw(g, u){
    ell(g, 0, -u*0.62, u*0.6, u*0.26, '#5DBB4A');
    [-1, 1].forEach(sd => { circ(g, sd * u*0.3, -u*0.86, u*0.17, '#5DBB4A'); circ(g, sd * u*0.3, -u*0.88, u*0.11, '#FFFFFF'); circ(g, sd * u*0.3, -u*0.87, u*0.055, '#1E1A1A'); circ(g, sd * u*0.38, u*0.38, u*0.08, '#F59BB4'); });
  }},
  tac:{ name:'Taç', draw(g, u){
    rect(g, -u*0.4, -u*0.82, u*0.8, u*0.2, '#F2B33D');
    [[-0.4, -0.2], [-0.13, 0.13], [0.2, 0.4]].forEach(([a, b]) => poly(g, [u*a, -u*0.8, u*(a + b) / 2, -u*1.14, u*b, -u*0.8], '#F2B33D'));
    rect(g, -u*0.4, -u*0.66, u*0.8, u*0.05, '#C98A1A');
    circ(g, 0, -u*0.73, u*0.055, '#D7263D'); circ(g, -u*0.26, -u*0.73, u*0.045, '#2E7DBA'); circ(g, u*0.26, -u*0.73, u*0.045, '#2E7DBA');
  }},
  cicek:{ name:'Çiçek taç', draw(g, u){
    const cols = ['#F26D8F', '#FFD24A', '#FFFFFF', '#B57BE0', '#F26D8F', '#FFD24A', '#FFFFFF'];
    for (let k = 0; k < 7; k++){
      const t = (k / 6 - 0.5) * 2.1, x = Math.sin(t) * u*0.5, y = -u*0.42 - Math.cos(t) * u*0.3;
      if (k % 2) ell(g, x, y + u*0.06, u*0.09, u*0.05, '#4FA34A', t);
      for (let p = 0; p < 5; p++){ const a = p / 5 * TAU; circ(g, x + Math.cos(a) * u*0.055, y + Math.sin(a) * u*0.055, u*0.05, cols[k]); }
      circ(g, x, y, u*0.035, k % 3 ? '#E8A23A' : '#B5651D');
    }
  }},
  gozluk:{ name:'Güneş gözlüğü', draw(g, u){
    rect(g, -u*0.52, -u*0.1, u*1.04, u*0.08, '#141414');
    rr(g, -u*0.47, -u*0.11, u*0.43, u*0.28, u*0.07, '#141414'); rr(g, u*0.04, -u*0.11, u*0.43, u*0.28, u*0.07, '#141414');
    rect(g, -u*0.4, -u*0.05, u*0.12, u*0.06, '#7C8A99'); rect(g, u*0.11, -u*0.05, u*0.12, u*0.06, '#7C8A99');
  }},
  kalp:{ name:'Kalp gözlük', draw(g, u){
    const h = (cx, r) => { circ(g, cx - r*0.5, -r*0.25, r*0.56, '#E8384F'); circ(g, cx + r*0.5, -r*0.25, r*0.56, '#E8384F'); poly(g, [cx - r*1.04, -r*0.08, cx + r*1.04, -r*0.08, cx, r*0.95], '#E8384F'); circ(g, cx - r*0.55, -r*0.38, r*0.17, '#FFB3C0'); };
    h(-u*0.24, u*0.22); h(u*0.24, u*0.22); rect(g, -u*0.06, -u*0.06, u*0.12, u*0.04, '#B8233A');
  }},
  sapka:{ name:'Parti şapkası', draw(g, u){
    poly(g, [-u*0.3, -u*0.62, u*0.3, -u*0.62, u*0.06, -u*1.36], '#2E7DBA');
    [0.82, 1.02, 1.2].forEach(k => { const w = (1.36 - k) / 0.74 * u*0.3; rect(g, -w + u*0.03, -u*k, w*2, u*0.07, '#F2B33D'); });
    circ(g, u*0.06, -u*1.38, u*0.09, '#E8384F'); rect(g, -u*0.33, -u*0.66, u*0.66, u*0.07, '#E8384F');
  }},
  biyik:{ name:'Bıyık', bare:['#3A2416'], draw(g, u){
    ell(g, -u*0.13, u*0.43, u*0.16, u*0.065, '#3A2416', -0.22); ell(g, u*0.13, u*0.43, u*0.16, u*0.065, '#3A2416', 0.22);
    circ(g, -u*0.27, u*0.38, u*0.05, '#3A2416'); circ(g, u*0.27, u*0.38, u*0.05, '#3A2416');
  }},
  yildiz:{ name:'Yıldızlar', draw(g, u){
    [[-0.58, -0.5, 0.11, '#F2C14E'], [-0.34, -0.86, 0.08, '#FFFFFF'], [0, -0.98, 0.12, '#F2C14E'], [0.34, -0.86, 0.08, '#FFFFFF'], [0.58, -0.5, 0.11, '#F2C14E']].forEach(([dx, dy, r, c]) => star(g, u*dx, u*dy, u*r, c));
  }},
};
// Göz noktaları fotoğrafta 0..1 konumunda; s: kullanıcının boyut ayarı (1 = yüz genişliği kadar).
const EYES_HOME = [[0.4, 0.44], [0.6, 0.44]];
const mask = { id:'yok', eyes:EYES_HOME.map(e => e.slice()), s:1, auto:false };
function maskHome(){ mask.eyes = EYES_HOME.map(e => e.slice()); mask.s = 1; mask.auto = false; }
// Aksesuarı `size` piksellik bir tuvale gözlere göre yerleştirip çizer.
function drawMaskAt(g, size){
  const m = MASKS[mask.id]; if (!m || !m.draw) return;
  const [l, r] = mask.eyes, dx = (r[0] - l[0]) * size, dy = (r[1] - l[1]) * size;
  const u = Math.hypot(dx, dy) * 2.2 * mask.s;
  g.save(); g.translate((l[0] + r[0]) / 2 * size, (l[1] + r[1]) / 2 * size); g.rotate(Math.atan2(dy, dx)); m.draw(g, u); g.restore();
}
// Piksel resme aksesuar ekler (yeni resim döner, girdiye dokunmaz).
let maskCv = null;
function applyMask(art){
  if (mask.id === 'yok' || !MASKS[mask.id]) return art;
  const n = art.n, S = 8, W = n * S;
  if (!maskCv) maskCv = document.createElement('canvas');
  maskCv.width = maskCv.height = W; const g = maskCv.getContext('2d', { willReadFrequently:true });
  g.clearRect(0, 0, W, W); drawMaskAt(g, W);
  const d = g.getImageData(0, 0, W, W).data, cell = new Int32Array(n * n).fill(-1);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){
    let cov = 0; const votes = new Map();
    for (let yy = 0; yy < S; yy++) for (let xx = 0; xx < S; xx++){
      const i = ((y * S + yy) * W + x * S + xx) * 4, a = d[i + 3];
      if (a > 127) cov++;
      if (a === 255){ const key = d[i] << 16 | d[i + 1] << 8 | d[i + 2]; votes.set(key, (votes.get(key) || 0) + 1); }
    }
    if (cov >= S * S * 0.42 && votes.size){ let bk = 0, bc = -1; votes.forEach((c, k) => { if (c > bc){ bc = c; bk = k; } }); cell[y * n + x] = bk; }
  }
  // dış kenar: aksesuara değen ama aksesuar olmayan kareler koyu çizgi olur
  // (bıyık gibi zaten koyu ve ince parçalar "bare": onlara çizgi eklenmez)
  const bare = new Set((MASKS[mask.id].bare || []).map(h => parseInt(h.slice(1), 16)));
  const edge = j => cell[j] >= 0 && !bare.has(cell[j]);
  const OUT = -2, out = cell.slice();
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){
    const i = y * n + x; if (cell[i] !== -1) continue;
    if ((x > 0 && edge(i - 1)) || (x < n - 1 && edge(i + 1)) || (y > 0 && edge(i - n)) || (y < n - 1 && edge(i + n))) out[i] = OUT;
  }
  const rgb = art.pal.map(unhex), lab = rgb.map(c => toLab(c[0], c[1], c[2])), idx = art.idx.slice(), slot = new Map();
  const colorIdx = key => {
    if (slot.has(key)) return slot.get(key);
    const c = key === OUT ? unhex(OUTLINE) : [key >> 16 & 255, key >> 8 & 255, key & 255], L = toLab(c[0], c[1], c[2]);
    let j = lab.findIndex(x => labDist(x, L) < 0.0012);
    if (j < 0){ j = rgb.length; rgb.push(c); lab.push(L); }
    slot.set(key, j); return j;
  };
  for (let i = 0; i < out.length; i++) if (out[i] !== -1) idx[i] = colorIdx(out[i]);
  return finishArt(n, rgb, idx);
}
function buildMaskChips(box, onChange){
  box = box || $('#maskChips'); onChange = onChange || renderSetup; const keep = box.scrollLeft; box.innerHTML = '';
  Object.entries(MASKS).forEach(([id, m]) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = trx(m.name);
    b.setAttribute('aria-pressed', String(mask.id === id));
    b.onclick = () => { mask.id = id; buildMaskChips(box, onChange); onChange(); };
    box.append(b);
  });
  box.scrollLeft = keep;   // seçince şerit başa kaymasın
  const on = mask.id !== 'yok';
  $('#maskCtl').hidden = !on; document.querySelectorAll('.eyeh').forEach(h => h.hidden = !on);
}
// Göz noktalarını sürükleme
(() => {
  const wrap = $('#pvWrap'); let drag = -1, raf = 0;
  const pos = e => { const r = $('#preview').getBoundingClientRect(); return [Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), Math.max(0, Math.min(1, (e.clientY - r.top) / r.height))]; };
  wrap.addEventListener('pointerdown', e => {
    if (mask.id === 'yok') return;
    const p = pos(e), d0 = Math.hypot(p[0] - mask.eyes[0][0], p[1] - mask.eyes[0][1]), d1 = Math.hypot(p[0] - mask.eyes[1][0], p[1] - mask.eyes[1][1]);
    drag = d0 <= d1 ? 0 : 1; wrap.setPointerCapture(e.pointerId); move(e); e.preventDefault();
  });
  const move = e => {
    if (drag < 0) return; mask.eyes[drag] = pos(e); mask.auto = false; placeEyes();
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; renderSetup(true); });
  };
  wrap.addEventListener('pointermove', move);
  ['pointerup', 'pointercancel'].forEach(n => wrap.addEventListener(n, () => { drag = -1; }));
  $('#maskSize').addEventListener('input', e => { mask.s = e.target.value / 100; renderSetup(true); });
})();
function placeEyes(){
  document.querySelectorAll('.eyeh').forEach((h, k) => { h.style.left = mask.eyes[k][0] * 100 + '%'; h.style.top = mask.eyes[k][1] * 100 + '%'; });
}
