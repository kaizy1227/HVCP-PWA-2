import { Text, View, Image } from "react-native";
import ServicesScreen from "./screens/ServicesScreen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoursesOverviewScreen from "./screens/CoursesOverviewScreen";
import MachineScreen from "./screens/MachineScreen";
import CatDrinkScreen from "./screens/CatDrinkScreen";
import IngredientScreen from "./screens/IngredientScreen";
import FullServiceScreen from "./screens/FullServiceScreen";
import MarketingScreen from "./screens/MarketingScreen";
import ServiceReviewScreen from "./screens/ServiceReviewScreen";
import PaymentScreen from "./screens/PaymentScreen";

const Stack = createNativeStackNavigator();

// Helper function to add meta tag if not exists
function addMetaTag(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  if (!document.querySelector(selector)) {
    const meta = document.createElement("meta");
    if (property) {
      meta.property = name;
    } else {
      meta.name = name;
    }
    meta.content = content;
    document.head.appendChild(meta);
  }
}

// Helper function to add link tag if not exists
function addLinkTag(rel, href, sizes = null) {
  const selector = `link[rel="${rel}"]${href ? `[href="${href}"]` : ''}`;
  if (!document.querySelector(selector)) {
    const link = document.createElement("link");
    link.rel = rel;
    if (href) link.href = href;
    if (sizes) link.sizes = sizes;
    document.head.appendChild(link);
  }
}

export default function Index() {
  // chạy khi web
  if (typeof window !== "undefined") {
    // PWA Manifest
    addLinkTag("manifest", "/manifest.json");

    // Theme color
    addMetaTag("theme-color", "#0ea5e9");

    // iOS Safari PWA Meta Tags
    addMetaTag("apple-mobile-web-app-capable", "yes");
    addMetaTag("apple-mobile-web-app-status-bar-style", "default");
    addMetaTag("apple-mobile-web-app-title", "Học Viện Cà Phê");

    // Viewport for better mobile experience
    if (!document.querySelector('meta[name="viewport"]')) {
      addMetaTag("viewport", "width=device-width, initial-scale=1, viewport-fit=cover");
    }

    // Apple Touch Icons
    addLinkTag("apple-touch-icon", "/icons/apple-touch-icon.png");
    addLinkTag("apple-touch-icon", "/icons/icon-192.png", "192x192");

    // Additional iOS meta tags for better PWA experience
    addMetaTag("mobile-web-app-capable", "yes");
    addMetaTag("application-name", "Học Viện Cà Phê");

    // Microsoft tiles (for better Windows support)
    addMetaTag("msapplication-TileColor", "#0ea5e9");
    addMetaTag("msapplication-TileImage", "/icons/icon-192.png");

    // Open Graph meta tags (for better sharing)
    addMetaTag("og:title", "Học Viện Cà Phê - PWA", true);
    addMetaTag("og:description", "Ứng dụng học pha chế cà phê chuyên nghiệp", true);
    addMetaTag("og:image", "/icons/icon-512.png", true);
    addMetaTag("og:type", "website", true);

    // TẠM THỜI BỎ Service Worker để test
    // Service Worker Registration với iOS compatibility
    if (false && "serviceWorker" in navigator) { // Tạm tắt SW
      window.addEventListener("load", () => {
        console.log("🍎 Attempting to register service worker for iOS...");

        // Detect iOS Safari
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isIOSSafari = isIOS && /Safari/.test(navigator.userAgent) && !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);

        console.log("Device info:", { isIOS, isIOSSafari });

        navigator.serviceWorker
          .register("/service-worker.js", {
            scope: "/", // Explicit scope for iOS
            updateViaCache: 'none' // iOS Safari compatibility
          })
          .then(reg => {
            console.log("✅ SW registered successfully:", reg);
            console.log("SW scope:", reg.scope);
            console.log("SW state:", reg.installing ? 'installing' : reg.waiting ? 'waiting' : reg.active ? 'active' : 'unknown');

            // iOS specific handling
            if (isIOSSafari) {
              console.log("🍎 iOS Safari detected - using conservative approach");

              // Don't force update on iOS - let it handle naturally
              if (reg.waiting) {
                console.log("SW update waiting - letting iOS handle it");
              }
            }

            // Check if SW is controlling the page
            if (navigator.serviceWorker.controller) {
              console.log("✅ SW is controlling this page");
            } else {
              console.log("⚠️ SW is NOT controlling this page yet - iOS may need page reload");
            }

            reg.addEventListener('updatefound', () => {
              console.log('🔄 New service worker version available');
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  console.log('SW state changed:', newWorker.state);
                });
              }
            });
          })
          .catch(err => {
            console.error("❌ SW registration failed:", err);
            console.error("Error details:", err.message);

            if (isIOSSafari) {
              console.error("🍎 iOS Safari SW registration failed - this is critical for PWA");
            }
          });

        // Listen for SW messages
        navigator.serviceWorker.addEventListener('message', event => {
          console.log('📨 Message from SW:', event.data);
        });

        // Check SW state changes - important for iOS
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('🔄 SW controller changed - iOS may reload page');
        });
      });
    } else {
      console.log("❌ Service Worker not supported");
    }

    // Listen for app install prompt (optional)
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA install prompt available');
      deferredPrompt = e;
      // You can show custom install button here
    });

    // Track if app was launched from home screen
    window.addEventListener('load', () => {
      if (window.navigator.standalone === true) {
        console.log('App launched from home screen');
      }
    });
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#f6f6f6" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#f6f6f6" },
          }}
        >
          <Stack.Screen
            options={{
              headerTitle: () => (
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: 'https://hocviencaphe.vn/wp-content/uploads/2019/07/logo310x95-min.png' }}
                    style={{ width: 300, height: 55 }}
                    resizeMode="contain"
                  />
                </View>
              ),
            }}
            name="Học Viện Cà Phê"
            component={ServicesScreen}
          />
          <Stack.Screen name="Khóa Học Pha Chế" component={CoursesOverviewScreen} />
          <Stack.Screen name="Máy Pha Chế" component={MachineScreen} />
          <Stack.Screen name="Danh Mục Đồ Uống" component={CatDrinkScreen} />
          <Stack.Screen name="Nguyên Liệu Pha Chế" component={IngredientScreen} />
          <Stack.Screen name="Trọn Bộ Dịch Vụ" component={FullServiceScreen} />
          <Stack.Screen name="Marketing" component={MarketingScreen} />
          <Stack.Screen name="Form Đánh Giá Dịch Vụ" component={ServiceReviewScreen} />
          <Stack.Screen name="Thanh Toán Dịch Vụ" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}