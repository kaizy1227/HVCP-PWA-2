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
import { SERVICES, NITROSODAS, CATNITROSODAS } from "../data/dummy-data";
import { commonHeaderOptions } from "../components/headerOptions";
import ImageViewer from "react-native-image-zoom-viewer";

const getMediaUri = (path) => {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("file:")) return path;
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin + path;
  }
  return path;
};

const isVideo = (url) => /\.(mp4|mov|webm|avi|mkv)$/i.test(url);

const NitroSodaScreen = ({ route, navigation }) => {
  const seID = route.params.serviceId;
  const { width } = Dimensions.get("window");

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const fadeListAnim = useRef(new Animated.Value(0)).current;
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // 🔹 Cập nhật tiêu đề màn hình
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

  const handlePress = (drink) => {
    setSelectedDrink(drink);
    setModalVisible(true);
  };

  const displayedDrinks = selectedCategory
    ? NITROSODAS.filter((c) => c.catnitrosodaIds.includes(selectedCategory))
    : [];

  return (
    <View style={{ flex: 1, flexDirection: isDesktop ? "row" : "column" }}>
      {/* ☰ Nút mở menu trên mobile */}
      {!isDesktop && (
        <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
          <Text style={{ color: "white" }}>
            {sidebarVisible ? "Ẩn Menu" : "☰ Menu"}
          </Text>
        </TouchableOpacity>
      )}

      {/* 📂 Sidebar danh mục */}
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
            data={CATNITROSODAS}
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

      {/* 🧃 Danh sách Nitro Soda */}
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
              data={displayedDrinks}
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
                  {/* ✅ Ảnh hoặc Video đại diện */}
                  {isVideo(item.imageUrl) ? (
                    <video
                      src={getMediaUri(item.imageUrl)}
                      style={{
                        width: "100%",
                        height: hp("25%"),
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        objectFit: "cover",
                        backgroundColor: "#000",
                      }}
                      playsInline
                      muted
                      loop
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      source={{ uri: getMediaUri(item.imageUrl) }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  )}

                  <View style={styles.cardTextBox}>
                    <Text style={styles.cardTitle}>⭐️ {item.title}</Text>
                    <Text style={styles.cardDuration}>✨ {item.duration}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        ) : (
          <View style={styles.centered}>
            <Text style={{ color: "#A47148", fontSize: 18 }}>
              👉 Chọn danh mục để xem danh sách Nitro Soda
            </Text>
          </View>
        )}
      </View>

      {/* 🧾 Modal chi tiết sản phẩm */}
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          {/* 🔙 Nút back ở góc trên bên trái */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setModalVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}></Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedDrink && (
              <>
                {/* 🎬 Hiển thị tất cả media (video + ảnh) */}
                {selectedDrink.mediaUrls?.map((url, index) => {
                  const mediaUri = getMediaUri(url);

                  if (isVideo(url)) {
                    return (
                      <View key={index} style={styles.mediaItemWrapper}>
                        <video
                          src={mediaUri}
                          style={{
                            width: wp("90%"),
                            height: hp("60%"),
                            borderRadius: 12,
                            objectFit: "contain",
                            backgroundColor: "#000",
                          }}
                          controls
                          playsInline
                          preload="metadata"
                          onError={(e) => console.error("Video error:", e, mediaUri)}
                        />
                        <Text style={styles.mediaLabel}>🎥 Video {index + 1}</Text>
                      </View>
                    );
                  }

                  return (
                    <View key={index} style={styles.mediaItemWrapper}>
                      <TouchableOpacity
                        onPress={() => {
                          const imageIndex = selectedDrink.mediaUrls
                            .slice(0, index)
                            .filter((u) => !isVideo(u)).length;
                          setZoomIndex(imageIndex);
                          setZoomVisible(true);
                        }}
                        activeOpacity={0.9}
                      >
                        <Image
                          source={{ uri: mediaUri }}
                          style={{
                            width: wp("90%"),
                            height: hp("60%"),
                            borderRadius: 12,
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <Text style={styles.mediaLabel}>🖼️ Ảnh {index + 1}</Text>
                    </View>
                  );
                })}

                {/* 🔍 Zoom ảnh toàn màn hình */}
                <Modal visible={zoomVisible} transparent>
                  <View style={styles.zoomContainer}>
                    <TouchableOpacity
                      style={styles.closeCircle}
                      onPress={() => setZoomVisible(false)}
                    >
                      <Text style={styles.closeText}>←</Text>
                    </TouchableOpacity>
                    <ImageViewer
                      imageUrls={selectedDrink.mediaUrls
                        .filter((url) => !isVideo(url))
                        .map((url) => ({ url: getMediaUri(url) }))}
                      index={zoomIndex}
                      enableSwipeDown
                      onSwipeDown={() => setZoomVisible(false)}
                    />
                  </View>
                </Modal>

                {/* 🧾 Thông tin */}
                <Text style={styles.modalTitle}>{selectedDrink.title}</Text>
                <Text style={styles.modalDuration}>⭐️ {selectedDrink.duration}</Text>
                <Text style={styles.modalPrice}>{selectedDrink.price}</Text>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>

    </View>
  );
};

export default NitroSodaScreen;

/* ======================= STYLES ======================= */
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
  sidebar: { backgroundColor: "#4A2306", padding: 15, height: "100%" },
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
  cardDuration: { fontSize: 14, color: "#fff", textAlign: "center", marginTop: 4 },
  cardPrice: { fontSize: 14, color: "#fff", textAlign: "center", marginTop: 3 },
  modalContainer: { flex: 1, backgroundColor: "rgba(74,35,6,0.95)", paddingTop: 40 },
  scrollViewContent: { alignItems: "center", padding: 20 },
  mediaItemWrapper: { marginBottom: 20, alignItems: "center" },
  mediaLabel: {
    color: "#F4C542",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 10 },
  modalDuration: { fontSize: 18, color: "#fff", marginVertical: 5, textAlign: "center" },
  modalPrice: { fontSize: 18, color: "#fff", marginVertical: 5, textAlign: "center" },
  closeButton: { marginTop: 20, backgroundColor: "#F4C542", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 25 },
  closeButtonText: { color: "#4A2306", fontSize: 16, fontWeight: "bold" },
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
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 5,
  },
  closeText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 20,
    backgroundColor: "rgba(244,197,66,0.9)", // màu vàng cà phê nhạt
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
  backButtonText: {
    color: "#4A2306",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -2,
  },

});
