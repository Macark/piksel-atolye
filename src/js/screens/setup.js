/* ---------- setup: fotoğrafı boyama tablosuna hazırla ---------- */
const DEN = [20, 24, 28, 32, 40, 48];                     // piksel yoğunluğu (ızgara)
let setupN = 28, setupK = 10, setupArt = null, pvMode = 'pix', setupRaf = 0;
// fromCam: kameradan geldiyse aksesuar ve yeri korunur; galeriden geldiyse sıfırdan başlar.
function openSetup(fromCam){
  $('#add').classList.remove('on'); stopCam(); show('setup');
  fx = 'normal'; setupN = 28; setupK = 10; pvMode = 'pix';
  if (!fromCam){ mask.id = 'yok'; maskHome(); }
  $('#maskSize').value = Math.round(mask.s * 100);
  $('#denIn').value = DEN.indexOf(setupN);
  buildFxChips($('#fxChips'), renderSetup); buildMaskChips($('#maskChips'), renderSetup); renderSetup();
  $('#setup').scrollTop = 0;
}
function renderSetup(){
  setupRaf = 0;
  document.querySelectorAll('#lvlSeg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.k === setupK)));
  document.querySelectorAll('#pvMode button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === pvMode)));
  $('#denVal').textContent = setupN + '×' + setupN;
  setupArt = convert(setupN, setupK);
  const pv = $('#preview');
  if (pvMode === 'org'){ pv.width = pv.height = 256; const g = pv.getContext('2d'); g.imageSmoothingEnabled = true; g.drawImage(srcMasked(), 0, 0, 256, 256); }
  else drawArt(pv, setupArt);
  $('#setupInfo').textContent = TL('{0} kare, {1} renk.', setupN * setupN, setupArt.pal.length);
}
const setupLater = () => { if (!setupRaf) setupRaf = requestAnimationFrame(renderSetup); };
$('#denIn').addEventListener('input', e => { setupN = DEN[+e.target.value] || 28; setupLater(); });
document.querySelectorAll('#lvlSeg button').forEach(b => b.onclick = () => { setupK = +b.dataset.k; renderSetup(); });
document.querySelectorAll('#pvMode button').forEach(b => b.onclick = () => { pvMode = b.dataset.v; renderSetup(); });
$('#goBtn').onclick = () => { collTab = 'memories'; origin = { screen:'coll', tab:'memories' }; startPaint({ n:setupArt.n, pal:setupArt.pal, idx:setupArt.idx, name:'FOTOĞRAFIN' }, null); };
$('#backBtn').onclick = () => { if (DB.gallery.length || Object.keys(DB.done).length) openColl(); else { show('home'); refreshHome(); } };
