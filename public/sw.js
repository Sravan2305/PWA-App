var staticCacheName = "my-pwa-cache-static"; ///Added by us manually
var dynamicCacheName = "my-pwa-cache-dynamic"; /// Added after making api request
//In cache data is stored as key-values. key is URLs or request url. value is reponse



self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing service worker ...", event);

  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("[Service Worker] pre-caching App layout");
      // cache.add('/')
      // cache.add('/index.html')
      // cache.add('/index.js')
      cache.addAll(["/", "/index.html", "/index.js", "/offline.html"]);
    })
  );
});





self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating service worker ...", event);
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key != staticCacheName && key != dynamicCacheName) {
            console.log("Removing Old Cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

//only works for fetch apis.Doesnt work for axios req as axios is buit on top of ajax
self.addEventListener('fetch',(event)=>{
    // console.log("[Service Worker] Fetching something ...",event)
    event.respondWith(
        // fetch(event.request)
        caches
        .match(event.request)
        .then(responseFromCache=>{
            if(responseFromCache)
                return responseFromCache
            else
                return fetch(event.request)
                        .then(responseFromServer => {
                            return caches                   //if we do not return api data intercepted here is not sent to the componenets/html
                                    .open(dynamicCacheName)
                                    .then(cache => {
                                        cache.put(event.request.url , responseFromServer.clone())    //Response if consumed once res obj becomes null. Hence cloning
                                        return responseFromServer
                                    })

                        })
                        .catch(err => {
                            return caches.open(staticCacheName)
                                         .then(cache => {
                                             return cache.match('/offline.html')
                                         })
                        })
        })
        )
})

///Network first + Cache strategy
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     fetch(event.request)
//       .then((responseFromServer) => {
//         return caches //if we do not return api data intercepted here is not sent to the componenets/html
//           .open(dynamicCacheName)
//           .then((cache) => {
//             cache.put(event.request.url, responseFromServer.clone()); //Response if consumed once res obj becomes null. Hence cloning
//             return responseFromServer;
//           });
//       })
//       .catch((err) => {
//         return caches.match(event.request);
//       })
//   );
// });

///cache then network strategy.

self.addEventListener('sync', function(event) {
  if (event.tag == 'sync-new-post') {
    event.waitUntil(doSomeStuff());
  }
});