
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { BudgetRequestData } from "@/types/collaboration";

interface AddDepartmentDialogProps {
  onDepartmentAdded: (department: BudgetRequestData) => void;
}

export const AddDepartmentDialog: React.FC<AddDepartmentDialogProps> = ({ onDepartmentAdded }) => {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!departmentName.trim() || !totalAmount || isNaN(Number(totalAmount))) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid department name and budget amount.",
        variant: "destructive",
      });
      return;
    }

    // Create a new department with default values
    const newDepartment: BudgetRequestData = {
      id: `dept-${Date.now()}`,
      department: departmentName,
      totalAmount: Number(totalAmount),
      period: "Q3 2025",
      assignedTo: {
        name: "Unassigned",
        avatar: "UA"
      },
      status: "not-started",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      lineItems: []
    };

    onDepartmentAdded(newDepartment);
    
    toast({
      title: "Department Added",
      description: `${departmentName} has been added to budget requests.`,
    });
    
    // Reset form and close dialog
    setDepartmentName("");
    setTotalAmount("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <Plus size={16} />
          Add Department
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Department</DialogTitle>
          <DialogDescription>
            Create a new department for budget collaboration.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Department
              </Label>
              <Input
                id="name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Budget Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="col-span-3"
                required
                min="0"
                step="1000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Department</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
