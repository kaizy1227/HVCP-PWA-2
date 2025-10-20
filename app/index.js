import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image } from "react-native";

import ServicesScreen from "./screens/ServicesScreen";
import CoursesOverviewScreen from "./screens/CoursesOverviewScreen";
import MachineScreen from "./screens/MachineScreen";
import CatDrinkScreen from "./screens/CatDrinkScreen";
import IngredientScreen from "./screens/IngredientScreen";
import FullServiceScreen from "./screens/FullServiceScreen";
import EquipmentScreen from "./screens/EquipmentScreen";
import ServiceReviewScreen from "./screens/ServiceReviewScreen";
import PaymentScreen from "./screens/PaymentScreen";
import CartScreen from "./screens/CartScreen";
import { CartProvider } from "./context/CartContext";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

// Đăng ký Service Worker và manifest
if (typeof window !== "undefined") {
    if (!document.querySelector('link[rel="manifest"]')) {
        const link = document.createElement("link");
        link.rel = "manifest";
        link.href = "/manifest.json";
        document.head.appendChild(link);
    }

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((regs) => {
            regs.forEach((r) => r.unregister());
        });

        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/service-worker.js", { scope: "/" })
                .then(() => console.log("✅ SW registered"))
                .catch((err) => console.log("❌ SW error:", err));
        });
    }

}
export default function Index() {
    return (
        <>
            <StatusBar style="dark" />
            <CartProvider>
                <NavigationContainer independent={true}>
                    <Stack.Navigator
                        initialRouteName="Đăng nhập"
                        screenOptions={{
                            headerStyle: { backgroundColor: "#f6f6f6" },
                            headerTintColor: "white",
                            contentStyle: { backgroundColor: "#f6f6f6" },
                        }}
                    >
                        <Stack.Screen
                            name="Đăng nhập"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="Học Viện Cà Phê"
                            component={ServicesScreen}
                            options={{
                                headerTitle: () => (
                                    <View style={{ alignItems: "center" }}>
                                        <Image
                                            source={{
                                                uri: "https://hocviencaphe.vn/wp-content/uploads/2019/07/logo310x95-min.png",
                                            }}
                                            style={{ width: 300, height: 55 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                ),
                            }}
                        />
                        <Stack.Screen name="Khóa Học Pha Chế" component={CoursesOverviewScreen} />
                        <Stack.Screen name="Máy Pha Chế" component={MachineScreen} />
                        <Stack.Screen name="Danh Mục Đồ Uống" component={CatDrinkScreen} />
                        <Stack.Screen name="Nguyên Liệu Pha Chế" component={IngredientScreen} />
                        <Stack.Screen name="Trọn Bộ Dịch Vụ" component={FullServiceScreen} />
                        <Stack.Screen name="Vật Liệu Setup Quán" component={EquipmentScreen} />
                        <Stack.Screen name="Form Đánh Giá Dịch Vụ" component={ServiceReviewScreen} />
                        <Stack.Screen name="Thanh Toán Dịch Vụ" component={PaymentScreen} />
                        <Stack.Screen
                            name="Giỏ hàng"
                            component={CartScreen}
                            options={{
                                title: "GIỎ HÀNG",
                                headerStyle: { backgroundColor: "rgba(74,35,6,0.9)" },
                                headerTintColor: "#fff",
                                headerTitleStyle: { fontWeight: "bold", textTransform: "uppercase" },
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </CartProvider>
        </>
    );
}
