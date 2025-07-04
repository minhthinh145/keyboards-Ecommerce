import { EmailComponent } from './LeftSideComponent/EmailComponent';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { UserInfor } from './LeftSideComponent/UserInfor';

export const LeftSide = ({ user, order }) => {
  const [shippingMethod, setShippingMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  console.log('User data:', user);
  console.log('Order data:', order);

  return (
    <div className="flex flex-col gap-4 pl-44 pr-8 pt-8 w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between w-full p-4 rounded">
        {/* Logo + Tên thương hiệu */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
              alt="React Logo"
              className="w-full h-full object-cover animate-spin-slow"
            />
          </div>
          <span className="text-2xl font-semibold bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
            TShop 2025
          </span>
        </div>

        {/* Icon giỏ hàng */}
        <div className="text-gray-700 hover:text-black cursor-pointer">
          <ShoppingCart size={28} />
        </div>
      </div>

      {/* Thông tin liên hệ */}
      <div className="p-4 rounded  w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Thông tin liên hệ</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            Đăng nhập
          </button>
        </div>

        {/* Email từ user data */}
        <div className="mb-4">
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-700 cursor-not-allowed"
            placeholder="Email"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="newsletter"
            defaultChecked
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="newsletter" className="text-sm text-gray-700">
            Gửi cho tôi tin tức và ưu đãi qua email
          </label>
        </div>
      </div>

      {/* Giao hàng */}
      <div className=" p-4 rounded  w-full">
        <h2 className="font-semibold text-lg mb-4">Giao hàng</h2>

        {/* Chỉ có option vận chuyển */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 p-3 rounded border border-blue-400 bg-blue-50 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="delivery"
              checked={shippingMethod === 'delivery'}
              onChange={() => setShippingMethod('delivery')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">Vận chuyển</span>
                <span className="text-blue-600">🚚</span>
              </div>
            </div>
          </label>
          {/* Thông tin người dùng */}
        </div>
        <UserInfor user={user} />
      </div>

      {/* Thanh toán */}
      <div className=" p-4 rounded  w-full">
        <h2 className="font-semibold text-lg mb-4">Thanh toán</h2>

        <div className="flex flex-col gap-3">
          {/* COD */}
          <label className="flex items-center gap-3 p-3 rounded border border-blue-400 bg-blue-50 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  Thanh toán khi nhận hàng (COD)
                </span>
                <span className="text-gray-500">💰</span>
              </div>
            </div>
          </label>

          {/* VNPay */}
          <label className="flex items-center gap-3 p-3 rounded border border-gray-300 cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="vnpay"
              checked={paymentMethod === 'vnpay'}
              onChange={() => setPaymentMethod('vnpay')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">VNPay</span>
                <span className="text-blue-600">🏦</span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
