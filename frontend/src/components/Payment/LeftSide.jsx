import { EmailComponent } from './LeftSideComponent/EmailComponent';
import { ShoppingCart } from 'lucide-react'; // Hoặc dùng Heroicons / FontAwesome
import { useState } from 'react';
export const LeftSide = ({ user }) => {
  const [shippingMethod, setShippingMethod] = useState('store');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [note, setNote] = useState('');
  return (
    <div className="flex flex-col gap-4 pl-44 pr-8 pt-8 w-full min-h-screen">
      <div className="flex items-center justify-between w-full p-4  rounded ">
        {/* Logo + Tên thương hiệu */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden  ">
            <img
              src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
              alt="React Logo"
              className="w-full h-full object-cover animate-spin-slow  "
            />
          </div>
          <span className="text-2xl font-semibold bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
            Minh Thịnh Shop
          </span>
        </div>

        {/* Icon giỏ hàng */}
        <div className="text-gray-700 hover:text-black cursor-pointer">
          <ShoppingCart size={28} />
        </div>
      </div>
      {/* Email */}
      <div className="bg-white p-4 rounded shadow w-full">
        <EmailComponent email={user?.email || 'Chưa có email'} />
      </div>

      {/* Giao hàng */}
      <div className="bg-white p-4 rounded shadow w-full">
        <h2 className="font-semibold text-lg mb-2">Giao hàng</h2>
        <div className="flex flex-col gap-2">
          <label
            className={`flex items-center gap-2 p-2 rounded cursor-pointer ${shippingMethod === 'delivery' ? 'bg-blue-50 border  border-blue-400' : ''}`}
          >
            <input
              type="radio"
              className="accent-blue-500"
              checked={shippingMethod === 'store'}
              onChange={() => setShippingMethod('store')}
            />
            <span>Nhận hàng tại cửa hàng</span>
          </label>
        </div>
      </div>

      {/* Thêm nhiều cụm component khác tương tự */}
    </div>
  );
};
