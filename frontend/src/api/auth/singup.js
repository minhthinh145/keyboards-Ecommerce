import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const signup = async (
  username,
  email,
  phoneNumber,
  password,
  confirmpassword
) => {
  const BASE_URL = `${VITE_API_URL}/api/auth/signup`;
  try {
    const response = await axios.post(BASE_URL, {
      username,
      email,
      phoneNumber,
      password,
      confirmpassword,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response.data);
    throw error.response?.data || "Đăng ký thất bại";
  }
};
