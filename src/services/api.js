import axios from 'axios';
import { toast } from 'react-toastify';
import { store } from '@/store';
import { logout } from '@/store/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const PUBLIC_AUTH_PATHS = ['/auth/login', '/auth/forgot-password', '/auth/reset-password'];

const isPublicAuthRequest = (config) => {
  const url = config?.url || '';
  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path));
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isLoginAttempt = isPublicAuthRequest(error.config);

    if (status === 401 && !isLoginAttempt) {
      store.dispatch(logout());
      toast.error('Session expired. Please login again.');
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default api;
