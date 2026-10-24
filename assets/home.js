/* Home motion (spec v1): hero work queue ticks QUEUED -> CHECKING -> final, one row needs approval and turns VERIFIED;
   flow strip draws in. Static HTML is the final state (JS off, reduced motion). Pause/play control kept. */
(function(){
  'use strict';
  var d=document;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  // Flow strip: line draws, steps light in turn, check mark at the end
  var fl=d.querySelector('.flow');
  if(fl)new IntersectionObserver(function(es,o){if(es[0].isIntersecting){o.disconnect();fl.classList.add('play');}},{threshold:.5}).observe(fl);
  // Hero work queue
  var q=d.querySelector('.queue');if(!q)return;
  var C={QUEUED:'s-queued',CHECKING:'s-check',DONE:'s-done','NEEDS APPROVAL':'s-approve',VERIFIED:'s-done'};
  var rows=[].slice.call(q.querySelectorAll('li')).map(function(li){
    var o=li.querySelector('.status'),fin=o.textContent.trim(),chip=li.querySelector('.chip'),
      seq=chip?['QUEUED','CHECKING','NEEDS APPROVAL','VERIFIED']:fin==='CHECKING'?['QUEUED','CHECKING']:['QUEUED','CHECKING',fin],
      w=d.createElement('span'),p={};
    w.className='pills';w.setAttribute('aria-hidden','true');
    seq.forEach(function(t){var s=d.createElement('span');s.className='status '+C[t]+(o.classList.contains('w14')?' w14':'');s.textContent=t;w.appendChild(s);p[t]=s;});
    o.classList.add('sr-only');li.appendChild(w);return{li:li,p:p,seq:seq,chip:chip};});
  function pill(r,t){for(var k in r.p)r.p[k].classList.toggle('on',k===t);}
  function reset(r,t){r.li.classList.remove('scan');pill(r,t);if(r.chip)r.chip.classList.toggle('hide',t!==r.seq[r.seq.length-1]);}
  var T=[],running=false,userPaused=false,passes=0,MAX=2,vis=false,STEP=600;
  var ICON_PAUSE='<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false"><rect x="2" y="1.5" width="2.6" height="9" rx=".6" fill="currentColor"/><rect x="7.4" y="1.5" width="2.6" height="9" rx=".6" fill="currentColor"/></svg>';
  var ICON_PLAY='<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false"><path d="M3 1.6v8.8a.6.6 0 0 0 .9.5l7-4.4a.6.6 0 0 0 0-1L3.9 1.1a.6.6 0 0 0-.9.5z" fill="currentColor"/></svg>';
  var tg=d.createElement('button');tg.type='button';tg.className='q-toggle';
  q.querySelector('.queue-head').appendChild(tg);
  function label(){var t=running?'Pause animation':'Play animation';tg.setAttribute('aria-label',t);tg.title=t;tg.innerHTML=running?ICON_PAUSE:ICON_PLAY;}
  function at(ms,f){T.push(setTimeout(f,ms));}
  function pass(){
    passes++;rows.forEach(function(r){reset(r,'QUEUED');});
    rows.forEach(function(r,i){var t0=250+i*500;
      r.seq.slice(1).forEach(function(s,k){
        at(t0+(k+1)*STEP,function(){pill(r,s);r.li.classList.toggle('scan',s==='CHECKING');
          if(s==='NEEDS APPROVAL')at(STEP*.6,function(){r.chip.classList.remove('hide');});});});});
    at(4200,function(){if(passes<MAX){at(7800,function(){if(vis)pass();else stop();});}else stop(true);});}
  function start(){if(running)return;running=true;q.classList.remove('paused');label();pass();}
  function stop(done){T.forEach(clearTimeout);T=[];running=false;q.classList.add('paused');rows.forEach(function(r){reset(r,r.seq[r.seq.length-1]);});label();if(done)passes=MAX;}
  tg.addEventListener('click',function(){if(running){userPaused=true;stop();}else{userPaused=false;passes=MAX-1;start();}});
  function sync(){if(vis&&!d.hidden){if(!userPaused&&passes<MAX)start();}else if(running)stop();}
  rows.forEach(function(r){reset(r,'QUEUED');});label();
  new IntersectionObserver(function(es){vis=es[0].isIntersecting;sync();},{threshold:.2}).observe(q);
  d.addEventListener('visibilitychange',sync);
})();
