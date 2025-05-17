import axios from "axios";

export const addToCart = async (cartItem, token) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const BASE_URL = `${VITE_API_URL}/api/Cart/add`;
  try {
    console.log("token", token);
    const response = await axios.post(BASE_URL, cartItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Có lỗi khi thêm sản phẩm vào giỏ hàng:",
      error.response?.data
    );
    throw error.response?.data || "Failed to add product to cart";
  }
};
