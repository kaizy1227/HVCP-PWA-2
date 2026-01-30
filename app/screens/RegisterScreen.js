import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const API_BASE = process.env.EXPO_PUBLIC_API_BASE || "";

async function registerToServer({ name, phone, password }) {
  const res = await fetch(`${API_BASE}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, password }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Đăng ký thất bại");
  }
  return data.record_id;
}

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      if (!name.trim() || !phone.trim() || !password) {
        Alert.alert("Thiếu thông tin", "Vui lòng nhập đủ Họ tên / SĐT / Mật khẩu");
        return;
      }

      setLoading(true);

      const recordId = await registerToServer({ name, phone, password });

      Alert.alert("✅ OK", `Đã tạo tài khoản (ID: ${recordId})`);
      navigation.goBack();
    } catch (err) {
      console.log("REGISTER ERROR:", err);
      Alert.alert("❌ Lỗi", err?.message || "Không gửi được");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ĐĂNG KÝ TÀI KHOẢN</Text>

      <TextInput
        placeholder="Họ tên"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

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

      <TouchableOpacity
        onPress={handleRegister}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Đang gửi..." : "Đăng ký"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkBtn}>
        <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
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
  linkBtn: {
    marginTop: 12,
  },
  linkText: {
    color: "#fff",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
