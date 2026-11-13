const $ = s => document.querySelector(s);
const KEY = 'piksel-atolye-v1';
function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; } }
let DB = load(); DB.coins = DB.coins || 0; DB.tickets = DB.tickets || { istanbul:true }; DB.stamps = DB.stamps || {}; DB.ilDone = DB.ilDone || {}; DB.trOpen = DB.trOpen || {}; DB.gallery = DB.gallery || []; DB.done = DB.done || {}; DB.wip = DB.wip || {}; DB.muted = !!DB.muted; DB.stars = DB.stars || {}; DB.albumsDone = DB.albumsDone || {}; DB.neon = !!DB.neon; DB.frames = DB.frames || { polaroid:true }; DB.stats = DB.stats || { pics:Object.keys(DB.done || {}).length + (DB.gallery || []).length, cells:0, time:0, taps:0, wrong:0, daily:{}, bestStreak:0 };
let REAL_DB = null;
function save(){
  if (REAL_DB) return;
  for (let k = 0; k < 30; k++){
    try { localStorage.setItem(KEY, JSON.stringify(DB)); return; } catch(e){ if (!DB.gallery.length) return; DB.gallery.shift(); }
  }
}
function show(id){ document.querySelectorAll('.screen').forEach(s => s.classList.toggle('on', s.id === id)); if (typeof ambStart === 'function'){ if (id === 'paint'){ if (!ambNodes) ambStart(); } else ambStop(); } const nav = document.querySelector('#nav'); if (nav){ nav.hidden = !['home', 'map', 'coll', 'city'].includes(id); updateNav(id); } }
function msg(t){ $('#msgText').textContent = t; $('#msg').classList.add('on'); $('#msgOk').focus(); }
$('#msgOk').onclick = () => $('#msg').classList.remove('on');
function ask(text, yes, fn){ $('#askText').textContent = text; $('#askYes').textContent = yes; $('#askYes').onclick = () => { $('#ask').classList.remove('on'); fn(); }; $('#ask').classList.add('on'); $('#askYes').focus(); }
$('#askNo').onclick = () => $('#ask').classList.remove('on');

function rng(seed){ let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let z = s; z = Math.imul(z ^ (z >>> 15), z | 1); z ^= z + Math.imul(z ^ (z >>> 7), z | 61); return ((z ^ (z >>> 14)) >>> 0) / 4294967296; }; }
const hex = c => '#' + c.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
const unhex = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const lum = c => 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
function rdist(a, b){ const rm = (a[0] + b[0]) / 2, dr = a[0] - b[0], dg = a[1] - b[1], db = a[2] - b[2]; return (2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db; }

const TCOL = ['#E0763F','#2E7DBA','#8A4FB0','#2EB8B0','#E8558F'];

