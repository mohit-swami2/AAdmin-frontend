export const AUTH = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  PROFILE: '/auth/profile',
};

export const USERS = {
  BASE: '/users',
  BY_ID: (id) => `/users/${id}`,
};

export const PRODUCTS = {
  BASE: '/products',
  BY_ID: (id) => `/products/${id}`,
};
