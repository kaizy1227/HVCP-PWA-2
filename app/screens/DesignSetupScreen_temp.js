// DesignSetupScreen.js
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
import { SERVICES, DESIGNSETUPS } from "../data/dummy-data"; // ✅ đổi dataset
import { commonHeaderOptions } from "../components/headerOptions";
import ImageViewer from "react-native-image-zoom-viewer";

// 👉 Hàm xử lý ảnh linh hoạt
const getImageSource = (img) => {
  if (!img) return null;
  if (typeof img === "string") return { uri: img };
  if (img.uri) return { uri: img.uri };
  return img;
};

const DesignSetupScreen = ({ route, navigation }) => {
  const seID = route.params.serviceId;
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [modalVisible, setModalVisible] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
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

  // 🔹 Hiệu ứng fade khi hiển thị
  useEffect(() => {
    fadeListAnim.setValue(0);
    Animated.timing(fadeListAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setModalVisible(true);
  };

  const changeImage = (direction) => {
    if (!Array.isArray(selectedItem?.fullImageUrl)) return;
    const total = selectedItem.fullImageUrl.length;
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

  return (
    <View style={{ flex: 1, padding: isDesktop ? 30 : 15 }}>
      {/* Danh sách thiết kế */}
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
          data={DESIGNSETUPS}
          keyExtractor={(item) => item.id}
          numColumns={isDesktop ? 3 : isTablet ? 2 : 1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
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

      {/* Modal chi tiết */}
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          {/* 🔙 Nút back */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedItem && (
              <>
                {/* 🖼️ Hiển thị mảng ảnh */}
                {Array.isArray(selectedItem.fullImageUrl) &&
                selectedItem.fullImageUrl.length > 0 ? (
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
                          selectedItem.fullImageUrl[currentImageIndex]
                        )}
                        style={[styles.modalImage, { opacity: fadeAnim }]}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    {/* Zoom ảnh toàn màn hình */}
                    <Modal visible={zoomVisible} transparent>
                      <View style={styles.zoomContainer}>
                        <TouchableOpacity
                          style={styles.closeCircle}
                          onPress={() => setZoomVisible(false)}
                        >
                          <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                        <ImageViewer
                          imageUrls={selectedItem.fullImageUrl.map((url) => ({
                            url: typeof url === "string" ? url : url?.uri || "",
                          }))}
                          index={zoomIndex}
                          enableSwipeDown
                          onSwipeDown={() => setZoomVisible(false)}
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
                  </View>
                ) : (
                  <Image
                    source={getImageSource(selectedItem.imageUrl)}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                )}

                {/* Thông tin */}
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                {selectedItem.description && (
                  <Text style={styles.modalInfo}>
                    📋 {selectedItem.description}
                  </Text>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default DesignSetupScreen;

// 🎨 Style
const styles = StyleSheet.create({
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
  zoomContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.95)" },
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
  },
  closeText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 20,
    backgroundColor: "#F4C542",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: { color: "#4A2306", fontSize: 22, fontWeight: "bold" },
});
