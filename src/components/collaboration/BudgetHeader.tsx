
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BudgetRequestData } from "../../types/collaboration";
import { Separator } from "@/components/ui/separator";

interface BudgetHeaderProps {
  selectedDepartment: BudgetRequestData | null;
}

export const BudgetHeader: React.FC<BudgetHeaderProps> = ({ selectedDepartment }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Assigned to</p>
          <div className="flex items-center gap-2 mt-1">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{selectedDepartment?.assignedTo.avatar}</AvatarFallback>
            </Avatar>
            <span>{selectedDepartment?.assignedTo.name}</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <Badge className={
            selectedDepartment?.status === "completed" 
              ? "bg-green-500 mt-1" 
              : selectedDepartment?.status === "in-progress" 
                ? "bg-amber-500 mt-1" 
                : "mt-1"
          }>
            {selectedDepartment?.status === "completed" 
              ? "Completed" 
              : selectedDepartment?.status === "in-progress" 
                ? "In Progress" 
                : "Not Started"}
          </Badge>
        </div>
      </div>
      <Separator />
    </div>
  );
};
