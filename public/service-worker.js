// iOS Safari compatible service worker
const CACHE_NAME = "hvcp-ios-v1";

// Very simple install
self.addEventListener("install", (event) => {
  console.log("SW install - iOS");
  event.waitUntil(
    Promise.resolve().then(() => {
      console.log("Install complete");
    })
  );
  // Don't use skipWaiting() - iOS Safari có thể không thích
});

// Simple activate
self.addEventListener("activate", (event) => {
  console.log("SW activate - iOS");
  event.waitUntil(
    Promise.resolve().then(() => {
      console.log("Activate complete");
    })
  );
  // Don't use clients.claim() - để iOS Safari tự quản lý
});

// Fetch handler - CỰC KỲ conservative cho iOS
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // CHỈ handle navigation requests tới chính domain này
  // VÀ CHỈ handle root path
  if (
    request.method === 'GET' &&
    request.mode === 'navigate' &&
    url.origin === self.location.origin &&
    (url.pathname === '/' || url.pathname === '')
  ) {

    console.log("iOS SW: Handling root navigation");

    event.respondWith(
      // Network first - iOS Safari thích thế này hơn
      fetch(request, {
        cache: 'no-cache', // Force fresh request
        credentials: 'same-origin'
      })
      .then(response => {
        console.log("iOS SW: Network success");

        // Kiểm tra response hợp lệ
        if (!response || !response.ok) {
          throw new Error(`Network response not ok: ${response.status}`);
        }

        return response;
      })
      .catch(error => {
        console.log("iOS SW: Network failed, providing offline fallback");
        console.error("Network error:", error);

        // Fallback đơn giản cho iOS
        return new Response(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <title>Offline - Học Viện Cà Phê</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
        }
        .emoji {
            font-size: 60px;
            margin-bottom: 20px;
        }
        h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        .subtitle {
            color: #8B4513;
            font-size: 16px;
            margin-bottom: 20px;
            font-weight: 500;
        }
        p {
            color: #666;
            line-height: 1.5;
            margin-bottom: 30px;
        }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease;
            width: 100%;
        }
        .btn:active {
            transform: scale(0.98);
        }
        .status {
            background: #f8f9fa;
            color: #6c757d;
            padding: 10px;
            border-radius: 10px;
            font-size: 12px;
            margin-top: 20px;
        }
        /* iOS Safari safe area */
        @supports(padding: max(0px)) {
            body {
                padding-top: max(20px, env(safe-area-inset-top));
                padding-bottom: max(20px, env(safe-area-inset-bottom));
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="emoji">☕</div>
        <h1>Học Viện Cà Phê</h1>
        <div class="subtitle">Coffee Academy</div>
        <p>Ứng dụng hiện đang ở chế độ offline.<br>Vui lòng kiểm tra kết nối mạng và thử lại.</p>
        <button class="btn" onclick="handleReload()">Kết nối lại</button>
        <div class="status">
            Chế độ PWA - Offline Ready ✨
        </div>
    </div>

    <script>
        function handleReload() {
            // Smooth reload for iOS
            const btn = document.querySelector('.btn');
            btn.textContent = 'Đang kết nối...';
            btn.disabled = true;

            setTimeout(() => {
                window.location.reload();
            }, 500);
        }

        // Check network status
        function updateNetworkStatus() {
            if (navigator.onLine) {
                console.log('Network: Online');
            } else {
                console.log('Network: Offline');
            }
        }

        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);
        updateNetworkStatus();
    </script>
</body>
</html>`, {
          status: 200,
          statusText: 'OK',
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
      })
    );
  }

  // Tất cả requests khác: ĐỂ BROWSER TỰ XỬ LÝ
  // Không return gì cả = browser sẽ handle bình thường
});