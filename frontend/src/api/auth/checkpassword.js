import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${VITE_API_URL}/api/auth/checkpassword`;

export const checkPassword = async (password, accessToken) => {
  try {
    const response = await axios.post(BASE_URL, password, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // Đảm bảo gửi đúng kiểu dữ liệu
      },
    });
    console.log("Kết quả trả về từ API:", response.data); // Log the response data for debugging
    return response.data; // Assuming the API returns some data
  } catch (error) {
    if (error.response) {
      console.error("Check password error:", error.response?.data);
    } else {
      console.error("Check password error without response:", error);
    }
    throw error.response?.data || "Kiểm tra mật khẩu thất bại";
  }
};
