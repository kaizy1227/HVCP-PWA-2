const CACHE_NAME = "hvcp-fixed-v3";
const RUNTIME_CACHE = "runtime-cache-v3";

// Chỉ cache root page
const PRECACHE_ASSETS = [
  "/"
];

// Install: cache tối thiểu
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("📦 Caching root page");
        return cache.add("/");
      })
      .catch((error) => {
        console.error("❌ Install failed:", error);
      })
  );
  self.skipWaiting();
});

// Activate: cleanup
self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) =>
            cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE
          )
          .map((cacheName) => {
            console.log("🗑️ Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch: CHỈ handle navigation requests, bỏ qua tất cả assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // CHỈ handle navigation requests (page loads)
  // BỎ QUA tất cả assets, images, API calls
  if (request.mode !== "navigate") {
    return; // Để browser tự handle
  }

  console.log("🧭 Navigation request:", request.url);

  event.respondWith(
    fetch(request)
      .then((response) => {
        console.log("✅ Network OK:", response.status);

        // Cache page nếu thành công
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE)
            .then((cache) => cache.put(request, responseClone))
            .catch(() => {}); // Ignore cache errors
        }

        return response;
      })
      .catch((networkError) => {
        console.log("🚫 Network failed, trying cache...");

        // Thử tìm trong cache
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              console.log("✅ Found in cache");
              return cachedResponse;
            }

            // Fallback to root page
            return caches.match("/")
              .then((rootResponse) => {
                if (rootResponse) {
                  console.log("✅ Fallback to root");
                  return rootResponse;
                }

                // Final fallback
                console.log("🏠 Creating offline page");
                return new Response(`
                  <!DOCTYPE html>
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
                      .container {
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
                        padding: 15px 30px;
                        border-radius: 8px;
                        font-size: 16px;
                        cursor: pointer;
                        margin-top: 20px;
                      }
                      button:hover {
                        background: #0284c7;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <h1>☕ Học Viện Cà Phê</h1>
                      <p>Bạn đang trong chế độ offline</p>
                      <p>Vui lòng kiểm tra kết nối mạng</p>
                      <button onclick="window.location.reload()">Thử lại</button>
                    </div>
                  </body>
                  </html>
                `, {
                  headers: {
                    "Content-Type": "text/html; charset=utf-8",
                    "Cache-Control": "no-cache"
                  }
                });
              });
          });
      })
  );
});