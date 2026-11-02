import {build} from 'vite';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
const root=dirname(fileURLToPath(import.meta.url));
const website=resolve(root,'../..');
await build({configFile:false,root,base:'/bk-archive/',build:{outDir:resolve(website,'bk-archive'),emptyOutDir:true,assetsDir:'assets'}});
await cp(resolve(root,'public'),resolve(website,'bk-archive'),{recursive:true});
await mkdir(resolve(website,'functions/_lib'),{recursive:true});
await build({configFile:false,root,publicDir:false,build:{outDir:resolve(website,'functions/_lib'),emptyOutDir:false,minify:true,lib:{entry:resolve(root,'src/access.js'),formats:['es'],fileName:()=> 'archive-access.js'},rollupOptions:{external:[]}}});

// Rolldown's source-region comments otherwise depend on the caller's working directory.
const verifier=resolve(website,'functions/_lib/archive-access.js');
await writeFile(verifier,(await readFile(verifier,'utf8')).replace(/^\/\/#(?:end)?region[^\n]*\r?\n/gm,''));
