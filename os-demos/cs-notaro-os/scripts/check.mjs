import {readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
for(const dir of ['js','scripts'])for(const f of await readdir(dir)){if(!/\.m?js$/.test(f))continue;const r=spawnSync(process.execPath,['--check',`${dir}/${f}`],{stdio:'inherit'});if(r.status)process.exit(r.status);}
console.log('Sintassi verificata.');
