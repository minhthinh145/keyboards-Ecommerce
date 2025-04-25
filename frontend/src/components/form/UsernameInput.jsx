import { FaUser } from "react-icons/fa";
export const UsernameInput = ({ register, errors }) => {
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-medium mb-2">
        Tên tài khoản
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <span className="text-sm">
            <FaUser />
          </span>
        </span>
        <input
          type="text"
          id="name"
          {...register("username", {
            required: "Tên tài khoản không được để trống",
            minLength: {
              value: 4,
              message: "Tên tài khoản phải ít nhất 4 ký tự",
            },
          })}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]"
          placeholder="Nhập tên tài khoản của bạn"    
        />
      </div>
      {errors.username && (
        <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
      )}
    </div>
  );
};
