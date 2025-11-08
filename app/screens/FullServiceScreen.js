// FullServiceScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SERVICES, FULLSERVICES, CATFULLSERVICES } from "../data/dummy-data";
import { commonHeaderOptions } from "../components/headerOptions";
import ImageViewer from "react-native-image-zoom-viewer";

// 👉 Xử lý đường dẫn ảnh linh hoạt
const getImageSource = (img) => {
  if (!img) return null;
  if (typeof img === "string") return { uri: img };
  if (img.uri) return { uri: img.uri };
  return img; // trường hợp require(...)
};

const FullServiceScreen = ({ route, navigation }) => {
  const seID = route.params.serviceId;
  const { width } = Dimensions.get("window");

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);

  const [selectedService, setSelectedService] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const fadeListAnim = useRef(new Animated.Value(0)).current;

  // 🔹 Cập nhật tiêu đề
  useEffect(() => {
    const service = SERVICES.find((service) => service.id === seID);
    if (service) {
      navigation.setOptions({
        ...commonHeaderOptions,
        title: service.title,
      });
    }
  }, [seID, navigation]);

  // 🔹 Hiệu ứng fade khi chọn danh mục
  useEffect(() => {
    if (selectedCategory) {
      fadeListAnim.setValue(0);
      Animated.timing(fadeListAnim, {
        toValue: 1,
        duration: 600,
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

  const handlePress = (service) => {
    setSelectedService(service);
    setCurrentImageIndex(0);
    setModalVisible(true);
  };

  const changeImage = (direction) => {
    if (!Array.isArray(selectedService?.fullImageUrl)) return;
    const total = selectedService.fullImageUrl.length;
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentImageIndex((prev) =>
        direction === "next" ? (prev + 1) % total : (prev - 1 + total) % total
      );
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const displayedServices = selectedCategory
    ? FULLSERVICES.filter((s) => s.catfullserviceIds.includes(selectedCategory))
    : [];

  return (
    <View style={{ flex: 1, flexDirection: isDesktop ? "row" : "column" }}>
      {/* Nút mở menu trên mobile */}
      {!isDesktop && (
        <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
          <Text style={{ color: "white" }}>
            {sidebarVisible ? "Ẩn Menu" : "☰ Menu"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Sidebar danh mục */}
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
            data={CATFULLSERVICES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory(item.id);
                  if (!isDesktop) toggleSidebar();
                }}
              >
                <Text style={styles.categoryText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}

      {/* Danh sách dịch vụ */}
      <View
        style={{
          flex: 1,
          marginLeft: !isDesktop && sidebarVisible ? wp("70%") : 0,
          padding: isDesktop ? 30 : 15,
        }}
      >
        {selectedCategory ? (
          <Animated.View
            style={{
              opacity: fadeListAnim,
              transform: [
                {
                  translateY: fadeListAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
              flex: 1,
            }}
          >
            <FlatList
              data={displayedServices}
              keyExtractor={(item) => item.id}
              numColumns={isDesktop ? 3 : isTablet ? 2 : 1}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 100,
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handlePress(item)}
                  activeOpacity={0.9}
                >
                  <Image
                    source={getImageSource(item.imageUrl)}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <View style={styles.cardTextBox}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    {item.description && (
                      <Text style={styles.cardInfo}>📋 {item.description}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "#A47148", fontSize: 18 }}>
              👉 Chọn danh mục để xem dịch vụ
            </Text>
          </View>
        )}
      </View>

      {/* Modal chi tiết dịch vụ */}
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedService && (
              <>
                {/* 🖼️ Nếu có mảng ảnh */}
                {Array.isArray(selectedService.fullImageUrl) &&
                selectedService.fullImageUrl.length > 0 ? (
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        setZoomIndex(currentImageIndex);
                        setZoomVisible(true);
                      }}
                    >
                      <Animated.Image
                        source={getImageSource(
                          selectedService.fullImageUrl[currentImageIndex]
                        )}
                        style={[styles.modalImage, { opacity: fadeAnim }]}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    {/* Zoom ảnh toàn màn hình */}
                    <Modal visible={zoomVisible} transparent={true}>
                      <View style={styles.zoomContainer}>
                        <TouchableOpacity
                          style={styles.closeCircle}
                          onPress={() => setZoomVisible(false)}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>

                        <ImageViewer
                          imageUrls={selectedService.fullImageUrl.map((url) => ({
                            url:
                              typeof url === "string"
                                ? url
                                : url?.uri || "",
                          }))}
                          index={zoomIndex}
                          enableSwipeDown={true}
                          onSwipeDown={() => setZoomVisible(false)}
                          onClick={() => setZoomVisible(false)}
                          saveToLocalByLongPress={false}
                        />
                      </View>
                    </Modal>

                    {/* Nút điều hướng ảnh */}
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

                    {/* Dấu chấm */}
                    <View style={styles.dotContainer}>
                      {selectedService.fullImageUrl.map((_, i) => (
                        <View
                          key={i}
                          style={[
                            styles.dot,
                            i === currentImageIndex && styles.dotActive,
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                ) : (
                  <Image
                    source={getImageSource(selectedService.imageUrl)}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                )}

                {/* Thông tin dịch vụ */}
                <Text style={styles.modalTitle}>{selectedService.title}</Text>
                {selectedService.description && (
                  <Text style={styles.modalInfo}>
                    📋 {selectedService.description}
                  </Text>
                )}

                {/* Nút đóng */}
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

export default FullServiceScreen;

// 🎨 Style giống CourseScreen, có tone nâu cà phê
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
  categoryText: {
    backgroundColor: "#A47148",
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "rgba(74,35,6,0.85)",
    borderRadius: 18,
    margin: 10,
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: hp("25%"),
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  cardTextBox: { padding: 10, alignItems: "center" },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
  },
  cardInfo: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(74,35,6,0.95)",
    paddingTop: 40,
  },
  scrollViewContent: { alignItems: "center", padding: 20 },
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
    textAlign: "center",
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 5,
    textAlign: "center",
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
  navButton: {
    position: "absolute",
    top: "45%",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    zIndex: 5,
  },
  navButtonText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
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
  zoomContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
  },
  closeCircle: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "#4A2306",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 5,
  },
  closeText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
