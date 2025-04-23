import { useState, useEffect } from "react";
import { getProfile } from "../api/auth/profile.js";

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        setError(err.message || "Lấy thông tin người dùng thất bại");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  return { user, loading, error };
};

export default useUserProfile;
