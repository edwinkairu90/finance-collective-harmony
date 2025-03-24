
export type UserRole = 'admin' | 'manager' | 'user';

export type Department = 'sales' | 'marketing' | 'engineering' | 'customer-support' | 'finance' | 'hr';

export type Permission = 
  | 'view:all'
  | 'edit:all'
  | 'view:department'
  | 'edit:department'
  | 'manage:users'
  | 'approve:budgets'
  | 'create:costcenters';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  department: Department;
  permissions: Permission[];
}

// Map of roles to their default permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: ['view:all', 'edit:all', 'manage:users', 'approve:budgets', 'create:costcenters'],
  manager: ['view:department', 'edit:department', 'approve:budgets'],
  user: ['view:department']
};

// Helper function to check if a user has a specific permission
export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false;
  return user.permissions.includes(permission);
}

// Helper function to check if a user belongs to a specific department
export function isInDepartment(user: User | null, department: Department): boolean {
  if (!user) return false;
  return user.department === department || hasPermission(user, 'view:all');
}
