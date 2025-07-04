import { useState, useContext } from 'react';
import { checkPassword } from '../../api/auth/checkpassword.js';
import { useSelector } from 'react-redux';

export const useCheckPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const handleCheckPassword = async (password) => {
    setLoading(true);
    setError(null);

    try {
      const result = await checkPassword(password, accessToken);
      setResult(result);
      // Log kết quả trả về từ API
      console.log('Kết quả trả về từ API:', result);
      console.log('hello', result.isSuccess);
      // Kiểm tra nếu API trả về status hoặc result thành công
      if (result.isSuccess) {
        console.log('Mật khẩu hợp lệ!');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    result,
    checkPassword: handleCheckPassword,
  };
};
