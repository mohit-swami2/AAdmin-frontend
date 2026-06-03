import api from '@/services/api';
import { unwrapApiResponse } from '@/utils/apiHelpers';

export const getGlobalSettings = async () => {
  const response = await api.get('/settings');
  const { items } = unwrapApiResponse(response);
  return items[0] ?? null;
};

export const saveGlobalSettings = async (settings) => {
  const response = await api.put('/settings', settings);
  const { items } = unwrapApiResponse(response);
  return items[0];
};
