// hooks/UserLogin.js
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
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
      const { accessToken, refreshToken } = await loginApi(email, password);
      const decoded = jwtDecode(accessToken);
      login(decoded.Username, accessToken, refreshToken);

      showToast("Đăng nhập thành công", "success");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/");
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
