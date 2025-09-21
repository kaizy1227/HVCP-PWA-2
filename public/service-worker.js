const CACHE_NAME = "hvcp-pwa-v1";
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// Cài đặt ban đầu
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Kích hoạt
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Bỏ qua request không phải http/https
  if (!req.url.startsWith("http")) return;

  // SPA offline routing fallback
  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((cached) => {
        return cached || fetch(req).catch(() => cached);
      })
    );
    return;
  }

  // Ảnh/icon: Stale While Revalidate
  if (req.destination === "image" || req.url.includes("/icons/")) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(req).then(
          (resp) =>
            resp ||
            fetch(req).then((netResp) => {
              cache.put(req, netResp.clone());
              return netResp;
            })
        )
      )
    );
    return;
  }

  // Mặc định: Cache First, fallback Network
  event.respondWith(
    caches.match(req).then((resp) => {
      return (
        resp ||
        fetch(req).then((netResp) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, netResp.clone());
            return netResp;
          });
        })
      );
    })
  );
});
