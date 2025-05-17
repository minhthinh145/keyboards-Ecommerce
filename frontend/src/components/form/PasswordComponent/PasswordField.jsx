import { HiLockClosed } from "react-icons/hi";
import { ShowPassword } from "../../button/ShowPassword.jsx";
export const PasswordField = ({
  id,
  label,
  name,
  register,
  errors,
  rules,
  placeholder = "Nhập mật khẩu của bạn",
  value,
  onChange,
}) => {
    
  const inputProps = register ? register(id, rules) : { name, value, onChange };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="block text-sm font-medium mb-2">
          {label} <span className="text-red-500">*</span>
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
          id={id}
          {...inputProps}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]"
          placeholder={placeholder}
        />

        <ShowPassword id={id} />
      </div>
      {errors?.[name] && (
        <p className="text-red-500 mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};
