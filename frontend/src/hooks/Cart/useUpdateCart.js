import { updateCart } from '../../api/Cart/updateCart';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const updateCart = async () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const handleUpdateCart = async (cartItem) => {
    try {
      setLoading(true);
      if (!accessToken) {
        throw new Error('No valid token found');
      }

      const updateCart = await updateCart(cartItem, accessToken);
      console.log('Update Cart Response:', updateCart); // Debug dữ liệu
      return updateCart;
    } catch (err) {
      setError(err);
      console.error('Có lỗi khi cập nhật giỏ hàng:', err);
    } finally {
      setLoading(false);
    }
  };
  return { handleUpdateCart, loading, error };
};
