// ===== DİL / LANGUAGE =====
// Türkçe metinler kodda olduğu gibi duruyor; İngilizce karşılıkları EN tablosunda.
// Ekrandaki yazılar, canvas yazıları ve TL() ile kurulan cümleler bu tablodan çevrilir.
const LANG_KEY = 'piksel-atolye-lang';
const LANG = (() => { try { const v = localStorage.getItem(LANG_KEY); if (v === 'tr' || v === 'en') return v; } catch(e){} return /^tr\b/i.test(navigator.language || 'tr') ? 'tr' : 'en'; })();
const LOC = LANG === 'en' ? 'en-US' : 'tr-TR';
