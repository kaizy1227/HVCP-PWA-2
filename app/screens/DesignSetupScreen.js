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
import { SERVICES, DESIGNSETUPS } from "../data/dummy-data";
import { commonHeaderOptions } from "../components/headerOptions";
import ImageViewer from "react-native-image-zoom-viewer";

// 👉 Xử lý đường dẫn ảnh / video
const getMediaUri = (path) => {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("file:")) return path;
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin + path;
  }
  return path;
};

// 👉 Xác định file là video hay ảnh
const isVideo = (url) => /\.(mp4|mov|webm|avi|mkv)$/i.test(url);

const DesignSetupScreen = ({ route, navigation }) => {
  const seID = route.params.serviceId;
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [modalVisible, setModalVisible] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

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

  // 🔹 Hiệu ứng xuất hiện
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
    setModalVisible(true);
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
                source={{ uri: getMediaUri(item.imageUrl) }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.cardTextBox}>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>

      {/* Modal chi tiết */}
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          {/* 🔙 Nút Back */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedItem && (
              <>
                {/* 🖼️ / 🎥 Hiển thị toàn bộ media */}
                {selectedItem.mediaUrls?.map((url, index) => {
                  const mediaUri = getMediaUri(url);

                  if (isVideo(url)) {
                    return (
                      <View key={index} style={styles.mediaItemWrapper}>
                        <video
                          src={mediaUri}
                          style={styles.modalImage}
                          controls
                          playsInline
                          preload="metadata"
                        />
                        <Text style={styles.mediaLabel}>🎥 Video {index + 1}</Text>
                      </View>
                    );
                  }

                  return (
                    <View key={index} style={styles.mediaItemWrapper}>
                      <TouchableOpacity
                        onPress={() => {
                          const imgIndex = selectedItem.mediaUrls
                            .slice(0, index)
                            .filter((u) => !isVideo(u)).length;
                          setZoomIndex(imgIndex);
                          setZoomVisible(true);
                        }}
                        activeOpacity={0.9}
                      >
                        <Image
                          source={{ uri: mediaUri }}
                          style={styles.modalImage}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <Text style={styles.mediaLabel}>🖼️ Ảnh {index + 1}</Text>
                    </View>
                  );
                })}

                {/* 🔍 Zoom toàn màn hình */}
                <Modal visible={zoomVisible} transparent>
                  <View style={styles.zoomContainer}>
                    <TouchableOpacity
                      style={styles.closeCircle}
                      onPress={() => setZoomVisible(false)}
                    >
                      <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                    <ImageViewer
                      imageUrls={selectedItem.mediaUrls
                        .filter((url) => !isVideo(url))
                        .map((url) => ({ url: getMediaUri(url) }))}
                      index={zoomIndex}
                      enableSwipeDown
                      onSwipeDown={() => setZoomVisible(false)}
                    />
                  </View>
                </Modal>

                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default DesignSetupScreen;

/* ================= STYLES ================= */
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
  mediaItemWrapper: { marginBottom: 20, alignItems: "center" },
  mediaLabel: {
    color: "#F4C542",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
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
});
