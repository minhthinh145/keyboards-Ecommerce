import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart } from '@/api/Cart/getCart';
import { addToCart as addToCartApi } from '@/api/Cart/AddtoCart';
import { removeFromCart as removeFromCartApi } from '@/api/Cart/removeCart';

//async thunk get cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.accessToken) {
        throw new Error('Bạn chưa đăng nhập');
      }
      const data = await getCart(auth.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Lỗi khi lấy giỏ hàng');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      if (!auth.accessToken) {
        throw new Error('Bạn chưa đăng nhập');
      }
      const data = await addToCartApi(auth.accessToken, productId, quantity);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Lỗi khi thêm sản phẩm vào giỏ hàng'
      );
    }
  }
);

  export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId, { getState, rejectWithValue }) => {
      try {
        const { auth } = getState();
        if (!auth.accessToken) {
          throw new Error('Bạn chưa đăng nhập');
        }
        await removeFromCartApi(auth.accessToken, productId);
        return productId;
      } catch (error) {
        return rejectWithValue(
          error.response?.data || 'Lỗi khi xóa sản phẩm khỏi giỏ hàng'
        );
      }
    }
  );

const initialState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        if (!state.items || state.items.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.totalPrice = action.payload.totalPrice || 0;
        state.totalItems = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Lỗi khi lấy giỏ hàng';
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const cartData = action.payload.data || action.payload;
        state.items = cartData.items || [];
        state.totalPrice = cartData.totalPrice || 0;
        state.totalItems = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload || 'Lỗi khi thêm vào giỏ hàng';
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (action.payload.data && action.payload.data.items) {
          const cartData = action.payload.data;
          state.items = cartData.items || [];
          state.totalPrice = cartData.totalPrice || 0;
          state.totalItems = state.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
        } else {
          state.items = state.items.filter(
            (item) => item.productId !== action.payload
          );
          state.totalItems = state.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          state.totalPrice = state.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload || 'Lỗi khi xóa khỏi giỏ hàng';
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
