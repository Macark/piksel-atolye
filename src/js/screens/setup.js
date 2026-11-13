/* ---------- setup ---------- */
let setupN = 32, setupArt = null;
function openSetup(){ $('#add').classList.remove('on'); stopCam(); show('setup'); mask.x = 0.5; mask.y = 0.45; mask.s = 0.5; $('#maskSize').value = 50; buildFxChips($('#fxChips'), renderSetup); buildMaskChips(); renderSetup(); }
function renderSetup(){
  document.querySelectorAll('.seg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.n === setupN)));
  setupArt = convert(setupN);
  drawArt($('#preview'), setupArt);
  $('#setupInfo').textContent = TL('{0} kare, {1} renk.', setupN * setupN, setupArt.pal.length);
}
document.querySelectorAll('.seg button').forEach(b => b.onclick = () => { setupN = +b.dataset.n; renderSetup(); });
$('#goBtn').onclick = () => { collTab = 'memories'; origin = { screen:'coll', tab:'memories' }; startPaint({ n:setupArt.n, pal:setupArt.pal, idx:setupArt.idx, name:'FOTOĞRAFIN' }, null); };
$('#backBtn').onclick = () => { if (DB.gallery.length || Object.keys(DB.done).length) openColl(); else { show('home'); refreshHome(); } };

