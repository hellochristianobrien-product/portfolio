/* Email chooser for every "Email" button across the site.
   mailto: silently fails for people who read mail in the browser (Gmail,
   Outlook web) with no desktop client set. So instead of relying on it,
   each email button opens a tiny branded chooser: open a pre-filled Gmail
   compose, or copy the address. The buttons keep a real mailto (now with a
   subject) as a no-JS fallback. Reuses the .egg modal styles already in
   styles.css, so no stylesheet change. */
(function () {
  var EMAIL = 'hello.christianobrien@gmail.com';
  var SUBJECT = 'Saw your portfolio';
  var GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to='
    + encodeURIComponent(EMAIL) + '&su=' + encodeURIComponent(SUBJECT);

  var modal = document.createElement('div');
  modal.className = 'egg';
  modal.id = 'email-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'email-modal-title');
  modal.hidden = true;
  modal.innerHTML =
    '<div class="egg__overlay" data-email-close></div>'
    + '<div class="egg__card">'
    +   '<button class="egg__close" type="button" aria-label="Close" data-email-close>✕</button>'
    +   '<p class="egg__title" id="email-modal-title">Let’s talk.</p>'
    +   '<p style="margin:0 0 16px;font-size:13.5px;color:var(--muted);word-break:break-all;">' + EMAIL + '</p>'
    +   '<div class="egg__row">'
    +     '<a class="btn btn--solid" style="justify-content:center;" href="' + GMAIL + '" target="_blank" rel="noopener">Open in Gmail</a>'
    +     '<button class="btn btn--ghost" style="justify-content:center;" type="button" id="email-copy">Copy address</button>'
    +   '</div>'
    + '</div>';

  var lastFocus = null;

  function open() {
    if (!document.body.contains(modal)) document.body.appendChild(modal);
    // If the ticker easter-egg modal is open, close it so we do not stack.
    var egg = document.getElementById('egg');
    if (egg && egg !== modal && !egg.hidden) { egg.classList.remove('is-open'); egg.hidden = true; }
    lastFocus = document.activeElement;
    modal.hidden = false;
    modal.classList.add('is-open');
    var c = modal.querySelector('.egg__close');
    if (c) c.focus();
  }
  function close() {
    modal.classList.remove('is-open');
    modal.hidden = true;
    var copy = modal.querySelector('#email-copy');
    if (copy) copy.textContent = 'Copy address';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function legacyCopy(text, done) {
    var t = document.createElement('textarea');
    t.value = text; t.style.position = 'fixed'; t.style.top = '-1000px';
    document.body.appendChild(t); t.focus(); t.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(t);
  }
  function copyAddress(done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done, function () { legacyCopy(EMAIL, done); });
    } else {
      legacyCopy(EMAIL, done);
    }
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-email]');
    if (trigger) { e.preventDefault(); open(); return; }
    if (e.target.closest('[data-email-close]')) { close(); return; }
    var copy = e.target.closest('#email-copy');
    if (copy) {
      copyAddress(function () {
        copy.textContent = 'Copied';
        setTimeout(function () { copy.textContent = 'Copy address'; }, 1600);
      });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
})();
