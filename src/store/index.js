import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import productReducer from './productSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    products: productReducer,
    settings: settingsReducer,
  },
});
