// Marmara verisini oluşturur: src/content/turkiye/marmara.json + bolgeler.json'da Marmara rehberi
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { A as A1 } from './marmara-1.mjs';
import { A as A2 } from './marmara-2.mjs';
import { S, GUIDE } from './marmara-hatira.mjs';
import { formatGroup } from '../../scripts/content.mjs';
const DIR = fileURLToPath(new URL('../../src/content/turkiye/', import.meta.url));
const A = { ...A1, ...A2 };
const art = f => { const a = f(); return { n:a.n, pal:a.pal, px:a.px }; };
// [çizim anahtarı, kimlik, ad, bilgi, soru, hatıra adı]
const IL = {
  10: { line:'Hoş geldin! Balıkesir’de zeytinlikler, kuşlar ve tatlı höşmerim seni bekliyor.', bye:'Balıkesir’den ayrılırken zeytinyağı kokusunu da yanına al!', nb:[17, 16, 43, 45, 35], items:[
    ['kuscenneti', 'kuscenneti', 'Kuş Cenneti', 'Balıkesir’deki Kuşcenneti Milli Parkı, Manyas Gölü kıyısındadır. Burada 266 kuş türü görülür; pelikanlar en ünlü konuklarındandır.', ['Kuşcenneti Milli Parkı hangi gölün kıyısındadır?', 'Manyas Gölü', 'Van Gölü', 'Tuz Gölü'], 'Dürbün'],
    ['hosmerim', 'hosmerim', 'Balıkesir Höşmerimi', 'Höşmerim, taze peynir ve şekerle yapılan yumuşak bir tatlıdır. Balıkesir höşmerimi 2011’den beri coğrafi işaretle korunur.', ['Höşmerimin ana malzemesi nedir?', 'Taze peynir', 'Pirinç', 'Kabak'], 'Ahşap Kaşık'],
    ['ayvalikzeytin', 'ayvalikzeytin', 'Ayvalık Zeytinyağı', 'Ayvalık zeytinyağı, yöreye özgü zeytinlerden elde edilir. 2007’de menşe adıyla coğrafi işaret olarak tescillendi.', ['Zeytinyağı neyden elde edilir?', 'Zeytinden', 'Fındıktan', 'Ayçiçeğinden'], 'Zeytinyağlı Sabun'] ] },
  11: { line:'Hoş geldin! Bilecik’te Osmanlı’nın ilk adımları atıldı. Gel, Söğüt’e gidelim.', bye:'Bilecik’i unutma, ayva lokumunun tadı damağında kalsın!', nb:[16, 54, 14, 26, 43], items:[
    ['ertugrulgazi', 'ertugrulgazi', 'Ertuğrul Gazi Türbesi', 'Söğüt’teki türbe, Osman Bey’in babası Ertuğrul Gazi adına yapılmıştır. Osmanlı Devleti’nin kuruluşu Söğüt ve çevresinde başladı.', ['Ertuğrul Gazi Türbesi hangi ilçededir?', 'Söğüt', 'Bozüyük', 'Pazaryeri'], 'Ok ve Yay'],
    ['ayvalokumu', 'ayvalokumu', 'Osmaneli Ayva Lokumu', 'Osmaneli ayva lokumu, yörede yetişen ayvayla yapılır. 2021’de coğrafi işaretle tescillendi.', ['Osmaneli lokumuna tadını veren meyve hangisidir?', 'Ayva', 'Çilek', 'Elma'], 'Ayva'],
    ['lefkebezi', 'lefkebezi', 'Lefke Bezi', 'Lefke bezi, Osmaneli’de el tezgâhlarında dokunan geleneksel bir bezdir. 2024’te coğrafi işaretle tescillendi.', ['Lefke bezi nasıl üretilir?', 'El tezgâhında dokunarak', 'Kâğıttan kesilerek', 'Fırında pişirilerek'], 'Dokuma Mekiği'] ] },
  16: { line:'Merhaba! Bursa, Osmanlı’nın ilk başkentlerinden biri. Uludağ’ın eteğindeki köye gidelim.', bye:'Bursa’dan kestane şekeri almadan dönme!', nb:[77, 41, 11, 43, 10], items:[
    ['cumalikizik', 'cumalikizik', 'Cumalıkızık', 'Uludağ’ın eteğindeki Cumalıkızık, yaklaşık 700 yıllık bir Osmanlı köyüdür. 2014’te Bursa ile birlikte UNESCO Dünya Mirası Listesi’ne girdi.', ['Cumalıkızık hangi dağın eteğindedir?', 'Uludağ', 'Erciyes', 'Ağrı Dağı'], 'Cumba Magneti'],
    ['iskender', 'bursadoner', 'Bursa Döneri', 'Bursa döneri, pide üstünde domates sosu ve kızgın tereyağıyla sunulan İskender kebabıyla ünlüdür. Bursa döner kebabı 2022’de coğrafi işaretle tescillendi.', ['İskender kebabı hangi şehirle özdeşleşmiştir?', 'Bursa', 'Van', 'Rize'], 'Bakır Sahan'],
    ['kestanesekeri', 'kestanesekeri', 'Bursa Kestane Şekeri', 'Bursa kestane şekeri, kestanelerin şekerli şerbette kaynatılıp şekerlenmesiyle yapılır. 2021’de coğrafi işaretle tescillendi.', ['Kestane şekerinin ana malzemesi nedir?', 'Kestane', 'Fındık', 'Ceviz'], 'Kestane'] ] },
  17: { line:'Hoş geldin! Çanakkale’de destanlar ve efsaneler iç içe. Önce tahta ata bakalım.', bye:'Çanakkale’yi yüreğinde taşı, yine gel!', nb:[22, 59, 10], items:[
    ['truvaati', 'truvaati', 'Truva Atı', 'Efsaneye göre Akalar, içine askerlerini sakladıkları dev bir tahta atla Troya’ya girdi. Troya Antik Kenti 1998’de UNESCO Dünya Mirası Listesi’ne alındı.', ['Efsaneye göre askerler Troya’ya neyin içinde girdi?', 'Tahta bir atın', 'Bir geminin', 'Bir fıçının'], 'Tahta At Biblosu'],
    ['ezine', 'ezinepeyniri', 'Ezine Peyniri', 'Ezine peyniri 2007’de menşe adıyla coğrafi işaret olarak tescillendi. Avrupa Birliği’nde de tescilli bir beyaz peynirdir.', ['Ezine peyniri hangi ildendir?', 'Çanakkale', 'Kars', 'Trabzon'], 'Peynir Tenekesi'],
    ['sehitlerabidesi', 'sehitlerabidesi', 'Şehitler Abidesi', 'Gelibolu Yarımadası’ndaki Çanakkale Şehitler Abidesi, 1915 Çanakkale Savaşları’nda hayatını kaybedenlerin anısına yapıldı ve 1960’ta açıldı. Yüksekliği yaklaşık 42 metredir.', ['Çanakkale Şehitler Abidesi hangi yarımadadadır?', 'Gelibolu Yarımadası', 'Datça Yarımadası', 'Kapıdağ Yarımadası'], 'Gelincik'] ] },
  22: { line:'Hoş geldin! Edirne’de Mimar Sinan’ın ustalık eseri seni bekliyor.', bye:'Edirne’den meyve sabunu kokusuyla ayrıl, yolun açık olsun!', nb:[39, 59, 17], items:[
    ['selimiye', 'selimiye', 'Selimiye Camii', 'Selimiye Camii, Mimar Sinan’ın “ustalık eserim” dediği yapıdır. 2011’de UNESCO Dünya Mirası Listesi’ne alındı.', ['Mimar Sinan hangi eserine “ustalık eserim” demiştir?', 'Selimiye Camii', 'Süleymaniye Camii', 'Şehzade Camii'], 'Lale Çinisi'],
    ['tavaciger', 'tavaciger', 'Edirne Tava Ciğeri', 'Edirne tava ciğeri, ince dilimlenmiş ciğerin unlanıp kızartılmasıyla yapılır; yanında kızarmış kuru biber sunulur. 2010’da coğrafi işaretle tescillendi.', ['Edirne ciğerinin yanında ne sunulur?', 'Kızarmış kuru biber', 'Pilav', 'Patates püresi'], 'Kırkpınar Güreşçisi'],
    ['meyvesabunu', 'meyvesabunu', 'Edirne Meyve Sabunu', 'Edirne mis meyve sabunları, meyve biçiminde yapılan kokulu sabunlardır. 2019’da coğrafi işaretle tescillendi.', ['Edirne meyve sabunlarına hangi biçim verilir?', 'Meyve biçimi', 'Hayvan biçimi', 'Yıldız biçimi'], 'Çilek Sabun'] ] },
  34: { line:'Merhaba! İstanbul’u Dünya Turu’nda da gezdin ama sırları bitmez. Bu sefer başka köşelere gidelim.', bye:'İstanbul seni yine bekler, yolun açık olsun!', nb:[39, 59, 41], items:[
    ['ayasofya', 'ayasofya', 'Ayasofya', 'Ayasofya 537 yılında, Bizans döneminde yapıldı. Dev kubbesiyle yüzyıllar boyunca dünyanın en büyük yapılarından biri oldu.', ['Ayasofya ilk olarak hangi dönemde yapıldı?', 'Bizans döneminde', 'Selçuklu döneminde', 'Cumhuriyet döneminde'], 'Mozaik Karo'],
    ['kapalicarsi', 'kapalicarsi', 'Kapalıçarşı', 'Kapalıçarşı, 15. yüzyılda Fatih Sultan Mehmet döneminde kurulmaya başlandı. Dünyanın en eski ve en büyük kapalı çarşılarından biridir.', ['Kapalıçarşı hangi padişah döneminde kurulmaya başlandı?', 'Fatih Sultan Mehmet', 'Kanuni Sultan Süleyman', 'II. Abdülhamid'], 'Renkli Fener'],
    ['silebezi', 'silebezi', 'Şile Bezi', 'Şile bezi, ince ve serin tutan pamuklu bir dokumadır. 2017’de tescillenen Şile bezi, İstanbul’un ilk coğrafi işaretli ürünüdür.', ['Şile bezi neyden yapılır?', 'Pamuktan', 'Yünden', 'Deriden'], 'Nakış Kasnağı'] ] },
  39: { line:'Hoş geldin! Kırklareli’nin ormanları serin, mağaraları gizemli. Fenerini al, gidelim!', bye:'Kırklareli’nin balı gibi tatlı bir yolculuk dilerim!', nb:[22, 59, 34], items:[
    ['dupnisa', 'dupnisa', 'Dupnisa Mağarası', 'Demirköy’deki Dupnisa Mağarası, Trakya’nın turizme açık tek mağarasıdır. Binlerce yarasaya ev sahipliği yapar.', ['Dupnisa Mağarası’nda en çok hangi hayvan yaşar?', 'Yarasa', 'Penguen', 'Fok'], 'Yarasa Anahtarlık'],
    ['hardaliye', 'hardaliye', 'Kırklareli Hardaliyesi', 'Hardaliye, üzüm şırasından yapılan alkolsüz, mor renkli bir içecektir; yapımında hardal tohumu kullanılır. 2017’de coğrafi işaretle tescillendi.', ['Hardaliye neyden yapılır?', 'Üzümden', 'Portakaldan', 'Sütten'], 'Üzüm Salkımı'],
    ['mesebali', 'mesebali', 'Kırklareli Meşe Balı', 'Kırklareli meşe balı, Istranca ormanlarındaki meşe ağaçlarından gelen, koyu renkli bir baldır. 2021’de coğrafi işaretle tescillendi.', ['Meşe balının rengi nasıldır?', 'Koyu', 'Beyaz', 'Yeşil'], 'Palamut'] ] },
  41: { line:'Merhaba! Kocaeli’de Türkiye’nin ilk kâğıdı üretildi. Gel, o fabrikaya bakalım.', bye:'Kocaeli’den pişmaniye almadan gitme!', nb:[34, 54, 16, 77], items:[
    ['seka', 'seka', 'SEKA Kâğıt Müzesi', 'İzmit’teki SEKA, Türkiye’nin ilk kâğıt fabrikasıdır ve 1936’da üretime başladı. Fabrika bugün kâğıt müzesi olarak gezilebilir.', ['SEKA fabrikası ne üretiyordu?', 'Kâğıt', 'Ayakkabı', 'Oyuncak'], 'Kâğıt Gemi'],
    ['pismaniye', 'pismaniye', 'İzmit Pişmaniyesi', 'İzmit pişmaniyesi, şeker ve kavrulmuş unun ince lifler hâlinde çekilmesiyle yapılır. 2001’de coğrafi işaretle tescillendi.', ['Pişmaniye hangi şehirle anılır?', 'İzmit', 'Erzurum', 'Muğla'], 'Pişmaniye Kutusu'],
    ['mandayogurt', 'mandayogurdu', 'Kandıra Manda Yoğurdu', 'Kandıra manda yoğurdu, manda sütünden yapılır ve üstünde kalın bir kaymak tabakası olur. 2023’te coğrafi işaretle tescillendi.', ['Kandıra yoğurdu hangi hayvanın sütünden yapılır?', 'Manda', 'Deve', 'Keçi'], 'Manda Biblosu'] ] },
  54: { line:'Hoş geldin! Sakarya’da göl de orman da yemyeşil. Sapanca’da kısa bir tura ne dersin?', bye:'Sakarya’dan kabak tatlısı gibi tatlı anılarla ayrıl!', nb:[41, 11, 14, 81], items:[
    ['sapanca', 'sapanca', 'Sapanca Gölü', 'Sapanca Gölü, ormanlarla çevrili bir tatlı su gölüdür ve çevredeki şehirlere içme suyu sağlar.', ['Sapanca Gölü’nün suyu nasıldır?', 'Tatlı', 'Tuzlu', 'Sodalı'], 'Sandal'],
    ['islama', 'islamakofte', 'Adapazarı Islama Köftesi', 'Adapazarı ıslama köftesi, ekmeğin et suyuyla ıslatılıp yanına köfte konmasıyla hazırlanır. 2013’te coğrafi işaretle tescillendi.', ['Islama köftede ekmek neyle ıslatılır?', 'Et suyuyla', 'Sütle', 'Şerbetle'], 'Közde Domates'],
    ['kabaktatlisi', 'kabaktatlisi', 'Adapazarı Kabak Tatlısı', 'Adapazarı kabak tatlısı, yöreye özgü beyaz kestane kabağından yapılır. 2021’de coğrafi işaretle tescillendi.', ['Adapazarı kabak tatlısı hangi kabaktan yapılır?', 'Beyaz kestane kabağı', 'Bal kabağı', 'Sakız kabağı'], 'Beyaz Kabak'] ] },
  59: { line:'Hoş geldin! Tekirdağ’da köftenin kokusu sahile kadar gelir. Önce tarihi bir eve uğrayalım.', bye:'Tekirdağ’dan karnın tok, gönlün şen ayrıl!', nb:[22, 39, 34, 17], items:[
    ['rakoczi', 'rakoczi', 'Rakoczi Müzesi', 'Macar prensi Ferenc Rákóczi, ülkesinden ayrılınca Osmanlılara sığındı ve 1735’teki ölümüne kadar Tekirdağ’da yaşadı. Yaşadığı ev bugün müzedir.', ['Rakoczi Müzesi kimin evidir?', 'Bir Macar prensinin', 'Bir Osmanlı padişahının', 'Bir İngiliz yazarın'], 'Eski Anahtar'],
    ['tekirdagkofte', 'tekirdagkofte', 'Tekirdağ Köftesi', 'Tekirdağ köftesi, uzunca biçimli, ızgarada pişen bir köftedir. 2020’de coğrafi işaretle tescillendi.', ['Tekirdağ köftesi nasıl pişirilir?', 'Izgarada', 'Haşlanarak', 'Güveçte'], 'Soğan'],
    ['hayrabolu', 'hayrabolu', 'Hayrabolu Tatlısı', 'Hayrabolu tatlısı, tuzsuz taze peynir ve irmikle yapılan şerbetli bir tatlıdır. 2021’de coğrafi işaretle tescillendi.', ['Hayrabolu tatlısında hangi peynir kullanılır?', 'Tuzsuz taze peynir', 'Kaşar peyniri', 'Tulum peyniri'], 'Şerbet Sürahisi'] ] },
  77: { line:'Merhaba! Yalova küçük ama bahçeleri ve sıcak suları meşhur. Önce yürüyen köşke gidelim!', bye:'Yalova’dan dinlenmiş ve mutlu ayrıl!', nb:[41, 16], items:[
    ['yuruyenkosk', 'yuruyenkosk', 'Yürüyen Köşk', '1930’da köşke değen bir çınar dalı kesilmesin diye Atatürk köşkün kaydırılmasını istedi. Köşk raylar üzerinde yaklaşık 5 metre kaydırıldı ve “Yürüyen Köşk” adını aldı.', ['Yürüyen Köşk neden kaydırıldı?', 'Bir çınar ağacı kesilmesin diye', 'Deniz yükseldiği için', 'Yol yapılacağı için'], 'Çınar Yaprağı'],
    ['kivi', 'yalovakivi', 'Yalova Kivisi', 'Yalova kivisi, yeşil meyvesi ve içindeki minik siyah çekirdekleriyle bilinir. 2021’de menşe adıyla coğrafi işaret olarak tescillendi.', ['Kivinin içi hangi renktir?', 'Yeşil', 'Mor', 'Mavi'], 'Kivi Fidanı'],
    ['termal', 'termal', 'Termal Kaplıcaları', 'Yalova’nın Termal ilçesindeki kaplıcaların sıcak suyu yer altından gelir. Bu sular yüzyıllardır şifa için kullanılır.', ['Termal kaplıcalarının sıcak suyu nereden gelir?', 'Yer altından', 'Denizden', 'Yağmurdan'], 'Havlu'] ] },
};
const iller = JSON.parse(fs.readFileSync(DIR + 'marmara.json', 'utf8'));
iller.forEach(il => {
  const v = IL[il.plaka]; if (!v) throw new Error('veri yok: ' + il.name);
  il.line = v.line; il.bye = v.bye; il.nb = v.nb;
  il.items = v.items.map(([k, id, name, fact, quiz, sv]) => {
    if (!A[k] || !S[k]) throw new Error('çizim yok: ' + k);
    return { id, name, fact, quiz, souvenir:{ name:sv, art:art(S[k]) }, art:art(A[k]) };
  });
});
fs.writeFileSync(DIR + 'marmara.json', formatGroup(iller));
const regs = JSON.parse(fs.readFileSync(DIR + 'bolgeler.json', 'utf8'));
const r = regs.find(x => x.id === 'marmara'); r.guide = { ini:'EA', name:'Elif Abla', art:art(GUIDE) };
fs.writeFileSync(DIR + 'bolgeler.json', formatGroup(regs));
console.log('Marmara:', iller.length, 'il,', iller.reduce((t, i) => t + i.items.length, 0), 'resim');
