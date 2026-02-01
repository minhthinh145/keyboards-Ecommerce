import React, { useState, useRef, useEffect } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { CartComponent } from './CartComponent';
import { useDispatch, useSelector } from 'react-redux';

export const CartControl = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);
  const dispatch = useDispatch();
  const { items, totalItems, loading } = useSelector((state) => state.cart);
  // Xử lý nhấn ra ngoài để đóng giỏ hàng
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Chỉ đóng nếu nhấn ngoài cartRef và không phải nút giỏ hàng
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !event.target.closest('.cart-button')
      ) {
        console.log('Closing cart due to outside click');
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      // Thêm listener sau một khoảng nhỏ để tránh kích hoạt ngay
      const timeout = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeout);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isCartOpen]);

  // Xử lý bấm nút giỏ hàng
  const handleCartToggle = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <>
      {/* Nút giỏ hàng và menu */}
      <div>
        <div className="flex items-center space-x-4">
          <div className="relative hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full hover:scale-[1.02] transform transition-all">
            <button
              onClick={handleCartToggle}
              className="relative focus:outline-none cart-button"
              aria-label="Giỏ hàng"
            >
              <FiShoppingCart className="h-6 w-6 text-gray-700 dark:text-white" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            </button>
          </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6 text-gray-700 dark:text-white" />
            ) : (
              <FiMenu className="h-6 w-6 text-gray-700 dark:text-white" />
            )}
          </button>
        </div>

        {/** Overlay  */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-200 ${
            isCartOpen
              ? 'bg-black/40 opacity-200'
              : 'opacity-0 pointer-events-none'
          }`}
        />

        {/** Cart cũng luôn được mount và dùng translate để trượt ra */}
        <div
          ref={cartRef}
          className={`fixed top-0 right-0 z-50  h-full w-160 transition-transform duration-300 transform ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }   `}
        >
          <CartComponent isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        </div>
      </div>
    </>
  );
};
