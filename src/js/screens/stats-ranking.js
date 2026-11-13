/* ---------- daily ranking + personal stats ---------- */
function dailyBoard(mode){
  const ds = dailyState(), art = getArt(ds.id), r = rng(ds.date.split('-').reduce((a, v) => a * 31 + (+v), 7));
  const base = art.n * art.n * 0.2, names = ['Deniz', 'Efe', 'Zeynep', 'Mert', 'Elif', 'Can', 'Ece', 'Arda', 'Selin', 'Kerem', 'Nil', 'Bora', 'İpek', 'Emre', 'Defne', 'Kaan', 'Melis', 'Ozan', 'Ada', 'Tuna'];
  const rows = [];
  for (let k = 0; k < 49; k++){ const u = r() + r() + r(), pw = r() < 0.4; rows.push({ name:names[Math.floor(r() * names.length)] + (10 + Math.floor(r() * 89)), t:Math.round(base * (0.45 + u * 0.75) * (pw ? 0.62 : 1)), pw }); }
  if (ds.done && ds.time) rows.push({ name:'SEN', t:ds.time, me:true, pw:ds.pw });
  rows.sort((a, b) => a.t - b.t); return mode === 'pure' ? rows.filter(x => !x.pw) : rows;
}
let rankMode = null;
function openRank(mode){
  const ds0 = dailyState(); rankMode = typeof mode === 'string' ? mode : (rankMode || (ds0.done && ds0.pw ? 'free' : 'pure'));
  document.querySelectorAll('#rankTabs button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.m === rankMode)));
  const rows = dailyBoard(rankMode), mi = rows.findIndex(x => x.me), L = $('#rankList'); L.innerHTML = '';
  const kind = rankMode === 'pure' ? 'Hiç güç kullanmadan bitirenler yarışır.' : 'Güç kullanan ve kullanmayan herkes yarışır.';
  const mine = mi >= 0 ? TL('Bugün {0} kişi arasında {1}. sıradasın.', rows.length, mi + 1) : (ds0.done && ds0.pw && rankMode === 'pure' ? 'Bugün güç kullandığın için bu sıralamada yoksun, Serbest sıralamaya bak.' : 'Günün resmini bitirince sen de sıralamaya girersin.');
  $('#rankNote').textContent = trx(kind) + ' ' + trx(mine);
  $('#rankFoot').textContent = trx('Örnek sıralamadır: gerçek uygulamada o gün boyayan bütün oyuncular burada görünür.');
  const show = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); if (mi >= 0){ show.add(mi); if (mi > 0) show.add(mi - 1); if (mi < rows.length - 1) show.add(mi + 1); }
  let prev = -1;
  L.insertAdjacentHTML('beforeend', `<div class="rk rkh"><span>${trx('SIRA')}</span><span>${trx('OYUNCU')}</span><span>${trx('SÜRE')}</span></div>`);
  [...show].sort((a, b) => a - b).forEach(i => {
    if (prev >= 0 && i > prev + 1) L.insertAdjacentHTML('beforeend', '<div class="rkgap" aria-hidden="true">⋯</div>');
    const x = rows[i], d = document.createElement('div'); d.className = 'rk' + (x.me ? ' me' : '') + (i < 3 ? ' top' + (i + 1) : '') + (L.querySelectorAll('.rk').length % 2 === 0 ? ' z' : '');
    d.innerHTML = `<span class="rn">${i + 1}</span><span class="rnm"><span></span></span><span class="rt">${fmtT(x.t)}</span>`;
    d.querySelector('.rnm span').textContent = x.me ? trx('SEN') : x.name;
    if (x.pw){ const t = document.createElement('small'); t.className = 'rtag'; t.textContent = trx('güçle'); d.querySelector('.rnm').append(t); }
    L.append(d); prev = i;
  });
  $('#rank').classList.add('on'); $('#rankX').focus();
}
function openStats(){
  const st = DB.stats, acc = st.taps + st.wrong ? Math.round(st.taps / (st.taps + st.wrong) * 100) : 100;
  const times = Object.values(st.daily || {}), best = times.length ? Math.min(...times) : 0;
  const dur = t => t < 3600 ? TL('{0} dk', Math.round(t / 60)) : TL('{0} sa', (t / 3600).toFixed(1).replace('.', LANG === 'en' ? '.' : ','));
  const tiles = [[st.pics, 'Boyanan resim'], [st.cells, 'Boyanan kare'], [dur(st.time), 'Boyama süresi'], [totalStars(), 'Toplam yıldız'], [(DB.streak ? DB.streak.n : 0) + ' gün', 'Günlük seri'], [(st.bestStreak || 0) + ' gün', 'En uzun seri'], [best ? fmtT(best) : 'yok', 'En hızlı günlük resim'], [pct(acc), 'Doğru dokunuş']];
  $('#statTiles').innerHTML = tiles.map(([v, l]) => `<div class="stt"><b>${v}</b><span>${l}</span></div>`).join('');
  const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'], vals = [];
  for (let k = 6; k >= 0; k--){ const d = new Date(Date.now() - k * 86400000), key = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); vals.push({ v:(st.daily || {})[key] || 0, l:days[d.getDay()] }); }
  const mx = Math.max(1, ...vals.map(x => x.v));
  if (!vals.some(x => x.v)){ $('#statBars').style.display = 'block'; $('#statBars').style.height = 'auto'; $('#statBars').innerHTML = '<p class="empty">Henüz günün resmini boyamadın. Her gün bitirdikçe süren burada çubuk olarak görünür.</p>'; $('#statsBadges').textContent = TL('ROZETLERİM {0}/{1}', BADGES.filter(b => DB.badges[b.id]).length, BADGES.length); $('#stats').classList.add('on'); $('#statsX').focus(); return; }
  $('#statBars').style.display = ''; $('#statBars').style.height = '';
  $('#statBars').innerHTML = vals.map(x => `<div><span>${x.v ? fmtT(x.v) : ''}</span><i class="${x.v ? '' : 'none'}" style="height:${x.v ? Math.max(8, Math.round(x.v / mx * 74)) : 3}px"></i><span>${x.l}</span></div>`).join('');
  $('#statsBadges').textContent = TL('ROZETLERİM {0}/{1}', BADGES.filter(b => DB.badges[b.id]).length, BADGES.length);
  $('#stats').classList.add('on'); $('#statsX').focus();
}
$('#statsBtn').onclick = openStats;
$('#statsX').onclick = () => $('#stats').classList.remove('on');
document.querySelectorAll('.htabs button').forEach(b => b.onclick = () => { const t = b.dataset.t; if ($('#' + t).classList.contains('on')) return; ['stats', 'badges', 'rank'].forEach(id => $('#' + id).classList.remove('on')); if (t === 'stats') openStats(); else if (t === 'badges') openBadges(); else { rankMode = null; openRank(); } });
$('#statsRank').onclick = () => { rankMode = null; openRank(); };
$('#rankX').onclick = () => $('#rank').classList.remove('on');
$('#rankBtn').onclick = () => { rankMode = null; openRank(); };
document.querySelectorAll('#rankTabs button').forEach(b => b.onclick = () => openRank(b.dataset.m));



