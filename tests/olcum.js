// Performans ölçümü: açılış, albüm ekranı, bellek. Oyun localhost'ta açıkken sayfada çalıştır.
// Bilgisayarda ölçülür; telefonda rakamlar daha büyük olur ama önce/sonra karşılaştırması için yeterlidir.
(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const nav = performance.getEntriesByType('navigation')[0] || {};
  const med = a => { const s = [...a].sort((x, y) => x - y); return +s[Math.floor(s.length / 2)].toFixed(1); };
  if (typeof gtClose === 'function') gtClose();
  document.querySelectorAll('.ov.on').forEach(o => o.classList.remove('on'));
  const t = [];
  for (let k = 0; k < 7; k++){ const t0 = performance.now(); openColl('albums'); t.push(performance.now() - t0); await sleep(30); }
  const canv = document.querySelectorAll('#coll canvas').length;
  // ilk kare: albüm ekranına geçip bir sonraki boyamaya kadar
  const f0 = performance.now(); openColl('albums'); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); const firstFrame = performance.now() - f0;
  show('home'); refreshHome();
  return {
    sayfaHazir_ms: Math.round(nav.domContentLoadedEventEnd || 0),
    tamYuklendi_ms: Math.round(nav.loadEventEnd || 0),
    htmlBoyut_KB: nav.transferSize ? Math.round(nav.decodedBodySize / 1024) : null,
    albumEkrani_ms: med(t), albumIlkKare_ms: Math.round(firstFrame), albumCanvasSayisi: canv,
    bellek_MB: performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : null,
    resimSayisi: Object.keys(ITEMS).length,
  };
})();
