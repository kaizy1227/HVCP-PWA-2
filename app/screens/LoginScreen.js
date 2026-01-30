import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Nếu rỗng => dùng cùng domain (khi deploy Vercel)
const API_BASE = process.env.EXPO_PUBLIC_API_BASE || "";

async function loginToServer({ phone, password }) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Đăng nhập thất bại");
  }
  return data.user; // { record_id, name, phone }
}

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");      // đổi username -> phone
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Kiểm tra nếu đã đăng nhập trước đó
  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem("loggedInUser");
      if (user) navigation.replace("Học Viện Cà Phê");
    };
    checkLogin();
  }, [navigation]);

const handleLogin = async () => {
  try {
    if (!phone.trim() || !password) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập tài khoản và mật khẩu");
      return;
    }

    // ✅ Admin local chỉ chạy khi bật flag
    const localAdminEnabled = process.env.EXPO_PUBLIC_LOCAL_ADMIN === "true";
    const adminPhone = process.env.EXPO_PUBLIC_ADMIN_PHONE || "admin";
    const adminPassword = process.env.EXPO_PUBLIC_ADMIN_PASSWORD || "123";

    if (localAdminEnabled && phone.trim() === adminPhone && password === adminPassword) {
      const user = { record_id: "local-admin", name: "Admin (Local)", phone: adminPhone };
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
      Alert.alert("✅ Đăng nhập thành công", "Chào Admin (Local)!");
      navigation.replace("Học Viện Cà Phê");
      return;
    }

    // ✅ Nếu không phải admin local thì login bằng Lark API như bình thường
    setLoading(true);

    const user = await loginToServer({ phone, password });

    await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
    Alert.alert("✅ Đăng nhập thành công", `Chào ${user.name || "bạn"}!`);
    navigation.replace("Học Viện Cà Phê");
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    Alert.alert("❌ Đăng nhập thất bại", "Vui lòng kiểm tra lại thông tin đăng nhập");
  } finally {
    setLoading(false);
  }
};



  return (
    <View style={styles.container}>
      <Text style={styles.title}>ĐĂNG NHẬP NỘI BỘ</Text>

      <TextInput
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Đang đăng nhập..." : "Đăng nhập"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Đăng ký")}
        style={{ marginTop: 12 }}
        disabled={loading}
      >
        <Text style={{ color: "#fff", textDecorationLine: "underline" }}>
          Chưa có tài khoản? Đăng ký
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(74,35,6,0.67)",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "80%",
    padding: 10,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#F4C542",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#4A2306",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
