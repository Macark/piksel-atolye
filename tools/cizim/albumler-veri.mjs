// Albümlere 3'er yeni resim ekler (6 → 9). Tekrar çalıştırılırsa aynı kimlikli resimleri günceller.
// node albumler-veri.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { A } from './albumler-ek.mjs';
import { formatGroup } from '../../scripts/content.mjs';
const DIR = fileURLToPath(new URL('../../src/content/albums/', import.meta.url));
const art = f => { const a = f(); return { n:a.n, pal:a.pal, px:a.px }; };
// albüm → [kimlik, ad, bilgi]
const EK = {
  bayrak: [['f_az', 'Azerbaycan'], ['f_se', 'İsveç'], ['f_nl', 'Hollanda']],
  takim: [['t_duduk', 'Hakem Düdüğü', 'Hakem, oyunu başlatmak ve durdurmak için düdük çalar.'],
          ['t_krampon', 'Krampon', 'Kramponların altındaki dişler, oyuncuların çimde kaymasını önler.'],
          ['t_atki', 'Taraftar Atkısı', 'Taraftarlar takımlarını, takım renklerindeki atkılarla destekler.']],
  hayvan: [['kopek', 'Köpek', 'Köpeklerin koku alma duyusu, insanlarınkinden kat kat güçlüdür.'],
           ['fil', 'Fil', 'Fil, karada yaşayan en büyük hayvandır. Hortumuyla hem su içer hem de nesneleri tutar.'],
           ['zurafa', 'Zürafa', 'Zürafa, dünyanın en uzun boylu hayvanıdır.']],
  lezzet: [['pide', 'Pide', 'Pide, fırında pişirilen, kayık biçimli bir hamur işidir.'],
           ['kirmizielma', 'Elma', 'Dünyada binlerce çeşit elma yetişir.'],
           ['menemen', 'Menemen', 'Menemen; domates, biber ve yumurtayla tavada yapılan bir kahvaltı yemeğidir.']],
  uzay: [['uydu', 'Uydu', 'Yapay uydular Dünya’nın çevresinde döner; hava durumu, haberleşme ve haritalar için kullanılır.'],
         ['dunya', 'Dünya', 'Dünya, Güneş’e en yakın üçüncü gezegendir ve yüzeyinin büyük kısmı sularla kaplıdır.'],
         ['teleskop', 'Teleskop', 'Teleskoplar, uzaktaki gök cisimlerini daha büyük ve net görmemizi sağlar.']],
  deniz: [['denizati', 'Denizatı', 'Denizatlarında yavruları erkek denizatı taşır.'],
          ['yunus', 'Yunus', 'Yunuslar balık değil memelidir; nefes almak için su yüzüne çıkarlar.'],
          ['denizanasi', 'Denizanası', 'Denizanalarının beyni ve kemiği yoktur.']],
  bahce: [['ari', 'Arı', 'Bal arıları, çiçeklerden topladıkları nektardan bal yapar.'],
          ['salyangoz', 'Salyangoz', 'Salyangoz evini sırtında taşır ve çok yavaş ilerler.'],
          ['sulamakabi', 'Sulama Kabı', 'Bitkiler büyümek için suya, güneşe ve toprağa ihtiyaç duyar.']],
  mevsim: [['simsek', 'Şimşek', 'Şimşeği önce görür, gök gürültüsünü sonra duyarız; çünkü ışık sesten çok daha hızlıdır.'],
           ['yagmurbotu', 'Yağmur Botu', 'Lastik botlar, yağmurlu günlerde ayaklarımızı kuru tutar.'],
           ['kestanekebap', 'Közde Kestane', 'Kış günlerinde közde pişen kestanenin kokusu sokaklara yayılır.']],
  oyuncak: [['topac', 'Topaç', 'Topaç dönerken dengede kalır; yavaşlayınca yalpalayıp devrilir.'],
            ['yoyo', 'Yoyo', 'Yoyo, ipine sarılıp açılarak aşağı yukarı hareket eden çok eski bir oyuncaktır.'],
            ['yapiblok', 'Yapı Blokları', 'Bloklarla oynamak hayal gücünü ve el becerisini geliştirir.']],
  muzik: [['gitar', 'Gitar', 'Klasik gitarın altı teli vardır.'],
          ['keman', 'Keman', 'Keman, yayla çalınan dört telli bir çalgıdır.'],
          ['darbuka', 'Darbuka', 'Darbuka, elle çalınan, kadeh biçimli bir vurmalı çalgıdır.']],
  ulasim: [['itfaiye', 'İtfaiye Aracı', 'Türkiye’de itfaiye dahil bütün acil yardım ekiplerine 112’yi arayarak ulaşılır.'],
           ['motosiklet', 'Motosiklet', 'Motosiklet kullanırken kask takmak hayat kurtarır.'],
           ['traktor', 'Traktör', 'Traktörler tarlayı sürmek ve ağır yükleri çekmek için kullanılır.']],
  tatli: [['sutlac', 'Sütlaç', 'Sütlaç süt, pirinç ve şekerle yapılır; üstü fırında kızartılabilir.'],
          ['lolipop', 'Lolipop', 'Şeker yedikten sonra dişlerimizi fırçalamayı unutmayalım!'],
          ['cikolata', 'Çikolata', 'Çikolata, kakao ağacının çekirdeklerinden yapılır.']],
};
for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.json'))){
  const al = JSON.parse(fs.readFileSync(DIR + f, 'utf8')), ek = EK[al.id]; if (!ek) continue;
  ek.forEach(([id, name, fact]) => {
    if (!A[id]) throw new Error('çizim yok: ' + id);
    const it = { id, name }; if (fact) it.fact = fact; it.art = art(A[id]);
    const k = al.items.findIndex(x => x.id === id); if (k >= 0) al.items[k] = it; else al.items.push(it);
  });
  fs.writeFileSync(DIR + f, formatGroup(al));
  console.log(al.id, al.items.length);
}
