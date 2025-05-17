import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${VITE_API_URL}/api/orders/createorder`;

export const createOrder = async (token) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    throw error;
  }
};
