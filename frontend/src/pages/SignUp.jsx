import React from "react";
import { HiLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ConfirmPasswordInput } from "../components/form/ConfirmPasswordInput";
import { FingerprintLogin } from "../components/form/FingerprintLogin";
import { SubmitButton } from "../components/form/SubmitButton";
import { EmailSignUp } from "../components/form/EmailSignUp";
import { UsernameInput } from "../components/form/UsernameInput";
import { Sidebar } from "../components/form/AuthSideBar";
import { useUserSignUp } from "../hooks/userSignUp";
import { useForm } from "react-hook-form";
import { PhoneNumberInput } from "../components/form/PhoneNumberInput";
export const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { signUpUser, loading, error } = useUserSignUp();

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data); // Log thse form data
    try {
      await signUpUser(data); // Removed `res` since it's not used
      console.log("Đăng ký thành công");
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-16 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Left Side: Image and Text */}
        <Sidebar
          title="Chào mừng đến với TShop"
          description="Nơi bạn có thể tìm thấy mọi thứ bạn cần"
        />
        {/* Right Side: Form */}
        <div className="p-12 flex flex-col">
          <div className="flex flex-col items-center mb-8">
            <HiLockClosed className="h-12 w-12 text-indigo-800 mb-4 bg-indigo-200 rounded-full p-2" />
            <h2 className="text-2xl font-bold mb-2">Đăng ký</h2>
            <p>Nhập đầy đủ thông tin ở dưới để tạo tài khoản</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <UsernameInput register={register} errors={errors} />
            <EmailSignUp register={register} errors={errors} />
            <PhoneNumberInput register={register} errors={errors} />
            <ConfirmPasswordInput
              register={register}
              errors={errors}
              watch={watch}
            />
            <SubmitButton disabled={loading}>
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </SubmitButton>
            {error && (
              <p className="text-red-500 mt-2">{error.message || error}</p>
            )}

            <FingerprintLogin />
            <div className="text-center mt-6 flex items-center justify-center">
              <p className="text-sm text-gray-600">Bạn đã có tài khoản?</p>
              <Link
                to="/signin"
                className="ml-1 text-indigo-600 text-sm hover:text-indigo-800 font-semibold hover-scale"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
