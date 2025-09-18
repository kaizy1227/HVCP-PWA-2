const CACHE = "expo-pwa-v1";
const ASSETS = [
  "/",               // trang chủ
  "/manifest.json",
  // thêm các asset tĩnh quan trọng của bạn (logo, font, css build...)
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

// Network-first for navigation; cache-first for static assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const isNav = request.mode === "navigate";

  if (isNav) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cache = await caches.open(CACHE);
          const cached = await cache.match("/");
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  // cache-first cho asset GET
  if (request.method === "GET") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const fresh = await fetch(request);
          // chỉ cache nếu OK
          if (fresh && fresh.status === 200) {
            cache.put(request, fresh.clone());
          }
          return fresh;
        } catch {
          return cached || Response.error();
        }
      })()
    );
  }
});
