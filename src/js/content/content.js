/* ---------- içerik (CONTENT) ----------
   Albümler, şehirler, günün resmi, etkinlikler ve sponsorlu resim koddan ayrı,
   sayfanın başındaki <script id="pa-content"> veri bloğunda duruyor.
   Resimler çizim kodu değil, piksel verisi: n (ızgara), pal (renkler), px (sıkıştırılmış kareler).
   Mobil sürümde aynı veri sunucudan indirilebilir; oyun kodu değişmez. */
const ART_ALPH = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function decodeArt(a, id){
  const N = a.n * a.n, idx = new Array(N), s = a.px; let i = 0, p = 0;
  while (p < s.length){
    const v = ART_ALPH.indexOf(s[p++]); let q = p;
    while (q < s.length && s.charCodeAt(q) >= 48 && s.charCodeAt(q) <= 57) q++;
    const r = q > p ? +s.slice(p, q) : 1; p = q;
    for (let k = 0; k < r && i < N; k++) idx[i++] = v;
  }
  if (i !== N) console.warn('Piksel verisi eksik:', id, i, '/', N);
  while (i < N) idx[i++] = 0;
  return { id, n:a.n, pal:a.pal.slice(), idx };
}
const mkItem = o => ({ id:o.id, name:o.name, n:o.art.n, art:o.art });
const ALBUMS = CONTENT.albums.map(a => ({ id:a.id, name:a.name, items:a.items.map(mkItem) }));
const ALBUM_COLOR = Object.fromEntries(CONTENT.albums.map(a => [a.id, a.color]));
const CITIES = CONTENT.cities.map(c => ({ id:c.id, name:c.name, color:c.color, price:c.price, stars:c.stars, power:c.power, guide:{ name:c.guide.name, ini:c.guide.ini, line:c.guide.line }, items:c.items.map(mkItem) }));
const SPONSOR = (o => ({ id:o.id, kind:'sponsor', name:o.name, brand:o.brand, color:o.color, coupon:o.coupon, offer:o.offer, items:o.items.map(mkItem) }))(CONTENT.sponsor);
const DAILY = { id:CONTENT.daily.id, kind:'daily', name:CONTENT.daily.name, items:CONTENT.daily.items.map(mkItem) };
const EVENTS = CONTENT.events.map(e => ({ id:e.id, name:e.name, color:e.color, start:e.start, end:e.end, frame:e.frame, reward:e.reward, items:e.items.map(mkItem) }));
const UPCOMING = CONTENT.upcoming.map(u => [u.name, u.start, u.end]);
const FACTS = {}, QUIZ = {}, SOUV = {};
[...CONTENT.albums, ...CONTENT.cities, CONTENT.daily, ...CONTENT.events, CONTENT.sponsor].forEach(g => g.items.forEach(o => {
  if (o.fact) FACTS[o.id] = o.fact;
  if (o.quiz) QUIZ[o.id] = o.quiz;
  if (o.souvenir) SOUV[o.id] = { name:o.souvenir.name, art:o.souvenir.art };
}));
const BYE = Object.fromEntries(CONTENT.cities.filter(c => c.bye).map(c => [c.id, c.bye]));
const GEO = Object.fromEntries(CONTENT.cities.map(c => [c.id, c.map]));
const GUIDE_ARTDATA = Object.fromEntries(CONTENT.cities.map(c => [c.id, c.guide.art]));
/* Türkiye Turu: 81 il, 7 bölge. Resmi olan iller açık, diğerleri haritada "yakında". */
const TRK = CONTENT.turkiye || { regions:[], iller:[] };
const TR_REG = Object.fromEntries(TRK.regions.map(r => [r.id, r]));
const ILLER = TRK.iller.map(i => { const r = TR_REG[i.region] || {}; const gd = r.guide || { name:'Rehber', ini:'TR' };
  return { id:i.id, plaka:i.plaka, name:i.name, region:i.region, geo:i.geo, nb:i.nb, color:r.color, guide:{ name:gd.name, ini:gd.ini, line:i.line || '' }, items:(i.items || []).map(mkItem) }; });
const IL_OPEN = ILLER.filter(i => i.items.length);
TRK.iller.forEach(i => { (i.items || []).forEach(o => { if (o.fact) FACTS[o.id] = o.fact; if (o.quiz) QUIZ[o.id] = o.quiz; if (o.souvenir) SOUV[o.id] = { name:o.souvenir.name, art:o.souvenir.art }; });
  if (i.bye) BYE[i.id] = i.bye; const r = TR_REG[i.region]; if (r && r.guide && r.guide.art) GUIDE_ARTDATA[i.id] = r.guide.art; });
const ilDone = c => c.items.length > 0 && c.items.every(it => DB.done[it.id]);
const plk = n => String(n).padStart(2, '0');
const TR_TICKET = 120;
const ARCS = (g, cx, cy, list) => list.forEach(([r, c]) => circ(g, cx, cy, r, c));
const petals = (g, cx, cy, n, d, rx, ry, c, off = 0) => { for (let k = 0; k < n; k++){ const a = off + k * TAU / n; ell(g, cx + Math.cos(a) * d, cy + Math.sin(a) * d, rx, ry, c, a); } };
const line = (g, pts, w, c) => { g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i+1]); g.stroke(); };


const ITEMS = {}; SPONSOR.items.forEach(it => { it.album = SPONSOR; }); EVENTS.forEach(ev => { ev.kind = 'event'; ev.items.forEach(it => { it.album = ev; ITEMS[it.id] = it; }); }); DAILY.items.forEach(it => { it.album = DAILY; ITEMS[it.id] = it; });
function dailyState(){
  const t = today();
  if (!DB.daily || DB.daily.date !== t || !ITEMS[DB.daily.id]){
    const d = new Date(), idx = Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000) % DAILY.items.length, id = DAILY.items[idx].id;
    delete DB.done[id]; delete DB.wip[id]; delete DB.stars[id]; DB.daily = { date:t, id, done:false }; save();
  }
  return DB.daily;
}
function dailyReward(){
  const y = new Date(Date.now() - 86400000), ys = y.getFullYear() + '-' + (y.getMonth() + 1) + '-' + y.getDate(), s0 = DB.streak || { n:0, last:'' };
  const n = s0.last === ys ? s0.n + 1 : 1; DB.streak = { n, last:today() }; DB.stats.bestStreak = Math.max(DB.stats.bestStreak || 0, n);
  return { n, bonus:50 + Math.min(n, 7) * 10 };
} ALBUMS.forEach(a => { a.kind = 'album'; a.items.forEach(it => { it.album = a; ITEMS[it.id] = it; }); }); CITIES.forEach(c => { c.kind = 'city'; c.items.forEach(it => { it.album = c; ITEMS[it.id] = it; }); }); IL_OPEN.forEach(c => { c.kind = 'il'; c.items.forEach(it => { it.album = c; ITEMS[it.id] = it; }); }); SPONSOR.items.forEach(it => { ITEMS[it.id] = it; });
const TOTAL = ALBUMS.reduce((t, a) => t + a.items.length, 0);

function drawExact(it){
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d');
  it.draw(g);
  const n = it.n, d = g.getImageData(0, 0, 512, 512).data, px = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){
    const sx = Math.floor((x + .5) * 512 / n), sy = Math.floor((y + .5) * 512 / n), i = (sy * 512 + sx) * 4;
    px.push([d[i], d[i+1], d[i+2]]);
  }
  const counts = new Map(); px.forEach(p => { const k = p.join(','); counts.set(k, (counts.get(k) || 0) + 1); });
  const cols = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([k, c2]) => ({ c:k.split(',').map(Number), n:c2 }));
  const pal = [];
  cols.forEach(o => { const near = pal.find(p => rdist(p.c, o.c) < 1500); if (near) near.n += o.n; else pal.push({ c:o.c, n:o.n }); });
  const minN = Math.max(3, px.length * 0.004);
  let keep = pal.filter(p => p.n >= minN); if (!keep.length) keep = pal.slice(0, 1);
  keep.sort((a, b) => lum(a.c) - lum(b.c));
  const idx = px.map(p => { let bi = 0, bd = Infinity; keep.forEach((q, j) => { const dd = rdist(p, q.c); if (dd < bd){ bd = dd; bi = j; } }); return bi; });
  return { id:it.id, n, pal:keep.map(p => hex(p.c)), idx };
}
const artCache = {};
const getArt = id => artCache[id] || (artCache[id] = ITEMS[id].art ? decodeArt(ITEMS[id].art, id) : drawExact(ITEMS[id]));
const HOME_ART = decodeArt(CONTENT.home, 'kofte');

