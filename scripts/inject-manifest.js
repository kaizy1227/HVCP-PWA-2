const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");
const indexPath = path.join(distDir, "index.html");
const swSrc = path.join(__dirname, "..", "public", "service-worker.js");
const swDest = path.join(distDir, "service-worker.js");
const manifestSrc = path.join(__dirname, "..", "public", "manifest.json");
const manifestDest = path.join(distDir, "manifest.json");

// 1. Copy service-worker.js
if (fs.existsSync(swSrc)) {
  fs.copyFileSync(swSrc, swDest);
  console.log("✅ Copied service-worker.js to dist/");
}

// 2. Copy manifest.json
if (fs.existsSync(manifestSrc)) {
  fs.copyFileSync(manifestSrc, manifestDest);
  console.log("✅ Copied manifest.json to dist/");
}

// 3. Inject manifest + register SW
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, "utf-8");

  // Thêm manifest link nếu chưa có
  if (!html.includes("manifest.json")) {
    html = html.replace(
      "</head>",
      `  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#0ea5e9" />
</head>`
    );
  }

  // Thêm script register service worker
  if (!html.includes("navigator.serviceWorker.register")) {
    html = html.replace(
      "</body>",
      `  <script>
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then(reg => console.log("✅ SW registered:", reg))
          .catch(err => console.error("❌ SW failed:", err));
      });
    }
  </script>
</body>`
    );
  }

  fs.writeFileSync(indexPath, html, "utf-8");
  console.log("✅ Injected manifest & SW register into dist/index.html");
}
