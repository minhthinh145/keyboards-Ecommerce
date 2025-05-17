import { useState, useCallback, useEffect } from "react";

export const useFormState = (initialData) => {
  const [formData, setFormData] = useState({
    userName: initialData?.userName || "",
    email: initialData?.email || "",  
    phone: initialData?.phone || "",
    birthDate: initialData?.birthDate || "",
    address: initialData?.address || "",
  });
  const [originalData, setOriginalData] = useState(formData);
  const [editingFields, setEditingFields] = useState({
    userName: false,
    email: false,
    phone: false,
    birthDate: false,
    address: false,
  });
  const [errors, setErrors] = useState({});

  // Đồng bộ originalData khi initialData thay đổi
  useEffect(() => {
    const newFormData = {
      userName: initialData?.userName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      birthDate: initialData?.birthDate || "",
      address: initialData?.address || "",
    };
    setFormData(newFormData);
    setOriginalData(newFormData);
  }, [initialData]);

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const toggleEditField = useCallback((field) => {
    setEditingFields((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  return {
    formData,
    setFormData,
    originalData,
    setOriginalData,
    editingFields,
    setEditingFields,
    errors,
    setErrors,
    handleInputChange,
    toggleEditField,
  };
};
