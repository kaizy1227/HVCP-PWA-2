import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  useWindowDimensions,
  Animated,
  Easing,
} from "react-native";
import { SERVICES, CATDRINKS, DRINKS, INGREDIENTS } from "../data/dummy-data";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CartContext } from "../context/CartContext";
import HeaderRight from "../components/HeaderRight";

const CatDrinkScreen = ({ route, navigation }) => {
  const seID = route.params.serviceId;
  const { width } = useWindowDimensions();
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [slideAnim] = useState(new Animated.Value(1000)); // hiệu ứng trượt

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const { addToCart, cartItems } = useContext(CartContext);

  const displayedDrinks = DRINKS.filter((drink) =>
    drink.catdrinkIds.includes(selectedCategory)
  );

  useEffect(() => {
    const service = SERVICES.find((service) => service.id === seID);
    if (service) {
      navigation.setOptions({
        title: service.title.toUpperCase(),
        headerTintColor: "white",
        headerStyle: { backgroundColor: "rgba(74, 35, 6, 0.67)" },
      });
    }
  }, [seID, navigation]);

  // ✅ Hiển thị nút "Xem giỏ hàng" ở góc phải header
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
    setSelectedDrink(item);
    setModalVisible(true);
  };

  const linkedIngredients = INGREDIENTS.filter((ing) =>
    (selectedDrink?.ingredientRefs || []).some(
      (ref) => ref?.trim().toLowerCase() === ing.id?.trim().toLowerCase()
    )
  );

  const getImageUri = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : window.location.origin + path;
  };

  // 🔄 Hiệu ứng trượt cho modal phụ
  const openIngredientModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIngredientModalVisible(true);
    setModalVisible(false);

    slideAnim.setValue(width); // bắt đầu trượt từ phải
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeIngredientModal = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIngredientModalVisible(false);
      setModalVisible(true);
    });
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
            data={CATDRINKS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory(item.id);
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
        {selectedCategory && (
          <FlatList
            data={displayedDrinks}
            keyExtractor={(item) => item.id}
            numColumns={isDesktop ? 2 : isTablet ? 3 : 3}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handlePress(item)}
                activeOpacity={0.85}
              >
                <Image
                  source={{ uri: getImageUri(item.thumbnailUrl) }}
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={{ padding: isDesktop ? 20 : 10 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <TouchableOpacity
                    onPress={() => handlePress(item)}
                    style={styles.viewButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.viewButtonText}>Xem</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

    {/* Modal chính: chi tiết đồ uống */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>

        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image
              source={{ uri: getImageUri(selectedDrink?.fullImageUrl) }}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <Text style={styles.modalTitle}>{selectedDrink?.title}</Text>

            {selectedDrink?.recipe && (
              <View style={styles.recipeBox}>
                <Text style={styles.recipeTitle}>🍹 Công thức pha chế</Text>
                <Text style={styles.recipeText}>{selectedDrink.recipe}</Text>
              </View>
            )}

            {linkedIngredients.length > 0 && (
              <View style={styles.relatedBox}>
                <Text style={styles.relatedTitle}>🧂 Nguyên liệu sử dụng</Text>
                {linkedIngredients.map((ing) => (
                  <View key={ing.id} style={styles.ingredientItem}>
                    <Image
                      source={{ uri: getImageUri(ing.imageUrl) }}
                      style={styles.ingredientImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.ingredientName}>{ing.title}</Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => openIngredientModal(ing)}
                    >
                      <Text style={styles.addButtonText}>Xem</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal phụ: chi tiết nguyên liệu với hiệu ứng trượt */}
      {ingredientModalVisible && (
        <Animated.View
          style={[
            styles.animatedModal,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {selectedIngredient && (
                <>
                  <Image
                    source={{ uri: getImageUri(selectedIngredient.imageUrl) }}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.modalTitle}>{selectedIngredient.title}</Text>
                  <Text style={styles.recipeText}>
                    Giá: {selectedIngredient.price} ₫
                  </Text>
                  <Text style={styles.recipeText}>
                    Quy cách: {selectedIngredient.unit}
                  </Text>

                  {/* Chọn số lượng */}
                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() =>
                        setSelectedIngredient((prev) => ({
                          ...prev,
                          quantity: Math.max(1, (prev.quantity || 1) - 1),
                        }))
                      }
                    >
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>

                    <View style={styles.qtyBox}>
                      <Text style={styles.qtyText}>
                        {selectedIngredient.quantity || 1}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() =>
                        setSelectedIngredient((prev) => ({
                          ...prev,
                          quantity: (prev.quantity || 1) + 1,
                        }))
                      }
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Nút thêm giỏ hàng */}
                  <TouchableOpacity
                    style={styles.addButtonHorizontal}
                    onPress={() => {
                      const numericPrice = parseInt(
                        String(selectedIngredient.price).replace(/[^\d]/g, "")
                      );
                      const quantity = selectedIngredient.quantity || 1;

                      addToCart({
                        id: selectedIngredient.id,
                        title: selectedIngredient.title,
                        price: numericPrice,
                        quantity,
                        imageUrl: selectedIngredient.imageUrl,
                      });

                      alert(
                        `🛒 Đã thêm ${quantity} x ${selectedIngredient.title} vào giỏ hàng!`
                      );
                    }}
                  >
                    <Text style={styles.addButtonText}>🛒 Thêm vào giỏ hàng</Text>
                  </TouchableOpacity>

                  {/* Quay lại đồ uống */}
                  <TouchableOpacity
                    onPress={closeIngredientModal}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>← Quay lại đồ uống</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default CatDrinkScreen;

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
  card: {
    backgroundColor: "rgba(74, 35, 6, 0.67)",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    flex: 1,
  },
  image: {
    width: wp("16%"),
    height: hp("16%"),
    borderRadius: 10,
    alignSelf: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: "#A47148",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: "center",
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
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
  recipeBox: {
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 15,
    width: "85%",
  },
  recipeTitle: {
    color: "#F4C542",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  recipeText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  relatedBox: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 15,
  },
  relatedTitle: {
    color: "#F4C542",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  ingredientImage: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 10,
  },
  ingredientName: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#A47148",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 30,
    backgroundColor: "#A47148",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addButtonHorizontal: {
    backgroundColor: "#A47148",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
  animatedModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(74, 35, 6, 0.97)",
    zIndex: 999,
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
});