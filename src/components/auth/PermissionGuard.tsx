
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Permission } from '@/types/auth';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermission: Permission;
  redirectTo?: string;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requiredPermission,
  redirectTo = '/'
}) => {
  const { hasPermission, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(requiredPermission)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
