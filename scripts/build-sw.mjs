import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
async function walk(dir) { const entries=await readdir(dir,{withFileTypes:true}); return (await Promise.all(entries.map(e=>e.isDirectory()?walk(`${dir}/${e.name}`):`${dir}/${e.name}`))).flat(); }
const files=(await walk('dist')).filter(f=>!f.endsWith('/sw.js'));
const contents=await Promise.all(files.map(f=>readFile(f)));
const hash=createHash('sha256');contents.forEach(c=>hash.update(c));
const source=await readFile('public/sw.js','utf8');
await writeFile('dist/sw.js',source.replace('__BUILD__',hash.digest('hex').slice(0,16)).replace('__ASSETS__',JSON.stringify(files.map(f=>'./'+f.slice(5)))));
