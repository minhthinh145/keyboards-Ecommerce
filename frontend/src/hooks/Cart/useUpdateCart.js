import { updateCart } from "../../api/Cart/updateCart";

export const updateCart = async () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getValidToken } = useContext(AuthContext);

  const handleUpdateCart = async (cartItem) => {
    try {
      setLoading(true);
      const accessToken = await getValidToken();
      if (!accessToken) {
        throw new Error("No valid token found");
      }

      const updateCart = await updateCart(cartItem, accessToken);
      console.log("Update Cart Response:", updateCart); // Debug dữ liệu
      return updateCart;
    } catch (err) {
      setError(err);
      console.error("Có lỗi khi cập nhật giỏ hàng:", err);
    } finally {
      setLoading(false);
    }
  };
  return { handleUpdateCart, loading, error };
};
