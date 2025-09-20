// Service Worker Debug Version - CỰC KỲ đơn giản
console.log("🚀 Service Worker script loaded");

const CACHE_NAME = "hvcp-debug-v1";
const DEBUG = true;

function log(message, ...args) {
  if (DEBUG) {
    console.log(`[SW] ${message}`, ...args);
  }
}

// Install - CHỈ cache trang chủ
self.addEventListener("install", (event) => {
  log("📦 Installing...");

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        log("Cache opened, attempting to cache root");
        return fetch("/")
          .then(response => {
            if (response.ok) {
              log("✅ Root page fetched successfully");
              return cache.put("/", response);
            } else {
              throw new Error(`Failed to fetch root: ${response.status}`);
            }
          })
          .then(() => {
            log("✅ Root page cached successfully");
          });
      })
      .catch(error => {
        log("❌ Install failed:", error);
        // Không throw error - để SW vẫn install
      })
  );

  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  log("🔥 Activating...");

  event.waitUntil(
    Promise.resolve().then(() => {
      log("✅ Activated successfully");
    })
  );

  self.clients.claim();
});

// Fetch - CHỈ handle navigation tới root
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // CHỈ handle GET navigation requests tới root của cùng domain
  if (
    event.request.method === 'GET' &&
    event.request.mode === 'navigate' &&
    url.origin === self.location.origin &&
    (url.pathname === '/' || url.pathname === '')
  ) {

    log("🎯 Handling navigation to root");

    event.respondWith(
      fetch(event.request)
        .then(response => {
          log("✅ Network response OK:", response.status);

          // Cache response nếu thành công
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseClone))
              .catch(err => log("⚠️ Cache put failed:", err));
          }

          return response;
        })
        .catch(error => {
          log("🚫 Network failed, trying cache:", error.message);

          return caches.match("/")
            .then(cachedResponse => {
              if (cachedResponse) {
                log("✅ Serving from cache");
                return cachedResponse;
              } else {
                log("❌ No cache found, creating fallback");
                return createOfflinePage();
              }
            });
        })
    );

    return;
  }

  // Log other requests but don't handle them
  log("👀 Ignoring request:", event.request.url);
});

// Create offline fallback page
function createOfflinePage() {
  return new Response(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - Debug</title>
    <style>
        body {
            font-family: system-ui, sans-serif;
            text-align: center;
            padding: 50px;
            background: #f0f0f0;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 400px;
            margin: 0 auto;
        }
        button {
            background: #007AFF;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Debug Mode</h1>
        <h2>☕ Học Viện Cà Phê</h2>
        <p><strong>Service Worker đang hoạt động!</strong></p>
        <p>Bạn đang ở chế độ offline</p>
        <button onclick="location.reload()">Thử lại</button>

        <div style="margin-top: 20px; font-size: 12px; color: #666;">
            Cache: ${CACHE_NAME}<br>
            Time: ${new Date().toLocaleTimeString()}
        </div>
    </div>
</body>
</html>`, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}

log("🎉 Service Worker ready");