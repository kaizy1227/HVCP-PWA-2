import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SERVICES, TOPICS } from "../data/dummy-data";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { commonHeaderOptions } from "../components/headerOptions";

const CoursesOverviewScreen = ({ route, navigation }) => {
    const seID = route.params.serviceId;
    const { width } = useWindowDimensions();
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        const service = SERVICES.find((service) => service.id === seID);
        if (service) {
            navigation.setOptions({
                ...commonHeaderOptions,
                title: service.title,
            });
        }
    }, [seID, navigation]);

    const handlePress = (item) => {
        setSelectedTopic(item);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* Danh sách khóa học */}
            <FlatList
                data={TOPICS}
                keyExtractor={(item) => item.id}
                numColumns={isDesktop ? 3 : isTablet ? 2 : 1}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handlePress(item)}
                        activeOpacity={0.9}
                    >
                        <Image
                            source={item.imageUrl}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={{ padding: 10, alignItems: "center" }}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardText}>💰 {item.price}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />

            {/* Modal chi tiết khóa học */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {selectedTopic && (
                            <>
                                <Image
                                    source={selectedTopic.imageUrl}
                                    style={styles.modalImage}
                                    resizeMode="contain"
                                />
                                <Text style={styles.modalTitle}>
                                    {selectedTopic.title}
                                </Text>
                                <Text style={styles.modalText}>
                                    💰 Học phí: {selectedTopic.price}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        padding: 20,
    },
    listContainer: {
        paddingBottom: 50,
        justifyContent: "center",
    },
    card: {
        backgroundColor: "rgba(74, 35, 6, 0.85)",
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
    },
    image: {
        width: "100%",
        height: hp("25%"),
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginTop: 8,
        lineHeight: 22,
    },
    cardText: {
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
        marginTop: 5,
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
        width: wp("88%"),
        height: hp("55%"),
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
        textAlign: "center",
        textTransform: "uppercase",
    },
    modalText: {
        fontSize: 18,
        color: "#fff8f0",
        marginBottom: 8,
        textAlign: "center",
    },
    closeButton: {
        marginTop: 30,
        backgroundColor: "#A47148",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 5,
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default CoursesOverviewScreen;
