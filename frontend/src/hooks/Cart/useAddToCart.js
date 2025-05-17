import { useState, useContext } from "react";
import { addToCart } from "../../api/Cart/AddtoCart";
import { AuthContext } from "../../contexts/AuthContext";
export const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getValidToken } = useContext(AuthContext);

  const handleAddToCart = async (cartItem) => {
    try {
      setLoading(true);
      const accessToken = await getValidToken();
      if (!accessToken) {
        throw new Error("No valid token found");
      }

      const result = await addToCart(cartItem, accessToken);
      console.log("Add to Cart Response:", result); // Debug dữ liệu
      return result;
    } catch (err) {
      setError(err);
      console.error("Có lỗi khi thêm sản phẩm vào giỏ hàng:", err);
    } finally {
      setLoading(false);
    }
  };
  return { handleAddToCart, loading, error };
};
