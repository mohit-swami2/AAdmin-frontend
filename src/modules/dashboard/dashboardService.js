import api from '@/services/api';
import { unwrapApiResponse } from '@/utils/apiHelpers';

export const getDashboardOverview = async () => {
  const response = await api.get('/dashboard/overview');
  const { items } = unwrapApiResponse(response);
  return { data: items[0] };
};
