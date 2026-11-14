// Yeni albümleri yazar: 13-dinozor, 14-ciftlik, 15-kahvalti, 16-meslek
// node albumler-yeni-veri.mjs  (tekrar çalıştırılırsa dosyaları yeniden yazar)
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { A as A1 } from './albumler-yeni-1.mjs';
import { A as A2 } from './albumler-yeni-2.mjs';
import { formatGroup } from '../../scripts/content.mjs';
const DIR = fileURLToPath(new URL('../../src/content/albums/', import.meta.url));
const A = { ...A1, ...A2 };
const art = f => { const a = f(); return { n:a.n, pal:a.pal, px:a.px }; };
// [dosya, kimlik, ad, renk, [[çizim/kimlik, ad, bilgi], ...]]
const ALB = [
  ['13-dinozor', 'dinozor', 'DİNOZORLAR', '#6B8E23', [
    ['trex', 'T-Rex', 'T-Rex, yaşamış en büyük etçil dinozorlardan biridir. Ön kolları gövdesine göre çok kısaydı.'],
    ['triceratops', 'Triceratops', 'Triceratops’un başında üç boynuz ve boynunu koruyan kemikten bir yaka vardı. Bitkilerle beslenirdi.'],
    ['brakiyozor', 'Brakiyozor', 'Brakiyozor, upuzun boynu sayesinde yüksek ağaçların yapraklarına uzanabilirdi.'],
    ['stegozor', 'Stegozor', 'Stegozorun sırtında iri kemik plakalar, kuyruğunun ucunda sivri dikenler vardı.'],
    ['ankilozor', 'Ankilozor', 'Ankilozorun vücudu zırh gibi kemik plakalarla kaplıydı; kuyruğunun ucunda kemikten bir topuz vardı.'],
    ['pteranodon', 'Pteranodon', 'Pteranodon uçabilen bir sürüngendi ama dinozor değildi. Dinozorlarla aynı dönemde yaşadı.'],
    ['dinoyumurta', 'Dinozor Yumurtası', 'Dinozorlar yumurtlayarak çoğalırdı. Bilim insanları taşlaşmış dinozor yumurtaları bulmuştur.'],
    ['fosil', 'Amonit Fosili', 'Fosiller, milyonlarca yıl önce yaşamış canlıların taşlaşmış izleridir. Amonitler, dinozorlar devrinde denizlerde yaşayan sarmal kabuklu canlılardı.'],
    ['gokdasi', 'Göktaşı', 'Yaklaşık 66 milyon yıl önce Dünya’ya çarpan büyük bir göktaşının dinozorların yok olmasında önemli rol oynadığı düşünülür.'] ]],
  ['14-ciftlik', 'ciftlik', 'ÇİFTLİK', '#B5651D', [
    ['ahir', 'Ahır', 'Ahır, çiftlik hayvanlarının barındığı ve kışın soğuktan korunduğu yapıdır.'],
    ['inek', 'İnek', 'İnekler gün boyu ot yer. Dört bölmeli mideleri sayesinde otu sindirebilirler.'],
    ['tavuk', 'Tavuk ve Civciv', 'Civcivler yumurtadan yaklaşık 21 günde çıkar.'],
    ['koyun', 'Koyun', 'Koyunların yünü her yıl kırkılır; kırkmak koyunun canını acıtmaz.'],
    ['korkuluk', 'Korkuluk', 'Korkuluklar, kuşları tarladaki tohumlardan uzak tutmak için kullanılır.'],
    ['samanbalyasi', 'Saman Balyası', 'Saman, tahıl hasat edildikten sonra kalan kuru saplardır. Hayvanlara yem ve yataklık olur.'],
    ['at', 'At', 'Atlar ayakta dururken de uyuyabilir.'],
    ['keci', 'Keçi', 'Keçiler çok iyi tırmanır; dik kayalıklarda bile rahatça dolaşırlar.'],
    ['ordek', 'Ördek', 'Ördeklerin tüyleri yağlıdır, bu yüzden suyu geçirmez.'] ]],
  ['15-kahvalti', 'kahvalti', 'TÜRK KAHVALTISI', '#D9A21E', [
    ['balkaymak', 'Bal Kaymak', 'Kaymak, sütün kaynatılıp yavaşça soğutulmasıyla üstünde oluşan yoğun tabakadır; balla birlikte yenir.'],
    ['beyazpeynir', 'Beyaz Peynir', 'Beyaz peynir salamurada, yani tuzlu suda saklanır.'],
    ['zeytin', 'Zeytin', 'Zeytin ağaçları yüzlerce yıl yaşayabilir. Zeytin dalı barışın simgesidir.'],
    ['sucukluyumurta', 'Sucuklu Yumurta', 'Sucuklu yumurta sahanda pişirilir. Sahan, iki kulplu küçük bir tavadır.'],
    ['pogaca', 'Poğaça', 'Poğaça; peynirli, zeytinli ya da patatesli olabilen yumuşacık bir hamur işidir.'],
    ['recel', 'Vişne Reçeli', 'Reçel, meyvelerin şekerle kaynatılmasıyla yapılır.'],
    ['haslanmisyumurta', 'Haşlanmış Yumurta', 'Rafadan yumurtanın sarısı akışkan, katı yumurtanın sarısı serttir. Fark, haşlama süresindedir.'],
    ['gozleme', 'Gözleme', 'Gözleme, ince açılmış yufkanın içine peynir ya da patates konup sacda pişirilmesiyle yapılır.'],
    ['caydanlik', 'Çaydanlık', 'Çaydanlık iki katlıdır: altta su kaynar, üstteki demlikte çay demlenir.'] ]],
  ['16-meslek', 'meslek', 'MESLEKLER', '#3A6EA5', [
    ['doktor', 'Doktor', 'Doktorlar kalbimizi ve ciğerlerimizi stetoskopla dinler.'],
    ['itfaiyeci', 'İtfaiyeci', 'İtfaiyeciler yalnızca yangın söndürmez; sel ve depremde kurtarma da yapar.'],
    ['asci', 'Aşçı', 'Aşçılar yemek hazırlarken temizliğe çok dikkat eder ve ellerini sık sık yıkar.'],
    ['pilot', 'Pilot', 'Yolcu uçaklarında genellikle iki pilot bulunur: kaptan ve yardımcı pilot.'],
    ['ogretmen', 'Öğretmen', 'Türkiye’de 24 Kasım, Öğretmenler Günü olarak kutlanır.'],
    ['veteriner', 'Veteriner', 'Veterinerler hayvanların doktorudur; evcil hayvanları da çiftlik hayvanlarını da tedavi eder.'],
    ['ressam', 'Ressam', 'Ressamlar renkleri paletlerinde karıştırır. Sarı ile mavi karışınca yeşil olur.'],
    ['marangoz', 'Marangoz', 'Marangozlar ahşaptan masa, sandalye ve dolap gibi eşyalar yapar.'],
    ['postaci', 'Postacı', 'Postacılar mektupları ve kolileri adreslerine ulaştırır.'] ]],
];
for (const [file, id, name, color, items] of ALB){
  const al = { id, name, color, items:items.map(([k, nm, fact]) => {
    if (!A[k]) throw new Error('çizim yok: ' + k);
    return { id:k, name:nm, fact, art:art(A[k]) };
  }) };
  fs.writeFileSync(DIR + file + '.json', formatGroup(al));
  console.log(id, al.items.length);
}
