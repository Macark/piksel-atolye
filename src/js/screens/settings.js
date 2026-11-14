/* ---------- settings + how to play ---------- */
// Tema: oyunun kendi koyu teması varsayılan; telefon açık modda olsa da oyun aynı görünür.
// Açık tema ya da "Telefona uy" sadece oyuncu Ayarlar'dan seçerse.
const THEMES = { dark:'Koyu', light:'Açık', auto:'Telefona uy' };
function applyTheme(){
  const t = THEMES[DB.theme] ? DB.theme : 'dark', root = document.documentElement;
  if (t === 'auto') delete root.dataset.theme; else root.dataset.theme = t;
  const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = getComputedStyle(root).getPropertyValue('--bg').trim();
}
if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
function setTog(id, on){ $(id).setAttribute('aria-checked', String(!!on)); }
function openSettings(){
  setTog('#tgSound', !DB.muted); setTog('#tgVibe', !DB.noVibe); setTog('#tgNotif', !!DB.notif); setTog('#tgBig', !!DB.bigNum); setTog('#tgCb', !!DB.cb); $('#valAmb').textContent = AMB[DB.amb || 'muzik'];
  $('#valTheme').textContent = THEMES[THEMES[DB.theme] ? DB.theme : 'dark'];
  $('#settings').classList.add('on'); $('#setX').focus();
}
$('#setBtn').onclick = openSettings;
$('#setX').onclick = () => $('#settings').classList.remove('on');
$('#tgSound').onclick = () => { DB.muted = !DB.muted; save(); setMute(); setTog('#tgSound', !DB.muted); if (!DB.muted) tone(660, 0.1); };
$('#tgVibe').onclick = () => { DB.noVibe = !DB.noVibe; save(); setTog('#tgVibe', !DB.noVibe); if (!DB.noVibe && navigator.vibrate) try { navigator.vibrate(20); } catch(e){} };
$('#tgNotif').onclick = () => { DB.notif = !DB.notif; save(); setTog('#tgNotif', DB.notif); if (DB.notif) msg('Hatırlatma açıldı. Gerçek uygulamada her akşam, günün resmini boyamadıysan telefonuna bir bildirim gelir.'); };
$('#rowTheme').onclick = () => { const k = Object.keys(THEMES), i = k.indexOf(THEMES[DB.theme] ? DB.theme : 'dark'); DB.theme = k[(i + 1) % k.length]; save(); applyTheme(); $('#valTheme').textContent = THEMES[DB.theme]; };
$('#rowAmb').onclick = () => { const k = Object.keys(AMB), i = k.indexOf(DB.amb || 'muzik'); DB.amb = k[(i + 1) % k.length]; save(); $('#valAmb').textContent = AMB[DB.amb]; if (DB.amb === 'off') ambStop(); else if (!DB.muted){ ambStart(); setTimeout(() => { if (!$('#paint').classList.contains('on')) ambStop(); }, 4000); } };
$('#tgBig').onclick = () => { DB.bigNum = !DB.bigNum; save(); setTog('#tgBig', DB.bigNum); dirty = true; };
$('#tgCb').onclick = () => { DB.cb = !DB.cb; save(); setTog('#tgCb', DB.cb); dirty = true; if (A && A.idx) buildPal(); };
$('#valLang').textContent = LANG === 'en' ? 'English' : 'Türkçe';
$('#pwinfoX').onclick = $('#pwinfoOk').onclick = () => $('#pwinfo').classList.remove('on');
$('#rowLang').onclick = () => {
  const to = LANG === 'en' ? 'tr' : 'en';
  ask(to === 'en' ? TL('Oyun İngilizceye geçsin mi? Oyun yeniden açılır, ilerlemen korunur.') : TL('Oyun Türkçeye geçsin mi? Oyun yeniden açılır, ilerlemen korunur.'), to === 'en' ? 'ENGLISH' : 'TÜRKÇE', () => {
    try { save(); localStorage.setItem(LANG_KEY, to); } catch(e){}
    location.reload();
  });
};
$('#rowPriv').onclick = () => msg('Fotoğrafların telefonunda kalır, hiçbir sunucuya gönderilmez. Boyadığın resimler, anıların ve ilerlemen sadece bu cihazda saklanır.');
$('#rowMail').onclick = () => msg('Gerçek uygulamada buradan destek ekibine e-posta gönderebilirsin. Bu prototipte görüşlerini doğrudan geliştiriciye iletebilirsin.');
$('#rowRestore').onclick = () => msg('Gerçek uygulamada daha önce satın aldığın coin paketleri, çerçeveler ve reklamsız sürüm App Store ya da Google Play hesabından geri yüklenir.');
$('#rowReset').onclick = () => ask('Bütün ilerlemen silinsin mi? Boyadığın resimler, anıların, coinlerin ve pasaportun gider. Geri getirilemez.', 'SIFIRLA', () => { try { localStorage.removeItem(KEY); } catch(e){} location.reload(); });
$('#rowHow').onclick = () => { $('#settings').classList.remove('on'); gtOpen(); };
const HOWTO = [
  ['🎨', 'Rengi seç, boya', 'Alttan bir renk seç. O rengin numarasının yazdığı karelere dokun ya da parmağını üstlerinden sür.'],
  ['🤏', 'Yakınlaştır, kaydır', 'İki parmakla yakınlaştır ve kaydır. Kalan bir kareyi bulamazsan, rengin butonuna bir kez daha dokun.'],
  ['⭐', 'Yıldız ve coin', 'Hiç yanlış numaraya dokunmadan bitirirsen 3 yıldız alırsın. Her resim coin kazandırır.'],
  ['🪣', 'Ressamın aletleri', 'Boya Kovası, Altın Fırça, Boya Patlaması ve Kartal Gözü işini kolaylaştırır. Boyama ekranında, renklerin üstünde durur ve coinle kullanılır.'],
  ['🌍', 'Gez ve anı biriktir', 'Dünya Turu’nda şehirleri bitir, pasaportuna damga topla. Kendi fotoğraflarını da piksel anılara çevir.'],
];
let htI = 0;
function renderHowto(){
  const [ico, t, d] = HOWTO[htI];
  $('#htSlide').innerHTML = `<span class="ico" aria-hidden="true">${ico}</span><h3></h3><p></p>`; $('#htSlide').querySelector('h3').textContent = t; $('#htSlide').querySelector('p').textContent = d;
  $('#htDots').innerHTML = HOWTO.map((_, k) => `<i class="${k === htI ? 'on' : ''}"></i>`).join('');
  $('#htPrev').disabled = htI === 0; $('#htNext').textContent = htI === HOWTO.length - 1 ? 'BAŞLA' : 'İLERİ';
}
function openHowto(){ htI = 0; renderHowto(); $('#howto').classList.add('on'); $('#htNext').focus(); }
function closeHowto(){ $('#howto').classList.remove('on'); if (!DB.seenHowto){ DB.seenHowto = true; save(); } }
$('#htPrev').onclick = () => { if (htI > 0){ htI--; renderHowto(); } };
$('#htNext').onclick = () => { if (htI < HOWTO.length - 1){ htI++; renderHowto(); } else closeHowto(); };
$('#htX').onclick = closeHowto;
