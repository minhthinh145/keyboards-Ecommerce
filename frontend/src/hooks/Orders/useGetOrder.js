// hooks/useGetOrder.js
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getOrder as fetchOrder } from '../../api/Order/getOrder';

export const useGetOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getValidToken } = useContext(AuthContext);

  const handleGetOrder = async (orderId) => {
    try {
      setLoading(true);
      const accessToken = await getValidToken();
      if (!accessToken) {
        throw new Error('No valid token found');
      }

      const result = await fetchOrder(accessToken, orderId); // gọi API
      console.log('getOrder response:', result);
      return result;
    } catch (err) {
      setError(err);
      console.error('Có lỗi khi lấy đơn hàng:', err);
    } finally {
      setLoading(false);
    }
  };

  return { handleGetOrder, loading, error };
};
