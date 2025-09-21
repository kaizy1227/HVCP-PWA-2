// scripts/inject-manifest.js
const fs = require("fs");
const path = require("path");

const DIST_DIR = path.join(__dirname, "..", "dist");
const INDEX_FILE = path.join(DIST_DIR, "index.html");

if (!fs.existsSync(INDEX_FILE)) {
  console.error("❌ Không tìm thấy dist/index.html. Hãy chạy `npm run build:web` trước.");
  process.exit(1);
}

let html = fs.readFileSync(INDEX_FILE, "utf-8");

// Chèn manifest nếu chưa có
if (!html.includes("manifest.json")) {
  html = html.replace(
    "</head>",
    `  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#0ea5e9" />
  </head>`
  );
  console.log("✅ Manifest + theme-color đã được thêm.");
}

// Chèn service worker register script nếu chưa có
if (!html.includes("navigator.serviceWorker.register")) {
  html = html.replace(
    "</body>",
    `  <script>
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("/service-worker.js")
            .then(reg => console.log("✅ Service Worker registered:", reg))
            .catch(err => console.error("❌ SW registration failed:", err));
        });
      }
    </script>
  </body>`
  );
  console.log("✅ Script register service worker đã được thêm.");
}

fs.writeFileSync(INDEX_FILE, html, "utf-8");
console.log("🎉 inject-manifest.js chạy thành công!");
