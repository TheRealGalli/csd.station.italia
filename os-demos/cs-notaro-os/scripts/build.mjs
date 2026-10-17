import {mkdir,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const name of ['index.html','manifest.json','assets','css','js','vendor','docs'])await cp(name,`dist/${name}`,{recursive:true});
console.log('Frontend statico pronto in dist/. Nessun servizio cloud attivato.');
