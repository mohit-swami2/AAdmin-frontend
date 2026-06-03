import api from '@/services/api';
import { mapListResponse, unwrapApiResponse } from '@/utils/apiHelpers';

export const getUsers = async (params = {}) => {
  const response = await api.get('/users', { params });
  return { data: mapListResponse(response) };
};

export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  const { items } = unwrapApiResponse(response);
  return { data: items[0] };
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  const { items } = unwrapApiResponse(response);
  return { data: items[0] };
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  const { message } = unwrapApiResponse(response);
  return { data: { message } };
};
