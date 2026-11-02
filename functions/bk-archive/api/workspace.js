export async function onRequestGet({env,data}) {
  if(!data.bkArchiveOwner)return Response.json({error:"Sign-in required"},{status:403});
  const row = await env.BK_ARCHIVE_DB.prepare("SELECT payload, revision FROM workspace WHERE id = ?").bind("archive").first();
  return Response.json(row ? {data:JSON.parse(row.payload),revision:row.revision} : {data:{custom:[],edits:{},pairs:[]},revision:0}, {headers:{"Cache-Control":"no-store"}});
}
export async function onRequestPut({request,env,data:identity}) {
  if(!identity.bkArchiveOwner)return Response.json({error:"Sign-in required"},{status:403});
  if (request.headers.get("sec-fetch-site") === "cross-site") return Response.json({error:"Cross-site write rejected"},{status:403});
  const raw=await request.text();
  if(raw.length>1500000)return Response.json({error:"Workspace too large"},{status:413});
  let body;
  try{body=JSON.parse(raw);}catch{return Response.json({error:"Invalid JSON"},{status:400});}
  const {data,revision}=body;
  if(!data||!Array.isArray(data.custom)||!Array.isArray(data.pairs)||!data.edits||typeof data.edits!=="object"||!Number.isInteger(revision)||revision<0) return Response.json({error:"Invalid workspace"},{status:400});
  const result=await env.BK_ARCHIVE_DB.prepare("INSERT INTO workspace (id,payload,revision) VALUES (?,?,?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, revision=excluded.revision WHERE workspace.revision=?").bind("archive",JSON.stringify(data),revision+1,revision).run();
  if(!result.meta.changes)return Response.json({error:"This workspace changed in another tab. Reload before saving."},{status:409});
  return Response.json({revision:revision+1});
}
