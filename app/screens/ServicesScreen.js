import { View, Text, FlatList, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { SERVICES } from "../data/dummy-data";

function ServicesScreen({ navigation }) {
  function renderServiceItem(itemData) {
    const { id, title, imageUrl } = itemData.item;

    function pressHandler() {
      if (id === "s1") navigation.navigate("Khóa Học Pha Chế", { serviceId: id });
      else if (id === "s2") navigation.navigate("Danh Mục Đồ Uống", { serviceId: id });
      else if (id === "s3") navigation.navigate("Máy Pha Chế", { serviceId: id });
      else if (id === "s4") navigation.navigate("Nguyên Liệu Pha Chế", { serviceId: id });
      else if (id === "s5") navigation.navigate("Trọn Bộ Dịch Vụ", { serviceId: id });
      else if (id === "s7") navigation.navigate("Marketing", { serviceId: id });
      else if (id === "s9") navigation.navigate("Form Đánh Giá Dịch Vụ", { serviceId: id });
      else if (id === "s10") navigation.navigate("Thanh Toán Dịch Vụ", { serviceId: id });
    }

    return (
      <View style={styles.gridItem}>
        <Pressable
          android_ripple={{ color: "#a97c50" }}
          style={({ pressed }) => [
            styles.pressable,
            pressed && styles.buttonPressed,
          ]}
          onPress={pressHandler}
        >
          <View style={styles.container}>
            <Image
              source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
              style={styles.image}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={SERVICES}
      keyExtractor={(item) => item.id}
      renderItem={renderServiceItem}
      numColumns={2}
    />
  );
}

export default ServicesScreen;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    borderRadius: 15,
    backgroundColor: "#FFF7F0", // nền nhẹ nhàng
    height: 260,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  pressable: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  image: {
    width: "70%",
    height: "60%",
    borderRadius: 20,
    marginTop: 15,
  },
  titleContainer: {
    marginTop: 15,
    backgroundColor: "#A47148", // màu nâu cà phê đậm
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    textTransform: "uppercase",
  },
});
