/* sound */
let AC = null;
function ac(){
  if (DB.muted) return null;
  if (!AC){ try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){ return null; } }
  if (AC.state === 'suspended') AC.resume();
  return AC;
}
function tone(f, dur, delay = 0, type = 'square', vol = 0.05){
  const a = ac(); if (!a) return;
  const t0 = a.currentTime + delay, o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t0);
  g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
  o.connect(g); g.connect(a.destination); o.start(t0); o.stop(t0 + dur + 0.02);
}
const SCALE = [0, 2, 4, 7, 9];
function note(k, vol = 0.05, delay = 0){ const st = Math.min(k, 19), f = 392 * Math.pow(2, (Math.floor(st / 5) * 12 + SCALE[st % 5]) / 12); tone(f, 0.09, delay, 'triangle', vol); tone(f * 2, 0.03, delay, 'square', vol * 0.25); }
function setMute(){ if (typeof ambStop === 'function'){ if (DB.muted) ambStop(); else if ($('#paint').classList.contains('on') && !ambNodes) ambStart(); } $('#sndWaves').style.display = DB.muted ? 'none' : ''; $('#sndBtn').setAttribute('aria-label', DB.muted ? 'Sesi aç' : 'Sesi kapat'); }
$('#sndBtn').onclick = () => { DB.muted = !DB.muted; save(); setMute(); };

