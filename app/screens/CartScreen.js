import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { CartContext } from "../context/CartContext";

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } =
    useContext(CartContext);

  const totalAmount = cartItems.reduce((sum, i) => sum + i.total, 0);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const confirmClearCart = () => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa tất cả sản phẩm không?", [
      { text: "Hủy" },
      { text: "Xóa", onPress: clearCart, style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.headerBox}>
        <Text style={styles.header}>🛍️ GIỎ HÀNG</Text>
        <Text style={styles.summary}>
          Tổng sản phẩm: {totalItems} {"   "} Tổng tiền:{" "}
          {totalAmount.toLocaleString()}₫
        </Text>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.title}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống 😢</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            {/* Ảnh */}
            <Image
              source={
                typeof item.imageUrl === "string"
                  ? { uri: item.imageUrl }
                  : item.imageUrl
              }
              style={styles.image}
            />

            {/* Thông tin */}
            <View style={styles.infoBox}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.category}>
                {item.category || "Sản phẩm"}
              </Text>
            </View>

            {/* Giá tiền */}
            <Text style={styles.price}>{item.price.toLocaleString()}₫</Text>

            {/* Số lượng */}
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() =>
                  updateQuantity(item.title, Math.max(1, item.quantity - 1))
                }
              >
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>

              <View style={styles.qtyBox}>
                <Text style={styles.qtyNumber}>{item.quantity}</Text>
              </View>

              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => updateQuantity(item.title, item.quantity + 1)}
              >
                <Text style={styles.qtyText}>＋</Text>
              </TouchableOpacity>
            </View>

            {/* Nút Xóa */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.title)}
            >
              <Text style={styles.removeText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Thanh tổng tiền cố định */}
      {cartItems.length > 0 && (
        <View style={styles.floatingBar}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Tổng cộng:</Text>
            <Text style={styles.totalValue}>
              {totalAmount.toLocaleString()}₫
            </Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              navigation.navigate("Thanh Toán Dịch Vụ", {
                fromCart: true,
                amount: totalAmount,
              })
            }

          >
            <Text style={styles.checkoutText}>💳 Thanh toán ngay</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F6",
    paddingHorizontal: 10,
    paddingBottom: 90, // chừa chỗ cho thanh tổng tiền
  },
  headerBox: {
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A2306",
  },
  summary: {
    marginTop: 4,
    fontSize: 15,
    color: "#4A2306",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  infoBox: {
    flex: 1.4,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  category: {
    fontSize: 13,
    color: "#A47148",
    marginTop: 2,
  },
  price: {
    flex: 0.6,
    fontSize: 15,
    fontWeight: "bold",
    color: "#4A2306",
    textAlign: "center",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.8,
    justifyContent: "center",
  },
  qtyButton: {
    backgroundColor: "#eee",
    borderRadius: 6,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: 18,
    color: "#4A2306",
  },
  qtyBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginHorizontal: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  qtyNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  removeButton: {
    flex: 0.3,
    alignItems: "center",
  },
  removeText: {
    fontSize: 20,
    color: "#d9534f",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 40,
    color: "#888",
  },
  floatingBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    elevation: 8,
  },
  totalBox: {
    flexDirection: "column",
  },
  totalLabel: {
    fontSize: 14,
    color: "#555",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A2306",
  },
  checkoutButton: {
    backgroundColor: "#F4C542",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  checkoutText: {
    color: "#4A2306",
    fontWeight: "bold",
    fontSize: 15,
  },
});
