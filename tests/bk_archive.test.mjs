import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {authenticateArchive} from '../tools/bk-archive/src/access.js';
import {generateKeyPair,exportJWK,SignJWT,createLocalJWKSet,jwtVerify} from '../tools/bk-archive/node_modules/jose/dist/webapi/index.js';
const env={BK_ARCHIVE_ACCESS_TEAM_DOMAIN:'test.cloudflareaccess.com',BK_ARCHIVE_ACCESS_AUD:'archive-test-audience',BK_ARCHIVE_OWNER_EMAIL:'owner@example.test'};
const {privateKey,publicKey}=await generateKeyPair('RS256');
const jwk={...await exportJWK(publicKey),kid:'test-key',alg:'RS256',use:'sig'};
const localKeys=createLocalJWKSet({keys:[jwk]});
const verify=(token,unused,options)=>jwtVerify(token,localKeys,options);
async function signed(overrides={}){
  return new SignJWT({email:'owner@example.test',...overrides}).setProtectedHeader({alg:'RS256',kid:'test-key'}).setSubject('test-owner').setIssuedAt().setExpirationTime(overrides.exp??'1h').setIssuer(overrides.iss??'https://test.cloudflareaccess.com').setAudience(overrides.aud??'archive-test-audience').sign(privateKey);
}
const request=(token)=>new Request('https://hamza.am/bk-archive/api/workspace',{headers:token?{'Cf-Access-Jwt-Assertion':token}:{}});
test('missing access configuration blocks the route',async()=>assert.equal((await authenticateArchive(request(),{},verify)).status,503));
test('missing identity does not reach the verifier',async()=>assert.equal((await authenticateArchive(request(),env,()=>{throw Error('must not verify')})).status,401));
test('correctly signed owner identity is accepted',async()=>assert.equal((await authenticateArchive(request(await signed()),env,verify)).status,200));
for(const [name,claims] of [['wrong owner',{email:'someone@example.test'}],['wrong audience',{aud:'another-application'}],['wrong issuer',{iss:'https://other.cloudflareaccess.com'}],['expired token',{exp:1}]])test(name+' is rejected',async()=>assert.equal((await authenticateArchive(request(await signed(claims)),env,verify)).status,403));
test('forged identity is rejected',async()=>assert.equal((await authenticateArchive(request('not-a-signed-jwt'),env,verify)).status,403));
test('routing protects page, assets and APIs without intercepting the rest of Hamza.AM',async()=>{
 const routes=JSON.parse(await readFile(new URL('../_routes.json',import.meta.url),'utf8'));
 assert.deepEqual(routes,{version:1,include:['/bk-archive','/bk-archive/*'],exclude:[]});
});
test('API handlers reject calls without middleware identity before reading or writing storage',async()=>{
 const files=['../functions/bk-archive/api/workspace.js','../functions/bk-archive/api/photos.js','../functions/bk-archive/api/photos/[key].js'];
 for(const f of files){const src=await readFile(new URL(f,import.meta.url),'utf8');const mod=await import('data:text/javascript,'+encodeURIComponent(src));for(const handler of Object.values(mod)){const r=await handler({request:request(),env:new Proxy({},{get(){throw Error('storage access without identity')}}),data:{},params:{key:'not-used'}});assert.equal(r.status,403);}}
});
