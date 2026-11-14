// Doğu Anadolu verisini oluşturur: src/content/turkiye/dogu.json + bolgeler.json'da rehber
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { A as A1 } from './dogu-1.mjs';
import { A as A2 } from './dogu-2.mjs';
import { A as A3 } from './dogu-3.mjs';
import { A as A4 } from './dogu-4.mjs';
import { S, GUIDE } from './dogu-hatira.mjs';
import { formatGroup } from '../../scripts/content.mjs';
const DIR = fileURLToPath(new URL('../../src/content/turkiye/', import.meta.url));
const A = { ...A1, ...A2, ...A3, ...A4 };
const art = f => { const a = f(); return { n:a.n, pal:a.pal, px:a.px }; };
// [çizim anahtarı, kimlik, ad, bilgi, soru, hatıra adı]
const IL = {
  4: { line:'Hoş geldin! Ağrı’da Türkiye’nin en yüksek dağı var. Başını kaldır, zirveye bak!', bye:'Ağrı’dan dağlar kadar yüce anılarla ayrıl!', nb:[36, 76, 65, 13, 49, 25], items:[
    ['agridagi', 'agridagi', 'Ağrı Dağı', 'Ağrı Dağı, 5137 metreyle Türkiye’nin en yüksek dağıdır. Zirvesi yıl boyunca karla kaplıdır.', ['Türkiye’nin en yüksek dağı hangisidir?', 'Ağrı Dağı', 'Erciyes Dağı', 'Uludağ'], 'Dağ Kartpostalı'],
    ['ishakpasa', 'ishakpasasarayi', 'İshak Paşa Sarayı', 'İshak Paşa Sarayı, Doğubayazıt’ta bir yamaçta yükselen, Osmanlı döneminden kalma görkemli bir saraydır.', ['İshak Paşa Sarayı hangi ilçededir?', 'Doğubayazıt', 'Sarıkamış', 'Ahlat'], 'Saray Magneti'],
    ['meteor', 'meteorcukuru', 'Meteor Çukuru', 'Doğubayazıt yakınlarındaki Meteor Çukuru, derin ve geniş bir çukurdur. Bir göktaşı düşmesiyle oluştuğu anlatılır.', ['Gökten düşen taşa ne denir?', 'Göktaşı', 'Dolu', 'Gökkuşağı'], 'Göktaşı Parçası'] ] },
  12: { line:'Merhaba! Bingöl’de göller bin tane, adalar yüzüyor, arılar çalışıyor!', bye:'Bingöl’den bal gibi tatlı anılarla ayrıl!', nb:[25, 49, 21, 23, 62, 24], items:[
    ['yuzenadalar', 'yuzenadalar', 'Yüzen Adalar', 'Solhan’daki Yüzen Adalar, göl üzerinde yüzen otlu ve köklü adacıklardır. Rüzgâr estikçe yer değiştirirler.', ['Yüzen Adalar neyle yer değiştirir?', 'Rüzgârla', 'Motorla', 'Raylarla'], 'Sandal Küreği'],
    ['bingolbali', 'bingolbali', 'Bingöl Balı', 'Bingöl balı 2022’de menşe adıyla tescillendi. Avrupa Birliği’nde coğrafi işaret alan ilk Türk balıdır.', ['Balı hangi hayvan yapar?', 'Arı', 'Kelebek', 'Karınca'], 'Bal Kaşığı'],
    ['bingolgoller', 'bingoldaglari', 'Bingöl Dağları', 'Bingöl, adını dağlarındaki çok sayıda küçük gölden alır: “bin göl”.', ['Bingöl’ün adı ne anlama gelir?', 'Bin göl', 'Bin dağ', 'Bin ağaç'], 'Yayla Çiçeği Demeti'] ] },
  13: { line:'Hoş geldin! Bitlis’te yanardağın ağzında bir göl var. Kraterin kenarına çıkalım!', bye:'Bitlis’ten krater gölü kadar derin anılarla ayrıl!', nb:[65, 4, 49, 72, 56], items:[
    ['nemrut', 'nemrutkratergolu', 'Nemrut Krater Gölü', 'Nemrut Krater Gölü, sönmüş Nemrut yanardağının ağzında oluşmuştur. Türkiye’nin en büyük krater gölüdür.', ['Krater gölü nerede oluşur?', 'Yanardağ ağzında', 'Deniz kıyısında', 'Mağarada'], 'Obsidyen Taşı'],
    ['ahlat', 'ahlatmezarligi', 'Ahlat Selçuklu Mezarlığı', 'Van Gölü kıyısındaki Ahlat Selçuklu Meydan Mezarlığı, oymalı mezar taşları ve kümbetleriyle ünlüdür.', ['Ahlat’taki mezar taşları neyiyle ünlüdür?', 'Oymalarıyla', 'Camlarıyla', 'Işıklarıyla'], 'Taş Oyma Magneti'],
    ['bitliskale', 'bitliskalesi', 'Bitlis Kalesi', 'Bitlis Kalesi, şehrin ortasında, dar bir vadideki kayalık tepenin üstünde yükselir.', ['Bitlis Kalesi nerede yükselir?', 'Kayalık bir tepede', 'Bir adada', 'Bir gölün dibinde'], 'Kale Rozeti'] ] },
  23: { line:'Merhaba! Elazığ’da kalenin harcında süt varmış! Harput’a çıkalım.', bye:'Elazığ’dan üzüm gibi tatlı anılarla ayrıl!', nb:[44, 21, 12, 62, 24], items:[
    ['harput', 'harputkalesi', 'Harput Kalesi', 'Harput Kalesi’ne “Süt Kalesi” de denir. Efsaneye göre yapılırken su bulunamayınca harcına süt katılmıştır.', ['Harput Kalesi’nin diğer adı nedir?', 'Süt Kalesi', 'Bal Kalesi', 'Kar Kalesi'], 'Süt Kovası Biblosu'],
    ['hazar', 'hazargolu', 'Hazar Gölü', 'Hazar Gölü, dağların arasındaki derin bir göldür. Yazın kıyılarında yüzülür, yelkenli ve su sporları yapılır.', ['Hazar Gölü’nde yazın ne yapılır?', 'Su sporları', 'Kayak', 'Buz pateni'], 'Yelkenli Biblosu'],
    ['okuzgozu', 'okuzgozuuzumu', 'Öküzgözü Üzümü', 'Elazığ öküzgözü üzümünün taneleri iri ve koyu renklidir. 2009’da menşe adıyla tescillendi.', ['Öküzgözü üzümünün taneleri nasıldır?', 'İri ve koyu', 'Küçük ve beyaz', 'Kare ve yeşil'], 'Üzüm Salkımı Magneti'] ] },
  24: { line:'Hoş geldin! Erzincan’da şelaleler donar, yollar kayadan geçer!', bye:'Erzincan’dan dağ havası kadar ferah ayrıl!', nb:[58, 28, 29, 69, 25, 12, 62, 23, 44], items:[
    ['girlevik', 'girleviksselalesi', 'Girlevik Şelalesi', 'Girlevik Şelalesi kışın donar ve buzdan bir perdeye dönüşür.', ['Girlevik Şelalesi kışın neye dönüşür?', 'Buzdan bir perdeye', 'Kumdan bir tepeye', 'Bir göle'], 'Kar Tanesi Süsü'],
    ['tulum', 'erzincantulumpeyniri', 'Erzincan Tulum Peyniri', 'Erzincan tulum peyniri, deri tulumlarda olgunlaştırılır. 2001’de menşe adıyla tescillendi; Avrupa Birliği’nde de tescillidir.', ['Tulum peyniri nerede olgunlaştırılır?', 'Deri tulumda', 'Cam şişede', 'Kâğıt kutuda'], 'Peynir Tulumu Biblosu'],
    ['kemaliye', 'kemaliyetasyolu', 'Kemaliye Taş Yolu', 'Kemaliye Taş Yolu, Fırat kıyısındaki sarp kayalara elle oyulmuş tünellerden geçen bir yoldur.', ['Kemaliye Taş Yolu nereden geçer?', 'Kayaya oyulmuş tünellerden', 'Deniz altından', 'Gökyüzünden'], 'Taş Yol Kartpostalı'] ] },
  25: { line:'Merhaba! Erzurum’da kar bol, kebap şişte, minareler çifte!', bye:'Erzurum’dan dadaş gibi güçlü ayrıl!', nb:[8, 53, 69, 24, 12, 49, 4, 36, 75], items:[
    ['ciftemin', 'ciftemineretlimedrese', 'Çifte Minareli Medrese', 'Çifte Minareli Medrese, iki minaresi ve taş işçiliğiyle Erzurum’un simgesidir.', ['Çifte Minareli Medrese’nin kaç minaresi vardır?', 'İki', 'Bir', 'Dört'], 'Çini Karo'],
    ['cagkebabi', 'oltucagkebabi', 'Oltu Cağ Kebabı', 'Oltu cağ kebabı, yatay dönen şişte odun ateşinde pişirilir ve küçük şişlerle sunulur. Coğrafi işaretle tescillidir.', ['Cağ kebabı nasıl bir şişte pişer?', 'Yatay', 'Dikey', 'Buzlu'], 'Bakır Tabak'],
    ['oltutasi', 'oltutasi', 'Oltu Taşı', 'Oltu taşı, Erzurum’un Oltu ilçesinden çıkarılan siyah ve parlak bir taştır. Tespih ve takı yapılır.', ['Oltu taşı hangi renktedir?', 'Siyah', 'Beyaz', 'Pembe'], 'Oltu Taşı Tespih'] ] },
  30: { line:'Hoş geldin! Hakkari’de dağlar sivri, buzullar soğuk, laleler ters!', bye:'Hakkari’den dağlar kadar güçlü ayrıl!', nb:[65, 73], items:[
    ['cilo', 'cilodaglari', 'Cilo Dağları', 'Cilo Dağları sivri zirveleriyle bilinir. Türkiye’nin en büyük buzulları bu dağlardadır.', ['Türkiye’nin en büyük buzulları hangi dağlardadır?', 'Cilo Dağları', 'Kaz Dağları', 'Bolkar Dağları'], 'Dağcı Halatı'],
    ['terslale', 'terslale', 'Ters Lale', 'Ters lalenin çiçekleri aşağı doğru sarkar. Hakkari dağlarında baharda açar; halk arasında “ağlayan gelin” de denir.', ['Ters lalenin çiçekleri nasıl durur?', 'Aşağı doğru sarkar', 'Yere gömülür', 'Suda yüzer'], 'Çiçek Magneti'],
    ['zap', 'zapsuyu', 'Zap Suyu', 'Zap Suyu, Hakkari’nin derin vadilerinden coşkuyla akan bir akarsudur.', ['Zap Suyu nasıl akar?', 'Coşkuyla, hızlı', 'Hiç akmaz', 'Yukarı doğru'], 'Rafting Küreği'] ] },
  36: { line:'Merhaba! Kars’ta kalıntılar kızıl, kar kristal, peynir meşhur!', bye:'Kars’tan kaşar kadar lezzetli anılarla ayrıl!', nb:[75, 25, 4, 76], items:[
    ['ani', 'aniorenyeri', 'Ani Ören Yeri', 'Ani, eski bir ortaçağ kentinin kalıntılarıdır. 2016’da UNESCO Dünya Mirası Listesi’ne girdi.', ['Ani Ören Yeri hangi ildedir?', 'Kars', 'İzmir', 'Muğla'], 'Kızıl Taş'],
    ['karskasari', 'karskasari', 'Kars Kaşarı', 'Kars kaşarı, Kars’ın yaylalarında otlayan hayvanların sütünden yapılır. 2015’te coğrafi işaretle tescillendi.', ['Kaşar peyniri neyden yapılır?', 'Sütten', 'Undan', 'Meyveden'], 'Peynir Rendesi'],
    ['sarikamis', 'sarikamis', 'Sarıkamış', 'Sarıkamış, çam ormanları arasındaki kayak pistleri ve toz gibi kuru “kristal kar”ıyla ünlüdür.', ['Sarıkamış’ın karına ne denir?', 'Kristal kar', 'Kum kar', 'Islak kar'], 'Kayak Eldiveni'] ] },
  44: { line:'Hoş geldin! Malatya’da kayısılar güneşte kurur, höyükler binlerce yıllık!', bye:'Malatya’dan kayısı gibi tatlı anılarla ayrıl!', nb:[58, 24, 23, 21, 2, 46], items:[
    ['arslantepe', 'arslantepe', 'Arslantepe Höyüğü', 'Arslantepe Höyüğü, binlerce yıllık bir yerleşimdir. 2021’de UNESCO Dünya Mirası Listesi’ne girdi.', ['Höyük nedir?', 'Eski yerleşimlerin oluşturduğu tepe', 'Bir tür göl', 'Bir yemek'], 'Kil Mühür'],
    ['malatyakayisi', 'malatyakayisisi', 'Malatya Kayısısı', 'Malatya kayısısı güneşte kurutulur. 2001’de coğrafi işaretle tescillendi; Avrupa Birliği’nde de tescillidir.', ['Malatya hangi meyvesiyle ünlüdür?', 'Kayısı', 'Muz', 'Ananas'], 'Kayısı Reçeli'],
    ['battalgazi', 'battalgaziulucamii', 'Battalgazi Ulu Camii', 'Battalgazi Ulu Camii, Selçuklu döneminden kalma tuğla bir camidir; mavi çinileriyle dikkat çeker.', ['Battalgazi Ulu Camii’nin duvarları neyden yapılmıştır?', 'Tuğladan', 'Camdan', 'Buzdan'], 'Çini Tabak'] ] },
  49: { line:'Merhaba! Muş’ta ovalar lale açar, tarih Malazgirt’te yazılmış!', bye:'Muş’tan bir zafer sancağı gibi gururla ayrıl!', nb:[25, 4, 13, 72, 21, 12], items:[
    ['malazgirt', 'malazgirt', 'Malazgirt Zaferi', '26 Ağustos 1071’de Malazgirt Meydan Muharebesi’nde Sultan Alparslan, Bizans ordusunu yendi. Bu zaferle Anadolu’nun kapıları Türklere açıldı.', ['Malazgirt Zaferi hangi yıl kazanıldı?', '1071', '1453', '1923'], 'Sancak'],
    ['muslalesi', 'muslalesi', 'Muş Lalesi', 'Muş lalesi, baharda Muş Ovası’nda açan kırmızı bir yabani laledir; şehrin simgelerindendir.', ['Muş lalesi hangi mevsimde açar?', 'İlkbaharda', 'Kışın', 'Sonbaharda'], 'Lale Kartpostalı'],
    ['murat', 'muratnehri', 'Murat Nehri', 'Murat Nehri, Fırat’ın bir koludur ve Muş Ovası’ndan kıvrılarak geçer.', ['Murat Nehri hangi nehrin koludur?', 'Fırat', 'Meriç', 'Sakarya'], 'Dere Taşı'] ] },
  62: { line:'Hoş geldin! Tunceli’de vadiler derin, sular buz gibi, keçiler kayalarda!', bye:'Tunceli’den Munzur suyu gibi berrak ayrıl!', nb:[24, 12, 23], items:[
    ['munzur', 'munzurvadisi', 'Munzur Vadisi', 'Munzur Vadisi Milli Parkı; derin vadileri, ormanları ve kayalıklarda gezen dağ keçileriyle bilinir.', ['Munzur Vadisi’nin kayalıklarında hangi hayvan gezer?', 'Dağ keçisi', 'Zürafa', 'Penguen'], 'Dağ Keçisi Biblosu'],
    ['gozeler', 'munzurgozeleri', 'Munzur Gözeleri', 'Munzur Gözeleri, Munzur Çayı’nın kaynaklarıdır. Buz gibi sular kayaların arasından çıkar.', ['Göze ne demektir?', 'Su kaynağı', 'Bir tür ağaç', 'Dağ zirvesi'], 'Su Şişesi'],
    ['pertek', 'pertekkalesi', 'Pertek Kalesi', 'Pertek Kalesi, Keban Baraj Gölü’nün suları yükselince suyun ortasında kalmıştır. Karşı kıyıya feribotla geçilir.', ['Pertek’te karşı kıyıya neyle geçilir?', 'Feribotla', 'Teleferikle', 'Trenle'], 'Feribot Bileti'] ] },
  65: { line:'Merhaba! Van’da göl kocaman, kediler iki renk gözlü, kahvaltı efsane!', bye:'Van’dan karnın tok, gönlün şen ayrıl!', nb:[4, 13, 56, 73, 30], items:[
    ['vankedisi', 'vankedisi', 'Van Kedisi', 'Van kedisi bembeyazdır; çoğunun bir gözü mavi, bir gözü sarıdır. Suyla oynamayı sever.', ['Van kedisinin gözleri genellikle nasıldır?', 'Biri mavi, biri sarı', 'İkisi de kırmızı', 'İkisi de mor'], 'Kedi Biblosu'],
    ['akdamar', 'akdamaradasi', 'Akdamar Adası', 'Akdamar Adası, Türkiye’nin en büyük gölü olan Van Gölü’ndedir. Adada tarihi Akdamar Kilisesi ve badem ağaçları vardır.', ['Türkiye’nin en büyük gölü hangisidir?', 'Van Gölü', 'Tuz Gölü', 'Abant Gölü'], 'Badem Çiçeği Dalı'],
    ['otlupeynir', 'vanotlupeyniri', 'Van Otlu Peyniri', 'Van otlu peynirine dağlardan toplanan otlar katılır. 2018’de menşe adıyla tescillendi.', ['Otlu peynire ne katılır?', 'Dağ otları', 'Çikolata', 'Şeker'], 'Kahvaltı Tabağı'] ] },
  75: { line:'Hoş geldin! Ardahan’da göl donar, kızaklar kayar, kazlar meraya çıkar!', bye:'Ardahan’dan atlı kızak gibi neşeyle ayrıl!', nb:[8, 25, 36], items:[
    ['cildir', 'cildirgolu', 'Çıldır Gölü', 'Çıldır Gölü kışın tamamen donar. Buzun üstünde atlı kızaklarla gezilir.', ['Kışın Çıldır Gölü’nde neyle gezilir?', 'Atlı kızakla', 'Yelkenliyle', 'Denizaltıyla'], 'Yün Eldiven'],
    ['ardahankaz', 'ardahankazeti', 'Ardahan Kazı', 'Ardahan’da kazlar açık meralarda otlar. Ardahan kaz eti 2022’de menşe adıyla tescillendi.', ['Ardahan’da meralarda hangi kuş yetiştirilir?', 'Kaz', 'Penguen', 'Devekuşu'], 'Kaz Tüyü Kalem'],
    ['damal', 'damalbebegi', 'Damal Bebeği', 'Damal bebekleri, Ardahan’ın Damal ilçesinde elle dikilen, rengârenk kıyafetli bez bebeklerdir. Coğrafi işaretle tescillidir.', ['Damal bebeği neyden yapılır?', 'Kumaştan', 'Plastikten', 'Demirden'], 'Mini Damal Bebeği'] ] },
  76: { line:'Merhaba! Iğdır’da ova ılık, kayısı tatlı, kuşlar nehir kıyısında!', bye:'Iğdır’dan kayısı tadında ayrıl!', nb:[36, 4], items:[
    ['igdirkayisi', 'igdirkayisisi', 'Iğdır Kayısısı', 'Iğdır kayısısı, “şalak” denen iri bir kayısı çeşididir. 2018’de menşe adıyla tescillendi.', ['Iğdır kayısısının çeşidine ne denir?', 'Şalak', 'Tombul', 'Misket'], 'Kayısı Kurusu Paketi'],
    ['araskus', 'araskuscenneti', 'Aras Kuş Cenneti', 'Aras Nehri kıyısındaki sulak alanlar, pek çok kuş türünün konakladığı bir kuş cennetidir.', ['Aras Kuş Cenneti hangi nehrin kıyısındadır?', 'Aras', 'Seyhan', 'Meriç'], 'Kuş Düdüğü'],
    ['igdirova', 'igdirovasi', 'Iğdır Ovası', 'Iğdır Ovası yüksek dağlarla çevrilidir ve çevresine göre ılık bir iklimi (mikroklima) vardır. Bu yüzden pamuk ve kayısı yetişir.', ['Iğdır Ovası’nın iklimi çevresine göre nasıldır?', 'Daha ılık', 'Daha soğuk', 'Hep karlı'], 'Pamuk Dalı'] ] },
};
const iller = JSON.parse(fs.readFileSync(DIR + 'dogu.json', 'utf8'));
iller.forEach(il => {
  const v = IL[il.plaka]; if (!v) throw new Error('veri yok: ' + il.name);
  il.line = v.line; il.bye = v.bye; il.nb = v.nb;
  il.items = v.items.map(([k, id, name, fact, quiz, sv]) => {
    if (!A[k] || !S[k]) throw new Error('çizim yok: ' + k);
    return { id, name, fact, quiz, souvenir:{ name:sv, art:art(S[k]) }, art:art(A[k]) };
  });
});
fs.writeFileSync(DIR + 'dogu.json', formatGroup(iller));
const regs = JSON.parse(fs.readFileSync(DIR + 'bolgeler.json', 'utf8'));
const r = regs.find(x => x.id === 'dogu'); r.guide = { ini:'KA', name:'Kayakçı Aras', art:art(GUIDE) };
fs.writeFileSync(DIR + 'bolgeler.json', formatGroup(regs));
console.log('Doğu Anadolu:', iller.length, 'il,', iller.reduce((t, i) => t + i.items.length, 0), 'resim');
