import { HiMail } from "react-icons/hi";

export const EmailInput = () => {
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
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]"
          placeholder="Nhập email của bạn"
        />
      </div>
    </div>
  );
};
