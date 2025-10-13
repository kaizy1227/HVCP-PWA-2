import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

const CartScreen = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState(route.params?.cartItems || []);

  const handleIncrease = (index) => {
    const newCart = [...cartItems];
    newCart[index].quantity += 1;
    newCart[index].total = newCart[index].price * newCart[index].quantity;
    setCartItems(newCart);
  };

  const handleDecrease = (index) => {
    const newCart = [...cartItems];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      newCart[index].total = newCart[index].price * newCart[index].quantity;
      setCartItems(newCart);
    }
  };

  const handleRemove = (index) => {
    Alert.alert(
      "Xóa sản phẩm",
      `Bạn có chắc muốn xóa ${cartItems[index].title} khỏi giỏ hàng?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            const newCart = cartItems.filter((_, i) => i !== index);
            setCartItems(newCart);
          },
        },
      ]
    );
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Giỏ hàng của bạn</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemText}>Giá: {item.price}</Text>
                <Text style={styles.itemText}>
                  Tổng: {item.total.toLocaleString()}₫
                </Text>
              </View>

              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => handleDecrease(index)}
                >
                  <Text style={styles.qtyButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => handleIncrease(index)}
                >
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(index)}
              >
                <Text style={styles.removeButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Tổng cộng: {totalAmount.toLocaleString()}₫
          </Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => Alert.alert("✅ Đặt hàng", "Tính năng đang phát triển")}
          >
            <Text style={styles.checkoutButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EFE7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4A2306",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#999",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemText: {
    fontSize: 14,
    color: "#555",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  qtyButton: {
    backgroundColor: "#A47148",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  qtyButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  qtyText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: "#d9534f",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  totalContainer: {
    marginTop: 15,
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A2306",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#F4C542",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
