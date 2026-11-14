// Köfte'nin Atölyesi verisini yazar: src/content/atolye.json
// node atolye-veri.mjs  (tekrar çalıştırılırsa dosyayı yeniden yazar)
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { I as I1, koltuk, kofteFrames } from './atolye.mjs';
import { I2, KIY, FX } from './atolye-2.mjs';
const I = { ...I1, ...I2 };
const OUT = fileURLToPath(new URL('../../src/content/atolye.json', import.meta.url));

// Oda 240×180 piksel. Yuva: kimlik, ad, konum (x, y), boyut (w, h); "tile": desen olarak döşenir.
// Eşya yuvanın altına ve ortasına hizalanır.
export const ROOM = { w:240, h:180, wallH:117 };
export const SLOTS = [
  { id:'duvar', name:'Duvar kâğıdı', x:0, y:0, w:240, h:117, tile:true },
  { id:'zemin', name:'Zemin', x:0, y:117, w:240, h:63, tile:true },
  { id:'pencere', name:'Pencere', x:90, y:24, w:60, h:44 },
  { id:'tavan', name:'Tavan lambası', x:108, y:0, w:24, h:24 },
  { id:'kose', name:'Köşe', x:2, y:72, w:30, h:66 },
  { id:'masa', name:'Masa', x:34, y:99, w:60, h:39 },
  { id:'masaustu', name:'Masa üstü', x:52, y:75, w:24, h:24 },
  { id:'hali', name:'Halı', x:66, y:146, w:108, h:27 },
  { id:'yatak', name:'Köfte’nin yatağı', x:4, y:138, w:52, h:40 },
  { id:'mama', name:'Mama kabı', x:196, y:160, w:24, h:15 },
  { id:'oyuncak', name:'Oyuncak', x:60, y:160, w:21, h:18 },
  { id:'su', name:'Su kabı', x:174, y:162, w:20, h:13 },
  { id:'aski', name:'Tasma askısı', x:4, y:49, w:26, h:20 },
  { id:'somine', name:'Şömine', x:98, y:77, w:56, h:40 },
  { id:'sus', name:'Süs', x:86, y:12, w:68, h:10 },
];
// Çerçeveler (iç 22×22, 2 piksel kenar), raf (3 hatıra yeri), sabit hasır koltuk
export const FRAMES = [[14, 22], [52, 36], [164, 22], [204, 36]];
export const SHELF = { x:160, y:86, w:72, spots:[[166, 70], [190, 70], [214, 70]] };
export const CHAIR = { x:156, y:94 };
// Köfte'nin duracağı yerler (40×36 çizimin sol üstü) ve geceleri yanan ışıklar
export const SPOTS = { koltuk:[168, 106], yayil:[166, 97], zemin:[60, 130, 196], kap:[160, 139], yatak:[10, 136] };
export const LIGHTS = { tavan:[120, 18, 90], kose_ayaklilamba:[17, 82, 60], mu_lamba:[64, 84, 48], somine:[126, 106, 64] };

// [kimlik, yuva, ad, fiyat | ödül, ek]  ödül: { type:'region'|'badge', id }
const ITEMS = [
  ['duvar_krem', 'duvar', 'Krem duvar', 0],
  ['duvar_cizgili', 'duvar', 'Çizgili duvar', 60],
  ['duvar_puanli', 'duvar', 'Puantiyeli duvar', 80],
  ['duvar_cini', 'duvar', 'İznik çini duvar', { type:'region', id:'marmara' }],
  ['zemin_parke', 'zemin', 'Tahta parke', 0],
  ['zemin_dama', 'zemin', 'Dama karo', 200],
  ['zemin_tas', 'zemin', 'Taş zemin', 250],
  ['pen_sehir', 'pencere', 'Şehir manzarası', 0],
  ['pen_gece', 'pencere', 'Gece manzarası', 500],
  ['pen_deniz', 'pencere', 'Deniz manzarası', { type:'region', id:'akdeniz' }],
  ['pen_balon', 'pencere', 'Kapadokya balonları', { type:'region', id:'icanadolu' }],
  ['pen_karlidag', 'pencere', 'Karlı dağ manzarası', { type:'region', id:'dogu' }],
  ['tavan_ampul', 'tavan', 'Ampul', 0],
  ['tavan_avize', 'tavan', 'Yıldız avize', { type:'badge', id:'album' }],
  ['masa_calisma', 'masa', 'Çalışma masası', 0],
  ['masa_sandik', 'masa', 'Ahşap sandık', 150],
  ['mu_firca', 'masaustu', 'Fırça kupası', 0],
  ['mu_sukulent', 'masaustu', 'Sukulent saksı', 40],
  ['mu_lamba', 'masaustu', 'Masa lambası', 50],
  ['mu_cayseti', 'masaustu', 'İnce belli çay seti', { type:'region', id:'karadeniz' }],
  ['mu_yerkure', 'masaustu', 'Yerküre', { type:'badge', id:'gezgin' }],
  ['mu_altinfirca', 'masaustu', 'Altın fırça kupası', { type:'badge', id:'seri7' }],
  ['kose_saksi', 'kose', 'Saksı çiçeği', 0],
  ['kose_ayaklilamba', 'kose', 'Ayaklı lamba', 200],
  ['kose_sovale', 'kose', 'Şövale', 250],
  ['kose_kitaplik', 'kose', 'Kitaplık', 600, { stars:30 }],
  ['kose_zeytin', 'kose', 'Zeytin ağacı', { type:'region', id:'ege' }],
  ['hali_hasir', 'hali', 'Hasır halı', 0],
  ['hali_yuvarlak', 'hali', 'Renkli halı', 180],
  ['hali_post', 'hali', 'Beyaz post halı', 180],
  ['hali_pati', 'hali', 'Pati halısı', 220],
  ['hali_kilim', 'hali', 'Kilim', { type:'region', id:'guneydogu' }],
  ['yatak_kutu', 'yatak', 'Karton kutu', 0],
  ['yatak_yumusak', 'yatak', 'Yumuşak kedi yatağı', 300],
  ['yatak_kedievi', 'yatak', 'Kedi evi', 900, { stars:60 }],
  ['mama_basit', 'mama', 'Mama kabı', 0],
  ['mama_balik', 'mama', 'Balıklı mama kabı', 70],
  ['oy_yumak', 'oyuncak', 'Yün yumağı', 0],
  ['oy_fare', 'oyuncak', 'Oyuncak fare', 50],
  ['oy_tuy', 'oyuncak', 'Tüylü oyuncak', 120],
  // 2. aşama
  ['oy_top', 'oyuncak', 'Top', 40],
  ['oy_ip', 'oyuncak', 'İp oyuncak', 60],
  ['oy_sepet', 'oyuncak', 'Oyuncak sepeti', { type:'dostluk', id:5 }],
  ['su_kabi', 'su', 'Su kabı', 0],
  ['su_seramik', 'su', 'Seramik su kabı', 90],
  ['aski_tasma', 'aski', 'Tasma askısı', 0],
  ['yatak_tunel', 'yatak', 'Tırmalama tüneli', 350],
  ['mu_plak', 'masaustu', 'Plak çalar', 300],
  ['mu_akvaryum', 'masaustu', 'Akvaryum', { type:'dostluk', id:8 }],
  ['hali_yolluk', 'hali', 'Kilim yolluk', 260],
  ['hali_kareli', 'hali', 'Kareli halı', 200],
  ['somine_bos', 'somine', 'Boş', 0, { art:'bos' }],
  ['somine', 'somine', 'Şömine', 800],
  ['sus_bos', 'sus', 'Süs yok', 0, { art:'bos' }],
  ['sus_celenk', 'sus', 'Kış çelengi', 150],
  ['sus_fener', 'sus', 'Bayram fenerleri', 150],
  ['sus_isik', 'sus', 'Yılbaşı ışıkları', { type:'event', id:'yilbasi' }],
];
const DEFAULT = { su:'su_kabi', aski:'aski_tasma', somine:'somine_bos', sus:'sus_bos', duvar:'duvar_krem', zemin:'zemin_parke', pencere:'pen_sehir', tavan:'tavan_ampul', kose:'kose_saksi', masa:'masa_calisma', masaustu:'mu_firca', hali:'hali_hasir', yatak:'yatak_kutu', mama:'mama_basit', oyuncak:'oy_yumak' };

// ===== Köfte'nin bakımı (Ali'nin onayladığı tablolar, 15 Kasım) =====
// Göstergeler 0-100; oyun kapalıyken de gerçek saate göre ilerler. Köfte hastalanmaz, kaçmaz, ceza yok.
export const BAKIM = {
  dusus:{ tok:3, mut:2 },                       // saatte düşüş
  offlineEnerji:10,                             // oyun kapalıyken saatte enerji artışı (dinlenmiş sayılır)
  uykuDolum:1,                                  // uyurken saniyede enerji artışı (ekran açıkken)
  esik:{ ac:30, kus:30, uyku:25, uyan:80 },
  baslangic:{ tok:80, mut:80, ener:80, mama:{ kuru:3 } },
  sevme:{ mut:2, gunluk:30 },
  top:{ mut:4, enerji:6 },
  resimMama:1,                                  // bitirilen her resim: +1 kuru mama
  mamalar:[
    { id:'kuru', name:'Kuru mama', price:10, tok:35, mut:3 },
    { id:'yas', name:'Yaş mama', price:25, tok:60, mut:8 },
    { id:'balik', name:'Balık', tok:50, mut:15, ozel:true },
    { id:'kofte', name:'Köfte!', tok:100, mut:25, ozel:true },
  ],
  dostluk:{ puan:{ besle:3, sev:1, top:2, resim:5, hediye:5 }, sinir:{ besle:6, sev:10, top:20, hediye:5 } },
  seviyeler:[
    { lv:1, puan:0 },
    { lv:2, puan:30, kiyafet:'tasma_kirmizi', mama:{ kofte:1 } },
    { lv:3, puan:80, hareket:'dans' },
    { lv:4, puan:150, kiyafet:'fular_mavi' },
    { lv:5, puan:240, esya:'oy_sepet', mama:{ kofte:1 } },
    { lv:6, puan:350, hareket:'yuvarlan' },
    { lv:7, puan:480, kiyafet:'bere_kirmizi' },
    { lv:8, puan:640, esya:'mu_akvaryum', mama:{ kofte:1 } },
    { lv:9, puan:830, kiyafet:'papyon' },
    { lv:10, puan:1050, kiyafet:'tac' },
  ],
  hediye:{ coin:[20, 60], oran:{ coin:0.5, kuru:0.35, balik:0.15 }, kuruAdet:2 },
};
export const KIYAFET = {
  tasma_kirmizi:{ name:'Kırmızı tasma', yer:'boyun' }, fular_mavi:{ name:'Mavi fular', yer:'boyun' }, papyon:{ name:'Papyon', yer:'boyun' },
  bere_kirmizi:{ name:'Kırmızı bere', yer:'bas' }, tac:{ name:'Taç', yer:'bas' },
};
// Kıyafetlerin Köfte çiziminde duracağı yer: n = boyun ortası, b = başın tepesi (her kare için ya da tek)
export const ANCHOR = {
  sit:{ n:[20, 22], b:[20, 4] }, yawn:{ n:[20, 22], b:[20, 4] }, sad:{ n:[20, 22], b:[20, 5] },
  happy:{ n:[[20, 24], [20, 18], [20, 22]], b:[[20, 6], [20, 0], [20, 4]] },
  lounge:{ n:[33, 22], b:[33, 4] }, walk:{ n:[27, 21], b:[31, 4] }, carry:{ n:[27, 21], b:[31, 4] },
  eat:{ n:[28, 32], b:[32, 16] }, lie:{ n:[27, 29], b:[31, 12] },
};

export function data(){
  const items = ITEMS.map(([id, slot, name, p, ex = {}]) => {
    const artKey = ex.art || id; if (!I[artKey]) throw new Error('çizim yok: ' + id);
    const o = { id, slot, name };
    if (typeof p === 'number'){ if (p === 0) o.start = true; else o.price = p; } else o.reward = p;
    const { art:_a, ...rest } = ex; Object.assign(o, rest);
    o.art = I[artKey]();
    return o;
  });
  return { bakim:BAKIM, kiyafet:Object.fromEntries(Object.entries(KIYAFET).map(([k, v]) => [k, { ...v, art:KIY[k]() }])), fx:Object.fromEntries(Object.entries(FX).map(([k, f]) => [k, f()])), anchor:ANCHOR, room:ROOM, slots:SLOTS, frames:FRAMES, shelf:SHELF, chair:{ ...CHAIR, art:koltuk() }, spots:SPOTS, lights:LIGHTS, defaults:DEFAULT, kofte:kofteFrames(), items };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1].replace(/\\/g, '/').replace(/^(?!\w:)/, '')){
  // (doğrudan çalıştırınca yaz)
}
const d = data();
if (process.argv.includes('--yaz')){
  const { items, ...rest } = d;
  fs.writeFileSync(OUT, JSON.stringify(rest).slice(0, -1) + ',"items":[\n' + items.map(x => ' ' + JSON.stringify(x)).join(',\n') + '\n]}\n');
  console.log('atolye.json:', items.length, 'eşya');
}
