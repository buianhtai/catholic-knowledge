import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const roots=['app','components'];
const extensions=new Set(['.ts','.tsx','.css']);
const forbidden=['✦','✧','★','☆'];
const failures:string[]=[];

async function walk(dir:string):Promise<void>{
  const entries=await readdir(dir,{withFileTypes:true});
  for(const entry of entries){
    const file=path.join(dir,entry.name);
    if(entry.isDirectory()){
      await walk(file);
      continue;
    }
    if(!extensions.has(path.extname(entry.name)))continue;
    const content=await readFile(file,'utf8');
    for(const glyph of forbidden){
      if(content.includes(glyph))failures.push(`${file}: contains forbidden decorative glyph ${glyph}`);
    }
  }
}

for(const root of roots)await walk(root);

if(failures.length){
  console.error('Decorative star/sparkle glyphs are not allowed in user-facing UI source. Use meaningful sourced imagery, a factual diagram, or a neutral structural marker instead.');
  failures.forEach(failure=>console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Visual glyph validation passed.');
