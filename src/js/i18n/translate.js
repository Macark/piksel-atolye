const CONTENT = JSON.parse(document.getElementById('pa-content').textContent);
(function regEn(o){
  if (Array.isArray(o)) return o.forEach(regEn);
  if (!o || typeof o !== 'object') return;
  for (const k in o){
    if (k.endsWith('_en')){ const tr = o[k.slice(0, -3)], en = o[k];
      if (Array.isArray(tr)) tr.forEach((t, i) => { if (typeof t === 'string' && typeof en[i] === 'string') EN.set(t, en[i]); });
      else if (typeof tr === 'string' && typeof en === 'string') EN.set(tr, en); }
    else if (k !== 'art') regEn(o[k]);
  }
})(CONTENT);
const EN_UP = new Map();
if (LANG === 'en') for (const [k, v] of EN) { const ku = k.toLocaleUpperCase('tr'); if (!EN.has(ku) && !EN_UP.has(ku)) EN_UP.set(ku, v.toLocaleUpperCase('en')); }
const TR_MEMO = new Map();
function trx(s){
  if (LANG !== 'en' || typeof s !== 'string' || !/[A-Za-zÇĞİÖŞÜçğıöşü]/.test(s)) return s;
  let r = TR_MEMO.get(s); if (r !== undefined) return r;
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s), core = m[2];
  let t = EN.get(core); if (t === undefined) t = EN_UP.get(core);
  if (t === undefined) for (const [rx, f] of EN_RX) if (rx.test(core)) { t = core.replace(rx, f); break; }
  r = t === undefined ? s : m[1] + t + m[3];
  if (TR_MEMO.size < 4000) TR_MEMO.set(s, r);
  return r;
}
const pct = n => LANG === 'en' ? n + '%' : '%' + n;
function TL(tpl, ...a){
  let t = tpl; if (LANG === 'en'){ const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(tpl), e = EN.get(m[2]); if (e !== undefined) t = m[1] + e + m[3]; }
  return t.replace(/\{(\d)(?:\|([^|}]*)\|([^}]*))?\}/g, (_, i, one, many) => { const v = a[+i]; if (one !== undefined) return Number(v) === 1 ? one : many; return typeof v === 'string' ? trx(v) : v; });
}
if (LANG === 'en'){
  document.documentElement.lang = 'en';
  const ATTRS = ['aria-label', 'alt', 'title', 'placeholder'];
  const one = n => {
    if (n.nodeType === 3){ const p = n.parentNode; if (p && (p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE')) return; const v = n.data, t = trx(v); if (t !== v) n.data = t; }
    else if (n.nodeType === 1) for (const a of ATTRS){ const v = n.getAttribute(a); if (v){ const t = trx(v); if (t !== v) n.setAttribute(a, t); } }
  };
  const tree = root => { one(root); if (root.nodeType !== 1) return; const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT); let c; while ((c = w.nextNode())) one(c); };
  document.title = trx(document.title);
  tree(document.body);
  new MutationObserver(ms => { for (const m of ms){ if (m.type === 'childList') m.addedNodes.forEach(tree); else one(m.target); } })
    .observe(document.body, { subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:ATTRS });
  const P = CanvasRenderingContext2D.prototype;
  for (const f of ['fillText', 'strokeText', 'measureText']){ const o = P[f]; P[f] = function(t, ...r){ return o.call(this, typeof t === 'string' ? trx(t) : t, ...r); }; }
}

