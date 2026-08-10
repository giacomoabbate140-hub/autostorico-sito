(function () {
  function trackClick(eventName, link) {
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', eventName, {
      link_text: (link.textContent || '').trim().slice(0, 100),
      link_url: link.href,
      page_path: window.location.pathname
    });
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    if (href.indexOf('wa.me') !== -1) {
      trackClick('whatsapp_click', link);
    } else if (href.indexOf('play.google.com') !== -1) {
      trackClick('autostorico_google_play_click', link);
    } else if (href.indexOf('autostorico.html') !== -1) {
      trackClick('autostorico_info_click', link);
    } else if (href.indexOf('tel:') === 0) {
      trackClick('phone_click', link);
    }
  });
})();
