import api from "./api";

const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCart = async () => {
  try {
    const response = await api.get("/cart", {
      headers: {
        ...getAuthHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    throw error;
  }
};

export const addToCart = async (item) => {
  try {
    const response = await api.post("/cart", item, {
      headers: {
        ...getAuthHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};

export const updateCart = async (items) => {
  try {
    const response = await api.put(
      "/cart",
      { items },
      {
        headers: {
          ...getAuthHeader(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update cart:", error);
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/${itemId}`, {
      headers: {
        ...getAuthHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    throw error;
  }
};
