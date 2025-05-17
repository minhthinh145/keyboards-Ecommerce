import { useState, useCallback } from "react";
import { updateUser } from "../api/auth/updateUser.js";

export const useFormSubmit = (
  formData,
  editingFields,
  validateAll,
  setOriginalData,
  setEditingFields,
  setErrors,
  originalData,
  setFormData
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      const updatedFields = {
        ...formData,
        birthDate: formData.birthDate
          ? new Date(formData.birthDate).toISOString()
          : null,
      };

      if (formData.id) {
        updatedFields.id = formData.id;
      }
      if (!validateAll(updatedFields)) {
        setIsSubmitting(false);
        return {
          success: false,
          message: "Vui lòng sửa các lỗi trước khi lưu!",
        };
      }

      try {
        const result = await updateUser(updatedFields);
        setOriginalData(formData);
        setEditingFields({
          userName: false,
          email: false,
          phone: false,
          birthDate: false,
          address: false,
        });
        setErrors({});
        setIsSubmitting(false);
        return { success: true, message: result.message };
      } catch (error) {
        setIsSubmitting(false);
        return { success: false, message: error.message };
      }
    },
    [
      formData,
      editingFields,
      validateAll,
      setOriginalData,
      setEditingFields,
      setErrors,
    ]
  );

  const handleCancel = useCallback(() => {
    setFormData(originalData);
    setEditingFields({
      userName: false,
      email: false,
      phone: false,
      birthDate: false,
      address: false,
    });
    setErrors({});
  }, [originalData, setFormData, setEditingFields, setErrors]);

  return { handleSubmit, handleCancel, isSubmitting };
};
