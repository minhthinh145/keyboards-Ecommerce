import { AiFillDollarCircle } from "react-icons/ai";
export const CartFooter = ({ totalPrice }) => {
  return (
    <div className="border-t p-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <p className="text-xl font-semibold">Tổng</p>
        <p className="text-xl font-semibold ">
          {totalPrice.toLocaleString("vi-VN")} VND
        </p>
      </div>
      <p className="text-gray-500">
        Đã bao gồm phí thuế , phí ship sẽ được tính khi thanh toán
      </p>

      <div className="flex gap-2 pt-4">
        <button className="flex-1 bg-blue-400 font-bold text-white  py-4 px-6 rounded-full hover:bg-white hover:text-blue-400 border border-blue-700">
          Xem giỏ hàng
        </button>
        <button
          className="flex-1 font-bold bg-blue-900 text-white gap-4 py-4 px-6 rounded-full 
            hover:bg-white hover:text-blue-900 border border-blue-900 
              flex justify-center items-center"
        >
          <AiFillDollarCircle />
          Thanh toán
        </button>
      </div>
    </div>
  );
};
