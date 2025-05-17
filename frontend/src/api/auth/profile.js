// api/auth/profile.js
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getProfile = async (accessToken) => {
  const BASE_URL = `${VITE_API_URL}/api/auth/profile`;
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Nhận accessToken từ tham số
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data);
    throw error.response?.data || "Lấy thông tin người dùng thất bại";
  }
};
