import { useState } from "react";
import { signup } from "../api/auth/singup.js";
import { useNavigate } from "react-router-dom";

export const useUserSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signUpUser = async ({
    username,
    email,
    phoneNumber,
    dateOfBirth,
    password,
    confirmpassword,
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await signup(
        username,
        email,
        phoneNumber,
        dateOfBirth,
        password,
        confirmpassword
      );
      if (response) {
        navigate("/signin");
      }
    } catch (err) {
      setError(err.message || "Đăng ký thất bại");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    signUpUser, // Export the function as signUpUser
    loading,
    error,
  };
};
