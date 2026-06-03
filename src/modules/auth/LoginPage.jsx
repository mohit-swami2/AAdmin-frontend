/**
 * LoginPage — AAdmin portal sign-in (split-screen layout).
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { AuthLayout } from '@/components/layout';
import { loginUser } from '@/modules/auth/authService';
import { loginStart, loginSuccess, loginFailure } from '@/store/authSlice';
import { loginSchema } from '@/utils/validators';
import { ROUTES } from '@/utils/constants';
import styles from './auth.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: 'aadmin@mailinator.com', password: 'aadmin@12345' },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    dispatch(loginStart());
    try {
      const response = await loginUser(data);
      dispatch(loginSuccess(response.data));
      toast.success(`Welcome back, ${response.data.user.name}!`);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      dispatch(loginFailure(message));
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <header className={styles.portalHeader}>
        <h2 className={styles.portalTitle}>Admin Portal</h2>
        <p className={styles.portalSubtitle}>Secure Access</p>
      </header>

      <div className={styles.loginCard}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="aadmin@mailinator.com"
              autoComplete="email"
              className={`${styles.fieldInput} ${errors.email ? styles.fieldInputError : ''}`}
              {...register('email')}
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="password">
              Password
            </label>
            <div className={styles.passwordField}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                autoComplete="current-password"
                className={`${styles.fieldInput} ${errors.password ? styles.fieldInputError : ''}`}
                {...register('password')}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
            {errors.password && (
              <span className={styles.fieldError}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.forgotRow}>
            <Link to={ROUTES.FORGOT_PASSWORD} className={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
