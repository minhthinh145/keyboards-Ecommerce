import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { getProfile } from "../api/auth/profile.js";

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken, getValidToken, logout } = useContext(AuthContext);

  useEffect(() => {
    const loadProfile = async () => {
      console.log("Starting loadProfile...");
      console.log("Access Token:", accessToken);

      try {
        console.log("Getting valid token...");
        const validToken = await getValidToken();
        if (!validToken) {
          console.log("No valid token, logging out...");
          await logout();
          setError("Phiên đăng nhập hết hạn");
          return;
        }

        const data = await getProfile(validToken);
        console.log("Profile fetched successfully:", data);
        setUser(data);
      } catch (err) {
        console.error("Error in loadProfile:", err);
        setError(err.message || "Lỗi máy chủ, không thể lấy dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [accessToken, getValidToken, logout]);

  return { user, loading, error };
};

export default useUserProfile;
