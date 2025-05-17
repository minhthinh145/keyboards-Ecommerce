import { X } from "lucide-react";
export const CartHeader = ({ quantity, onClose }) => {
  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Giỏ hàng</h2>
          <span className="bg-blue-600 text-white text-sm font-medium px-2 py-1 rounded-full">
            {quantity}
          </span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
