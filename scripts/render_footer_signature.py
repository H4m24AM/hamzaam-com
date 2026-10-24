from PIL import Image, ImageDraw, ImageFont, ImageChops
import os
S=3; W,H=349,105
logo=Image.open('scripts/signature-source-logo.png').convert('RGB')
m=ImageChops.difference(logo,Image.new('RGB',logo.size,'white')).convert('L').point(lambda p:255 if p>35 else 0)
logo=logo.crop(m.getbbox()); logo.thumbnail((108*S,49*S),Image.Resampling.LANCZOS)
def f(n,b=False): return ImageFont.truetype('C:/Windows/Fonts/'+('segoeuib.ttf' if b else 'segoeui.ttf'),round(n*S))
roles=['IT Consultant','Realtor','Photographer','Author','Creative Director','Educator','Community Servant']
def base():
 im=Image.new('RGB',(W*S,H*S),'white'); d=ImageDraw.Draw(im)
 im.paste(logo,(8*S+(108*S-logo.width)//2,19*S))
 phone='646.339.4147'; ft=f(12,True); box=d.textbbox((0,0),phone,font=ft)
 d.text(((62*S-(box[2]-box[0])/2),76*S),phone,font=ft,fill=(25,25,25))
 d.line((126*S,12*S,126*S,94*S),fill=(215,215,215),width=S)
 d.text((138*S,9*S),'Hamza Abdul-Mumit',font=f(15,True),fill=(15,15,15))
 d.text((138*S,56*S),'inquiries@hamza.am',font=f(13),fill=(25,25,25))
 d.text((138*S,79*S),'Technology. Property. Culture',font=f(11.5),fill=(60,60,60))
 return im
frames=[]
for role in roles:
 for step in range(28):
  if step<6: a=(step+1)/6; offset=5*(1-a)
  elif step<22: a=1; offset=0
  else: a=(28-step)/7; offset=-4*(1-a)
  im=base(); layer=Image.new('RGBA',im.size,(255,255,255,0)); d=ImageDraw.Draw(layer)
  d.text((138*S,round((33+offset)*S)),role,font=f(14),fill=(40,40,40,round(255*a)))
  frames.append(Image.alpha_composite(im.convert('RGBA'),layer).convert('RGB').resize((W,H),Image.Resampling.LANCZOS).point(lambda p: 255-p).quantize(colors=64))
frames=frames[6:]+frames[:6]
path='images/footer-signature.gif'
frames[0].save(path,save_all=True,append_images=frames[1:],duration=70,loop=0,optimize=True,disposal=1)
frames[0].convert('RGB').save('images/footer-signature.png')
check=Image.open(path)
for i in range(check.n_frames): check.seek(i); check.load()
print('Verified',check.size,check.n_frames,'frames',os.path.getsize(path),'bytes')


