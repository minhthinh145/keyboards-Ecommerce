// hooks/useUserProfile.js
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

      if (!accessToken) {
        console.log("No accessToken, user not logged in");
        setError("Chưa đăng nhập");
        setLoading(false);
        return;
      }

      try {
        console.log("Getting valid token...");
        const validToken = await getValidToken();
        if (!validToken) {
          console.log("No valid token, logging out...");
          setError("Phiên đăng nhập hết hạn");
          await logout();
          return;
        }

        console.log("Fetching profile with token:", validToken);
        const data = await getProfile(validToken);
        console.log("Profile fetched successfully:", data);
        setUser(data);
      } catch (err) {
        console.error("Error in loadProfile:", err);
        setError(err.message || "Lấy thông tin người dùng thất bại");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [accessToken, getValidToken, logout]);

  return { user, loading, error };
};

export default useUserProfile;
