// Otomatik oyun turu (duman testi).
// Tarayıcıda oyun açıkken sayfanın içinde çalıştırılır (geliştirici konsolu).
// Kaydı SİLER: sadece test adresinde (localhost) çalıştır.
// Yaptıkları: her resmi bitirir, şehir/il sorularını cevaplar (her 4. soruyu bilerek yanlış),
// bütün ekran ve pencereleri açar, konsol hatalarını toplar. Sonuç: { ok, errors, ... }
(async () => {
  if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return { ok:false, errors:['Sadece localhost üzerinde çalıştır'] };
  const errors = [];
  const onErr = e => errors.push('error: ' + (e.message || e.reason || e));
  window.addEventListener('error', onErr); window.addEventListener('unhandledrejection', onErr);
  const ce = console.error; console.error = (...a) => { errors.push('console.error: ' + a.join(' ')); ce.apply(console, a); };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const closeAll = () => document.querySelectorAll('.ov.on').forEach(o => o.classList.remove('on'));
  const step = async (name, fn) => { try { await fn(); } catch (e){ errors.push(name + ': ' + (e && e.stack || e)); } await sleep(0); };

  // 1) Her resmi bitir
  let painted = 0, quizOk = 0, quizNo = 0;
  const ids = Object.keys(ITEMS);
  for (const [k, id] of ids.entries()){
    await step('resim ' + id, async () => {
      closeAll(); if (typeof gtClose === 'function') gtClose();
      startBuiltin(id);
      for (let i = 0; i < A.idx.length; i++) fillCell(i, false);
      finish(); painted++;
      const box = $('#doneQuiz');
      if (!box.hidden && QUIZ[id]){
        const want = trx(QUIZ[id][k % 4 === 3 ? 2 : 1]);
        const b = [...box.querySelectorAll('.qopt')].find(x => x.textContent === want);
        if (!b) throw new Error('şık bulunamadı: ' + want);
        b.click(); if (k % 4 === 3) quizNo++; else quizOk++;
      }
      if (k === 0){ openDeco(); closeAll(); }
      closeAll(); backToOrigin();
    });
    if (k % 10 === 0) await sleep(16);
  }
  await sleep(800); // finish() için kurulan zamanlayıcılar boşa düşsün

  // 2) Ekranlar ve pencereler
  const screens = [
    ['ana sayfa', () => { show('home'); refreshHome(); }],
    ['koleksiyon', () => openColl()],
    ['albümler', () => openColl('albums')],
    ['anılar', () => openColl('memories')],
    ['fırsatlar', () => openColl('deals')],
    ['dünya haritası', () => openMap()],
    ...CITIES.map(c => ['şehir ' + c.id, () => openCity(c.id)]),
    ['türkiye turu', () => openTr()],
    ...IL_OPEN.map(c => ['il ' + c.id, () => openIl(c.id)]),
    ...EVENTS.map(e => ['etkinlik ' + e.id, () => openEvent(e.id)]),
    ['mini oyun', async () => { openMini('istanbul'); await sleep(300); stopMini(); }],
    ['istatistik', () => openStats()],
    ['rozetler', () => openBadges()],
    ['sıralama', () => openRank()],
    ['ayarlar', () => openSettings()],
    ['nasıl oynanır', () => { openHowto(); closeHowto(); }],
    ['dükkân', () => openShop()],
    ['güç bilgisi', () => openPwInfo()],
    ['tanıtım', async () => { gtOpen(); $('#gtPrev').click(); for (let i = 0; i < 14; i++){ const nx = document.querySelector('#gtour .gtbtns .btn.primary'); if (nx) nx.click(); await sleep(30); } gtClose(); }],
    ['ana sayfa (son)', () => { show('home'); refreshHome(); }],
  ];
  for (const [name, fn] of screens){ await step(name, async () => { closeAll(); await fn(); await sleep(40); }); }
  closeAll();

  // 3) Fotoğraf akışı: sahte fotoğraf ve sahte kamera akışı (gerçek kameraya dokunmaz)
  let fotoKayit = 0;
  await step('fotoğraf', async () => {
    const pic = document.createElement('canvas'); pic.width = 640; pic.height = 480; const pg = pic.getContext('2d');
    pg.fillStyle = '#6a9ad0'; pg.fillRect(0, 0, 640, 480); pg.fillStyle = '#f0c8a0'; pg.beginPath(); pg.ellipse(320, 250, 110, 140, 0, 0, 7); pg.fill();
    pg.fillStyle = '#222'; pg.fillRect(270, 220, 20, 14); pg.fillRect(350, 220, 20, 14); pg.fillStyle = '#c0504a'; pg.fillRect(295, 320, 50, 10);
    // galeri yolu
    src = squareFrom(pic, 640, 480); openSetup();
    if (fx !== 'normal' || mask.id !== 'yok' || setupN !== 32 || setupK !== 12) throw new Error('varsayılanlar dengeli değil');
    if (document.querySelectorAll('#denChips canvas').length !== DEN.length) throw new Error('ayrıntı önizlemeleri eksik');
    for (let v = 0; v < DEN.length; v++){ document.querySelectorAll('#denChips .chip')[v].click(); if (setupArt.n !== DEN[v]) throw new Error('ayrıntı seçimi çalışmadı'); }
    for (const b of document.querySelectorAll('#lvlSeg button')) b.click();
    for (const id of Object.keys(FX)) [...document.querySelectorAll('#fxChips .chip')][Object.keys(FX).indexOf(id)].click();
    for (const b of [...document.querySelectorAll('#maskChips .chip')]) b.click();
    [...document.querySelectorAll('#maskChips .chip')].find(b => b.textContent === trx('Köpek')).click();
    if (document.querySelector('.eyeh').hidden) throw new Error('göz noktaları görünmedi');
    { const w = $('#pvWrap'), r = $('#preview').getBoundingClientRect(), ev = (t, x, y) => w.dispatchEvent(new PointerEvent(t, { bubbles:true, pointerId:1, clientX:r.left + x * r.width, clientY:r.top + y * r.height }));
      ev('pointerdown', 0.4, 0.44); ev('pointermove', 0.38, 0.4); ev('pointerup', 0.38, 0.4); await sleep(40);
      if (Math.abs(mask.eyes[0][0] - 0.38) > 0.01) throw new Error('göz noktası sürüklenmedi'); }
    { const plain = convCached(setupArt.n, setupK); if (plain.idx.every((v, i) => plain.pal[v] === setupArt.pal[setupArt.idx[i]])) throw new Error('aksesuar resme eklenmedi'); }
    for (const b of document.querySelectorAll('#pvMode button')) b.click();
    const before = DB.gallery.length;
    $('#goBtn').click(); for (let i = 0; i < A.idx.length; i++) fillCell(i, false); finish();
    fotoKayit = DB.gallery.length - before; if (fotoKayit !== 1) throw new Error('fotoğraf anılara kaydedilmedi');
    closeAll(); backToOrigin();
    // kamera yolu
    const gum = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    if (navigator.mediaDevices){
      navigator.mediaDevices.getUserMedia = async () => pic.captureStream(10);
      let tk = 0; const tick = setInterval(() => { pg.fillStyle = tk++ % 2 ? '#6a9ad0' : '#6b9ad0'; pg.fillRect(0, 0, 4, 4); }, 50);   // akış kare üretsin
      try {
        await openCam(); await sleep(300);
        if ($('#camView').hidden) throw new Error('kamera görüntüsü açılmadı');
        const ch = [...document.querySelectorAll('#camAcc .chip')].find(b => b.textContent === trx('Köpek'));
        if (!ch) throw new Error('kamerada filtre şeridi yok'); ch.click();
        if ($('#camHint').hidden) throw new Error('kamera ipucu görünmedi');
        $('#shutter').click(); await sleep(50);
        if (!$('#setup').classList.contains('on') || mask.id !== 'kopek' || camStream) throw new Error('kameradan hazırlama ekranına geçiş bozuk (filtre korunmalı)');
        if (setupArt.n !== 32 || pvMode !== 'pix') throw new Error('çekimden sonra piksel önizleme açılmadı');
      } finally { clearInterval(tick); navigator.mediaDevices.getUserMedia = gum; stopCam(); }
    }
    mask.id = 'yok'; maskHome(); show('home'); refreshHome();
  });
  closeAll();

  window.removeEventListener('error', onErr); window.removeEventListener('unhandledrejection', onErr); console.error = ce;
  const done = ids.filter(id => DB.done[id]).length;
  return { ok: errors.length === 0 && done === ids.length && fotoKayit === 1, foto: fotoKayit, resim: ids.length, biten: done, boyanan: painted, dogruCevap: quizOk, yanlisCevap: quizNo, hatira: Object.keys(DB.souv || {}).length, rozet: Object.keys(DB.badges || {}).length, coin: DB.coins, errors };
})();
