export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  AUTH_CALLBACK: '/auth/callback',
  DASHBOARD: '/',
  PROFILE: '/profile',
  USERS: '/users',
  PRODUCTS: '/products',
  SETTINGS: '/settings',
};

export const ADMIN_USER = {
  id: 1,
  name: 'AAdmin',
  firstName: 'AAdmin',
  lastName: '',
  email: 'aadmin@mailinator.com',
  role: 'Admin',
  avatar: null,
  phone: '+1 234 567 8900',
  location: 'New York, USA',
  bio: 'System administrator for AAdmin.',
  website: 'https://aadmin.com',
};

export const USER_ROLES = ['Admin', 'Editor', 'User'];
export const USER_STATUSES = ['Active', 'Inactive', 'Pending'];

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Food',
  'Books',
  'Sports',
  'Other',
];

export const PRODUCT_STATUSES = ['Active', 'Draft', 'Out of Stock'];

export const ITEMS_PER_PAGE = 10;
