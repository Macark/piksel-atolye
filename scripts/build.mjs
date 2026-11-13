// Piksel Atölye derleme betiği.
// src/index.html içindeki her "<!-- @include yol -->" satırını o dosyanın içeriğiyle değiştirir
// ve sonucu tek dosya olarak dist/index.html'e yazar. Bağımlılık yok, sadece Node.
//
// Neden tek dosya: bütün JS parçaları tek bir <script> içinde birleşir, böylece
// fonksiyonlar ve global değişkenler eskisi gibi birbirini görür (sıra önemli!).
// Kullanım: node scripts/build.mjs [--watch]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'dist', 'index.html');
const INCLUDE = /^<!-- @include (\S+) -->$/;

export function build(){
  const used = [];
  const lines = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8').split('\n');
  const html = lines.map(l => {
    const m = INCLUDE.exec(l);
    if (!m) return l;
    used.push(m[1]);
    const body = fs.readFileSync(path.join(SRC, m[1]), 'utf8');
    if (!body.endsWith('\n')) throw new Error(m[1] + ' satır sonuyla bitmeli');
    return body.slice(0, -1);
  }).join('\n');
  // içerik verisi bozuksa oyun hiç açılmaz; derlerken yakala
  JSON.parse(fs.readFileSync(path.join(SRC, 'content', 'content.json'), 'utf8'));
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, html);
  return { out: OUT, files: used.length, bytes: Buffer.byteLength(html) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)){
  const run = () => { try { const r = build(); console.log(`dist/index.html hazır (${r.files} parça, ${(r.bytes / 1024).toFixed(0)} KB)`); } catch (e){ console.error('Derleme hatası:', e.message); if (!process.argv.includes('--watch')) process.exit(1); } };
  run();
  if (process.argv.includes('--watch')){
    let t = null;
    fs.watch(SRC, { recursive: true }, () => { clearTimeout(t); t = setTimeout(run, 80); });
    console.log('src/ izleniyor...');
  }
}
