import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SERVICES, FULLSERVICES, CATFULLSERVICES } from "../data/dummy-data";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { commonHeaderOptions } from "../components/headerOptions";

const FullServiceScreen = ({ route, navigation }) => {
  const mccID = route.params.serviceId;
  const { width } = useWindowDimensions();
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const fadeListAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const service = SERVICES.find((service) => service.id === mccID);
    if (service) {
      navigation.setOptions({
        ...commonHeaderOptions,
        title: service.title,
      });
    }
  }, [mccID, navigation]);

  const toggleSidebar = () => {
    const toValue = sidebarVisible ? -wp("70%") : 0;
    Animated.timing(sidebarAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(!sidebarVisible));
  };

  const handlePress = (item) => {
    setSelectedImageUrl(item.imageUrl);
    setSelectedTitle(item.title);
    setModalVisible(true);
  };

  useEffect(() => {
    if (selectedCategory) {
      fadeListAnim.setValue(0);
      Animated.timing(fadeListAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [selectedCategory]);

  const displayedFullServices = FULLSERVICES.filter((fs) =>
    fs.catfullserviceIds.includes(selectedCategory)
  );

  return (
    <View style={{ flex: 1, flexDirection: isDesktop ? "row" : "column" }}>
      {/* Nút toggle sidebar */}
      {!isDesktop && (
        <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
          <Icon name="menu" size={26} color="#fff" />
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
        {!selectedCategory && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../images/dichvutronbo.png")}
              style={{ width: "90%", height: hp("40%") }}
              resizeMode="contain"
            />
            <Text style={{ color: "#A47148", fontSize: 18, marginTop: 10 }}>
              👉 Chọn danh mục để xem dịch vụ
            </Text>
          </View>
        )}

        {selectedCategory && (
          <Animated.View style={{ flex: 1, opacity: fadeListAnim }}>
            <FlatList
              data={displayedFullServices}
              keyExtractor={(item) => item.id}
              numColumns={isDesktop ? 2 : isTablet ? 2 : 2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handlePress(item)}
                >
                  <Image source={item.imageUrl} style={styles.image} resizeMode="contain" />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        )}
      </View>

      {/* Modal chi tiết */}
      <Modal visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image source={selectedImageUrl} style={styles.modalImage} resizeMode="contain" />
            <Text style={styles.modalTitle}>{selectedTitle}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default FullServiceScreen;

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
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: wp("35%"),
    height: hp("25%"),
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(58, 28, 8, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  scrollViewContent: {
    alignItems: "center",
    padding: 20,
  },
  modalImage: {
    width: wp("88%"),
    height: hp("55%"),
    borderRadius: 14,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  closeButton: {
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
});
