import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${VITE_API_URL}/api/auth/update`;

export const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
    const response = await axios.patch(BASE_URL, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về dữ liệu từ API (ví dụ: { message: "Cập nhật thông tin thành công" })
  } catch (error) {
    // Xử lý lỗi từ API
    if (error.response) {
      throw new Error(
        error.response.data.message || "Lỗi khi cập nhật thông tin"
      );
    } else if (error.request) {
      // Không nhận được phản hồi từ server
      throw new Error("Không thể kết nối đến server");
    } else {
      // Lỗi khác (cấu hình axios, v.v.)
      throw new Error("Lỗi: " + error.message);
    }
  }
};
