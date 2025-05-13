import { FiShoppingCart } from "react-icons/fi";
import { useAddToCart } from "../../hooks/Cart/useAddToCart";

export const AddToCart = ({ product, quantity }) => {
  const { handleAddToCart, loading, error } = useAddToCart();
  const handleClick = async () => {
    try {
      const cartItem = {
        productId: product.id,
        quantity: quantity,
      };
      await handleAddToCart(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <button
      className="flex items-center gap-2 bg-indigo-700 text-white px-2 py-2 rounded-full duration-200
                         hover:bg-indigo-800 hover:shadow-lg hover:scale-[1.02] transform"
      onClick={handleClick}
    >
      <FiShoppingCart className="text-2xl transition mr-2" />
      {loading ? "Adding..." : "Add to Cart"}
      {error && <span className="text-red-500 ml-2">{error.message}</span>}
    </button>
  );
};
