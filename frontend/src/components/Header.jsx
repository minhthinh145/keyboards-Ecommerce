import { useState } from "react";
import {  FiShoppingCart, FiX, FiMenu } from "react-icons/fi";
import {DarkModeToggler} from "./button/DarkModeToggler.jsx";
export const Header = ({ isMenuOpen, setIsMenuOpen, cartCount }) => {
  const darkMode = true;

  return (
          <nav className="sticky top-0 z-50 bg-white  shadow-md">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                <div className="flex items-center justify-between h-16">
                      <div className="flex items-center">
                          <img
                          className="h-8 w-auto"
                          src="https://images.unsplash.com/photo-1587829741301-dc798b83add3"
                          alt="Logo"
                        />
                        <div className="hidden md:block ml-10">
                          <div className="flex items-baseline space-x-4">
                            {["Home", "Products", "Categories", "About", "Contact"].map((item) => (
                              <a
                                key={item}
                                href="#"
                                className="text-gray-700 dark:text-black hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                              >
                                {item}
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                          <div className="flex items-center space-x-4">
                            <DarkModeToggler />
                    <div className="relative">
                      <FiShoppingCart className="h-6 w-6" />
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                        {cartCount}
                      </span>
                    </div>
                    <button
                      className="md:hidden"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
             </div>
          </nav>
  );
};
