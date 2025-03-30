
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BudgetRequestData } from "@/types/collaboration";

interface AssignUserDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  department: BudgetRequestData | null;
  onUserAssigned: (departmentId: string, userName: string, userAvatar: string) => void;
}

export const AssignUserDialog: React.FC<AssignUserDialogProps> = ({
  isOpen,
  setIsOpen,
  department,
  onUserAssigned,
}) => {
  const [selectedUser, setSelectedUser] = useState("");
  const { allUsers } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser || !department) {
      toast({
        title: "Error",
        description: "Please select a user to assign.",
        variant: "destructive",
      });
      return;
    }

    const user = allUsers.find(u => u.id === selectedUser);
    
    if (user) {
      onUserAssigned(
        department.id, 
        user.name,
        user.name.split(' ').map(n => n[0]).join('')
      );
      
      toast({
        title: "User Assigned",
        description: `${user.name} has been assigned to ${department.department}.`,
      });
      
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign User</DialogTitle>
          <DialogDescription>
            Assign a team member to {department?.department}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user" className="text-right">
                User
              </Label>
              <div className="col-span-3">
                <Select onValueChange={setSelectedUser} value={selectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {allUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.department})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Assign User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
