# Çizim araçları

Resimler ızgara üzerinde doğrudan piksel olarak çizilir (`grid.mjs`: `rect`, `ell`, `poly`, `line`, `map`).
Her çizim `{ n, pal, px }` verir; `px` içerikteki sıkıştırılmış biçimdir.

- `node onizle.mjs akdeniz-1` → `akdeniz-1-0.png`… önizleme (büyük, yan yana). Bu klasördeki PNG'ler git'e girmez.
- `node akdeniz-veri.mjs` → `src/content/turkiye/akdeniz.json` (iller: bilgi, soru, hatıra, komşu) ve Akdeniz rehberini yazar.
  Dikkat: çalıştırınca o bölgenin resim verisi yeniden üretilir. Oyuncu kayıtları resim kimliğine ve piksel düzenine bağlı;
  yayınlanmış bir resmi değiştirmeden önce yarım kalmış kayıtları düşün.
