import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const refreshToken = async (refreshToken) => {
  const BASE_URL = `${VITE_API_URL}/api/auth/refresh-token`;
  try {
    const response = await axios.post(BASE_URL, { refreshToken });
    return response.data.accessToken;
  } catch (error) {
    console.error("Refresh token error:", error.response?.data);
    throw error.response?.data || "Không thể làm mới token";
  }
};
