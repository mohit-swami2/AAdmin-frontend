import api from '@/services/api';
import { unwrapApiResponse } from '@/utils/apiHelpers';

export const globalSearch = async (q, limit = 5) => {
  const response = await api.get('/search', { params: { q, limit } });
  const { items } = unwrapApiResponse(response);
  return items[0] ?? { users: [], products: [], meta: {} };
};
