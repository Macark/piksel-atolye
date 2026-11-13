/* ---------- seasonal events ---------- */
function evDate(md, y){ return new Date(y, md[0] - 1, md[1]); }
function evRange(ev, d){ const y = d.getFullYear(); let s0 = evDate(ev.start, y), e0 = evDate(ev.end, y); if (e0 < s0){ if (d < s0) s0 = evDate(ev.start, y - 1); else e0 = evDate(ev.end, y + 1); } e0 = new Date(e0.getFullYear(), e0.getMonth(), e0.getDate(), 23, 59, 59); return [s0, e0]; }
function activeEvent(){
  const d = new Date();
  if (DB.testEvent) return EVENTS.find(e => e.id === DB.testEvent) || null;
  return EVENTS.find(ev => { const [a, b] = evRange(ev, d); return d >= a && d <= b; }) || null;
}
const fmtMD = md => new Date(2000, md[0] - 1, md[1]).toLocaleDateString(LOC, { day:'numeric', month:'long' });
function daysLeft(ev){ const [, b] = evRange(ev, new Date()); return Math.max(1, Math.ceil((b - new Date()) / 86400000)); }
function refreshEventCard(){
  const ev = activeEvent(); $('#eventBtn').hidden = !ev; $('#drow').classList.toggle('two', !!ev); $('#home').classList.toggle('hasev', !!ev); if (!ev) return;
  $('#eventBtn').style.setProperty('--ec', ev.color);
  const got = ev.items.filter(it => DB.done[it.id]).length, nx = ev.items.find(it => !DB.done[it.id]) || ev.items[0], art = getArt(nx.id);
  drawArt($('#eventCv'), art);
  $('#eventName').textContent = ev.name;
  $('#eventTxt').textContent = (DB.eventsDone || {})[ev.id] ? trx('Tamam ✓') : DB.testEvent ? TL('{0}/{1} · test', got, ev.items.length) : TL('{0}/{1} · {2} gün', got, ev.items.length, daysLeft(ev));
}
function openEvent(id){
  const ev = EVENTS.find(e => e.id === id); if (!ev) return; origin = { screen:'event', id }; setCoins();
  $('#cityName').textContent = ev.name; $('#cityBack').onclick = () => { show('home'); refreshHome(); };
  const B = $('#cityBody'); B.innerHTML = ''; B.style.setProperty('--sc', ev.color);
  const got = ev.items.filter(it => DB.done[it.id]).length, fin = (DB.eventsDone || {})[ev.id];
  B.insertAdjacentHTML('beforeend', `<div class="evban box"><b>${ev.name}</b><span>${fmtMD(ev.start)} – ${fmtMD(ev.end)}${DB.testEvent ? ' ' + TL('(test modu)') : TL(', {0} gün kaldı', daysLeft(ev))}</span><small>${fin ? 'Tamamladın! Ödülün alındı.' : TL('Bütün resimleri bitir: +{0} coin ve sadece bu etkinliğe özel {1} çerçevesi. ({2}/{3})', ev.reward, FRAMES[ev.frame].name, got, ev.items.length)}</small></div>`);
  const cards = document.createElement('div'); cards.className = 'cards big';
  ev.items.forEach(it => {
    const art = getArt(it.id), done = !!DB.done[it.id], w = DB.wip[it.id];
    const b = document.createElement('button'); b.type = 'button'; b.className = 'card';
    const pic = document.createElement('div'); pic.className = 'pic'; const cv3 = document.createElement('canvas');
    drawArt(cv3, art, done ? null : (w ? maskOf(w.painted) : new Uint8Array(art.n * art.n))); pic.append(cv3);
    if (done) pic.insertAdjacentHTML('beforeend', '<span class="badge" aria-hidden="true">✓</span>');
    const nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = it.name; b.append(pic, nm);
    b.onclick = () => done ? viewDone({ ...art, order:DB.done[it.id].order }, it.name.toLocaleUpperCase('tr'), { id:it.id }) : startBuiltin(it.id);
    cards.append(b);
  });
  B.append(cards);
  B.insertAdjacentHTML('beforeend', '<p class="dl" style="margin-top:20px">YAKLAŞAN ETKİNLİKLER</p><div class="uplist">' + [...EVENTS.filter(e => e.id !== ev.id).map(e => [e.name, e.start, e.end]), ...UPCOMING].map(([n, a, b2]) => `<div class="uprow"><span>${n}</span><small>${fmtMD(a)} – ${fmtMD(b2)}</small></div>`).join('') + '</div>');
  const tb = document.createElement('button'); tb.type = 'button'; tb.className = 'linkbtn'; tb.style.cssText = 'display:block;margin:16px auto 0';
  tb.textContent = DB.testEvent ? 'Test modunu kapat' : 'Yılbaşı etkinliğini şimdi dene (test)';
  tb.onclick = () => { DB.testEvent = DB.testEvent ? null : 'yilbasi'; save(); const ev2 = activeEvent(); if (ev2) openEvent(ev2.id); else { show('home'); refreshHome(); } };
  B.append(tb);
  show('city');
}
$('#eventBtn').onclick = () => { const ev = activeEvent(); if (ev) openEvent(ev.id); };

