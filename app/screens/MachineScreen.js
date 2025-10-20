import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
  Easing,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SERVICES, MACHINES, CATMACHINES } from "../data/dummy-data";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";
import HeaderRight from "../components/HeaderRight";
import { commonHeaderOptions } from "../components/headerOptions";

const MachineScreen = ({ route, navigation }) => {
  const mccID = route.params.serviceId;
  const { width } = Dimensions.get("window");
  const { addToCart, cartItems } = useContext(CartContext);

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [searchText, setSearchText] = useState("");
  const [filteredMachines, setFilteredMachines] = useState([]);

  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const fadeListAnim = useRef(new Animated.Value(0)).current;
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const displayedMachines = MACHINES.filter((machine) =>
    machine.catmachineIds.includes(selectedCategory)
  );

  const handleSearch = () => {
    const text = searchText.toLowerCase().trim();
    if (text === "") {
      setFilteredMachines([]);
      return;
    }
    const filtered = MACHINES.filter(
      (item) =>
        item.title.toLowerCase().includes(text) ||
        item.material?.toLowerCase().includes(text)
    );
    setFilteredMachines(filtered);
  };

  useEffect(() => {
    const service = SERVICES.find((service) => service.id === mccID);
    if (service) {
      navigation.setOptions({
        ...commonHeaderOptions,
        title: service.title,
      });
    }
  }, [mccID, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight />,
    });
  }, [navigation]);

  useEffect(() => {
    if (selectedCategory) {
      fadeListAnim.setValue(0);
      Animated.timing(fadeListAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [selectedCategory]);

  const toggleSidebar = () => {
    const toValue = sidebarVisible ? -wp("70%") : 0;
    Animated.timing(sidebarAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(!sidebarVisible));
  };

  const handlePress = (item) => {
    setSelectedMachine(item);
    setQuantity("1");
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      Alert.alert("Lỗi", "Vui lòng nhập số lượng hợp lệ");
      return;
    }

    const numericPrice = parseInt(
      String(selectedMachine.price).replace(/[^\d]/g, "")
    );

    addToCart({
      id: selectedMachine.id,
      title: selectedMachine.title,
      price: numericPrice,
      quantity: qty,
      imageUrl: selectedMachine.imageUrl,
      catmachineIds: selectedMachine.catmachineIds,
    });

    Alert.alert("🛒 Thành công", `${selectedMachine.title} đã được thêm!`);
    setModalVisible(false);
  };

  const handleQuickAdd = (item) => {
    const numericPrice = parseInt(String(item.price).replace(/[^\d]/g, ""));
    addToCart({
      id: item.id,
      title: item.title,
      price: numericPrice,
      quantity: 1,
      imageUrl: item.imageUrl,
      catmachineIds: item.catmachineIds,
    });
    Alert.alert("🛒", `${item.title} đã được thêm vào giỏ hàng`);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <View style={{ flex: 1, flexDirection: isDesktop ? "row" : "column" }}>
      {!isDesktop && (
        <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
          <Text style={{ color: "white" }}>
            {sidebarVisible ? "Ẩn Menu" : "☰ Menu"}
          </Text>
        </TouchableOpacity>
      )}

      {(!isDesktop || sidebarVisible) && (
        <Animated.View
          style={[
            styles.sidebar,
            {
              width: isDesktop ? "25%" : wp("70%"),
              left: sidebarAnim,
              position: isDesktop ? "relative" : "absolute",
              zIndex: 10,
            },
          ]}
        >
          <FlatList
            data={CATMACHINES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory(item.id);
                  setFilteredMachines([]);
                  if (!isDesktop) toggleSidebar();
                }}
              >
                <Text style={styles.coursetitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}

      <View
        style={{
          flex: 1,
          marginLeft: !isDesktop && sidebarVisible ? wp("70%") : 0,
          padding: isDesktop ? 30 : 15,
        }}
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Tìm thiết bị, máy móc..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Tìm</Text>
          </TouchableOpacity>
        </View>

        {selectedCategory ? (
          <Animated.View style={{ opacity: fadeListAnim }}>
            <FlatList
              data={
                filteredMachines.length > 0 ? filteredMachines : displayedMachines
              }
              keyExtractor={(item) => item.id}
              numColumns={isDesktop ? 3 : isTablet ? 2 : 1}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handlePress(item)}
                >
                  <Image
                    source={
                      typeof item.imageUrl === "string"
                        ? { uri: item.imageUrl }
                        : item.imageUrl
                    }
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <View style={{ padding: 10, alignItems: "center" }}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardText}>Giá: {item.price}₫</Text>
                    <TouchableOpacity
                      style={styles.addQuickButton}
                      onPress={() => handleQuickAdd(item)}
                    >
                      <Text style={styles.addQuickButtonText}>＋</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "#A47148", fontSize: 18 }}>
              👉 Chọn danh mục để xem danh sách máy
            </Text>
          </View>
        )}
      </View>

      {/* Modal chi tiết */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedMachine && (
              <>
                <Image
                  source={
                    typeof selectedMachine.imageUrl === "string"
                      ? { uri: selectedMachine.imageUrl }
                      : selectedMachine.imageUrl
                  }
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <Text style={styles.modalTitle}>{selectedMachine.title}</Text>
                <Text style={styles.modalInfo}>
                  Giá: {selectedMachine.price}₫
                </Text>

                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() =>
                      setQuantity((prev) =>
                        Math.max(1, parseInt(prev) - 1).toString()
                      )
                    }
                  >
                    <Text style={styles.qtyButtonText}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.qtyBox}>
                    <Text style={styles.qtyText}>{quantity}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() =>
                      setQuantity((parseInt(quantity) + 1).toString())
                    }
                  >
                    <Text style={styles.qtyButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={handleAddToCart}
                  style={styles.addButtonHorizontal}
                >
                  <Text style={styles.addButtonText}>🛒 Thêm vào giỏ hàng</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* 🧾 Tổng tiền giỏ hàng */}
      {cartItems.length > 0 && (
        <View style={styles.cartSummaryContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Giỏ hàng")}
            style={styles.cartSummaryButton}
          >
            <View>
              <Text style={styles.cartTotalText}>
                🛒 Tổng cộng: {totalPrice.toLocaleString("vi-VN")} ₫
              </Text>
              <Text style={styles.cartHintText}>Nhấn để xem giỏ hàng</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MachineScreen;

const styles = StyleSheet.create({
  toggleButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 20,
    backgroundColor: "#4A2306",
    padding: 10,
    borderRadius: 5,
  },
  sidebar: {
    backgroundColor: "#4A2306",
    padding: 15,
    height: "100%",
  },
  coursetitle: {
    backgroundColor: "#A47148",
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#A47148",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#A47148",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "rgba(74, 35, 6, 0.85)",
    borderRadius: 18,
    margin: 10,
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: hp("25%"),
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  addQuickButton: {
    marginTop: 8,
    backgroundColor: "#A47148",
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  addQuickButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(58, 28, 8, 0.95)",
    paddingTop: 40,
  },
  scrollViewContent: {
    alignItems: "center",
    padding: 20,
  },
  modalImage: {
    width: wp("90%"),
    height: hp("60%"),
    borderRadius: 12,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  modalInfo: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 5,
    textAlign: "center",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    gap: 10,
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
    fontSize: 20,
    fontWeight: "bold",
  },
  qtyBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  addButtonHorizontal: {
    backgroundColor: "#A47148",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#F4C542",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  closeButtonText: {
    color: "#4A2306",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartSummaryContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 50,
    backgroundColor: "#4A2306",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  cartSummaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  cartTotalText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  cartHintText: {
    color: "#F4C542",
    fontSize: 13,
    marginTop: 4,
    textAlign: "left",
  },
});
