/* ---------- effects, camera, coin shop ---------- */
// Efekt kimlikleri kayıtlarda yok; ad ve açıklama sadece arayüzde.
const FX = {
  normal:{ name:'Normal', desc:'Fotoğrafın kendi renkleri.' },
  canli:{ name:'Canlı', desc:'Renkleri daha parlak ve doygun yapar.' },
  sb:{ name:'Siyah beyaz', desc:'Fotoğrafı gri tonlara çevirir.' },
  sepya:{ name:'Sepya', desc:'Eski fotoğraf gibi sıcak kahverengi tonlar.' },
  gameboy:{ name:'Retro yeşil', desc:'Dört yeşil tonla eski oyun ekranı görünümü.' },
  pop:{ name:'Pop art', desc:'Dört canlı renkle afiş görünümü.' },
  buz:{ name:'Buz', desc:'Soğuk, mavimsi tonlar.' },
};
let fx = 'normal';
const GBC = [[15,56,15],[48,98,48],[139,172,15],[155,188,15]], POPC = [[27,31,74],[232,56,79],[242,193,78],[255,247,234]];
function fxColor(r, g, b){
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  switch (fx){
    case 'canli': { const R = l + (r - l) * 1.7, G = l + (g - l) * 1.7, B = l + (b - l) * 1.7; return [(R - 128) * 1.15 + 128, (G - 128) * 1.15 + 128, (B - 128) * 1.15 + 128]; }
    case 'sb': { const v = (l - 128) * 1.2 + 128; return [v, v, v]; }
    case 'sepya': { const v = (l - 128) * 1.15 + 128; return [v * 1.08 + 18, v * 0.92 + 8, v * 0.7]; }
    case 'gameboy': return GBC[Math.max(0, Math.min(3, Math.floor(l / 64)))];
    case 'pop': return POPC[Math.max(0, Math.min(3, Math.floor(l / 64)))];
    case 'buz': return [r * 0.78, g * 1.02 + 6, b * 1.2 + 14];
    default: return [l + (r - l) * 1.1, l + (g - l) * 1.1, l + (b - l) * 1.1];
  }
}
// Efekt düğmeleri: her biri fotoğrafın küçük bir örneğini o efektle gösterir.
function buildFxChips(box, onChange){
  box.innerHTML = '';
  const th = fxThumbBase();
  Object.entries(FX).forEach(([id, f]) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip fxchip';
    b.setAttribute('aria-pressed', String(fx === id));
    if (th){ const c = document.createElement('canvas'); c.width = c.height = 16; const g = c.getContext('2d'), im = g.createImageData(16, 16), d = im.data;
      const keep = fx; fx = id; for (let i = 0; i < th.length; i += 4){ const v = fxColor(th[i], th[i+1], th[i+2]); d[i] = Math.max(0, Math.min(255, v[0])); d[i+1] = Math.max(0, Math.min(255, v[1])); d[i+2] = Math.max(0, Math.min(255, v[2])); d[i+3] = 255; } fx = keep;
      g.putImageData(im, 0, 0); b.append(c); }
    b.append(trx(f.name));
    b.onclick = () => { fx = id; buildFxChips(box, onChange); if (onChange) onChange(); };
    box.append(b);
  });
  const dsc = $('#fxDesc'); if (dsc) dsc.textContent = trx(FX[fx].desc);
}
let fxThumb = null, fxThumbSrc = null;
function fxThumbBase(){
  if (!src) return null; if (fxThumbSrc === src) return fxThumb;
  const c = document.createElement('canvas'); c.width = c.height = 16; const g = c.getContext('2d');
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.drawImage(src, 0, 0, 16, 16);
  fxThumb = g.getImageData(0, 0, 16, 16).data; fxThumbSrc = src; return fxThumb;
}

/* Kamera: canlı görüntü + canlı aksesuar. Yüz takibi (face.js) her yeni görüntü karesinde gözleri
   bulur; aksesuar katmanda yüzü izler. Çekince aynı göz noktalarıyla hazırlama ekranına geçilir,
   fotoğraf hemen piksele çevrilir ve aksesuar piksel resme eklenir. */
let camStream = null, camFacing = 'user', camRaf = 0, camSeen = 0, camVT = -1, camNext = 0, camGap = 50, camTarget = null;
const camVid = $('#camVid'), camOv = $('#camOv'), camOvG = camOv.getContext('2d');
async function openCam(){
  $('#add').classList.remove('on'); show('cam'); $('#camFall').hidden = true; $('#camView').hidden = false; $('#shutter').disabled = false;
  $('#camView').classList.toggle('mirror', camFacing === 'user'); camSeen = 0;
  buildMaskChips($('#camAcc'), camChose); camHint();
  if (mask.id !== 'yok') loadFace().then(camHint, camHint);
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('no camera');
    camStream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:camFacing, width:{ ideal:1280 }, height:{ ideal:1280 } }, audio:false });
    camVid.srcObject = camStream; await camVid.play();
    if (!camRaf) camRaf = requestAnimationFrame(camLoop);
  } catch(e){ stopCam(); $('#camView').hidden = true; $('#camFall').hidden = false; $('#shutter').disabled = true; }
}
function camChose(){ if (mask.id !== 'yok' && !faceLM) loadFace().then(camHint, camHint); camSeen = 0; camHint(); }
function stopCam(){ cancelAnimationFrame(camRaf); camRaf = 0; if (camStream){ camStream.getTracks().forEach(t => t.stop()); camStream = null; } try { camVid.srcObject = null; } catch(e){} }
const camTracking = () => performance.now() - camSeen < 450;
// Algılama en çok ~20 kez/sn (yavaş telefonda aralık kendiliğinden uzar); aksesuar her ekran
// karesinde son bulunan konuma doğru kayar, böylece hareket akıcı, işlemci yükü düşük kalır.
function camLoop(now){
  camRaf = 0; if (!camStream) return;
  if (faceLM && mask.id !== 'yok' && camVid.readyState >= 2 && camVid.currentTime !== camVT && now >= camNext){
    camVT = camVid.currentTime;
    const t0 = performance.now(), L = detectFace(camVid), dt = performance.now() - t0;
    camGap = Math.min(200, Math.max(50, dt * 2.5)); camNext = now + camGap;
    if (L){
      const vw = camVid.videoWidth, vh = camVid.videoHeight, s = Math.min(vw, vh);
      camTarget = eyesFrom(L, vw, vh, { x:(vw - s) / 2, y:(vh - s) / 2, s }, camFacing === 'user');
      if (!camTracking()) mask.eyes = camTarget.map(e => e.slice());
      mask.auto = true; camSeen = performance.now();
    }
  }
  if (camTarget && camTracking()) mask.eyes = mask.eyes.map((p, j) => [p[0] + (camTarget[j][0] - p[0]) * 0.4, p[1] + (camTarget[j][1] - p[1]) * 0.4]);
  drawCamOv();
  camRaf = requestAnimationFrame(camLoop);
}
let camOvOn = false;
function drawCamOv(){
  const on = mask.id !== 'yok' && camTracking();
  if (!on && !camOvOn) return;
  const N = camOv.width; camOvG.clearRect(0, 0, N, N);
  if (on) drawMaskAt(camOvG, N);
  camOvOn = on; camHint();
}
function camHint(){
  const h = $('#camHint'), tr = camTracking();
  $('#camView').classList.toggle('tracking', mask.id !== 'yok' && tr);
  h.textContent = mask.id === 'yok' ? trx('Bir filtre seç ya da hemen çek.')
    : faceFail ? trx('Filtreler yüklenemedi. Çekince aksesuarı elle yerleştirebilirsin.')
    : !faceLM ? trx('Filtreler hazırlanıyor…')
    : tr ? '' : trx('Yüzünü çerçeveye getir.');
  h.hidden = !h.textContent;
}
function camFrame(ctx, size){
  const vw = camVid.videoWidth, vh = camVid.videoHeight; if (!vw) return false;
  const sq = Math.min(vw, vh); ctx.save(); if (camFacing === 'user'){ ctx.translate(size, 0); ctx.scale(-1, 1); }
  ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(camVid, (vw - sq) / 2, (vh - sq) / 2, sq, sq, 0, 0, size, size); ctx.restore(); return true;
}
$('#shutter').onclick = () => {
  const big = document.createElement('canvas'); big.width = big.height = 1024;   // yüze yakınlaştırınca da net kalsın
  if (!camFrame(big.getContext('2d'), 1024)) return;
  const tracked = camTarget && camTracking();
  if (tracked) mask.eyes = camTarget.map(e => e.slice()); else mask.auto = false;
  newShot(big, tracked); tone(880, 0.08); openSetup(true);
};
$('#camFlip').onclick = () => { camFacing = camFacing === 'user' ? 'environment' : 'user'; stopCam(); openCam(); };
$('#camBack').onclick = () => { stopCam(); show('home'); refreshHome(); };
$('#camBtn').onclick = () => { ac(); openCam(); };
// Uygulama arka plana geçince kamerayı kapat (pil), geri gelince kamera ekranındaysak yeniden aç.
document.addEventListener('visibilitychange', () => { const on = $('#cam').classList.contains('on'); if (document.hidden){ if (camStream) stopCam(); } else if (on && !camStream) openCam(); });

let needAfter = null;
function needCoins(text, after){ needAfter = after || null; $('#needText').textContent = text; $('#needAd').hidden = adLeft() <= 0; $('#need').classList.add('on'); }
$('#needClose').onclick = () => $('#need').classList.remove('on');
$('#needAd').onclick = () => { $('#need').classList.remove('on'); watchAd(50, needAfter); };
$('#needBuy').onclick = () => { $('#need').classList.remove('on'); openShop(needAfter); };
const PACKS = [{ c:200, p:'₺29,99', t:'Küçük kese' }, { c:600, p:'₺69,99', t:'Dolu kese, en çok tercih edilen' }, { c:1500, p:'₺149,99', t:'Hazine sandığı' }];
function openShop(after){
  const box = $('#packs'); box.innerHTML = '';
  PACKS.forEach(pk => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'btn pack';
    b.innerHTML = `<span>${pk.c} COIN<small>${pk.t}</small></span><span class="pr">${pk.p}</span>`;
    b.onclick = () => { DB.coins += pk.c; save(); setCoins(); [659, 880, 1175, 1568].forEach((f, k) => tone(f, 0.12, k * 0.06, 'triangle', 0.06)); $('#shop').classList.remove('on'); if (after) after(); };
    box.append(b);
  });
  $('#shop').classList.add('on'); $('#shopClose').focus();
}
$('#shopClose').onclick = () => $('#shop').classList.remove('on');


