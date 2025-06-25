// hooks/UserLogin.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slice/authSlice';
import { useToast } from '../contexts/ToastContext.jsx';

export const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        const accessToken = resultAction.payload.accessToken;
        dispatch(fetchProfile(accessToken)); // Lấy thông tin người dùng sau khi đăng nhập
        showToast('Đăng nhập thành công', 'success');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate('/');
      } else {
        showToast('Sai email hoặc mật khẩu', 'error');
      }
    } catch (err) {
      showToast('Sai email hoặc mật khẩu', 'error');
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    loading,
    error,
  };
};
