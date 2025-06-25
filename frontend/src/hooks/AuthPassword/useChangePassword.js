import { useState } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

import {
  RequestChangePassword,
  ConfirmChangePassword,
} from '../../api/auth/ChangePassword.js'; // Đường dẫn đến API của bạn
// Hook xử lý thay đổi mật khẩu
export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

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
