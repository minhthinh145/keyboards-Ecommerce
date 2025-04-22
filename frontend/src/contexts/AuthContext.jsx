import React, { createContext, useEffect, useState } from "react";

// Tạo context để cung cấp thông tin đăng nhập cho toàn bộ ứng dụng
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Dùng useEffect để lấy thông tin người dùng từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");

    if (storedUsername && storedToken) {
      setUser({ username: storedUsername, token: storedToken });
    }
  }, []);

  // Hàm đăng nhập: lưu thông tin vào localStorage và cập nhật state user
  const login = (username, token) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    setUser({ username, token });
    console.log("User logged in:", { username, token });
  };

  // Hàm đăng xuất: xóa thông tin từ localStorage và cập nhật state user
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
