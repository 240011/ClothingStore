import React, { createContext, useState, useEffect } from "react";
import { getCart, updateCart, removeFromCart } from "../Services/cartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  const fetchCartData = async () => {
    setIsLoadingCart(true);
    setError(null);
    try {
      const data = await getCart();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart data:", err);
      setError("Failed to load cart data");
    } finally {
      setIsLoadingCart(false);
    }
  };

  const handleUpdateQuantity = async (index, newQuantity) => {
    if (newQuantity <= 0) return;
    try {
      const updatedItems = cartItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      );
      await updateCart(updatedItems);
      setCartItems(updatedItems);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      setError("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (itemId, index) => {
    try {
      await removeFromCart(itemId);
      setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Failed to remove item:", err);
      setError("Failed to remove item");
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        error,
        isLoadingCart,
        fetchCartData,
        handleUpdateQuantity,
        handleRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
