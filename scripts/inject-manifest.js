const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "../dist");
const swPath = path.join(__dirname, "../public/service-worker.js");

// Các file cố định
const baseAssets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png"
];

// Quét dist để lấy thêm JS/CSS
function getDistAssets(dir) {
  let results = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getDistAssets(fullPath));
    } else {
      const relPath = "/" + path.relative(distDir, fullPath).replace(/\\/g, "/");
      // chỉ lấy js, css
      if (relPath.endsWith(".js") || relPath.endsWith(".css")) {
        results.push(relPath);
      }
    }
  });

  return results;
}

const distAssets = getDistAssets(distDir);
const precacheList = JSON.stringify([...baseAssets, ...distAssets], null, 2);

// Đọc service-worker.js template
let swContent = fs.readFileSync(swPath, "utf8");

// Thay placeholder __PRECACHE_ASSETS__
swContent = swContent.replace("__PRECACHE_ASSETS__", precacheList);

// Ghi đè lại file
fs.writeFileSync(swPath, swContent);

console.log("✅ Injected precache assets vào service-worker.js");
