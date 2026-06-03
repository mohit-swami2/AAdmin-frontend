import api from '@/services/api';
import { unwrapApiResponse } from '@/utils/apiHelpers';

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  const { items } = unwrapApiResponse(response);
  const auth = items[0];
  return { data: auth };
};

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  const { message } = unwrapApiResponse(response);
  return { data: { message } };
};

export const resetPassword = async (data) => {
  const response = await api.post('/auth/reset-password', data);
  const { message } = unwrapApiResponse(response);
  return { data: { message } };
};
