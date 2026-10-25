'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],A=k=>`assets/${k}.png`;
const NW=['','واحد','اثنان','ثلاثة','أربعة','خمسة','ستة','سبعة','ثمانية','تسعة','عشرة'];
const NF=['','واحدة','اثنتان','ثلاث','أربع','خمس','ست','سبع','ثماني','تسع','عشر'];
const COL={red:['حمراء','حمراوين','#e8333a','الحمراء'],yellow:['صفراء','صفراوين','#ffc21a','الصفراء'],green:['خضراء','خضراوين','#2fb344','الخضراء'],orange:['برتقالية','برتقاليتين','#ff8c1a','البرتقالية'],purple:['بنفسجية','بنفسجيتين','#8e44c9','البنفسجية']};
const K={apple:['تفاحة','تفاحتين','تفاحات','red'],apple_g:['تفاحة','تفاحتين','تفاحات','green'],banana:['موزة','موزتين','موزات','yellow'],orange:['برتقالة','برتقالتين','برتقالات','orange'],strawberry:['حبة فراولة','حبتي فراولة','حبات فراولة','red'],grape:['حبة عنب','حبتي عنب','حبات عنب','purple'],grape_g:['حبة عنب','حبتي عنب','حبات عنب','green'],pear:['كمثراة','كمثراتين','كمثريات','green'],pineapple:['أناناسة','أناناستين','أناناسات','yellow'],
carrot:['جزرة','جزرتين','جزرات','orange'],cucumber:['خيارة','خيارتين','خيارات','green'],tomato:['طماطمة','طماطمتين','طماطمات','red'],pepper_y:['حبة فلفل','حبتي فلفل','حبات فلفل','yellow'],pepper_r:['حبة فلفل','حبتي فلفل','حبات فلفل','red'],pepper_g:['حبة فلفل','حبتي فلفل','حبات فلفل','green'],corn:['ذرة','ذرتين','ذرات','yellow'],broccoli:['زهرة بروكلي','زهرتي بروكلي','زهرات بروكلي','green']};
const V=['carrot','cucumber','tomato','pepper_y','pepper_r','pepper_g','corn','broccoli'];
// c = عدّ ولون | k = أكمل الطلب (المطلوب/الموجود) | s = سلة الألوان | + عناصر مشتتة
const LV=[
['c apple:1 +banana','c banana:1 +apple','c apple:2 +banana','c banana:2 +apple','c strawberry:2 +banana'],
['c apple:2,banana:1 +apple_g','c pear:3 +banana','c banana:2,strawberry:1 +apple_g','c apple_g:2,orange:1 +apple','c apple:1,banana:1,pear:1'],
['c apple:3 +apple_g,banana','c banana:2 +apple,apple_g,orange','c apple_g:4 +apple,banana','c strawberry:3 +banana,orange,pear','c orange:5 +banana,apple'],
['c orange:4 +banana,pineapple','c strawberry:5 +apple,grape','c pear:4 +apple_g,grape_g','c grape:4 +grape_g,strawberry','c pineapple:3 +banana,orange'],
['c carrot:3 +cucumber,tomato','c tomato:4 +pepper_r,carrot','s red,green,orange v','c cucumber:2 +broccoli,pepper_g','s yellow,green,red v'],
['c apple:2,banana:3 +orange','c strawberry:3,orange:2 +apple','c grape:4,pear:2 +grape_g','c banana:4,apple_g:1 +pear','c pineapple:2,strawberry:4 +orange'],
['c apple_g:3,apple:2','c grape_g:4 +grape,pear','c apple:4 +apple_g,strawberry,tomato','c apple_g:2,pear:3 +apple','c pepper_g:3 +cucumber,broccoli'],
['c apple:6 +apple_g','c banana:7 +pear','c orange:8 +apple','c strawberry:9 +grape','c apple:10 +apple_g'],
['k apple:4/2','c apple:3,banana:2,orange:1 +apple_g','k strawberry:5/3','c carrot:2,tomato:3,corn:1 +cucumber','c banana:3,grape:2,pear:4'],
['c strawberry:4,banana:2 +apple','s red,yellow,green','k orange:6/4','c apple:3,carrot:2,corn:3 +pepper_r','c apple:5,banana:4,strawberry:3 +orange,pear']];
const PR=['رائع! أحسنت يا بطل!','ممتاز! أصبح الطبق جاهزًا!','رائع! لقد أصبحت طاهيًا ماهرًا!','أحسنت! عمل جميل!'];
const S={lv:0,r:0,stars:0,snd:1,mus:1};let R={},ctx,speaking,chefT;
const VA={};let vq=0,PRE=[];
const NUMC=n=>13+n,COLC={red:24,yellow:25,green:26,orange:27,purple:29},COLLINE={red:31,yellow:32,green:33,orange:34,purple:36},
NAMEC={apple:[38],apple_g:[38,26],banana:[39],orange:[40],strawberry:[41],grape:[42,29],grape_g:[42,26],pear:[44,26],pineapple:[45],carrot:[46],cucumber:[47],tomato:[49],pepper_y:[48],pepper_r:[50],pepper_g:[51],corn:[52],broccoli:[53]},
PLAIN={'apple:1':56,'banana:2':57,'apple:3':58,'orange:4':59,'strawberry:5':60},COLORED={'apple:3':66,'banana:2':67,'strawberry:4':68,'apple_g:3':69,'orange:5':70};
function stopVo(){vq++;Object.values(VA).forEach(a=>a.pause())}
function vo(ids){stopVo();if(!S.snd||!ids||!ids.length)return;const t=vq;let i=0;const nx=()=>{if(t!=vq||i>=ids.length)return;const id=ids[i++];const a=VA[id]||(VA[id]=new Audio(`assets/voice/${id}.mp3`));try{a.currentTime=0}catch(e){}a.onended=()=>setTimeout(nx,100);a.play().catch(()=>{})};nx()}
function orderClips(){const ks=Object.keys(R.need);if(R.t=='k'){const k=ks[0];return [6,NUMC(R.need[k]),...NAMEC[k]]}
const key=ks.map(k=>k+':'+R.need[k]).join(',');if(ks.length==1&&(S.lv>=2?COLORED[key]||PLAIN[key]:PLAIN[key]))return [S.lv>=2?COLORED[key]||PLAIN[key]:PLAIN[key]];
if(key=='apple:2,banana:3')return [71];let c=ks.length>1&&ks.every(k=>!V.includes(k))?[75]:[6];ks.forEach(k=>c.push(NUMC(R.need[k]),...NAMEC[k]));return c}
const mus={play(){if(this.t)return Promise.resolve();const P=[523,587,659,784,880,784,659,587];let i=0;this.t=setInterval(()=>{if(!S.mus)return;tone(P[i%8]*(i%16<8?1:.75),0,.5,'triangle',.035,1);if(i%4==0)tone(131,0,.9,'sine',.05,1);i++},480);return Promise.resolve()},pause(){clearInterval(this.t);this.t=0}};
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
// ---- الصوت
function tone(f,t=0,d=.15,type='sine',v=.12,force=0){if(!S.snd&&!force)return;try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),g=ctx.createGain(),n=ctx.currentTime+t;o.type=type;o.frequency.value=f;g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g).connect(ctx.destination);o.start(n);o.stop(n+d)}catch(e){}}
const sfx={pick:()=>tone(660,0,.08),drop:()=>{tone(440,0,.1);tone(660,.08,.12)},win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,i*.12,.25,'triangle')),soft:()=>tone(330,0,.2)};
function say(t,c){setTxt(t);if(c)vo(c)}
function setTxt(t){$('#txt').textContent=t}
function chef(n,ms=2200){$('#chef').src=A(n);clearTimeout(chefT);chefT=setTimeout(()=>$('#chef').src=A('chef_happy'),ms)}
// ---- الواجهة
function tools(){$$('.tools').forEach(d=>{d.innerHTML='<button class="ib" data-t="snd"><img src="assets/sound.png" alt="الصوت"></button><button class="ib" data-t="mus"><img src="assets/music.png" alt="الموسيقى"></button><button class="ib" data-t="help"><img src="assets/help.png" alt="مساعدة"></button><button class="ib" data-t="rst"><img src="assets/replay.png" alt="إعادة"></button>'});
$$('[data-t]').forEach(b=>b.onclick=()=>{const t=b.dataset.t;if(t=='snd'){S.snd^=1;if(!S.snd)stopVo()}if(t=='mus'){S.mus^=1;S.mus?mus.play():mus.pause()}if(t=='help'){$('#help').classList.add('on');vo([3])};if(t=='rst'){S.lv=0;S.r=0;S.stars=0;hud();show('home')}
$$('[data-t=snd]').forEach(x=>x.classList.toggle('off',!S.snd));$$('[data-t=mus]').forEach(x=>x.classList.toggle('off',!S.mus))})}
function show(id){$$('.scr').forEach(s=>s.classList.toggle('on',s.id==id));$('#ov').classList.remove('on')}
function hud(){$$('.st').forEach(e=>e.textContent=S.stars);$$('.lvn').forEach(e=>e.textContent=S.lv+1);$$('.dots').forEach(d=>d.innerHTML=[0,1,2,3,4].map(i=>`<i class="${i<S.r?'on':''}"></i>`).join(''))}
function phrase(k,n){const[o,t,m,c]=K[k],cl=COL[c];return n==1?`${o} واحدة ${cl[0]}`:n==2?`${t} ${cl[1]}`:`${NF[n]} ${m} ${cl[0]}`}
// ---- بناء الجولة
function start(){const sp=LV[S.lv][S.r].split(' '),t=sp[0];R={t,need:{},pre:{},got:{},placed:0,total:0,sel:null,busy:0,cols:[]};hud();
const stage=$('#stage'),shelf=$('#shelf'),plate=$('#plate');shelf.innerHTML='';plate.querySelectorAll('.it').forEach(e=>e.remove());$('#baskets').innerHTML='';stage.classList.toggle('sort',t=='s');
let keys=[];
if(t=='s'){R.cols=sp[1].split(',');const pool=Object.keys(K).filter(k=>(sp[2]=='v')==V.includes(k));R.cols.forEach(c=>{const p=shuf(pool.filter(k=>K[k][3]==c));for(let i=0;i<3;i++)keys.push(p[i%p.length])});R.total=keys.length;
R.cols.forEach(c=>{const b=document.createElement('div');b.className='basket';b.dataset.c=c;b.dataset.n=0;b.innerHTML=`<img src="${A('b_'+(c=='orange'?'orange':c))}" alt=""><b>0</b>`;b.onclick=()=>R.sel&&drop(R.sel,b);$('#baskets').appendChild(b)});
const nm=R.cols.map(c=>`السلة ${COL[c][3]}`);R.clips=[6,...R.cols.map(c=>COLC[c])];say(`هيا نرتّب! ضع كل ${sp[2]=='v'?'خضار':'فاكهة'} في السلة المناسبة لونها. ${nm.join(' و')}.`,PRE.concat(S.r==0&&!PRE.length?[4]:[],R.clips));PRE=[]}
else{sp[1].split(',').forEach(x=>{const[k,r]=x.split(':'),[n,p]=r.split('/');R.need[k]=+n;R.got[k]=0;if(p)R.pre[k]=+p;keys.push(...Array(+n-(+p||0)+2).fill(k))});
(sp[2]||'').slice(1).split(',').filter(Boolean).forEach(k=>keys.push(k,k));
const txt=Object.keys(R.need).map(k=>phrase(k,R.need[k])).join(' و');
if(t=='k'){const k=Object.keys(R.need)[0];R.clips=orderClips();say(`لدينا ${phrase(k,R.pre[k])} في الطبق، ونحتاج إلى ${phrase(k,R.need[k])}. كم نضيف؟ هيا نكمل!`,PRE.concat(R.clips));PRE=[]}
else{R.clips=orderClips();say(['هيا يا طاهي الصغير! ','لنعدّ معًا! ',''][S.r%3]+`ضع ${txt} في الطبق!`,PRE.concat(S.r==0&&!PRE.length?[4]:[],R.clips));PRE=[]}
$('#needs').innerHTML=Object.keys(R.need).map(k=>`<div class="need"><b>${R.need[k]}</b><img src="${A(k)}" alt=""><i style="background:${COL[K[k][3]][2]}"></i></div>`).join('')}
if(t=='s')$('#needs').innerHTML=R.cols.map(c=>`<div class="need"><i style="background:${COL[c][2]};width:34px;height:34px"></i></div>`).join('');
shelf.style.setProperty('--sz',(keys.length<=6?96:keys.length<=10?78:keys.length<=14?66:56)+'px');$('#plate').style.setProperty('--ps',(Object.values(R.need).reduce((a,b)=>a+b,0)>6?44:62)+'px');
Object.keys(R.pre).forEach(k=>{for(let i=0;i<R.pre[k];i++){const e=mk(k);plate.appendChild(e);R.got[k]++}});
shuf(keys).forEach(k=>shelf.appendChild(mk(k)));cnt();show('game');chef('chef_wink',1800)}
function mk(k){const e=new Image();e.src=A(k);e.className='it';e.dataset.k=k;e.draggable=false;e.onpointerdown=dn;return e}
function cnt(){$('#cnt').textContent=R.t=='s'?'':`${Object.values(R.got).reduce((a,b)=>a+b,0)} من ${Object.values(R.need).reduce((a,b)=>a+b,0)}`}
// ---- النقر والسحب
function dn(e){if(R.busy)return;const el=e.currentTarget,x0=e.clientX,y0=e.clientY;let g,mv=0;sfx.pick();
const m=ev=>{if(!mv&&Math.hypot(ev.clientX-x0,ev.clientY-y0)>10&&!el.parentNode.matches('#plate')){mv=1;g=el.cloneNode();g.className='drag';document.body.appendChild(g);el.style.opacity=.3}if(g){g.style.left=ev.clientX+'px';g.style.top=ev.clientY+'px'}};
const u=ev=>{removeEventListener('pointermove',m);removeEventListener('pointerup',u);removeEventListener('pointercancel',u);el.style.opacity='';g&&g.remove();
if(mv){const tg=document.elementFromPoint(ev.clientX,ev.clientY);const z=tg&&tg.closest('#cloth,.basket');if(z)drop(el,z)}
else if(el.parentNode.id=='plate'){$('#shelf').appendChild(el);R.got[el.dataset.k]--;cnt()}
else if(R.t=='s'){$$('.it.sel').forEach(x=>x.classList.remove('sel'));R.sel=el;el.classList.add('sel')}
else drop(el,$('#cloth'))};
addEventListener('pointermove',m);addEventListener('pointerup',u);addEventListener('pointercancel',u)}
function nope(el,t,c){el.classList.add('no');setTimeout(()=>el.classList.remove('no'),450);sfx.soft();chef('chef_think');say(t,c)}
function drop(el,z){if(R.busy)return;const k=el.dataset.k;
if(R.t=='s'){const c=K[k][3];if(z.dataset.c!=c)return nope(el,`لنجرّب سلة أخرى! هذه من الألوان ${COL[c][3]}.`,[COLLINE[c]]);el.remove();R.sel=null;R.placed++;z.dataset.n++;z.querySelector('b').textContent=z.dataset.n;z.classList.add('ready');setTimeout(()=>z.classList.remove('ready'),300);sfx.drop();say(NW[+z.dataset.n],[NUMC(+z.dataset.n)]);if(R.placed==R.total)win();return}
if(!z.matches('#cloth'))return;const n=R.need[k];
if(!n){const t=Object.keys(R.need).find(q=>R.got[q]<R.need[q]);return nope(el,`لنبحث عن ${phrase(t,R.need[t])}!`,[6])}
if(R.got[k]>=n)return nope(el,'لدينا ما يكفي من هذا النوع!',[9]);
$('#plate').appendChild(el);R.got[k]++;sfx.drop();cnt();const tot=Object.values(R.got).reduce((a,b)=>a+b,0);say(NW[tot],[NUMC(tot)]);
if(Object.keys(R.need).every(q=>R.got[q]==R.need[q]))win()}
function win(){R.busy=1;S.stars++;hud();sfx.win();chef('chef_cheer',3000);setTimeout(()=>say(PR[Math.random()*4|0],[R.t=='s'?37:76+(Math.random()*3|0)]),700);
for(let i=0;i<16;i++){const c=new Image();c.src=A('star1');c.className='conf';c.style.left=Math.random()*95+'vw';c.style.animationDelay=Math.random()*.6+'s';document.body.appendChild(c);setTimeout(()=>c.remove(),3000)}
setTimeout(()=>{$('#dish').src=A('d'+(1+(S.lv*5+S.r)%6));$('#ov').classList.add('on')},1500)}
function next(){$('#ov').classList.remove('on');S.r++;if(S.r==5){S.r=0;S.lv++;PRE=[11]}else if(S.r%2==0)PRE=[10];if(S.lv==10){S.lv=9;S.r=4;hud();sfx.win();show('end');say('أحسنت يا بطل! لقد أصبحت شيفًا صغيرًا!',[77,11]);return}start()}
// ---- الأزرار
$('#go').onclick=()=>{if(S.mus)mus.play();S.lv=0;S.r=0;PRE=[0,2];start()};
$('#rep').onclick=()=>vo(R.clips);
$('#next').onclick=next;$('#hx').onclick=()=>$('#help').classList.remove('on');
$('#homeB').onclick=()=>{vo([13]);$('#ov').classList.remove('on');show('home')};
$('#pick').onclick=$('#pick2').onclick=()=>show('levels');$('#lvBack').onclick=()=>show('home');
$('#again').onclick=()=>{S.lv=0;S.r=0;S.stars=0;start()};
const cc=['#e8333a','#2d7ff0','#2fb344','#ffb400','#8e44c9','#e84a9a','#17b8d4','#9b59d0','#ff8c1a','#1e6fd9'];
$('#grid').innerHTML=cc.map((c,i)=>`<button style="background:${c}" data-i="${i}">${i+1}</button>`).join('');
$$('#grid button').forEach(b=>b.onclick=()=>{S.lv=+b.dataset.i;S.r=0;if(S.mus)mus.play();start()});
tools();hud();

[...[6,9,3,76,77,78,37,11,10],...Array.from({length:10},(_,i)=>14+i)].forEach(id=>{const a=VA[id]=new Audio(`assets/voice/${id}.mp3`);a.preload='auto'});
