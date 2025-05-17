import { EmailComponent } from './LeftSideComponent/EmailComponent';
import { ShoppingCart } from 'lucide-react'; // Hoặc dùng Heroicons / FontAwesome
export const LeftSide = ({ user }) => {
  console.log('user in LeftSide:', user);

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

      <div className="bg-white p-4 rounded shadow w-full">
        <EmailComponent email={user?.email || 'Chưa có email'} />
      </div>

      <div className="bg-white p-4 rounded shadow w-full">
        <h2 className="font-semibold text-lg">Địa chỉ giao hàng</h2>
        <p>123 Đường ABC, Quận XYZ</p>
      </div>

      <div className="bg-white p-4 rounded shadow w-full">
        <h2 className="font-semibold text-lg">Phương thức thanh toán</h2>
        <p>Thanh toán khi nhận hàng</p>
      </div>

      {/* Thêm nhiều cụm component khác tương tự */}
    </div>
  );
};
