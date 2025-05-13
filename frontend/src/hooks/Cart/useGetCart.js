import { useState, useEffect, useContext } from "react";
import { getCart } from "../../api/Cart/getCart";
import { AuthContext } from "../../contexts/AuthContext";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getValidToken } = useContext(AuthContext);

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
  }, [getValidToken]);

  return { cartItems, totalPrice, loading, error };
};
