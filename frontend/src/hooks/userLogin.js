import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Authcontext.jsx";
import { jwtDecode } from "jwt-decode";
import { login as loginApi } from "../api/auth/login.js";
import { useToast } from "../contexts/ToastContext.jsx";
export const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginApi(email, password);
      const decode = jwtDecode(token);
      login(decode.Username, token);

      showToast("Đăng nhập thành công", "success"); //bật toast
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //bật toast
      navigate("/"); // hoặc điều hướng đến trang dashboard
    } catch (err) {
      showToast("Sai email hoặc mật khẩu", "error");
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
