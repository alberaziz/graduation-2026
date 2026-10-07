/**
 * ============================================================================
 * GRADUATE 2026 - PHOTOBOOTH SERVICE WORKER (sw.js)
 * Offline-First PWA Cache for Zero-Internet Venues & Airplane Mode Operation
 * ============================================================================
 */

const CACHE_NAME = 'photobooth-cache-v2026.2';

// Core assets to pre-cache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  'https://cdn.tailwindcss.com'
];

// Install Event: Pre-cache app shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline app shell assets');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Pre-cache partial warning (continuing):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up outdated cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing legacy cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Cache-First for static assets, Network-Fallback for dynamic requests
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Bypass Google Apps Script POST requests (IndexedDB & Background Worker handle uploads)
  if (req.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached asset immediately
        return cachedResponse;
      }

      // If not in cache, fetch from network and dynamically cache valid GET responses
      return fetch(req)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }

          // Clone response before caching
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // If offline and request is an HTML navigation, fallback to root index.html
          if (req.mode === 'navigate') {
            return caches.match('./index.html') || caches.match('./');
          }
        });
    })
  );
});
