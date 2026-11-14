// Ege verisini oluşturur: src/content/turkiye/ege.json + bolgeler.json'da Ege rehberi
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { A as A1 } from './ege-1.mjs';
import { A as A2 } from './ege-2.mjs';
import { S, GUIDE } from './ege-hatira.mjs';
import { formatGroup } from '../../scripts/content.mjs';
const DIR = fileURLToPath(new URL('../../src/content/turkiye/', import.meta.url));
const A = { ...A1, ...A2 };
const art = f => { const a = f(); return { n:a.n, pal:a.pal, px:a.px }; };
// [çizim anahtarı, kimlik, ad, bilgi, soru, hatıra adı]
const IL = {
  3: { line:'Hoş geldin! Afyonkarahisar’da kale bulutlara uzanır, kaymak ağızda erir.', bye:'Afyon’dan kaymağın tadıyla ayrıl, yolun açık olsun!', nb:[43, 26, 42, 32, 15, 20, 64], items:[
    ['afyonkale', 'afyonkale', 'Afyon Kalesi', 'Afyon Kalesi, şehrin ortasında yaklaşık 226 metre yükselen volkanik bir kayanın üstüne kurulmuştur.', ['Afyon Kalesi neyin üstüne kurulmuştur?', 'Volkanik bir kayanın', 'Bir adanın', 'Bir buzulun'], 'Mermer Küp'],
    ['kaymak', 'afyonkaymagi', 'Afyon Kaymağı', 'Afyon kaymağı, manda sütünden yapılan kalın ve yumuşak bir kaymaktır. 2009’da menşe adıyla coğrafi işaret olarak tescillendi.', ['Afyon kaymağı hangi hayvanın sütünden yapılır?', 'Manda', 'Deve', 'Koyun'], 'Kaymak Kâsesi'],
    ['sucuk', 'afyonsucugu', 'Afyon Sucuğu', 'Afyon sucuğu 2005’te coğrafi işaretle tescillendi; Avrupa Birliği’nde de tescilli bir üründür.', ['Afyon sucuğu hangi ilin ürünüdür?', 'Afyonkarahisar', 'Sinop', 'Artvin'], 'Sucuk Ekmek'] ] },
  9: { line:'Merhaba! Aydın’da incir ağaçları gölge verir, antik kentler hikâye anlatır.', bye:'Aydın’dan incir gibi tatlı anılarla ayrıl!', nb:[35, 45, 20, 48], items:[
    ['afrodisias', 'afrodisias', 'Afrodisias', 'Afrodisias, adını Afrodit’ten alan antik bir kenttir; mermer heykel atölyeleriyle ünlüydü. UNESCO Dünya Mirası Listesi’ndedir.', ['Afrodisias antik kenti neyle ünlüydü?', 'Mermer heykel atölyeleriyle', 'Cam üfleme ustalarıyla', 'Gemi tersaneleriyle'], 'Heykel Başı'],
    ['incir', 'aydininciri', 'Aydın İnciri', 'Aydın inciri, Türkiye’nin Avrupa Birliği’nde tescilli coğrafi işaretli ürünlerindendir. Kurutularak birçok ülkeye gönderilir.', ['Aydın inciri genellikle nasıl saklanır?', 'Kurutularak', 'Dondurularak', 'Tuzlanarak'], 'İncir Reçeli'],
    ['pamuk', 'sokepamugu', 'Söke Pamuğu', 'Söke Ovası’nda yetişen Söke pamuğu coğrafi işaretle tescillidir. Pamuk, kozası açılınca toplanır.', ['Pamuk ne zaman toplanır?', 'Kozası açılınca', 'Çiçek açmadan önce', 'Kışın kar yağınca'], 'Pamuklu Tişört'] ] },
  20: { line:'Hoş geldin! Denizli’de dağlar bembeyaz ama kar değil; gel, travertenlere bakalım.', bye:'Denizli horozu gibi sesini duyur, yine gel!', nb:[64, 3, 15, 48, 9, 45], items:[
    ['pamukkale', 'pamukkale', 'Pamukkale', 'Pamukkale’nin bembeyaz basamakları, sıcak su kaynaklarındaki kirecin birikmesiyle oluşan travertenlerdir. Hierapolis ile birlikte 1988’de UNESCO Dünya Mirası Listesi’ne girdi.', ['Pamukkale’nin beyaz basamakları nasıl oluştu?', 'Sıcak sudaki kirecin birikmesiyle', 'Kar ve buzla', 'İnsanlar boyadığı için'], 'Su Matarası'],
    ['horoz', 'denizlihorozu', 'Denizli Horozu', 'Denizli horozu, uzun ve gür ötüşüyle bilinir; şehrin simgesidir.', ['Denizli horozu en çok neyiyle bilinir?', 'Uzun ötüşüyle', 'Yüzmesiyle', 'Mavi tüyleriyle'], 'Horoz Biblosu'],
    ['buldanbezi', 'buldanbezi', 'Buldan Bezi', 'Buldan bezi, Denizli’nin Buldan ilçesinde el tezgâhlarında dokunan bir dokumadır. 2010’dan beri coğrafi işaretle korunur.', ['Buldan bezi nasıl üretilir?', 'El tezgâhında dokunarak', 'Fırında pişirilerek', 'Kâğıttan kesilerek'], 'Peştamal'] ] },
  35: { line:'Merhaba! İzmir’de deniz, rüzgâr ve tarih buluşuyor. Önce saat kulesine gidelim!', bye:'İzmir’den boyoz kokusuyla ayrıl, yolun açık olsun!', nb:[10, 45, 9], items:[
    ['saatkulesi', 'saatkulesi', 'İzmir Saat Kulesi', 'Konak Meydanı’ndaki İzmir Saat Kulesi 1901’de yapıldı. Yaklaşık 25 metre yüksekliğindedir ve şehrin simgesidir.', ['İzmir Saat Kulesi hangi meydandadır?', 'Konak Meydanı', 'Taksim Meydanı', 'Kızılay Meydanı'], 'Cep Saati'],
    ['boyoz', 'izmirboyozu', 'İzmir Boyozu', 'İzmir boyozu, kat kat açılan hamurla yapılan yuvarlak bir hamur işidir; genellikle haşlanmış yumurtayla yenir. 2017’de coğrafi işaretle tescillendi.', ['Boyozun yanında genellikle ne yenir?', 'Haşlanmış yumurta', 'Pilav', 'Çorba'], 'Yumurta'],
    ['efes', 'efes', 'Efes Antik Kenti', 'Efes, Celsus Kütüphanesi’nin görkemli cephesiyle ünlü antik bir kenttir. 2015’te UNESCO Dünya Mirası Listesi’ne girdi.', ['Efes’teki ünlü yapı hangisidir?', 'Celsus Kütüphanesi', 'Galata Kulesi', 'Selimiye Camii'], 'Parşömen'] ] },
  43: { line:'Hoş geldin! Kütahya’da çinilerin mavisi gökyüzüyle yarışır.', bye:'Kütahya’dan bir çini kadar renkli anılarla ayrıl!', nb:[16, 11, 26, 3, 64, 45, 10], items:[
    ['aizanoi', 'aizanoi', 'Aizanoi Antik Kenti', 'Kütahya’nın Çavdarhisar ilçesindeki Aizanoi’de, yaklaşık 2000 yıldır ayakta duran bir Zeus Tapınağı vardır. Kent 2012’de UNESCO Dünya Mirası Geçici Listesi’ne alındı.', ['Aizanoi’deki ünlü tapınak hangi tanrı adına yapılmıştır?', 'Zeus', 'Poseidon', 'Hermes'], 'Sütun Biblosu'],
    ['cini', 'kutahyacinisi', 'Kütahya Çinisi', 'Kütahya çinisi, mavi, yeşil ve kırmızı desenleriyle bilinen el yapımı seramiktir. Coğrafi işaretle tescillidir.', ['Kütahya hangi el sanatıyla ünlüdür?', 'Çinicilik', 'Bakırcılık', 'Camcılık'], 'Çini Fincan'],
    ['dumlupinar', 'dumlupinar', 'Dumlupınar', '30 Ağustos 1922’de Başkomutanlık Meydan Muharebesi, Kütahya’nın Dumlupınar ilçesi yakınlarında kazanıldı. Bu zafer her yıl 30 Ağustos Zafer Bayramı olarak kutlanır.', ['30 Ağustos hangi bayram olarak kutlanır?', 'Zafer Bayramı', 'Çocuk Bayramı', 'Gençlik Bayramı'], 'Zafer Madalyası'] ] },
  45: { line:'Merhaba! Manisa’da dağlar lale açar, meydanlarda mesir saçılır.', bye:'Manisa’dan mesir macunu gibi enerjik ayrıl!', nb:[35, 10, 43, 64, 20, 9], items:[
    ['spil', 'spildagi', 'Spil Dağı', 'Spil Dağı Milli Parkı’nda, yılda yalnızca birkaç gün açan Manisa lalesi yetişir. Bu laleyi koparmak yasaktır.', ['Spil Dağı’ndaki Manisa lalesini koparmak serbest midir?', 'Hayır, yasaktır', 'Evet, istediğin kadar', 'Sadece kışın serbest'], 'Lale Fotoğrafı'],
    ['mesir', 'mesirmacunu', 'Manisa Mesir Macunu', 'Mesir macunu, onlarca baharatla hazırlanan bir macundur. Manisa’da her yıl kubbelerden mesir saçılan festival, UNESCO Somut Olmayan Kültürel Miras listesindedir.', ['Mesir macunu neyle hazırlanır?', 'Onlarca baharatla', 'Sadece çikolatayla', 'Balık yağıyla'], 'Baharat Kavanozu'],
    ['kula', 'kulajeoparki', 'Kula Jeoparkı', 'Kula ve Salihli çevresindeki sönmüş yanardağlar ve lav akıntıları, UNESCO Küresel Jeoparkı olarak korunur.', ['Kula Jeoparkı’nda hangi doğal oluşumlar vardır?', 'Sönmüş yanardağlar', 'Buzullar', 'Mercan resifleri'], 'Lav Taşı'] ] },
  48: { line:'Hoş geldin! Muğla’da deniz turkuaz, çam ormanları yemyeşil. Önce şövalyelerin kalesine!', bye:'Muğla’dan çam balı tadında tatlı anılarla ayrıl!', nb:[9, 20, 15, 7], items:[
    ['bodrumkale', 'bodrumkalesi', 'Bodrum Kalesi', 'Bodrum Kalesi, 15. yüzyılın başında Rodos şövalyeleri tarafından yapılmaya başlandı. Bugün içinde bir Sualtı Arkeoloji Müzesi vardır.', ['Bodrum Kalesi’nin içinde hangi müze vardır?', 'Sualtı Arkeoloji Müzesi', 'Uzay Müzesi', 'Oyuncak Müzesi'], 'Şövalye Miğferi'],
    ['oludeniz', 'oludeniz', 'Ölüdeniz', 'Fethiye’deki Ölüdeniz, sakin ve turkuaz renkli bir lagündür. Üstündeki Babadağ, yamaç paraşütçülerinin gözdesidir.', ['Ölüdeniz’in suyu nasıldır?', 'Sakin ve turkuaz', 'Dalgalı ve kahverengi', 'Donmuş'], 'Paraşüt Magneti'],
    ['cambali', 'muglacambali', 'Muğla Çam Balı', 'Çam balı, arıların çam ağaçlarındaki tatlı salgıları toplamasıyla oluşur. Muğla çam balı 2018’de menşe adıyla tescillendi.', ['Çam balını arılar nereden toplar?', 'Çam ağaçlarından', 'Gül bahçelerinden', 'Deniz kenarından'], 'Çam Kozalağı'] ] },
  64: { line:'Merhaba! Uşak’ta halılar renk renk, kanyonlar derin mi derin.', bye:'Uşak’tan bir halı deseni kadar renkli anılarla ayrıl!', nb:[45, 43, 3, 20], items:[
    ['ulubey', 'ulubeykanyonu', 'Ulubey Kanyonu', 'Ulubey Kanyonu, Banaz Çayı’nın yüzyıllar içinde oyduğu derin bir vadidir. Kanyonu izlemek için 2015’te cam bir seyir terası açıldı.', ['Ulubey Kanyonu’nu izlemek için ne yapıldı?', 'Cam seyir terası', 'Teleferik istasyonu', 'Buz pateni pisti'], 'Fotoğraf Makinesi'],
    ['usakhali', 'usakhalisi', 'Uşak Halısı', 'Uşak halıları yüzyıllardır dokunur ve dünyanın birçok müzesinde sergilenir. Uşak halısı 2012’de coğrafi işaretle tescillendi.', ['Uşak hangi el sanatıyla ünlüdür?', 'Halıcılık', 'Çömlekçilik', 'Kalaycılık'], 'Mini Halı'],
    ['usakhelvasi', 'usakhelvasi', 'Uşak Helvası', 'Uşak helvası, yöreye özgü bir helva çeşididir. 2022’de coğrafi işaretle tescillendi.', ['Uşak helvası hangi ilin lezzetidir?', 'Uşak', 'Kars', 'Ordu'], 'Helva Kutusu'] ] },
};
const iller = JSON.parse(fs.readFileSync(DIR + 'ege.json', 'utf8'));
iller.forEach(il => {
  const v = IL[il.plaka]; if (!v) throw new Error('veri yok: ' + il.name);
  il.line = v.line; il.bye = v.bye; il.nb = v.nb;
  il.items = v.items.map(([k, id, name, fact, quiz, sv]) => {
    if (!A[k] || !S[k]) throw new Error('çizim yok: ' + k);
    return { id, name, fact, quiz, souvenir:{ name:sv, art:art(S[k]) }, art:art(A[k]) };
  });
});
fs.writeFileSync(DIR + 'ege.json', formatGroup(iller));
const regs = JSON.parse(fs.readFileSync(DIR + 'bolgeler.json', 'utf8'));
const r = regs.find(x => x.id === 'ege'); r.guide = { ini:'EM', name:'Efe Mert', art:art(GUIDE) };
fs.writeFileSync(DIR + 'bolgeler.json', formatGroup(regs));
console.log('Ege:', iller.length, 'il,', iller.reduce((t, i) => t + i.items.length, 0), 'resim');
