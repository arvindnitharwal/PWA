var CACHE_NAME = 'geolocation_aibono';
// Install a service worker
self.addEventListener('install', event => {
  event.waitUntil( async function(){
    let cache= await caches.open(CACHE_NAME)
     await cache.addAll(
          [
            '/manifest.json',
            '/geolocationOffline.html',
          ]
        );
      }())
    });

 // Update or Activate a service worker
 self.addEventListener('activate', event =>{
  event.waitUntil( async function(){
    let cacheWhitelist = ['geolocation_aibono'];
    let cacheNames = await caches.keys();
     await Promise.all(
      cacheNames.map(element => {
        if(cacheWhitelist.indexOf(element) === -1){
          return caches.delete(element);
        }
      })
     )
  }())
 });

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith( async function(){
    if(event.request.url.indexOf('/geolocation') < 0){
      const availableCache= await caches.open('geolocation_dynamic');
      try{
      const networkResponse = await fetch(event.request);
      // const cachedResponse = await availableCache.match(event.request);
      // if(cachedResponse) return cachedResponse;
      // const networkResponse = await fetch(event.request);
      event.waitUntil(
        availableCache.put(event.request, networkResponse.clone())
      );
      return networkResponse;
    }
    catch(err){
      const availableCache= await caches.open('geolocation_aibono');
      return await availableCache.match('/geolocationOffline.html');
    }
  }
  else{
      return await fetch(event.request);
  }
  }())
});
// self.addEventListener('fetch', event => {
//   console.log(event.request.url);
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || fetch(event.request);
//     }).catch(function() {
//       return caches.match('/offline.html');
//     })
//   ); 
// });