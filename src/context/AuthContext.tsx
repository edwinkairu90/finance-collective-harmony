
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Department, Permission, ROLE_PERMISSIONS } from '@/types/auth';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole, department: Department) => Promise<void>;
  hasPermission: (permission: Permission) => boolean;
  isInDepartment: (department: Department) => boolean;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<void>;
  updateUserDepartment: (userId: string, newDepartment: Department) => Promise<void>;
  allUsers: User[];
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    department: 'finance',
    permissions: ROLE_PERMISSIONS['admin']
  },
  {
    id: '2',
    name: 'Sales Manager',
    email: 'sales.manager@example.com',
    role: 'manager',
    department: 'sales',
    permissions: ROLE_PERMISSIONS['manager']
  },
  {
    id: '3',
    name: 'Marketing User',
    email: 'marketing@example.com',
    role: 'user',
    department: 'marketing',
    permissions: ROLE_PERMISSIONS['user']
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const { toast } = useToast();

  // Check for saved auth state on load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo purposes, just check if the email exists in mock users
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser) {
        // In a real app, you would verify the password here
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const register = async (name: string, email: string, password: string, role: UserRole, department: Department) => {
    setIsLoading(true);
    try {
      // Check if email is already in use
      if (users.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }

      // Create new user
      const newUser: User = {
        id: `${users.length + 1}`,
        name,
        email,
        role,
        department,
        permissions: ROLE_PERMISSIONS[role]
      };

      // Update users list
      setUsers(prev => [...prev, newUser]);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const isInDepartment = (department: Department): boolean => {
    if (!user) return false;
    return user.department === department || hasPermission('view:all');
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    // Check if current user has permission to manage users
    if (!hasPermission('manage:users')) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to manage users",
        variant: "destructive",
      });
      throw new Error("Permission denied");
    }

    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          role: newRole,
          permissions: ROLE_PERMISSIONS[newRole]
        };
      }
      return u;
    }));

    toast({
      title: "User updated",
      description: `User role has been updated to ${newRole}`,
    });
  };

  const updateUserDepartment = async (userId: string, newDepartment: Department) => {
    // Check if current user has permission to manage users
    if (!hasPermission('manage:users')) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to manage users",
        variant: "destructive",
      });
      throw new Error("Permission denied");
    }

    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          department: newDepartment
        };
      }
      return u;
    }));

    toast({
      title: "User updated",
      description: `User department has been updated to ${newDepartment}`,
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    hasPermission,
    isInDepartment,
    updateUserRole,
    updateUserDepartment,
    allUsers: users
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
