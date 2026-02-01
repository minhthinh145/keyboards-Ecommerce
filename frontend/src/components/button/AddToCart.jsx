import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slice/cartSlice'; // ✅ Import từ cartSlice, không phải API

export const AddToCart = ({ product, quantity = 1 }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity }));
  };

  return (
    <button
      className="flex items-center gap-2 bg-indigo-700 text-white px-4 py-2 rounded-full duration-200
                         hover:bg-indigo-800 hover:shadow-lg hover:scale-[1.02] transform disabled:opacity-50"
      onClick={handleAddToCart}
      disabled={loading}
    >
      <FiShoppingCart className="text-xl transition" />
      {loading ? 'Đang thêm...' : 'Thêm vào giỏ'}
      {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
    </button>
  );
};
