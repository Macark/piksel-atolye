// Geliştirme sunucusu: src/ değişince yeniden derler, dist/ klasörünü http://localhost:5173 adresinde sunar.
// Kullanım: node scripts/serve.mjs   (ya da: npm run dev)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PORT = +process.env.PORT || 5173;
const TYPES = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.webmanifest':'application/manifest+json','.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2' };

const rebuild = () => { try { build(); console.log(new Date().toLocaleTimeString('tr-TR'), 'derlendi'); } catch (e){ console.error('Derleme hatası:', e.message); } };
rebuild();
let t = null;
fs.watch(path.join(ROOT, 'src'), { recursive: true }, () => { clearTimeout(t); t = setTimeout(rebuild, 80); });

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(DIST, path.normalize(p));
  if (!f.startsWith(DIST)) { res.writeHead(403).end(); return; }
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404).end('yok'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Piksel Atölye: http://localhost:${PORT}`));
