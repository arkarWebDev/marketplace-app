import { axiosInstance } from "./axiosInstance";

// sell product
export const sellProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get old product
export const getOldProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update product
export const updateProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/update-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// upload image
export const uploadImage = async (formData) => {
  try {
    const response = await axiosInstance.post(`/upload`, formData, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get product saved images
export const getSavedImages = async (id) => {
  try {
    const response = await axiosInstance.get(`/product-images/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete product saved image
export const deleteSavedImages = async (payload) => {
  try {
    const { productId, imgToDelete } = payload;
    const encodeImgToDelete = encodeURIComponent(imgToDelete);

    const response = await axiosInstance.delete(
      `/products/images/destroy/${productId}/${encodeImgToDelete}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//////////////////////////// PUBLIC ////////////////////////////////////

// get all products
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get product by filters
export const getProductsByFilters = async (key, value) => {
  try {
    const response = await axiosInstance.get(
      `/api/products/filters?${key}=${value}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get product by id
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
