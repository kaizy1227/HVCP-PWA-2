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

// 👉 Xử lý đường dẫn linh hoạt cho web / native
const getMediaUri = (path) => {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("file:")) return path;
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin + path; // PWA
  }
  return path;
};

// 🎬 Hàm tạo thumbnail tự động từ video
const getVideoThumbnail = async (videoUrl) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = getMediaUri(videoUrl);
    video.crossOrigin = "anonymous";

    video.addEventListener("loadeddata", () => {
      video.currentTime = 1; // lấy frame ở giây thứ 1
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
      resolve(imageUrl);
    });

    video.addEventListener("error", (e) => reject(e));
  });
};

const NitroSodaScreen = ({ route, navigation }) => {
  const seID = route.params.serviceId;
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [displayedDrinks, setDisplayedDrinks] = useState([]);

  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const fadeListAnim = useRef(new Animated.Value(0)).current;
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // 🔹 Cập nhật tiêu đề động
  useEffect(() => {
    const service = SERVICES.find((service) => service.id === seID);
    if (service) {
      navigation.setOptions({
        ...commonHeaderOptions,
        title: service.title,
      });
    }
  }, [seID, navigation]);

  // 🔹 Khi chọn danh mục → load video + thumbnail
  useEffect(() => {
    if (selectedCategory) {
      const loadThumbnails = async () => {
        const filtered = NITROSODAS.filter((c) =>
          c.catnitrosodaIds.includes(selectedCategory)
        );
        const withThumbs = await Promise.all(
          filtered.map(async (item) => {
            if (!item.thumbnailUrl && item.videoUrl) {
              try {
                const thumb = await getVideoThumbnail(item.videoUrl);
                return { ...item, thumbnailUrl: thumb };
              } catch {
                return { ...item, thumbnailUrl: "/images/nitro_poster.jpg" };
              }
            }
            return item;
          })
        );
        setDisplayedDrinks(withThumbs);
        fadeListAnim.setValue(0);
        Animated.timing(fadeListAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      };
      loadThumbnails();
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
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, flexDirection: isDesktop ? "row" : "column" }}>
      {/* ☰ Sidebar Toggle */}
      {!isDesktop && (
        <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
          <Text style={{ color: "white" }}>
            {sidebarVisible ? "Ẩn Menu" : "☰ Menu"}
          </Text>
        </TouchableOpacity>
      )}

      {/* 🧭 Sidebar Danh Mục */}
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

      {/* 🎬 Danh Sách Nitro Soda */}
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
                  {/* 🖼 Hiển thị thumbnail */}
                  <View style={styles.thumbnailWrapper}>
                    <Image
                      source={{
                        uri:
                          item.thumbnailUrl ||
                          getMediaUri("/images/nitro_poster.jpg"),
                      }}
                      style={styles.thumbnailImage}
                      resizeMode="cover"
                    />
                    <View style={styles.playIconContainer}>
                      <Text style={styles.playIcon}>▶</Text>
                    </View>
                  </View>

                  <View style={styles.cardTextBox}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    {item.price ? (
                      <Text style={styles.cardPrice}>💰 Giá: {item.price}</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#A47148", fontSize: 18 }}>
              👉 Chọn danh mục để xem danh sách Nitro Soda
            </Text>
          </View>
        )}
      </View>

      {/* 🎞 Modal Chi Tiết */}
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedDrink && (
              <>
                <video
                  src={getMediaUri(selectedDrink.videoUrl)}
                  style={styles.modalImage}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  poster={selectedDrink.thumbnailUrl}
                />
                <Text style={styles.modalTitle}>{selectedDrink.title}</Text>
                {selectedDrink.price ? (
                  <Text style={styles.modalPrice}>
                    💰 Giá: {selectedDrink.price}
                  </Text>
                ) : null}
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

export default NitroSodaScreen;

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
  thumbnailWrapper: {
    width: "100%",
    height: hp("25%"),
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#000",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  playIconContainer: {
    position: "absolute",
    top: "40%",
    left: "45%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  cardTextBox: { padding: 10, alignItems: "center" },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 3,
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
    objectFit: "contain",
    backgroundColor: "#000",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  modalPrice: {
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
});
