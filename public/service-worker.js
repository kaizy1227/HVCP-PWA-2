const CACHE_NAME = "hvcp-test-v1";
const RUNTIME_CACHE = "runtime-cache-v1";

// Assets cần cache ngay lập tức
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png"
];

// Install: cache assets quan trọng
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Precaching assets");
        return cache.addAll(PRECACHE_ASSETS);
      })
      .catch((error) => {
        console.error("Precaching failed:", error);
      })
  );
  self.skipWaiting();
});

// Activate: cleanup old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) =>
              cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE
            )
            .map((cacheName) => {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            })
        );
      })
  );
  self.clients.claim();
});

// Fetch: Network First với fallback strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle navigation requests (page loads)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone response to cache
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE)
            .then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          // Fallback hierarchy for offline
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Final fallback to index.html
              return caches.match("/index.html")
                .then((indexResponse) => {
                  if (indexResponse) {
                    return indexResponse;
                  }
                  // If even index.html is not cached, return a basic offline page
                  return new Response(
                    `<!DOCTYPE html>
                    <html>
                    <head>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <title>Offline - ExpoPWA</title>
                      <style>
                        body {
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                          text-align: center;
                          padding: 50px;
                          color: #333;
                        }
                        .offline-message {
                          max-width: 400px;
                          margin: 0 auto;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="offline-message">
                        <h1>Bạn đang offline</h1>
                        <p>Vui lòng kiểm tra kết nối mạng và thử lại.</p>
                        <button onclick="location.reload()">Thử lại</button>
                      </div>
                    </body>
                    </html>`,
                    {
                      headers: {
                        "Content-Type": "text/html",
                      },
                    }
                  );
                });
            });
        })
    );
    return;
  }

  // Handle other requests (assets, API calls)
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version while fetching update in background
          fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(RUNTIME_CACHE)
                  .then((cache) => cache.put(request, responseClone));
              }
            })
            .catch(() => {}); // Ignore network errors
          return cachedResponse;
        }

        // Not in cache, try network
        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(RUNTIME_CACHE)
                .then((cache) => cache.put(request, responseClone));
            }
            return response;
          });
      })
  );
});