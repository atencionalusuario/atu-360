// Service worker de validacion.html: guarda la página y los scripts de Firebase
// para que la app abra sin señal. Los datos los guarda Firestore por su cuenta.
var CACHE = 'validacion-v1';
var ARCHIVOS = [
  'validacion.html', 'firebase-config.js', 'favicon.svg', 'validacion.webmanifest',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARCHIVOS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf('validacion-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// Red primero (para recibir cambios de la app) y caché si no hay señal.
// Solo se atienden los archivos de la lista; Firestore y Auth van directo.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  var nombre = url.origin === location.origin ? url.pathname.split('/').pop() : e.request.url;
  if (ARCHIVOS.indexOf(nombre) < 0) return;
  e.respondWith(fetch(e.request).then(function (r) {
    var copia = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copia); });
    return r;
  }).catch(function () { return caches.match(e.request, { ignoreSearch: true }); }));
});
