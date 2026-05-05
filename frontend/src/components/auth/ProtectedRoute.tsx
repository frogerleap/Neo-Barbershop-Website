import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * ProtectedRoute — wraps any component to guard access.
 *
 * Usage:
 *   <ProtectedRoute allowedRoles={['admin']}>
 *     <AdminDashboard />
 *   </ProtectedRoute>
 *
 * - If not authenticated → redirect to /login (with `from` state for post-login redirect)
 * - If authenticated but wrong role → redirect to role-specific dashboard
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo,
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Not authenticated → go to login
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to={redirectTo || '/login'}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Role check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const fallback =
      user.role === 'admin'   ? '/admin'   :
      user.role === 'barber'  ? '/barber'  :
      '/profile';
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
