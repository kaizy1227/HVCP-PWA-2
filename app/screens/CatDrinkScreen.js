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
} from "react-native";
import { SERVICES, CATDRINKS, DRINKS, INGREDIENTS } from "../data/dummy-data";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CartContext } from "../context/CartContext";

const CatDrinkScreen = ({ route, navigation }) => {
  const seID = route.params.serviceId;
  const { width } = useWindowDimensions();

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const sidebarAnim = useRef(new Animated.Value(0)).current;

  const { addToCart } = useContext(CartContext);

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

  const toggleSidebar = () => {
    const toValue = sidebarVisible ? -wp("70%") : 0;
    Animated.timing(sidebarAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(!sidebarVisible));
  };

  const handlePress = (item) => {
    setSelectedDrink(item); // ✅ Lưu đối tượng Drink đang chọn
    setSelectedImageUrl(item.imageUrl);
    setSelectedTitle(item.title);
    setSelectedRecipe(item.recipe || "Chưa có công thức.");
    setModalVisible(true);
  };

  const linkedIngredients = INGREDIENTS.filter((ing) =>
    (selectedDrink?.ingredientRefs || []).includes(ing.id)
  );

  return (
    <View style={{ flex: 1, flexDirection: isDesktop ? "row" : "column" }}>
      {/* Toggle Sidebar Button */}
      {!isDesktop && (
        <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
          <Text style={{ color: "white" }}>
            {sidebarVisible ? "Ẩn Menu" : "☰ Menu"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Sidebar */}
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

      {/* Main Content */}
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
            initialNumToRender={6}          // Chỉ render 6 item đầu
            maxToRenderPerBatch={5}         // Render thêm từng nhóm nhỏ
            windowSize={5}                  // Giới hạn vùng viewport
            removeClippedSubviews={true}    // Giải phóng item ngoài màn hình
            getItemLayout={(data, index) => ({
              length: hp("30%"),            // Ước lượng chiều cao 1 item
              offset: hp("30%") * index,
              index,
            })}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handlePress(item)}
                activeOpacity={0.85}
              >
                <Image
                  source={item.imageUrl}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={{ padding: isDesktop ? 20 : 10 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>

                  {/* Nút xem chi tiết */}
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

      {/* Modal chi tiết món */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image
              source={selectedImageUrl}
              style={styles.modalImage}
              resizeMode="contain"
            />
            <Text style={styles.modalTitle}>{selectedTitle}</Text>

            {selectedRecipe ? (
              <View style={styles.recipeBox}>
                <Text style={styles.recipeTitle}>🍹 Công thức pha chế</Text>
                <Text style={styles.recipeText}>{selectedRecipe}</Text>
              </View>
            ) : null}

            {linkedIngredients.length > 0 && (
              <View style={styles.relatedBox}>
                <Text style={styles.relatedTitle}>🧂 Nguyên liệu sử dụng</Text>
                {linkedIngredients.map((ing) => (
                  <View key={ing.id} style={styles.ingredientItem}>
                    <Image
                      source={ing.imageUrl}
                      style={styles.ingredientImage}
                    />
                    <Text style={styles.ingredientName}>{ing.title}</Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() =>
                        addToCart({
                          title: ing.title,
                          price: parseInt(ing.price.replace(/[^\d]/g, "")),
                          quantity: 1,
                          imageUrl: ing.imageUrl,
                        })
                      }
                    >
                      <Text style={styles.addButtonText}>+ Giỏ hàng</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
              activeOpacity={0.85}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
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
  card: {
    backgroundColor: "rgba(74, 35, 6, 0.67)",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    flex: 1,
  },
  image: {
    width: wp("18%"),
    height: hp("18%"),
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
    elevation: 4,
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
    height: hp("90%"),
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
    alignSelf: "center",
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
    elevation: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
