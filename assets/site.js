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

  // Header menus are <details> elements, so they open and close without JS. This adds:
  // Escape to close (focus back on the summary), outside click and focus-out closing,
  // one dropdown at a time, scroll lock while the mobile menu is open, and closing the mobile
  // menu when the window grows past the mobile breakpoint.
  var menus = [].slice.call(d.querySelectorAll('header .dd-details, header .menu'));
  var menu = d.getElementById('menu');
  function close(m, focus) { if (!m.open) return; m.open = false; if (focus) m.querySelector('summary').focus(); }
  menus.forEach(function (m) {
    m.addEventListener('toggle', function () {
      if (m.open) menus.forEach(function (o) { if (o !== m && !o.contains(m)) close(o); });
      if (m === menu) d.documentElement.classList.toggle('menu-open', m.open);
    });
    m.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !m.open) return;
      e.stopPropagation(); close(m, true);
    });
    if (m.classList.contains('dd-details')) m.addEventListener('focusout', function (e) { if (e.relatedTarget && !m.contains(e.relatedTarget)) close(m); });
  });
  // FAQ contents links: open the targeted question (the link still jumps to it without JS).
  var openHash = function () {
    var id = location.hash ? decodeURIComponent(location.hash.slice(1)) : '';
    var t = id && d.getElementById(id);
    if (t && t.tagName === 'DETAILS') t.open = true;
  };
  openHash();
  window.addEventListener('hashchange', openHash);

  d.addEventListener('click', function (e) { menus.forEach(function (m) { if (!m.contains(e.target)) close(m); }); });
  var mq = window.matchMedia('(min-width: 1081px)');
  var onMq = function () { if (mq.matches && menu) close(menu); };
  if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
})();
