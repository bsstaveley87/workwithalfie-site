/* Site motion (spec v1). Content is visible by default; hidden-then-reveal states are only added here, and only below the fold. */
(function(){
'use strict';
var d=document,w=window,H=d.documentElement,top=d.querySelector('header.top'),bar,post=d.querySelector('article.post'),tl=[].slice.call(d.querySelectorAll('.tl'));
var rm=w.matchMedia('(prefers-reduced-motion: reduce)').matches,ok=!rm&&'IntersectionObserver' in w;
if(post){bar=d.createElement('div');bar.className='progress';bar.setAttribute('aria-hidden','true');d.body.appendChild(bar);}
if(ok){H.classList.add('motion');tl.forEach(function(t){t.style.setProperty('--p',0);});}
var q=0;function tick(){q=0;var y=w.scrollY,vh=w.innerHeight;
 if(top)top.classList.toggle('scrolled',y>24);
 if(bar){var r=post.getBoundingClientRect(),p=Math.min(1,Math.max(0,(vh*.5-r.top)/r.height));bar.style.transform='scaleX('+p+')';}
 if(ok)tl.forEach(function(t){var r=t.getBoundingClientRect();t.style.setProperty('--p',Math.min(1,Math.max(0,(vh*.75-r.top)/r.height)).toFixed(3));});}
w.addEventListener('scroll',function(){if(!q)q=requestAnimationFrame(tick);},{passive:true});tick();
if(!ok)return;
function count(el){var to=+el.textContent,n=el.textContent.length,from=Math.pow(10,n-1),t0=0;
 function f(t){t0=t0||t;var k=Math.min(1,(t-t0)/700);el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f);}
 if(to>from){el.textContent=from;requestAnimationFrame(f);}}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);el.classList.add('in','play');
 [].forEach.call(el.querySelectorAll('[data-count]'),count);
 setTimeout(function(){el.classList.remove('rv','in');},1200);});},{rootMargin:'0px 0px -6% 0px'});
var vh=w.innerHeight;
[].forEach.call(d.querySelectorAll('.sec .label,.sec h2,.sec .intro-text,.card,.post-card,.steps>li,.final,.slack,.doc,.digest'),function(el){
 if(el.closest('.hero')||el.getBoundingClientRect().top<vh)return;
 var p=el.parentNode,i=[].indexOf.call(p.children,el);
 if(/card/.test(el.className)||p.classList.contains('steps'))el.classList.add('d'+Math.min(i,4));
 el.classList.add('rv');io.observe(el);});
})();
