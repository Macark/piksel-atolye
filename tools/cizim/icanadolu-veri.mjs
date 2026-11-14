// İç Anadolu verisini oluşturur: src/content/turkiye/icanadolu.json + bolgeler.json'da rehber
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { A as A1 } from './icanadolu-1.mjs';
import { A as A2 } from './icanadolu-2.mjs';
import { A as A3 } from './icanadolu-3.mjs';
import { S, GUIDE } from './icanadolu-hatira.mjs';
import { formatGroup } from '../../scripts/content.mjs';
const DIR = fileURLToPath(new URL('../../src/content/turkiye/', import.meta.url));
const A = { ...A1, ...A2, ...A3 };
const art = f => { const a = f(); return { n:a.n, pal:a.pal, px:a.px }; };
// [çizim anahtarı, kimlik, ad, bilgi, soru, hatıra adı]
const IL = {
  68: { line:'Hoş geldin! Aksaray’da vadiler derin, göller tuzlu. Kervanların yolundan gidelim.', bye:'Aksaray’dan bir kervan gibi uzun ve güzel bir yolculuğa!', nb:[6, 40, 50, 51, 42], items:[
    ['ihlara', 'ihlara', 'Ihlara Vadisi', 'Ihlara Vadisi, Melendiz Çayı’nın oyduğu derin bir kanyondur. Yamaçlarında kayaya oyulmuş eski kiliseler vardır.', ['Ihlara Vadisi’ni hangi akarsu oydu?', 'Melendiz Çayı', 'Fırat Nehri', 'Meriç Nehri'], 'Kaya Kilisesi Magneti'],
    ['sultanhani', 'sultanhani', 'Sultanhanı Kervansarayı', 'Sultanhanı Kervansarayı, Selçuklu döneminde 1229’da yapıldı. Kervanlar ve tüccarlar yolculuk sırasında burada konaklardı.', ['Kervansaraylarda kimler konaklardı?', 'Kervanlar ve tüccarlar', 'Denizciler', 'Kayakçılar'], 'Deve Biblosu'],
    ['tuzgolu', 'tuzgolu', 'Tuz Gölü', 'Tuz Gölü, Türkiye’nin en büyük ikinci gölüdür. Suyu çok tuzludur; yazın sular çekilince geriye bembeyaz bir tuz tabakası kalır.', ['Yazın Tuz Gölü’nde ne olur?', 'Sular çekilir, tuz kalır', 'Göl donar', 'Göl taşar'], 'Tuz Kristali'] ] },
  6: { line:'Hoş geldin! Ankara, Cumhuriyetimizin başkenti. Gel, önce Anıtkabir’e gidelim.', bye:'Ankara’dan gururla ayrıl, yolun açık olsun!', nb:[18, 71, 40, 68, 42, 26, 14], items:[
    ['anitkabir', 'anitkabir', 'Anıtkabir', 'Anıtkabir, Atatürk’ün anıt mezarıdır. 1953’te tamamlandı ve her yıl milyonlarca kişi tarafından ziyaret edilir.', ['Anıtkabir kimin anıt mezarıdır?', 'Atatürk’ün', 'Fatih Sultan Mehmet’in', 'Mimar Sinan’ın'], 'Kırmızı Beyaz Kurdele'],
    ['beypazari', 'beypazarikurusu', 'Beypazarı Kurusu', 'Beypazarı kurusu, uzun süre bozulmadan saklanabilen kuru bir pastadır; çayla yenir. 2013’te coğrafi işaretle tescillendi.', ['Beypazarı kurusu genellikle neyle yenir?', 'Çayla', 'Çorbayla', 'Pilavla'], 'Telkari Bilezik'],
    ['ankarakecisi', 'ankarakecisi', 'Ankara Keçisi', 'Ankara keçisinin uzun, ipeksi tüyüne tiftik denir. Bu tüyden değerli kumaşlar ve yün ipler yapılır.', ['Ankara keçisinin tüyüne ne denir?', 'Tiftik', 'Pamuk', 'Keçe'], 'Tiftik Atkı'] ] },
  18: { line:'Merhaba! Çankırı’da yerin altında tuzdan bir dünya var. Fenerini al, inelim!', bye:'Çankırı’dan tatlı bir hatırayla ayrıl!', nb:[37, 19, 71, 6, 14, 78], items:[
    ['tuzmagarasi', 'tuzmagarasi', 'Çankırı Tuz Mağarası', 'Çankırı Tuz Mağarası, yerin altındaki kaya tuzunun çıkarılmasıyla oluşmuş galerilerdir; bugün ziyaret edilebilir.', ['Çankırı Tuz Mağarası’ndan ne çıkarılır?', 'Kaya tuzu', 'Kömür', 'Altın'], 'Tuz Lambası'],
    ['yumurtatatlisi', 'yumurtatatlisi', 'Çankırı Yumurta Tatlısı', 'Çankırı yumurta tatlısı, şerbetli bir yöresel tatlıdır ve coğrafi işaretle tescillidir.', ['Çankırı yumurta tatlısı nasıl bir tatlıdır?', 'Şerbetli', 'Dondurulmuş', 'Tuzlu'], 'Tatlı Tabağı'],
    ['ilgaz', 'ilgaz', 'Ilgaz Dağı', 'Ilgaz Dağı, Çankırı ile Kastamonu arasında yükselir; kışın kayak merkeziyle bilinir.', ['Ilgaz Dağı kışın neyle bilinir?', 'Kayakla', 'Sörfle', 'Dalışla'], 'Kayak Gözlüğü'] ] },
  26: { line:'Hoş geldin! Eskişehir’de evler rengârenk, taşlar bembeyaz. Odunpazarı’na gidelim!', bye:'Eskişehir’den çiböreğin tadıyla ayrıl!', nb:[11, 14, 6, 42, 3, 43], items:[
    ['odunpazari', 'odunpazari', 'Odunpazarı Evleri', 'Odunpazarı, renkli cumbalı Osmanlı evleriyle ünlü tarihi bir semttir.', ['Odunpazarı evleri neyiyle dikkat çeker?', 'Renkli cumbalarıyla', 'Cam kubbeleriyle', 'Taş kuleleriyle'], 'Ahşap Ev Magneti'],
    ['luletasi', 'luletasi', 'Eskişehir Lületaşı', 'Lületaşı, yumuşakken kolayca oyulup kuruyunca sertleşen beyaz bir taştır. Eskişehir’in simgesidir ve coğrafi işaretle tescillidir.', ['Lületaşı hangi renktedir?', 'Beyaz', 'Siyah', 'Mavi'], 'Lületaşı Kolye'],
    ['ciborek', 'ciborek', 'Eskişehir Çiböreği', 'Çibörek, Kırım Tatarlarından kalan, yarım ay biçimli, kızartılmış bir böreğidir. Eskişehir çiböreği 2012’de coğrafi işaretle tescillendi.', ['Çibörek hangi biçimdedir?', 'Yarım ay', 'Kare', 'Yıldız'], 'Ayran Bardağı'] ] },
  70: { line:'Merhaba! Karaman, Türkçenin bayramının doğduğu yer. Gel, eski kiliselerle başlayalım.', bye:'Karaman’dan güzel Türkçemizle ayrıl, yolun açık olsun!', nb:[42, 33, 7], items:[
    ['binbirkilise', 'binbirkilise', 'Binbir Kilise', 'Karadağ’ın eteklerindeki Binbir Kilise, Bizans döneminden kalma çok sayıda kilise kalıntısının bulunduğu bir bölgedir.', ['Binbir Kilise’deki kalıntılar hangi döneme aittir?', 'Bizans', 'Osmanlı', 'Cumhuriyet'], 'Mozaik Parça'],
    ['divlepeyniri', 'divlepeyniri', 'Divle Obruğu Peyniri', 'Karaman Divle Obruğu tulum peyniri, yer altındaki bir obrukta (doğal mağara) olgunlaştırılır. 2017’de menşe adıyla tescillendi.', ['Divle peyniri nerede olgunlaşır?', 'Bir obrukta (mağarada)', 'Buzdolabında', 'Güneşin altında'], 'Peynir Bıçağı'],
    ['ferman', 'karamanferman', 'Türkçe Fermanı', '13 Mayıs 1277’de Karamanoğlu Mehmet Bey, Türkçenin resmî dil olarak kullanılmasını isteyen fermanını yayımladı. Bu gün Türk Dil Bayramı olarak kutlanır.', ['Türk Dil Bayramı hangi gün kutlanır?', '13 Mayıs', '23 Nisan', '29 Ekim'], 'Divit'] ] },
  38: { line:'Hoş geldin! Kayseri’de Erciyes karlı, mantı minicik, pastırma meşhur!', bye:'Kayseri’den karnın tok, gönlün şen ayrıl!', nb:[66, 58, 46, 1, 51, 50], items:[
    ['erciyes', 'erciyes', 'Erciyes Dağı', 'Erciyes Dağı, İç Anadolu’nun en yüksek dağıdır ve sönmüş bir yanardağdır. Kışın kayak merkezi olarak kullanılır.', ['Erciyes Dağı nasıl bir dağdır?', 'Sönmüş bir yanardağ', 'Bir mercan adası', 'Bir buzul'], 'Bere'],
    ['manti', 'kayserimantisi', 'Kayseri Mantısı', 'Kayseri mantısı minicik yapılır; geleneğe göre bir kaşığa 40 tane sığmalıdır. Coğrafi işaretle tescillidir.', ['Kayseri mantısının özelliği nedir?', 'Çok küçük olması', 'Çok büyük olması', 'Tatlı olması'], 'Oklava'],
    ['pastirma', 'kayseripastirmasi', 'Kayseri Pastırması', 'Kayseri pastırması, çemenle kaplanıp kurutulan bir et ürünüdür. 2002’de coğrafi işaretle tescillendi; Avrupa Birliği’nde de tescillidir.', ['Pastırmanın dışındaki kırmızı karışıma ne denir?', 'Çemen', 'Tahin', 'Pekmez'], 'Çemen Kâsesi'] ] },
  71: { line:'Merhaba! Kırıkkale’den Türkiye’nin en uzun ırmağı geçer. Kıyısında bir mola verelim!', bye:'Kırıkkale’den Kızılırmak kadar uzun bir yolculuk dilerim!', nb:[6, 18, 19, 66, 40], items:[
    ['kizilirmak', 'kizilirmak', 'Kızılırmak', 'Kızılırmak, kaynağı da denize döküldüğü yer de Türkiye’de olan en uzun ırmaktır. Adını sularının kızılımsı renginden alır.', ['Kızılırmak hangi denize dökülür?', 'Karadeniz', 'Akdeniz', 'Ege Denizi'], 'Olta'],
    ['keskintava', 'keskintava', 'Keskin Tava', 'Keskin tava, toprak tavada pişirilen etli bir yöresel yemektir ve coğrafi işaretle tescillidir.', ['Keskin tava nasıl bir kapta pişirilir?', 'Toprak tavada', 'Kâğıtta', 'Bambu sepette'], 'Toprak Tava'],
    ['deliceuzum', 'deliceuzum', 'Delice Beyazı Üzüm', 'Delice beyazı, Kırıkkale’nin Delice ilçesinde yetişen beyaz bir üzümdür ve coğrafi işaretle tescillidir.', ['Delice beyazı hangi meyvenin çeşididir?', 'Üzüm', 'Elma', 'Kiraz'], 'Üzüm Sepeti'] ] },
  40: { line:'Hoş geldin! Kırşehir’de yıldızlara bakılır, bağlamalar çalınır. Gökyüzüyle başlayalım!', bye:'Kırşehir’den bir türkü mırıldanarak ayrıl!', nb:[71, 66, 50, 68, 6], items:[
    ['cacabey', 'cacabey', 'Cacabey Medresesi', 'Cacabey Medresesi 1272’de, gökbilim eğitimi verilen bir medrese olarak yapıldı. Bugün cami olarak kullanılır.', ['Cacabey Medresesi’nde ne öğretilirdi?', 'Gökbilim', 'Denizcilik', 'Aşçılık'], 'Usturlap'],
    ['ahievran', 'ahievran', 'Ahilik', 'Ahilik, esnaf ve zanaatkârların dürüstlük ve dayanışma üzerine kurduğu bir teşkilattır. Kurucusu sayılan Ahi Evran’ın türbesi Kırşehir’dedir.', ['Ahilik kimleri bir araya getiren bir teşkilattır?', 'Esnaf ve zanaatkârları', 'Denizcileri', 'Gökbilimcileri'], 'Deri Kemer'],
    ['neset', 'nesetbaglama', 'Bozkırın Tezenesi', 'Kırşehirli halk ozanı Neşet Ertaş, bağlamasıyla “Bozkırın Tezenesi” olarak anılır.', ['Neşet Ertaş hangi çalgıyla tanınır?', 'Bağlama', 'Piyano', 'Keman'], 'Tezene'] ] },
  42: { line:'Merhaba! Konya, Türkiye’nin yüzölçümü en büyük ili. Yeşil kubbeyle başlayalım!', bye:'Konya’dan gönlün huzurla dolu ayrıl!', nb:[6, 26, 3, 32, 7, 70, 33, 51, 68], items:[
    ['mevlana', 'mevlana', 'Mevlana Müzesi', 'Konya’daki Mevlana Müzesi, yeşil kubbesiyle tanınır. Mevlevi sema töreni UNESCO Somut Olmayan Kültürel Miras listesindedir.', ['Mevlana Müzesi’nin kubbesi hangi renktedir?', 'Yeşil', 'Mor', 'Kırmızı'], 'Semazen Biblosu'],
    ['etliekmek', 'konyaetliekmek', 'Konya Etli Ekmeği', 'Konya etli ekmeği, upuzun ve ince hamurun üstüne kıyma yayılarak fırında pişirilir. Coğrafi işaretle tescillidir.', ['Etli ekmek nerede pişirilir?', 'Fırında', 'Buharda', 'Mangalda'], 'Fırın Küreği'],
    ['catalhoyuk', 'catalhoyuk', 'Çatalhöyük', 'Çatalhöyük yaklaşık 9000 yıllık bir yerleşimdir. Evlere kapıdan değil, çatıdaki açıklıktan merdivenle girilirdi. 2012’de UNESCO Dünya Mirası Listesi’ne girdi.', ['Çatalhöyük’te evlere nereden girilirdi?', 'Çatıdan', 'Bodrumdan', 'Pencereden'], 'Kil Heykelcik'] ] },
  50: { line:'Hoş geldin! Nevşehir’de gökyüzü balonlarla, toprak peri bacalarıyla dolu!', bye:'Kapadokya’dan bir balon kadar hafif ayrıl!', nb:[40, 66, 38, 51, 68], items:[
    ['peribacalari', 'peribacalari', 'Peri Bacaları', 'Kapadokya’nın peri bacaları, yanardağ küllerinin rüzgâr ve yağmurla aşınmasıyla oluştu. Göreme 1985’te UNESCO Dünya Mirası Listesi’ne girdi.', ['Peri bacaları nasıl oluştu?', 'Rüzgâr ve yağmurla aşınarak', 'İnsanlar inşa ederek', 'Depremle bir gecede'], 'Balon Magneti'],
    ['avanoscomlek', 'avanoscomlegi', 'Avanos Çömleği', 'Avanos çömlekleri, Kızılırmak’ın kızıl kilinden yapılır. 2017’de menşe adıyla tescillendi.', ['Avanos çömlekleri neyden yapılır?', 'Kızılırmak kilinden', 'Camdan', 'Demirden'], 'Mini Testi'],
    ['derinkuyu', 'derinkuyu', 'Derinkuyu Yeraltı Şehri', 'Derinkuyu, kat kat yerin altına inen bir yeraltı şehridir. Girişleri tekerlek biçiminde taş kapılarla kapatılırdı.', ['Derinkuyu’nun kapıları nasıldı?', 'Tekerlek biçiminde taş', 'Camdan', 'Ahşap perde'], 'Fener'] ] },
  51: { line:'Merhaba! Niğde’de dağlar sivri, manastırlar kayaya oyulmuş. Hadi zirvelere!', bye:'Niğde’den dağlar kadar sağlam anılarla ayrıl!', nb:[50, 38, 1, 33, 42, 68], items:[
    ['aladaglar', 'aladaglar', 'Aladağlar', 'Aladağlar, sivri kayalık zirveleriyle dağcıların ve doğa yürüyüşçülerinin gözdesidir.', ['Aladağlar en çok kimlerin gözdesidir?', 'Dağcıların', 'Dalgıçların', 'Denizcilerin'], 'Pusula'],
    ['gumusler', 'gumusler', 'Gümüşler Manastırı', 'Gümüşler Manastırı kayaya oyulmuştur; içindeki renkli duvar resimleri (freskler) iyi korunmuştur.', ['Gümüşler Manastırı nasıl yapılmıştır?', 'Kayaya oyularak', 'Buzdan', 'Camdan'], 'Fresk Parçası'],
    ['nigdetava', 'nigdetavasi', 'Niğde Tavası', 'Niğde tavası, etle hazırlanan bir yöresel yemektir. 2023’te coğrafi işaretle tescillendi.', ['Niğde tavası hangi ilin yemeğidir?', 'Niğde', 'Bartın', 'Edirne'], 'Bakır Kepçe'] ] },
  58: { line:'Hoş geldin! Sivas’ta taşlar dantel gibi işlenmiş, çoban köpekleri kocaman!', bye:'Sivas’tan bir Kangal kadar sadık dostlarla ayrıl!', nb:[66, 60, 52, 28, 24, 44, 46, 38], items:[
    ['divrigi', 'divrigi', 'Divriği Ulu Camii', 'Divriği Ulu Camii ve Darüşşifası, taş kapılarındaki eşsiz oymalarla ünlüdür. 1985’te UNESCO Dünya Mirası Listesi’ne giren ilk Türk eserlerindendir.', ['Divriği Ulu Camii neyiyle ünlüdür?', 'Taş oymalarıyla', 'Cam mozaikleriyle', 'Altın kubbesiyle'], 'Taş Oyma Karo'],
    ['sivaskofte', 'sivaskoftesi', 'Sivas Köftesi', 'Sivas köftesi ızgarada pişirilen bir köftedir. 2011’de coğrafi işaretle tescillendi.', ['Sivas köftesi nasıl pişirilir?', 'Izgarada', 'Haşlanarak', 'Şerbetlenerek'], 'Mini Mangal'],
    ['kangal', 'kangalkopegi', 'Kangal Köpeği', 'Kangal köpeği, sürüleri kurtlara karşı koruyan iri bir çoban köpeğidir; adını Sivas’ın Kangal ilçesinden alır.', ['Kangal köpeğinin görevi nedir?', 'Sürüleri korumak', 'Kızak çekmek', 'Balık tutmak'], 'Köpek Tasması'] ] },
  66: { line:'Merhaba! Yozgat’ta Türkiye’nin ilk milli parkı var. Çamların gölgesinde dinlenelim!', bye:'Yozgat’tan çam kokusuyla ayrıl, yolun açık olsun!', nb:[19, 5, 60, 58, 38, 50, 40, 71], items:[
    ['camlik', 'yozgatcamligi', 'Yozgat Çamlığı', 'Yozgat Çamlığı, 1958’de Türkiye’nin ilk milli parkı ilan edildi.', ['Türkiye’nin ilk milli parkı hangisidir?', 'Yozgat Çamlığı', 'Kuşcenneti', 'Spil Dağı'], 'Çam Fidanı'],
    ['tandir', 'yozgattandir', 'Yozgat Tandır Kebabı', 'Yozgat tandır kebabı, tandırda uzun süre pişirilen yumuşacık bir et yemeğidir ve coğrafi işaretle tescillidir.', ['Tandır kebabı nerede pişirilir?', 'Tandırda', 'Buzdolabında', 'Güneşte'], 'Kil Tandır Biblosu'],
    ['parmakcoregi', 'parmakcoregi', 'Yozgat Parmak Çöreği', 'Yozgat parmak çöreği, parmak biçiminde küçük çöreklerdir ve coğrafi işaretle tescillidir.', ['Parmak çöreği hangi biçimdedir?', 'Parmak biçiminde', 'Daire', 'Yıldız'], 'Hamur Kesici'] ] },
};
const iller = JSON.parse(fs.readFileSync(DIR + 'icanadolu.json', 'utf8'));
iller.forEach(il => {
  const v = IL[il.plaka]; if (!v) throw new Error('veri yok: ' + il.name);
  il.line = v.line; il.bye = v.bye; il.nb = v.nb;
  il.items = v.items.map(([k, id, name, fact, quiz, sv]) => {
    if (!A[k] || !S[k]) throw new Error('çizim yok: ' + k);
    return { id, name, fact, quiz, souvenir:{ name:sv, art:art(S[k]) }, art:art(A[k]) };
  });
});
fs.writeFileSync(DIR + 'icanadolu.json', formatGroup(iller));
const regs = JSON.parse(fs.readFileSync(DIR + 'bolgeler.json', 'utf8'));
const r = regs.find(x => x.id === 'icanadolu'); r.guide = { ini:'ÇK', name:'Çoban Kaan', art:art(GUIDE) };
fs.writeFileSync(DIR + 'bolgeler.json', formatGroup(regs));
console.log('İç Anadolu:', iller.length, 'il,', iller.reduce((t, i) => t + i.items.length, 0), 'resim');
