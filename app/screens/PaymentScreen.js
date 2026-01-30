import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  Modal,
  Linking,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { SERVICES } from "../data/dummy-data";
import CustomDropdown from "../components/CustomDropdown";

const PaymentScreen = ({ route, navigation }) => {
  const mccID = route.params?.serviceId;

  const [customerName, setCustomerName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentType, setPaymentType] = useState("cọc");
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

useEffect(() => {
  const service = SERVICES.find((s) => s.id === mccID);

  navigation.setOptions({
    // nếu có service thì đổi title theo service, không thì dùng title mặc định
    title: service ? service.title.toUpperCase() : "THANH TOÁN DỊCH VỤ",
    headerTintColor: "white",
    headerStyle: { backgroundColor: "rgba(74, 35, 6, 0.67)" },
    headerTitleStyle: { textTransform: "uppercase" },
  });
}, [mccID, navigation]);


  // ✅ Config tài khoản nhận (đổi theo của bạn)
  const BANK_NAME = "ACB";        // theo format sepay đang dùng
  const ACCOUNT_NUMBER = "13474611";

  const parsedAmount = useMemo(() => {
    // Cho phép user nhập "8,236,000" vẫn parse được
    const raw = String(paymentAmount || "").replace(/[^\d]/g, "");
    return raw ? Number(raw) : 0;
  }, [paymentAmount]);

  const handleSubmit = async () => {
    if (!customerName.trim() || !parsedAmount) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const description = `Thanh toán ${paymentType} - ${customerName.trim()}`;
    const qrUrl =
      `https://qr.sepay.vn/img` +
      `?acc=${encodeURIComponent(ACCOUNT_NUMBER)}` +
      `&bank=${encodeURIComponent(BANK_NAME)}` +
      `&amount=${encodeURIComponent(String(parsedAmount))}` +
      `&des=${encodeURIComponent(description)}`;

    // ✅ Hiển thị QR ngay trong app
    setQrCodeValue(qrUrl);
    setModalVisible(true);

    // ❌ Nếu bạn không có backend, KHÔNG cần đoạn fetch này.
    // Nếu bạn muốn "ghi nhận" thanh toán ở local (không backend),
    // bạn có thể lưu vào AsyncStorage/IndexedDB sau.
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Tên khách hàng:</Text>
        <TextInput
          style={styles.input}
          value={customerName}
          onChangeText={setCustomerName}
          placeholder="Nhập tên khách hàng"
        />

        <Text style={styles.label}>Số tiền thanh toán:</Text>
        <TextInput
          style={styles.input}
          value={paymentAmount}
          onChangeText={setPaymentAmount}
          placeholder="Nhập số tiền"
          keyboardType="numeric"
        />

        <CustomDropdown
          label="Loại thanh toán:"
          selectedValue={paymentType}
          onSelect={setPaymentType}
          options={[
            { label: "Cọc", value: "cọc" },
            { label: "Thanh toán đủ", value: "thanh toán đủ" },
          ]}
        />

        <Button title="Tạo QR thanh toán" onPress={handleSubmit} />
      </View>

      {/* ✅ Modal hiển thị QR để khách quét */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Quét QR để thanh toán</Text>

            <Text style={styles.modalAmount}>
              {parsedAmount.toLocaleString("vi-VN")}đ
            </Text>

            {!!qrCodeValue && (
              <Image
                source={{ uri: qrCodeValue }}
                style={styles.qrImage}
                resizeMode="contain"
              />
            )}

            <View style={styles.modalRow}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnOutline]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnOutlineText}>Đóng</Text>
              </TouchableOpacity>

              {/* Tuỳ chọn: mở ảnh QR bằng trình duyệt (không bắt buộc) */}
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnPrimary]}
                onPress={() => {
                  if (!qrCodeValue) return;
                  Linking.openURL(qrCodeValue).catch(() =>
                    Alert.alert("Lỗi", "Không thể mở liên kết.")
                  );
                }}
              >
                <Text style={styles.modalBtnPrimaryText}>Mở QR</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalHint}>
              Khách mở app ngân hàng → Quét QR → Xác nhận (không cần nhập tay).
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    paddingBottom: 100,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    elevation: 6,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4A2306",
    marginBottom: 6,
  },
  modalAmount: {
    fontSize: 20,
    fontWeight: "800",
    color: "#4A2306",
    marginBottom: 10,
  },
  qrImage: {
    width: 280,
    height: 360,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    width: "100%",
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBtnOutline: {
    borderWidth: 1,
    borderColor: "#4A2306",
    backgroundColor: "#fff",
  },
  modalBtnOutlineText: {
    color: "#4A2306",
    fontWeight: "700",
  },
  modalBtnPrimary: {
    backgroundColor: "#4A2306",
  },
  modalBtnPrimaryText: {
    color: "#fff",
    fontWeight: "800",
  },
  modalHint: {
    marginTop: 10,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

export default PaymentScreen;
