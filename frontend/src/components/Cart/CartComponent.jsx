import { CartHeader } from './components/CartHeader';
import { CartItemCard } from './components/CartItemCard';
import { CartFooter } from './components/CartFooter';
export const CartComponent = ({
  items,
  onRemove,
  onQuantityChange,
  isOpen,
  setIsOpen,
  totalPrice,
}) => {
  if (!items || items.length === 0) {
    return (
      <div
        className={`fixed top-0 right-0 w-160 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out rounded-xl border overflow-x-auto overflow-y-auto p-10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full items-center justify-center text-center p-4">
          <p className="text-lg text-gray-700 mb-4">Giỏ hàng của bạn trống</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-0 right-0 w-160 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out rounded-xl border overflow-x-auto overflow-y-auto p-10 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6">
          <CartHeader
            quantity={items.reduce((acc, curr) => acc + curr.quantity, 0)}
            onClose={() => setIsOpen(false)}
          />

          <div>
            {items.map((cartItem) => (
              <CartItemCard
                key={cartItem.productId}
                items={cartItem}
                onRemove={onRemove}
                onQuantityChange={onQuantityChange}
              />
            ))}
          </div>
        </div>
        <CartFooter totalPrice={totalPrice} />
      </div>
    </div>
  );
};
