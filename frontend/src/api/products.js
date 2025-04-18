// src/api/products.js

const BASE_URL = "http://localhost:5066/api/product/"
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Đảm bảo lỗi được ném ra để xử lý tiếp trong component
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Đảm bảo lỗi được ném ra để xử lý tiếp trong component
  }
}