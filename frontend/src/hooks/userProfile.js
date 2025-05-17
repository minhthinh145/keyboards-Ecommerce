import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { getProfile } from '../api/auth/profile.js';

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken, getValidToken, logout } = useContext(AuthContext);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        console.log('Getting valid token...');
        const validToken = await getValidToken();
        console.log('Valid token:', validToken);
        if (!validToken) {
          await logout();
          setError('Phiên đăng nhập hết hạn');
          return;
        }

        const data = await getProfile(validToken);
        setUser(data);
      } catch (err) {
        setError(err.message || 'Lỗi máy chủ, không thể lấy dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [accessToken, getValidToken, logout]);

  return { user, loading, error };
};

export default useUserProfile;
