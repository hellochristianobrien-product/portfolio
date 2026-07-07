/* Mobile nav: hamburger toggles the dropdown menu. Shared by every page. */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var burger = nav.querySelector('.nav__burger');
  var menu = nav.querySelector('.nav__links');
  if (!burger || !menu) return;

  function open() {
    nav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
  }
  function close() {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    nav.classList.contains('is-open') ? close() : open();
  });
  // close after picking a destination
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') close();
  });
  // close when clicking outside the nav
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !nav.contains(e.target)) close();
  });
  // close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
