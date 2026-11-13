/* ---------- effects, camera, coin shop ---------- */
const FX = { normal:'Normal', canli:'Canlı', sb:'Siyah beyaz', sepya:'Sepya', gameboy:'Game Boy', pop:'Pop art', buz:'Buz' };
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
    default: { const R = l + (r - l) * 1.22, G = l + (g - l) * 1.22, B = l + (b - l) * 1.22; return [(R - 128) * 1.08 + 128, (G - 128) * 1.08 + 128, (B - 128) * 1.08 + 128]; }
  }
}
function buildFxChips(box, onChange){
  box.innerHTML = '';
  Object.entries(FX).forEach(([id, name]) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = name;
    b.setAttribute('aria-pressed', String(fx === id));
    b.onclick = () => { fx = id; buildFxChips(box, onChange); if (onChange) onChange(); };
    box.append(b);
  });
}
let camStream = null, camRaf = 0, camFacing = 'user';
const camVid = $('#camVid'), camCv = $('#camCv'), camG = camCv.getContext('2d', { willReadFrequently:true });
async function openCam(){
  $('#add').classList.remove('on'); show('cam'); buildFxChips($('#camFx')); $('#camFall').hidden = true; $('#shutter').disabled = false;
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('no camera');
    camStream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:camFacing, width:{ ideal:720 }, height:{ ideal:720 } }, audio:false });
    camVid.srcObject = camStream; await camVid.play();
    cancelAnimationFrame(camRaf); camRaf = requestAnimationFrame(camLoop);
  } catch(e){ stopCam(); $('#camFall').hidden = false; $('#shutter').disabled = true; }
}
function stopCam(){ cancelAnimationFrame(camRaf); camRaf = 0; if (camStream){ camStream.getTracks().forEach(t => t.stop()); camStream = null; } try { camVid.srcObject = null; } catch(e){} }
function camFrame(ctx, size){
  const vw = camVid.videoWidth, vh = camVid.videoHeight; if (!vw) return false;
  const sq = Math.min(vw, vh); ctx.save(); if (camFacing === 'user'){ ctx.translate(size, 0); ctx.scale(-1, 1); }
  ctx.drawImage(camVid, (vw - sq) / 2, (vh - sq) / 2, sq, sq, 0, 0, size, size); ctx.restore(); return true;
}
function camLoop(){
  camRaf = requestAnimationFrame(camLoop);
  if (!camFrame(camG, 48)) return;
  const im = camG.getImageData(0, 0, 48, 48), d = im.data, raw = fx === 'gameboy' || fx === 'pop';
  const q = v => raw ? v : Math.round(Math.max(0, Math.min(255, v)) / 51) * 51;
  for (let i = 0; i < d.length; i += 4){ const c = fxColor(d[i], d[i+1], d[i+2]); d[i] = q(c[0]); d[i+1] = q(c[1]); d[i+2] = q(c[2]); }
  camG.putImageData(im, 0, 0);
}
$('#shutter').onclick = () => {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d');
  if (!camFrame(g, 512)) return;
  src = c; tone(880, 0.08); openSetup();
};
$('#camFlip').onclick = () => { camFacing = camFacing === 'user' ? 'environment' : 'user'; stopCam(); openCam(); };
$('#camBack').onclick = () => { stopCam(); show('home'); refreshHome(); };
$('#camBtn').onclick = () => { ac(); openCam(); };

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


