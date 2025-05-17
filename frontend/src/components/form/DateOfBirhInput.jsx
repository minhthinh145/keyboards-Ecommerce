import { HiCalendar } from "react-icons/hi2";

export const DateOfBirthInput = ({ register, errors }) => {
  return (
    <div>
      <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-2">
        Ngày sinh
      </label>

      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <span className="text-sm">
            <HiCalendar />
          </span>
        </span>
        <input
          type="date"
          id="dateOfBirth"
          max={new Date().toISOString().split("T")[0]}
          {...register("dateOfBirth", {
            required: "Ngày sinh không được để trống",
            validate: {
              isValidDate: (value) => {
                const date = new Date(value);
                return !isNaN(date.getTime()) || "Ngày sinh không hợp lệ";
              },
            },
          })}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:translate-y-[-2px]"
          placeholder="Nhập ngày sinh của bạn"
        />
      </div>
      {errors.dateOfBirth && (
        <p className="text-red-500 text-sm mt-1">
          {errors.dateOfBirth.message}
        </p>
      )}
    </div>
  );
};
