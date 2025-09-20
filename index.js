import 'expo-router/entry'; // hoặc './App' nếu bạn không dùng expo-router

// Đăng ký SW
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .catch((err) => console.warn("SW register failed:", err));
  });
}
