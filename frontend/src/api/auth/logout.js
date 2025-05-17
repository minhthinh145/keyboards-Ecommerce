import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const logout = async (refreshToken) => {
  const BASE_URL = `${VITE_API_URL}/api/auth/signout`;
  try {
    const response = await axios.post(BASE_URL, { refreshToken });
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data);
    throw error.response?.data || "Đăng xuất thất bại";
  }
};
