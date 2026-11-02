export async function onRequestGet({request,params,env,data}){
  if(!data.bkArchiveOwner)return new Response("Sign-in required",{status:403});
  const {key}=params;if(!/^[a-f0-9-]{36}$/.test(key))return new Response("Not found",{status:404});
  const object=await env.BK_ARCHIVE_PHOTOS.get(key);if(!object)return new Response("Not found",{status:404});
  const headers=new Headers();object.writeHttpMetadata(headers);headers.set("Cache-Control","private, max-age=3600");headers.set("X-Content-Type-Options","nosniff");
  return new Response(object.body,{headers});
}
