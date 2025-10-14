import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SERVICES } from "../data/dummy-data";
import { CartContext } from "../context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ServicesScreen({ navigation }) {
  const { cartItems } = useContext(CartContext);
  const [userName, setUserName] = useState("");

  // ✅ Lấy tên người dùng đang đăng nhập
  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("loggedInUser");
      if (user) {
        const parsed = JSON.parse(user);
        setUserName(parsed.name || "Nhân viên");
      }
    };
    loadUser();
  }, []);

  // ✅ Hàm đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedInUser");
    navigation.replace("Đăng nhập");
  };

  // 🛒 + 🚪 Gắn nút trên header
  useEffect(() => {
    navigation.setOptions({
    headerRight: () => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          marginRight: 10,
        }}
      >
        {/* 🛒 Giỏ hàng */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Giỏ hàng")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#112D4E",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", marginRight: 6 }}>
            🛒
          </Text>
          {cartItems.length > 0 && (
            <View
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: "red",
                borderRadius: 10,
                paddingHorizontal: 5,
                paddingVertical: 1,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 10 }}>
                {cartItems.length}
              </Text>
            </View>
          )}
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Mua hàng</Text>
        </TouchableOpacity>

        {/* 👤 Tên người dùng */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>👤</Text>
          <Text
            style={{
              marginLeft: 6,
              color: "#333",
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            {userName || "Tài khoản"}
          </Text>
        </View>

        {/* 🚪 Đăng xuất */}
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
    ),
  });
}, [cartItems, userName]);

  // ⚙️ Render từng dịch vụ
  function renderServiceItem(itemData) {
    const { id, title, imageUrl } = itemData.item;

    function pressHandler() {
      if (id === "s1")
        navigation.navigate("Khóa Học Pha Chế", { serviceId: id });
      else if (id === "s2")
        navigation.navigate("Danh Mục Đồ Uống", { serviceId: id });
      else if (id === "s3")
        navigation.navigate("Máy Pha Chế", { serviceId: id });
      else if (id === "s4")
        navigation.navigate("Nguyên Liệu Pha Chế", { serviceId: id });
      else if (id === "s5")
        navigation.navigate("Trọn Bộ Dịch Vụ", { serviceId: id });
      else if (id === "s7")
        navigation.navigate("Marketing", { serviceId: id });
      else if (id === "s9")
        navigation.navigate("Form Đánh Giá Dịch Vụ", { serviceId: id });
      else if (id === "s10")
        navigation.navigate("Thanh Toán Dịch Vụ", { serviceId: id });
    }

    return (
      <View style={styles.gridItem}>
        <Pressable
          android_ripple={{ color: "#a97c50" }}
          style={({ pressed }) => [
            styles.pressable,
            pressed && styles.buttonPressed,
          ]}
          onPress={pressHandler}
        >
          {/* Ảnh */}
          <View style={styles.imageContainer}>
            <Image
              source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
              style={styles.image}
            />
          </View>

          {/* Tiêu đề */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={SERVICES}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceItem}
        numColumns={2}
      />
    </View>
  );
}

export default ServicesScreen;

// 🎨 CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(74,35,6,0.05)", // nền nâu nhạt
    paddingTop: 10,
  },
  gridItem: {
    flex: 1,
    margin: 16,
    borderRadius: 15,
    backgroundColor: "#FFF7F0",
    height: 260,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  pressable: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  imageContainer: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 120,
    height: 120,
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 12,
  },
  titleContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A47148",
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
