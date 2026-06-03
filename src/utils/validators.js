import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
});

export const profileEditSchema = yup.object({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  phone: yup.string().trim().nullable(),
  bio: yup
    .string()
    .trim()
    .max(300, 'Bio must be at most 300 characters')
    .nullable(),
  website: yup
    .string()
    .trim()
    .transform((value) => (value === '' ? undefined : value))
    .url('Enter a valid URL')
    .optional(),
  location: yup.string().trim().nullable(),
});

export const userFormSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  role: yup.string().required('Role is required'),
  status: yup.string().required('Status is required'),
});

export const productFormSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Product name must be at least 2 characters')
    .required('Product name is required'),
  sku: yup.string().trim().required('SKU is required'),
  category: yup.string().required('Category is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .min(0, 'Price cannot be negative')
    .required('Price is required'),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  status: yup.string().required('Status is required'),
  description: yup.string().trim().nullable(),
});
