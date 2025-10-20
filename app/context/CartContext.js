import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CATINGREDIENTS } from "../data/dummy-data"; // ✅ Thêm import danh mục

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // 🔄 Load cart từ AsyncStorage
    useEffect(() => {
        const loadCart = async () => {
            try {
                const savedCart = await AsyncStorage.getItem("cartItems");
                if (savedCart) setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("❌ Lỗi load giỏ hàng:", e);
            }
        };
        loadCart();
    }, []);

    // 💾 Lưu cart xuống AsyncStorage mỗi khi thay đổi
    useEffect(() => {
        const saveCart = async () => {
            try {
                await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
            } catch (e) {
                console.error("❌ Lỗi lưu giỏ hàng:", e);
            }
        };
        saveCart();
    }, [cartItems]);

    // 🛒 Thêm sản phẩm vào giỏ hàng
    const addToCart = (item) => {
        setCartItems((prev) => {
            // Đảm bảo giá là số
            const numericPrice = parseInt(String(item.price).replace(/[^\d]/g, "")) || 0;

            // 🔍 Lấy tên danh mục từ CATINGREDIENTS
            let categoryTitle = "Sản phẩm";
            if (item.catingredientIds && item.catingredientIds.length > 0) {
                const found = CATINGREDIENTS.find(
                    (cat) => cat.id === item.catingredientIds[0]
                );
                if (found) categoryTitle = found.title;
            }

            const existing = prev.find((i) => i.title === item.title);

            if (existing) {
                return prev.map((i) =>
                    i.title === item.title
                        ? {
                            ...i,
                            quantity: i.quantity + item.quantity,
                            total: (i.quantity + item.quantity) * numericPrice,
                        }
                        : i
                );
            }

            // ✅ Nếu chưa có, thêm mới
            return [
                ...prev,
                {
                    ...item,
                    price: numericPrice,
                    total: numericPrice * item.quantity,
                    category: categoryTitle, // ✅ Gắn tên danh mục ở đây
                },
            ];
        });
    };

    // ❌ Xóa 1 sản phẩm
    const removeFromCart = (title) => {
        setCartItems((prev) => prev.filter((i) => i.title !== title));
    };

    // 🧹 Xóa toàn bộ giỏ hàng
    const clearCart = () => setCartItems([]);

    // 🔢 Cập nhật số lượng
    const updateQuantity = (title, qty) => {
        setCartItems((prev) =>
            prev.map((i) =>
                i.title === title
                    ? {
                        ...i,
                        quantity: qty,
                        total: i.price * qty,
                    }
                    : i
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
