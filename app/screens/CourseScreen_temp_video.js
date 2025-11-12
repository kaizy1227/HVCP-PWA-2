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
import { SERVICES, COURSES, CATCOURSES } from "../data/dummy-data";
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

const CourseScreen = ({ route, navigation }) => {
  const seID = route.params.serviceId;
  const { width } = Dimensions.get("window");

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const fadeListAnim = useRef(new Animated.Value(0)).current;
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const service = SERVICES.find((service) => service.id === seID);
    if (service) {
      navigation.setOptions({
        ...commonHeaderOptions,
        title: service.title,
      });
    }
  }, [seID, navigation]);

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

  const handlePress = (course) => {
    setSelectedCourse(course);
    setCurrentMediaIndex(0);
    setModalVisible(true);
  };

  const displayedCourses = selectedCategory
    ? COURSES.filter((c) => c.catcourseIds.includes(selectedCategory))
    : [];

  // 🎬 Component hiển thị từng media item (ảnh hoặc video)
  const MediaItem = ({ url, index, isActive }) => {
    const [imageError, setImageError] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);
    const mediaUri = getMediaUri(url);
    const videoRef = useRef(null);

    useEffect(() => {
      if (isVideo(url) && videoRef.current) {
        if (isActive) {
          videoRef.current.play().catch(err => {
            console.log("Video autoplay blocked:", err);
          });
        } else {
          videoRef.current.pause();
        }
      }
    }, [isActive, url]);

    if (isVideo(url)) {
      return (
        <View style={styles.videoWrapper}>
          {videoLoading && (
            <View style={styles.loadingOverlay}>
              <Text style={styles.loadingText}>⏳ Đang tải video...</Text>
            </View>
          )}
          {videoError && (
            <View style={styles.errorOverlay}>
              <Text style={styles.errorText}>❌ Không tải được video</Text>
              <Text style={styles.errorSubText}>{url}</Text>
            </View>
          )}
          <video
            ref={videoRef}
            src={mediaUri}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            controls
            playsInline
            preload="auto"
            onLoadStart={() => setVideoLoading(true)}
            onCanPlay={() => setVideoLoading(false)}
            onError={(e) => {
              console.error("Video error:", e);
              console.log("Video URL:", mediaUri);
              setVideoError(true);
              setVideoLoading(false);
            }}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => setZoomVisible(true)}
        activeOpacity={0.9}
        style={styles.imageContainer}
      >
        <Image
          source={{ uri: mediaUri }}
          style={styles.modalImage}
          resizeMode="contain"
          onError={(e) => {
            console.log("Image load error:", e.nativeEvent?.error);
            console.log("Trying to load:", mediaUri);
            setImageError(true);
          }}
          onLoad={() => {
            console.log("Image loaded successfully:", mediaUri);
            setImageError(false);
          }}
        />
        {imageError && (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorText}>❌ Không tải được ảnh</Text>
            <Text style={styles.errorSubText}>{url}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // 🔄 Navigation buttons
  const handlePrevMedia = () => {
    if (selectedCourse?.mediaUrls && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  const handleNextMedia = () => {
    if (
      selectedCourse?.mediaUrls &&
      currentMediaIndex < selectedCourse.mediaUrls.length - 1
    ) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
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
            data={CATCOURSES}
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
              data={displayedCourses}
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
                    resizeMode="contain"
                  />
                  <View style={styles.cardTextBox}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDuration}>
                      🕒 Thời lượng: {item.duration}
                    </Text>
                    <Text style={styles.cardPrice}>💰 Học phí: {item.price}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        ) : (
          <View style={styles.centered}>
            <Text style={{ color: "#A47148", fontSize: 18 }}>
              👉 Chọn danh mục để xem danh sách khóa học
            </Text>
          </View>
        )}
      </View>

      {/* 🧾 Modal chi tiết khóa học */}
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedCourse && selectedCourse.mediaUrls && (
              <>
                {/* 🎬 Media Carousel Container */}
                <View style={styles.mediaCarouselContainer}>
                  {/* Media hiện tại */}
                  <MediaItem
                    url={selectedCourse.mediaUrls[currentMediaIndex]}
                    index={currentMediaIndex}
                    isActive={true}
                  />

                  {/* Navigation Buttons */}
                  {selectedCourse.mediaUrls.length > 1 && (
                    <>
                      {currentMediaIndex > 0 && (
                        <TouchableOpacity
                          style={[styles.navButton, { left: 10 }]}
                          onPress={handlePrevMedia}
                        >
                          <Text style={styles.navButtonText}>‹</Text>
                        </TouchableOpacity>
                      )}

                      {currentMediaIndex < selectedCourse.mediaUrls.length - 1 && (
                        <TouchableOpacity
                          style={[styles.navButton, { right: 10 }]}
                          onPress={handleNextMedia}
                        >
                          <Text style={styles.navButtonText}>›</Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}

                  {/* Media type indicator */}
                  <View style={styles.indicatorBox}>
                    <Text style={styles.indicatorText}>
                      {isVideo(selectedCourse.mediaUrls[currentMediaIndex])
                        ? "🎥 Video"
                        : "🖼️ Ảnh"}{" "}
                      {currentMediaIndex + 1}/{selectedCourse.mediaUrls.length}
                    </Text>
                  </View>

                  {/* Dots pagination */}
                  {selectedCourse.mediaUrls.length > 1 && (
                    <View style={styles.dotContainer}>
                      {selectedCourse.mediaUrls.map((_, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => setCurrentMediaIndex(index)}
                        >
                          <View
                            style={[
                              styles.dot,
                              index === currentMediaIndex && styles.dotActive,
                            ]}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* 🔍 Zoom Modal cho ảnh */}
                <Modal visible={zoomVisible} transparent>
                  <View style={styles.zoomContainer}>
                    <TouchableOpacity
                      style={styles.closeCircle}
                      onPress={() => setZoomVisible(false)}
                    >
                      <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                    <ImageViewer
                      imageUrls={selectedCourse.mediaUrls
                        .filter((url) => !isVideo(url))
                        .map((url) => ({ url: getMediaUri(url) }))}
                      index={0}
                      enableSwipeDown
                      onSwipeDown={() => setZoomVisible(false)}
                    />
                  </View>
                </Modal>

                {/* Course Info */}
                <Text style={styles.modalTitle}>{selectedCourse.title}</Text>
                <Text style={styles.modalDuration}>
                  🕒 Thời lượng: {selectedCourse.duration}
                </Text>
                <Text style={styles.modalPrice}>
                  💰 Học phí: {selectedCourse.price}
                </Text>

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

export default CourseScreen;

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
  cardDuration: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 4,
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
  mediaCarouselContainer: {
    position: "relative",
    width: wp("90%"),
    height: hp("60%"),
    marginBottom: 20,
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorOverlay: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    borderRadius: 10,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorSubText: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  videoWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "#000",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 10,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
  navButton: {
    position: "absolute",
    top: "45%",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    zIndex: 5,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold"
  },
  indicatorBox: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    zIndex: 5,
  },
  indicatorText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  dotContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 8,
    zIndex: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: {
    backgroundColor: "#F4C542",
    width: 12,
    height: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  modalDuration: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 5,
    textAlign: "center",
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});