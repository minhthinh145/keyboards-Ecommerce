import React from "react";
import { Link } from "react-router-dom";
import { EmailInput } from "../components/form/EmailInput.jsx";
import { HiLockClosed } from "react-icons/hi";
import { PasswordInput } from "../components/form/PasswordInput.jsx";
import { SubmitButton } from "../components/form/SubmitButton.jsx";
import { FingerprintLogin } from "../components/form/FingerprintLogin.jsx";
import { Sidebar } from "../components/form/AuthSideBar.jsx";
import { UserLogin } from "../hooks/userLogin.js";
export const Signin = () => {
  const { email, password, setEmail, setPassword, handleLogin } = UserLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-16 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Left Side: Image and Text */}
        <Sidebar
          title="Chào mừng đến với TShop"
          description="Nơi bạn có thể tìm thấy mọi thứ bạn cần"
        />
        {/* Right Side: Form */}
        <div className="p-12 flex flex-col">
          <div className="flex flex-col items-center mb-8">
            <HiLockClosed className="h-12 w-12 text-indigo-800 mb-4 bg-indigo-200 rounded-full p-2" />
            <h2 className="text-2xl font-bold mb-2">Đăng nhập</h2>
            <p>Nhập email và mật khẩu của bạn để đăng nhập</p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-end hover-scale">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-offset-2  transition-colors"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm">
                Ghi nhớ đăng nhập
              </label>
            </div>
            {/* Submit Button */}
            <SubmitButton>Đăng nhập</SubmitButton>

            {/* fingerprint login option */}
            <FingerprintLogin />

            <div className="text-center mt-6 flex items-center justify-center">
              <p className="text-sm text-gray-600">Bạn chưa có tài khoản?</p>
              <Link
                className="ml-1 text-indigo-600 text-sm hover:text-indigo-800 font-semibold hover-scale"
                to="/signup"
              >
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
