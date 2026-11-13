/* ---------- ambience ---------- */
const AMB = { muzik:'Sakin melodi', dingin:'Dingin tını', yagmur:'Yağmur', deniz:'Deniz', off:'Kapalı' };
let ambNodes = null, ambTimer = 0;
function noiseBuf(a){ const len = a.sampleRate * 2, b = a.createBuffer(1, len, a.sampleRate), d = b.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; return b; }
function ambStop(){
  clearInterval(ambTimer); ambTimer = 0;
  if (ambNodes && AC){ const n = ambNodes; try { n.out.gain.setTargetAtTime(0, AC.currentTime, 0.25); } catch(e){} setTimeout(() => { try { n.stop.forEach(x => x.stop()); n.out.disconnect(); } catch(e){} }, 1200); }
  ambNodes = null;
}
function ambStart(){
  const kind = DB.amb || 'muzik'; ambStop(); if (kind === 'off') return;
  const a = ac(); if (!a) return;
  const out = a.createGain(); out.gain.value = 0; out.connect(a.destination); out.gain.setTargetAtTime(1, a.currentTime, 1.2);
  const nodes = { out, stop:[] };
  if (kind === 'yagmur' || kind === 'deniz'){
    const src = a.createBufferSource(); src.buffer = noiseBuf(a); src.loop = true;
    const f = a.createBiquadFilter(), gg = a.createGain();
    if (kind === 'yagmur'){ f.type = 'bandpass'; f.frequency.value = 1100; f.Q.value = 0.6; gg.gain.value = 0.04; } else { f.type = 'lowpass'; f.frequency.value = 550; gg.gain.value = 0.08; }
    src.connect(f); f.connect(gg); gg.connect(out); src.start(); nodes.stop.push(src);
    if (kind === 'deniz'){ const l = a.createOscillator(), lg = a.createGain(); l.frequency.value = 0.09; lg.gain.value = 0.06; l.connect(lg); lg.connect(gg.gain); l.start(); nodes.stop.push(l); }
    else ambTimer = setInterval(() => { if (Math.random() < 0.55){ const t = a.currentTime + Math.random() * 0.15, o = a.createOscillator(), og = a.createGain(); o.frequency.setValueAtTime(900 + Math.random() * 1300, t); o.frequency.exponentialRampToValueAtTime(400, t + 0.05); og.gain.setValueAtTime(0.006, t); og.gain.exponentialRampToValueAtTime(0.0004, t + 0.06); o.connect(og); og.connect(out); o.start(t); o.stop(t + 0.08); } }, 120);
  } else {
    const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1700; lp.Q.value = 0.3; lp.connect(out);
    const dl = a.createDelay(2), fb = a.createGain(), wet = a.createGain(), df = a.createBiquadFilter();
    dl.delayTime.value = 0.52; fb.gain.value = 0.36; wet.gain.value = 0.3; df.type = 'lowpass'; df.frequency.value = 1300;
    dl.connect(df); df.connect(fb); fb.connect(dl); df.connect(wet); wet.connect(lp);
    const mf = m => 440 * Math.pow(2, (m - 69) / 12);
    const pad = (m, t, len, vol, type, det) => { const o = a.createOscillator(), gg = a.createGain(); o.type = type; o.frequency.value = mf(m); o.detune.value = det; gg.gain.setValueAtTime(0.0001, t); gg.gain.linearRampToValueAtTime(vol, t + 2.6); gg.gain.setValueAtTime(vol, t + len - 1); gg.gain.exponentialRampToValueAtTime(0.0001, t + len + 3); o.connect(gg); gg.connect(lp); gg.connect(dl); o.start(t); o.stop(t + len + 3.2); };
    const bell = (m, t, vol) => [[1, vol], [2, vol * 0.16], [3, vol * 0.05]].forEach(([h, v]) => { const o = a.createOscillator(), gg = a.createGain(); o.type = 'sine'; o.frequency.value = mf(m) * h; gg.gain.setValueAtTime(0.0001, t); gg.gain.linearRampToValueAtTime(v, t + 0.015); gg.gain.exponentialRampToValueAtTime(0.0001, t + 2.8 / h); o.connect(gg); gg.connect(lp); gg.connect(dl); o.start(t); o.stop(t + 3); });
    const CH = [[36, 55, 59, 64], [33, 52, 55, 60], [29, 53, 57, 64], [31, 50, 55, 59]], MEL = [67, 69, 72, 74, 76, 79, 81, 84], BAR = 9;
    let ci = 0, mi = 3, nextC = a.currentTime + 0.2, nextM = a.currentTime + 3;
    ambTimer = setInterval(() => {
      const tt = a.currentTime;
      while (nextC < tt + 0.8){ const ch = CH[ci % CH.length]; pad(ch[0], nextC, BAR, 0.045, 'sine', 0); ch.slice(1).forEach((m, k) => { pad(m, nextC + k * 0.2, BAR, 0.013, 'sine', -5); pad(m, nextC + k * 0.2, BAR, 0.006, 'triangle', 6); }); ci++; nextC += BAR; }
      while (kind === 'muzik' && nextM < tt + 0.8){
        if (Math.random() < 0.65){ mi = Math.max(0, Math.min(MEL.length - 1, mi + [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)])); bell(MEL[mi], nextM, 0.026); if (Math.random() < 0.2) bell(MEL[Math.max(0, mi - 2)], nextM + 0.4, 0.015); }
        nextM += [1.4, 1.8, 2.6, 3.4][Math.floor(Math.random() * 4)];
      }
    }, 250);
  }
  ambNodes = nodes;
}
const CBSYM = ['●', '■', '▲', '◆', '✚', '★', '♥', '▼', '◀', '▶', '✖', '☾', '✿', '♠', '♣', '♪'];

