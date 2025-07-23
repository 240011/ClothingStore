import api from "./api";

export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    throw error;
  }
};

export const addToCart = async (item) => {
  try {
    const response = await api.post("/cart", item);
    return response.data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};

export const updateCart = async (items) => {
  try {
    const response = await api.put("/cart", { items });
    return response.data;
  } catch (error) {
    console.error("Failed to update cart:", error);
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    throw error;
  }
};