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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fadeListAnim = useRef(new Animated.Value(0)).current;
  const displayedDrinks = DRINKS.filter((drink) =>
    drink.catdrinkIds.includes(selectedCategory)
  );
    // Hiệu ứng fade ảnh
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const changeImage = (direction) => {
      if (!Array.isArray(selectedDrink?.fullImageUrl)) return;
      const total = selectedDrink.fullImageUrl.length;

      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageIndex((prev) =>
          direction === "next"
            ? (prev + 1) % total
            : (prev - 1 + total) % total
        );
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    };

  useEffect(() => {
    const service = SERVICES.find((service) => service.id === seID);
    if (service) {
      navigation.setOptions({
        title: service.title,
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

    useEffect(() => {
      if (selectedCategory) {
        fadeListAnim.setValue(0);
        Animated.timing(fadeListAnim, {
          toValue: 1,
          duration: 1000,
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
    setSelectedDrink(item);
    setCurrentImageIndex(0); // ✅ Đảm bảo mở Modal bắt đầu từ ảnh đầu tiên
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
        }}>

{selectedCategory && (
  <Animated.View style={{ flex: 1, opacity: fadeListAnim }}>
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
          <View style={styles.cardContent}>
            <Image
              source={{ uri: getImageUri(item.thumbnailUrl) }}
              style={styles.image}
              resizeMode="contain"
            />
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
  </Animated.View>
)}


        )}
      </View>

    {/* Modal chính: chi tiết đồ uống */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>

        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* ✅ Ảnh có hiệu ứng chuyển mượt */}
            {selectedDrink?.fullImageUrl && (
              <View style={{ alignItems: "center" }}>
                <Animated.Image
                  source={{
                    uri: Array.isArray(selectedDrink.fullImageUrl)
                      ? getImageUri(selectedDrink.fullImageUrl[currentImageIndex])
                      : getImageUri(selectedDrink.fullImageUrl),
                  }}
                  style={[styles.modalImage, { opacity: fadeAnim }]}
                  resizeMode="contain"
                />

                {/* ✅ Nút điều hướng trái/phải */}
                {Array.isArray(selectedDrink.fullImageUrl) &&
                  selectedDrink.fullImageUrl.length > 1 && (
                    <>
                      <TouchableOpacity
                        style={[styles.navButton, { left: 10 }]}
                        onPress={() => changeImage("prev")}
                      >
                        <Text style={styles.navButtonText}>‹</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.navButton, { right: 10 }]}
                        onPress={() => changeImage("next")}
                      >
                        <Text style={styles.navButtonText}>›</Text>
                      </TouchableOpacity>

                      {/* ✅ Dấu “...” hiển thị vị trí ảnh */}
                      <View style={styles.dotContainer}>
                        {selectedDrink.fullImageUrl.map((_, i) => (
                          <View
                            key={i}
                            style={[
                              styles.dot,
                              i === currentImageIndex && styles.dotActive,
                            ]}
                          />
                        ))}
                      </View>
                    </>
                  )}
              </View>
            )}

            {/* Tên món */}
            <Text style={styles.modalTitle}>{selectedDrink?.title}</Text>

            {/* Công thức */}
            {selectedDrink?.recipe && (
              <View style={styles.recipeBox}>
                <Text style={styles.recipeTitle}>🍹 Công thức pha chế</Text>

                {/* ✅ Bọc thêm container để căn giữa */}
                <View style={styles.recipeListContainer}>
                  {selectedDrink.recipe
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, index) => (
                      <Text key={index} style={styles.recipeLine}>
                        • {line.trim()}
                      </Text>
                    ))}
                </View>
              </View>
            )}



            {/* Nguyên liệu liên quan */}
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
  backgroundColor: "rgba(74, 35, 6, 0.9)",
  padding: 15,
  height: "100%",
  borderRightWidth: 1,
  borderColor: "rgba(255,255,255,0.1)",
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
  letterSpacing: 0.5,
},

card: {
  backgroundColor: "rgba(74, 35, 6, 0.82)",
  borderRadius: 18,
  margin: 10,
  flex: 1,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 6,
  elevation: 5,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.08)",
  transition: "all 0.25s ease-in-out",
},



cardContent: {
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingVertical: 10,
},

image: {
  width: "100%",
  height: hp("25%"),
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
},
imageOverlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "40%",
  backgroundColor: "rgba(74,35,6,0.35)",
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
},

cardTitle: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#fff",
  textAlign: "center",
  lineHeight: 22,
  minHeight: 44,
  maxWidth: "90%",
  marginBottom: 10,
},

viewButton: {
  backgroundColor: "#A47148",
  paddingVertical: 8,
  paddingHorizontal: 25,
  borderRadius: 25,
  alignSelf: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 4,
  transform: [{ scale: 1 }],
},

viewButtonText: {
  color: "#fff",
  fontWeight: "600",
  fontSize: 15,
},

modalContainer: {
  flex: 1,
  backgroundColor: "rgba(58, 28, 8, 0.95)",
  paddingTop: 40,
  alignItems: "center",
},
  scrollViewContent: {
    alignItems: "center",
    padding: 20,
  },
modalImage: {
  width: wp("88%"),
  height: hp("55%"),
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.35,
  shadowRadius: 10,
  elevation: 6,
},
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },

  recipeText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
relatedBox: {
  marginTop: 20,
  backgroundColor: "rgba(255,255,255,0.08)",
  borderRadius: 12,
  paddingVertical: 18,
  paddingHorizontal: 12,
  width: "60%",              // ✅ giống recipeBox
  alignSelf: "center",       // ✅ căn giữa khung
  alignItems: "center",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
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
  backgroundColor: "rgba(255,255,255,0.05)", // ✅ nhẹ nhàng tạo lớp tách biệt từng dòng
  borderRadius: 10,
  paddingVertical: 6,
  paddingHorizontal: 10,
  marginVertical: 4,
  width: "100%",
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
  textAlign: "left",
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
  navButton: {
    position: "absolute",
    top: "40%",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    zIndex: 5,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  imageCounter: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
  },
navButton: {
  position: "absolute",
  top: "40%",
  backgroundColor: "rgba(0,0,0,0.3)",
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 50,
  zIndex: 5,
},
navButtonText: {
  color: "#fff",
  fontSize: 32,
  fontWeight: "bold",
},
dotContainer: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
  gap: 6,
},
dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "rgba(255,255,255,0.4)",
},
dotActive: {
  backgroundColor: "#F4C542",
  width: 10,
  height: 10,
},


recipeTitle: {
  color: "#F4C542",
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 8,
},

recipeBox: {
  marginTop: 15,
  backgroundColor: "rgba(255,255,255,0.08)",
  borderRadius: 12,
  paddingVertical: 18,
  paddingHorizontal: 12,
  width: "60%",              // Giữ khung gọn gàng
  alignSelf: "center",       // Căn giữa toàn bộ khung
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
  alignItems: "center",      // ✅ Căn giữa cả tiêu đề và danh sách
},

recipeListContainer: {
  alignItems: "center",      // ✅ Căn giữa các dòng nguyên liệu
  justifyContent: "center",
  width: "100%",             // ✅ Cho phép text chiếm đều toàn khung
  marginTop: 5,
},

recipeLine: {
  color: "#fff",
  fontSize: 15,
  lineHeight: 26,
  textAlign: "center",       // ✅ Giúp từng dòng căn giữa đẹp mắt
  marginVertical: 2,
},



});