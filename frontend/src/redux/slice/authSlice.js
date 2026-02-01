import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi } from '../../api/auth/login.js';
import { getProfile } from '@/api/auth/profile.js';
import { fetchCart } from './cartSlice.js';

//async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { accessToken, refreshToken } = await loginApi(email, password);
      const user = await getProfile(accessToken);
      //duy trì đăng nhập
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(fetchCart());
      return { accessToken, refreshToken, user };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk lấy profile
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (accessToken, { rejectWithValue }) => {
    try {
      const user = await getProfile(accessToken);
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Lỗi lấy profile');
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, 
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        //fetchcart
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || 'Lỗi lấy profile';
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
