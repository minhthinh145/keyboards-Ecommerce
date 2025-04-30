import { useCallback } from "react";

export const useFormValidation = (formData, editingFields, setErrors) => {
  const validateField = useCallback((field, value) => {
    switch (field) {
      case "userName":
        if (!value.trim()) return "Tên người dùng không được để trống";
        return "";
      case "email":
        if (!value.includes("@") || !value.includes("."))
          return "Email không hợp lệ";
        return "";
      case "phone":
        if (!/^\d{10}$/.test(value)) return "Số điện thoại phải có 10 chữ số";
        return "";
      case "birthDate":
        if (!value) return "Ngày sinh không được để trống";
        const today = new Date();
        const dob = new Date(value);
        if (dob > today) return "Ngày sinh không hợp lệ";
        return "";
      case "address":
        if (!value.trim()) return "Địa chỉ không được để trống";
        return "";
      default:
        return "";
    }
  }, []);

  const validateAll = useCallback(
    (fields) => {
      const validationErrors = {};
      Object.keys(fields).forEach((field) => {
        const error = validateField(field, fields[field]);
        if (error) validationErrors[field] = error;
      });
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    },
    [validateField, setErrors]
  );

  // Cập nhật lỗi khi nhập hoặc tắt chỉnh sửa
  const updateErrors = useCallback(
    (field) => {
      const error = validateField(field, formData[field]);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [formData, validateField]
  );

  return { validateField, validateAll, updateErrors };
};
