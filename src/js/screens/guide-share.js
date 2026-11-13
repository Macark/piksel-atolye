/* ---------- guide portraits + share card ---------- */
const face = (g, bg, skin) => { rect(g,0,0,512,512,bg); ell(g,256,300,128,150,skin); };
const eyes = (g, c) => { rect(g,180,256,36,36,c); rect(g,296,256,36,36,c); };
const guideCache = {};
function guideArt(id){ return guideCache[id] || (guideCache[id] = decodeArt(GUIDE_ARTDATA[id] || GUIDE_ARTDATA.istanbul, 'g_' + id)); }
let cardCanvas = null;
const FRAMES = { polaroid:{ name:'Polaroid', cost:0 }, altin:{ name:'Altın', cost:80 }, film:{ name:'Film şeridi', cost:60 }, kalp:{ name:'Kalpli', cost:60 }, dogum:{ name:'Doğum günü', cost:60 }, yilbasi:{ name:'Yılbaşı', cost:60 }, yaz:{ name:'Yaz', cost:60 }, cadilar:{ name:'Cadılar Bayramı', cost:60 }, sonbahar:{ name:'Sonbahar', cost:0, event:'Sonbahar Şenliği' } };
const STICKERS = {
  kalp:{ name:'Kalp', c:'#E8384F', m:['.XX..XX.','XXXXXXXX','XXXXXXXX','XXXXXXXX','.XXXXXX.','..XXXX..','...XX...','........'] },
  yildiz:{ name:'Yıldız', c:'#F2B33D', m:['...XX...','...XX...','XXXXXXXX','.XXXXXX.','..XXXX..','.XXXXXX.','.XX..XX.','X......X'] },
  tac:{ name:'Taç', c:'#F2B33D', m:['........','X..XX..X','XX.XX.XX','XXXXXXXX','XXXXXXXX','XXXXXXXX','.XXXXXX.','........'] },
  pati:{ name:'Pati', c:'#6B4A3A', m:['.X.XX.X.','.X.XX.X.','........','X.XXXX.X','X.XXXX.X','.XXXXXX.','.XXXXXX.','..XXXX..'] },
};
const QUICK = ['İyi ki doğdun!', 'Seni seviyorum', 'İyi ki varsın', 'Geçmiş olsun', 'Canım arkadaşım'];
let viewRec = null, cardBaseURL = '';
function drawSticker(g, id, x, y, u){
  const st = STICKERS[id]; if (!st) return;
  g.fillStyle = '#FFFFFF'; st.m.forEach((row, r) => [...row].forEach((ch, q) => { if (ch === 'X') g.fillRect(x + q * u - 4, y + r * u - 4, u + 8, u + 8); }));
  g.fillStyle = '#2A1D14'; st.m.forEach((row, r) => [...row].forEach((ch, q) => { if (ch === 'X') g.fillRect(x + q * u - 1, y + r * u - 1, u + 2, u + 2); }));
  g.fillStyle = st.c; st.m.forEach((row, r) => [...row].forEach((ch, q) => { if (ch === 'X') g.fillRect(x + q * u, y + r * u, u, u); }));
}
function renderCard(art, cap){
  const fr = (viewRec && viewRec.frame && DB.frames[viewRec.frame]) ? viewRec.frame : 'polaroid', sts = (viewRec && viewRec.stickers) || [];
  const c = document.createElement('canvas'); drawArt(c, art);
  const S = art.n * 16, pad = 48, W2 = S + pad * 2, H2 = S + pad + 200;
  const k = document.createElement('canvas'); k.width = W2; k.height = H2; const g = k.getContext('2d');
  let ink = '#2A1D14', brand = '#C4552C';
  if (fr === 'film'){
    g.fillStyle = '#161616'; g.fillRect(0, 0, W2, H2); ink = '#FFF7EA'; brand = '#FFE135';
    g.fillStyle = '#FFF7EA'; for (let y = 16; y < H2 - 30; y += 52){ g.fillRect(10, y, 22, 30); g.fillRect(W2 - 32, y, 22, 30); }
  } else if (fr === 'altin'){
    g.fillStyle = '#2A1D14'; g.fillRect(0, 0, W2, H2); g.fillStyle = '#B07B12'; g.fillRect(6, 6, W2 - 12, H2 - 12);
    g.fillStyle = '#E0A526'; g.fillRect(12, 12, W2 - 24, H2 - 24); g.fillStyle = '#FFE08A'; g.fillRect(18, 18, W2 - 36, 6); g.fillRect(18, 18, 6, H2 - 36);
    g.fillStyle = '#B07B12'; g.fillRect(26, 26, W2 - 52, H2 - 52); g.fillStyle = '#FFF7EA'; g.fillRect(32, 32, W2 - 64, H2 - 64);
    g.fillStyle = '#2A1D14'; [[10, 10], [W2 - 24, 10], [10, H2 - 24], [W2 - 24, H2 - 24]].forEach(([x, y]) => g.fillRect(x, y, 14, 14)); brand = '#B07B12';
  } else if (fr === 'kalp'){
    g.fillStyle = '#D7263D'; g.fillRect(0, 0, W2, H2); g.fillStyle = '#FFE4EC'; g.fillRect(10, 10, W2 - 20, H2 - 20); brand = '#D7263D';
    const hm = STICKERS.kalp.m; g.fillStyle = '#F48FB1';
    for (let x = 22; x < W2 - 40; x += 46){ hm.forEach((row, r) => [...row].forEach((ch, q) => { if (ch === 'X'){ g.fillRect(x + q * 3, 16 + r * 3, 3, 3); if (Math.abs(x + 12 - W2 / 2) > 120) g.fillRect(x + q * 3, H2 - 40 + r * 3, 3, 3); } })); }
  } else if (fr === 'dogum'){
    g.fillStyle = '#2A1D14'; g.fillRect(0, 0, W2, H2); g.fillStyle = '#FFF7EA'; g.fillRect(8, 8, W2 - 16, H2 - 16);
    const r = rng(art.n * 7 + 3), cc = ['#E8384F', '#F2B33D', '#3E8E5A', '#2E7DBA', '#8A4FB0'];
    for (let q = 0; q < 90; q++){ g.fillStyle = cc[q % cc.length]; g.fillRect(14 + Math.floor(r() * (W2 - 38)), 14 + Math.floor(r() * (H2 - 38)), 10, 10); }
    g.fillStyle = '#FFF7EA'; g.fillRect(pad - 14, S + pad + 40, S + 28, 66);
    for (let x = 14, q = 0; x < W2 - 40; x += 44, q++){ g.fillStyle = cc[q % cc.length]; g.beginPath(); g.moveTo(x, 10); g.lineTo(x + 40, 10); g.lineTo(x + 20, 40); g.closePath(); g.fill(); }
  } else if (fr === 'yilbasi'){
    g.fillStyle = '#B3261E'; g.fillRect(0, 0, W2, H2);
    for (let q = 0, x = 0; x < W2; x += 16, q++){ g.fillStyle = q % 2 ? '#FFFFFF' : '#B3261E'; g.fillRect(x, 0, 16, 12); g.fillRect(x, H2 - 12, 16, 12); }
    for (let q = 0, y = 0; y < H2; y += 16, q++){ g.fillStyle = q % 2 ? '#FFFFFF' : '#B3261E'; g.fillRect(0, y, 12, 16); g.fillRect(W2 - 12, y, 12, 16); }
    g.fillStyle = '#1F5A36'; g.fillRect(12, 12, W2 - 24, H2 - 24);
    const r = rng(art.n * 5 + 1); g.fillStyle = '#FFFFFF';
    for (let q = 0; q < 60; q++){ const x = 18 + Math.floor(r() * (W2 - 52)), y = 50 + Math.floor(r() * (H2 - 84)), big = r() < 0.4; if (big){ g.fillRect(x + 5, y, 5, 15); g.fillRect(x, y + 5, 15, 5); } else g.fillRect(x, y, 5, 5); }
    g.fillStyle = '#F4FAFF'; g.fillRect(pad - 16, S + pad + 34, S + 32, 150);
    g.fillStyle = '#123A22'; g.fillRect(12, 12, W2 - 24, 8);
    const bulbs = ['#D7263D', '#FFFFFF', '#2E7DBA'];
    for (let x = 22, q = 0; x < W2 - 30; x += 30, q++){ g.fillStyle = '#123A22'; g.fillRect(x + 5, 18, 3, 8 + (q % 2) * 6); g.fillStyle = bulbs[q % 3]; g.fillRect(x, 24 + (q % 2) * 6, 13, 15); }
    brand = '#B3261E';
  } else if (fr === 'sonbahar'){
    g.fillStyle = '#7A3E1E'; g.fillRect(0, 0, W2, H2); g.fillStyle = '#FFF1DE'; g.fillRect(10, 10, W2 - 20, H2 - 20); brand = '#D9461A';
    const lf = ['..X..', '.XXX.', 'XXXXX', '.XXX.', '..X..'], cc = ['#D9461A', '#F28C28', '#F2B33D', '#A8361A'], r = rng(art.n * 11 + 2);
    const leaf = (x, y, c) => { g.fillStyle = c; lf.forEach((row, rr4) => [...row].forEach((ch, q) => { if (ch === 'X') g.fillRect(x + q * 4, y + rr4 * 4, 4, 4); })); };
    for (let x = 14; x < W2 - 24; x += 28) leaf(x, 14 + Math.floor(r() * 8), cc[Math.floor(r() * 4)]);
    for (let y = 46; y < H2 - 40; y += 34){ leaf(12, y, cc[Math.floor(r() * 4)]); leaf(W2 - 32, y, cc[Math.floor(r() * 4)]); }
    for (let x = 14; x < W2 - 24; x += 28) if (Math.abs(x + 10 - W2 / 2) > 140) leaf(x, H2 - 34, cc[Math.floor(r() * 4)]);
  } else if (fr === 'yaz'){
    g.fillStyle = '#2EB8B0'; g.fillRect(0, 0, W2, H2); g.fillStyle = '#FFF4D6'; g.fillRect(10, 10, W2 - 20, H2 - 20); brand = '#2E7DBA';
    for (let row = 0; row < 3; row++) for (let x = 12 + (row % 2) * 14; x < W2 - 40; x += 28){ if (Math.abs(x + 14 - W2 / 2) < 120) continue; g.fillStyle = row === 1 ? '#5FB4E8' : '#9AD9F2'; g.fillRect(x, H2 - 48 + row * 11, 14, 5); g.fillRect(x + 14, H2 - 43 + row * 11, 14, 5); }
    g.fillStyle = '#F2B33D'; g.fillRect(14, 14, 24, 24); g.fillStyle = '#FFE08A'; g.fillRect(18, 18, 9, 9);
    g.fillStyle = '#F2B33D'; [[42, 22], [22, 42], [40, 40]].forEach(([x, y]) => g.fillRect(x, y, 6, 6));
  } else if (fr === 'cadilar'){
    g.fillStyle = '#F28C28'; g.fillRect(0, 0, W2, H2); g.fillStyle = '#1B1026'; g.fillRect(10, 10, W2 - 20, H2 - 20); ink = '#FFF7EA'; brand = '#F28C28';
    const bat = ['X.X...X.X', 'XXXXXXXXX', '.XX.X.XX.'], r = rng(art.n * 3 + 9);
    const drawBat = (bx, by) => { g.fillStyle = '#7A5AA8'; bat.forEach((row, rr3) => [...row].forEach((chh, q) => { if (chh === 'X') g.fillRect(bx + q * 3, by + rr3 * 3, 3, 3); })); };
    for (let x = 18; x < W2 - 50; x += 58) drawBat(x + Math.floor(r() * 10), 16 + Math.floor(r() * 12));
    for (let x = 18; x < W2 - 50; x += 58){ if (Math.abs(x + 14 - W2 / 2) < 130) continue; g.fillStyle = '#F28C28'; g.fillRect(x, H2 - 40, 22, 18); g.fillRect(x + 3, H2 - 43, 16, 3); g.fillStyle = '#3E8E3E'; g.fillRect(x + 9, H2 - 47, 4, 5); g.fillStyle = '#1B1026'; g.fillRect(x + 5, H2 - 35, 4, 4); g.fillRect(x + 13, H2 - 35, 4, 4); g.fillRect(x + 6, H2 - 28, 10, 3); }
  } else {
    g.fillStyle = '#2A1D14'; g.fillRect(0, 0, W2, H2); g.fillStyle = '#FFF7EA'; g.fillRect(8, 8, W2 - 16, H2 - 16);
    g.fillStyle = '#EBDDC4'; g.fillRect(8, H2 - 22, W2 - 16, 14); g.fillRect(W2 - 22, 8, 14, H2 - 16);
  }
  g.fillStyle = '#2A1D14'; g.fillRect(pad - 8, pad - 8, S + 16, S + 16);
  g.imageSmoothingEnabled = false; g.drawImage(c, pad, pad, S, S);
  if (fr === 'polaroid'){
    const cs = 40; g.fillStyle = '#C4552C';
    [[pad - 16, pad - 16, 1, 1], [pad + S + 16, pad - 16, -1, 1], [pad - 16, pad + S + 16, 1, -1], [pad + S + 16, pad + S + 16, -1, -1]].forEach(([x, y, sx, sy]) => {
      for (let q = 0; q < 5; q++) g.fillRect(sx > 0 ? x : x - (cs - q * 8), sy > 0 ? y + q * 8 : y - (q + 1) * 8, cs - q * 8, 8);
    });
  }
  if (fr === 'yilbasi'){
    g.fillStyle = '#FFFFFF'; for (let x = pad - 8, q = 0; x < pad + S + 8; x += 26, q++) g.fillRect(x, pad + S - 12 - (q % 3) * 6, 26, 26);
    const hx = pad - 30, hy = pad - 38;
    g.fillStyle = '#D7263D'; g.beginPath(); g.moveTo(hx + 6, hy + 70); g.lineTo(hx + 56, hy + 8); g.lineTo(hx + 98, hy + 70); g.closePath(); g.fill();
    g.fillStyle = '#FFFFFF'; g.fillRect(hx - 2, hy + 62, 110, 22); g.fillRect(hx + 44, hy - 8, 24, 24);
    const tx = pad + S - 34, ty = pad + S - 112;
    g.fillStyle = '#2F9A50'; [[0, 46, 28], [26, 70, 40], [54, 98, 52]].forEach(([dy, h2, w]) => { g.beginPath(); g.moveTo(tx, ty + dy); g.lineTo(tx - w, ty + h2); g.lineTo(tx + w, ty + h2); g.closePath(); g.fill(); });
    g.fillStyle = '#7A4A2A'; g.fillRect(tx - 8, ty + 98, 16, 16);
    g.fillStyle = '#FFFFFF'; g.fillRect(tx - 7, ty - 12, 14, 14);
    g.fillStyle = '#D7263D'; [[-12, 38], [12, 60], [-22, 82], [24, 86]].forEach(([dx, dy]) => g.fillRect(tx + dx, ty + dy, 9, 9));
    g.fillStyle = '#2E7DBA'; [[8, 34], [-16, 60], [2, 84]].forEach(([dx, dy]) => g.fillRect(tx + dx, ty + dy, 9, 9));
  }
  const u = 9, sp = [[pad + S - 46, pad - 26], [pad - 26, pad + S - 46], [pad - 26, pad - 26], [pad + S - 46, pad + S - 46]];
  sts.slice(0, 4).forEach((id, q) => drawSticker(g, id, sp[q][0], sp[q][1], u));
  g.fillStyle = ink; g.textAlign = 'center'; g.textBaseline = 'middle';
  let fs = 46; g.font = `700 ${fs}px Silkscreen, "Pixelify Sans", monospace`;
  while (g.measureText(cap).width > W2 - 90 && fs > 20){ fs -= 2; g.font = `700 ${fs}px Silkscreen, "Pixelify Sans", monospace`; }
  g.fillText(cap, W2 / 2, S + pad + 72);
  const pal = art.pal, gap = 6, d = Math.max(8, Math.min(22, Math.floor((W2 - 120) / pal.length) - gap)), tw = pal.length * (d + gap) - gap;
  let x = (W2 - tw) / 2; pal.forEach(col => { g.fillStyle = (fr === 'film' || fr === 'cadilar') ? '#FFF7EA' : '#2A1D14'; g.fillRect(x - 2, S + pad + 114, d + 4, d + 4); g.fillStyle = col; g.fillRect(x, S + pad + 116, d, d); x += d + gap; });
  g.fillStyle = brand; g.font = '700 22px Silkscreen, "Pixelify Sans", monospace'; g.fillText('PİKSEL ATÖLYE', W2 / 2, S + pad + 164);
  cardBaseURL = k.toDataURL('image/png');
  const emo = (viewRec && viewRec.emo) || [];
  g.textAlign = 'center'; g.textBaseline = 'middle';
  emo.forEach(o => { g.save(); g.translate(o.x * W2, o.y * H2); g.rotate(o.r); g.font = Math.round(o.s * W2) + 'px ' + EMOFONT; g.fillText(o.e, 0, 0); g.restore(); });
  cardCanvas = k; const url = emo.length ? k.toDataURL('image/png') : cardBaseURL; $('#finalImg').src = url; $('#decoImg').src = url;
  $('#emoCtl').hidden = !(emoSel >= 0 && emo[emoSel]);
}
function openDeco(){
  if (!viewRec){ msg('Bu resim süslenemiyor.'); return; }
  setCoins();
  const redraw = () => { renderCard(viewArt, $('#capIn').value); build(); };
  emoSel = -1; $('#emoCtl').hidden = true;
  const eg = $('#decoEmo');
  if (!eg.children.length) SH_EMOJIS.forEach(e => {
    const b = document.createElement('button'); b.type = 'button'; b.textContent = e; b.setAttribute('aria-label', e + ' ekle');
    b.onclick = () => {
      if (!viewRec) return; const list = viewRec.emo || (viewRec.emo = []);
      if (list.length >= 12){ msg('Bir karta en fazla 12 emoji ekleyebilirsin. Birini seçip silerek yer açabilirsin.'); return; }
      const spots = [[0.2, 0.14], [0.8, 0.14], [0.2, 0.58], [0.8, 0.58], [0.5, 0.1], [0.5, 0.62]], sp = spots[list.length % spots.length];
      list.push({ e, x:sp[0], y:sp[1], s:0.17, r:(Math.random() - 0.5) * 0.5 }); emoSel = list.length - 1; save(); renderCard(viewArt, $('#capIn').value);
    };
    eg.append(b);
  });
  const build = () => {
    const fc = $('#frameChips'); fc.innerHTML = '';
    Object.entries(FRAMES).forEach(([id, f]) => {
      const own = !!DB.frames[id], b = document.createElement('button'); b.type = 'button'; b.className = 'chip';
      b.setAttribute('aria-pressed', String((viewRec.frame || 'polaroid') === id));
      b.innerHTML = f.name + (own ? '' : f.event ? ' <small>Etkinlik ödülü</small>' : ` <small>${COINSVG}${f.cost}</small>`);
      b.onclick = () => {
        if (!own && f.event){ msg(TL('{0} çerçevesi satılmaz. {1} etkinliğinin bütün resimlerini bitirenlere hediye edilir.', f.name, f.event)); return; }
        if (!own){
          if (DB.coins < f.cost){ needCoins(TL('{0} çerçevesi {1} coin, sende {2} var.', f.name, f.cost, DB.coins), () => { setCoins(); build(); }); return; }
          ask(TL('{0} çerçevesi {1} coin karşılığında alınsın mı? Bir kez alırsın, bütün resimlerinde kullanırsın.', f.name, f.cost), 'SATIN AL', () => { DB.frames[id] = true; pay(f.cost); viewRec.frame = id; save(); redraw(); });
          return;
        }
        viewRec.frame = id; save(); redraw();
      };
      fc.append(b);
    });
    const sc = $('#stickChips'); sc.innerHTML = '';
    Object.entries(STICKERS).forEach(([id, st]) => {
      const on = (viewRec.stickers || []).includes(id), b = document.createElement('button'); b.type = 'button'; b.className = 'chip';
      b.setAttribute('aria-pressed', String(on)); b.textContent = st.name;
      b.onclick = () => { const arr = viewRec.stickers || []; viewRec.stickers = on ? arr.filter(v => v !== id) : [...arr, id]; save(); redraw(); };
      sc.append(b);
    });
    const tc = $('#textChips'); tc.innerHTML = '';
    const dstr = new Date(viewRec.date || Date.now()).toLocaleDateString(LOC, { day:'numeric', month:'long', year:'numeric' });
    [...QUICK, dstr].forEach(t => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = t;
      b.setAttribute('aria-pressed', String($('#capIn').value === trx(t)));
      b.onclick = () => { $('#capIn').value = trx(t); viewRec.caption = trx(t); save(); redraw(); };
      tc.append(b);
    });
  };
  decoSnap = decoKey(); build(); $('#deco').classList.add('on'); $('#decoOk').focus();
}
let shareCanvas = null, shareFmt = 'story';
const SH_FILTERS = { normal:'Normal', sicak:'Sıcak', soguk:'Soğuk', sb:'Siyah beyaz', eski:'Eski foto' };
const SH_BGS = { konfeti:'Konfeti', duz:'Düz', gunbatimi:'Gün batımı', kalp:'Kalpler', yildiz:'Yıldızlı gece', bulut:'Bulutlar', deniz:'Deniz', pastel:'Pastel', dama:'Dama', izgara:'Neon ızgara', resim:'Resmin kendisi', renk:'Kendi rengin', foto:'Kendi fotoğrafın', yok:'Sadece kart' };
const SH_EMOJIS = ['❤️','😍','🥰','💕','💖','😘','💋', '🎉','🎂','🎈','🎁','✨','🥳','🎊', '🐾','🐱','🐶','🐰','🦊','🐻','🐼', '☀️','🌙','⭐','🌈','🌸','🍀','❄️', '🍕','🍰','☕','🍓','🍦','🍉','🍩', '😂','😎','🤪','👑','🔥','💯','👍', '✈️','🌍','🏖️','📸','🎵','⚽','🎄'];
const shareOpt = { filter:'normal', bg:'konfeti', emo:[], color:'#E0763F', photo:null };
let shBase = null, shBaseURL = '', emoSel = -1, shareFor = null;
const EMOFONT = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
const BG_SW0 = 0;
const BG_SW = { konfeti:'linear-gradient(135deg,#E0763F 0 33%,#2E7DBA 0 66%,#3E8E5A 0)', duz:'#2A1D14', gunbatimi:'linear-gradient(#5A3A7A,#E8785A,#F2B33D)', kalp:'#9C3558', yildiz:'#12163A', bulut:'#8FD3FF', deniz:'#1E5F9A', pastel:'linear-gradient(#F7C6D9,#C9D8F7)', dama:'repeating-conic-gradient(#3A2A20 0 25%,#8A6A50 0 50%) 0 0/8px 8px', izgara:'#1A1033', resim:'linear-gradient(135deg,#6A5A50,#F09A2E)', renk:'conic-gradient(#E8558F,#F0B93A,#3E8E5A,#2E7DBA,#8A4FB0,#E8558F)', foto:'#BBA88F', yok:'repeating-linear-gradient(45deg,transparent 0 5px,rgba(127,127,127,.35) 5px 7px)' };
let shTab = 'bg';
const FL_SW = { normal:'linear-gradient(135deg,#E0763F,#2E7DBA,#3E8E5A)', sicak:'linear-gradient(135deg,#F2B33D,#E0763F,#B3261E)', soguk:'linear-gradient(135deg,#9AD9F2,#2E7DBA,#1B1F4A)', sb:'linear-gradient(135deg,#F2F2F2,#8A8A8A,#1B1B1B)', eski:'linear-gradient(135deg,#F2D9B0,#B08A5A,#5A3A22)' };
document.querySelectorAll('#shTabs button').forEach(b => b.onclick = () => { shTab = b.dataset.p; document.querySelectorAll('#shTabs button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); $('#shBg').hidden = shTab !== 'bg'; $('#shFilter').hidden = shTab !== 'filter'; $('#shBgExtra').hidden = shTab !== 'bg'; $('#shHint').textContent = shTab === 'bg' ? 'Hikâyenin arkasına ne gelsin?' : 'Bütün görselin rengini değiştir.'; });
function buildShareChips(){
  const mk = (box, entries, isOn, pick) => { box.innerHTML = ''; entries.forEach(([id, label]) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = label; const sw = box.id === 'shBg' ? BG_SW[id] : FL_SW[id]; if (sw) b.insertAdjacentHTML('afterbegin', `<i style="background:${sw}"></i>`); b.setAttribute('aria-pressed', String(isOn(id))); b.onclick = () => { pick(id); buildShareChips(); renderShare(); }; box.append(b); }); };
  mk($('#shFilter'), Object.entries(SH_FILTERS), id => shareOpt.filter === id, id => { shareOpt.filter = id; });
  mk($('#shBg'), Object.entries(SH_BGS), id => shareOpt.bg === id, id => { shareOpt.bg = id; });
  const ex = $('#shBgExtra'); ex.innerHTML = '';
  if (shareOpt.bg === 'renk'){
    const row = document.createElement('div'); row.className = 'swatches';
    ['#E0763F', '#E8558F', '#8A4FB0', '#2E7DBA', '#2EB8B0', '#3E8E5A', '#F0B93A', '#FFF7EA', '#1D1714'].forEach(c => { const b = document.createElement('button'); b.type = 'button'; b.style.background = c; b.setAttribute('aria-label', 'Renk ' + c); b.onclick = () => { shareOpt.color = c; renderShare(); }; row.append(b); });
    const ci = document.createElement('input'); ci.type = 'color'; ci.value = shareOpt.color; ci.setAttribute('aria-label', 'Başka bir renk seç'); ci.oninput = () => { shareOpt.color = ci.value; renderShare(); }; row.append(ci);
    ex.append(row);
  } else if (shareOpt.bg === 'foto'){
    const lb = document.createElement('label'); lb.className = 'btn'; lb.textContent = shareOpt.photo ? 'BAŞKA FOTOĞRAF SEÇ' : 'ARKA PLAN FOTOĞRAFI SEÇ';
    const fi = document.createElement('input'); fi.type = 'file'; fi.accept = 'image/*';
    fi.onchange = () => { const f = fi.files && fi.files[0]; if (!f) return; const url = URL.createObjectURL(f), im = new Image(); im.onload = () => { const sc = Math.min(1, 1600 / Math.max(im.naturalWidth, im.naturalHeight)), c = document.createElement('canvas'); c.width = Math.round(im.naturalWidth * sc); c.height = Math.round(im.naturalHeight * sc); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(url); shareOpt.photo = c; buildShareChips(); renderShare(); }; im.onerror = () => { URL.revokeObjectURL(url); msg('Bu fotoğraf açılamadı. Başka bir fotoğraf dene.'); }; im.src = url; };
    lb.append(fi); ex.append(lb);
  }
}
function composeShare(){ if (!shBase) return; shareCanvas = shBase; $('#shareImg').src = shBaseURL; }
function renderShare(){ renderShareBase(); composeShare(); }
function applyShFilter(g, W3, H3){
  if (shareOpt.filter === 'normal') return;
  const im = g.getImageData(0, 0, W3, H3), d = im.data, f = shareOpt.filter;
  for (let i = 0; i < d.length; i += 4){
    let R = d[i], G = d[i + 1], B = d[i + 2]; const l = 0.299 * R + 0.587 * G + 0.114 * B;
    if (f === 'sicak'){ R = R * 1.1 + 8; G = G * 1.02; B = B * 0.86; }
    else if (f === 'soguk'){ R = R * 0.88; G = G * 1.0 + 4; B = B * 1.14 + 8; }
    else if (f === 'sb'){ R = G = B = (l - 128) * 1.15 + 128; }
    else if (f === 'eski'){ R = l * 1.05 + 28; G = l * 0.92 + 16; B = l * 0.72 + 6; }
    d[i] = R; d[i + 1] = G; d[i + 2] = B;
  }
  g.putImageData(im, 0, 0);
}
function renderShareBase(){
  if (shareOpt.bg === 'yok'){
    const k0 = document.createElement('canvas'); k0.width = cardCanvas.width; k0.height = cardCanvas.height;
    const g0 = k0.getContext('2d', { willReadFrequently:true }); g0.drawImage(cardCanvas, 0, 0); applyShFilter(g0, k0.width, k0.height);
    shBase = k0; shBaseURL = k0.toDataURL('image/png');
    document.querySelectorAll('#fmtSeg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === shareFmt)));
    return;
  }
  const art = viewArt, story = shareFmt === 'story', W3 = 1080, H3 = story ? 1920 : 1080;
  const k = document.createElement('canvas'); k.width = W3; k.height = H3; const g = k.getContext('2d', { willReadFrequently:true });
  const cols = art.pal.map(unhex).sort((a, b) => lum(a) - lum(b)), dark = cols[0], bgc = hex(dark.map(v => Math.round(v * 0.35 + 12)));
  g.fillStyle = bgc; g.fillRect(0, 0, W3, H3);
  const r = rng(art.n * 131 + art.pal.length);
  if (shareOpt.bg === 'konfeti'){
    const cell = 54;
    for (let y = 0; y < H3; y += cell) for (let x2 = 0; x2 < W3; x2 += cell) if (r() < 0.16){ g.globalAlpha = 0.22 + r() * 0.3; g.fillStyle = art.pal[Math.floor(r() * art.pal.length)]; g.fillRect(x2 + 6, y + 6, cell - 12, cell - 12); }
    g.globalAlpha = 1;
  } else if (shareOpt.bg === 'gunbatimi'){
    const bands = ['#2E2A5A', '#5A3A7A', '#B0507A', '#E8785A', '#F2B33D'], bh = H3 / bands.length;
    bands.forEach((c, q) => { g.fillStyle = c; g.fillRect(0, q * bh, W3, bh + 1); if (q) for (let x2 = 0; x2 < W3; x2 += 36){ g.fillStyle = bands[q - 1]; g.fillRect(x2, q * bh, 18, 18); g.fillStyle = c; g.fillRect(x2 + 18, q * bh - 18, 18, 18); } });
  } else if (shareOpt.bg === 'kalp'){
    g.fillStyle = '#3A1626'; g.fillRect(0, 0, W3, H3); const hm = STICKERS.kalp.m, u2 = 9;
    for (let y = 30, row = 0; y < H3; y += 130, row++) for (let x2 = (row % 2 ? 95 : 30); x2 < W3; x2 += 130){ g.fillStyle = row % 2 ? '#7A2A48' : '#9C3558'; hm.forEach((rw, rr2) => [...rw].forEach((ch, q) => { if (ch === 'X') g.fillRect(x2 + q * u2, y + rr2 * u2, u2, u2); })); }
  } else if (shareOpt.bg === 'yildiz'){
    g.fillStyle = '#12163A'; g.fillRect(0, 0, W3, H3);
    for (let q = 0; q < 170; q++){ const x = Math.floor(r() * W3 / 12) * 12, y = Math.floor(r() * H3 / 12) * 12, big = r() < 0.18; g.fillStyle = r() < 0.3 ? '#FFE9A8' : '#FFFFFF'; g.globalAlpha = 0.4 + r() * 0.6; g.fillRect(x, y, big ? 12 : 6, big ? 12 : 6); if (big){ g.fillRect(x - 12, y + 3, 36, 6); g.fillRect(x + 3, y - 12, 6, 36); } }
    g.globalAlpha = 1;
  } else if (shareOpt.bg === 'bulut'){
    g.fillStyle = '#8FD3FF'; g.fillRect(0, 0, W3, H3); g.fillStyle = '#FFFFFF';
    for (let q = 0; q < 14; q++){ const x = Math.floor(r() * (W3 - 260)), y = Math.floor(r() * (H3 - 120)), w = 160 + Math.floor(r() * 120); g.fillRect(x, y + 36, w, 48); g.fillRect(x + 36, y, w - 96, 48); g.fillRect(x + 24, y + 18, w - 48, 36); }
  } else if (shareOpt.bg === 'deniz'){
    g.fillStyle = '#1E5F9A'; g.fillRect(0, 0, W3, H3);
    for (let y = 40, row = 0; y < H3; y += 70, row++) for (let x = (row % 2) * 60 - 20; x < W3; x += 120){ g.fillStyle = row % 3 ? '#3F8FCC' : '#7FC4EE'; g.fillRect(x, y, 48, 12); g.fillRect(x + 48, y + 12, 48, 12); }
  } else if (shareOpt.bg === 'pastel'){
    const pc = ['#F7C6D9', '#C9D8F7', '#D9C9F7', '#C6ECF2'];
    for (let q = 0, y = 0; y < H3; y += 160, q++){ g.fillStyle = pc[q % 4]; g.fillRect(0, y, W3, 160); g.fillStyle = 'rgba(255,255,255,0.6)'; for (let x = (q % 2) * 60 + 30; x < W3; x += 120) g.fillRect(x, y + 68, 24, 24); }
  } else if (shareOpt.bg === 'dama'){
    const c1 = hex(cols[0].map(v => Math.round(v * 0.5 + 10))), c2 = hex(cols[Math.min(cols.length - 1, 2)].map(v => Math.round(v * 0.55 + 24)));
    for (let y = 0, ry = 0; y < H3; y += 90, ry++) for (let x = 0, rx = 0; x < W3; x += 90, rx++){ g.fillStyle = (rx + ry) % 2 ? c1 : c2; g.fillRect(x, y, 90, 90); }
  } else if (shareOpt.bg === 'izgara'){
    g.fillStyle = '#1A1033'; g.fillRect(0, 0, W3, H3); g.fillStyle = '#3A2A6A';
    for (let x = 0; x < W3; x += 90) g.fillRect(x, 0, 6, H3); for (let y = 0; y < H3; y += 90) g.fillRect(0, y, W3, 6);
    g.fillStyle = '#E8558F'; for (let y = 0; y < H3; y += 270) g.fillRect(0, y, W3, 6); g.fillStyle = '#2EB8B0'; for (let x = 0; x < W3; x += 270) g.fillRect(x, 0, 6, H3);
  } else if (shareOpt.bg === 'resim'){
    const t = document.createElement('canvas'); drawArt(t, art); g.imageSmoothingEnabled = false;
    const sc0 = Math.max(W3, H3) / art.n * 1.15; g.drawImage(t, (W3 - art.n * sc0) / 2, (H3 - art.n * sc0) / 2, art.n * sc0, art.n * sc0);
    g.fillStyle = 'rgba(10,8,6,0.5)'; g.fillRect(0, 0, W3, H3);
  } else if (shareOpt.bg === 'renk'){
    g.fillStyle = shareOpt.color; g.fillRect(0, 0, W3, H3);
  } else if (shareOpt.bg === 'foto' && shareOpt.photo){
    const ph = shareOpt.photo, sc0 = Math.max(W3 / ph.width, H3 / ph.height); g.imageSmoothingEnabled = true;
    g.drawImage(ph, (W3 - ph.width * sc0) / 2, (H3 - ph.height * sc0) / 2, ph.width * sc0, ph.height * sc0);
    g.fillStyle = 'rgba(10,8,6,0.25)'; g.fillRect(0, 0, W3, H3);
  }
  const cw = cardCanvas.width, ch = cardCanvas.height, sc = story ? Math.min(820 / cw, 1150 / ch) : Math.min(700 / cw, 900 / ch);
  const cx = W3 / 2, cy = story ? 930 : H3 / 2 - 10;
  g.save(); g.translate(cx, cy); g.rotate(-0.045); g.imageSmoothingEnabled = false;
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(-cw * sc / 2 + 22, -ch * sc / 2 + 26, cw * sc, ch * sc);
  g.drawImage(cardCanvas, -cw * sc / 2, -ch * sc / 2, cw * sc, ch * sc);
  g.fillStyle = 'rgba(255,225,53,0.85)'; g.fillRect(-90, -ch * sc / 2 - 26, 180, 52);
  g.restore();
  g.textAlign = 'center'; g.textBaseline = 'middle';
  if (story){
    const out = (t, y, col, font) => { g.font = font; g.lineJoin = 'round'; g.lineWidth = 10; g.strokeStyle = 'rgba(14,11,9,0.75)'; g.strokeText(t, W3 / 2, y); g.fillStyle = col; g.fillText(t, W3 / 2, y); };
    out('PİKSEL ATÖLYE', 190, '#FFE135', '700 76px Silkscreen, "Pixelify Sans", monospace');
    out('Kare kare ben boyadım', 1690, '#FFF7EA', '700 58px Silkscreen, "Pixelify Sans", monospace');
    out('Sen de kendi fotoğrafını boya', 1770, '#F3E6D2', '400 38px Silkscreen, "Pixelify Sans", monospace');
  }
  applyShFilter(g, W3, H3);
  shBase = k; shBaseURL = k.toDataURL('image/png');
  document.querySelectorAll('#fmtSeg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === shareFmt)));
}


