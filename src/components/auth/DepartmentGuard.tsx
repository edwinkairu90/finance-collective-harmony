
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Department } from '@/types/auth';

interface DepartmentGuardProps {
  children: React.ReactNode;
  department: Department;
  redirectTo?: string;
}

export const DepartmentGuard: React.FC<DepartmentGuardProps> = ({
  children,
  department,
  redirectTo = '/'
}) => {
  const { isInDepartment, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isInDepartment(department)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
