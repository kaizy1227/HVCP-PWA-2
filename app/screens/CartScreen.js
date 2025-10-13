import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
      "🗑️ Xóa sản phẩm",
      `Bạn có chắc muốn xóa "${cartItems[index].title}" khỏi giỏ hàng?`,
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

  const handleClearCart = () => {
    Alert.alert("🧺 Xóa tất cả", "Bạn có chắc muốn xóa toàn bộ sản phẩm?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa tất cả",
        style: "destructive",
        onPress: () => setCartItems([]),
      },
    ]);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <LinearGradient
      colors={["#4A2306", "#8B5E3B", "#C6A57B"]}
      style={styles.gradientContainer}
    >

      {/* Nội dung chính */}
      <View style={styles.contentContainer}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Giỏ hàng trống 😢</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>⬅️ Quay lại mua hàng</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>
                Tổng sản phẩm: {cartItems.length}
              </Text>
              <Text style={styles.summaryText}>
                Tổng tiền: {totalAmount.toLocaleString()}₫
              </Text>
            </View>

            <FlatList
              data={cartItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.card}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardText}>Giá: {item.price}₫</Text>
                    <Text style={styles.cardText}>
                      Thành tiền: {item.total.toLocaleString()}₫
                    </Text>
                  </View>

                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => handleDecrease(index)}
                    >
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>

                    <View style={styles.qtyBox}>
                      <Text style={styles.qtyText}>{item.quantity}</Text>
                    </View>

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

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearCart}
              >
                <Text style={styles.clearButtonText}>🗑️ Xóa tất cả</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() =>
                  Alert.alert("✅ Thanh toán", "Tính năng đang được phát triển")
                }
              >
                <Text style={styles.checkoutButtonText}>💳 Thanh toán</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(74,35,6,0.9)",
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 5,
  },
  backIcon: {
    marginRight: 10,
  },
  backIconText: {
    color: "#fff",
    fontSize: 22,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
  },
  summaryContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  summaryText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#fff",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: "#f5f5f5",
    marginVertical: 2,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 8,
  },
  qtyButton: {
    backgroundColor: "#A47148",
    borderRadius: 8,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  qtyBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  clearButton: {
    backgroundColor: "#A47148",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#F4C542",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: "#4A2306",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: "#F4C542",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backButtonText: {
    color: "#4A2306",
    fontWeight: "bold",
  },
});

export default CartScreen;
