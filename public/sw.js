const CACHE_NAME = 'accountability-app-v3';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

const noCacheUrls = ['/auth/', '/api/', '/supabase/', '/static/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Only cache essential files that we know exist
        return cache.addAll(urlsToCache.filter(url => url === '/' || url === '/manifest.json'));
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
        // Don't fail the service worker installation if caching fails
        return Promise.resolve();
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Never cache auth-related requests or API calls
  if (noCacheUrls.some(pattern => url.includes(pattern))) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Only cache GET requests - Cache API doesn't support other methods
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }

  // For GET requests, try network first, then cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            })
            .catch(() => {
              // Ignore cache errors
            });
        }
        return response;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request);
      })
  );
});