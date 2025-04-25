// contexts/Authcontext.jsx
import { createContext, useState, useEffect } from "react";
import { refreshToken as refreshTokenApi } from "../api/auth/refreshToken.js";
import { logout as logoutApi } from "../api/auth/logout.js";
import { jwtDecode } from "jwt-decode";
import { getProfile } from "../api/auth/profile.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Khôi phục trạng thái từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    console.log("Restoring from localStorage:", {
      storedUser,
      storedAccessToken,
      storedRefreshToken,
    });

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);

      if (!storedUser) {  
        console.log("No stored user. Loading from API...");
        loadUserProfile(storedAccessToken);
      } else {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = async (username, accessToken, refreshToken) => {
    setUser({ username });
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    await loadUserProfile(accessToken);
  };

  const logout = async () => {
    if (refreshToken) {
      try {
        await logoutApi(refreshToken); // Gọi API để thu hồi refreshToken
      } catch (err) {
        console.error("Error during logout:", err);
      }
    }

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const loadUserProfile = async (token) => {
    try {
      const profile = await getProfile(token);
      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (err) {
      console.error("Error loading user profile:", err);
      await logout();
    }
  };
  // Hàm kiểm tra và làm mới token
  const getValidToken = async () => {
    if (!accessToken || !refreshToken) return null;

    try {
      const decoded = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      // Nếu token còn hạn, trả về token hiện tại
      if (decoded.exp > currentTime) {
        return accessToken;
      }

      // Nếu token hết hạn, làm mới bằng refreshToken
      const newAccessToken = await refreshTokenApi(refreshToken);
      setAccessToken(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
      await loadUserProfile(newAccessToken);
      return newAccessToken;
    } catch (err) {
      console.error("Error refreshing token:", err);
      await logout(); // Nếu không làm mới được, đăng xuất
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        getValidToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
