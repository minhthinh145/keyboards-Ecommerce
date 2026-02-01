import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice.js';
import cartReducer from './slice/cartSlice.js';
import orderReducer from './slice/orderSlice.js'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer, 
  },
});
