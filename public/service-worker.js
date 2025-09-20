const version = "1.0.0";
const cacheName = `hvcp-${version}`;

// Danh sách files cần cache - CHỈ cache những gì chắc chắn tồn tại
const filesToCache = [
  `/`,
  `/manifest.json`
  // Tạm thời không cache icons để tránh lỗi 404
  // Sẽ thêm sau khi confirm files tồn tại
];

// Install: Cache tất cả files cần thiết
self.addEventListener('install', e => {
  console.log('[SW] Install event');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[SW] Caching app files');
      return cache.addAll(filesToCache)
        .then(() => {
          console.log('[SW] All files cached successfully');
          return self.skipWaiting();
        })
        .catch(error => {
          console.error('[SW] Failed to cache files:', error);
          // Thử cache từng file một để tìm file nào gây lỗi
          return Promise.allSettled(
            filesToCache.map(url => {
              return fetch(url).then(response => {
                if (response.ok) {
                  console.log(`[SW] ✅ Cached: ${url}`);
                  return cache.put(url, response);
                } else {
                  console.warn(`[SW] ❌ Failed to cache ${url}: ${response.status}`);
                  throw new Error(`HTTP ${response.status}`);
                }
              });
            })
          ).then(() => self.skipWaiting());
        });
    })
  );
});

// Activate: Claim clients
self.addEventListener('activate', event => {
  console.log('[SW] Activate event');
  event.waitUntil(
    // Clean up old caches
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch: Cache First Strategy (giống như web bạn test)
self.addEventListener('fetch', event => {
  console.log('[SW] Fetch:', event.request.url);

  event.respondWith(
    caches.open(cacheName)
      .then(cache => {
        return cache.match(event.request, { ignoreSearch: true });
      })
      .then(response => {
        if (response) {
          console.log('[SW] ✅ Serving from cache:', event.request.url);
          return response;
        }

        console.log('[SW] 🌐 Fetching from network:', event.request.url);
        return fetch(event.request).then(fetchResponse => {
          // Cache successful responses
          if (fetchResponse.ok && event.request.url.startsWith(self.location.origin)) {
            const responseClone = fetchResponse.clone();
            caches.open(cacheName).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return fetchResponse;
        }).catch(error => {
          console.log('[SW] ❌ Network failed:', error);

          // Fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/').then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }

              // Final fallback
              return new Response(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>Offline - Học Viện Cà Phê</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 40px 30px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 100%;
        }
        .coffee { font-size: 60px; margin-bottom: 20px; }
        h1 { color: #8B4513; font-size: 24px; margin-bottom: 10px; }
        .subtitle { color: #D2691E; font-size: 14px; margin-bottom: 20px; }
        p { color: #666; line-height: 1.5; margin-bottom: 30px; }
        .btn {
            background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
            font-weight: 600;
        }
        .status {
            background: #f8f9fa;
            color: #6c757d;
            padding: 10px;
            border-radius: 10px;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="coffee">☕</div>
        <h1>Học Viện Cà Phê</h1>
        <div class="subtitle">Coffee Academy PWA</div>
        <p>Ứng dụng đang hoạt động offline.<br>Vui lòng kiểm tra kết nối mạng để truy cập đầy đủ tính năng.</p>
        <button class="btn" onclick="window.location.reload()">Thử kết nối lại</button>
        <div class="status">
            Offline Mode • Cache v${version}
        </div>
    </div>
</body>
</html>`, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
              });
            });
          }

          throw error;
        });
      })
  );
});