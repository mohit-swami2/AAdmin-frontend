/**
 * OAuthCallbackPage — handles redirect from Google/GitHub OAuth with token in query.
 */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginSuccess } from '@/store/authSlice';
import { ROUTES } from '@/utils/constants';
import { Spinner } from '@/components/ui';
import styles from './auth.module.css';

const OAuthCallbackPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const payload = searchParams.get('payload');
    const error = searchParams.get('error');

    if (error) {
      toast.error(`Social login failed (${error})`);
      navigate(ROUTES.LOGIN);
      return;
    }

    if (!payload) {
      toast.error('Invalid OAuth callback');
      navigate(ROUTES.LOGIN);
      return;
    }

    try {
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
      const auth = JSON.parse(atob(padded));
      dispatch(loginSuccess({ user: auth.user, token: auth.token }));
      toast.success(`Welcome, ${user.name}!`);
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error('Could not complete social login');
      navigate(ROUTES.LOGIN);
    }
  }, [dispatch, navigate, searchParams]);

  return (
    <div className={styles.oauthLoading}>
      <Spinner size="lg" />
      <p>Completing sign in…</p>
    </div>
  );
};

export default OAuthCallbackPage;
