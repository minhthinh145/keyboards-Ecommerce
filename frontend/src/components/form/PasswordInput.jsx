import { useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { HiEye } from "react-icons/hi";

export const PasswordInput = ({ value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Mật khẩu
        </label>
        <a className="text-sm font-semibold text-indigo-500 hover:text-indigo-800 transition-colors">
          Quên mật khẩu?
        </a>
      </div>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <HiLockClosed />
        </span>
        <input
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]"
          placeholder="Nhập mật khẩu của bạn"
        />
        <span
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          <HiEye className="text-xl" />
        </span>
      </div>
    </div>
  );
};
