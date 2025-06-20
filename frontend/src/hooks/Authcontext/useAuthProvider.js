import { useState, useEffect } from 'react';
import { login as loginApi } from '../../api/auth/login';
import { logout as logoutApi } from '../../api/auth/logout';
import { refreshToken as refreshTokenApi } from '../../api/auth/refreshToken';
import { getProfile } from '../../api/auth/profile';
import { jwtDecode } from 'jwt-decode';

export default function useAuthProvider() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);

      if (!storedUser) {
        loadUserProfile(storedAccessToken);
      } else {
        setUser(JSON.parse(storedUser));
      }
    }
    setIsInitialized(true);
    // eslint-disable-next-line
  }, []);

  const login = async (username, password) => {
    const { accessToken, refreshToken } = await loginApi(username, password);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    await loadUserProfile(accessToken);
  };

  const logout = async () => {
    if (refreshToken) {
      try {
        await logoutApi(refreshToken);
      } catch (err) {
        // Có thể log lỗi nếu cần
      }
    }
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  };

  const loadUserProfile = async (token) => {
    try {
      const profile = await getProfile(token);
      setUser(profile);
      localStorage.setItem('user', JSON.stringify(profile));
    } catch (err) {
      await logout();
    }
  };

  const getValidToken = async () => {
    if (!accessToken || !refreshToken) return null;
    try {
      const decoded = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) return accessToken;

      const newAccessToken = await refreshTokenApi(refreshToken);
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
      await loadUserProfile(newAccessToken);
      return newAccessToken;
    } catch (err) {
      await logout();
      return null;
    }
  };

  return {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    getValidToken,
    setUser,
    isInitialized,
  };
}
