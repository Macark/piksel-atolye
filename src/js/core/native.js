/* ---------- mobil uygulama (Capacitor) yapıştırıcısı ----------
   Web sürümünde hiçbir şey yapmaz. Uygulamada:
   - kayıt localStorage'a ek olarak Preferences'a da yazılır (iOS depolama sıkışınca web verisini
     silebilir; açılışta localStorage boşsa yedekten geri yüklenir),
   - durum çubuğu yazıları temaya göre açık/koyu olur. */
const NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
const NP = NATIVE ? (window.Capacitor.Plugins || {}) : {};
const NATIVE_KEY = 'piksel-atolye-v1';
let nativeT = 0, nativeJ = '';   // sık kayıtta (boyarken) yedek en çok 2 sn'de bir yazılır
function nativeBackup(json){ nativeJ = json; if (nativeT || !NP.Preferences) return; nativeT = setTimeout(() => { nativeT = 0; NP.Preferences.set({ key:NATIVE_KEY, value:nativeJ }).catch(() => {}); }, 2000); }
function nativeTheme(dark){ if (NP.StatusBar) NP.StatusBar.setStyle({ style:dark ? 'DARK' : 'LIGHT' }).catch(() => {}); }
// localStorage boş ama yedek varsa: yedeği geri koy ve sayfayı bir kez yeniden yükle
if (NATIVE && NP.Preferences){
  let has = false; try { has = !!localStorage.getItem(NATIVE_KEY); } catch(e){}
  if (!has) NP.Preferences.get({ key:NATIVE_KEY }).then(r => { if (r && r.value){ try { localStorage.setItem(NATIVE_KEY, r.value); location.reload(); } catch(e){} } }).catch(() => {});
}
