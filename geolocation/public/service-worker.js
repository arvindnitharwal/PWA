var CACHE_NAME = 'geolocation_cache';
// Install a service worker
self.addEventListener('install', event => {
  event.waitUntil( async function(){
    let cache= await caches.open(CACHE_NAME)
     await cache.addAll(
          [
            '/manifest.json',
            '/geolocationoffline.html',
          ]
        );
      }())
    });

 // Update or Activate a service worker
 self.addEventListener('activate', event =>{
  event.waitUntil( async function(){
    let cacheWhitelist = ['geolocation_cache'];
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
    // const availableCache= await caches.open('geolocation_cache');
      // const availableCache= await caches.open('geolocation_dynamic');
      try
      {
      const networkResponse = await fetch(event.request);
      // const cachedResponse = await availableCache.match(event.request);
      // if(cachedResponse) return cachedResponse;
      // event.waitUntil(
      //   availableCache.put(event.request, networkResponse.clone())
      // );
      return networkResponse;
    }
    catch(err){
      const availableCache= await caches.open('geolocation_cache');
      let response=await availableCache.match('/geolocationoffline.html');
      return response;
    }
  }())
});
// self.addEventListener('fetch', event => {
//   console.log(event.request.url);
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || fetch(event.request);
//     }).catch(function() {
//       return caches.match('/geolocationOffline.html');
//     })
//   ); 
// });