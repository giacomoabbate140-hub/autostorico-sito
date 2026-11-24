/* Barra fissa "Chiama / WhatsApp" su mobile. I click sono tracciati da analytics-events.js
   (phone_click / whatsapp_click); il parametro utm_medium=sticky_bar li distingue dagli altri pulsanti. */
(function () {
  if (document.getElementById('contact-bar')) return;
  var css = '' +
    '#contact-bar{display:none}' +
    '@media (max-width:800px){' +
    '#contact-bar{position:fixed;left:0;right:0;bottom:0;z-index:9990;display:flex;gap:10px;padding:10px 12px calc(10px + env(safe-area-inset-bottom,0px));background:#fff;border-top:1px solid #dbe5e8;box-shadow:0 -6px 18px rgba(18,60,74,.14)}' +
    '#contact-bar a{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;min-height:48px;border-radius:10px;font:800 16px/1 Manrope,Arial,sans-serif;text-decoration:none;color:#fff}' +
    '#contact-bar .cb-call{background:#096f92}' +
    '#contact-bar .cb-wa{background:#1fa855}' +
    'body{padding-bottom:calc(72px + env(safe-area-inset-bottom,0px))}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var bar = document.createElement('div');
  bar.id = 'contact-bar';
  bar.innerHTML =
    '<a class="cb-call" href="tel:0916718292" aria-label="Chiama l\'officina">📞 Chiama</a>' +
    '<a class="cb-wa" href="https://wa.me/393889984140?text=Buongiorno%2C%20vorrei%20informazioni%20o%20un%20preventivo.&utm_medium=sticky_bar" target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">💬 WhatsApp</a>';
  document.body.appendChild(bar);
})();
