import { useState } from "react";
import { useCheckPassword } from "./useCheckPassword";
import { useOTP } from "./useSendOTP";
import { useChangePassword } from "./useChangePassword";
import { useEffect } from "react";
import { set } from "react-hook-form";

export const useChangePasswordFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const {
    checkPassword,
    result,
    loading: checkPasswordLoading,
    error: checkPasswordError,
  } = useCheckPassword();

  const {
    handleRequestOTP,
    handleVerifyOTP,
    isLoading: otpLoading,
    error: otpError,
    message: otpMessage,
  } = useOTP();

  const {
    handleConfirmChangePassword,
    isLoading: changePasswordLoading,
    error: changePasswordError,
    message: changePasswordMessage,
  } = useChangePassword();

  // ----- STEP HANDLERS -----

  const handleStep_CheckPassword = async (currentPassword) => {
    console.log("🔐 Bước 1: Kiểm tra mật khẩu hiện tại...");
    await checkPassword(currentPassword);
    console.log("Kiểm tra mật khẩu xong, kết quả:", result); // Thêm log để kiểm tra kết quả
  };
  useEffect(() => {
    if (result) {
      if (result.isSuccess) {
        console.log("Mật khẩu hợp lệ!");
      } else {
        console.log("❌ Mật khẩu không hợp lệ!");
      }
    }
  }, [result]); // useEffect sẽ chạy lại khi result thay đổi
  const handleStep_SendOTP = async () => {
    console.log("📩 Bước 2: Gửi OTP...");
    try {
      await handleRequestOTP();
      console.log("Gửi OTP thành công", otpMessage);
      setMessage(otpMessage || "✅ Gửi OTP thành công!");
      setCurrentStep(2); // Chuyển sang bước xác thực OTP
    } catch (err) {
      console.error("Lỗi khi gửi OTP:", err);
    }
  };
  const handleStep_VerifyOTP = async (OtpCode) => {
    console.log("🔑 Bước 2: Xác thực OTP...");
    await handleVerifyOTP(OtpCode);

    setMessage(otpMessage || "✅ Xác thực OTP thành công!");
  };

  const handleStep_ChangePassword = async (newPassword, OtpCode) => {
    console.log("🔄 Bước 3: Đổi mật khẩu...");

    await handleConfirmChangePassword(newPassword, OtpCode);

    setMessage(changePasswordMessage || "✅ Đổi mật khẩu thành công!");
    setCurrentStep(1); // Reset flow
  };

  // ----- MAIN FLOW -----

  const handlePasswordChangeFlow = async (data) => {
    console.log(
      "🚀 handlePasswordChangeFlow - currentStep:",
      currentStep,
      "data:",
      data
    );
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (currentStep === 1) {
        console.log("Bước 1: Kiểm tra mật khẩu hiện tại nè ...");
        await handleStep_CheckPassword(data.currentPassword);
        console.log("gửi otp nè");
        await handleStep_SendOTP();
      } else if (currentStep === 2) {
        if (!data.OtpCode) {
          throw new Error("❌ Mã OTP không được cung cấp!");
        }
        await handleStep_VerifyOTP(data.OtpCode);

        await handleStep_ChangePassword(data.newPassword, data.OtpCode);
      }
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi!");
    } finally {
      setIsLoading(false);
    }
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setError(null);
    setMessage(null);
    setIsLoading(false);
  };

  return {
    currentStep,
    isLoading:
      isLoading || checkPasswordLoading || otpLoading || changePasswordLoading,
    error: error || checkPasswordError || otpError || changePasswordError,
    message: message || otpMessage || changePasswordMessage,
    handlePasswordChangeFlow,
    resetFlow,
  };
};
