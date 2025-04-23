import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getProfile = async () => {
  const BASE_URL = `${VITE_API_URL}Accounts/profile`;
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response.data);
    throw error.response?.data || "Lấy thông tin người dùng thất bại";
  }
};
