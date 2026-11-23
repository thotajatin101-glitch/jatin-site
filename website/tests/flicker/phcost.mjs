// node phcost.mjs [tag] → GPU time of each PhoneFX draw (gl.finish) on a phone-sized page: entrance, open, chat zoom, a key press
import { serve } from '../serve.mjs';
import pw from '../browsers/node_modules/playwright/index.js';
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const srv=await serve('127.0.0.1'),base=`http://127.0.0.1:${srv.address().port}/`;
const b=await pw.chromium.launch({args:['--ignore-gpu-blocklist','--enable-gpu','--use-angle=metal']});
const ctx=await b.newContext({viewport:{width:412,height:780},deviceScaleFactor:2.625,hasTouch:true,isMobile:true});
await ctx.addInitScript(()=>{window.__ph=[];const d=WebGLRenderingContext.prototype.drawArrays;
  WebGLRenderingContext.prototype.drawArrays=function(...a){const c=this.canvas;if(!c||!/phCv/.test(c.className))return d.apply(this,a);
    const t=performance.now();d.apply(this,a);this.readPixels(0,0,1,1,this.RGBA,this.UNSIGNED_BYTE,new Uint8Array(4));window.__ph.push([performance.now()|0,+(performance.now()-t).toFixed(1),c.width+'x'+c.height]);};});
const page=await ctx.newPage();page.on('pageerror',e=>console.log('PAGEERR',e.message));
await page.goto(base);await page.waitForSelector('#pressAny');
for(let i=0;i<60&&!(await page.evaluate(()=>document.body.classList.contains('menu')&&!!document.querySelector('#m-about.done,#m-about.sel')));i++){if(!(await page.evaluate(()=>document.body.classList.contains('menu'))))await page.keyboard.press('x');await sleep(300);}
await sleep(4000);
const mark=async(l)=>{const n=await page.evaluate(()=>{const a=window.__ph;window.__ph=[];return a;});if(!n.length)return console.log(l.padEnd(12),'no draws');const ms=n.map(x=>x[1]).sort((a,b)=>a-b);
  console.log(l.padEnd(12),`${n.length} draws  median ${ms[ms.length>>1]}ms  max ${ms[ms.length-1]}ms  size ${n[n.length-1][2]}`);};
await page.evaluate(()=>window.__ph=[]);
await page.locator('#m-contact').tap();await sleep(4500);await mark('entrance');
const box=await page.evaluate(()=>{const r=document.querySelector('#sec-contact .phCv').getBoundingClientRect();return [r.x+r.width/2,r.y+r.height*.56];});
await page.touchscreen.tap(box[0],box[1]);await sleep(2500);await mark('flip open');
await page.touchscreen.tap(box[0],box[1]);await sleep(2500);await mark('zoom+chat');
const st=await page.evaluate(()=>{const b=[...document.querySelectorAll('.phChat button')].find(x=>/START/.test(x.textContent));return b?(b.click(),1):0;});
await sleep(1500);await mark('START');
await b.close();srv.close();
