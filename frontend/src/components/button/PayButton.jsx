import { AiFillDollarCircle } from "react-icons/ai";

export const PayButton = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 font-bold bg-blue-900 text-white gap-4 py-4 px-6 rounded-full 
                  hover:bg-white hover:text-blue-900 border border-blue-900 
                  flex justify-center items-center ${className}`}
    >
      <AiFillDollarCircle />
      {children || "Thanh toán"}
    </button>
  );
};
