// Ege resimleri 1: Afyonkarahisar, Aydın, Denizli, İzmir
import { G } from './grid.mjs';
export const A = {};
const SKY = '#bfe3f2';

// AFYON — Kale: şehrin ortasındaki dik volkanik kayanın tepesinde kale, bayrak
A.afyonkale = () => { const d = G(32, SKY);
  d.poly([[4, 32], [9, 14], [13, 9], [20, 8], [24, 13], [28, 32]], '#6a5a52');                    // trakit kaya
  d.poly([[13, 9], [20, 8], [22, 12], [16, 14]], '#7e6c62'); [[10, 20], [21, 22], [14, 27], [24, 26]].forEach(([x, y]) => d.rect(x, y, 2, 1, '#54463f'));
  d.rect(12, 5, 10, 4, '#a89a8a'); for (let x = 12; x < 22; x += 2) d.px(x, 4, '#a89a8a'); d.rect(15, 6, 2, 3, '#4a3e36');
  d.rect(20, 0, 1, 5, '#7a7a7a').map(21, 0, ['RRRR', 'RWRR', 'RRRR'], { R:'#e30a17', W:'#ffffff' });
  d.rect(0, 28, 32, 4, '#c9b48a'); [[1, 26], [27, 25], [29, 27]].forEach(([x, y]) => d.rect(x, y, 3, 3, '#efe3cc').rect(x, y - 1, 3, 1, '#b5532e')); // evler
  return d.done(); };

// Afyon Kaymağı: kalın kaymak rulosu, bal
A.kaymak = () => { const d = G(24, '#f3e6cf');
  d.ell(12, 15, 10, 6, '#c9cfd6').ell(12, 14.5, 9, 5, '#eef2f4');
  d.ell(10, 13, 6, 3.4, '#fbf6e8').ell(10, 12, 5, 2.2, '#fffdf6'); d.line(5, 14, 15, 14, '#e8dcc0');      // kaymak katmanı
  d.ell(16, 15, 3.5, 2, '#d99a2a'); d.px(15, 14, '#f2c050');                                             // bal
  for (let x = 6; x < 15; x += 3) d.px(x, 12, '#f2e8d0');
  return d.done(); };

// Afyon Sucuğu: at nalı biçimli sucuk, dilimler
A.sucuk = () => { const d = G(24, '#f6ead6');
  d.ell(10, 11, 7.5, 7.5, '#8a2a1a'); d.ell(10, 11, 5, 5, '#f6ead6'); d.rect(2, 11, 16, 9, '#f6ead6');
  d.rect(2, 11, 3, 6, '#8a2a1a').rect(15, 11, 3, 6, '#8a2a1a'); d.px(3, 16, '#6a1a10').px(16, 16, '#6a1a10');
  d.line(4, 6, 6, 4, '#b84a3a'); d.px(9, 3, '#b84a3a').px(10, 3, '#b84a3a');
  d.rect(9, 1, 2, 2, '#e8e2d0');                                                                          // ip
  [[19, 15], [16, 19], [21, 20]].forEach(([x, y]) => { d.ell(x, y, 2.2, 2.2, '#a8321e'); [[0, 0], [1, -1], [-1, 1]].forEach(([a, b]) => d.px(x + a, y + b, '#f2d0b8')); });
  return d.done(); };

// AYDIN — Afrodisias: Tetrapylon (anıtsal kapı) sütunları
A.afrodisias = () => { const d = G(32, SKY);
  d.rect(0, 27, 32, 5, '#c9b48a');
  d.rect(3, 9, 26, 3, '#e8dcc0').rect(3, 12, 26, 1, '#c9b89a');                                          // arşitrav
  d.poly([[8, 9], [16, 4], [24, 9]], '#e0d2b4').ell(16, 7.5, 1.5, 1.2, '#c9b89a');                        // alınlık
  [4, 9, 20, 25].forEach(x => { d.rect(x, 13, 3, 13, '#efe6d2'); d.rect(x + 2, 13, 1, 13, '#d6caae'); d.rect(x - 1, 25, 5, 2, '#d6caae'); d.rect(x - 1, 12, 5, 1, '#d6caae'); });
  d.ell(16, 21, 3, 4, '#c9b89a', (x, y) => y < 22); d.rect(13, 21, 6, 6, '#c9b89a').rect(14, 19, 4, 8, SKY);   // orta kemer
  d.rect(14, 19, 4, 8, '#bfe3f2');
  return d.done(); };

// Aydın İnciri: kesik incir ve yapraklı bütün incir
A.incir = () => { const d = G(24, '#f4ead8');
  d.ell(15, 14, 6, 6.5, '#6a3a6a'); d.rect(14, 6, 2, 3, '#5a7a3a'); d.ell(13, 12, 1.5, 2.5, '#8a5a8a');     // bütün incir
  d.poly([[16, 7], [21, 3], [23, 8], [19, 9]], '#4ea34a').line(16, 7, 22, 5, '#2f7a2a');
  d.ell(7, 15, 5, 5.5, '#7a4a6a'); d.ell(7, 15.5, 3.8, 4.2, '#f2e2c8'); d.ell(7, 16, 2.6, 3, '#d9485a');     // kesik incir
  [[6, 15], [8, 16], [7, 18], [6, 17], [8, 14]].forEach(([x, y]) => d.px(x, y, '#f6d0a0'));
  return d.done(); };

// Söke Pamuğu: açmış pamuk kozaları
A.pamuk = () => { const d = G(24, '#bfe3f2');
  d.rect(0, 19, 24, 5, '#7ab04e');
  const koza = (x, y) => { d.poly([[x - 3, y + 2], [x, y + 4], [x + 3, y + 2], [x, y + 1]], '#7a4a2a'); d.ell(x - 1.5, y, 2.2, 2, '#ffffff'); d.ell(x + 1.5, y, 2.2, 2, '#ffffff'); d.ell(x, y - 1.5, 2.2, 2, '#ffffff'); d.px(x, y, '#eef2f4'); };
  d.line(8, 21, 8, 10, '#5a7a3a').line(16, 21, 16, 8, '#5a7a3a').line(8, 15, 12, 12, '#5a7a3a');
  koza(8, 8); koza(16, 6); koza(13, 11);
  d.poly([[17, 14], [21, 12], [20, 16]], '#4ea34a').poly([[7, 16], [3, 14], [4, 18]], '#4ea34a');
  return d.done(); };

// DENİZLİ — Pamukkale: bembeyaz traverten basamakları ve turkuaz havuzlar
A.pamukkale = () => { const d = G(32, SKY);
  d.poly([[0, 10], [10, 7], [22, 8], [32, 6], [32, 32], [0, 32]], '#f6f6f2');
  for (let k = 0; k < 5; k++){ const y = 11 + k * 4, x0 = 2 + (k % 2) * 3;
    for (let x = x0; x < 30; x += 9){ d.ell(x + 3, y + 1, 4, 1.4, '#5ac8d8'); d.rect(x - 1, y + 2, 9, 1, '#e2e2da'); d.px(x + 1, y + 1, '#a8e8f0'); } }
  [[3, 27], [24, 29]].forEach(([x, y]) => d.rect(x, y, 4, 1, '#e2e2da'));
  return d.done(); };

// Denizli Horozu: uzun boylu, ibikli, ötmeye hazır horoz
A.horoz = () => { const d = G(32, '#f6e3c1');
  d.rect(0, 28, 32, 4, '#c9a060');
  d.ell(15, 19, 7, 5.5, '#2a2a2a'); d.ell(16, 18, 5, 3.5, '#4a4a5a');                                    // gövde
  d.poly([[8, 18], [3, 10], [5, 9], [10, 15]], '#1f4a3a').poly([[9, 19], [4, 14], [7, 13], [11, 17]], '#2f6a4a');   // kuyruk
  d.poly([[19, 16], [22, 8], [25, 9], [22, 17]], '#e0761a');                                             // boyun
  d.ell(24, 7, 2.6, 2.4, '#e0761a'); d.poly([[22, 4], [23, 2], [24, 4], [25, 2], [26, 4]], '#d9302a').rect(22, 4, 5, 1, '#d9302a');   // baş, ibik
  d.poly([[26, 7], [29, 8], [26, 9]], '#f2c14a'); d.px(24, 6, '#1a1a1a'); d.rect(25, 9, 1, 2, '#d9302a');   // gaga, göz, sakal
  d.line(13, 24, 12, 28, '#f2c14a').line(17, 24, 18, 28, '#f2c14a');
  return d.done(); };

// Buldan Bezi: el tezgâhında dokunan bez, mekik
A.buldanbezi = () => { const d = G(24, '#e8dcc8');
  d.rect(2, 4, 20, 2, '#8a5a2b').rect(2, 18, 20, 2, '#8a5a2b');                                        // tezgâh kirişleri
  d.rect(3, 6, 18, 12, '#f6efe0'); for (let x = 3; x < 21; x += 2) d.rect(x, 6, 1, 12, '#ece2cc');
  for (let y = 7; y < 17; y += 3) d.rect(3, y, 18, 1, '#5aa0c8');                                       // mavi çizgiler
  d.rect(3, 12, 18, 1, '#e0a526');
  d.ell(12, 21.5, 5, 1.2, '#a8703a'); d.rect(11, 21, 2, 1, '#f6efe0');                                  // mekik
  return d.done(); };

// İZMİR — Saat Kulesi: dört katlı kule, palmiyeler, güvercinler
A.saatkulesi = () => { const d = G(32, SKY);
  d.rect(0, 27, 32, 5, '#d9cdb2');
  d.rect(12, 8, 8, 19, '#e9dcc0'); d.rect(11, 14, 10, 1, '#c9b89a').rect(11, 20, 10, 1, '#c9b89a').rect(10, 26, 12, 1, '#c9b89a');
  d.ell(16, 11, 2.4, 2.4, '#fbfaf4'); d.px(16, 10, '#2a1d14').px(17, 11, '#2a1d14'); d.ell(16, 11, 2.4, 2.4, '#8a6a3a', (x, y, dx, dy) => dx * dx + dy * dy > 0.7);
  d.rect(13, 16, 2, 3, '#8ab0c8').rect(17, 16, 2, 3, '#8ab0c8').rect(14, 22, 4, 4, '#6a4a2e');
  d.poly([[12, 8], [16, 3], [20, 8]], '#c0702a'); d.rect(16, 1, 1, 2, '#e0a526');
  [[4, 27], [27, 27]].forEach(([x, y]) => { d.rect(x, 14, 1, 13, '#8a6a3a'); [[-4, 13], [3, 13], [-3, 11], [2, 11], [0, 12]].forEach(([a, b]) => d.line(x, 14, x + a, b, '#3f8a45')); });
  [[8, 29], [22, 30]].forEach(([x, y]) => d.rect(x, y, 2, 1, '#7a7a8a'));                               // güvercinler
  return d.done(); };

// İzmir Boyozu: kat kat yuvarlak hamur işi, yanında yumurta
A.boyoz = () => { const d = G(24, '#f6ead6');
  d.ell(12, 15, 11, 6, '#fbf8f0').ell(12, 15, 9.5, 4.6, '#ece4d4');
  const by = (x, y) => { d.ell(x, y, 3.6, 2.8, '#d9a050'); d.ell(x, y - 0.5, 2.4, 1.6, '#efc078'); d.ell(x, y - 0.5, 1, 0.7, '#c08030'); };
  by(7, 14); by(13, 13); by(10, 17);
  d.ell(18, 16, 2.6, 2, '#ffffff').ell(18, 16, 1.3, 1, '#f2c14a');                                      // haşlanmış yumurta
  return d.done(); };

// Efes: Celsus Kütüphanesi'nin iki katlı sütunlu cephesi
A.efes = () => { const d = G(32, SKY);
  d.rect(0, 28, 32, 4, '#d9cdb2');
  d.rect(3, 6, 26, 22, '#e9dcc0');
  [5, 11, 17, 23].forEach(x => { d.rect(x, 18, 2, 10, '#fbf6ea'); d.rect(x, 7, 2, 10, '#fbf6ea'); });
  d.rect(3, 17, 26, 1, '#c9b89a').rect(3, 6, 26, 1, '#c9b89a');
  [[8, 21], [14, 21], [20, 21]].forEach(([x, y]) => { d.rect(x, y, 3, 7, '#6a4a2e'); d.ell(x + 1.5, y, 1.5, 1.2, '#6a4a2e'); });
  [[8, 10], [14, 10], [20, 10]].forEach(([x, y]) => d.rect(x, y, 3, 5, '#8a7a62'));
  d.poly([[13, 6], [16, 3], [19, 6]], '#d6caae');
  return d.done(); };
