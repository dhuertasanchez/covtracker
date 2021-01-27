// const CACHE = "pwabuilder-offline";
// const QUEUE_NAME = "bgSyncQueue";

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// const bgSyncPlugin = new workbox.backgroundSync.Plugin(QUEUE_NAME, {
//   maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
// });

// workbox.routing.registerRoute(
//   new RegExp('/*'),
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: CACHE,
//     plugins: [
//       bgSyncPlugin
//     ]
//   })
// );

const staticDevCovTrack = "cov-track-site-v1.1.1"
const assets = [
    "/",
    "index.html",
    "css/style.css",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCovTrack).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})