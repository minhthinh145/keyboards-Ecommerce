import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const BASE_URL_Request = `${VITE_API_URL}/api/UserOtp/request`;
const BASE_URL_Verify = `${VITE_API_URL}/api/UserOtp/verify`;

export const RequestOTP = async (accessToken) => {
  try {
    const response = await axios.post(
      BASE_URL_Request,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.error("Request OTP error response:", error.response);
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
    console.error("Request OTP error:", error.response?.data);
    throw error.response?.data || "Yêu cầu OTP thất bại";
  }
};

export const VerifyOTP = async (otp, accessToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL_Verify}`,
      { OtpCode: otp },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data; // Assuming the API returns some data
  } catch (error) {
    console.error("Verify OTP error:", error.response?.data);
    throw error.response?.data || "Xác thực OTP thất bại";
  }
};
