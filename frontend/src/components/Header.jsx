import { FiShoppingCart, FiX, FiMenu, FiUser } from "react-icons/fi";
import { DarkModeToggler } from "./button/DarkModeToggler.jsx";
import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Authcontext.jsx";
export const Header = ({ isMenuOpen, setIsMenuOpen, cartCount }) => {
  const darkMode = true;
  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Danh sách sản phẩm", href: "/products" },
    { name: "Danh mục", href: "/categories" },
    //  { name: "About", href: "/about" },
    { name: "Liên hệ", href: "/contact" },
  ];
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900  shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              className="h-8 w-auto"
              src="https://images.unsplash.com/photo-1587829741301-dc798b83add3"
              alt="Logo"
            />
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hover:bg-zinc-300 dark:hover:bg-zinc-700 p-2 rounded-full transform hover:scale-[1.02] transition duration-200 relative">
              {user ? (
                <div className="group relative cursor-pointer">
                  <span className="text-sm font-medium text-gray-700 dark:text-white px-3 py-2 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">
                    {user.username}
                  </span>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                    {" "}
                    <Link
                      to="/userprofile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <p className="font-semibold">Chỉnh sửa thông tin</p>
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <p className="font-semibold">Đăng xuất</p>
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/signin">
                  <FiUser className="h-6 w-6 " />
                </Link>
              )}
            </div>

            <DarkModeToggler />
            <div className="relative hover:bg-gray-200 p-2 rounded-full hover:scale-[1.02] transform">
              <FiShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
