import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder as createOrderApi } from '@/api/Order/createOrder';
import { getOrder as getOrderApi } from '@/api/Order/getOrder';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const res = await createOrderApi(auth.accessToken);
      return res?.data || res;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Lỗi khi tạo đơn hàng');
    }
  }
);

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const res = await getOrderApi(auth.accessToken, orderId);
      console.log(res);
      const orderData = res?.data;
      if (!orderData) {
        return rejectWithValue('Không tìm thấy đơn hàng');
      }
      return orderData;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        'Lỗi khi lấy đơn hàng';

      return rejectWithValue(errorMessage);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null,
    orderHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Order
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;
