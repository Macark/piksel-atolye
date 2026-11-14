// Yeni albümleri yazar: 17-kus, 18-bocek, 19-spor, 20-okul, 21-motif, 22-manzara
// node albumler-yeni2-veri.mjs  (tekrar çalıştırılırsa dosyaları yeniden yazar)
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { A as A3 } from './albumler-yeni-3.mjs';
import { A as A4 } from './albumler-yeni-4.mjs';
import { A as A5 } from './albumler-yeni-5.mjs';
import { formatGroup } from '../../scripts/content.mjs';
const DIR = fileURLToPath(new URL('../../src/content/albums/', import.meta.url));
const A = { ...A3, ...A4, ...A5 };
const art = f => { const a = f(); return { n:a.n, pal:a.pal, px:a.px }; };
// [dosya, kimlik, ad, renk, [[çizim, kimlik, ad, bilgi], ...]]  (kimlik çakışmasın diye bazılarına önek)
const ALB = [
  ['17-kus', 'kus', 'KUŞLAR', '#2A9D8F', [
    ['flamingo', 'flamingo', 'Flamingo', 'Flamingoların pembe rengi, yedikleri küçük karides ve alglerdeki boyalardan gelir. İzmir’deki Gediz Deltası, flamingoların Türkiye’deki önemli üreme alanlarındandır.'],
    ['papagan', 'papagan', 'Papağan', 'Bazı papağanlar duydukları sesleri ve kelimeleri taklit edebilir.'],
    ['tukan', 'tukan', 'Tukan', 'Tukanın gagası kocaman görünür ama içi süngerimsi olduğu için çok hafiftir.'],
    ['kartal', 'kartal', 'Kartal', 'Kartallar çok keskin görür; yüksekten uçarken yerdeki küçük bir hayvanı bile fark edebilirler.'],
    ['leylek', 'leylek', 'Leylek', 'Leylekler her sonbahar Afrika’ya göç eder. İstanbul Boğazı, göçmen leyleklerin en önemli geçiş yollarından biridir.'],
    ['tavuskusu', 'tavuskusu', 'Tavus Kuşu', 'Uzun, renkli kuyruk tüyleri erkek tavus kuşlarında olur. Tüylerini yelpaze gibi açarak gösteriş yaparlar.'],
    ['saka', 'sakakusu', 'Saka Kuşu', 'Saka kuşu, yüzündeki kırmızı lekeden ve kanatlarındaki sarı şeritten kolayca tanınır. Devedikeni tohumlarını çok sever.'],
    ['kizilgerdan', 'kizilgerdan', 'Kızılgerdan', 'Kızılgerdan adını göğsündeki turuncu-kırmızı tüylerden alır. Kışın da ötmeye devam eder.'],
    ['yalicapkini', 'yalicapkini', 'Yalıçapkını', 'Yalıçapkını suya dalarak balık yakalar. Japonya’daki bir hızlı trenin burnu, yalıçapkınının gagasından esinlenerek tasarlandı.'] ]],
  ['18-bocek', 'bocek', 'BÖCEKLER', '#4E9A3A', [
    ['karinca', 'karinca', 'Karınca', 'Karıncalar kendi ağırlıklarının kat kat fazlasını taşıyabilir ve büyük koloniler hâlinde yaşar.'],
    ['cekirge', 'cekirge', 'Çekirge', 'Çekirgeler uzun arka bacakları sayesinde boylarının çok katı uzağa sıçrayabilir.'],
    ['yusufcuk', 'yusufcuk', 'Yusufçuk', 'Yusufçukların dört kanadı vardır; havada asılı durabilir, hatta geri geri uçabilirler.'],
    ['atesbocegi', 'atesbocegi', 'Ateş Böceği', 'Ateş böcekleri kendi ışıklarını üretir ve bu ışıkla birbirlerine işaret verir.'],
    ['gergedanbocegi', 'gergedanbocegi', 'Gergedan Böceği', 'Gergedan böceği adını başındaki boynuz gibi çıkıntıdan alır. Boyuna göre çok güçlüdür.'],
    ['peygamberdevesi', 'peygamberdevesi', 'Peygamber Devesi', 'Peygamber devesi ön bacaklarını dua eder gibi tutar. Başını iki yana çok geniş çevirebilir.'],
    ['tirtil', 'tirtil', 'Tırtıl', 'Tırtıllar zamanla kozaya girer ve kelebeğe ya da güveye dönüşür.'],
    ['orumcek', 'orumcek', 'Örümcek', 'Örümcekler aslında böcek değildir: sekiz bacakları vardır, böceklerin altı. Ağlarını kendi ürettikleri ipekle örerler.'],
    ['agustosbocegi', 'agustosbocegi', 'Ağustos Böceği', 'Yazın duyduğumuz cırıltıyı erkek ağustos böcekleri çıkarır.'] ]],
  ['19-spor', 'spor', 'SPOR', '#D9483B', [
    ['basketbol', 'basketbol', 'Basketbol', 'Basketbol 1891’de ABD’de bir beden eğitimi öğretmeni olan James Naismith tarafından icat edildi. İlk potalar şeftali sepetleriydi.'],
    ['voleybol', 'voleybol', 'Voleybol', 'Voleybolda her takım topu en fazla üç dokunuşta karşı sahaya geçirmelidir.'],
    ['tenis', 'tenisraketi', 'Tenis', 'Tenis kortları çim, toprak ya da sert zeminli olabilir. Wimbledon turnuvası çim kortta oynanır.'],
    ['madalya', 'madalya', 'Altın Madalya', 'Olimpiyatlarda birinciye altın, ikinciye gümüş, üçüncüye bronz madalya verilir.'],
    ['bowling', 'bowling', 'Bowling', 'Bowlingde on lobutun hepsini ilk atışta devirmeye “strike” denir.'],
    ['kayak', 'kayakci', 'Kayak', 'Türkiye’de Uludağ, Palandöken ve Erciyes kayak yapılan dağlardandır.'],
    ['okculuk', 'okculuk', 'Okçuluk', 'Okçuluk Osmanlı’da çok sevilen bir spordu; İstanbul’daki Okmeydanı okçuların talim yeriydi.'],
    ['masatenisi', 'masatenisi', 'Masa Tenisi', 'Masa tenisi topu çok hafiftir; yalnızca 2,7 gram gelir.'],
    ['kaykay', 'kaykay', 'Kaykay', 'Kaykay, Tokyo 2020 Olimpiyat Oyunları’nda ilk kez olimpik spor olarak yer aldı.'] ]],
  ['20-okul', 'okul', 'OKUL', '#7A4FB5', [
    ['canta', 'okulcantasi', 'Okul Çantası', 'Sırt çantasının iki askısını da takmak, yükü iki omza eşit dağıtır.'],
    ['kursunkalem', 'kursunkalem', 'Kurşun Kalem', 'Kurşun kalemin içinde aslında kurşun yoktur; ucu grafit ve kilden yapılır.'],
    ['silgi', 'silgi', 'Silgi', 'Kauçuğun kalem izini sildiği 18. yüzyılda keşfedildi. Ondan önce yazıları silmek için bayat ekmek kullanılırdı.'],
    ['cetvel', 'cetvel', 'Cetvel', 'Cetveldeki uzun çizgilerin arası 1 santimetredir; 1 santimetrede 10 milimetre vardır.'],
    ['defter', 'defter', 'Defter', 'Kâğıt ilk olarak yaklaşık iki bin yıl önce Çin’de yapıldı.'],
    ['boyakalemleri', 'boyakalemleri', 'Boya Kalemleri', 'Kırmızı, sarı ve mavi ana renklerdir; bunları karıştırarak başka renkler elde edebilirsin.'],
    ['makas', 'makas', 'Makas', 'Solak çocuklar için özel makaslar vardır; bıçakları ters yönde yerleştirilmiştir.'],
    ['yerkure', 'yerkure', 'Yerküre', 'Dünya’nın yüzeyinin yaklaşık yüzde 71’i sularla kaplıdır.'],
    ['okulzili', 'okulzili', 'Okul Zili', 'Okul zili derslerin ve teneffüslerin başladığını haber verir.'] ]],
  ['21-motif', 'motif', 'MOTİFLER', '#1E3A8A', [
    ['muska', 'muskamotifi', 'Muska', 'Üçgen biçimli muska motifi, kilimlere geleneksel olarak kötülükten ve nazardan korunma dileğiyle dokunur.'],
    ['akrep', 'akrepmotifi', 'Akrep', 'Akrep motifi, kilim geleneğinde akrepten ve kötülüklerden korunma dileğini anlatır.'],
    ['elibelinde', 'elibelinde', 'Elibelinde', 'Elibelinde, kilimlerde elleri belinde duran bir kadına benzeyen motiftir. Geleneksel olarak anneliğin ve bereketin simgesi kabul edilir.'],
    ['kocboynuzu', 'kocboynuzu', 'Koçboynuzu', 'Koçboynuzu motifi, kilim geleneğinde gücün ve kahramanlığın simgesi olarak bilinir.'],
    ['hayatagaci', 'hayatagaci', 'Hayat Ağacı', 'Hayat ağacı birçok kültürde yaşamın ve sonsuzluğun simgesidir; halı ve kilimlerde sık görülür.'],
    ['cintemani', 'cintemani', 'Çintemani', 'Çintemani üç top ve iki dalgalı çizgiden oluşur. Osmanlı kumaşlarında ve çinilerinde sıkça kullanılmıştır.'],
    ['selcukluyildizi', 'selcukluyildizi', 'Selçuklu Yıldızı', 'Sekiz köşeli yıldız, Selçuklu taş işçiliğinde ve çinilerinde sık görülen bir süslemedir.'],
    ['suyolu', 'suyolu', 'Su Yolu', 'Su yolu, kilimlerin kenarlarını süsleyen zikzaklı bir motiftir. Suyun hayat verdiği inancıyla ilişkilendirilir.'],
    ['karanfil', 'karanfilmotifi', 'Karanfil', 'Karanfil, lale ile birlikte İznik çinilerinin en sevilen çiçek motiflerindendir.'] ]],
  ['22-manzara', 'manzara', 'MANZARALAR', '#3A8AC0', [
    ['daggolu', 'daggolu', 'Dağ Gölü', 'Durgun bir dağ gölü, ayna gibi çevresindeki dağları yansıtır.'],
    ['gunbatimi', 'gunbatimi', 'Gün Batımı', 'Güneş batarken ışığı havada daha uzun yol alır; mavi ışık saçılıp kaybolur, gökyüzü turuncuya ve kırmızıya döner.'],
    ['col', 'colvaha', 'Çöl ve Vaha', 'Vaha, çölde yer altı suyunun yüzeye çıktığı ve bitkilerin yetiştiği yerdir.'],
    ['selale', 'selale', 'Şelale', 'Dünyanın en yüksek şelalesi, Venezuela’daki yaklaşık 979 metrelik Angel Şelalesi’dir.'],
    ['camormani', 'camormani', 'Çam Ormanı', 'Çam ağaçları kışın da yapraklarını dökmez; yaprakları iğne gibidir.'],
    ['karlidag', 'karlidag', 'Karlı Dağ Evi', 'Kar taneleri altı köşelidir; iki kar tanesinin tıpatıp aynı olması neredeyse imkânsızdır.'],
    ['lavanta', 'lavanta', 'Lavanta Tarlası', 'Lavanta yaz başında çiçek açar. Isparta’nın Kuyucak köyü mor lavanta tarlalarıyla ünlüdür.'],
    ['kuzeyisiklari', 'kuzeyisiklari', 'Kuzey Işıkları', 'Kuzey ışıkları, Güneş’ten gelen parçacıkların atmosfere çarpmasıyla oluşur; kutuplara yakın yerlerde görülür.'],
    ['pirincteras', 'pirincteras', 'Pirinç Terasları', 'Dağ yamaçlarına basamak basamak yapılan teraslar pirinç tarlalarının suyunu tutar; Asya’da yaygındır.'] ]],
];
for (const [file, id, name, color, items] of ALB){
  const al = { id, name, color, items:items.map(([k, iid, nm, fact]) => {
    if (!A[k]) throw new Error('çizim yok: ' + k);
    return { id:iid, name:nm, fact, art:art(A[k]) };
  }) };
  fs.writeFileSync(DIR + file + '.json', formatGroup(al));
  console.log(id, al.items.length);
}
