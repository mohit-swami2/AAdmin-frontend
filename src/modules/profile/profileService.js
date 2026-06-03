import api from '@/services/api';
import { unwrapApiResponse } from '@/utils/apiHelpers';

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  const { items } = unwrapApiResponse(response);
  return { data: items[0] };
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData);
  const { items } = unwrapApiResponse(response);
  return { data: items[0] };
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await api.post('/auth/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const { items } = unwrapApiResponse(response);
  return { data: items[0] };
};
