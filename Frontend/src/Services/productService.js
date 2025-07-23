import api from "./api";

export const getProducts = async () => {
  try {
    const response = await api.get("/product");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description || "");
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("category", productData.category || "");
    if (productData.image) {
      formData.append("image", productData.image);
    }
    if (productData.size) {
      formData.append("size", JSON.stringify(productData.size));
    }
    if (productData.color) {
      formData.append("color", JSON.stringify(productData.color));
    }
    const response = await api.post("/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();
    if (productData.name !== undefined) formData.append("name", productData.name);
    if (productData.description !== undefined) formData.append("description", productData.description);
    if (productData.price !== undefined) formData.append("price", productData.price);
    if (productData.stock !== undefined) formData.append("stock", productData.stock);
    if (productData.category !== undefined) formData.append("category", productData.category);
    if (productData.image) {
      formData.append("image", productData.image);
    }
    if (productData.size) {
      formData.append("size", JSON.stringify(productData.size));
    }
    if (productData.color) {
      formData.append("color", JSON.stringify(productData.color));
    }
    const response = await api.put(`/product/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update product with id ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete product with id ${id}:`, error);
    throw error;
  }
};