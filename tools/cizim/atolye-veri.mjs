// Köfte'nin Atölyesi verisini yazar: src/content/atolye.json
// node atolye-veri.mjs  (tekrar çalıştırılırsa dosyayı yeniden yazar)
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { I, koltuk, kofteFrames } from './atolye.mjs';
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
];
// Çerçeveler (iç 22×22, 2 piksel kenar), raf (3 hatıra yeri), sabit hasır koltuk
export const FRAMES = [[14, 22], [52, 36], [164, 22], [204, 36]];
export const SHELF = { x:160, y:86, w:72, spots:[[166, 70], [190, 70], [214, 70]] };
export const CHAIR = { x:166, y:98 };
// Köfte'nin duracağı yerler (40×36 çizimin sol üstü) ve geceleri yanan ışıklar
export const SPOTS = { koltuk:[178, 104], zemin:[60, 130, 196], kap:[160, 139], yatak:[10, 136] };
export const LIGHTS = { tavan:[120, 18, 90], kose_ayaklilamba:[17, 82, 60], mu_lamba:[64, 84, 48] };

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
];
const DEFAULT = { duvar:'duvar_krem', zemin:'zemin_parke', pencere:'pen_sehir', tavan:'tavan_ampul', kose:'kose_saksi', masa:'masa_calisma', masaustu:'mu_firca', hali:'hali_hasir', yatak:'yatak_kutu', mama:'mama_basit', oyuncak:'oy_yumak' };

export function data(){
  const items = ITEMS.map(([id, slot, name, p, ex = {}]) => {
    if (!I[id]) throw new Error('çizim yok: ' + id);
    const o = { id, slot, name };
    if (typeof p === 'number'){ if (p === 0) o.start = true; else o.price = p; } else o.reward = p;
    Object.assign(o, ex);
    o.art = I[id]();
    return o;
  });
  return { room:ROOM, slots:SLOTS, frames:FRAMES, shelf:SHELF, chair:{ ...CHAIR, art:koltuk() }, spots:SPOTS, lights:LIGHTS, defaults:DEFAULT, kofte:kofteFrames(), items };
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
