/* ============================================================
   HAMZA AM — main.js
   Navigation (mobile toggle, smooth scroll, active link),
   work carousel, scroll-in animations.
   No framework. Vanilla JS only.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ──────────────────────────────────────────
     MOBILE NAV TOGGLE
  ────────────────────────────────────────── */
  var nav    = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var isOpen = nav.classList.contains('open');
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close mobile nav when any link is clicked
    nav.querySelectorAll('.nav__links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }


  /* ──────────────────────────────────────────
     ACTIVE NAV LINK — SCROLL SPY
     Highlights the current section in the nav
     while scrolling (homepage only).
  ────────────────────────────────────────── */
  var sectionIds = ['home', 'companies', 'work', 'photography-preview', 'contact'];
  var navLinks   = document.querySelectorAll('.nav__links a');

  function getActiveSectionId() {
    var scrollY  = window.scrollY + 80; // offset for fixed nav height
    var active   = sectionIds[0];
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        active = id;
      }
    });
    return active;
  }

  function updateActiveLink() {
    var activeId = getActiveSectionId();
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      // Match anchor links to section IDs
      if (href === '#' + activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Only run scroll spy on the homepage (index.html)
  if (document.getElementById('home')) {
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink(); // run once on load
  }


  /* ──────────────────────────────────────────
     ACTIVE NAV LINK — SUBPAGES
     On about.html and photography.html,
     mark no anchor link as active (they point
     back to index.html#section).
  ────────────────────────────────────────── */
  if (!document.getElementById('home')) {
    var currentPath = window.location.pathname;
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href !== '#' && !href.startsWith('#') && !href.startsWith('index.html')) {
        if (currentPath.endsWith(href) || currentPath.endsWith('/' + href)) {
          link.classList.add('active');
        }
      }
    });
  }


  /* ──────────────────────────────────────────
     WORK CAROUSEL
  ────────────────────────────────────────── */
  var track = document.getElementById('workTrack');
  if (track) {
    var idx = 0;

    window.workSlide = function (dir) {
      var cards   = track.querySelectorAll('.work__card');
      if (!cards.length) return;
      var wrap    = track.parentElement;
      var cardW   = cards[0].offsetWidth + 16; // card width + gap
      var visible = Math.max(1, Math.floor(wrap.offsetWidth / cardW));
      var max     = Math.max(0, cards.length - visible);
      idx = Math.min(Math.max(idx + dir, 0), max);
      track.style.transform = 'translateX(-' + (idx * cardW) + 'px)';
    };
  }


  /* ──────────────────────────────────────────
     SCROLL-IN ANIMATIONS
     Elements with data-anim attribute fade/
     slide in when they enter the viewport.
  ────────────────────────────────────────── */
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
    // Fallback: show all immediately if IntersectionObserver not supported
    animEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

});
