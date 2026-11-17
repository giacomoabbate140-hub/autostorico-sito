/* Promozione app AutoStorico dentro il sito: pulsante fisso su telefono, riquadri nei lavori,
   blocco in pre-revisione e in auto usate. Ogni link ha un'etichetta (utm_medium) per misurare da dove arrivano le installazioni. */
(function () {
  var PLAY = 'https://play.google.com/store/apps/details?id=autostorico.myapp';
  function playUrl(medium) {
    return PLAY + '&referrer=' + encodeURIComponent('utm_source=sito_abbate&utm_medium=' + medium + '&utm_campaign=autostorico');
  }

  var css = '' +
    '.app-promo-card{display:flex;align-items:center;justify-content:space-between;gap:22px;padding:22px 24px;border:1px solid #3d5566;border-left:5px solid #ffc400;border-radius:14px;background:linear-gradient(135deg,#0b2540,#0e1c27);box-shadow:0 22px 48px rgba(0,0,0,.35);color:#fff}' +
    '.app-promo-card .apc-text{min-width:0}' +
    '.app-promo-card small{display:block;margin-bottom:7px;color:#ffc400;font-weight:900;letter-spacing:.05em}' +
    '.app-promo-card strong{display:block;font-size:clamp(20px,2.6vw,27px);line-height:1.2;font-style:italic}' +
    '.app-promo-card p{margin:8px 0 0;color:#c4d3de;line-height:1.5}' +
    '.apc-btn{flex:none;display:inline-flex;align-items:center;justify-content:center;padding:14px 22px;border-radius:8px;background:#ffc400;color:#041a2d;font-weight:900;text-decoration:none;white-space:nowrap}' +
    '.app-promo-wide{margin:34px 0 0;padding:30px 28px;border:1px solid #3d5566;border-top:4px solid #ffc400;border-radius:14px;background:linear-gradient(135deg,#0b2540,#0e1c27);color:#fff;box-shadow:0 22px 48px rgba(0,0,0,.3)}' +
    '.app-promo-wide .apw-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:30px;align-items:center}' +
    '.app-promo-wide small{display:block;margin-bottom:8px;color:#ffc400;font-weight:900;letter-spacing:.05em}' +
    '.app-promo-wide h2{margin:0 0 10px;font-size:clamp(26px,3.4vw,38px);line-height:1.15;font-style:italic}' +
    '.app-promo-wide p{margin:0 0 18px;color:#c4d3de;line-height:1.55;font-size:17px}' +
    '.apw-shots{display:flex;gap:12px;justify-content:center}' +
    '.apw-shots img{width:calc(33.33% - 8px);max-width:150px;height:auto;border-radius:14px;border:1px solid #3d5566;box-shadow:0 12px 26px rgba(0,0,0,.4);display:block}' +
    '.app-pill{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:900;display:none;align-items:center;gap:6px;padding:6px 6px 6px 18px;border-radius:999px;background:#ffc400;box-shadow:0 10px 28px rgba(0,0,0,.5)}' +
    '.app-pill a{flex:1;color:#041a2d;font-weight:900;font-size:15px;text-decoration:none;padding:9px 0}' +
    '.app-pill button{all:unset;cursor:pointer;width:36px;height:36px;display:grid;place-items:center;border-radius:50%;background:rgba(4,26,45,.14);color:#041a2d;font-weight:900}' +
    '@media(max-width:820px){.app-pill.show{display:flex}body{padding-bottom:0}}' +
    '@media(max-width:760px){.app-promo-card{flex-direction:column;align-items:stretch;text-align:left}.apc-btn{width:100%}.app-promo-wide{padding:24px 18px}.app-promo-wide .apw-grid{grid-template-columns:1fr}.apw-shots img{max-width:none}}';
  var st = document.createElement('style');
  st.id = 'app-promo-style';
  st.textContent = css;
  document.head.appendChild(st);

  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
  function link(medium, label) {
    return '<a class="apc-btn" href="' + playUrl(medium).replace(/&/g, '&amp;') + '" target="_blank" rel="noopener">' + label + '</a>';
  }

  /* 1) Pulsante fisso (solo telefono), compare dopo un po' di scorrimento e si puo' chiudere */
  var closed = false;
  try { closed = sessionStorage.getItem('abbate_app_pill_closed') === '1'; } catch (e) {}
  if (!closed) {
    var pill = el('<div class="app-pill"><a href="' + playUrl('pulsante_fisso').replace(/&/g, '&amp;') + '" target="_blank" rel="noopener">📱 Scarica AutoStorico · 30 giorni di prova</a><button type="button" aria-label="Chiudi">✕</button></div>');
    document.body.appendChild(pill);
    var onScroll = function () {
      var y = window.scrollY || window.pageYOffset || 0;
      pill.classList.toggle('show', y > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    pill.querySelector('button').addEventListener('click', function () {
      pill.classList.remove('show'); pill.style.display = 'none';
      window.removeEventListener('scroll', onScroll);
      try { sessionStorage.setItem('abbate_app_pill_closed', '1'); } catch (e) {}
    });
    onScroll();
  }

  /* 2) Lavori: un riquadro ogni 6 lavori (dopo il 3°, 9°, 15°, 21° ...), anche per i lavori futuri */
  var jobs = [].slice.call(document.querySelectorAll('article.job'));
  jobs.forEach(function (job, i) {
    if (i % 6 !== 2) return;
    var card = el('<aside class="app-promo-card"><div class="apc-text"><small>L\'APP DI ABBATE E FIGLI</small><strong>Tieni lo storico della tua auto con AutoStorico</strong><p>Scadenze di revisione e assicurazione, libretto, manutenzioni e spese in un\'unica app. 30 giorni di prova.</p></div>' + link('lavori', 'Scarica su Google Play') + '</aside>');
    job.parentNode.insertBefore(card, job.nextSibling);
  });

  /* 3) Pre-revisione: dopo il blocco di prenotazione */
  var pr = document.querySelector('.pr-hero, .pre-hero, [class*="pr-hero"]');
  if (pr) {
    var sections = [].slice.call(document.querySelectorAll('main > section, main section'));
    var last = sections.length ? sections[sections.length - 1] : null;
    var wide = el('<section class="app-promo-wide"><div class="apw-grid"><div><small>NON DIMENTICARE LA PROSSIMA REVISIONE</small><h2>Ti ricordiamo noi le scadenze con AutoStorico</h2><p>Promemoria di revisione e assicurazione, libretto sempre con te e storico delle manutenzioni. Provala 30 giorni.</p>' + link('pre_revisione', 'Scarica su Google Play') + '</div><div class="apw-shots"><img src="assets/app_promemoria_scadenze.jpg" alt="AutoStorico: promemoria delle scadenze" loading="lazy"><img src="assets/app_scansione_libretto.jpg" alt="AutoStorico: scansione del libretto" loading="lazy"><img src="assets/app_1.jpg" alt="AutoStorico: schermata principale" loading="lazy"></div></div></section>');
    var host = last ? (last.closest('.wrap') || last.parentNode) : document.querySelector('main');
    if (last && last.parentNode === host) host.insertBefore(wide, last.nextSibling); else host.appendChild(wide);
  }

  /* 4) Auto usate: sotto la scheda del veicolo */
  var used = document.querySelector('article.used-vehicle');
  if (used) {
    var uc = el('<aside class="app-promo-card" style="margin-top:28px"><div class="apc-text"><small>PER CHI HA UN\'AUTO DA VENDERE</small><strong>Quanto vale la tua auto?</strong><p>Con AutoStorico stimi il valore di mercato e tieni sotto controllo scadenze e manutenzioni. 30 giorni di prova.</p></div>' + link('auto_usate', 'Scarica su Google Play') + '</aside>');
    used.parentNode.insertBefore(uc, used.nextSibling);
  }
})();
