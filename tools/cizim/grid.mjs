// Izgara üzerinde doğrudan piksel çizimi. Renkler hex; sonuç { n, pal, px }.
import { encode } from './pix.mjs';
export function G(n, bg){
  const g = new Array(n * n).fill(bg);
  const inb = (x, y) => x >= 0 && y >= 0 && x < n && y < n;
  const api = {
    n, g,
    px(x, y, c){ x = Math.round(x); y = Math.round(y); if (inb(x, y)) g[y * n + x] = c; return api; },
    get(x, y){ return inb(x, y) ? g[y * n + x] : null; },
    rect(x, y, w, h, c){ for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) api.px(i, j, c); return api; },
    ell(cx, cy, rx, ry, c, test){ for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){ const dx = (x + .5 - cx) / rx, dy = (y + .5 - cy) / ry; if (dx * dx + dy * dy <= 1 && (!test || test(x, y, dx, dy))) g[y * n + x] = c; } return api; },
    poly(pts, c){ for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){ let ins = false; const px = x + .5, py = y + .5; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++){ const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) ins = !ins; } if (ins) g[y * n + x] = c; } return api; },
    line(x0, y0, x1, y1, c){ x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1); const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let e = dx + dy; for (;;){ api.px(x0, y0, c); if (x0 === x1 && y0 === y1) break; const e2 = 2 * e; if (e2 >= dy){ e += dy; x0 += sx; } if (e2 <= dx){ e += dx; y0 += sy; } } return api; },
    // c1 rengindeki pikselleri c2 yap (bölge sınırlı)
    swap(c1, c2, f = () => true){ for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (g[y * n + x] === c1 && f(x, y)) g[y * n + x] = c2; return api; },
    // pikselli metin yok; harita çizimi: satır dizileri + renk eşlemi
    map(x0, y0, rows, cmap){ rows.forEach((r, j) => [...r].forEach((ch, i) => { if (cmap[ch]) api.px(x0 + i, y0 + j, cmap[ch]); })); return api; },
    done(){
      const cnt = new Map(); g.forEach(c => cnt.set(c, (cnt.get(c) || 0) + 1));
      const pal = [...cnt.keys()].sort((a, b) => cnt.get(b) - cnt.get(a)); // en çok kullanılan önce
      const idx = g.map(c => pal.indexOf(c));
      return { n, pal, px: encode(idx), idx };
    },
  };
  return api;
}
