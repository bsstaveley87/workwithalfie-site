/* Home page motion: the live holding-page hero queue and flow strip (unchanged), section reveal retargeted to v1 sections. */
(function(){
  'use strict';
  var d=document,R=d.documentElement;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  R.classList.add('motion');
  function once(els,fn,opt){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);fn(e.target);}});},opt||{threshold:.15});els.forEach(function(el){io.observe(el);});}
  // Section reveal
  var rv=[].slice.call(d.querySelectorAll('.sec .label,.sec h2,.card,.final'));
  rv.forEach(function(el,i){el.classList.add('rv');if(el.classList.contains('card'))el.style.transitionDelay=(i%3)*90+'ms';});
  once(rv,function(el){el.classList.add('in');});
  // Flow strip
  var steps=[].slice.call(d.querySelectorAll('.flow li'));
  once([d.querySelector('.flow')],function(){steps.forEach(function(li,i){setTimeout(function(){steps.forEach(function(x){x.classList.remove('now');});li.classList.add('lit','now');if(i===steps.length-1)setTimeout(function(){li.classList.remove('now');},700);},250+i*450);});},{threshold:.6});
  // Hero work queue: two passes, then it stops on the full state. Rows never empty out.
  var q=d.querySelector('.queue');if(!q)return;
  var L={CHECKING:'s-check',DONE:'s-done','NEEDS APPROVAL':'s-approve'};
  var rows=[].slice.call(q.querySelectorAll('li')).map(function(li){
    var orig=li.querySelector('.status'),fin=orig.textContent.trim(),w=d.createElement('span'),p={};
    w.className='pills';w.setAttribute('aria-hidden','true');
    (fin==='CHECKING'?['CHECKING']:['CHECKING',fin]).forEach(function(t){var s=d.createElement('span');s.className='status '+L[t];s.textContent=t;w.appendChild(s);p[t]=s;});
    orig.className+=' sr-only';li.appendChild(w);return{li:li,p:p,fin:fin};});
  function pill(r,t){for(var k in r.p)r.p[k].classList.toggle('on',k===t);}
  function full(){rows.forEach(function(r){r.li.classList.remove('scan','ok');pill(r,r.fin);});}
  var T=[],running=false,userPaused=false,passes=2,vis=false;
  var ICON_PAUSE='<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false"><rect x="2" y="1.5" width="2.6" height="9" rx=".6" fill="currentColor"/><rect x="7.4" y="1.5" width="2.6" height="9" rx=".6" fill="currentColor"/></svg>';
  var ICON_PLAY='<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false"><path d="M3 1.6v8.8a.6.6 0 0 0 .9.5l7-4.4a.6.6 0 0 0 0-1L3.9 1.1a.6.6 0 0 0-.9.5z" fill="currentColor"/></svg>';
  var tg=d.createElement('button');tg.type='button';tg.className='q-toggle';
  q.querySelector('.queue-head').appendChild(tg);
  function label(){var t=running?'Pause animation':'Play animation';tg.setAttribute('aria-label',t);tg.title=t;tg.innerHTML=running?ICON_PAUSE:ICON_PLAY;}
  function at(ms,f){T.push(setTimeout(f,ms));}
  function step(r,ms,dur){
    at(ms,function(){r.li.classList.remove('ok','scan');r.li.style.setProperty('--d',dur+'ms');pill(r,'CHECKING');void r.li.offsetWidth;r.li.classList.add('scan');});
    at(ms+dur+100,function(){r.li.classList.add('ok');pill(r,r.fin);});}
  function pass(){
    step(rows[0],300,1100);step(rows[1],1800,1100);step(rows[2],3300,2200);step(rows[3],4800,1100);
    at(7400,function(){passes--;if(passes>0)pass();else stop();});}
  function start(){if(running||passes<=0)return;running=true;q.classList.remove('paused');label();pass();}
  function stop(){T.forEach(clearTimeout);T=[];running=false;q.classList.add('paused');full();label();}
  tg.addEventListener('click',function(){
    if(running){userPaused=true;stop();}
    else{userPaused=false;if(passes<=0)passes=2;start();}});
  function sync(){if(vis&&!d.hidden){if(!userPaused)start();}else if(running)stop();}
  q.classList.add('paused');full();label();
  new IntersectionObserver(function(es){vis=es[0].isIntersecting;sync();},{threshold:.2}).observe(q);
  d.addEventListener('visibilitychange',sync);
})();
