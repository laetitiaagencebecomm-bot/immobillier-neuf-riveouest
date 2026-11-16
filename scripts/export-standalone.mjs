import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root=process.cwd(), dist=path.join(root,'dist');
const mime={'.woff2':'font/woff2','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'};
const dataUrl=async(file)=>`data:${mime[path.extname(file)]??'application/octet-stream'};base64,${(await readFile(file)).toString('base64')}`;
let html=await readFile(path.join(dist,'index.html'),'utf8');
const imageMap={};
for(const entry of await readdir(path.join(dist,'assets'),{withFileTypes:true}))if(entry.isFile()&&mime[path.extname(entry.name)])imageMap[entry.name]=await dataUrl(path.join(dist,'assets',entry.name));
html=html.replace(/<link[^>]*rel="preload"[^>]*>/g,'');
for(const match of [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)]){
  const file=path.resolve(dist,match[1]);let css=await readFile(file,'utf8');
  for(const url of [...css.matchAll(/url\(([^)]+)\)/g)]){
    const value=url[1].replace(/["']/g,'');if(value.startsWith('data:'))continue;
    css=css.replace(url[0],`url("${await dataUrl(path.resolve(path.dirname(file),value))}")`);
  }
  html=html.replace(match[0],`<style>${css}</style>`);
}
for(const match of [...html.matchAll(/(?:src|href)="\.\/assets\/([^"/]+)"/g)])if(imageMap[match[1]])html=html.replace(match[0],match[0].split('=')[0]+`="${imageMap[match[1]]}"`);
for(const match of [...html.matchAll(/<script[^>]*src="([^"]+)"[^>]*><\/script>/g)]){
  const js=await readFile(path.resolve(dist,match[1]),'utf8');
  html=html.replace(match[0],`<script>globalThis.__RIVE_PREVIEW_ASSETS__=${JSON.stringify(imageMap).replace(/</g,'\\u003c')};</script><script type="module">${js.replace(/<\/script/gi,'<\\/script')}</script>`);
}
await mkdir(path.join(root,'exports'),{recursive:true});
await writeFile(path.join(root,'exports/maquette-immobilier-neuf.html'),html);
console.log('exports/maquette-immobilier-neuf.html — aperçu autonome sans serveur ni connexion.');
