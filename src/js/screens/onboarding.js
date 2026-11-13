/* ---------- ilk açılış tanıtımı: ana sayfadaki her bölümü sırayla gösterir ---------- */
const GT = [
  { t:'Piksel Atölye’ye hoş geldin!\n\nResimler numaralı karelerden oluşur. Alttan bir renk seç, aynı numaralı karelere dokun ya da parmağını üstlerinden sür. Hatasız bitirirsen 3 yıldız alırsın.\n\nŞimdi sana neyin nerede olduğunu göstereyim.' },
  { el:'#dailyBtn', t:'GÜNÜN RESMİ\nHer gün yeni bir resim. Her gün boyarsan serin uzar ve günün sıralamasına girersin.' },
  { el:'#eventBtn', t:'ETKİNLİK\nKısa süreliğine gelen özel resimler. Hepsini bitirene sadece bu etkinliğe özel bir çerçeve.' },
  { el:'#tourBtn', t:'DÜNYA TURU\nŞehir şehir gez, resimleri boya, pasaportuna damga topla. Rehberler soru sorar; bilirsen hatıra kazanırsın.' },
  { el:'#trBtn', t:'TÜRKİYE TURU\nMemleketinden başla; illerin meşhur yerlerini, lezzetlerini boya. Bir il bitince komşuları açılır.' },
  { el:'#collBtn', t:'ALBÜMLER\nKonularına göre hazır resimler: hayvanlar, uzay, tatlılar ve dahası. Bir albümü bitirene ödül.' },
  { el:'#memBtn', t:'ANILARIM\nKendi fotoğraflarından boyadığın resimler burada saklanır.' },
  { el:'#photoBtn', t:'FOTOĞRAF EKLE\nKendi fotoğrafını piksele çevir ve boya. Fotoğrafın telefonundan çıkmaz.' },
  { el:'#dealBtn', t:'FIRSATLAR\nMarkaların resimlerini boya, indirim kuponu kazan.' },
  { el:'#statsBtn', t:'İstatistiklerin, rozetlerin ve günün sıralaması burada.' },
  { el:'#setBtn', t:'Ses, tema ve dil ayarları burada. Bu tanıtımı tekrar görmek için: Ayarlar > Nasıl oynanır?' },
  { t:'Hazırsın!\n\nİlk resmin için Günün Resmi güzel bir başlangıç.', last:true }
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
  $('#gtStep').textContent = (gtI + 1) + ' / ' + gtSteps.length;
  const tl = st.t.split('\n'); $('#gtText').innerHTML = ''; const hb = document.createElement('b'); hb.textContent = tl[0]; $('#gtText').append(hb, document.createTextNode('\n' + tl.slice(1).join('\n')));
  $('#gtPrev').style.visibility = gtI ? 'visible' : 'hidden';
  $('#gtNext').textContent = st.last ? 'BAŞLA' : 'İLERİ';
  $('#gtSkip').style.visibility = st.last ? 'hidden' : 'visible';
  if (!st.el){ hole.classList.add('center'); box.style.top = ''; box.style.bottom = ''; box.style.top = Math.max(60, innerHeight * 0.28) + 'px'; return; }
  const el = $(st.el); el.scrollIntoView({ block:'nearest' });
  const r = el.getBoundingClientRect(); hole.classList.remove('center');
  Object.assign(hole.style, { left:r.left + 'px', top:r.top + 'px', width:r.width + 'px', height:r.height + 'px' });
  requestAnimationFrame(() => { const bh = box.offsetHeight, below = r.bottom + 16, above = r.top - bh - 16;
    box.style.top = (below + bh < innerHeight - 8 ? below : Math.max(8, above)) + 'px'; });
}
$('#gtNext').onclick = () => { if (gtSteps[gtI].last){ gtClose(); return; } gtI++; gtRender(); };
$('#gtPrev').onclick = () => { if (gtI){ gtI--; gtRender(); } };
$('#gtSkip').onclick = gtClose;
addEventListener('resize', () => { if (!$('#gtour').hidden) gtRender(); });

applyTheme();
if (!DB.seenHowto) setTimeout(gtOpen, 400);

