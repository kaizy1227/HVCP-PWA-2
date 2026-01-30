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
import { USERS } from "../data/dummy-data";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // ✅ Kiểm tra nếu đã đăng nhập trước đó
    useEffect(() => {
        const checkLogin = async () => {
            const user = await AsyncStorage.getItem("loggedInUser");
            if (user) navigation.replace("Học Viện Cà Phê");
        };
        checkLogin();
    }, []);

    const handleLogin = async () => {
        const user = USERS.find(
            (u) => u.username === username && u.password === password
        );

        if (!user) {
            Alert.alert("❌ Sai thông tin", "Tên đăng nhập hoặc mật khẩu không đúng!");
            return;
        }

        await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
        Alert.alert("✅ Đăng nhập thành công", `Chào ${user.name}!`);
        navigation.replace("Học Viện Cà Phê");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ĐĂNG NHẬP NỘI BỘ</Text>

            <TextInput
                placeholder="Tên đăng nhập (admin)"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Mật khẩu (123)"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Đăng ký")}
              style={{ marginTop: 12 }}
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
