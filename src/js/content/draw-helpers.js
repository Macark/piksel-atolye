/* ---------- drawing helpers for built-in pictures ---------- */
const TAU = Math.PI * 2;
function circ(g, x, y, r, c){ g.fillStyle = c; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); }
function ell(g, x, y, rx, ry, c, rot = 0){ g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, TAU); g.fill(); }
function rect(g, x, y, w, h, c){ g.fillStyle = c; g.fillRect(x, y, w, h); }
function poly(g, p, c){ g.fillStyle = c; g.beginPath(); g.moveTo(p[0], p[1]); for (let i = 2; i < p.length; i += 2) g.lineTo(p[i], p[i+1]); g.closePath(); g.fill(); }
function rr(g, x, y, w, h, r, c){ g.fillStyle = c; g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); g.fill(); }
function stars(g, list, c){ list.forEach(([x, y, r]) => circ(g, x, y, r, c)); }
function star(g, cx, cy, R, c, rot = -Math.PI / 2){ const p = []; for (let k = 0; k < 10; k++){ const a = rot + k * Math.PI / 5, rr0 = k % 2 ? R * 0.4 : R; p.push(cx + Math.cos(a) * rr0, cy + Math.sin(a) * rr0); } poly(g, p, c); }
function flagBase(g){ rect(g,0,0,512,512,'#CFE8F7'); rect(g,0,452,512,60,'#9CC98A'); rect(g,36,70,16,400,'#8A8F98'); circ(g,44,64,14,'#F2B33D'); }
function flagEdge(g, x, y, w, h){ g.strokeStyle = '#2A1D14'; g.lineWidth = 8; g.strokeRect(x, y, w, h); }
function pitch(g){ rect(g,0,0,512,512,'#3E9A5A'); for (let k = 0; k < 512; k += 64) rect(g,0,k,512,32,'#46A863'); g.strokeStyle = '#E8F5E8'; g.lineWidth = 8; g.beginPath(); g.arc(256,256,120,0,TAU); g.stroke(); rect(g,252,0,8,512,'#E8F5E8'); }
function jersey(g, fill, sleeve){
  const path = () => { g.beginPath(); g.moveTo(176,96); g.lineTo(216,80); g.quadraticCurveTo(256,120,296,80); g.lineTo(336,96); g.lineTo(420,150); g.lineTo(384,232); g.lineTo(346,214); g.lineTo(346,440); g.lineTo(166,440); g.lineTo(166,214); g.lineTo(128,232); g.lineTo(92,150); g.closePath(); };
  path(); g.fillStyle = sleeve; g.fill();
  g.save(); g.beginPath(); g.rect(166,80,180,360); g.clip(); path(); g.clip(); fill(166,80,180,360); g.restore();
  g.fillStyle = '#FFFFFF'; g.beginPath(); g.moveTo(216,80); g.quadraticCurveTo(256,120,296,80); g.lineTo(284,80); g.quadraticCurveTo(256,104,228,80); g.closePath(); g.fill();
  path(); g.strokeStyle = '#1B1B1B'; g.lineWidth = 8; g.stroke();
}

