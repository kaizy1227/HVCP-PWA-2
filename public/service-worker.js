const CACHE_NAME = "hvcp-test-v2"; // Tăng version để force update
const RUNTIME_CACHE = "runtime-cache-v2";

// Assets cần cache ngay lập tức - CHỈ cache những file chắc chắn tồn tại
const PRECACHE_ASSETS = [
  "/",
  "/manifest.json"
  // Tạm thời bỏ icons để tránh lỗi 404
];

// Install: cache assets quan trọng
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("📦 Attempting to precache assets:", PRECACHE_ASSETS);
        return Promise.allSettled(
          PRECACHE_ASSETS.map(url => {
            return fetch(url)
              .then(response => {
                if (response.ok) {
                  console.log(`✅ Cached: ${url}`);
                  return cache.put(url, response);
                } else {
                  console.warn(`⚠️ Failed to fetch ${url}: ${response.status}`);
                  throw new Error(`HTTP ${response.status}`);
                }
              })
              .catch(error => {
                console.error(`❌ Failed to cache ${url}:`, error);
                throw error;
              });
          })
        ).then(results => {
          const failed = results.filter(r => r.status === 'rejected');
          if (failed.length > 0) {
            console.warn(`⚠️ ${failed.length} assets failed to cache`);
          } else {
            console.log("✅ All assets cached successfully");
          }
        });
      })
      .catch((error) => {
        console.error("❌ Precaching failed:", error);
        throw error;
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
    console.log("🧭 Navigation request:", request.url);
    event.respondWith(
      fetch(request)
        .then((response) => {
          console.log("✅ Network response for navigation:", response.status);
          // Clone response to cache
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE)
            .then((cache) => cache.put(request, responseClone))
            .catch(err => console.warn("Cache put failed:", err));
          return response;
        })
        .catch((networkError) => {
          console.log("🚫 Network failed for navigation, trying cache...", networkError.message);
          // Fallback hierarchy for offline
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                console.log("✅ Found cached response for:", request.url);
                return cachedResponse;
              }

              console.log("🔍 Trying to match root path...");
              // Try root path
              return caches.match("/")
                .then((rootResponse) => {
                  if (rootResponse) {
                    console.log("✅ Returning cached root");
                    return rootResponse;
                  }

                  console.log("🏠 Creating fallback offline page...");
                  // Final fallback to inline offline page
                  return new Response(
                    `<!DOCTYPE html>
                    <html>
                    <head>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <title>Offline - Học Viện Cà Phê</title>
                      <style>
                        body {
                          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                          text-align: center;
                          padding: 50px;
                          color: #333;
                          background: #f6f6f6;
                        }
                        .offline-message {
                          max-width: 400px;
                          margin: 0 auto;
                          background: white;
                          padding: 30px;
                          border-radius: 10px;
                          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        button {
                          background: #0ea5e9;
                          color: white;
                          border: none;
                          padding: 10px 20px;
                          border-radius: 5px;
                          font-size: 16px;
                          cursor: pointer;
                          margin-top: 20px;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="offline-message">
                        <h1>☕ Học Viện Cà Phê</h1>
                        <p>Hiện tại bạn đang offline</p>
                        <p>Vui lòng kiểm tra kết nối mạng và thử lại.</p>
                        <button onclick="location.reload()">Thử lại</button>
                      </div>
                    </body>
                    </html>`,
                    {
                      headers: {
                        "Content-Type": "text/html; charset=utf-8",
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