// mobile-guard.js — Bloquea el acceso desde teléfonos móviles
// Debe cargarse como el PRIMER <script> dentro de <head>, sin async/defer,
// para poder usar document.write mientras el documento aún se está parseando.
(function() {
  var UA_MOBIL = /iPhone|iPod|Windows Phone|BlackBerry|Opera Mini|Android.+Mobile/i;
  var ANCHO_MAX = 768;

  function esMovil() {
    return UA_MOBIL.test(navigator.userAgent) || window.innerWidth <= ANCHO_MAX;
  }

  if (!esMovil()) return;

  // Oculta el contenido de la página en cuanto se parsea el <body>, evitando el flash de contenido.
  document.write('<style id="mobileGuardStyle">body > *:not(#mobileGuardOverlay){display:none !important;}</style>');

  document.addEventListener('DOMContentLoaded', function() {
    var ov = document.createElement('div');
    ov.id = 'mobileGuardOverlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#0F2070;color:white;'
      + 'display:flex;flex-direction:column;align-items:center;justify-content:center;'
      + 'text-align:center;padding:32px;font-family:Inter,"Segoe UI",sans-serif;';
    ov.innerHTML =
      '<svg width="56" height="56" fill="none" stroke="white" stroke-width="1.5" viewBox="0 0 24 24">'
      + '<rect x="2" y="4" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
      + '</svg>'
      + '<div style="font-size:1.15rem;font-weight:800;margin-top:20px">ATU <span style="color:#29ABE2">360</span></div>'
      + '<div style="font-size:0.95rem;font-weight:700;margin-top:18px;max-width:320px;line-height:1.5">'
      + 'Este sistema está disponible únicamente desde una computadora.</div>'
      + '<div style="font-size:0.8rem;color:rgba(255,255,255,0.65);margin-top:10px;max-width:320px;line-height:1.5">'
      + 'Por favor, ingresa desde un equipo de escritorio o laptop.</div>';
    document.body.appendChild(ov);
  });
})();
