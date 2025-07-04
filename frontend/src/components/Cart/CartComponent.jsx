import { CartHeader } from './components/CartHeader';
import { CartItemCard } from './components/CartItemCard';
import { CartFooter } from './components/CartFooter';
import { useEffect, useState } from 'react';
import { fetchCart } from '@/redux/slice/cartSlice';
import { removeFromCart } from '@/redux/slice/cartSlice';
import { addToCart } from '@/redux/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export const CartComponent = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { items, totalPrice, loading, error } = useSelector(
    (state) => state.cart
  );
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCart());
    }
  }, [dispatch, isOpen]);

  //handle remove  item
  const handleRemove = async (productId) => {
    await dispatch(removeFromCart(productId));
    dispatch(fetchCart());
  };

  //quantity change
  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await dispatch(removeFromCart(productId));
    } else {
      console.log('Adding to cart:', productId, newQuantity);
      await dispatch(addToCart({ productId, quantity: newQuantity }));
    }

    dispatch(fetchCart());
  };
  if (loading) {
    return (
      <div
        className={`fixed top-0 right-0 w-160 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out rounded-xl border overflow-x-auto overflow-y-auto p-10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <p>Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }
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
                item={cartItem}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        </div>
        <CartFooter totalPrice={totalPrice} />
      </div>
    </div>
  );
};
