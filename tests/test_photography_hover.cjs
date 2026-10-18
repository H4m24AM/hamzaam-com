const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
class Element {
  constructor(tag='div') { this.tagName=tag.toUpperCase(); this.handlers={};this.attrs={};this.children=[];this.hidden=false;this.tabIndex=-1;this.complete=true;this.naturalWidth=800;this.classList={contains:()=>false,add:()=>{},remove:()=>{}}; }
  setAttribute(k,v){this.attrs[k]=v;} getAttribute(k){return this.attrs[k]||null;}
  removeAttribute(k){delete this[k];} append(...items){this.children.push(...items);}
  addEventListener(k,f){this.handlers[k]=f;} querySelector(){return null;}
  closest(){return null;} focus(){this.focused=true;}
  showModal(){this.open=true;} close(){this.open=false;this.handlers.close?.();}
}
const target=new Element();const hero=new Element();hero.classList.contains=n=>n==='ph-hero';
const body=new Element('body');const docEvents={};let pending;let delay;
const context={document:{body,createElement:t=>new Element(t),querySelectorAll:()=>[target,hero],addEventListener:(n,f)=>docEvents[n]=f},window:{matchMedia:()=>({matches:true,addEventListener(){}}),addEventListener(){}},getComputedStyle:()=>({backgroundImage:'url("photo.jpg")'}),setTimeout:(fn,ms)=>{pending=fn;delay=ms;return 1;},clearTimeout:()=>{pending=null;}};
vm.runInNewContext(fs.readFileSync('js/photography-hover.js','utf8'),context);
const [preview,dialog]=body.children;
target.handlers.pointerenter({pointerType:'mouse'});
assert.equal(delay,1000);assert.equal(preview.hidden,true);pending();assert.equal(preview.hidden,false);
target.handlers.pointerenter({pointerType:'mouse'});target.handlers.pointerleave();assert.equal(pending,null);assert.equal(preview.hidden,true);
let prevented=false;target.handlers.click({target,preventDefault(){prevented=true;},stopPropagation(){}});
assert.equal(prevented,true);assert.equal(dialog.open,true);assert.equal(preview.hidden,true);
dialog.children[0].handlers.click();assert.equal(dialog.open,false);assert.equal(target.focused,true);
target.handlers.keydown({target,key:'Enter',preventDefault(){},stopPropagation(){}});assert.equal(dialog.open,true);dialog.close();
hero.handlers.click({target:{closest:()=>({})},preventDefault(){throw Error('Hero link blocked');}});
console.log('Passed: 1-second hover, cancellation, click viewer, close/focus, keyboard open, and hero-link preservation.');
