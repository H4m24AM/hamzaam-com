const response = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
export async function onRequestPost({ request }) {
  if (request.headers.get('Origin') !== new URL(request.url).origin) return response(403, {error:'Please submit this form from hamza.am.'});
  if (Number(request.headers.get('Content-Length') || 0) > 16000) return response(413, {error:'Please shorten your message.'});
  let data;
  try { data = await request.formData(); } catch { return response(400, {error:'Please check your form and try again.'}); }
  if (data.get('_honey')) return response(400, {error:'Unable to submit this request.'});
  const fields = Object.fromEntries(['name','email','property_location','property_type','preferred_shoot_date','notes'].map(key => [key, String(data.get(key) || '').trim()]));
  if (!fields.name || !fields.property_location || !fields.property_type || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return response(400, {error:'Please enter your name, email, property location, and property type.'});
  if (Object.values(fields).some(value => value.length > 4000)) return response(400, {error:'Please shorten your message.'});
  try {
    const upstream = await fetch('https://formsubmit.co/ajax/eceed28a1e6017f6524f24a1c4c2da15', {
      method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json','Referer':'https://hamza.am/real-estate-photography','Origin':'https://hamza.am'},
      body:JSON.stringify({...fields, _subject:'Real estate photography — availability request', _template:'table', _url:'https://hamza.am/real-estate-photography'}),
      signal:AbortSignal.timeout(20000)
    });
    const result = await upstream.json();
    if (!upstream.ok || String(result.success) !== 'true' || /activat|confirm your email/i.test(result.message || '')) return response(503, {error:'Your request could not be confirmed. Please email inquiries@hamza.am directly.', reason:String(result.message || 'Email service rejected the request').slice(0,300)});
    return response(200, {success:true});
  } catch { return response(503, {error:'The form service is temporarily unavailable. Please try again or email inquiries@hamza.am.'}); }
}
export const onRequestGet = () => response(405, {error:'Please use the inquiry form to send a request.'});
