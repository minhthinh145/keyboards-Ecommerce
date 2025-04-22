import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Authcontext.jsx";
import { jwtDecode } from "jwt-decode";
import { login as loginApi } from "../api/auth/login.js";
export const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginApi(email, password);
      const decode = jwtDecode(token);
      login(decode.Username, token);

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
