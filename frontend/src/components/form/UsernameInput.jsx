import { FaUser } from "react-icons/fa";
export const UsernameInput = () => {
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-medium mb-2">
        Tên tài khoản
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <span className="text-sm">
            <FaUser />
          </span>
        </span>
        <input
          type="text"
          id="name"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]"
          placeholder="Nhập tên tài khoản của bạn"
        />
      </div>
    </div>
  );
};
