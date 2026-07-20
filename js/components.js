/* ============================================================
   HAMZA AM — components.js
   Injects shared nav and footer into every page automatically.
   Just include this script in each HTML file.
   ============================================================ */

(function () {

  var NAV_HTML = `
<nav class="nav" id="mainNav">
  <a href="/index.html" class="nav__logo">HAMZA <span>AM</span></a>
  <ul class="nav__links">
    <li><a href="/index.html">Home</a></li>
    <li><a href="/about.html">About</a></li>
    <li><a href="/companies.html">Companies</a></li>
    <li><a href="/photography.html">Photography</a></li>
    <li><a href="/projects.html">Projects</a></li>
    <li><a href="/contact.html">Contact</a></li>
  </ul>
  <a href="/contact.html" class="nav__cta">Let's Connect &nbsp;↗</a>
  <button class="nav__toggle" id="navToggle" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="nav-spacer"></div>
`;

  var FOOTER_HTML = `
<footer class="footer">
  <div class="footer__top">
    <div>
      <a href="/index.html" class="footer__logo">HAMZA <span>AM</span></a>
      <p class="footer__desc">Entrepreneur. Real Estate Agent.<br>Cybersecurity Consultant. Author.<br>Photographer.</p>
      <p class="footer__location">📍 Brooklyn, NY</p>
    </div>
    <div>
      <p class="footer__col-title">Companies</p>
      <ul class="footer__links">
        <li><a href="https://realty.hamzaam.com" target="_blank" rel="noopener">Realty <span>→</span></a></li>
        <li><a href="/companies.html#cyber">P² Cyber Solutions <span>→</span></a></li>
        <li><a href="https://shop.hamzaam.com" target="_blank" rel="noopener">Statements <span>→</span></a></li>
      </ul>
    </div>
    <div>
      <p class="footer__col-title">Quick Links</p>
      <ul class="footer__links">
        <li><a href="/about.html">About</a></li>
        <li><a href="/photography.html">Photography</a></li>
        <li><a href="/projects.html">Projects</a></li>
        <li><a href="/travelogue.html">Journal</a></li>
      </ul>
    </div>
    <div>
      <p class="footer__col-title">Connect</p>
      <ul class="footer__social">
        <li><a href="YOUR-INSTAGRAM-URL" target="_blank" rel="noopener"><span class="footer__social-icon">IG</span> Instagram</a></li>
        <li><a href="YOUR-LINKEDIN-URL" target="_blank" rel="noopener"><span class="footer__social-icon">in</span> LinkedIn</a></li>
        <li><a href="mailto:YOUR-EMAIL"><span class="footer__social-icon">@</span> Email</a></li>
      </ul>
    </div>
    <div>
      <p class="footer__nl-title">Stay Connected</p>
      <p class="footer__nl-desc">Get updates on new projects, listings, drops and insights.</p>
      <form class="footer__form" onsubmit="return false;">
        <input type="email" placeholder="Enter your email" aria-label="Email" />
        <button type="submit">→</button>
      </form>
    </div>
  </div>
  <div class="footer__bottom">
    <p class="footer__copy">© 2024 Hamza AM. All Rights Reserved.</p>
    <p class="footer__copy">Brooklyn, NY</p>
  </div>
</footer>
`;

  // Inject nav
  var navTarget = document.getElementById('nav-placeholder');
  if (navTarget) navTarget.outerHTML = NAV_HTML;

  // Inject footer
  var footerTarget = document.getElementById('footer-placeholder');
  if (footerTarget) footerTarget.outerHTML = FOOTER_HTML;

})();
