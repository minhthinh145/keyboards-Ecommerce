import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth/login.js";
export const UseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      alert("Đăng nhập thành công");
      navigate("/"); // hoặc điều hướng đến trang dashboard
    } catch (err) {
      alert(err.message || "Đăng nhập thất bại");
    }
  };
  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
  };
};
