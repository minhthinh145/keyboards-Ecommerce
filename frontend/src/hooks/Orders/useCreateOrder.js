import { useContext, useState } from 'react';
import { createOrder } from '../../api/Order/createOrder';
import { useSelector } from 'react-redux';

export const useCreateOrder = (navigate) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      if (!accessToken) {
        throw new Error('No valid token found');
      }
      const result = await createOrder(accessToken);
      if (result?.id) {
        localStorage.setItem('latestOrderId', result.id);
        navigate('/payment');
      }
      return result;
    } catch (err) {
      setError(err);
      console.error('Có lỗi khi tạo bill thanh toán vào giỏ hàng:', err);
    } finally {
      setLoading(false);
    }
  };
  return { handleCreateOrder, loading, error };
};
