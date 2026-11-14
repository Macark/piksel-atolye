/* ---------- ilk açılış tanıtımı: ana sayfadaki her bölümü sırayla gösterir ---------- */
// Yeni oyuncu önce yaparak öğrensin: hoş geldin → kolay bir resmi birlikte boya (boyama ekranında
// 3 adımlı ipucu). Ana sayfa turu isteğe bağlı ve kısa; düğmelerin adı zaten yazanları tek tek anlatmaz.
const GT_FIRST = 'cilek';                                   // 24×24, 4 renk: ilk resim için kolay
const GT = [
  { t:'Piksel Atölye’ye hoş geldin!\n\nNumaralı kareleri boyayarak piksel resimler yaparsın. İlk resmini birlikte boyayalım mı?', welcome:true },
  { el:'#dailyBtn', t:'GÜNÜN RESMİ\nHer gün yeni bir resim. Her gün boyarsan serin uzar ve günün sıralamasına girersin.' },
  { el:'#eventBtn', t:'ETKİNLİK\nKısa süreliğine gelen özel resimler. Hepsini bitirene özel bir çerçeve.' },
  { el:'.tours', t:'TURLAR\nDünyayı ve Türkiye’yi şehir şehir gez. Boyadıkça damga ve hatıra toplarsın, rehberler soru sorar.' },
  { el:'#collBtn', t:'ALBÜMLER VE ANILARIM\nHazır resimler konularına göre albümlerde. Kendi fotoğraflarından boyadıkların Anılarım’da saklanır.', wide:'#memBtn' },
  { el:'#photoBtn', t:'FOTOĞRAF EKLE\nFotoğraf çek ya da seç, piksele dönüşsün. Kamerada eğlenceli filtreler var. Fotoğrafın telefonundan çıkmaz.' },
  { el:'.hicons', t:'İstatistik, rozetler ve ayarlar burada. Bu tanıtımı tekrar görmek için: Ayarlar > Nasıl oynanır?' },
  { t:'Hazırsın!\n\nİyi boyamalar. İlk resim için Günün Resmi güzel bir başlangıç.', last:true }
];
let gtI = 0, gtSteps = [];
function gtOpen(){
  show('home'); refreshHome();
  gtSteps = GT.filter(x => !x.el || ($(x.el) && !$(x.el).hidden && $(x.el).offsetParent));
  gtI = 0; $('#gtour').hidden = false; gtRender();
}
function gtClose(){ $('#gtour').hidden = true; DB.seenHowto = true; save(); }
function gtRender(){
  const st = gtSteps[gtI], hole = $('#gtHole'), box = $('#gtBox');
  const w0 = gtSteps[0] && gtSteps[0].welcome ? 1 : 0;   // hoş geldin adımı sayılmaz
  $('#gtStep').textContent = (gtI + 1 - w0) + ' / ' + (gtSteps.length - w0);
  const tl = st.t.split('\n'); $('#gtText').innerHTML = ''; const hb = document.createElement('b'); hb.textContent = tl[0]; $('#gtText').append(hb, document.createTextNode('\n' + tl.slice(1).join('\n')));
  $('#gtPrev').style.visibility = gtI || st.welcome ? 'visible' : 'hidden';
  $('#gtPrev').textContent = st.welcome ? trx('ETRAFI GÖSTER') : trx('GERİ');
  $('#gtNext').textContent = st.welcome ? trx('BOYAYALIM') : st.last ? trx('BAŞLA') : trx('İLERİ');
  $('#gtStep').hidden = !!st.welcome;
  $('#gtSkip').style.visibility = st.last ? 'hidden' : 'visible';
  if (!st.el){ hole.classList.add('center'); box.style.top = ''; box.style.bottom = ''; box.style.top = (st.welcome ? Math.min(innerHeight - box.offsetHeight - 12, Math.max(60, $('#demo').getBoundingClientRect().bottom + 12)) : Math.max(60, innerHeight * 0.28)) + 'px'; return; }
  const el = $(st.el); el.scrollIntoView({ block:'nearest' });
  let r = el.getBoundingClientRect(); hole.classList.remove('center');
  if (st.wide && $(st.wide)){ const r2 = $(st.wide).getBoundingClientRect(); r = { left:Math.min(r.left, r2.left), top:Math.min(r.top, r2.top), right:Math.max(r.right, r2.right), bottom:Math.max(r.bottom, r2.bottom) }; r.width = r.right - r.left; r.height = r.bottom - r.top; }
  Object.assign(hole.style, { left:r.left + 'px', top:r.top + 'px', width:r.width + 'px', height:r.height + 'px' });
  requestAnimationFrame(() => { const bh = box.offsetHeight, below = r.bottom + 16, above = r.top - bh - 16;
    box.style.top = (below + bh < innerHeight - 8 ? below : Math.max(8, above)) + 'px'; });
}
$('#gtNext').onclick = () => {
  const st = gtSteps[gtI];
  if (st.welcome){ gtClose(); if (ITEMS[GT_FIRST]){ origin = { screen:'home' }; startBuiltin(GT_FIRST); } return; }
  if (st.last){ gtClose(); return; } gtI++; gtRender();
};
$('#gtPrev').onclick = () => { if (gtSteps[gtI].welcome) gtI++; else if (gtI > 0) gtI--; else return; gtRender(); };   // hoş geldinde: ETRAFI GÖSTER
$('#gtSkip').onclick = gtClose;
addEventListener('resize', () => { if (!$('#gtour').hidden) gtRender(); });

/* İlk boyamada 3 adımlı ipucu (hiç resim bitirmemiş oyuncuya bir kez).
   Ekranı kapatmaz; oyuncu boyarken ilerler. paint.js 'start', 'sel', 'cell', 'end' olaylarını bildirir. */
let coachStep = 0, coachCells = 0, coachT = 0;
const COACH = [null,
  '1 / 3 · Alttan bir renk seç. O rengin kareleri resimde koyu gri olur.',
  '2 / 3 · Şimdi aşağıdaki resimde o numaralı karelere dokun ya da parmağını üstlerinden sür.',
  '3 / 3 · Harika! İki parmakla yakınlaştır, tek parmakla kaydır. Bir renk bitince sıradaki kendiliğinden seçilir.'];
function coachHook(ev){
  if (ev === 'start'){
    coachStep = (!DB.coached && !Object.keys(DB.done || {}).length && A && A.id) ? 1 : 0; coachCells = 0;
    return coachShow();
  }
  if (!coachStep) return;
  if (ev === 'end'){ if (coachStep >= 2){ DB.coached = true; save(); } coachStep = 0; return coachShow(); }
  if (coachStep === 1 && (ev === 'sel' || ev === 'cell')){ coachStep = 2; coachShow(); if (ev === 'sel') return; }
  if (coachStep === 2 && ev === 'cell' && ++coachCells >= 6){ coachStep = 3; DB.coached = true; save(); coachShow(); clearTimeout(coachT); coachT = setTimeout(() => { coachStep = 0; coachShow(); }, 8000); }
}
function coachShow(){
  const c = $('#coach'); c.hidden = !coachStep; if (!coachStep) return;
  $('#tip').classList.add('off');
  $('#coachText').textContent = trx(COACH[coachStep]);
  c.classList.add('down');
  if (coachStep === 1){ const pr = $('#pw').getBoundingClientRect(), sr = $('#paint').getBoundingClientRect(); c.style.top = ''; c.style.bottom = (sr.bottom - pr.top + 10) + 'px'; }
  else { c.style.bottom = ''; c.style.top = ($('#stage').getBoundingClientRect().top - $('#paint').getBoundingClientRect().top + 10) + 'px'; }
}
$('#coach').onclick = () => { if (coachStep === 3){ coachStep = 0; coachShow(); } };

applyTheme();
if (!DB.seenHowto) setTimeout(gtOpen, 400);

