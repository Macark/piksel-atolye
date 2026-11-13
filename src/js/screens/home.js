/* ---------- home ---------- */
const KOFTE_PHOTO = { n:40, pal:["#0d0100", "#281004", "#391f0e", "#492e1b", "#563a27", "#644732", "#72553f", "#83644c", "#97785d", "#aa8d73", "#c8ac90", "#fdbe49", "#eadab8", "#fbf8e7"], idx:[...'cccccdc8aadcccccccccddddddddddcacca88ccccccccccacaacccccaccccc999c9877779aa8acddccccccc9ccaaccaa8787aa77668665589789accccccccccccdcaaa9a46a999952376645567989cacccccccacccdca9941a68a86138a98866455989aa99888999adcaa580796997435caa9877767948aa9aaaaaaacc987553987975208aca98a768967899cccccdcaaa1877458a787115aca5899998678786ccccccccdc267757aa6776688300002678776869ccccdcaaada8768a998889940012212047647676ccccca90019a789aa9778850158bbb57001157a8ccdda9517859a8c9a98899109bdbbbb664255888ddc9762cdbb8aaccaa8ac9096cdc8bbb88787457a9a6218ddbbbcc7accadc40d8bdc6bbb69ca984203aa76bcdbbba4665899711d7bbbbbb8a9a99984ac8998bbcbb676432131164a7bbbbbbaa9a52752ca57987bbb66674111200136679acaca75667442ca75698977424320135012489867776554426621ca88975288545231124115784656667662354222c9987568a4231000054357897445543337777644caa9767ac9411026775878856732555773443314ca545599dc514aa9776898784553252221111122cc976799ca62a899788515626543255325556563da76989aa743938a857577032531133564102431da87998a76629558886046760461111121120101da96999965616643887660788416653521123122cc98a96a76201546444367505621126541145566dd9786a864004735765342689611211013436564dd8789776104a955556676114696121011053111ddaa88583006ac95244456832013621211222432ddc8c84730258943133531274813044033222323ddd8675642788735112335217461310500344443dda5589747776533321113111367624046466773cd512498687868534443022204368826146222329000035566567673244422214161689041151222c9121100387674653333230240061588134346448322220024665544131222010123736661343663232332101111233321112223234555167665654602244221033100011232353624534566697512218324553201131000000001241355455434521020'].map(ch => parseInt(ch, 16)) };
if (!DB.testCoins){ DB.testCoins = true; DB.coins = Math.max(DB.coins, 9999); save(); }
if (!DB.seedMem){
  DB.seedMem = true; DB.frames.altin = true; DB.frames.film = true;
  const seq = n => Array.from({ length:n * n }, (_, i) => i), day = 86400000;
  DB.gallery.push({ n:KOFTE_PHOTO.n, pal:KOFTE_PHOTO.pal, idx:KOFTE_PHOTO.idx, order:seq(KOFTE_PHOTO.n), date:Date.now() - 3 * day, caption:'Köfte yakın çekim', frame:'film', stickers:[] });
  DB.gallery.push({ n:HOME_ART.n, pal:HOME_ART.pal, idx:HOME_ART.idx, order:seq(HOME_ART.n), date:Date.now() - day, caption:'Kral Köfte', frame:'altin', stickers:['tac'] });
  save();
}

function refreshHome(){
  $('#resumeBtn').hidden = !(DB.current && DB.current.idx);
  if (typeof refreshEventCard === 'function') refreshEventCard();
  const ds = dailyState(), dart = getArt(ds.id), dw = DB.wip[ds.id];
  drawArt($('#dailyCv'), dart);
  const sn = DB.streak ? DB.streak.n : 0;
  const dn = ITEMS[ds.id].name;
  $('#dailyTxt').textContent = activeEvent() ? (ds.done ? trx('Tamam ✓') : dn) : ds.done ? TL('Bugünkü tamam! Seri: {0} gün. Yarın yenisi gelir.', sn) : TL('{0}: boya, günlük ödülü kazan.', dn) + (sn ? TL(' Serin: {0} gün.', sn) : '');
}
function onFile(e){
  const f = e.target.files && e.target.files[0]; e.target.value = '';
  if (!f) return;
  const url = URL.createObjectURL(f), im = new Image();
  im.onload = () => { src = squareFrom(im, im.naturalWidth, im.naturalHeight); URL.revokeObjectURL(url); openSetup(); };
  im.onerror = () => { URL.revokeObjectURL(url); msg('Bu fotoğraf açılamadı. Başka bir fotoğraf seç ya da önce ekran görüntüsünü alıp onu dene.'); };
  im.src = url;
}
document.addEventListener('change', e => { if (e.target.classList && e.target.classList.contains('fileIn')) onFile(e); });
document.querySelectorAll('#nav button').forEach(b => b.onclick = () => { const go = b.dataset.go; if (go === 'tour') openMap(); else if (go === 'add') $('#add').classList.add('on'); else openColl(go); });
$('#addClose').onclick = () => $('#add').classList.remove('on');
function updateNav(id){ const cur = (id === 'map' || id === 'city') ? 'tour' : id === 'coll' ? collTab : ''; document.querySelectorAll('#nav button').forEach(b => { if (b.dataset.go === cur) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); }); }
$('#resumeBtn').onclick = () => { collTab = 'memories'; origin = { screen:'coll', tab:'memories' }; startPaint(DB.current, DB.current); };

