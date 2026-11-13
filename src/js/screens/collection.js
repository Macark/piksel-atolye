/* ---------- collection ---------- */
// Albümler iki katlı: liste (kapak kartları) ve albüm sayfası (o albümün resimleri). collAlbum: açık albüm ya da null.
let origin = { screen:'coll', tab:'albums' }, collTab = 'albums', collAlbum = null;
function openColl(tab, album){
  if (typeof tab === 'string') collTab = tab;
  collAlbum = collTab === 'albums' && album && ALBUMS.some(a => a.id === album) ? album : null;
  origin = { screen:'coll', tab:collTab, album:collAlbum };
  document.querySelectorAll('#collTabs button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.p === collTab)));
  const list = $('#collList'); list.innerHTML = ''; list.scrollTop = 0;
  const al = collAlbum && ALBUMS.find(a => a.id === collAlbum);
  $('#collTitle').textContent = al ? al.name : { albums:'ALBÜMLER', memories:'ANILARIM', deals:'FIRSATLAR' }[collTab];
  $('#collBack').setAttribute('aria-label', al ? trx('Albümlere dön') : trx('Ana sayfa'));
  if (collTab === 'albums') al ? renderAlbumPage(list, al) : renderAlbums(list); else if (collTab === 'deals') renderDeals(list); else renderMemories(list);
  show('coll');
}
document.querySelectorAll('.playtabs button').forEach(b => b.onclick = () => b.dataset.p === 'tour' ? openMap() : openColl(b.dataset.p));
const albumGot = al => al.items.filter(it => DB.done[it.id]).length;
function renderAlbums(list){
  const all = ALBUMS.reduce((t, a) => t + albumGot(a), 0);
  const fullA = ALBUMS.filter(a => albumGot(a) === a.items.length).length;
  const near = ALBUMS.map(a => ({ a, left:a.items.length - albumGot(a) })).filter(x => x.left > 0 && x.left < x.a.items.length).sort((x, y) => x.left - y.left)[0];
  const sum = document.createElement('section'); sum.className = 'album box colsum'; sum.style.setProperty('--ac', 'var(--gold)');
  sum.innerHTML = `<div class="ahead"><h3>KOLEKSİYON</h3><span>${all}/${TOTAL}</span></div><div class="abar"><i style="width:${all / TOTAL * 100}%"></i></div><p class="csub"></p>`;
  sum.querySelector('.csub').textContent = TL('{0}/{1} albüm tamam.', fullA, ALBUMS.length) + ' ' + (fullA === ALBUMS.length ? trx('Bütün albümler tamam!') : near ? TL('En yakın: {0}, {1} resim kaldı (+50 coin).', near.a.name, near.left) : trx('Bir albümü bitirince +50 coin kazanırsın.'));
  if (near){ const go = document.createElement('button'); go.type = 'button'; go.className = 'linkbtn'; go.textContent = TL('{0} albümüne git', near.a.name); go.onclick = () => openColl('albums', near.a.id); sum.append(go); }
  list.append(sum);
  // kapak kartları: albümün ilk 4 resmi 2x2 mozaik (boyananlar renkli), ad, ilerleme
  const grid = document.createElement('div'); grid.className = 'acovers';
  ALBUMS.forEach(al => {
    const got = albumGot(al), full = got === al.items.length;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'acover box' + (full ? ' full' : ''); b.dataset.album = al.id;
    b.style.setProperty('--ac', ALBUM_COLOR[al.id] || 'var(--accent)');
    const mo = document.createElement('span'); mo.className = 'acmo'; mo.setAttribute('aria-hidden', 'true');
    al.items.slice(0, 4).forEach(it => {
      const c = document.createElement('canvas'), done = !!DB.done[it.id], w = DB.wip[it.id];
      drawArtLazy(c, it.n, () => { const art = getArt(it.id); drawArt(c, art, done ? null : (w ? maskOf(w.painted) : new Uint8Array(art.n * art.n))); });
      mo.append(c);
    });
    b.append(mo);
    b.insertAdjacentHTML('beforeend', `<b></b><span class="acbar"><i style="width:${got / al.items.length * 100}%"></i></span><small>${full ? '✓ TAMAM' : got + '/' + al.items.length}</small>`);
    b.querySelector('b').textContent = al.name;
    b.setAttribute('aria-label', TL('{0}, {1}/{2} resim', al.name, got, al.items.length));
    b.onclick = () => openColl('albums', al.id);
    grid.append(b);
  });
  list.append(grid);
  $('#collCount').textContent = all + '/' + TOTAL;
}
function renderAlbumPage(list, al){
  const got = albumGot(al);
  const sec = document.createElement('section'); sec.className = 'album box'; sec.style.setProperty('--ac', ALBUM_COLOR[al.id] || 'var(--accent)');
  sec.innerHTML = `<div class="ahead"><h3>${al.name}</h3>${got === al.items.length ? '<span class="stamp">TAMAMLANDI</span>' : `<span>${got}/${al.items.length}</span>`}</div><div class="abar"><i style="width:${got / al.items.length * 100}%"></i></div><div class="cards"></div>`;
  const cards = sec.querySelector('.cards');
  al.items.forEach(it => {
    const n = it.n, done = !!DB.done[it.id], w = DB.wip[it.id];
    const b = document.createElement('button'); b.type = 'button'; b.className = 'card';
    const pic = document.createElement('div'); pic.className = 'pic';
    const c = document.createElement('canvas');
    // resim verisi ancak küçük resim görünür olunca (ya da resme dokununca) çözülür
    drawArtLazy(c, n, () => { const art = getArt(it.id); drawArt(c, art, done ? null : (w ? maskOf(w.painted) : new Uint8Array(art.n * art.n))); });
    pic.append(c); pic.insertAdjacentHTML('beforeend', levelHTML(itemLevel(it)));
    if (done) pic.insertAdjacentHTML('beforeend', '<span class="badge" aria-hidden="true">✓</span>');
    else if (w){ const p = Math.round(w.order.length / (n * n) * 100); pic.insertAdjacentHTML('beforeend', `<span class="wip"><i style="width:${p}%"></i></span>`); }
    const nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = it.name; if (done && DB.stars[it.id]) nm.insertAdjacentHTML('beforeend', '<br><span class="stars">' + starStr(DB.stars[it.id]) + '</span>');
    b.append(pic, nm);
    b.setAttribute('aria-label', `${it.name}, ${done ? 'boyandı' : w ? 'yarım kaldı' : 'boyanmadı'}`);
    b.onclick = () => done ? viewDone({ ...getArt(it.id), order:DB.done[it.id].order }, it.name.toLocaleUpperCase('tr'), { id:it.id }) : startBuiltin(it.id);
    cards.append(b);
  });
  list.append(sec);
  // sıradaki albüm (bitmemiş ilk albüm) için kısayol
  const k = ALBUMS.indexOf(al), nx = [...ALBUMS.slice(k + 1), ...ALBUMS.slice(0, k)].find(a => albumGot(a) < a.items.length);
  if (nx){ const go = document.createElement('button'); go.type = 'button'; go.className = 'btn'; go.style.marginTop = '14px'; go.textContent = TL('SIRADAKİ ALBÜM: {0}', nx.name); go.onclick = () => openColl('albums', nx.id); list.append(go); }
  $('#collCount').textContent = got + '/' + al.items.length;
}
function renderDeals(list){
  list.insertAdjacentHTML('beforeend', '<p class="muted" style="margin-top:8px;font-size:15px">Markaların resimlerini boya, indirim kuponu kazan. Buradaki marka örnektir.</p>');
    const it = SPONSOR.items[0], art = getArt(it.id), done = !!DB.done[it.id], w = DB.wip[it.id];
    const sec = document.createElement('section'); sec.className = 'album box'; sec.style.setProperty('--ac', SPONSOR.color);
    sec.innerHTML = `<div class="ahead"><h3>SPONSORLU</h3><span class="sptag">Reklam, örnek marka</span></div><button class="spcard" type="button"><span class="sppic"></span><span class="sptxt"><b>${SPONSOR.brand}</b><span>${done ? TL('Kuponun hazır: {0}', SPONSOR.coupon) : 'Fincanı boya, %10 indirim kuponu kazan.'}</span></span></button>`;
    const c = document.createElement('canvas'); drawArt(c, art, done ? null : (w ? maskOf(w.painted) : new Uint8Array(art.n * art.n)));
    sec.querySelector('.sppic').append(c);
    if (done) sec.querySelector('.sppic').insertAdjacentHTML('beforeend', '<span class="badge" aria-hidden="true" style="position:absolute;right:-6px;top:-6px;width:22px;height:22px;background:var(--good);border:2px solid var(--line);color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center">✓</span>');
    sec.querySelector('.spcard').onclick = () => done ? viewDone({ ...art, order:DB.done[it.id].order }, it.name.toLocaleUpperCase('tr'), { id:it.id }) : startBuiltin(it.id);
    list.append(sec);
  const got = SPONSOR.items.filter(x => DB.done[x.id]);
  $('#collCount').textContent = got.length + ' kupon';
  const box = document.createElement('section'); box.className = 'album box'; box.style.setProperty('--ac', 'var(--gold)');
  box.innerHTML = '<div class="ahead"><h3>KUPONLARIM</h3><span>' + got.length + '</span></div>' + (got.length
    ? got.map(() => `<div class="coupon"><span>${SPONSOR.brand}</span><b>${SPONSOR.coupon}</b><span>${SPONSOR.offer}</span></div>`).join('')
    : '<p class="empty">Henüz kuponun yok. Yukarıdaki resmi boyayınca ilk kuponun burada görünür.</p>');
  list.append(box);
}
function renderMemories(list){
  $('#collCount').textContent = TL('{0} anı', DB.gallery.length);
  list.insertAdjacentHTML('beforeend', '<p class="muted" style="margin-top:10px;font-size:15px">Kendi fotoğraflarından boyadıkların, yazdığın notlarla birlikte burada saklanır.</p>');
  if (!DB.gallery.length){ list.insertAdjacentHTML('beforeend', '<p class="empty" style="margin-top:28px;text-align:center">Henüz anın yok. Ana sayfadaki FOTOĞRAF EKLE ile ilk anını ekle; boyadıkların burada polaroid olarak saklanır.</p>'); return; }
  const wall = document.createElement('div'); wall.className = 'wall';
  DB.gallery.slice().reverse().forEach((art, k) => {
    const real = DB.gallery.length - 1 - k;
    const dstr = new Date(art.date || Date.now()).toLocaleDateString(LOC, { day:'numeric', month:'long', year:'numeric' });
    const b = document.createElement('button'); b.type = 'button'; b.className = 'polaroid'; b.style.setProperty('--rot', [-2, 1.5, 2, -1.5][k % 4] + 'deg');
    const c = document.createElement('canvas'); drawArt(c, art);
    const cap = document.createElement('span'); cap.className = 'pcap'; cap.textContent = art.caption || dstr;
    b.append(c, cap);
    if (art.caption && art.caption !== dstr){ const d = document.createElement('span'); d.className = 'pdate'; d.textContent = dstr; b.append(d); }
    b.setAttribute('aria-label', TL('Anı: {0}', art.caption || dstr));
    b.onclick = () => viewDone(art, 'ANIN', { photo:real });
    wall.append(b);
  });
  list.append(wall);
}
$('#collBack').onclick = () => { if (collAlbum){ const id = collAlbum; openColl('albums'); const c = document.querySelector('#collList .acover[data-album="' + id + '"]'); if (c) c.scrollIntoView({ block:'center' }); } else { show('home'); refreshHome(); } };
function startBuiltin(id){ const art = getArt(id); startPaint({ ...art, name:ITEMS[id].name }, DB.wip[id]); }
function nextOf(id){
  const al = id ? ITEMS[id].album : null;
  const inAl = al ? al.items.find(it => !DB.done[it.id] && it.id !== id) : null;
  if (inAl) return inAl.id;
  if (al && (al.kind === 'city' || al.kind === 'il' || al.kind === 'daily' || al.kind === 'event')) return null;
  for (const a of ALBUMS) for (const it of a.items) if (!DB.done[it.id] && it.id !== id) return it.id;
  return null;
}

const COINSVG = '<svg width="20" height="20" viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true"><path fill="#5A3A08" d="M4 0h4v1h-4zM2 1h2v1h-2zM8 1h2v1h-2zM1 2h1v1h-1zM10 2h1v1h-1zM1 3h1v1h-1zM10 3h1v1h-1zM0 4h1v1h-1zM11 4h1v1h-1zM0 5h1v1h-1zM11 5h1v1h-1zM0 6h1v1h-1zM11 6h1v1h-1zM0 7h1v1h-1zM11 7h1v1h-1zM1 8h1v1h-1zM10 8h1v1h-1zM1 9h1v1h-1zM10 9h1v1h-1zM2 10h2v1h-2zM8 10h2v1h-2zM4 11h4v1h-4z"></path><path fill="#F0B93A" d="M4 1h4v1h-4zM2 2h1v1h-1zM5 2h4v1h-4zM4 3h5v1h-5zM1 4h1v1h-1zM3 4h2v1h-2zM7 4h3v1h-3zM1 5h1v1h-1zM3 5h1v1h-1zM8 5h2v1h-2zM1 6h3v1h-3zM8 6h2v1h-2zM1 7h4v1h-4zM7 7h3v1h-3zM2 8h7v1h-7zM3 9h5v1h-5z"></path><path fill="#FFE89A" d="M3 2h2v1h-2zM2 3h2v1h-2zM2 4h1v1h-1zM2 5h1v1h-1z"></path><path fill="#C98A1A" d="M9 2h1v1h-1zM9 3h1v1h-1zM10 4h1v1h-1zM10 5h1v1h-1zM10 6h1v1h-1zM10 7h1v1h-1zM9 8h1v1h-1zM2 9h1v1h-1zM8 9h2v1h-2zM4 10h4v1h-4z"></path><path fill="#B07B12" d="M5 4h2v1h-2zM4 5h4v1h-4zM4 6h4v1h-4zM5 7h2v1h-2z"></path></svg>';


