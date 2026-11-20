/* Voce di menu in evidenza "NUOVO SERVIZIO - Consigli del giorno", aggiunta in tutte le pagine. */
(function () {
  var HREF = 'consigli-del-giorno.html';
  var css = '' +
    '.nav-new{position:relative;display:inline-flex!important;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 15px!important;border-radius:10px;background:#ffc400;color:#041a2d!important;line-height:1.05;text-align:center;white-space:nowrap;text-decoration:none;box-shadow:0 0 0 0 rgba(255,196,0,.55);animation:navNewPulse 2.6s ease-out infinite}' +
    '.nav-new:after{display:none!important}' +
    '.nav-new .nn-tag{font-size:9.5px;font-weight:900;letter-spacing:.09em;color:#a31616}' +
    '.nav-new .nn-name{font-size:15px;font-weight:900}' +
    '.nav-new:hover{filter:brightness(1.07)}' +
    '.mobile-nav .nav-new{flex-direction:row;justify-content:space-between;gap:12px;margin:10px 0 4px;padding:14px 16px!important;border-bottom:0!important;border-radius:10px}' +
    '.mobile-nav .nav-new .nn-tag{font-size:11px}.mobile-nav .nav-new .nn-name{font-size:17px}' +
    '.nav-new-strip{display:none;margin:0;padding:11px 14px!important;border-radius:0!important;width:100%;box-sizing:border-box;flex-direction:row!important;gap:12px!important;animation:none!important}' +
    '.nav-new-strip:not(.show){display:none!important}' +
    '.nav-new-strip.show{display:flex!important;justify-content:center}' +
    '.nav-new-strip.always .nn-tag{font-size:11px}.nav-new-strip.always .nn-name{font-size:17px}' +
    '.nav-new-strip.always .nn-arrow{font-weight:900}' +
    '.nav-new-strip .nn-tag{font-size:11px}.nav-new-strip .nn-name{font-size:16px}' +
    'html.nav-narrow header nav .nav-new:not(.nav-new-strip){display:none!important}' +
    '@keyframes navNewPulse{0%{box-shadow:0 0 0 0 rgba(255,196,0,.55)}70%{box-shadow:0 0 0 12px rgba(255,196,0,0)}100%{box-shadow:0 0 0 0 rgba(255,196,0,0)}}' +
    '@media (prefers-reduced-motion:reduce){.nav-new{animation:none}}';
  var st = document.createElement('style');
  st.id = 'site-nav-style';
  st.textContent = css;
  document.head.appendChild(st);

  /* Home: l'intestazione e' gia' piena (orari + 7 voci): la voce va nel menu a tendina e in una fascia sotto l'intestazione */
  var isHome = !!document.querySelector('header .desktop-nav');
  var here = /consigli-del-giorno\.html$/.test(location.pathname);
  [].slice.call(document.querySelectorAll('header nav')).forEach(function (nav) {
    if (nav.querySelector('a[href="' + HREF + '"]')) return;
    if (isHome && nav.classList.contains('desktop-nav')) return;
    var a = document.createElement('a');
    a.className = 'nav-new';
    a.href = HREF;
    if (here) a.setAttribute('aria-current', 'page');
    a.innerHTML = '<span class="nn-tag">NUOVO SERVIZIO</span><span class="nn-name">CONSIGLI DEL GIORNO</span>';
    var ref = nav.querySelector('a[href$="#contatti"]');
    if (ref) nav.insertBefore(a, ref); else nav.appendChild(a);
  });

  /* Telefono, pagine senza menu a tendina: il menu e' nascosto, quindi la voce compare come fascia sotto l'intestazione */
  var header = document.querySelector('header');
  /* Nella pagina Consigli del giorno la fascia sarebbe una ripetizione del titolo: non serve */
  if (header && !here && (isHome || !document.getElementById('menu-toggle'))) {
    var simple = header.querySelector('nav');
    if (simple || isHome) {
      var strip = document.createElement('a');
      strip.className = 'nav-new nav-new-strip';
      strip.href = HREF;
      strip.innerHTML = '<span class="nn-tag">NUOVO SERVIZIO</span><span class="nn-name">CONSIGLI DEL GIORNO</span>' + (isHome ? '<span class="nn-arrow">→</span>' : '');
      if (isHome) { strip.classList.add('always', 'show'); }
      header.insertAdjacentElement('afterend', strip);
      if (!isHome) {
        var sync = function () {
          var narrow = window.innerWidth < 1200 || window.getComputedStyle(simple).display === 'none';
          document.documentElement.classList.toggle('nav-narrow', narrow);
          strip.classList.toggle('show', narrow);
        };
        sync(); window.addEventListener('resize', sync);
      }
    }
  }
})();
