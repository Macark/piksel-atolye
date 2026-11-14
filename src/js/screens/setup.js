/* ---------- setup: fotoğrafı boyama tablosuna hazırla ---------- */
const DEN = [20, 24, 32, 40, 48];                         // ayrıntı (ızgara)
const DEN_NAME = ['Çok az', 'Az', 'Orta', 'Çok', 'En çok'];
let setupN = 32, setupK = 12, setupArt = null, pvMode = 'pix', setupRaf = 0;
// Dönüşüm sonuçları saklanır: aksesuar sürüklenirken fotoğraf yeniden çevrilmez.
const convCache = new Map(); let convSrc = null;
function convCached(n, k){
  if (convSrc !== src){ convCache.clear(); convSrc = src; }
  const key = n + '|' + k + '|' + fx; let a = convCache.get(key);
  if (!a){ a = convert(n, k); convCache.set(key, a); }
  return a;
}
// Fotoğrafın iki hâli: tamamı ve yüz bulunduysa yüze yakın hâli. mask.eyes her zaman o an
// gösterilen hâle göredir; hâl değişince göz noktaları da dönüştürülür.
let shot = null;
function newShot(big, tracked){
  const full = big.width === 512 ? big : cropCanvas(big, { x:0, y:0, s:1 });
  shot = { big, full, box:null, face:null, view:'full' }; src = full;
  if (tracked) shotFace(true);
}
function shotFace(go){
  if (!shot || shot.view !== 'full') return;
  const b = faceCropBox(mask.eyes); if (!b) return;
  shot.box = b; shot.face = cropCanvas(shot.big, b); if (go) setView('face');
}
function setView(v){
  if (!shot || !shot.face || shot.view === v) return;
  const b = shot.box;
  mask.eyes = mask.eyes.map(([x, y]) => v === 'face' ? [(x - b.x) / b.s, (y - b.y) / b.s] : [x * b.s + b.x, y * b.s + b.y]);
  shot.view = v; src = v === 'face' ? shot.face : shot.full; placeEyes();
}
// fromCam: kameradan geldi; seçilen filtre ve yüz takibinin bulduğu göz noktaları korunur.
// Galeriden gelince aksesuarsız açılır; aksesuar seçilince yüz bir kez aranır.
let eyesTried = null;
function openSetup(fromCam){
  $('#add').classList.remove('on'); stopCam(); show('setup');
  fx = 'normal'; setupN = 32; setupK = 12; pvMode = 'pix';
  if (!fromCam){ mask.id = 'yok'; maskHome(); newShot(src, false); }
  eyesTried = fromCam && mask.auto ? src : null;
  $('#maskSize').value = Math.round(mask.s * 100); placeEyes();
  buildFxChips($('#fxChips'), () => renderSetup()); buildMaskChips($('#maskChips'), setupMaskChose); renderSetup();
  $('#setup').scrollTop = 0;
  if (fromCam && mask.id !== 'yok') setupMaskChose();
}
function setupMaskChose(){
  renderSetup();
  if (mask.id === 'yok') return;
  if (eyesTried === src){ if (mask.auto) $('#eyeHint').textContent = trx('Yüzün bulundu. Yerini düzeltmek istersen resmin üstünde parmağınla kaydır.'); return; }
  const s0 = src; eyesTried = src; $('#eyeHint').textContent = trx('Yüz aranıyor…');
  findEyes(src).then(ok => {
    if (src !== s0) return;
    $('#eyeHint').textContent = trx(ok ? 'Yüzün bulundu. Yerini düzeltmek istersen resmin üstünde parmağınla kaydır.' : 'İki yuvarlağı gözlerinin üstüne sürükle, aksesuar yüzüne otursun.');
    if (ok){ shotFace(true); placeEyes(); renderSetup(); }
  });
}
// Ayrıntı düğmeleri: her biri fotoğrafın o ayrıntıdaki hâlini küçük resim olarak gösterir.
function buildDenChips(){
  const box = $('#denChips'); box.innerHTML = '';
  DEN.forEach((n, k) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip denchip';
    b.setAttribute('aria-pressed', String(n === setupN)); b.setAttribute('aria-label', trx(DEN_NAME[k]) + ', ' + n + '×' + n);
    const c = document.createElement('canvas'); drawArt(c, convCached(n, setupK));
    const t = document.createElement('span'); t.textContent = n + '×' + n;
    b.append(c, t);
    b.onclick = () => { setupN = n; renderSetup(); };
    box.append(b);
  });
}
let denKey = '', denSrc = null;
// quick: sadece aksesuar değişti (küçük resimler yeniden çizilmez)
function renderSetup(quick){
  setupRaf = 0;
  document.querySelectorAll('#lvlSeg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.k === setupK)));
  document.querySelectorAll('#pvMode button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === pvMode)));
  $('#viewSeg').hidden = !(shot && shot.face);
  // göz tutamaçları: yüz kendiliğinden bulunduysa piksel önizlemenin üstünde göz gibi durmasın
  document.querySelectorAll('.eyeh').forEach(h => h.hidden = mask.id === 'yok' || mask.auto);
  if (shot) document.querySelectorAll('#viewSeg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === shot.view)));
  const dk = setupK + '|' + fx;
  if (!quick && (dk !== denKey || denSrc !== src)){ denKey = dk; denSrc = src; buildDenChips(); }
  else document.querySelectorAll('#denChips button').forEach((b, k) => b.setAttribute('aria-pressed', String(DEN[k] === setupN)));
  $('#denVal').textContent = trx(DEN_NAME[DEN.indexOf(setupN)]);
  setupArt = applyMask(convCached(setupN, setupK));
  const pv = $('#preview');
  if (pvMode === 'org'){ pv.width = pv.height = 512; const g = pv.getContext('2d'); g.imageSmoothingEnabled = true; g.drawImage(src, 0, 0, 512, 512); g.globalAlpha = 0.85; drawMaskAt(g, 512); g.globalAlpha = 1; }
  else drawArt(pv, setupArt);
  $('#setupInfo').textContent = TL('{0} kare, {1} renk.', setupN * setupN, setupArt.pal.length);
}
document.querySelectorAll('#lvlSeg button').forEach(b => b.onclick = () => { setupK = +b.dataset.k; renderSetup(); });
document.querySelectorAll('#pvMode button').forEach(b => b.onclick = () => { pvMode = b.dataset.v; renderSetup(true); });
document.querySelectorAll('#viewSeg button').forEach(b => b.onclick = () => { setView(b.dataset.v); renderSetup(); });
$('#goBtn').onclick = () => { collTab = 'memories'; origin = { screen:'coll', tab:'memories' }; startPaint({ n:setupArt.n, pal:setupArt.pal, idx:setupArt.idx, name:'FOTOĞRAFIN' }, null); };
$('#backBtn').onclick = () => { if (DB.gallery.length || Object.keys(DB.done).length) openColl(); else { show('home'); refreshHome(); } };
