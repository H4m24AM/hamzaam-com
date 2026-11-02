export async function onRequestPost({request,env,data}){
  if(!data.bkArchiveOwner)return Response.json({error:"Sign-in required"},{status:403});
  if(request.headers.get("sec-fetch-site")==="cross-site")return Response.json({error:"Cross-site write rejected"},{status:403});
  if(Number(request.headers.get("content-length"))>26*1024*1024)return Response.json({error:"Maximum file size is 25 MB"},{status:413});
  const form=await request.formData();const file=form.get("file");
  if(!(file instanceof File)||!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>25*1024*1024||file.size===0)return Response.json({error:"Choose a JPG, PNG or WebP image up to 25 MB"},{status:400});
  const bytes=new Uint8Array(await file.arrayBuffer());
  const valid=file.type==='image/jpeg'?bytes[0]===255&&bytes[1]===216:file.type==='image/png'?bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71:String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP';
  if(!valid)return Response.json({error:"Image content does not match its format"},{status:400});
  const key=crypto.randomUUID();await env.BK_ARCHIVE_PHOTOS.put(key,bytes,{httpMetadata:{contentType:file.type},customMetadata:{filename:file.name.slice(0,200)}});
  return Response.json({url:"/bk-archive/api/photos/"+key,filename:file.name});
}
