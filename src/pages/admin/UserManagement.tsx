
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserRole, Department } from '@/types/auth';
import { CreateUserDialog } from '@/components/admin/CreateUserDialog';

const UserManagement: React.FC = () => {
  const { allUsers, updateUserRole, updateUserDepartment } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setIsUpdating(true);
    try {
      await updateUserRole(userId, newRole);
    } catch (error) {
      console.error('Failed to update role:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDepartmentChange = async (userId: string, newDepartment: Department) => {
    setIsUpdating(true);
    try {
      await updateUserDepartment(userId, newDepartment);
    } catch (error) {
      console.error('Failed to update department:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user roles and permissions</CardDescription>
          </div>
          <CreateUserDialog />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select 
                      value={user.role} 
                      onValueChange={(value) => handleRoleChange(user.id, value as UserRole)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={user.department} 
                      onValueChange={(value) => handleDepartmentChange(user.id, value as Department)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="customer-support">Customer Support</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
