/* ---------- stars, powers ---------- */
const totalStars = () => Object.values(DB.stars).reduce((a, b) => a + b, 0);
const starStr = n => '★'.repeat(n) + '☆'.repeat(3 - n);
const POWERS = {
  kova: { id:'kova', name:'Boya Kovası', short:'Kova', city:'istanbul', cost:10, desc:'Dokunduğun yerdeki aynı numaralı bağlı alanı tek seferde boyayla doldurur.' },
  degnek: { id:'degnek', name:'Altın Fırça', short:'Fırça', city:'paris', cost:30, desc:'Seçili rengin kalan bütün karelerini tek bir fırça darbesiyle boyar.' },
  bomba: { id:'bomba', name:'Boya Patlaması', short:'Patlama', city:'roma', cost:15, desc:'Dokunduğun yerde boya patlar, çevresindeki 5×5 alanı boyar.' },
  buyutec: { id:'buyutec', name:'Kartal Gözü', short:'Göz', city:'kahire', cost:5, desc:'Seçili rengin gözden kaçan karelerini birkaç saniye parlatır.' },
  neon: { id:'neon', name:'Gökkuşağı', short:'Gökkuşağı', city:'tokyo', cost:0, desc:'Boyadığın kareler ışıl ışıl parlar. Açıp kapatabilirsin.' },
};
const MINIS = {
  istanbul: { name:'Martılara simit at', desc:'Martılar geçerken ekrana dokun, simit at. Her doyan martı 1 coin.', ready:true },
  paris: { name:'Kruvasan yakala' }, roma: { name:'Pizza ustası' }, kahire: { name:'Kumda hazine' }, tokyo: { name:'Sushi bandı' }, newyork: { name:'Taksi çağır' },
};
const cityLabel = id => (CITIES.find(c => c.id === id) || {}).name || '';
const PW_EMO = { kova:'🪣', degnek:'🖌️', bomba:'💥', buyutec:'🦅', neon:'🌈' };
const COINSM = COINSVG;
function buildPowers(){
  const w = $('#pw'); w.innerHTML = `<span class="coinmini">${COINSVG}<span class="coinN">${DB.coins}</span></span>`;
  if (mode !== 'paint' || !A || !A.idx) return;
  // Bütün güçler her resimde görünür; açılmamışlar kilitli (🔒), dokununca nerede açıldığı yazar.
  let shown = 0;
  Object.values(POWERS).forEach(p => {
    const open = !!DB.tickets[p.city];
    const rent = !open && isDaily && p.id !== 'neon';
    shown++;
    const b = document.createElement('button'); b.type = 'button';
    b.className = 'pwb box' + (open || rent ? '' : ' locked') + ((p.id === 'bomba' && bombArmed) || (p.id === 'kova' && kovaArmed) || (p.id === 'neon' && DB.neon) ? ' on' : '');
    const cost = rent ? p.cost * 2 : p.cost;
    const tail = !open && !rent ? '🔒' : p.id === 'neon' ? `<i class="tg${DB.neon ? ' on' : ''}"></i>` : `${COINSM}${cost}`;
    b.innerHTML = `<span class="pe" aria-hidden="true">${PW_EMO[p.id]}</span><span class="pc">${tail}</span>`;
    b.setAttribute('aria-label', open || rent ? TL('{0}. {1}', p.name, p.desc) + (cost ? TL(' Bedeli {0} coin.', cost) : '') : TL('{0}, {1} şehrine gidince açılır.', p.name, cityLabel(p.city)));
    b.onclick = () => usePower(p.id);
    w.append(b);
  });
  if (!shown) return;
  const q = document.createElement('button'); q.type = 'button'; q.className = 'pwb box info' + (DB.flags && DB.flags.pwInfo ? '' : ' new'); q.textContent = '?';
  q.setAttribute('aria-label', 'Güçler ne işe yarar?'); q.onclick = openPwInfo; w.append(q);
}
function openPwInfo(){
  DB.flags = DB.flags || {}; if (!DB.flags.pwInfo){ DB.flags.pwInfo = true; save(); const q = document.querySelector('#pw .info'); if (q) q.classList.remove('new'); }
  const L0 = $('#pwList'); L0.innerHTML = '';
  Object.values(POWERS).forEach(p => {
    const open = !!DB.tickets[p.city], d = document.createElement('div');
    d.className = 'pwrow' + (open ? '' : ' locked');
    d.innerHTML = '<span class="pe" aria-hidden="true"></span><div><b></b><p></p><small></small></div>';
    d.querySelector('.pe').textContent = PW_EMO[p.id]; d.querySelector('b').textContent = p.name; d.querySelector('p').textContent = p.desc;
    d.querySelector('small').textContent = !open ? (p.id === 'neon' ? TL('{0} şehrine gidince açılır.', cityLabel(p.city)) : TL('{0} şehrine gidince açılır. O zamana kadar günün resminde iki kat fiyatla kullanabilirsin: {1} coin.', cityLabel(p.city), p.cost * 2))
      : p.cost ? TL('Bedeli: {0} coin', p.cost) : 'Bedava. Dokununca açılır, bir daha dokununca kapanır.';
    L0.append(d);
  });
  $('#pwinfo').classList.add('on');
}
function pay(c){ DB.coins -= c; save(); setCoins(); }
function usePower(id){
  const p = POWERS[id];
  const rent = !DB.tickets[p.city]; if (rent && !(isDaily && id !== 'neon')){ msg(TL('{0}, {1} biletini alınca açılır. {2}', p.name, cityLabel(p.city), p.desc) + (p.id !== 'neon' ? ' ' + TL('O zamana kadar günün resminde iki kat fiyatla kullanabilirsin: {0} coin.', p.cost * 2) : '')); return; }
  const cost = rent ? p.cost * 2 : p.cost;
  if (mode !== 'paint') return;
  if (id === 'neon'){ DB.neon = !DB.neon; save(); buildPowers(); dirty = true; return; }
  if (id === 'bomba' && bombArmed){ bombArmed = false; buildPowers(); $('#tip').classList.add('off'); return; }
  if (id === 'kova' && kovaArmed){ kovaArmed = false; buildPowers(); $('#tip').classList.add('off'); return; }
  if (DB.coins < cost){ needCoins(TL('{0} için {1} coin gerekiyor, sende {2} var.', p.name, cost, DB.coins), () => buildPowers()); return; }
  if (id === 'degnek'){
    if (remain[sel] <= 0) return;
    pay(cost); usedPower = true;
    const cx = (cv.width / 2 - view.ox) / view.s, cy = (cv.height / 2 - view.oy) / view.s;
    for (let i = 0; i < A.idx.length; i++) if (!painted[i] && A.idx[i] === sel){ const d = Math.hypot(i % A.n + .5 - cx, Math.floor(i / A.n) + .5 - cy); pending.push({ i, t: now + d * 0.03, d: Math.round(d) }); }
    pending.sort((a, b) => a.t - b.t); lastFloodD = -1;
    [880, 1175, 1568].forEach((f, k) => tone(f, 0.12, k * 0.05, 'triangle', 0.05));
  } else if (id === 'kova'){
    bombArmed = false; kovaArmed = true; kovaCost = cost; buildPowers(); $('#tip').textContent = 'Kovayı dökmek istediğin alana dokun'; $('#tip').classList.remove('off');
  } else if (id === 'bomba'){
    kovaArmed = false; bombArmed = true; bombCost = cost; buildPowers(); $('#tip').textContent = 'Boyayı patlatmak istediğin yere dokun'; $('#tip').classList.remove('off');
  } else if (id === 'buyutec'){
    pay(cost); usedPower = true; magT = now; fit(); tone(660, 0.2, 0, 'triangle', 0.05);
  }
}
function pourKova(ci){
  const j = A.idx[ci], n = A.n, seen = new Uint8Array(n * n), q = [ci]; seen[ci] = 1; let any = false;
  while (q.length){ const i = q.shift(); if (!painted[i]){ any = true; break; } const x = i % n, y = Math.floor(i / n); [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx, dy]) => { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= n || Y >= n) return; const k = Y * n + X; if (!seen[k] && A.idx[k] === j){ seen[k] = 1; q.push(k); } }); }
  if (!any){ msg('Bu alan zaten boyanmış. Kovayı boş bir alana dök, coin harcanmadı.'); return; }
  kovaArmed = false; pay(kovaCost); usedPower = true; buildPowers(); $('#tip').classList.add('off');
  lastFloodD = -1; flood(ci); tone(196, 0.18, 0, 'triangle', 0.05); tone(392, 0.22, 0.06, 'triangle', 0.04);
  if (sel !== j && remain[j] > 0){ sel = j; refreshPal(); }
}
function explode(ci){
  bombArmed = false; pay(bombCost); usedPower = true; buildPowers(); $('#tip').classList.add('off');
  const x0 = ci % A.n, y0 = Math.floor(ci / A.n), R = 2;
  for (let y = y0 - R; y <= y0 + R; y++) for (let x = x0 - R; x <= x0 + R; x++){
    if (x < 0 || y < 0 || x >= A.n || y >= A.n) continue;
    const i = y * A.n + x; if (!painted[i]){ const d = Math.max(Math.abs(x - x0), Math.abs(y - y0)); pending.push({ i, t: now + d * 0.06, d }); }
  }
  pending.sort((a, b) => a.t - b.t); lastFloodD = -1;
  boomT = now; boomC = ci; tone(90, 0.3, 0, 'sawtooth', 0.06); tone(60, 0.4, 0.02, 'square', 0.04);
  if (navigator.vibrate && !DB.noVibe) try { navigator.vibrate(30); } catch(e){}
  for (let k = 0; k < 24; k++){ const a = Math.random() * TAU, sp = 3 + Math.random() * 6; parts.push({ x:x0 + .5, y:y0 + .5, vx:Math.cos(a) * sp, vy:Math.sin(a) * sp, life:0.6, max:0.6, c:['#F2B33D','#FFFFFF','#E86A3A'][k % 3] }); }
}

