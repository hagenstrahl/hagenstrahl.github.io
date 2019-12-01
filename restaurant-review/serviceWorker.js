const staticCacheName = 'restaurant-review-cache-v1';
let _cache;

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            _cache = cache;
            return cache.addAll([
                '/restaurant-review/',
                '/restaurant-review/restaurant.html',
                '/restaurant-review/js/main.js',
                '/restaurant-review/js/restaurant_info.js',
                '/restaurant-review/js/dbhelper.js',
                '/restaurant-review/css/styles.css',
                '/restaurant-review/data/restaurants.json'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (!response && event.request.url.includes('restaurant.html')) {
                return fetch(event.request).then((response) => {
                    _cache.put(event.request, response);
                    return response;
                });
            } else if (!response) {
                return fetch(event.request);
            } else {
                return response;
            }
        })
    );
});