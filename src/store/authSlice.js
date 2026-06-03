import { createSlice } from '@reduxjs/toolkit';
import { ADMIN_USER } from '@/utils/constants';

const AUTH_STORAGE_KEY = 'aadmin_auth';

const LEGACY_NAMES = new Set(['Admin', 'Corona', 'CORONA', 'Corona Admin']);

const normalizeStoredUser = (user) => {
  if (!user) return user;
  const updates = {};
  if (LEGACY_NAMES.has(user.name)) updates.name = ADMIN_USER.name;
  if (LEGACY_NAMES.has(user.firstName)) updates.firstName = ADMIN_USER.firstName;
  if (LEGACY_NAMES.has(user.lastName)) updates.lastName = ADMIN_USER.lastName;
  return Object.keys(updates).length ? { ...user, ...updates } : user;
};

const loadAuthFromStorage = () => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.user) {
        parsed.user = normalizeStoredUser(parsed.user);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  return { user: null, token: null };
};

const initialState = {
  ...loadAuthFromStorage(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ user: state.user, token: state.token })
      );
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isLoading = false;
      localStorage.removeItem(AUTH_STORAGE_KEY);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ user: state.user, token: state.token })
      );
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser, clearError } =
  authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);

export { ADMIN_USER };
