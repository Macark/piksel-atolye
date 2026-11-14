// Karadeniz verisini oluşturur: src/content/turkiye/karadeniz.json + bolgeler.json'da rehber
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { A as A1 } from './karadeniz-1.mjs';
import { A as A2 } from './karadeniz-2.mjs';
import { A as A3 } from './karadeniz-3.mjs';
import { A as A4 } from './karadeniz-4.mjs';
import { S, GUIDE } from './karadeniz-hatira.mjs';
import { formatGroup } from '../../scripts/content.mjs';
const DIR = fileURLToPath(new URL('../../src/content/turkiye/', import.meta.url));
const A = { ...A1, ...A2, ...A3, ...A4 };
const art = f => { const a = f(); return { n:a.n, pal:a.pal, px:a.px }; };
// [çizim anahtarı, kimlik, ad, bilgi, soru, hatıra adı]
const IL = {
  5: { line:'Hoş geldin! Amasya’da krallar kayalara gömülmüş, evler ırmağa bakıyor.', bye:'Amasya’dan elma gibi tatlı anılarla ayrıl!', nb:[55, 60, 66, 19], items:[
    ['kralkaya', 'kralkayamezarlari', 'Kral Kaya Mezarları', 'Amasya’daki Kral Kaya Mezarları, Pontus krallarının mezarlarıdır. Şehrin üstündeki kayalığa oyulmuşlardır.', ['Kral Kaya Mezarları nereye oyulmuştur?', 'Kayalığa', 'Buza', 'Ağaç gövdesine'], 'Kral Mezarı Magneti'],
    ['yaliboyu', 'yaliboyuevleri', 'Yalıboyu Evleri', 'Yalıboyu evleri, Yeşilırmak kıyısına dizilmiş, cumbalı eski Osmanlı evleridir.', ['Yalıboyu evleri hangi ırmağın kıyısındadır?', 'Yeşilırmak', 'Fırat', 'Meriç'], 'Ahşap Ev Biblosu'],
    ['amasyaelma', 'amasyamisketelmasi', 'Amasya Misket Elması', 'Amasya misket elması küçük, kokulu ve kıtır bir elmadır. 2019’da menşe adıyla tescillendi.', ['Amasya’nın meşhur meyvesi hangisidir?', 'Elma', 'Muz', 'Ananas'], 'Elma Anahtarlık'] ] },
  8: { line:'Merhaba! Artvin’de ormanlar sık, göller yeşil, arılar çalışkan!', bye:'Artvin’den bal gibi tatlı anılarla ayrıl!', nb:[53, 25, 75], items:[
    ['karagol', 'artvinkaragol', 'Karagöl', 'Şavşat’taki Karagöl, ladin ormanlarının ortasında, sakin ve koyu renkli bir dağ gölüdür.', ['Karagöl’ün çevresi nasıldır?', 'Ladin ormanlarıyla çevrili', 'Kum çölüyle çevrili', 'Buzullarla kaplı'], 'Kartpostal'],
    ['yusufeli', 'yusufelibaraji', 'Yusufeli Barajı', 'Çoruh Nehri üzerindeki Yusufeli Barajı, temelden 275 metre yüksekliğiyle Türkiye’nin en yüksek barajıdır.', ['Türkiye’nin en yüksek barajı hangisidir?', 'Yusufeli Barajı', 'Atatürk Barajı', 'Keban Barajı'], 'Rafting Kaskı'],
    ['kafkasari', 'kafkasarisi', 'Kafkas Arısı', 'Artvin’deki Camili (Macahel), 2005’te Türkiye’nin ilk biyosfer rezervi oldu. Bölge, saf Kafkas arısıyla tanınır.', ['Macahel hangi arısıyla tanınır?', 'Kafkas arısı', 'Bambu arısı', 'Çöl arısı'], 'Arı Magneti'] ] },
  14: { line:'Hoş geldin! Bolu’da göller ormanın içinde, aşçılar dünyaca ünlü!', bye:'Bolu’dan karnın tok, gözün yeşil dolu ayrıl!', nb:[81, 67, 78, 18, 6, 26, 11, 54], items:[
    ['abant', 'abantgolu', 'Abant Gölü', 'Abant Gölü, ormanlarla çevrili bir dağ gölüdür. Kıyısında yürüyüş yapılır, faytonla gezilir.', ['Abant Gölü’nün çevresinde ne vardır?', 'Ormanlar', 'Çöl kumları', 'Gökdelenler'], 'Fayton Biblosu'],
    ['yedigoller', 'yedigoller', 'Yedigöller', 'Yedigöller Milli Parkı’nda basamak basamak sıralanmış yedi küçük göl vardır. Sonbaharda yapraklar rengârenk olur.', ['Yedigöller’de kaç göl vardır?', 'Yedi', 'Üç', 'On iki'], 'Sonbahar Yaprağı'],
    ['mengen', 'mengenascilari', 'Mengen Aşçıları', 'Bolu’nun Mengen ilçesi, yetiştirdiği ünlü aşçılarla bilinir ve “aşçılar diyarı” diye anılır.', ['Mengen hangi meslekle ünlüdür?', 'Aşçılık', 'Pilotluk', 'Madencilik'], 'Aşçı Şapkası'] ] },
  19: { line:'Merhaba! Çorum’da Hititlerin başkenti var. Aslanlı Kapı’dan girelim!', bye:'Çorum’dan cebin leblebi dolu ayrıl!', nb:[55, 5, 66, 71, 18, 37, 57], items:[
    ['hattusa', 'hattusa', 'Hattuşa', 'Hattuşa, Hititlerin başkentiydi. Aslanlı Kapı’sıyla ünlüdür ve 1986’da UNESCO Dünya Mirası Listesi’ne girdi.', ['Hattuşa hangi uygarlığın başkentiydi?', 'Hititler', 'Romalılar', 'Mısırlılar'], 'Hitit Aslanı Biblosu'],
    ['leblebi', 'corumleblebisi', 'Çorum Leblebisi', 'Çorum leblebisi, nohutun kavrulmasıyla yapılan bir çerezdir. 2002’de coğrafi işaretle tescillendi.', ['Leblebi neyden yapılır?', 'Nohuttan', 'Fasulyeden', 'Mısırdan'], 'Leblebi Kesesi'],
    ['guneskursu', 'hititguneskursu', 'Hitit Güneş Kursu', 'Güneş kursları, Çorum’daki Alacahöyük’te bulunan bronz törensel eserlerdir. Bugün Anadolu Medeniyetleri Müzesi’ndedir.', ['Güneş kursu hangi madenden yapılmıştır?', 'Bronz', 'Cam', 'Plastik'], 'Güneş Kursu Kolye'] ] },
  28: { line:'Hoş geldin! Giresun’da fındık bahçeleri yeşil, deniz masmavi!', bye:'Giresun’dan fındık kadar sağlam dostluklarla ayrıl!', nb:[52, 58, 24, 29, 61], items:[
    ['giresunadasi', 'giresunadasi', 'Giresun Adası', 'Giresun Adası, şehrin hemen açığında, ağaçlarla kaplı küçük bir adadır. Mayıs ayında Aksu Şenlikleri sırasında ada çevresinde dilek tutulur.', ['Giresun Adası’nda hangi şenlik yapılır?', 'Aksu Şenlikleri', 'Kiraz Festivali', 'Kar Festivali'], 'Kayık Biblosu'],
    ['tombulfindik', 'tombulfindik', 'Giresun Tombul Fındığı', 'Giresun tombul fındığı, yuvarlak ve iri bir fındıktır. 2001’de menşe adıyla tescillendi; Avrupa Birliği’nde de tescillidir.', ['Tombul fındığın şekli nasıldır?', 'Yuvarlak', 'Uzun ve ince', 'Yıldız biçimli'], 'Fındık Kavanozu'],
    ['kumbet', 'kumbetyaylasi', 'Kümbet Yaylası', 'Kümbet Yaylası, Giresun dağlarında yaz aylarında çıkılan serin, yeşil bir yayladır.', ['Yaylaya genellikle hangi mevsimde çıkılır?', 'Yazın', 'Kışın', 'Hiçbir zaman'], 'Yün Çorap'] ] },
  29: { line:'Merhaba! Gümüşhane’de mağaralar parlak, pestiller tatlı!', bye:'Gümüşhane’den cebin pestil dolu ayrıl!', nb:[61, 28, 24, 69], items:[
    ['karaca', 'karacamagarasi', 'Karaca Mağarası', 'Karaca Mağarası, sarkıt ve dikitlerle (damlataşlarıyla) dolu renkli bir mağaradır.', ['Mağaralarda tavandan sarkan taşlara ne denir?', 'Sarkıt', 'Kum tepesi', 'Volkan'], 'El Feneri'],
    ['pestil', 'gumushanepestili', 'Pestil ve Köme', 'Gümüşhane dut pestili ve kömesi, dut şırasıyla yapılır; kömenin içinde ceviz ya da fındık bulunur. 2004’te coğrafi işaretle tescillendi.', ['Gümüşhane pestili hangi meyveden yapılır?', 'Dut', 'Karpuz', 'Muz'], 'Pestil Paketi'],
    ['tomara', 'tomarasselalesi', 'Tomara Şelalesi', 'Tomara Şelalesi, Gümüşhane’nin Şiran ilçesinde ormanlık bir yamaçtan dökülen bir şelaledir.', ['Şelale nedir?', 'Yüksekten dökülen su', 'Bir tür ağaç', 'Bir dağ evi'], 'Şemsiye'] ] },
  37: { line:'Hoş geldin! Kastamonu’da camiler ahşap, kanyonlar derin!', bye:'Kastamonu’dan sarımsak örgüsüyle ayrıl, uğurlu olsun!', nb:[57, 19, 18, 78, 74], items:[
    ['mahmutbey', 'mahmutbeycamii', 'Mahmut Bey Camii', 'Mahmut Bey Camii, ahşap direkleri ve boyalı ahşap tavanıyla ünlüdür. 2023’te UNESCO Dünya Mirası Listesi’ne girdi.', ['Mahmut Bey Camii’nin direkleri neyden yapılmıştır?', 'Ahşaptan', 'Camdan', 'Demirden'], 'Ahşap Oyma Pano'],
    ['sarimsak', 'taskoprusarimsagi', 'Taşköprü Sarımsağı', 'Taşköprü sarımsağı, Kastamonu’nun Taşköprü ilçesinde yetişir. 2010’da coğrafi işaretle tescillendi; Avrupa Birliği’nde de tescillidir.', ['Taşköprü hangi ürünüyle ünlüdür?', 'Sarımsak', 'Kahve', 'Muz'], 'Sarımsak Örgüsü'],
    ['horma', 'hormakanyonu', 'Horma Kanyonu', 'Horma Kanyonu, Küre Dağları’ndadır. Kanyon duvarlarına kurulmuş ahşap yürüyüş yolunda yürünür.', ['Horma Kanyonu’nda nerede yürünür?', 'Ahşap yürüyüş yolunda', 'Buzun üstünde', 'Kumulların üstünde'], 'Yürüyüş Bastonu'] ] },
  52: { line:'Merhaba! Ordu’da teleferikle tepeye çıkılır, deniz ayağının altında!', bye:'Ordu’dan tepeler kadar yüksek moralle ayrıl!', nb:[55, 60, 58, 28], items:[
    ['boztepe', 'boztepe', 'Boztepe', 'Boztepe, Ordu şehrine ve Karadeniz’e yukarıdan bakan bir tepedir. Şehir merkezinden teleferikle çıkılır.', ['Boztepe’ye şehir merkezinden neyle çıkılır?', 'Teleferikle', 'Denizaltıyla', 'Kızakla'], 'Teleferik Magneti'],
    ['yason', 'yasonburnu', 'Yason Burnu', 'Yason Burnu, denize uzanan bir burundur. Üzerinde küçük bir kilise ve deniz feneri bulunur; adını Argonotlar efsanesindeki Yason’dan alır.', ['Burun nedir?', 'Denize uzanan kara parçası', 'Bir tür balık', 'Bir dağ gölü'], 'Deniz Kabuğu'],
    ['cambasi', 'cambasiyaylasi', 'Çambaşı Yaylası', 'Çambaşı Yaylası, Ordu’nun yüksek bir yaylasıdır. Kışın karla kaplanır ve kayak yapılır.', ['Çambaşı Yaylası’nda kışın ne yapılır?', 'Kayak', 'Sörf', 'Dalış'], 'Kar Küresi'] ] },
  53: { line:'Hoş geldin! Rize’de yamaçlar çay bahçesi, yaylalar bulutların içinde!', bye:'Rize’den bir bardak çay tadında ayrıl!', nb:[61, 69, 25, 8], items:[
    ['cay', 'rizecayi', 'Rize Çayı', 'Rize’nin yamaçları çay bahçeleriyle kaplıdır. Rize çayı 2021’de menşe adıyla tescillendi.', ['Rize’nin yamaçlarında ne yetişir?', 'Çay', 'Pamuk', 'Mısır'], 'Çay Bardağı'],
    ['ayder', 'ayderyaylasi', 'Ayder Yaylası', 'Ayder Yaylası, Kaçkar Dağları’nın eteğinde, ahşap evleri ve sisli ormanlarıyla bilinen bir yayladır.', ['Ayder Yaylası hangi dağların eteğindedir?', 'Kaçkar Dağları', 'Toros Dağları', 'Uludağ'], 'Bal Kavanozu'],
    ['zilkale', 'zilkale', 'Zilkale', 'Zilkale, Fırtına Vadisi’nde, ormanlık bir yamaçta yükselen eski bir kaledir.', ['Zilkale hangi vadidedir?', 'Fırtına Vadisi', 'Ihlara Vadisi', 'Kelebekler Vadisi'], 'Eski Anahtar'] ] },
  55: { line:'Merhaba! Samsun, Kurtuluş Savaşı’nın başladığı şehir. Limana gidelim!', bye:'Samsun’dan 19 Mayıs coşkusuyla ayrıl!', nb:[57, 19, 5, 60, 52], items:[
    ['bandirma', 'bandirmavapuru', 'Bandırma Vapuru', 'Atatürk, 19 Mayıs 1919’da Bandırma Vapuru ile Samsun’a çıktı. Bu gün Atatürk’ü Anma, Gençlik ve Spor Bayramı olarak kutlanır.', ['Atatürk Samsun’a hangi tarihte çıktı?', '19 Mayıs 1919', '23 Nisan 1920', '29 Ekim 1923'], 'Türk Bayrağı'],
    ['bafrapidesi', 'bafrapidesi', 'Bafra Pidesi', 'Bafra pidesi, ince ve uzun, kıymalı bir pidedir. Odun ateşinde pişirilir ve coğrafi işaretle tescillidir.', ['Bafra pidesi nasıl bir pidedir?', 'İnce ve uzun', 'Kare ve kalın', 'Tatlı ve kremalı'], 'Lokum Kutusu'],
    ['kuscenneti', 'kizilirmakdeltasi', 'Kızılırmak Deltası', 'Kızılırmak’ın denize döküldüğü yerde oluşan delta, sazlıkları ve göçmen kuşlarıyla bir kuş cennetidir.', ['Delta nerede oluşur?', 'Irmağın denize döküldüğü yerde', 'Dağın tepesinde', 'Çölün ortasında'], 'Dürbün'] ] },
  57: { line:'Hoş geldin! Sinop, Türkiye’nin en kuzeyi. Fenerin ışığını takip edelim!', bye:'Sinop’tan pusulan hep kuzeyi göstersin!', nb:[37, 19, 55], items:[
    ['inceburun', 'inceburun', 'İnceburun Feneri', 'Sinop’taki İnceburun, Türkiye’nin en kuzey noktasıdır. Burnun ucunda bir deniz feneri vardır.', ['Türkiye’nin en kuzey noktası hangisidir?', 'İnceburun', 'Gelidonya Burnu', 'Babakale'], 'Deniz Feneri Biblosu'],
    ['sinopmantisi', 'sinopmantisi', 'Sinop Mantısı', 'Sinop mantısı yoğurt ve cevizle yenir. 2021’de coğrafi işaretle tescillendi.', ['Sinop mantısının üstüne ne konur?', 'Ceviz', 'Çikolata', 'Reçel'], 'Ceviz Torbası'],
    ['hamsilos', 'hamsiloskoyu', 'Hamsilos Koyu', 'Hamsilos, ormanla çevrili, denizin karaya doğru dar ve uzun girdiği sakin bir koydur.', ['Hamsilos nasıl bir yerdir?', 'Ormanla çevrili bir koy', 'Bir çöl vahası', 'Bir buzul'], 'Hamsi Magneti'] ] },
  60: { line:'Merhaba! Tokat’ta mağaralar renkli, kebaplar şişte, yazmalar desenli!', bye:'Tokat’tan desenli bir yazma gibi renkli anılarla ayrıl!', nb:[55, 52, 58, 66, 5], items:[
    ['ballica', 'ballicamagarasi', 'Ballıca Mağarası', 'Ballıca Mağarası, renkli damlataşlarıyla ünlüdür; içinde yarasalar da yaşar.', ['Ballıca Mağarası’nda hangi hayvanlar yaşar?', 'Yarasalar', 'Penguenler', 'Zürafalar'], 'Kristal Taş'],
    ['tokatkebabi', 'tokatkebabi', 'Tokat Kebabı', 'Tokat kebabı, şişe dizilen kuzu eti, patlıcan, patates ve domatesle fırında pişirilir. 2013’te coğrafi işaretle tescillendi.', ['Tokat kebabında hangi sebze bulunur?', 'Patlıcan', 'Brokoli', 'Havuç'], 'Kebap Şişi'],
    ['yazma', 'tokatyazmasi', 'Tokat Yazması', 'Tokat yazmaları, desen oyulmuş ahşap kalıplarla kumaşa elle basılarak yapılır.', ['Tokat yazmasının deseni neyle basılır?', 'Ahşap kalıpla', 'Bilgisayarla', 'Fırçayla'], 'Yazma Kalıbı'] ] },
  61: { line:'Hoş geldin! Trabzon’da manastırlar kayalıkta, göller dağların arasında!', bye:'Trabzon’dan horon tepe tepe ayrıl!', nb:[28, 29, 69, 53], items:[
    ['sumela', 'sumelamanastiri', 'Sümela Manastırı', 'Sümela Manastırı, Altındere Vadisi’nde sarp bir kayalığın oyuğuna kurulmuştur.', ['Sümela Manastırı nereye kurulmuştur?', 'Sarp bir kayalığa', 'Bir adaya', 'Çölün ortasına'], 'Manastır Kartpostalı'],
    ['uzungol', 'uzungol', 'Uzungöl', 'Uzungöl, dağlar arasındaki bir göldür. Kıyısındaki minareli cami ve ahşap evlerle kartpostal gibidir.', ['Uzungöl nerededir?', 'Dağların arasında', 'Deniz kıyısında', 'Bir mağarada'], 'Alabalık Magneti'],
    ['akcaabat', 'akcaabatkoftesi', 'Akçaabat Köftesi', 'Akçaabat köftesi ızgarada pişirilir, yanında piyaz ve közlenmiş biberle yenir. 2010’da coğrafi işaretle tescillendi.', ['Akçaabat köftesinin yanında genelde ne yenir?', 'Piyaz', 'Dondurma', 'Pasta'], 'Kemençe'] ] },
  67: { line:'Merhaba! Zonguldak’ta kömür yerin altında, mağaralar serin. Kaskını tak!', bye:'Zonguldak’tan madenci lambası gibi parlak ayrıl!', nb:[74, 78, 14, 81], items:[
    ['komur', 'zonguldakkomuru', 'Zonguldak Kömürü', 'Zonguldak, taş kömürü madenleriyle bilinir. Anlatılana göre kömürü ilk kez 1829’da Uzun Mehmet buldu.', ['Zonguldak hangi madeniyle bilinir?', 'Kömür', 'Altın', 'Elmas'], 'Madenci Lambası'],
    ['gokgol', 'gokgolmagarasi', 'Gökgöl Mağarası', 'Gökgöl Mağarası, şehre çok yakın, içinden su akan ve damlataşlarıyla dolu bir mağaradır.', ['Gökgöl Mağarası’nın içinden ne akar?', 'Su', 'Lav', 'Kum'], 'Taş Kolye'],
    ['osmanlicilegi', 'osmanlicilegi', 'Ereğli Osmanlı Çileği', 'Karadeniz Ereğli Osmanlı çileği pembe renkli, küçük ve çok kokulu bir çilektir. 2021’de menşe adıyla tescillendi.', ['Osmanlı çileğinin rengi nasıldır?', 'Pembe', 'Mavi', 'Siyah'], 'Çilek Reçeli'] ] },
  69: { line:'Hoş geldin! Bayburt’ta kale yüksek, müze köyün tepesinde!', bye:'Bayburt’tan Dede Korkut hikâyeleri gibi uzun bir yolculuğa!', nb:[61, 53, 25, 24, 29], items:[
    ['bayburtkale', 'bayburtkalesi', 'Bayburt Kalesi', 'Bayburt Kalesi, Çoruh Nehri’ne bakan bir tepe üstündedir ve şehrin simgesidir.', ['Bayburt Kalesi hangi nehre bakar?', 'Çoruh', 'Sakarya', 'Seyhan'], 'Kale Magneti'],
    ['baksi', 'baksimuzesi', 'Baksı Müzesi', 'Baksı Müzesi, Bayburt’ta bir köyün tepesinde kurulmuş bir müzedir; çağdaş sanat ile geleneksel el sanatlarını bir arada sergiler.', ['Baksı Müzesi nerede kurulmuştur?', 'Bir köyün tepesinde', 'Bir gemide', 'Bir adada'], 'Dokuma Kilim'],
    ['lordolmasi', 'bayburtlordolmasi', 'Bayburt Lor Dolması', 'Bayburt lor dolmasının içinde lor peyniri ve evelik denen yabani bir ot bulunur. 2017’de coğrafi işaretle tescillendi.', ['Lor dolmasının içinde hangi peynir vardır?', 'Lor', 'Kaşar', 'Rokfor'], 'Kaymak Kâsesi'] ] },
  74: { line:'Merhaba! Bartın’da kale denize uzanıyor, taşlar sütun sütun!', bye:'Bartın’dan Amasra kadar güzel anılarla ayrıl!', nb:[67, 78, 37], items:[
    ['amasra', 'amasra', 'Amasra', 'Amasra, Bartın’ın denize uzanan küçük bir ilçesidir. Eski kale surları ve ahşap el sanatlarıyla bilinir.', ['Amasra hangi el sanatıyla bilinir?', 'Ahşap işçiliği', 'Cam üfleme', 'Halı dokuma'], 'Ahşap Kaşık'],
    ['guzelcehisar', 'guzelcehisar', 'Güzelcehisar Lav Sütunları', 'Güzelcehisar’daki lav sütunları, yanardağdan çıkan lavın soğuyup sütun sütun katılaşmasıyla oluştu.', ['Lav sütunları nasıl oluştu?', 'Lav soğuyup katılaşarak', 'İnsanlar dikerek', 'Ağaçlar taşlaşarak'], 'Bazalt Taşı'],
    ['bartinagda', 'bartinagdatatlisi', 'Bartın Ağda Tatlısı', 'Bartın ağda tatlısı, şekerin kaynatılıp çekilerek bembeyaz yapılmasıyla hazırlanır. 2020’de coğrafi işaretle tescillendi.', ['Ağda tatlısı neyden yapılır?', 'Şekerden', 'Tuzdan', 'Biberden'], 'Şeker Kutusu'] ] },
  78: { line:'Hoş geldin! Karabük’te evler beyaz, safran mor, demir kızgın!', bye:'Karabük’ten çelik gibi sağlam anılarla ayrıl!', nb:[74, 37, 18, 14, 67], items:[
    ['safranbolu', 'safranboluevleri', 'Safranbolu Evleri', 'Safranbolu, beyaz badanalı, ahşap cumbalı Osmanlı evleriyle ünlüdür. 1994’te UNESCO Dünya Mirası Listesi’ne girdi.', ['Safranbolu neyiyle ünlüdür?', 'Osmanlı evleriyle', 'Gökdelenleriyle', 'Piramitleriyle'], 'Bakır Cezve'],
    ['safran', 'safranbolusafrani', 'Safranbolu Safranı', 'Safran, mor çiçeğin kırmızı tepeciklerinden elde edilen değerli bir baharattır. Safranbolu safranı 2011’de menşe adıyla tescillendi; Avrupa Birliği’nde de tescillidir.', ['Safran çiçeği hangi renktedir?', 'Mor', 'Siyah', 'Turuncu'], 'Safran Şişesi'],
    ['demircelik', 'karabukdemircelik', 'Karabük Demir Çelik', 'Karabük Demir Çelik Fabrikası’nın temeli 1937’de atıldı. Şehir bu fabrikanın çevresinde büyüdü.', ['Karabük hangi sanayiyle bilinir?', 'Demir çelik', 'Uçak', 'Oyuncak'], 'Baret'] ] },
  81: { line:'Merhaba! Düzce’de şelaleler ormanın içinde, kaleler deniz kıyısında!', bye:'Düzce’den şelale gibi coşkuyla ayrıl!', nb:[67, 14, 54], items:[
    ['guzeldere', 'guzelderesselalesi', 'Güzeldere Şelalesi', 'Güzeldere Şelalesi, Düzce’de ormanların içinde kademe kademe dökülen bir şelaledir.', ['Güzeldere Şelalesi nerededir?', 'Ormanların içinde', 'Çölün ortasında', 'Bir adada'], 'Su Matarası'],
    ['konuralp', 'konuralptiyatrosu', 'Konuralp Antik Tiyatrosu', 'Konuralp’teki antik tiyatro, eski Prusias ad Hypium kentinden kalmıştır. Seyirciler yamaca dizilmiş taş basamaklarda otururdu.', ['Antik tiyatroda seyirciler nerede otururdu?', 'Taş basamaklarda', 'Koltuklarda', 'Ağaçlarda'], 'Antik Sikke'],
    ['akcakoca', 'akcakocakalesi', 'Akçakoca Ceneviz Kalesi', 'Akçakoca’daki Ceneviz Kalesi, denize bakan bir tepedeki eski bir kale kalıntısıdır.', ['Akçakoca Kalesi neye bakar?', 'Denize', 'Çöle', 'Buzula'], 'Çapa Magneti'] ] },
};
const iller = JSON.parse(fs.readFileSync(DIR + 'karadeniz.json', 'utf8'));
iller.forEach(il => {
  const v = IL[il.plaka]; if (!v) throw new Error('veri yok: ' + il.name);
  il.line = v.line; il.bye = v.bye; il.nb = v.nb;
  il.items = v.items.map(([k, id, name, fact, quiz, sv]) => {
    if (!A[k] || !S[k]) throw new Error('çizim yok: ' + k);
    return { id, name, fact, quiz, souvenir:{ name:sv, art:art(S[k]) }, art:art(A[k]) };
  });
});
fs.writeFileSync(DIR + 'karadeniz.json', formatGroup(iller));
const regs = JSON.parse(fs.readFileSync(DIR + 'bolgeler.json', 'utf8'));
const r = regs.find(x => x.id === 'karadeniz'); r.guide = { ini:'ÇZ', name:'Çaycı Zeynep', art:art(GUIDE) };
fs.writeFileSync(DIR + 'bolgeler.json', formatGroup(regs));
console.log('Karadeniz:', iller.length, 'il,', iller.reduce((t, i) => t + i.items.length, 0), 'resim');
