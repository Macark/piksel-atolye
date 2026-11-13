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
    ['tanıtım', async () => { gtOpen(); for (let i = 0; i < 14; i++){ const nx = document.querySelector('#gtour .gtbtns .btn.primary'); if (nx) nx.click(); await sleep(30); } gtClose(); }],
    ['ana sayfa (son)', () => { show('home'); refreshHome(); }],
  ];
  for (const [name, fn] of screens){ await step(name, async () => { closeAll(); await fn(); await sleep(40); }); }
  closeAll();

  window.removeEventListener('error', onErr); window.removeEventListener('unhandledrejection', onErr); console.error = ce;
  const done = ids.filter(id => DB.done[id]).length;
  return { ok: errors.length === 0 && done === ids.length, resim: ids.length, biten: done, boyanan: painted, dogruCevap: quizOk, yanlisCevap: quizNo, hatira: Object.keys(DB.souv || {}).length, rozet: Object.keys(DB.badges || {}).length, coin: DB.coins, errors };
})();
