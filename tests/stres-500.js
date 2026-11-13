// Stres testi: albümleri geçici kopyalarla ~500 resme şişirir ve albüm ekranını ölçer.
// Sadece bellekte; kayda dokunmaz. Sonra sayfayı yenile.
(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const med = a => { const s = [...a].sort((x, y) => x - y); return +s[Math.floor(s.length / 2)].toFixed(1); };
  if (!window.__stres){
    const base = ALBUMS.slice();
    for (let k = 1; ALBUMS.reduce((t, a) => t + a.items.length, 0) < 500; k++) base.forEach(a => {
      const na = { ...a, id:a.id + '_s' + k, name:a.name + ' ' + k, items:[] };
      a.items.forEach(it => { const ni = { ...it, id:it.id + '_s' + k, album:na }; na.items.push(ni); ITEMS[ni.id] = ni; });
      ALBUMS.push(na);
    });
    window.__stres = true;
  }
  if (typeof gtClose === 'function') gtClose();
  document.querySelectorAll('.ov.on').forEach(o => o.classList.remove('on'));
  const t = [];
  for (let k = 0; k < 5; k++){ const t0 = performance.now(); openColl('albums'); t.push(performance.now() - t0); await sleep(30); }
  const f0 = performance.now(); openColl('albums'); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); const ff = performance.now() - f0;
  const drawn = [...document.querySelectorAll('#coll canvas')].filter(c => c.width > 0 && c.dataset.lazy !== '1').length;
  const res = { albumResim: ALBUMS.reduce((t, a) => t + a.items.length, 0), albumEkrani_ms: med(t), ilkKare_ms: Math.round(ff), cizilenCanvas: drawn, toplamCanvas: document.querySelectorAll('#coll canvas').length, bellek_MB: performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : null };
  show('home'); refreshHome();
  return res;
})();
