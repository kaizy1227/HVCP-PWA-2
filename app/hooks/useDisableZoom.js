import { useEffect } from "react";
import { Platform } from "react-native";

export default function useDisableZoom() {
  useEffect(() => {
    if (Platform.OS === "web") {
      // Ngăn Ctrl + cuộn chuột (zoom)
      const preventZoom = (e) => {
        if (e.ctrlKey) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      // Ngăn pinch gesture trên cảm ứng
      const preventGesture = (e) => e.preventDefault();

      document.addEventListener("wheel", preventZoom, { passive: false });
      document.addEventListener("gesturestart", preventGesture);
      document.addEventListener("gesturechange", preventGesture);
      document.addEventListener("gestureend", preventGesture);

      return () => {
        document.removeEventListener("wheel", preventZoom);
        document.removeEventListener("gesturestart", preventGesture);
        document.removeEventListener("gesturechange", preventGesture);
        document.removeEventListener("gestureend", preventGesture);
      };
    }
  }, []);
}
