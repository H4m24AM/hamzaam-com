import {createRemoteJWKSet, jwtVerify} from 'jose';
const keysets=new Map();
export async function authenticateArchive(request,env,verify=jwtVerify){
  const domain=String(env.BK_ARCHIVE_ACCESS_TEAM_DOMAIN||'').trim();
  const audience=String(env.BK_ARCHIVE_ACCESS_AUD||'').trim();
  const owner=String(env.BK_ARCHIVE_OWNER_EMAIL||'').trim().toLowerCase();
  if(!/^[a-z0-9-]+\.cloudflareaccess\.com$/i.test(domain)||!audience||!owner)return {status:503,error:'The private archive is awaiting its Cloudflare access setup.'};
  const token=request.headers.get('Cf-Access-Jwt-Assertion');
  if(!token)return {status:401,error:'Sign in through the protected Hamza.AM archive to continue.'};
  const issuer='https://'+domain;
  try{
    if(!keysets.has(issuer))keysets.set(issuer,createRemoteJWKSet(new URL(issuer+'/cdn-cgi/access/certs')));
    const {payload}=await verify(token,keysets.get(issuer),{issuer,audience,algorithms:['RS256'],requiredClaims:['exp','iat','email','sub']});
    if(typeof payload.email!=='string'||payload.email.toLowerCase()!==owner)return {status:403,error:'This archive is private to its owner.'};
    return {status:200,email:payload.email};
  }catch{return {status:403,error:'Your archive sign-in could not be verified. Please sign in again.'};}
}
