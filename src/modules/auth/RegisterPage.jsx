/**
 * RegisterPage — new user registration form with validation.
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { RiMailLine, RiLockLine, RiUserLine } from 'react-icons/ri';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout';
import { Button, Input } from '@/components/ui';
import { registerUser, getSocialLoginUrl } from '@/modules/auth/authService';
import { registerSchema } from '@/utils/validators';
import { ROUTES } from '@/utils/constants';
import styles from './auth.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = data;
      await registerUser(payload);
      toast.success('Registration successful! Please login.');
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      footerText="Already have an account?"
      footerLink={ROUTES.LOGIN}
      footerLinkText="Sign In"
    >
      <h2 className={styles.heading}>Create Account</h2>
      <p className={styles.subheading}>Register for AAdmin access</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="Full Name"
          placeholder="Enter your name"
          icon={<RiUserLine />}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={<RiMailLine />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          icon={<RiLockLine />}
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          icon={<RiLockLine />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" loading={loading} className={styles.submitBtn}>
          Register
        </Button>
      </form>

      <div className={styles.divider}>
        <span>OR</span>
      </div>

      <div className={styles.socialBtns}>
        <button
          type="button"
          className={styles.socialBtn}
          onClick={() => { window.location.href = getSocialLoginUrl('google'); }}
        >
          <FaGoogle /> Google
        </button>
        <button
          type="button"
          className={styles.socialBtn}
          onClick={() => { window.location.href = getSocialLoginUrl('github'); }}
        >
          <FaGithub /> GitHub
        </button>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
