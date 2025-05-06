import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${VITE_API_URL}/api/ChangePassword/request`;
const BASE_URL_Confirm = `${VITE_API_URL}/api/ChangePassword/confirm`;
export const RequestChangePassword = async (newPassword, ConfirmPassword) => {
  try {
    const response = await axios.post(BASE_URL, {
      newPassword,
      ConfirmPassword,
    });
    return response.data; // Assuming the API returns some data
  } catch (error) {
    console.error("Request change password error:", error.response?.data);
    throw error.response?.data || "Yêu cầu thay đổi mật khẩu thất bại";
  }
};

export const ConfirmChangePassword = async (
  newPassword,
  OtpCode,
  accessToken
) => {
  try {
    console.log(newPassword, OtpCode);
    const response = await axios.post(
      BASE_URL_Confirm,
      { newPassword, OtpCode },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data; // Assuming the API returns some data
  } catch (error) {
    console.error("Confirm change password error:", error.response?.data);
    throw error.response?.data || "Xác nhận thay đổi mật khẩu thất bại";
  }
};
