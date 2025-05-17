import { useForm } from "react-hook-form";
import { PopupReminder } from "../../PopupReminder";
import { useState } from "react";
import { useEffect } from "react";

export const OtpPopup = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  otpResult,
  otpMessage,
  title = "Nhập mã OTP",
  placeholder = "Nhập mã OTP (6 chữ số)",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  //need to popup Reminmder

  const [showReminder, setShowReminder] = useState(false);
  useEffect(() => {
    if (otpResult && otpMessage) {
      setShowReminder(true);
    }
  }, [otpResult, otpMessage]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h3 className="text-lg font-bold mb-4">{title}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Mã OTP
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Nhập mã OTP (6 chữ số)"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                {...register("otp", {
                  required: "Mã OTP không được để trống",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Mã OTP phải là 6 chữ số",
                  },
                })}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`py-2 px-4 rounded-md text-white font-medium ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isLoading ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showReminder && (
        <PopupReminder
          message={otpMessage}
          type={otpResult}
          onSave={() => {
            setShowReminder(false);
            if (otpResult === "success") {
              onClose(); // Close the OTP popup if OTP is successful
            }
          }}
        />
      )}
    </>
  );
};
