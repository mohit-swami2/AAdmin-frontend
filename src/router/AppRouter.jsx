import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '@/modules/auth/LoginPage';
import ForgotPasswordPage from '@/modules/auth/ForgotPasswordPage';
import DashboardPage from '@/modules/dashboard/DashboardPage';
import ProfilePage from '@/modules/profile/ProfilePage';
import UserListPage from '@/modules/users/UserListPage';
import ProductListPage from '@/modules/products/ProductListPage';
import GlobalSettingsPage from '@/modules/settings/GlobalSettingsPage';
import { ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';

const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return children;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            <AuthRedirect>
              <LoginPage />
            </AuthRedirect>
          }
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={
            <AuthRedirect>
              <ForgotPasswordPage />
            </AuthRedirect>
          }
        />
        <Route path={ROUTES.REGISTER} element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="/auth/callback" element={<Navigate to={ROUTES.LOGIN} replace />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.USERS} element={<UserListPage />} />
          <Route path={ROUTES.PRODUCTS} element={<ProductListPage />} />
          <Route path={ROUTES.SETTINGS} element={<GlobalSettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
