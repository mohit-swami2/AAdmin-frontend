/**
 * ForgotPasswordPage — send password reset link to email.
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { AuthLayout } from '@/components/layout';
import { forgotPassword } from '@/modules/auth/authService';
import { forgotPasswordSchema } from '@/utils/validators';
import { ROUTES } from '@/utils/constants';
import { Link } from 'react-router-dom';
import styles from './auth.module.css';

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await forgotPassword(data.email);
      setSent(true);
      toast.success('Reset link sent to your email!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      footerText="Remember your password?"
      footerLink={ROUTES.LOGIN}
      footerLinkText="Sign In"
    >
      <header className={styles.portalHeader}>
        <h2 className={styles.portalTitle}>Admin Portal</h2>
        <p className={styles.portalSubtitle}>Password Recovery</p>
      </header>

      <div className={styles.loginCard}>
        <p className={styles.subheading}>
          {sent
            ? 'Check your email for the reset link.'
            : 'Enter your email to receive a reset link.'}
        </p>

        {!sent && (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className={`${styles.fieldInput} ${errors.email ? styles.fieldInputError : ''}`}
                {...register('email')}
              />
              {errors.email && (
                <span className={styles.fieldError}>{errors.email.message}</span>
              )}
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
