import { PasswordField } from "./PasswordComponent/PasswordField";

export const ConfirmPasswordInput = ({ register, errors, watch }) => {
  const password = watch("password");

  return (
    <div className="space-y-6">
      {/* Mật khẩu */}
      <PasswordField
        id="password"
        label="Mật khẩu"
        name="password"
        register={register}
        errors={errors}
        placeholder="Nhập mật khẩu của bạn"
        value={password}
        onChange={(e) => register("password")(e.target.value)}
        rules={{
          required: "Mật khẩu không được để trống",
          minLength: {
            value: 6,
            message: "Mật khẩu ít nhất 6 ký tự",
          },
        }}
      />
      
      {/* Nhập lại mật khẩu */}
      <PasswordField
        id="confirmPassword"
        label="Nhập lại mật khẩu"
        name="confirmPassword"
        register={register}
        errors={errors}
        placeholder="Nhập lại mật khẩu của bạn"
        value={watch("confirmpassword")}
        onChange={(e) => register("confirmpassword")(e.target.value)}
        rules={{
          required: "Vui lòng nhập lại mật khẩu",
          validate: (value) =>
            value === password || "Mật khẩu nhập lại không khớp",
        }}
      />

      {/* Hiển thị lỗi nếu mật khẩu nhập lại không khớp */}
      {errors.confirmpassword && (
        <p className="text-red-500 mt-1">{errors.confirmpassword.message}</p>
      )}
    </div>
  );
};
