import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${VITE_API_URL}/api/Cart/getCart`;

export const getCart = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response:", response.data); // Debug dữ liệu
    const data = response.data;
    if (!data || !Array.isArray(data.items)) {
      throw new Error("Dữ liệu cart không hợp lệ từ server");
    }
    return data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch cart data";
  }
};
