/* ---------- home feed ---------- */
function thumb(art, mask){ const c = document.createElement('canvas'); drawArt(c, art, mask); return c; }
function hcard(cv, title, sub, fn, cls){
  const b = document.createElement('button'); b.type = 'button'; b.className = 'hc' + (cls ? ' ' + cls : '');
  const w = document.createElement('span'); w.className = 'cv'; if (cv) w.append(cv);
  const t = document.createElement('b'); t.textContent = title; const sm = document.createElement('small'); sm.textContent = sub;
  b.append(w, t, sm); b.onclick = fn; return b;
}
function contCard(cv, kicker, title, sub, cta, fn){
  const d = document.createElement('div'); d.className = 'cont';
  const w = document.createElement('span'); w.className = 'cv'; w.append(cv);
  const tx = document.createElement('div'); tx.className = 'tx';
  tx.innerHTML = `<span class="k">${kicker}</span><b></b><small></small>`; tx.querySelector('b').textContent = title; tx.querySelector('small').textContent = sub;
  const go = document.createElement('button'); go.type = 'button'; go.className = 'go'; go.textContent = cta; go.onclick = fn; tx.append(go);
  d.append(w, tx); return d;
}
function setOriginFor(id){ const al = ITEMS[id].album; if (al.kind === 'il') origin = { screen:'il', il:al.id }; else if (al.kind === 'city') origin = { screen:'city', city:al.id }; else { collTab = al.kind === 'sponsor' ? 'deals' : 'albums'; origin = { screen:'coll', tab:collTab, album:al.kind === 'album' ? al.id : null }; } }
function firstOpen(){
  for (const c of CITIES) if (DB.tickets[c.id]) for (const it of c.items) if (!DB.done[it.id]) return it.id;
  for (const a of ALBUMS) for (const it of a.items) if (!DB.done[it.id]) return it.id;
  return null;
}
function renderHome(){
  setCoins();
  const cont = $('#hCont'); cont.innerHTML = '';
  const wid = Object.keys(DB.wip).find(k => ITEMS[k]);
  if (DB.current && DB.current.idx){
    const a = DB.current, pc = Math.round((a.order || []).length / (a.n * a.n) * 100);
    cont.append(contCard(thumb(a, maskOf(a.painted)), 'KALDIĞIN YERDEN', 'Fotoğrafın', TL('%{0} boyandı', pc), 'Devam et', () => $('#resumeBtn').click()));
  } else if (wid){
    const art = getArt(wid), w = DB.wip[wid], pc = Math.round(w.order.length / (art.n * art.n) * 100);
    cont.append(contCard(thumb(art, maskOf(w.painted)), 'KALDIĞIN YERDEN', ITEMS[wid].name, TL('%{0} boyandı', pc), 'Devam et', () => { setOriginFor(wid); startBuiltin(wid); }));
  } else if (!Object.keys(DB.done).length){
    cont.append(contCard(thumb(HOME_ART), 'HOŞ GELDİN', 'İlk resmini boya', 'Numaralara dokun, kare kare boya', 'Başla', () => { setOriginFor('galata'); startBuiltin('galata'); }));
  } else {
    const nx = firstOpen();
    if (nx){ const art = getArt(nx); cont.append(contCard(thumb(art, new Uint8Array(art.n * art.n)), 'SIRADAKİ RESİM', ITEMS[nx].name, ITEMS[nx].album.name, 'Boya', () => { setOriginFor(nx); startBuiltin(nx); })); }
  }
  const hc = $('#hCities'); hc.innerHTML = '';
  CITIES.forEach(c => {
    const has = !!DB.tickets[c.id], got = c.items.filter(it => DB.done[it.id]).length, art = getArt(c.items[0].id);
    const sub = cityDone(c) ? 'Tamamlandı ✓' : has ? TL('{0}/{1} resim', got, c.items.length) : TL('Bilet {0} coin', c.price);
    hc.append(hcard(thumb(art, has ? null : new Uint8Array(art.n * art.n)), c.name, sub, () => has ? openCity(c.id) : openMap(), has ? '' : 'lock'));
  });
  const ha = $('#hAlbums'); ha.innerHTML = '';
  ALBUMS.forEach(al => { const got = al.items.filter(it => DB.done[it.id]).length; ha.append(hcard(thumb(getArt(al.items[0].id)), al.name, TL('{0}/{1} resim', got, al.items.length), () => openColl('albums', al.id))); });
  const hm = $('#hMem'); hm.innerHTML = '';
  const add = hcard(null, 'Yeni anı', 'Fotoğraf ya da kamera', () => $('#add').classList.add('on'), 'add'); add.querySelector('.cv').textContent = '+'; hm.append(add);
  DB.gallery.slice().reverse().slice(0, 8).forEach((art, k) => {
    const real = DB.gallery.length - 1 - k, dstr = new Date(art.date || Date.now()).toLocaleDateString(LOC, { day:'numeric', month:'short' });
    hm.append(hcard(thumb(art), art.caption || dstr, art.caption ? dstr : 'Anı', () => { collTab = 'memories'; origin = { screen:'coll', tab:'memories' }; viewDone(art, 'ANIN', { photo:real }); }));
  });
  const hd = $('#hDeals'); hd.innerHTML = '';
  const sit = SPONSOR.items[0];
  hd.append(hcard(thumb(getArt(sit.id)), SPONSOR.brand, DB.done[sit.id] ? 'Kuponun hazır' : 'Boya, %10 indirim kazan', () => openColl('deals')));
}


