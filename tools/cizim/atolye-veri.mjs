// Köfte'nin Atölyesi verisini yazar: src/content/atolye.json
// node atolye-veri.mjs  (tekrar çalıştırılırsa dosyayı yeniden yazar)
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { I, KOFTE } from './atolye.mjs';
const OUT = fileURLToPath(new URL('../../src/content/atolye.json', import.meta.url));

// Oda 160×120 piksel. Yuva: kimlik, ad, konum (x, y), boyut (w, h); "tile": desen olarak döşenir.
export const ROOM = { w:160, h:120, wallH:78 };
export const SLOTS = [
  { id:'duvar', name:'Duvar kâğıdı', x:0, y:0, w:160, h:78, tile:true },
  { id:'zemin', name:'Zemin', x:0, y:78, w:160, h:42, tile:true },
  { id:'pencere', name:'Pencere', x:62, y:18, w:36, h:28 },
  { id:'tavan', name:'Tavan lambası', x:72, y:0, w:16, h:16 },
  { id:'kose', name:'Köşe', x:2, y:50, w:20, h:44 },
  { id:'masa', name:'Masa', x:24, y:66, w:40, h:26 },
  { id:'masaustu', name:'Masa üstü', x:36, y:51, w:16, h:16 },
  { id:'hali', name:'Halı', x:44, y:96, w:72, h:18 },
  { id:'yatak', name:'Köfte’nin yeri', x:92, y:66, w:40, h:38 },
  { id:'mama', name:'Mama kabı', x:140, y:104, w:16, h:10 },
  { id:'oyuncak', name:'Oyuncak', x:24, y:104, w:14, h:12 },
];
// Çerçeveler (iç 16×16, 1 piksel kenar) ve raf (3 hatıra yeri)
export const FRAMES = [[10, 14], [34, 24], [108, 14], [132, 24]];
export const SHELF = { x:102, y:64, w:54, spots:[[104, 48], [122, 48], [140, 48]] };

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
  ['yatak_koltuk', 'yatak', 'Köfte’nin koltuğu', 0, { kofte:[98, 76] }],
  ['yatak_kutu', 'yatak', 'Karton kutu', 0, { kofte:[98, 76] }],
  ['yatak_yumusak', 'yatak', 'Yumuşak kedi yatağı', 300, { kofte:[98, 76] }],
  ['yatak_kedievi', 'yatak', 'Kedi evi', 900, { stars:60, kofte:[106, 76] }],
  ['mama_basit', 'mama', 'Mama kabı', 0],
  ['mama_balik', 'mama', 'Balıklı mama kabı', 70],
  ['oy_yumak', 'oyuncak', 'Yün yumağı', 0],
  ['oy_fare', 'oyuncak', 'Oyuncak fare', 50],
  ['oy_tuy', 'oyuncak', 'Tüylü oyuncak', 120],
];
const DEFAULT = { duvar:'duvar_krem', zemin:'zemin_parke', pencere:'pen_sehir', tavan:'tavan_ampul', kose:'kose_saksi', masa:'masa_calisma', masaustu:'mu_firca', hali:'hali_hasir', yatak:'yatak_koltuk', mama:'mama_basit', oyuncak:'oy_yumak' };

export function data(){
  const items = ITEMS.map(([id, slot, name, p, ex = {}]) => {
    if (!I[id]) throw new Error('çizim yok: ' + id);
    const o = { id, slot, name };
    if (typeof p === 'number'){ if (p === 0) o.start = true; else o.price = p; } else o.reward = p;
    Object.assign(o, ex);
    o.art = I[id]();
    return o;
  });
  return { room:ROOM, slots:SLOTS, frames:FRAMES, shelf:SHELF, defaults:DEFAULT, kofte:KOFTE, items };
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
