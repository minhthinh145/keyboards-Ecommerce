import React from "react";
import {
  FiStar,
  FiCheckCircle,
  FiShoppingCart,
  FiTruck,
  FiArrowDown,
  FiChevronDown,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosRefresh } from "react-icons/io";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products.js";
import { AddToCart } from "../components/button/AddToCart.jsx";
export const ProductsDetails = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const colorOptions = {
    Black: "bg-black",
    White: "bg-white",
    Pink: "bg-pink-500",
    Blue: "bg-blue-500",
  };

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));
  {
    /* Call api */
  }
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Xử lý loading
  const [error, setError] = useState(null); // Xử lý lỗi

  useEffect(() => {
    setLoading(true); // Bắt đầu loading khi bắt đầu gọi API
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false); // Dữ liệu đã nhận xong, tắt loading
      })
      .catch((err) => {
        console.error(err);
        setError("Đã có lỗi xảy ra khi tải dữ liệu");
        setLoading(false); // Nếu lỗi, tắt loading
      });
  }, [id]);

  if (loading) {
    return <p>Đang tải sản phẩm...</p>; // Hiển thị loading
  }

  if (error) {
    return <p>{error}</p>; // Hiển thị lỗi nếu có
  }

  if (!product) {
    return <p>Sản phẩm không tồn tại</p>; // Nếu không có sản phẩm, trả về thông báo
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 ml-8 mr-8">
      <div className="bg-gray-200 rounded-lg inline-block self-start px-2 py-2">
        <div className="flex justify-center items-center">
          <img
            src={product.imageUrl}
            alt="Product"
            className="object-cover w-full h-full "
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-3xl"> {product.name}</h3>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <FiStar className="text-yellow-500" />
            <FiStar className="text-yellow-500" />
            <FiStar className="text-yellow-500" />
            <FiStar className="text-yellow-500" />
            <FiStar className="text-gray-500" />
            <span className="text-gray-600 dark:text-white">
              4.2 (128 Reviews)
            </span>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-indigo-800 dark:text-white">
              {product.price.toLocaleString("vi-VN")}
            </span>
            <span className="line-through text-lg text-gray-500">299.99$</span>
            <span className="bg-indigo-100 text-indigo-800 rounded-lg  py-1 px-2 font-medium">
              Save 30%
            </span>
          </div>
          <p className="text-green-600 mt-4">
            <span className="flex items-center gap-2">
              <FiCheckCircle className="text-green-500" />
              <span>In Stock</span>
            </span>
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <p className="text-gray-700 dark:text-white mb-4">
            This high-performance keyboard is designed for both gaming
            enthusiasts and professionals. It features a sleek design,
            responsive keys, and customizable backlighting to enhance your
            typing or gaming experience. Built with durable materials, it
            ensures long-lasting performance and comfort during extended use.
          </p>
          <div className="flex flex-wrap gap-2 ">
            <span className="rounded-full bg-gray-200  py-1 px-2 duration-300 text-gray-600 hover:bg-gray-300 hover:text-gray-800 cursor-pointer">
              Blue switch
            </span>
            <span className="rounded-full bg-gray-200  py-1 px-2 duration-300 text-gray-600 hover:bg-gray-300 hover:text-gray-800 cursor-pointer">
              RGB Backligh
            </span>
            <span className="rounded-full bg-gray-200  py-1 px-2 duration-300 text-gray-600 hover:bg-gray-300 hover:text-gray-800 cursor-pointer">
              Hot-swappable
            </span>
            <span className="rounded-full bg-gray-200  py-1 px-2 duration-300 text-gray-600 hover:bg-gray-300 hover:text-gray-800 cursor-pointer">
              PBT Keycaps
            </span>
          </div>
        </div>
        {/* Select Switch */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Select Keyboard Color</h3>
          <div className="flex gap-3">
            {["Black", "White", "Pink", "Blue"].map((color, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedColor(color)}
                className={`
                                w-12 h-12 rounded-full cursor-pointer 
                                ${colorOptions[color]} 
                                ${
                                  selectedColor === color
                                    ? "border-4 border-indigo-500 transform scale-95"
                                    : "border-2 border-gray-300"
                                }
                                transition-all duration-300 
                                hover:scale-105 hover:shadow-lg
                                ${
                                  selectedColor === color
                                    ? "scale-95"
                                    : "scale-100"
                                }
                              `}
                style={{
                  boxShadow:
                    selectedColor === color
                      ? "0 0 10px rgba(0, 0, 0, 0.2)"
                      : "",
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Add to Cart*/}
        <div className="mb-4">
          {/* Ajdustment quantity */}
          <div className="flex items-center space-x-4">
            <div className=" flex items-center border border-gray-300 rounded-full px-3 py-2 gap-8">
              <button
                onClick={decrementQuantity}
                className=" text-purple-600 text-xl font-bold hover:text-purple-800 transition"
              >
                -
              </button>
              <span className="text-black font-medium dark:text-white">
                {" "}
                {quantity}{" "}
              </span>
              <button
                onClick={incrementQuantity}
                className="text-purple-600 text-xl font-bold hover:text-purple-800 transition"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <AddToCart product={product} quantity={quantity} />
            {/* Wishlist (Optional) because it's doesn't exit on database.*/}
            {/*
                                      <button className='group flex items-center gap-2 border border-black  bg-indigo-700 hover:bg-indigo-800 px-2 py-2 rounded-full duration-200
                                hover:shadow-lg hover:scale-[1.02] transform'>
                            <AiFillHeart className='text-2xl transition text-white group-hover:text-pink-500' />
                        </button>
                        */}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4">
          <div className="flex items-center text-md">
            <span className="text-indigo-700 mr-2 ">
              <FiTruck className="" />
            </span>
            <span>Free shipping over $25</span>
          </div>

          <div className="flex items-center text-md">
            <span className="text-indigo-700 mr-2">
              <IoIosRefresh className="" />
            </span>
            <span>30-day returns</span>
          </div>

          <div className="flex items-center text-md">
            <span className="text-indigo-700 mr-2">
              <HiOutlineUserCircle className="" />
            </span>
            <span>24/7 customer support</span>
          </div>
        </div>
        {/* Information ab shipping and return */}
        <details className="group mb-4 border-b border-gray-200 pb-4">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
            <span>Shipping information</span>
            <span className="group-open:rotate-180 transition-transform duration-200">
              <FiChevronDown />
            </span>
          </summary>
          <div className="mt-3 text-gray-600">
            <p>
              Immediate delivery within Ho Chi Minh City (3 - 4 hours), 1-5 days
              for areas outside Ho Chi Minh City.
            </p>
          </div>
        </details>
        <details className="group mb-4 border-b border-gray-200 pb-4">
          <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
            <span>Return Policy</span>
            <span className="group-open:rotate-180 transition-transform duration-200">
              <FiChevronDown />
            </span>
          </summary>
          <div className="mt-3 text-gray-600">
            <p>
              You can return the product within 30 days of purchase. The product
              must be in its original condition and packaging.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
};
