// İçerik: src/content/ altındaki dosyaları tek içerik nesnesinde birleştirir ve denetler.
//
// src/content/
//   meta.json                sürüm
//   home.json                ana sayfa Köfte portresi
//   daily.json, sponsor.json, upcoming.json
//   albums/NN-<id>.json      her albüm ayrı dosya; NN sırayı belirler
//   cities/NN-<id>.json      Dünya Turu şehirleri
//   events/NN-<id>.json      etkinlikler
//   turkiye/bolgeler.json    7 bölge (renk, rehber)
//   turkiye/<bölge>.json     o bölgenin illeri; birleşince plaka sırasına dizilir
//   atolye.json              Köfte'nin Atölyesi: oda, yuvalar, eşyalar (tools/cizim/atolye-veri.mjs yazar)
//
// Kullanım: import { loadContent, checkContent, formatGroup } from './content.mjs'
// Tek başına: node scripts/content.mjs  → denetler, sonucu yazar.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const CONTENT_DIR = path.join(ROOT, 'src', 'content');

const readJSON = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e){ throw new Error(path.relative(ROOT, f) + ': ' + e.message); } };
const dirJSON = d => fs.existsSync(d) ? fs.readdirSync(d).filter(f => f.endsWith('.json')).sort().map(f => readJSON(path.join(d, f))) : [];

export function loadContent(dir = CONTENT_DIR){
  const meta = readJSON(path.join(dir, 'meta.json'));
  const regions = readJSON(path.join(dir, 'turkiye', 'bolgeler.json'));
  const iller = regions.flatMap(r => { const f = path.join(dir, 'turkiye', r.id + '.json'); return fs.existsSync(f) ? readJSON(f) : []; }).sort((a, b) => a.plaka - b.plaka);
  return {
    version: meta.version,
    albums: dirJSON(path.join(dir, 'albums')),
    cities: dirJSON(path.join(dir, 'cities')),
    events: dirJSON(path.join(dir, 'events')),
    daily: readJSON(path.join(dir, 'daily.json')),
    sponsor: readJSON(path.join(dir, 'sponsor.json')),
    upcoming: readJSON(path.join(dir, 'upcoming.json')),
    turkiye: { regions, iller },
    home: readJSON(path.join(dir, 'home.json')),
    stickers: fs.existsSync(path.join(dir, 'stickers.json')) ? readJSON(path.join(dir, 'stickers.json')) : [],
    atolye: fs.existsSync(path.join(dir, 'atolye.json')) ? readJSON(path.join(dir, 'atolye.json')) : null,
  };
}

// Okunur dosya biçimi: grup bilgisi üstte, her öğe tek satırda
export function formatGroup(o){
  if (Array.isArray(o)) return '[\n' + o.map(x => ' ' + JSON.stringify(x)).join(',\n') + '\n]\n';
  if (o && Array.isArray(o.items)){
    const { items, ...rest } = o, head = JSON.stringify(rest);
    return head.slice(0, -1) + (head.length > 2 ? ',' : '') + '"items":[\n' + items.map(x => ' ' + JSON.stringify(x)).join(',\n') + '\n]}\n';
  }
  return JSON.stringify(o) + '\n';
}

/* ---------- denetim ---------- */
const ALPH = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function checkArt(a, where, E, sizes){
  if (!a || typeof a !== 'object') return E.push(where + ': resim (art) yok');
  if (!sizes.includes(a.n)) E.push(`${where}: ızgara boyutu ${a.n} (izinli: ${sizes.join(', ')})`);
  if (!Array.isArray(a.pal) || !a.pal.length || a.pal.length > ALPH.length) return E.push(where + ': renk listesi (pal) hatalı');
  a.pal.forEach((c, i) => { if (!/^#[0-9a-fA-F]{6}$/.test(c)) E.push(`${where}: renk ${i} geçersiz (${c})`); });
  if (typeof a.px !== 'string') return E.push(where + ': piksel verisi (px) yok');
  let cells = 0, p = 0; const s = a.px;
  while (p < s.length){
    const v = ALPH.indexOf(s[p++]);
    if (v < 0) return E.push(`${where}: px içinde geçersiz harf "${s[p - 1]}"`);
    if (v >= a.pal.length) return E.push(`${where}: px "${s[p - 1]}" rengini kullanıyor ama pal'da ${a.pal.length} renk var`);
    let q = p; while (q < s.length && s.charCodeAt(q) >= 48 && s.charCodeAt(q) <= 57) q++;
    cells += q > p ? +s.slice(p, q) : 1; p = q;
  }
  if (cells !== a.n * a.n) E.push(`${where}: px ${cells} kare, olması gereken ${a.n * a.n}`);
}
function checkQuiz(q, where, E){
  if (!Array.isArray(q) || q.length !== 4 || q.some(x => typeof x !== 'string' || !x.trim())) return E.push(where + ': soru [soru, doğru, yanlış, yanlış] olmalı');
  if (new Set(q.slice(1)).size !== 3) E.push(where + ': şıklar birbirinden farklı olmalı');
}

// Atölye çizimi: { w, h, rows, cols }, '.' saydam
function checkSprite(a, where, E){
  if (!a || !Array.isArray(a.rows) || !a.w || !a.h) return E.push(where + ': çizim yok ya da bozuk');
  if (a.rows.length !== a.h || a.rows.some(r => typeof r !== 'string' || r.length !== a.w)) return E.push(`${where}: ${a.w}×${a.h} olmalı`);
  new Set(a.rows.join('').replace(/\./g, '')).forEach(ch => { if (!a.cols || !/^#[0-9a-fA-F]{6}$/.test(a.cols[ch] || '')) E.push(`${where}: "${ch}" harfinin rengi yok`); });
}
// Rozet kimlikleri koddan okunur (ödül olarak bağlanabilsinler diye)
function badgeIds(){ try { const s = fs.readFileSync(path.join(ROOT, 'src', 'js', 'screens', 'badges.js'), 'utf8'); return new Set([...s.matchAll(/{ id:'([a-z0-9]+)', name:/g)].map(m => m[1])); } catch(e){ return new Set(); } }
function checkAtolye(c, E, regs){
  const A = c.atolye, w = 'atölye', ids = new Set(), slots = new Map((A.slots || []).map(s => [s.id, s])), badges = badgeIds();
  if (!slots.size) return E.push(w + ': yuva listesi yok');
  // Köfte'nin hareketleri: her hareketin en az şu kadar karesi olmalı, kareler aynı boyda
  const MOVES = { sit:3, walk:4, lie:2, sleep:2, eat:2, yawn:3, happy:3, sad:2, carry:2 };
  Object.entries(MOVES).forEach(([m, n]) => {
    const fr = A.kofte && A.kofte[m];
    if (!Array.isArray(fr) || fr.length < n) return E.push(`${w} Köfte: "${m}" hareketinde en az ${n} kare olmalı`);
    fr.forEach((f, i) => { checkSprite(f, `${w} Köfte ${m} #${i + 1}`, E); if (f && (f.w !== fr[0].w || f.h !== fr[0].h)) E.push(`${w} Köfte ${m} #${i + 1}: kare boyu farklı`); });
  });
  checkSprite(A.chair && A.chair.art, w + ' koltuk', E);
  ['koltuk', 'zemin', 'kap', 'yatak'].forEach(k => { if (!A.spots || !Array.isArray(A.spots[k])) E.push(`${w}: Köfte'nin "${k}" noktası yok`); });
  if (!A.lights || !A.lights.tavan) E.push(w + ': tavan ışığı yok');
  Object.keys(A.lights || {}).forEach(k => { if (k !== 'tavan' && !A.items.some(it => it.id === k)) E.push(`${w}: ışık "${k}" olmayan bir eşyaya bağlı`); });
  (A.items || []).forEach((it, k) => {
    const iw = `${w} › ${it.id || '#' + k}`;
    if (!it.id) E.push(iw + ': kimlik yok'); else if (ids.has(it.id)) E.push(iw + ': kimlik çakışıyor'); ids.add(it.id);
    if (!it.name) E.push(iw + ': ad yok');
    const s = slots.get(it.slot); if (!s) E.push(`${iw}: yuva "${it.slot}" yok`);
    checkSprite(it.art, iw, E);
    if (s && it.art && !s.tile && (it.art.w > s.w || it.art.h > s.h)) E.push(`${iw}: çizim yuvadan büyük (${it.art.w}×${it.art.h} > ${s.w}×${s.h})`);
    const ways = [it.start, it.price, it.reward].filter(Boolean).length;
    if (ways !== 1) E.push(iw + ': ya başlangıç, ya fiyat ya da ödül olmalı (yalnız biri)');
    if (it.price !== undefined && !(it.price > 0)) E.push(iw + ': fiyat geçersiz');
    if (it.reward){
      const r = it.reward;
      if (r.type === 'region'){ if (!regs.has(r.id)) E.push(`${iw}: ödül bölgesi "${r.id}" yok`); }
      else if (r.type === 'badge'){ if (!badges.has(r.id)) E.push(`${iw}: ödül rozeti "${r.id}" yok`); }
      else if (r.type === 'album'){ if (!c.albums.some(a => a.id === r.id)) E.push(`${iw}: ödül albümü "${r.id}" yok`); }
      else E.push(`${iw}: ödül türü "${r.type}" bilinmiyor`);
    }
  });
  slots.forEach((s, id) => {
    if (!A.items.some(it => it.slot === id && it.start)) E.push(`${w}: "${id}" yuvasında başlangıç eşyası yok`);
    const d = A.defaults && A.defaults[id], di = A.items.find(it => it.id === d);
    if (!di || di.slot !== id || !di.start) E.push(`${w}: "${id}" yuvasının varsayılanı başlangıç eşyası olmalı`);
  });
}

export function checkContent(c){
  const E = [], W = [], ids = new Map();
  const useId = (id, where) => { if (!id || typeof id !== 'string') return E.push(where + ': kimlik (id) yok'); if (ids.has(id)) E.push(`${where}: kimlik "${id}" ${ids.get(id)} ile çakışıyor`); else ids.set(id, where); };
  const groupIds = new Set();
  const group = (g, kind, opt = {}) => {
    const gw = `${kind} ${g.id}`;
    if (groupIds.has(kind + g.id)) E.push(gw + ': aynı kimlikte iki grup'); groupIds.add(kind + g.id);
    if (!Array.isArray(g.items)) return E.push(gw + ': items yok');
    g.items.forEach((it, k) => {
      const w = `${gw} › ${it.id || '#' + k}`;
      useId(it.id, w);
      if (!it.name) E.push(w + ': ad (name) yok');
      checkArt(it.art, w, E, [16, 24, 32, 40, 48, 64]);
      if (it.quiz) checkQuiz(it.quiz, w, E);
      if (it.quiz_en && (!Array.isArray(it.quiz_en) || it.quiz_en.length !== 4)) E.push(w + ': quiz_en 4 parça olmalı');
      if (it.fact !== undefined && (typeof it.fact !== 'string' || !it.fact.trim())) E.push(w + ': fact boş');
      if (it.souvenir){ if (!it.souvenir.name) E.push(w + ': hatıra adı yok'); checkArt(it.souvenir.art, w + ' (hatıra)', E, [16]); }
      if (opt.tour){ if (!it.fact) E.push(w + ': tur resminde rehber bilgisi (fact) gerekli'); if (!it.quiz) E.push(w + ': tur resminde soru (quiz) gerekli'); if (!it.souvenir) E.push(w + ': tur resminde hatıra (souvenir) gerekli'); }
    });
  };
  c.albums.forEach(a => { group(a, 'albüm'); if (!a.color) W.push(`albüm ${a.id}: renk (color) yok`); });
  c.cities.forEach(ct => { group(ct, 'şehir', { tour:true }); if (!ct.guide || !ct.guide.name) E.push(`şehir ${ct.id}: rehber yok`); else checkArt(ct.guide.art, `şehir ${ct.id} rehber portresi`, E, [16, 24, 32]); if (!ct.map) E.push(`şehir ${ct.id}: harita konumu (map) yok`); });
  const md = v => Array.isArray(v) && v.length === 2 && v[0] >= 1 && v[0] <= 12 && v[1] >= 1 && v[1] <= 31;
  c.events.forEach(e => { group(e, 'etkinlik'); if (!md(e.start) || !md(e.end)) E.push(`etkinlik ${e.id}: tarih [ay, gün] biçiminde olmalı`); });
  group(c.daily, 'günlük'); group(c.sponsor, 'sponsor');
  checkArt(c.home, 'ana sayfa portresi', E, [32, 40, 48, 64]);

  // Stickerlar: 16x16 satır dizisi, '.' saydam, her harfin rengi cols'ta
  const stIds = new Set(['kalp', 'yildiz', 'tac', 'pati']); // koddaki eski stickerlar
  (c.stickers || []).forEach((s, k) => {
    const w = `sticker ${s.id || '#' + k}`;
    if (!s.id || stIds.has(s.id)) E.push(w + ': kimlik yok ya da çakışıyor'); stIds.add(s.id);
    if (!s.name) E.push(w + ': ad yok');
    if (!Array.isArray(s.rows) || s.rows.length !== 16 || s.rows.some(r => typeof r !== 'string' || r.length !== 16)) return E.push(w + ': 16 satır × 16 karakter olmalı');
    const used = new Set(s.rows.join('').replace(/\./g, ''));
    used.forEach(ch => { if (!s.cols || !/^#[0-9a-fA-F]{6}$/.test(s.cols[ch] || '')) E.push(`${w}: "${ch}" harfinin rengi yok`); });
  });

  // Türkiye Turu
  const T = c.turkiye, regs = new Set(T.regions.map(r => r.id));
  T.regions.forEach(r => { if (r.guide && r.guide.art) checkArt(r.guide.art, `bölge ${r.id} rehber portresi`, E, [16, 24, 32]); });
  if (T.iller.length !== 81) E.push(`Türkiye: ${T.iller.length} il var, 81 olmalı`);
  const byPl = new Map(T.iller.map(i => [i.plaka, i]));
  T.iller.forEach(i => {
    const w = `il ${i.id} (${i.name})`;
    if (i.id !== 'il' + String(i.plaka).padStart(2, '0')) E.push(w + ': kimlik plakayla uyuşmuyor');
    if (!regs.has(i.region)) E.push(w + ': bölge "' + i.region + '" yok');
    if (!Array.isArray(i.geo) || i.geo.length !== 2) E.push(w + ': konum (geo) yok');
    if (i.nb){
      i.nb.forEach(p => { if (p === i.plaka || !byPl.has(p)) E.push(`${w}: komşu listesinde geçersiz plaka ${p}`); else { const o = byPl.get(p); if (o.nb && !o.nb.includes(i.plaka)) E.push(`${w}: ${o.name} komşu diyor ama ${o.name} listesinde ${i.name} yok`); } });
    }
    if (i.items && i.items.length){
      group(i, 'il', { tour:true });
      if (!i.nb) E.push(w + ': açık ilde gerçek komşu listesi (nb) gerekli');
      if (!i.line) E.push(w + ': rehber sözü (line) yok');
      if (!i.bye) E.push(w + ': veda sözü (bye) yok');
    }
  });
  // Köfte'nin Atölyesi
  if (c.atolye) checkAtolye(c, E, regs);
  return { errors:E, warnings:W, items:ids.size };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)){
  const c = loadContent(), r = checkContent(c);
  r.warnings.forEach(w => console.log('uyarı:', w));
  r.errors.forEach(e => console.log('HATA:', e));
  console.log(`${r.items} resim denetlendi: ${r.errors.length} hata, ${r.warnings.length} uyarı`);
  process.exit(r.errors.length ? 1 : 0);
}
