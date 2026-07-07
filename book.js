/* Calendly popup for every "Book" button across the site.
   Buttons are marked with [data-book] and keep a real Calendly href as a
   no-JS fallback. Branding params match the site palette (linen background,
   charcoal text, charcoal primary) so the widget does not show Calendly's
   default blue. One place to change the URL or colors. */
(function () {
  var BOOK_URL = 'https://calendly.com/christian-ob/30min'
    + '?hide_gdpr_banner=1'
    + '&background_color=fdf4eb'   // Linen White page
    + '&text_color=1b1b19'         // Charcoal Noir text
    + '&primary_color=1b1b19';     // Charcoal primary (matches solid buttons)

  // Load Calendly's CSS + JS once.
  if (!document.querySelector('link[data-calendly]')) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://assets.calendly.com/assets/external/widget.css';
    css.setAttribute('data-calendly', '');
    document.head.appendChild(css);
  }
  if (!window.Calendly && !document.querySelector('script[data-calendly]')) {
    var s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.setAttribute('data-calendly', '');
    document.head.appendChild(s);
  }

  // Open the popup on click. If Calendly has not loaded yet, let the href
  // fallback navigate to the booking page instead.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-book]');
    if (!btn) return;
    if (window.Calendly && window.Calendly.initPopupWidget) {
      e.preventDefault();
      window.Calendly.initPopupWidget({ url: BOOK_URL });
    }
  });
})();
