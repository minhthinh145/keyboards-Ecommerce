import { HiLockClosed, HiEye } from "react-icons/hi";
import { ShowPassword } from "../button/ShowPassword";

// ConfirmPasswordInput.jsx
export const ConfirmPasswordInput = ({ register, errors, watch }) => {
  const password = watch("password");

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <span className="text-sm">
              <HiLockClosed />
            </span>
          </span>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Mật khẩu không được để trống",
              minLength: {
                value: 6,
                message: "Mật khẩu ít nhất 6 ký tự",
              },
            })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]"
            placeholder="Nhập mật khẩu của bạn"
          />

          <ShowPassword id="password" />
        </div>
        {errors.password && (
          <p className="text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="confirmpassword"
            className="block text-sm font-medium mb-2"
          >
            Nhập lại mật khẩu <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <span className="text-sm">
              <HiLockClosed />
            </span>
          </span>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmpassword", {
              required: "Vui lòng nhập lại mật khẩu",
              validate: (value) =>
                value === password || "Mật khẩu nhập lại không khớp",
            })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]"
            placeholder="Nhập lại mật khẩu của bạn"
          />

          <ShowPassword id="confirmPassword" />
        </div>
        {errors.password && (
          <p className="text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>
    </div>
  );
};
