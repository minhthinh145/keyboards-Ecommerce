import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { createOrder } from '../../api/Order/createOrder';

export const useCreateOrder = (navigate) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getValidToken } = useContext(AuthContext);

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      const accessToken = await getValidToken();
      if (!accessToken) {
        throw new Error('No valid token found');
      }
      console.log(accessToken);
      const result = await createOrder(accessToken);
      console.log('createOrder response :', result);
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
