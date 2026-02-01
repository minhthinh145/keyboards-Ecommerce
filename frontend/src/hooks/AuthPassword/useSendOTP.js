import { useContext, useState } from 'react';
import { RequestOTP, VerifyOTP } from '../../api/auth/RequestOtp';
import { useSelector } from 'react-redux';

export const useOTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  // Request OTP
  const handleRequestOTP = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const accessToken = await getValidToken();
      const response = await RequestOTP(accessToken);
      setMessage('Yêu cầu OTP thành công!');
    } catch (err) {
      console.error('❌ Lỗi gửi OTP:', err);
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
      setMessage('Xác thực OTP thành công!');
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
