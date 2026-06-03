import { ROUTES } from '@/utils/constants';

/**
 * Static admin pages included in global search (client-side).
 */
export const GLOBAL_SEARCH_PAGES = [
  { id: 'dashboard', label: 'Dashboard', path: ROUTES.DASHBOARD, keywords: ['home', 'overview', 'stats'] },
  { id: 'users', label: 'User Management', path: ROUTES.USERS, keywords: ['users', 'accounts', 'team'] },
  { id: 'products', label: 'Product Management', path: ROUTES.PRODUCTS, keywords: ['products', 'catalog', 'inventory', 'sku'] },
  { id: 'settings', label: 'Global Settings', path: ROUTES.SETTINGS, keywords: ['settings', 'theme', 'font', 'accent'] },
  { id: 'profile', label: 'My Profile', path: ROUTES.PROFILE, keywords: ['profile', 'account', 'avatar'] },
];

export const filterPages = (query) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return GLOBAL_SEARCH_PAGES.filter(
    (page) =>
      page.label.toLowerCase().includes(q) ||
      page.keywords.some((kw) => kw.includes(q) || q.includes(kw))
  );
};
