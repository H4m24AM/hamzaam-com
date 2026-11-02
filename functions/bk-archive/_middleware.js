import {authenticateArchive} from '../_lib/archive-access.js';
export async function onRequest(context){
  const auth=await authenticateArchive(context.request,context.env);
  if(auth.status!==200)return new Response(auth.error,{status:auth.status,headers:{'Cache-Control':'no-store','Content-Type':'text/plain; charset=utf-8','X-Robots-Tag':'noindex, nofollow'}});
  if(!context.env.BK_ARCHIVE_DB||!context.env.BK_ARCHIVE_PHOTOS)return new Response('The private archive is awaiting its storage bindings.',{status:503,headers:{'Cache-Control':'no-store'}});
  context.data.bkArchiveOwner=auth.email;
  const response=await context.next();
  const headers=new Headers(response.headers);
  headers.set('Cache-Control','private, no-store');
  headers.set('X-Robots-Tag','noindex, nofollow');
  headers.set('X-Content-Type-Options','nosniff');
  headers.set('Content-Security-Policy',"default-src 'self'; img-src 'self' blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; font-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'self'");
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
