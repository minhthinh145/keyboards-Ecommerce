import React from "react";
import { useCart } from "../hooks/Cart/useGetCart";
import { ProductInfo } from "../components/Cart/components/ProductInfo";
import { ItemControls } from "../components/Cart/components/ItemControl";
import { useNavigate } from "react-router-dom";
import { PayButton } from "../components/button/PayButton";
import { useCreateOrder } from "../hooks/Orders/useCreateOrder";
export const CartPage = () => {
  const {
    cartItems,
    totalPrice,
    loading: cartLoading,
    error: cartError,
  } = useCart();
  const shippingFee = 16000;
  const grandTotal = totalPrice + shippingFee;
  const navigate = useNavigate();
  const {
    handleCreateOrder,
    loading: orderLoading,
    error: orderError,
  } = useCreateOrder(navigate);
  if (cartLoading) return <div className="text-center py-6">Đang tải...</div>;
  if (cartError)
    return (
      <div className="text-center py-6 text-red-500">
        Lỗi: {cartError.message}
      </div>
    );

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
          <div className="lg:col-span-7 bg-white p-6 rounded-lg ">
            {/* Header */}
            <div className="grid grid-cols-[60%_20%_20%] text-gray-600 font-semibold border-b pb-2 px-2">
              <div className="text-left">Sản phẩm</div>
              <div className="text-center">Số lượng</div>
              <div className="text-right">Tổng</div>
            </div>

            {/* Danh sách sản phẩm */}
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="grid grid-cols-[60%_20%_20%] items-center px-2 py-4"
                >
                  {/* Cột 1: Sản phẩm (ProductInfo) */}
                  <div className="flex items-center">
                    <ProductInfo items={item} />
                  </div>

                  {/* Cột 2: Số lượng (ItemControls) */}
                  <div className="text-center">
                    <ItemControls
                      quantity={item.quantity}
                      onQuantityChange={(productId, quantity) =>
                        console.log("Quantity change:", productId, quantity)
                      }
                      onRemove={(productId) =>
                        console.log("Remove:", productId)
                      }
                      productId={item.productId}
                    />
                  </div>

                  {/* Cột 3: Tổng giá */}
                  <div className="text-right font-medium text-gray-500">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right">
              <p className="text-gray-600">
                Đã bao gồm: Phí ship sẽ được tính khi thanh toán
              </p>
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
                  {totalPrice.toLocaleString("vi-VN")} VNĐ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className="font-medium">
                  {shippingFee.toLocaleString("vi-VN")} VNĐ
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng thanh toán</span>
                <span>{grandTotal.toLocaleString("vi-VN")} VNĐ</span>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <PayButton onClick={handleCreateOrder} />
            </div>
            <p className="text-center text-gray-500 text-sm mt-2">
              Đã bao gồm: Phí ship sẽ được tính khi thanh toán
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
