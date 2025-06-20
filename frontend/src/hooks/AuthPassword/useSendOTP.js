import { useContext, useState } from "react";
import { RequestOTP, VerifyOTP } from "../../api/auth/RequestOtp";
import { AuthContext } from "../../contexts/AuthContext";

export const useOTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { getValidToken } = useContext(AuthContext);

  // Request OTP
  const handleRequestOTP = async () => {
    console.log("⚙️ Gửi yêu cầu OTP...");
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const accessToken = await getValidToken();
      const response = await RequestOTP(accessToken);
      console.log("✅ Yêu cầu OTP thành công");
      // Log kết quả trả về từ API
      console.log("Kết quả trả về từ API:", response);
      setMessage("Yêu cầu OTP thành công!");
    } catch (err) {
      console.error("❌ Lỗi gửi OTP:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (otp) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const accessToken = await getValidToken();

      const response = await VerifyOTP(otp, accessToken);
      setMessage("Xác thực OTP thành công!");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    message,
    handleRequestOTP,
    handleVerifyOTP,
  };
};
