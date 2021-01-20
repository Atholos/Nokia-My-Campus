
let cacheName = 'campusPWA';
/*
let filesCache =[
    './src/views/accountVerification.js',
    './src/views/authLoading.js',
    './src/views/home.js',
    './src/views/info.js',
    './src/views/login.js',
    './src/views/news.js',
    './src/views/newsarticle.js',
    './src/views/p5.js',
    './src/views/p5MapView.js',
    './src/views/p10.js',
    './src/views/p10MapView.js',
    './src/views/parking.js',
    './src/views/parkingHistory.js',
    './src/views/parkingInfo.js',
    './src/views/register.js',
    './src/views/resetPassword.js',
    './src/views/restaurant.js',
    './src/views/restaurantHeatMap.js',
    './src/views/updateDialog.js',

    './src/index.js',

    './index.html',
    './loginBackground.png',
    './mycampus192x192white.png',
    './mycampus512x512white.png',
    './mycampusicon.ico',
];
*/

this.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
    /*
    e.waitUntil(
        ( async () => {
            try {
                const cache = await caches
                    .open(cacheName)
                    .then(cache => {
                        console.log('Service Worker: Caching Files');
                        cache.addAll(filesCache);
                    })
                    .then(() => this.skipWaiting())
            } catch (e) {
                console.log('1', e.message);
            }

        })());
    */
});

this.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName){
                            console.log('Service Worker: Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    })
                )
            })
    )
});

this.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                const resClone = res.clone();
                caches
                    .open(cacheName)
                    .then(cache => {
                        cache.put(e.request, resClone);
                    });
                return res;
            })
            .catch(err => caches.match(e.request)
                .then(res => res))
        );
});
