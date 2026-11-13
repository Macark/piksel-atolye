// node onizle.mjs akd1 → akd1.png (her resim büyük, numaralı sırayla)
import { sheet } from './pix.mjs';
const mod = await import('./' + process.argv[2] + '.mjs'), set = mod.A || mod.S;
const keys = Object.keys(set), arts = keys.map(k => set[k]());
const per = +(process.argv[3] || 6);
for (let i = 0; i < arts.length; i += per) sheet(`${process.argv[2]}-${i / per}.png`, arts.slice(i, i + per), +(process.argv[4] || 192), 10);
console.log(keys.map((k, i) => `${k}:${arts[i].n}/${arts[i].pal.length}r`).join('  '));
