/* ---------- world tour: guide questions + souvenir suitcase ---------- */
const souvCache = {};
const souvArt = id => souvCache[id] || (souvCache[id] = decodeArt(SOUV[id].art, 's_' + id));
const QOK = ['Aferin!', 'Bildin!', 'Harika!', 'İşte bu!'];
DB.souv = DB.souv || {};
function renderQuiz(){
  const box = $('#doneQuiz'), id = viewCtx.id, al = id ? ITEMS[id].album : null, Q = id && QUIZ[id];
  box.hidden = true; box.innerHTML = '';
  if (!Q || !al || (al.kind !== 'city' && al.kind !== 'il') || DB.souv[id] || !SOUV[id]) return;
  $('#doneFact').hidden = true;
  box.style.setProperty('--qc', al.color); box.hidden = false;
  const hd = document.createElement('div'); hd.className = 'qhead';
  const cv = document.createElement('canvas'); drawArt(cv, guideArt(al.id)); hd.append(cv);
  const ht = document.createElement('div'); ht.innerHTML = '<small></small><b>Bilirsen hatıra bavuluna bir hediye girer.</b>'; ht.querySelector('small').textContent = al.guide.name + ' soruyor'; hd.append(ht);
  const qq = document.createElement('p'); qq.className = 'qq'; qq.textContent = Q[0];
  const opts = document.createElement('div'); opts.className = 'qopts';
  const order = [1, 2, 3].sort(() => Math.random() - 0.5);
  order.forEach(k => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'qopt'; b.textContent = Q[k];
    b.onclick = () => {
      opts.querySelectorAll('button').forEach(x => { x.disabled = true; if (x.textContent === trx(Q[1])) x.classList.add('ok'); });
      const res = document.createElement('div'); res.className = 'qres'; res.setAttribute('role', 'status');
      if (k === 1){
        DB.souv[id] = Date.now(); DB.coins += 15; save(); setCoins();
        const sc = document.createElement('canvas'); drawArt(sc, souvArt(id)); res.append(sc);
        const t = document.createElement('p'); t.textContent = TL('{0} Bavuluna {1} girdi. +15 coin', QOK[Math.floor(Math.random() * QOK.length)], SOUV[id].name); res.append(t);
        [784, 988, 1319].forEach((f, j) => tone(f, 0.16, j * 0.08, 'triangle', 0.06));
      } else {
        b.classList.add('no');
        const t = document.createElement('p'); t.textContent = TL('Az kaldı! Doğrusu: {0}. Bu resmi şehirden tekrar açınca soruyu yeniden sorarım.', Q[1]); res.append(t);
      }
      box.append(res); if (FACTS[id]) $('#doneFact').hidden = false;
      afterBadge();
    };
    opts.append(b);
  });
  box.append(hd, qq, opts);
}
let gtipAt = 0, gtipT = 0;
function showGuideTip(){
  const al = A && A.id ? ITEMS[A.id].album : null; if (!al || (al.kind !== 'city' && al.kind !== 'il') || !FACTS[A.id]) return;
  const el = $('#gtip'); el.innerHTML = '';
  const cv = document.createElement('canvas'); drawArt(cv, guideArt(al.id)); el.append(cv);
  const t = document.createElement('div'); t.innerHTML = '<small></small><span></span>';
  t.querySelector('small').textContent = al.guide.name; t.querySelector('span').textContent = FACTS[A.id]; el.append(t);
  el.setAttribute('aria-label', TL('{0}: {1} Kapatmak için dokun.', al.guide.name, FACTS[A.id]));
  el.hidden = false; el.onclick = () => { el.hidden = true; };
  tone(660, 0.08, 0, 'triangle', 0.04); tone(880, 0.1, 0.08, 'triangle', 0.04);
  clearTimeout(gtipT); gtipT = setTimeout(() => { el.hidden = true; }, 10000);
}
function souvBox(groups, title, desc){
  groups = groups || CITIES;
  const box = document.createElement('div'); box.className = 'passport box'; box.style.marginTop = '16px';
  const all = groups.flatMap(c => c.items.filter(it => SOUV[it.id]).map(it => ({ c, it })));
  const n = all.filter(x => DB.souv[x.it.id]).length;
  box.innerHTML = `<h3>${title || 'HATIRA BAVULU'} <small class="muted" style="font-size:14px">${n}/${all.length}</small></h3><p class="muted" style="font-size:13px;margin:-4px 0 10px">${desc || 'Her resmi bitirince rehber bir soru sorar. Bilirsen buraya bir hatıra girer.'}</p><div class="souvs"></div>`;
  all.forEach(({ c, it }) => {
    const got = !!DB.souv[it.id], d = document.createElement('div'); d.className = 'souv' + (got ? ' got' : '');
    d.style.setProperty('--sc', c.color);
    const cv = document.createElement('canvas'); const art = souvArt(it.id); drawArt(cv, art, got ? null : new Uint8Array(art.n * art.n)); d.append(cv);
    d.setAttribute('role', 'img'); d.setAttribute('aria-label', got ? (LANG === 'en' ? trx(SOUV[it.id].name) + ', ' + trx(c.name) : `${SOUV[it.id].name}, ${c.name.toLocaleLowerCase('tr')}`) : 'Henüz kazanılmamış hatıra');
    d.title = got ? SOUV[it.id].name : '?';
    box.querySelector('.souvs').append(d);
  });
  return box;
}


