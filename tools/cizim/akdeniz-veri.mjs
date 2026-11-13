// Akdeniz verisini oluşturur: src/content/turkiye/akdeniz.json + bolgeler.json'da Akdeniz rehberi
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { A as A1 } from './akdeniz-1.mjs';
import { A as A2 } from './akdeniz-2.mjs';
import { S, GUIDE } from './akdeniz-hatira.mjs';
import { formatGroup } from '../../scripts/content.mjs';
const DIR = fileURLToPath(new URL('../../src/content/turkiye/', import.meta.url));
const A = { ...A1, ...A2 };
const art = f => { const a = f(); return { n:a.n, pal:a.pal, px:a.px }; };
// [çizim anahtarı, kimlik, ad, bilgi, soru, hatıra adı]
const IL = {
  1: { line:'Hoş geldin! Adana’da güneş de sıcak, insanlar da. Önce Taşköprü’ye gidelim.', bye:'Adana’dan şalgam içmeden ayrılmak olmaz, yolun açık olsun!', nb:[33, 51, 38, 46, 80, 31], items:[
    ['taskopru', 'taskopru', 'Taşköprü', 'Seyhan Nehri üzerindeki Taşköprü, Roma döneminde yapıldı. Dünyada hâlâ kullanılan en eski köprülerden biri sayılır.', ['Taşköprü hangi nehrin üzerindedir?', 'Seyhan', 'Ceyhan', 'Göksu'], 'Köprü Magneti'],
    ['adanakebap', 'adanakebap', 'Adana Kebabı', 'Adana kebabı, zırhla kıyılan etin geniş ve yassı şişlere sarılıp közde pişirilmesiyle yapılır. Adana Ticaret Odası’nın başvurusuyla coğrafi işaretle tescillidir.', ['Adana kebabı hangi şişte pişirilir?', 'Geniş, yassı şişte', 'İnce, yuvarlak şişte', 'Tahta çubukta'], 'Lavaş Ekmeği'],
    ['salgam', 'adanasalgam', 'Adana Şalgamı', 'Adana şalgamı, siyah havuç ve bulgur ununun mayalanmasıyla yapılan ekşi, mor renkli bir içecektir. 2020’de coğrafi işaretle tescillendi.', ['Şalgama mor rengini veren nedir?', 'Siyah havuç', 'Pancar', 'Kırmızı lahana'], 'Şalgam Şişesi'] ] },
  7: { line:'Merhaba! Antalya’da deniz de tarih de bol. Haydi, binlerce yıllık bir sahneye çıkalım.', bye:'Antalya’nın güneşi yüzünde, portakal kokusu üstünde kalsın!', nb:[48, 15, 32, 42, 70, 33], items:[
    ['aspendos', 'aspendos', 'Aspendos Tiyatrosu', 'Aspendos Tiyatrosu MS 2. yüzyılda, Roma döneminde yapıldı. Dünyanın en iyi korunmuş antik tiyatrolarından biridir ve bugün hâlâ konserlere ev sahipliği yapar.', ['Aspendos Tiyatrosu hangi dönemde yapıldı?', 'Roma döneminde', 'Osmanlı döneminde', 'Selçuklu döneminde'], 'Tiyatro Maskesi'],
    ['piyaz', 'antalyapiyaz', 'Antalya Piyazı', 'Antalya piyazı, haşlanmış kuru fasulyenin tahinli bir sosla buluşmasıdır. 2017’de coğrafi işaretle tescillendi.', ['Antalya piyazının sosunu farklı kılan nedir?', 'Tahin', 'Yoğurt', 'Domates salçası'], 'Tahin Kavanozu'],
    ['finike', 'finikeportakal', 'Finike Portakalı', 'Finike portakalı, Antalya’nın Finike yöresinde yetişir ve tatlı, sulu yapısıyla bilinir. 2008’de coğrafi işaretle tescillendi.', ['Finike portakalı hangi ilde yetişir?', 'Antalya', 'Rize', 'Erzurum'], 'Portakal Kolonyası'] ] },
  15: { line:'Hoş geldin! Burdur’da göller masmavi, kumsallar bembeyaz. Sana dünyadaki Mars’ı göstereyim mi?', bye:'Burdur’u unutma, cevizin tadı damağında kalsın!', nb:[7, 48, 20, 3, 32], items:[
    ['salda', 'salda', 'Salda Gölü', 'Salda Gölü’nün bembeyaz kıyıları ve mineralleri, NASA’nın Mars’taki Jezero Krateri ile benzerliği nedeniyle bilim insanlarının dikkatini çekti.', ['NASA, Salda Gölü’nü hangi gezegendeki bir kratere benzetti?', 'Mars', 'Venüs', 'Jüpiter'], 'Salda Kartpostalı'],
    ['burdursis', 'burdursis', 'Burdur Şiş', 'Burdur şiş, kıymadan yapılan köftelerin şişe dizilip közde pişirilmesiyle hazırlanır. 2012’de coğrafi işaretle tescillendi.', ['Burdur şiş nasıl pişirilir?', 'Şişe dizilip közde', 'Fırında güveçte', 'Tavada kızartılarak'], 'Közde Biber'],
    ['cevizezmesi', 'cevizezmesi', 'Burdur Ceviz Ezmesi', 'Burdur ceviz ezmesi, ceviz içinden yapılan, rulo biçiminde bir tatlıdır. 2009’da coğrafi işaretle tescillendi.', ['Burdur ceviz ezmesinin ana malzemesi nedir?', 'Ceviz', 'Fındık', 'Badem'], 'Ceviz'] ] },
  31: { line:'Hoş geldin! Hatay’da sofralar zengin, tarih derin. Önce kayadaki kiliseye gidelim.', bye:'Hatay’ın tatları seninle olsun, yine bekleriz!', nb:[1, 80, 27], items:[
    ['stpierre', 'stpierre', 'St. Pierre Kilisesi', 'Antakya’daki St. Pierre Kilisesi, bir mağaranın içine yapılmış, Hristiyanlığın ilk dönemlerinden kalma bir ibadet yeridir. 1963’te hac yeri ilan edildi.', ['St. Pierre Kilisesi nereye yapılmıştır?', 'Bir mağaranın içine', 'Bir adanın üstüne', 'Bir gölün kıyısına'], 'Kandil'],
    ['kunefe', 'antakyakunefe', 'Antakya Künefesi', 'Antakya künefesi, kadayıf ve künefelik peynirin bakır tavada pişirilip şerbetlenmesiyle yapılır. 2008’de coğrafi işaretle tescillendi.', ['Künefe hangi kapta pişirilir?', 'Bakır tavada', 'Toprak güveçte', 'Tandırda'], 'Bakır Künefe Tavası'],
    ['kagitkebap', 'kagitkebap', 'Kağıt Kebabı', 'Antakya kağıt kebabı, domatesli ve biberli kıymanın kâğıt üstüne yayılıp fırında pişirilmesiyle yapılır. 2020’de coğrafi işaretle tescillendi.', ['Kağıt kebabı nasıl pişirilir?', 'Kâğıt üstünde, fırında', 'Şişte, közde', 'Kazanda, haşlanarak'], 'Defne Dalı'] ] },
  32: { line:'Merhaba! Isparta’da seni gül kokusu karşılar. Önce renk renk bir göle bakalım.', bye:'Gül kokusu yolunu süslesin, yine gel!', nb:[3, 42, 7, 15], items:[
    ['egirdir', 'egirdir', 'Eğirdir Gölü', 'Eğirdir Gölü, Türkiye’nin dördüncü büyük gölü ve ikinci büyük tatlı su gölüdür. Rengi gün içinde değiştiği için “yedi renkli göl” diye de anılır.', ['Eğirdir Gölü neden “yedi renkli göl” diye anılır?', 'Rengi gün içinde değiştiği için', 'Yedi adası olduğu için', 'Yedi ırmak döküldüğü için'], 'Kayık Magneti'],
    ['gulyagi', 'ispartagulyagi', 'Isparta Gülyağı', 'Isparta’da yağ gülleri sabah erkenden toplanır ve damıtılarak gül yağı elde edilir. Isparta gülyağı 2019’da coğrafi işaretle tescillendi.', ['Gül yağı için güller ne zaman toplanır?', 'Sabah erkenden', 'Gece yarısı', 'Öğle sıcağında'], 'Gül Suyu Şişesi'],
    ['halisi', 'ispartahali', 'Isparta Halısı', 'İnce Isparta el halısı, 1997’de tescillenen ve Türkiye’nin ilk coğrafi işaretlerinden biri olan bir el sanatıdır.', ['Isparta el halısı coğrafi işaretini hangi yıl aldı?', '1997', '2017', '2023'], 'Halı Anahtarlık'] ] },
  33: { line:'Merhaba! Mersin’de deniz, kale ve tantuni seni bekliyor. Önce denizdeki kaleye bakalım.', bye:'Mersin’den ayrılırken bir dilim cezerye al, yolun tatlı geçsin!', nb:[7, 70, 42, 51, 1], items:[
    ['kizkalesi', 'kizkalesi', 'Kızkalesi', 'Kızkalesi, kıyıdan yaklaşık 600 metre açıktaki bir adacığa kurulmuş bir deniz kalesidir. Halk anlatısına göre bir kral, kızını yılandan korumak için bu kaleyi yaptırmıştır.', ['Halk anlatısına göre Kızkalesi neden yapıldı?', 'Prensesi yılandan korumak için', 'Korsanlardan saklanmak için', 'Deniz feneri olsun diye'], 'Deniz Kabuğu'],
    ['tantuni', 'tantuni', 'Mersin Tantunisi', 'Mersin tantunisi, küçük doğranmış etin sacda pişirilip lavaşa sarılmasıyla yapılır. 2017’de coğrafi işaretle tescillendi.', ['Tantuni hangi kapta pişirilir?', 'Sacda', 'Güveçte', 'Buharda, tencerede'], 'Limon'],
    ['cezerye', 'cezerye', 'Mersin Cezeryesi', 'Mersin cezeryesi havuçtan yapılan bir tatlıdır; adı da Arapçada havuç anlamına gelen kelimeden gelir. 2003’te coğrafi işaretle tescillendi.', ['Cezeryenin ana malzemesi nedir?', 'Havuç', 'Kabak', 'Portakal'], 'Havuç'] ] },
  46: { line:'Hoş geldin! Kahramanmaraş’ta dondurma bıçakla kesilir, tarih kalede yaşar. Tepeye çıkalım!', bye:'Maraş’ın dondurması damağında, biberi yüreğinde kalsın!', nb:[1, 80, 27, 2, 44, 58, 38], items:[
    ['marasKale', 'maraskale', 'Kahramanmaraş Kalesi', 'Kahramanmaraş Kalesi şehrin ortasındaki bir tepededir. Milli Mücadele yıllarında kaledeki Türk bayrağının indirilmesine halkın karşı çıktığı “Bayrak Olayı” burada yaşandı.', ['Kahramanmaraş Kalesi hangi olayla anılır?', 'Bayrak Olayı', 'Lale Devri', 'Çanakkale Savaşı'], 'Bayrak Rozeti'],
    ['dondurma', 'marasdondurma', 'Maraş Dondurması', 'Maraş dondurması tescile göre keçi sütü, salep ve şekerle yapılır; tokmakla dövülerek kıvam kazanır. 2018’de coğrafi işaretle tescillendi.', ['Maraş dondurmasına kıvamını veren nedir?', 'Salep', 'Nişasta', 'Jelatin'], 'Dondurma Külahı'],
    ['marasbiber', 'marasbiber', 'Maraş Biberi', 'Maraş biberi, kurutulup pul hâline getirilen kırmızı biberdir. 2003’te menşe adıyla coğrafi işaret olarak tescillendi.', ['Maraş biberi hangi renktedir?', 'Kırmızı', 'Mor', 'Sarı'], 'Biber Dizisi'] ] },
  80: { line:'Hoş geldin! Osmaniye’de ormanlar yeşil, taşlar konuşur. Aslanlı kapıya gidelim.', bye:'Osmaniye’yi unutma, cebinde biraz yer fıstığı olsun!', nb:[1, 46, 27, 31], items:[
    ['karatepe', 'karatepe', 'Karatepe-Aslantaş', 'Karatepe-Aslantaş’taki iki dilli yazıtlar (Fenikece ve Luvice), Anadolu hiyerogliflerinin çözülmesinde anahtar rol oynadı. Yazıtlar UNESCO Dünya Belleği’ne kaydedildi.', ['Karatepe yazıtları neden önemlidir?', 'Anadolu hiyerogliflerinin çözülmesine yardım etti', 'İlk Türk alfabesini içerir', 'En eski dünya haritasını gösterir'], 'Aslan Biblosu'],
    ['yerfistigi', 'osmaniyefistik', 'Osmaniye Yer Fıstığı', 'Yer fıstığı, adı gibi toprağın altında olgunlaşır. Osmaniye yer fıstığı 2003’te menşe adıyla coğrafi işaret olarak tescillendi.', ['Yer fıstığı nerede olgunlaşır?', 'Toprağın altında', 'Ağacın dalında', 'Suyun içinde'], 'Fıstık Ezmesi Kavanozu'],
    ['kilim', 'karatepekilim', 'Karatepe Kilimi', 'Karatepe kilimi, Osmaniye’nin Kadirli ilçesinde yün iplikle elde dokunur. 2021’de coğrafi işaretle tescillendi.', ['Karatepe kilimi neyden dokunur?', 'Yün iplikten', 'Plastikten', 'Kâğıttan'], 'Kilim Çanta'] ] },
};
const iller = JSON.parse(fs.readFileSync(DIR + 'akdeniz.json', 'utf8'));
iller.forEach(il => {
  const v = IL[il.plaka]; if (!v) throw new Error('veri yok: ' + il.name);
  il.line = v.line; il.bye = v.bye; il.nb = v.nb;
  il.items = v.items.map(([k, id, name, fact, quiz, sv]) => {
    if (!A[k] || !S[k]) throw new Error('çizim yok: ' + k);
    return { id, name, fact, quiz, souvenir:{ name:sv, art:art(S[k]) }, art:art(A[k]) };
  });
});
fs.writeFileSync(DIR + 'akdeniz.json', formatGroup(iller));
const regs = JSON.parse(fs.readFileSync(DIR + 'bolgeler.json', 'utf8'));
const r = regs.find(x => x.id === 'akdeniz'); r.guide = { ini:'KD', name:'Kaptan Deniz', art:art(GUIDE) };
fs.writeFileSync(DIR + 'bolgeler.json', formatGroup(regs));
console.log('Akdeniz:', iller.length, 'il,', iller.reduce((t, i) => t + i.items.length, 0), 'resim');
