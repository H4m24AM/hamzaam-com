/* ============================================================
   HAMZA AM — main.js
   Navigation, carousel, scroll effects, active nav link
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Mobile nav toggle ── */
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    // Close nav when a link is clicked
    nav.querySelectorAll('.nav__links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  /* ── Active nav link based on current page ── */
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__links a').forEach(function (link) {
    var href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  /* ── Work carousel ── */
  var track = document.getElementById('workTrack');
  if (track) {
    var idx = 0;
    window.workSlide = function (dir) {
      var cards = track.querySelectorAll('.work__card');
      if (!cards.length) return;
      var wrap = track.parentElement;
      var visible = Math.max(1, Math.round(wrap.offsetWidth / (cards[0].offsetWidth + 16)));
      var max = Math.max(0, cards.length - visible);
      idx = Math.min(Math.max(idx + dir, 0), max);
      var offset = idx * (cards[0].offsetWidth + 16);
      track.style.transform = 'translateX(-' + offset + 'px)';
    };
  }

  /* ── Scroll-in animations ── */
  var animEls = document.querySelectorAll('[data-anim]');
  if (animEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    animEls.forEach(function (el) { observer.observe(el); });
  } else {
    animEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

});
