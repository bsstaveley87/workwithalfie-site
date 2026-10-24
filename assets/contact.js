/* Contact form: the live holding-page script, unchanged (endpoint, site key, field names, token, Turnstile lazy-load). */
  const FORM_ENDPOINT = 'https://alfie-contact-form.workwithalfie.workers.dev';
  const TURNSTILE_SITE_KEY = '0x4AAAAAAFf_Ib3Xi9XIotm7';

  (function () {
    'use strict';
    var MSG = {
      sending: 'Sending…',
      error: "That didn't send. Please try again, or email ben@workwithalfie.com.",
      turnstile: 'Please complete the check above and try again.',
      name: 'Please add your name.',
      email: 'Please add a work email we can reply to.',
      company: 'Please add your company.',
      message: "Please tell us a little about what's breaking."
    };
    var EMAIL_RE = /^[^\s@<>"',;:]+@[^\s@<>"',;:]+\.[^\s@<>"',;:]{2,}$/;
    var form = document.getElementById('contact-form');
    var btn = document.getElementById('submit-btn');
    var statusEl = document.getElementById('form-status');
    var successEl = document.getElementById('form-success');
    var tsEl = document.getElementById('turnstile');
    var tsErr = document.getElementById('e-turnstile');
    var fields = ['name', 'email', 'company', 'message'];
    var token = '';
    var busy = false;
    // A submit made before the check has finished is held here and sent from
    // the success callback, so the visitor only has to click Send once.
    var pending = false, pendingTimer = null;
    var tsFailed = false; // the check's script could not load (e.g. blocked)

    window.alfieTurnstileOk = function (t) {
      token = t;
      tsErr.textContent = '';
      if (pending) { pending = false; clearTimeout(pendingTimer); send(t); }
    };
    window.alfieTurnstileExpired = function () { token = ''; };
    window.alfieTurnstileError = function () { token = ''; cancelPending(MSG.turnstile); };
    window.alfieTurnstileTimeout = function () {
      token = '';
      try { if (window.turnstile) window.turnstile.reset(tsEl); } catch (e) { /* widget not ready */ }
      cancelPending(MSG.turnstile);
    };

    tsEl.setAttribute('data-sitekey', TURNSTILE_SITE_KEY);
    tsEl.setAttribute('data-callback', 'alfieTurnstileOk');
    tsEl.setAttribute('data-expired-callback', 'alfieTurnstileExpired');
    tsEl.setAttribute('data-error-callback', 'alfieTurnstileError');
    tsEl.setAttribute('data-timeout-callback', 'alfieTurnstileTimeout');
    tsEl.setAttribute('data-action', 'contact');
    if (tsEl.parentNode.clientWidth < 300) tsEl.setAttribute('data-size', 'compact');
    // Load Turnstile only when the contact section nears the viewport, or on the
    // first interaction with the form, whichever comes first. No idle/timer fallback.
    var tsLoaded = false, tsIO = null;
    function loadTurnstile() {
      if (tsLoaded) return;
      tsLoaded = true;
      if (tsIO) { tsIO.disconnect(); tsIO = null; }
      ['focusin', 'pointerdown', 'touchstart', 'keydown', 'input'].forEach(function (t) { form.removeEventListener(t, loadTurnstile, true); });
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      s.defer = true;
      s.onerror = function () {
        tsFailed = true;
        if (pending) cancelPending(); // nothing was sent
        setStatus(MSG.error, 'error'); // shows the ben@workwithalfie.com fallback
      };
      document.head.appendChild(s);
    }
    ['focusin', 'pointerdown', 'touchstart', 'keydown', 'input'].forEach(function (t) { form.addEventListener(t, loadTurnstile, { capture: true, passive: true }); });
    if ('IntersectionObserver' in window) {
      tsIO = new IntersectionObserver(function (es) {
        if (es.some(function (e) { return e.isIntersecting; })) loadTurnstile();
      }, { rootMargin: '200px 0px' });
      tsIO.observe(document.getElementById('contact'));
    } else {
      loadTurnstile();
    }

    function resetTurnstile() {
      token = '';
      try { if (window.turnstile) window.turnstile.reset(tsEl); } catch (e) { /* widget not ready */ }
    }
    function setFieldError(name, text) {
      var input = form.elements[name];
      document.getElementById('e-' + name).textContent = text || '';
      if (text) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    }
    function setStatus(text, kind) {
      statusEl.textContent = text || '';
      statusEl.className = 'form-status' + (kind ? ' is-' + kind : '');
    }
    function setSending(on) {
      busy = on;
      btn.disabled = on;
      btn.textContent = on ? MSG.sending : 'Send';
      if (on) { setStatus(MSG.sending); statusEl.classList.add('sr-only'); } // screen readers only; button shows Sending…
    }
    function cancelPending(msg) {
      if (!pending) return;
      pending = false;
      clearTimeout(pendingTimer);
      setStatus('');
      setSending(false);
      if (msg) tsErr.textContent = msg;
    }
    function values() {
      var v = {};
      fields.forEach(function (f) { v[f] = form.elements[f].value.trim(); });
      return v;
    }
    function validate(v) {
      var bad = [];
      if (!v.name) bad.push('name');
      if (!v.email || !EMAIL_RE.test(v.email)) bad.push('email');
      if (!v.company) bad.push('company');
      if (!v.message) bad.push('message');
      fields.forEach(function (f) { setFieldError(f, bad.indexOf(f) > -1 ? MSG[f] : ''); });
      return bad;
    }
    function currentToken() {
      if (token) return token;
      try { if (window.turnstile) return window.turnstile.getResponse(tsEl) || ''; } catch (e) { /* none */ }
      var hidden = form.querySelector('input[name="cf-turnstile-response"]');
      return hidden ? hidden.value : '';
    }

    fields.forEach(function (f) {
      form.elements[f].addEventListener('input', function () {
        if (form.elements[f].getAttribute('aria-invalid') === 'true') validate(values());
      });
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (busy) return;
      setStatus('');
      tsErr.textContent = '';
      var bad = validate(values());
      if (bad.length) { form.elements[bad[0]].focus(); return; }
      if (tsFailed) { setStatus(MSG.error, 'error'); return; }
      var t = currentToken();
      if (t) { send(t); return; }
      // Check not finished yet: hold the submit and send it from the success callback.
      pending = true;
      setSending(true);
      loadTurnstile();
      pendingTimer = setTimeout(function () { cancelPending(MSG.turnstile); }, 30000);
    });

    function send(t) {
      var v = values();
      var bad = validate(v);
      if (bad.length) { setStatus(''); setSending(false); form.elements[bad[0]].focus(); return; }
      setSending(true);

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: v.name, email: v.email, company: v.company, message: v.message,
          website: form.elements.website.value, token: t
        })
      }).then(function (r) {
        return r.json().catch(function () { return { ok: false, error: 'bad_response' }; });
      }).then(function (data) {
        if (data && data.ok === true) {
          setStatus('');
          form.hidden = true;
          successEl.hidden = false;
          successEl.focus();
          return;
        }
        var code = (data && data.error) || '';
        setStatus('');
        if (code.indexOf('captcha_') === 0) {
          tsErr.textContent = MSG.turnstile;
        } else if (code === 'missing_fields' || code === 'field_too_long') {
          if (!validate(values()).length) setStatus(MSG.error, 'error');
        } else if (code === 'invalid_email') {
          setFieldError('email', MSG.email);
          form.elements.email.focus();
        } else {
          setStatus(MSG.error, 'error');
        }
        resetTurnstile();
      }).catch(function () {
        setStatus(MSG.error, 'error');
        resetTurnstile();
      }).then(function () {
        setSending(false);
      });
    }
  })();
