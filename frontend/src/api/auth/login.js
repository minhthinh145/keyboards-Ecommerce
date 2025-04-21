import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
export const login = async (email, password) => {
  const BASE_URL = `${VITE_API_URL}Accounts/SignIn`;
  try {
    const response = await axios.post(BASE_URL, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response.data);
    throw error.response?.data || "Đăng nhập thất bại";
  }
};
