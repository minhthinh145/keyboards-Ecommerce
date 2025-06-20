import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useContext } from "react";

import {
  RequestChangePassword,
  ConfirmChangePassword,
} from "../../api/auth/ChangePassword.js"; // Đường dẫn đến API của bạn
// Hook xử lý thay đổi mật khẩu
export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { getValidToken } = useContext(AuthContext); // Lấy accessToken từ AuthContext

  // Gửi yêu cầu thay đổi mật khẩu
  const handleRequestChangePassword = async (newPassword, confirmPassword) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await RequestChangePassword(
        newPassword,
        confirmPassword
      );
      setMessage(response); // Có thể lưu trữ thông báo thành công ở đây
    } catch (err) {
      setError(err); // Lưu lỗi nếu có
    } finally {
      setIsLoading(false);
    }
  };

  // Xác nhận thay đổi mật khẩu
  const handleConfirmChangePassword = async (newPassword, OtpCode) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const accessToken = await getValidToken(); // Lấy accessToken từ AuthContext

      const response = await ConfirmChangePassword(
        newPassword,
        OtpCode,
        accessToken
      );
      setMessage(response); // Lưu trữ thông báo thành công ở đây
    } catch (err) {
      setError(err); // Lưu lỗi nếu có
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    message,
    handleRequestChangePassword,
    handleConfirmChangePassword,
  };
};

export default useChangePassword;
