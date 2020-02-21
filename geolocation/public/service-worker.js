var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
  '/',
];
// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(
          [
            'geolocation/public/index.html',
            'geolocation/src/App.css',
            'geolocation/src/App.js',
            'geolocation/src/index.js',
            'geolocation/src/index.css',
            '/manifest.json',
            'static/js/bundle.js'
          ]
        );
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  ); 
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});