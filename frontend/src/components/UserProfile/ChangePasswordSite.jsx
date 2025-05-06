import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordField } from "../../components/form/PasswordComponent/PasswordField.jsx";
import { SubmitButton } from "../form/SubmitButton";
import { OtpPopup } from "../form/PasswordComponent/OtpPopup";
import { useChangePasswordFlow } from "../../hooks/AuthHooks/useChangePasswordFlow.js";

export const ChangePasswordSite = () => {
  const {
    currentStep,
    isLoading,
    error,
    message,
    handlePasswordChangeFlow,
    resetFlow,
  } = useChangePasswordFlow();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [OtpValue, setOtpValue] = useState(null); // State to store OTP value
  // Watch newPassword for confirmNewPassword validation
  const newPassword = watch("newPassword");

  // Handle form submission
  const onSubmit = async (data) => {
    if (isLoading) return; // Đảm bảo không gửi lại yêu cầu khi đang xử lý
    const flowData = {
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmNewPassword,
      OtpCode: OtpValue,
    };
    console.log("📨 Đang gửi yêu cầu đổi mật khẩu:", flowData);
    await handlePasswordChangeFlow(flowData);

    // Open OTP popup when reaching step 2 or 3
    if (currentStep === 1) {
      setIsOtpPopupOpen(true);
    }
  };

  // Handle OTP submission from popup
  const [otpResult, setOtpResult] = useState(null);
  const [otpMessage, setOtpMessage] = useState("");

  const handleOtpSubmit = async (data) => {
    if (isLoading) return; // Đảm bảo không gửi lại yêu cầu khi đang xử lý
    const flowData = {
      currentPassword: watch("oldPassword"),
      newPassword: watch("newPassword"),
      confirmPassword: watch("confirmNewPassword"),
      OtpCode: data.otp,
    };
    setOtpValue(data.otp); // Store OTP value in state
    try {
      console.log("📨 Đang gửi OTP đợt 2:", data.otp);
      await handlePasswordChangeFlow(flowData); // API gọi ở đây
      setOtpResult("success");
      setOtpMessage("Đã thay đổi mật khẩu thành công!");
    } catch (err) {
      setOtpResult("error");
      setOtpMessage("OTP không hợp lệ hoặc đã hết hạn.");
    }
  };

  // Reset form and flow
  const handleReset = () => {
    resetFlow();
    setIsOtpPopupOpen(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg  space-y-6 ">
      <h2 className="text-2xl font-bold text-center">Đổi Mật Khẩu</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Password Fields (shown in step 1) */}
        <PasswordField
          id="oldPassword"
          label="Mật khẩu cũ"
          placeholder="Nhập mật khẩu cũ của bạn"
          name="oldPassword"
          register={register}
          rules={{
            required: "Mật khẩu không được để trống",
            minLength: {
              value: 6,
              message: "Mật khẩu ít nhất 6 ký tự",
            },
          }}
          errors={errors}
        />
        <PasswordField
          id="newPassword"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới của bạn"
          name="newPassword"
          register={register}
          rules={{
            required: "Mật khẩu không được để trống",
            minLength: {
              value: 6,
              message: "Mật khẩu ít nhất 6 ký tự",
            },
          }}
          errors={errors}
        />
        <PasswordField
          id="confirmNewPassword"
          label="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới của bạn"
          name="confirmNewPassword"
          register={register}
          rules={{
            required: "Vui lòng nhập lại mật khẩu",
            validate: (value) =>
              value === newPassword || "Mật khẩu nhập lại không khớp",
          }}
          errors={errors}
        />

        {/* Error and Success Messages */}
        {message && <p className="text-sm text-green-600">{message}</p>}

        {/* Submit Button */}
        <SubmitButton>
          {isLoading
            ? "Đang xử lý..."
            : currentStep === 1
            ? "Thay đổi mật khẩu"
            : currentStep === 3
            ? "Xác thực OTP"
            : "Đổi mật khẩu"}
        </SubmitButton>

        {/* Reset Button (shown after success) */}
      </form>

      {/* OTP Popup */}
      <OtpPopup
        isOpen={isOtpPopupOpen}
        onClose={() => setIsOtpPopupOpen(false)}
        onSubmit={handleOtpSubmit}
        isLoading={isLoading}
        otpResult={otpResult}
        otpMessage={otpMessage}
        title="Xác minh thay đổi mật khẩu"
        placeholder="Nhập OTP bạn vừa nhận"
      />
    </div>
  );
};
