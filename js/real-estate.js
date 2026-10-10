// Keep the shared mobile menu's accessibility state in sync.
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');
  function syncMenu() { toggle.setAttribute('aria-expanded', String(nav.classList.contains('open'))); }
  toggle.addEventListener('click', syncMenu);
  nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', syncMenu); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open'); toggle.setAttribute('aria-label', 'Open menu'); syncMenu(); toggle.focus();
    }
  });
});
