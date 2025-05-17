import { FaPhone } from "react-icons/fa";

export const PhoneNumberInput = ({ register, errors }) => {
  return (
    <div>
      <label htmlFor="phone" className="block text-sm font-medium mb-2">
        Số điện thoại
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <span className="text-sm">
            <FaPhone />
          </span>
        </span>
        <input
          type="text"
          id="phone"
          {...register("phoneNumber", {
            required: "Số điện thoại không được để trống",
            pattern: {
                value: /^(0(3|5|7|8|9))[0-9]{8}$/,
                message: "Số điện thoại không hợp lệ",
            },
          })}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]"
          placeholder="Nhập số điện thoại của bạn"
        />
      </div>
      {errors.phoneNumber && (
        <p className="text-red-500 text-sm mt-1">
          {errors.phoneNumber.message}
        </p>
      )}
    </div>
  );
};
