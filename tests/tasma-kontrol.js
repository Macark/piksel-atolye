// Taşma kontrolü: her ekranı ve pencereyi açar, ekranın sağından taşan öğeleri ve
// ana sayfanın kaydırma isteyip istemediğini raporlar. Oyun localhost'ta açıkken sayfada çalıştır.
(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const closeAll = () => document.querySelectorAll('.ov.on').forEach(o => o.classList.remove('on'));
  const W = document.documentElement.clientWidth, out = [];
  const scan = name => {
    const roots = [...document.querySelectorAll('.screen.on, .ov.on')];
    roots.forEach(root => root.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
      // yatay kayan şeritlerin (palet, harita, etiket şeritleri) içi taşabilir; sadece kendisi taşmasın
      if (el.closest('.pal, .hstrip, .mapwrap, .pw, .cjump, .chips, .trwrap')) return;
      if (r.right > W + 1 || r.left < -1) out.push(`${name}: ${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}.${[...el.classList].join('.')} (${Math.round(r.left)}..${Math.round(r.right)} / ${W})`);
    }));
  };
  if (typeof gtClose === 'function') gtClose(); closeAll();
  const steps = [
    ['ana sayfa', () => { show('home'); refreshHome(); }],
    ['albümler', () => openColl('albums')], ['anılar', () => openColl('memories')], ['fırsatlar', () => openColl('deals')],
    ['dünya haritası', () => openMap()], ['şehir', () => openCity(CITIES[0].id)],
    ['türkiye', () => openTr()], ['il', () => openIl(IL_OPEN[0].id)],
    ['istatistik', () => openStats()], ['rozetler', () => openBadges()], ['sıralama', () => openRank()],
    ['ayarlar', () => openSettings()], ['dükkân', () => openShop()],
    ['boyama', () => startBuiltin(ALBUMS[0].items[0].id)], ['güç bilgisi', () => openPwInfo()],
    ['atölye', () => openAtolye()], ['atölye çerçeve', () => openAtolye('cerceve')],
  ];
  for (const [n, f] of steps){ closeAll(); try { await f(); } catch (e){ out.push(n + ': HATA ' + e.message); } await sleep(60); scan(n); }
  closeAll(); backToOrigin(); show('home'); refreshHome(); await sleep(60);
  const h = $('#home');
  return { genislik: W, yukseklik: document.documentElement.clientHeight, anaSayfaKaydirma: h.scrollHeight - h.clientHeight, tasmalar: out.slice(0, 40), toplam: out.length };
})();
