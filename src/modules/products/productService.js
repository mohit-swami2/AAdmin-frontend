import api from '@/services/api';
import { mapListResponse, unwrapApiResponse } from '@/utils/apiHelpers';

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return { data: mapListResponse(response) };
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  const { items } = unwrapApiResponse(response);
  return { data: items[0] };
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  const { items } = unwrapApiResponse(response);
  return { data: items[0] };
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  const { message } = unwrapApiResponse(response);
  return { data: { message } };
};

export const uploadProductImage = async (id, file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post(`/products/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const { items } = unwrapApiResponse(response);
  return { data: items[0] };
};
