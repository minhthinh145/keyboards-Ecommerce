import React from "react";
import { FiTrash2 } from "react-icons/fi";

export const ItemControls = ({
  quantity,
  onQuantityChange,
  onRemove,
  productId,
}) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Khối điều khiển số lượng */}
      <div className="flex items-center border rounded-full">
        <button
          onClick={() => onQuantityChange(productId, quantity - 1)}
          disabled={quantity <= 1}
          className="px-1 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-300 font-bold"
        >
          -
        </button>
        <span className="px-1 text-sm text-gray-700">{quantity}</span>
        <button
          onClick={() => onQuantityChange(productId, quantity + 1)}
          className="px-1 py-1 text-gray-600 hover:text-gray-800 font-bold"
        >
          +
        </button>
      </div>

      {/* Nút xóa */}
      <button
        onClick={() => onRemove(productId)}
        className="text-gray-500 hover:text-red-500"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ItemControls;
