import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const HeaderRight = () => {
  const { cartItems } = useContext(CartContext);
  const navigation = useNavigation();
  const [userName, setUserName] = useState("Nhân viên");

  // ✅ Lấy tên người dùng đăng nhập
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem("loggedInUser");
        if (user) {
          const parsed = JSON.parse(user);
          setUserName(parsed.name || "Nhân viên");
        }
      } catch (err) {
        console.log("Lỗi khi load user:", err);
      }
    };
    fetchUser();
  }, []);

  // 🚪 Hàm đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedInUser");
    navigation.replace("Đăng nhập");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginRight: 10,
      }}
    >
      {/* 🛒 Xem giỏ hàng */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Giỏ hàng")}
        style={{
          backgroundColor: "#F4C542",
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#4A2306" }}>
          🛒 ({cartItems?.length || 0})
        </Text>
      </TouchableOpacity>

      {/* 👤 Tên người dùng */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 16 }}>👤</Text>
        <Text
          style={{
            marginLeft: 6,
            color: "#333",
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          {userName}
        </Text>
      </View>

      {/* 🚪 Nút đăng xuất */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#A47148",
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
