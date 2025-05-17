import React from "react";
import { Link } from "react-router-dom";

export const ProductInfo = ({ items }) => {
  return (
    <div className="flex items-center overflow-hidden min-w-0">
      <img
        src={items.imageUrl}
        alt={items.productName}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="ml-3 text-lg flex flex-col items-baseline gap-x-2 group">
        <span className="relative block group font-semibold text-gray-900 cursor-pointer w-fit">
          <Link
            to={`/product/${items.productId}`}
            className="text-gray-900 hover:text-gray-700 
             bg-[linear-gradient(to_right,theme(colors.gray.500)_0%,theme(colors.gray.500)_100%)]
             bg-no-repeat bg-[length:0_2px] hover:bg-[length:100%_2px] 
             bg-left-bottom transition-all duration-300"
          >
            {items.productName}
          </Link>
        </span>
        <p className="font-medium text-gray-500">
          {items.price.toLocaleString("vi-VN")}đ
        </p>
        <p className="text-gray-500">{items.description || "Không có mô tả"}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
