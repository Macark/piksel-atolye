// Piksel Atölye derleme betiği.
// src/index.html içindeki her "<!-- @include yol -->" satırını o dosyanın içeriğiyle değiştirir
// ve sonucu tek dosya olarak dist/index.html'e yazar. Bağımlılık yok, sadece Node.
// "<!-- @content -->" satırına src/content/ dosyalarından birleştirilip denetlenen içerik gelir
// (scripts/content.mjs). İçerikte hata varsa derleme durur, bozuk içerik yayınlanmaz.
// src/public/ (simgeler, manifest) dist/ içine aynen kopyalanır.
//
// Neden tek dosya: bütün JS parçaları tek bir <script> içinde birleşir, böylece
// fonksiyonlar ve global değişkenler eskisi gibi birbirini görür (sıra önemli!).
// Kullanım: node scripts/build.mjs [--watch]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadContent, checkContent } from './content.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'dist', 'index.html');
const INCLUDE = /^<!-- @include (\S+) -->$/, CONTENT = '<!-- @content -->';

export function build(){
  const used = [];
  const content = loadContent(), chk = checkContent(content);
  if (chk.errors.length) throw new Error('İçerik hatası:\n  ' + chk.errors.join('\n  '));
  // JSON bir <script> içine gömülüyor: "</" dizisi script'i erken kapatmasın
  const contentJSON = JSON.stringify(content).replace(/<\//g, '<\\/');
  const lines = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8').split('\n');
  const html = lines.map(l => {
    if (l === CONTENT) return contentJSON;
    const m = INCLUDE.exec(l);
    if (!m) return l;
    used.push(m[1]);
    const body = fs.readFileSync(path.join(SRC, m[1]), 'utf8');
    if (!body.endsWith('\n')) throw new Error(m[1] + ' satır sonuyla bitmeli');
    return body.slice(0, -1);
  }).join('\n');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, html);
  // src/public/ altındaki sabit dosyalar (simgeler, manifest) olduğu gibi dist/'e kopyalanır
  const PUB = path.join(SRC, 'public');
  if (fs.existsSync(PUB)) fs.cpSync(PUB, path.dirname(OUT), { recursive: true });
  return { out: OUT, files: used.length, bytes: Buffer.byteLength(html), items: chk.items, warnings: chk.warnings };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)){
  const run = () => { try { const r = build(); r.warnings.forEach(w => console.log('uyarı:', w)); console.log(`dist/index.html hazır (${r.files} parça, ${r.items} resim, ${(r.bytes / 1024).toFixed(0)} KB)`); } catch (e){ console.error('Derleme hatası:', e.message); if (!process.argv.includes('--watch')) process.exit(1); } };
  run();
  if (process.argv.includes('--watch')){
    let t = null;
    fs.watch(SRC, { recursive: true }, () => { clearTimeout(t); t = setTimeout(run, 80); });
    console.log('src/ izleniyor...');
  }
}
