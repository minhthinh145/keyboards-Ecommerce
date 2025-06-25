import { useState, useEffect, useContext } from 'react';
import { getCart } from '../../api/Cart/getCart';
import { useSelector } from 'react-redux';
export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const accessToken = await getValidToken();
        const data = await getCart(accessToken);

        if (data && Array.isArray(data.items)) {
          setCartItems(data.items);
          setTotalPrice(data.totalPrice ?? 0);
        } else {
          setCartItems([]);
          setTotalPrice(0);
        }
      } catch (err) {
        setError(err);
        setCartItems([]);
        setTotalPrice(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [accessToken]);

  return { cartItems, totalPrice, loading, error };
};
