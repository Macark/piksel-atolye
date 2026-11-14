/* ---------- yüz takibi ----------
   MediaPipe Face Landmarker (Google, ücretsiz, Apache 2.0): yüzde 478 nokta bulur.
   Kütüphane oyunla gelmez; kamera ya da aksesuar ilk kez kullanılınca bir kez iner (~11 MB motor
   + 3,7 MB model), tarayıcı saklar. Görüntü telefonda işlenir, hiçbir yere gönderilmez.
   İnemezse oyun aksesuarsız takipte kalır: göz noktaları elle yerleştirilir.
   Mobil uygulamada aynı arayüze (eyesFrom → mask.eyes) telefonun kendi yüz algılaması bağlanabilir. */
const MP_BASE = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35';
const MP_MODEL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
let faceLM = null, faceLoad = null, faceFail = false, faceTs = 0;
function loadFace(){
  if (faceLM) return Promise.resolve(faceLM);
  if (faceLoad) return faceLoad;
  faceFail = false;
  // Kütüphane bilgi satırlarını ("INFO: …", "W0000 …") konsola hata olarak yazıyor; onları süz.
  if (!console.error._mp){ const ce = console.error; console.error = Object.assign((...a) => { if (typeof a[0] === 'string' && /^(INFO:|[IW][0-9]{4} )/.test(a[0])) return; ce.apply(console, a); }, { _mp:true }); }
  faceLoad = (async () => {
    const m = await import(MP_BASE + '/vision_bundle.mjs');
    const files = await m.FilesetResolver.forVisionTasks(MP_BASE + '/wasm');
    const opt = d => ({ baseOptions:{ modelAssetPath:MP_MODEL, delegate:d }, runningMode:'VIDEO', numFaces:1 });
    try { faceLM = await m.FaceLandmarker.createFromOptions(files, opt('GPU')); }
    catch(e){ faceLM = await m.FaceLandmarker.createFromOptions(files, opt('CPU')); }
    return faceLM;
  })().catch(e => { faceLoad = null; faceFail = true; throw e; });
  return faceLoad;
}
// Bir görüntüde yüz noktaları (bulamazsa null).
function detectFace(img){
  if (!faceLM) return null;
  faceTs = Math.max(faceTs + 1, performance.now());
  try { const r = faceLM.detectForVideo(img, faceTs); return (r.faceLandmarks && r.faceLandmarks[0]) || null; } catch(e){ return null; }
}
// Yüz noktalarından iki göz merkezi, kare fotoğrafın 0..1 konumunda.
// W, H: görüntü boyutu; crop: görüntüden alınan kare (x, y, s); mirror: ön kamera aynası.
function eyesFrom(L, W, H, crop, mirror){
  const mid = (a, b) => [(L[a].x + L[b].x) / 2 * W, (L[a].y + L[b].y) / 2 * H];
  let e = [mid(33, 133), mid(362, 263)].map(([x, y]) => [(x - crop.x) / crop.s, (y - crop.y) / crop.s]);
  if (mirror) e = e.map(([x, y]) => [1 - x, y]);
  return e.sort((a, b) => a[0] - b[0]);
}
// Kare fotoğrafta (galeri ya da çekilmiş kare) gözleri bulup aksesuar noktalarını yerleştirir.
async function findEyes(img){
  try { await loadFace(); } catch(e){ return false; }
  const L = detectFace(img); if (!L) return false;
  mask.eyes = eyesFrom(L, 1, 1, { x:0, y:0, s:1 }, false); mask.auto = true; return true;
}
