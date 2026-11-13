/* ---------- face masks (placed by hand in this preview) ---------- */
const MASKS = {
  yok:{ name:'Yok' },
  kopek:{ name:'Köpek', draw(g, x, y, u){
    ell(g, x - u*0.52, y - u*0.38, u*0.2, u*0.36, '#8A5A3A', 0.35); ell(g, x + u*0.52, y - u*0.38, u*0.2, u*0.36, '#8A5A3A', -0.35);
    ell(g, x - u*0.52, y - u*0.34, u*0.1, u*0.24, '#5E3A22', 0.35); ell(g, x + u*0.52, y - u*0.34, u*0.1, u*0.24, '#5E3A22', -0.35);
    ell(g, x, y + u*0.12, u*0.14, u*0.1, '#1B1B1B'); circ(g, x - u*0.05, y + u*0.09, u*0.03, '#FFFFFF');
    rr(g, x - u*0.1, y + u*0.3, u*0.2, u*0.28, u*0.09, '#F48FB1'); rect(g, x - u*0.015, y + u*0.3, u*0.03, u*0.17, '#D7637F');
  }},
  kedi:{ name:'Kedi', draw(g, x, y, u){
    poly(g, [x - u*0.56, y - u*0.3, x - u*0.44, y - u*0.8, x - u*0.12, y - u*0.46], '#E2873B'); poly(g, [x + u*0.56, y - u*0.3, x + u*0.44, y - u*0.8, x + u*0.12, y - u*0.46], '#E2873B');
    poly(g, [x - u*0.47, y - u*0.4, x - u*0.41, y - u*0.66, x - u*0.25, y - u*0.47], '#F8B7C8'); poly(g, [x + u*0.47, y - u*0.4, x + u*0.41, y - u*0.66, x + u*0.25, y - u*0.47], '#F8B7C8');
    poly(g, [x - u*0.08, y + u*0.07, x + u*0.08, y + u*0.07, x, y + u*0.17], '#E86A7A');
    [[-0.58, 0.13, 0.32], [-0.55, 0.24, 0.29]].forEach(([dx, dy, w]) => { rect(g, x + u*dx, y + u*dy, u*w, u*0.035, '#FFFFFF'); rect(g, x - u*(dx + w), y + u*dy, u*w, u*0.035, '#FFFFFF'); });
  }},
  tavsan:{ name:'Tavşan', draw(g, x, y, u){
    ell(g, x - u*0.22, y - u*0.86, u*0.14, u*0.44, '#FFFFFF', -0.12); ell(g, x + u*0.22, y - u*0.86, u*0.14, u*0.44, '#FFFFFF', 0.12);
    ell(g, x - u*0.22, y - u*0.84, u*0.07, u*0.32, '#F8B7C8', -0.12); ell(g, x + u*0.22, y - u*0.84, u*0.07, u*0.32, '#F8B7C8', 0.12);
    ell(g, x, y + u*0.1, u*0.08, u*0.06, '#F48FB1');
    rect(g, x - u*0.08, y + u*0.3, u*0.16, u*0.14, '#FFFFFF'); rect(g, x - u*0.01, y + u*0.3, u*0.02, u*0.14, '#C8C8D0');
  }},
  kurbaga:{ name:'Kurbağa', draw(g, x, y, u){
    ell(g, x, y - u*0.52, u*0.64, u*0.3, '#5DBB4A');
    circ(g, x - u*0.32, y - u*0.78, u*0.18, '#5DBB4A'); circ(g, x + u*0.32, y - u*0.78, u*0.18, '#5DBB4A');
    circ(g, x - u*0.32, y - u*0.8, u*0.12, '#FFFFFF'); circ(g, x + u*0.32, y - u*0.8, u*0.12, '#FFFFFF');
    circ(g, x - u*0.32, y - u*0.78, u*0.06, '#1B1B1B'); circ(g, x + u*0.32, y - u*0.78, u*0.06, '#1B1B1B');
    rect(g, x - u*0.28, y - u*0.44, u*0.56, u*0.04, '#2F7A2A');
    circ(g, x - u*0.4, y + u*0.2, u*0.09, '#F48FB1'); circ(g, x + u*0.4, y + u*0.2, u*0.09, '#F48FB1');
  }},
  tac:{ name:'Taç', draw(g, x, y, u){
    rect(g, x - u*0.42, y - u*0.62, u*0.84, u*0.2, '#F2B33D');
    [[-0.42, -0.21], [-0.14, 0.14], [0.21, 0.42]].forEach(([a, b]) => poly(g, [x + u*a, y - u*0.62, x + u*(a + b) / 2, y - u*0.98, x + u*b, y - u*0.62], '#F2B33D'));
    rect(g, x - u*0.42, y - u*0.46, u*0.84, u*0.04, '#C98A1A');
    circ(g, x, y - u*0.54, u*0.06, '#D7263D'); circ(g, x - u*0.27, y - u*0.54, u*0.05, '#2E7DBA'); circ(g, x + u*0.27, y - u*0.54, u*0.05, '#2E7DBA');
  }},
  gozluk:{ name:'Gözlük', draw(g, x, y, u){
    rect(g, x - u*0.56, y - u*0.12, u*1.12, u*0.07, '#111111');
    rr(g, x - u*0.5, y - u*0.1, u*0.44, u*0.28, u*0.05, '#111111'); rr(g, x + u*0.06, y - u*0.1, u*0.44, u*0.28, u*0.05, '#111111');
    rect(g, x - u*0.44, y - u*0.05, u*0.12, u*0.05, '#FFFFFF'); rect(g, x + u*0.12, y - u*0.05, u*0.12, u*0.05, '#FFFFFF');
  }},
};
const mask = { id:'yok', x:0.5, y:0.45, s:0.5 };
function srcMasked(){
  if (mask.id === 'yok' || !MASKS[mask.id]) return src;
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d');
  g.drawImage(src, 0, 0, 512, 512); MASKS[mask.id].draw(g, mask.x * 512, mask.y * 512, mask.s * 512); return c;
}
function buildMaskChips(){
  const box = $('#maskChips'); box.innerHTML = '';
  Object.entries(MASKS).forEach(([id, m]) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = m.name;
    b.setAttribute('aria-pressed', String(mask.id === id));
    b.onclick = () => { mask.id = id; buildMaskChips(); renderSetup(); };
    box.append(b);
  });
  $('#maskCtl').hidden = mask.id === 'yok';
}
(() => {
  const pv = $('#preview'); let drag = false, raf = 0;
  const move = e => {
    if (!drag || mask.id === 'yok') return;
    const r = pv.getBoundingClientRect();
    mask.x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)); mask.y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; renderSetup(); });
  };
  pv.addEventListener('pointerdown', e => { if (mask.id === 'yok') return; drag = true; pv.setPointerCapture(e.pointerId); move(e); });
  pv.addEventListener('pointermove', move);
  ['pointerup', 'pointercancel'].forEach(n => pv.addEventListener(n, () => { drag = false; }));
  $('#maskSize').addEventListener('input', e => { mask.s = e.target.value / 100; renderSetup(); });
})();


