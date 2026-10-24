/* Shared behaviour for every page: Book a call CTAs from /assets/config.js, mobile nav, Product dropdown. */
(function () {
  'use strict';
  var d = document;
  var cfg = window.ALFIE || {};
  var url = cfg.bookCallUrl || '/book/';
  var label = cfg.bookCallLabel || 'Book a call';

  // Old holding-page links to /#contact now go to the contact page.
  if ((location.pathname === '/' || location.pathname === '/index.html') && location.hash === '#contact') {
    location.replace('/book/');
    return;
  }

  // Every CTA is <a data-cta href="/book/">. Rewrite href and label from the one setting.
  var external = false;
  try { external = new URL(url, location.href).origin !== location.origin; } catch (e) { /* relative */ }
  [].forEach.call(d.querySelectorAll('a[data-cta]'), function (a) {
    a.setAttribute('href', url);
    a.textContent = label;
    if (external) a.setAttribute('rel', 'noopener');
  });

  // Mobile menu
  var toggle = d.querySelector('.nav-toggle');
  var nav = d.getElementById('site-nav');
  function setMenu(open) {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
    var mq = window.matchMedia('(min-width: 1101px)');
    var onMq = function () { if (mq.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  }

  // Product dropdown (desktop). On mobile the same list shows as a group.
  [].forEach.call(d.querySelectorAll('.dd'), function (dd) {
    var btn = dd.querySelector('.dd-btn');
    if (!btn) return;
    function setDD(open) { btn.setAttribute('aria-expanded', open ? 'true' : 'false'); dd.classList.toggle('open', open); }
    btn.addEventListener('click', function () { setDD(btn.getAttribute('aria-expanded') !== 'true'); });
    dd.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { e.stopPropagation(); setDD(false); btn.focus(); }
    });
    dd.addEventListener('focusout', function (e) { if (!dd.contains(e.relatedTarget)) setDD(false); });
    d.addEventListener('click', function (e) { if (!dd.contains(e.target)) setDD(false); });
  });
})();
