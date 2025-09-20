const CACHE_NAME = "hvcp-pwa-v1";

// Các file cần cache sẵn khi cài đặt
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html",
  "/static/js/bundle.js",
  "/static/js/main.js",
  "/static/css/main.css",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Cài đặt service worker và cache file tĩnh
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Kích hoạt và xóa cache cũ
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Lấy dữ liệu từ cache khi offline + cache động
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Nếu offline và request là HTML → trả về offline.html
          if (event.request.headers.get("accept").includes("text/html")) {
            return caches.match("/offline.html");
          }
        });
    })
  );
});
