import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectAuth, selectIsAuthenticated, selectUser } from '@/store/authSlice';
import { ROUTES } from '@/utils/constants';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  }, [dispatch, navigate]);

  return {
    user,
    token: auth.token,
    isLoading: auth.isLoading,
    error: auth.error,
    isAuthenticated,
    logout: handleLogout,
  };
};
