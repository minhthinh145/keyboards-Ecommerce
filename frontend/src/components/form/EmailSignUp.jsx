import { HiMail } from "react-icons/hi";

export const EmailSignUp = ({ register, errors }) => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium mb-2">
        Email
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <span className="text-sm">
            <HiMail />
          </span>
        </span>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email không được để trống",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email không hợp lệ",
            },
          })}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]"
          placeholder="Nhập email của bạn"
        />
      </div>
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
    </div>
  );
};
