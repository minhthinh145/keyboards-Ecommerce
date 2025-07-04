import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductInfo } from '../components/Cart/components/ProductInfo';
import { ItemControls } from '../components/Cart/components/ItemControl';
import { useNavigate } from 'react-router-dom';
import { PayButton } from '../components/button/PayButton';
import { fetchCart, removeFromCart, addToCart } from '../redux/slice/cartSlice';
import { createOrder } from '@/redux/slice/orderSlice';

export const CartPage = () => {
  const [updatingItems, setUpdatingItems] = React.useState(new Set());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items: cartItems,
    totalPrice,
    loading: cartLoading,
    error: cartError,
  } = useSelector((state) => state.cart);

  const { loading: orderLoading, error: orderError } = useSelector(
    (state) => state.order
  );

  const handleCreateOrder = async () => {
    try {
      const res = await dispatch(createOrder());
      if (createOrder.fulfilled.match(res)) {
        const order = res.payload;
        navigate(`/payment/${order.id}`);
      }
    } catch (error) {
      console.error('Có lỗi khi tạo đơn hàng:', error);
    }
  };
  // Fetch cart khi component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = async (productId, quantity) => {
    setUpdatingItems((prev) => new Set(prev).add(productId));
    try {
      if (quantity <= 0) {
        await dispatch(removeFromCart(productId));
      } else {
        await dispatch(addToCart({ productId, quantity }));
      }
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    setUpdatingItems((prev) => new Set(prev).add(productId));

    try {
      await dispatch(removeFromCart(productId));
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const shippingFee = 16000;
  const grandTotal = totalPrice + shippingFee;

  if (cartLoading && (!cartItems || cartItems.length === 0)) {
    return <div className="text-center py-6">Đang tải...</div>;
  }
  if (cartError) {
    return (
      <div className="text-center py-6 text-red-500">Lỗi: {cartError}</div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Giỏ hàng trống
        </h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Tiếp tục mua hàng
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto sm:px-3 lg:px-4">
        {/* Tiêu đề */}
        <div className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          <h1>Giỏ hàng</h1>
        </div>

        {/* Grid 2 cụm */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Cụm 1: Danh sách sản phẩm */}
          <div className="lg:col-span-7 bg-white p-6 rounded-lg">
            {/* Header */}
            <div className="grid grid-cols-[60%_20%_20%] text-gray-600 font-semibold border-b pb-2 px-2">
              <div className="text-left">Sản phẩm</div>
              <div className="text-center">Số lượng</div>
              <div className="text-right">Tổng</div>
            </div>

            {/* Danh sách sản phẩm */}
            <div>
              {cartItems.map((item) => {
                const isUpdating = updatingItems.has(item.productId);
                return (
                  <div
                    key={item.productId}
                    className={`grid grid-cols-[60%_20%_20%] items-center px-2 py-4 transition-opacity ${
                      isUpdating ? 'opacity-50' : 'opacity-100'
                    }`}
                  >
                    {/* Cột 1: Sản phẩm (ProductInfo) */}
                    <div className="flex items-center">
                      <ProductInfo item={item} />
                    </div>

                    {/* Cột 2: Số lượng (ItemControls) */}
                    <div className="text-center relative">
                      {isUpdating && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                      <ItemControls
                        quantity={item.quantity}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                        productId={item.productId}
                        disabled={isUpdating}
                      />
                    </div>

                    {/* Cột 3: Tổng giá */}
                    <div className="text-right font-medium text-gray-500">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cụm 2: Thanh toán */}
          <div className="lg:col-span-3 bg-white p-6 rounded-lg border border-gray-300">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Tổng cộng
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tổng tiền</span>
                <span className="font-medium">
                  {totalPrice.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className="font-medium">
                  {shippingFee.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng thanh toán</span>
                <span>{grandTotal.toLocaleString('vi-VN')} VNĐ</span>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <PayButton onClick={handleCreateOrder} loading={orderLoading} />
            </div>
            <p className="text-center text-gray-500 text-sm mt-2">
              Đã bao gồm: Phí ship sẽ được tính khi thanh toán
            </p>
            {orderError && (
              <p className="text-center text-red-500 text-sm mt-2">
                {orderError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
