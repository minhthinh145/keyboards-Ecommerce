import axios from "axios";

export const updateCart = async (cartItem, token) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const BASE_URL = `${VITE_API_URL}/api/Cart/update`;
  try {
    const response = await axios.post(BASE_URL, cartItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Có lỗi khi cập nhật giỏ hàng:", error.response?.data);
    throw error.response?.data || "Failed to update cart data";
  }
};
