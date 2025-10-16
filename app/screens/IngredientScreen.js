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
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SERVICES, INGREDIENTS, CATINGREDIENTS } from "../data/dummy-data";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";
import HeaderRight from "../components/HeaderRight";


const IngredientScreen = ({ route, navigation }) => {
  const mccID = route.params.serviceId;
  const { width } = Dimensions.get("window");
  const { addToCart, cartItems } = useContext(CartContext);

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [searchText, setSearchText] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const displayedIngredients = INGREDIENTS.filter((ingredient) =>
    ingredient.catingredientIds.includes(selectedCategory)
  );

  const handleSearch = () => {
    const text = searchText.toLowerCase().trim();
    if (text === "") {
      setFilteredIngredients([]);
      return;
    }
    const filtered = INGREDIENTS.filter(
      (item) =>
        item.title.toLowerCase().includes(text) ||
        item.material?.toLowerCase().includes(text)
    );
    setFilteredIngredients(filtered);
  };

  useEffect(() => {
    const service = SERVICES.find((service) => service.id === mccID);
    if (service) {
      const serviceTitle = service.title.toUpperCase();
      navigation.setOptions({
        title: serviceTitle,
        headerTintColor: "white",
        headerStyle: { backgroundColor: "rgba(74, 35, 6, 0.67)" },
      });
    }
  }, [mccID, navigation]);

useEffect(() => {
  navigation.setOptions({
    headerRight: () => <HeaderRight />,
  });
}, [navigation]);


  const toggleSidebar = () => {
    const toValue = sidebarVisible ? -wp("70%") : 0;
    Animated.timing(sidebarAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(!sidebarVisible));
  };

  const handlePress = (item) => {
    setSelectedIngredient(item);
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
      String(selectedIngredient.price).replace(/[^\d]/g, "")
    );

    addToCart({
      id: selectedIngredient.id,
      title: selectedIngredient.title,
      price: numericPrice,
      quantity: qty,
      imageUrl: selectedIngredient.imageUrl,
      catingredientIds: selectedIngredient.catingredientIds, // ✅ giữ để hiển thị danh mục đúng
    });

    Alert.alert("🛒 Thành công", `${selectedIngredient.title} đã được thêm!`);
    setModalVisible(false);
  };

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
            data={CATINGREDIENTS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory(item.id);
                  setFilteredIngredients([]);
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
        {/* Thanh tìm kiếm */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm sản phẩm, nguyên liệu..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Tìm</Text>
          </TouchableOpacity>
        </View>

        {/* Hiển thị sản phẩm */}
        {(filteredIngredients.length > 0 || selectedCategory) && (
          <FlatList
            data={
              filteredIngredients.length > 0
                ? filteredIngredients
                : displayedIngredients
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
                  resizeMode="cover"
                />
                <View style={{ padding: 10 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardText}>Giá: {item.price}₫</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Modal chi tiết sản phẩm */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedIngredient && (
              <>
                <Image
                  source={
                    typeof selectedIngredient.imageUrl === "string"
                      ? { uri: selectedIngredient.imageUrl }
                      : selectedIngredient.imageUrl
                  }
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <Text style={styles.modalTitle}>
                  {selectedIngredient.title}
                </Text>
                <Text style={styles.modalInfo}>
                  Giá: {selectedIngredient.price}₫
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
    </View>
  );
};

export default IngredientScreen;

const styles = StyleSheet.create({
  toggleButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 20,
    backgroundColor: "#4A2306",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    margin: 10,
  },
  sidebar: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    height: "100%",
  },
  coursetitle: {
    lineHeight: 28,
    color: "#ffffff",
    backgroundColor: "rgba(74, 35, 6, 0.67)",
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    textTransform: "uppercase",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 5,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
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
    backgroundColor: "rgba(74, 35, 6, 0.67)",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    flex: 1,
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
  },
  cardText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(74, 35, 6, 0.95)",
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
    textTransform: "uppercase",
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
});
