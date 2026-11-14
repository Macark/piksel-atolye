// Doğu Anadolu resimleri 1: Ağrı, Ardahan, Bingöl, Bitlis
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2', STEP = '#c9b878';

// AĞRI — Ağrı Dağı: Türkiye'nin en yüksek dağı, iki zirve
A.agridagi = () => { const d = G(32, SKY);
  d.poly([[0, 26], [4, 22], [13, 5], [16, 4], [21, 11], [24, 9], [27, 13], [32, 22], [32, 26]], '#7a6a6a');
  d.poly([[9, 12], [13, 5], [16, 4], [20, 10], [17, 9], [15, 11], [12, 10]], '#f6f8fa');
  d.poly([[22, 12], [24, 9], [26, 12], [24, 11]], '#f6f8fa');                                                 // Küçük Ağrı
  d.rect(0, 25, 32, 7, STEP); [[4, 28], [18, 29], [26, 27]].forEach(([x, y]) => d.rect(x, y, 3, 1, '#a89858'));
  d.ell(6, 6, 3, 1.4, '#ffffff'); d.ell(26, 4, 2.6, 1.2, '#ffffff');
  return d.done(); };

// İshak Paşa Sarayı: yamaçta kubbeli, minareli saray
A.ishakpasa = () => { const d = G(32, '#f2d6a8');
  d.poly([[0, 10], [10, 4], [20, 8], [32, 3], [32, 32], [0, 32]], '#a8846a');
  d.rect(4, 14, 24, 12, '#e0c8a0'); d.rect(4, 14, 24, 1, '#c9ae84');
  d.ell(18, 14, 4, 3, '#c9ae84', (x, y) => y < 14); d.rect(8, 9, 2, 6, '#e0c8a0'); d.poly([[7.5, 9], [9, 6], [10.5, 9]], '#c9ae84');   // kubbe ve minare
  d.ell(15, 20, 2.6, 2.6, '#6a4a32', (x, y) => y < 20); d.rect(13, 20, 5, 6, '#6a4a32');                    // taç kapı
  [[6, 17], [22, 17], [25, 17]].forEach(([x, y]) => d.rect(x, y, 2, 3, '#6a5a48'));
  d.rect(0, 26, 32, 6, '#b8946a');
  return d.done(); };

// Meteor Çukuru: göktaşının açtığı derin çukur
A.meteor = () => { const d = G(32, '#1f2a5a');
  [[3, 3], [9, 6], [26, 2], [29, 8], [15, 1]].forEach(([x, y]) => d.px(x, y, '#fbf3c8'));
  d.line(22, 2, 17, 9, '#f6d36b'); d.line(23, 2, 18, 9, '#f08a2a'); d.ell(17, 10, 1.4, 1.4, '#fbf3c8');    // kayan göktaşı
  d.rect(0, 18, 32, 14, '#8a7a5a');
  d.ell(16, 22, 11, 5, '#5a4a32'); d.ell(16, 23, 8, 3.4, '#3a2e20'); d.ell(16, 18.5, 12, 1.5, '#a8946a', (x, y) => y < 19);
  return d.done(); };

// ARDAHAN — Çıldır Gölü: donmuş gölde atlı kızak
A.cildir = () => { const d = G(32, SKY);
  d.poly([[0, 12], [10, 7], [22, 10], [32, 6], [32, 16], [0, 16]], '#e8eef2');
  d.rect(0, 15, 32, 17, '#d8eaf2'); [[3, 20], [20, 27], [10, 29]].forEach(([x, y]) => d.rect(x, y, 6, 1, '#ffffff'));
  d.rect(4, 22, 9, 3, '#c0392b'); d.rect(4, 25, 11, 1, '#6b4a2a'); d.rect(6, 19, 3, 3, '#2a3a5a'); d.ell(7.5, 18, 1.4, 1.4, '#f0c8a0');   // kızak, sürücü
  d.line(13, 23, 18, 22, '#6b4a2a');
  d.ell(21, 20, 4, 2.4, '#6b4a2a'); d.ell(25, 17, 1.8, 2, '#6b4a2a'); d.rect(24, 15, 1, 2, '#3a2416'); [18, 19, 22, 23].forEach(x => d.rect(x, 22, 1, 4, '#5a3a1e'));   // at
  d.rect(22, 18, 3, 1, '#3a2416');
  return d.done(); };

// Ardahan Kaz Eti: yaylada kazlar
A.ardahankaz = () => { const d = G(32, SKY);
  d.rect(0, 16, 32, 16, '#7ab04e'); d.poly([[0, 16], [10, 11], [22, 14], [32, 10], [32, 16]], '#5f9a44');
  const kaz = (x, y) => { d.ell(x, y, 4, 2.6, '#f6f8fa'); d.ell(x - 1, y, 2.6, 1.6, '#e0e4e8'); d.rect(x + 3, y - 5, 1, 4, '#f6f8fa'); d.ell(x + 4, y - 5, 1.4, 1.2, '#f6f8fa'); d.px(x + 6, y - 5, '#e0a526').px(x + 5, y - 5, '#e0a526'); d.px(x + 4, y - 6, '#1a1a1a'); d.rect(x - 1, y + 2, 1, 2, '#e0a526').rect(x + 1, y + 2, 1, 2, '#e0a526'); };
  kaz(9, 22); kaz(21, 26); kaz(24, 18);
  [[3, 28], [14, 30]].forEach(([x, y]) => d.ell(x, y, 1.2, 1.2, '#e8d84a'));
  return d.done(); };

// Damal Bebeği: elde dikilen rengârenk kıyafetli bez bebek
A.damal = () => { const d = G(24, '#f6ecd2');
  d.rect(0, 20, 24, 4, '#c9a868');
  d.ell(12, 5, 3, 3.2, '#f0c8a0'); d.px(11, 5, '#2a1d14').px(13, 5, '#2a1d14'); d.px(12, 7, '#c0504a');
  d.ell(12, 3, 4, 2.4, '#c0392b', (x, y) => y < 4); d.rect(8, 3, 1, 6, '#c0392b').rect(16, 3, 1, 6, '#c0392b');   // başörtüsü
  for (let x = 9; x < 16; x += 2) d.px(x, 2, '#f2c14a');
  d.poly([[9, 9], [15, 9], [19, 20], [5, 20]], '#2e5f9e'); d.rect(9, 9, 6, 3, '#2a2a3a');                           // elbise, yelek
  d.rect(6, 17, 12, 1, '#f2c14a'); d.rect(5, 19, 14, 1, '#c0392b'); [[8, 14], [12, 15], [15, 13]].forEach(([x, y]) => d.px(x, y, '#e8708a'));
  d.rect(10, 12, 4, 1, '#f2c14a'); d.line(8, 10, 6, 15, '#f0c8a0').line(16, 10, 18, 15, '#f0c8a0');
  return d.done(); };

// BİNGÖL — Yüzen Adalar: gölde yüzen otlu adacıklar
A.yuzenadalar = () => { const d = G(32, SKY);
  d.poly([[0, 12], [10, 8], [22, 11], [32, 7], [32, 14], [0, 14]], '#6a8a5a');
  d.rect(0, 13, 32, 19, '#3a7ab0'); [[3, 16], [20, 18], [12, 28], [26, 29]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#8fc8f0'));
  [[8, 20, 5], [21, 23, 4], [12, 27, 3]].forEach(([x, y, r]) => { d.ell(x, y + 1, r, 1.4, '#2a5a8a'); d.ell(x, y, r, 1.6, '#6aa84a'); d.ell(x - 1, y - 1, r * 0.6, 1, '#8ac85a'); for (let k = -r + 1; k < r; k += 2) d.line(x + k, y - 1, x + k, y - 3, '#4f8a3a'); });
  d.rect(6, 17, 1, 3, '#6b4a2a'); d.ell(6.5, 16, 1.4, 1.4, '#3f7a45');
  return d.done(); };

// Bingöl Balı: petek ve bal kavanozu, çiçekler
A.bingolbali = () => { const d = G(24, '#f6ecd2');
  for (let y = 2; y < 12; y += 3) for (let x = 2 + (y % 2) * 2; x < 14; x += 4) { d.rect(x, y, 3, 2, '#e0a526'); d.px(x + 1, y, '#f6d36b'); d.px(x + 1, y + 1, '#b8801a'); }   // petek
  d.rect(14, 8, 8, 2, '#c0392b'); d.rect(13, 10, 10, 11, '#eef2f4'); d.rect(14, 11, 8, 9, '#e0a526'); d.rect(15, 12, 2, 6, '#f6d36b'); d.rect(14, 15, 8, 2, '#f6efe0');   // kavanoz
  [[4, 18], [9, 20]].forEach(([x, y]) => { d.line(x, y, x, 23, '#4f8a3a'); d.ell(x, y, 1.6, 1.6, '#c86ad8'); d.px(x, y, '#f6d36b'); });
  return d.done(); };

// Bingöl Gölleri: dağlardaki sayısız küçük göl (il adını buradan alır)
A.bingolgoller = () => { const d = G(32, SKY);
  d.poly([[0, 14], [7, 5], [12, 9], [18, 3], [25, 8], [32, 4], [32, 32], [0, 32]], '#8a9a6a');
  d.poly([[5, 8], [7, 5], [9, 8]], '#f6f8fa').poly([[16, 6], [18, 3], [20, 6]], '#f6f8fa').poly([[30, 6], [32, 4], [32, 7]], '#f6f8fa');
  d.poly([[0, 18], [32, 15], [32, 32], [0, 32]], '#7ab04e');
  [[5, 20, 3], [14, 19, 2], [24, 21, 3], [9, 26, 2.6], [19, 27, 3.4], [28, 28, 2], [3, 29, 1.6]].forEach(([x, y, r]) => { d.ell(x, y, r, r * 0.55, '#3a7ab0'); d.px(x - 1, y, '#8fc8f0'); });
  return d.done(); };

// BİTLİS — Nemrut Krater Gölü: sönmüş yanardağ ağzında göl
A.nemrut = () => { const d = G(32, SKY);
  d.poly([[0, 30], [0, 14], [8, 9], [24, 9], [32, 14], [32, 30]], '#7a6a5a');
  d.ell(16, 18, 13, 8, '#a8946a'); d.ell(16, 18, 11, 6, '#5a7a4a');                                        // krater çanağı
  d.ell(13, 19, 7, 4, '#2e7dba'); d.ell(12, 18, 3, 1, '#8fc8f0'); d.ell(23, 17, 2.4, 1.6, '#4fa8c8');           // büyük göl, küçük sıcak göl
  d.rect(0, 30, 32, 2, '#6a5a4a');
  return d.done(); };

// Ahlat Selçuklu Mezarlığı: kümbet ve oymalı mezar taşları
A.ahlat = () => { const d = G(32, SKY);
  d.rect(0, 24, 32, 8, '#a8b878');
  d.rect(4, 12, 10, 12, '#a8786a'); d.poly([[3, 12], [9, 4], [15, 12]], '#8a5a4a'); d.ell(9, 18, 2, 2, '#4a3028', (x, y) => y < 18); d.rect(7, 18, 4, 6, '#4a3028');   // kümbet
  for (let x = 4; x < 14; x += 3) d.px(x, 14, '#c89888');
  [[18, 14, 3, 10], [23, 12, 3, 12], [28, 15, 3, 9]].forEach(([x, y, w, h]) => { d.rect(x, y, w, h, '#9a6a5a'); d.ell(x + w / 2, y, w / 2, 1.4, '#9a6a5a', (a, b) => b < y + 1); for (let k = y + 2; k < y + h - 1; k += 2) d.px(x + 1, k, '#c89888'); });   // mezar taşları
  return d.done(); };

// Bitlis Kalesi: şehrin ortasında kayalık üstünde kale
A.bitliskale = () => { const d = G(32, SKY);
  d.poly([[0, 8], [8, 4], [20, 6], [32, 3], [32, 14], [0, 14]], '#8a9a7a');
  d.poly([[8, 32], [10, 16], [22, 14], [25, 32]], '#7a6a5a');
  d.rect(10, 9, 13, 7, '#a8947a'); for (let x = 10; x < 23; x += 2) d.px(x, 8, '#a8947a'); d.rect(14, 5, 4, 5, '#b8a48a'); d.px(14, 4, '#b8a48a').px(16, 4, '#b8a48a');
  d.rect(15, 11, 2, 3, '#4a3828');
  [[2, 22], [26, 20], [4, 28], [28, 27]].forEach(([x, y]) => { d.rect(x, y, 4, 4, '#e8dcc0'); d.poly([[x - 1, y], [x + 2, y - 2], [x + 5, y]], '#a8482a'); d.px(x + 1, y + 1, '#4a6a8a'); });
  return d.done(); };
