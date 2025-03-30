
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BudgetRequestData } from "../../types/collaboration";
import { Edit } from "lucide-react";

interface CollaborationStatusTabProps {
  budgetRequests: BudgetRequestData[];
  onViewLineItems: (department: BudgetRequestData) => void;
  onAssignUser?: (department: BudgetRequestData) => void;
}

export const CollaborationStatusTab: React.FC<CollaborationStatusTabProps> = ({
  budgetRequests,
  onViewLineItems,
  onAssignUser,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Q3 2025 Budget Collaboration</CardTitle>
        <CardDescription>Status overview for all departments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>Overall Completion</div>
            <div>65%</div>
          </div>
          <Progress value={65} className="h-2 bg-slate-200" indicatorClassName="bg-[#5ECFCC]" />

          <div className="pt-6 space-y-4">
            <div className="grid grid-cols-5 text-sm font-medium">
              <div>Department</div>
              <div>Assigned To</div>
              <div>Status</div>
              <div>Due Date</div>
              <div>Actions</div>
            </div>

            {budgetRequests.map((item) => (
              <div key={item.id} className="grid grid-cols-5 items-center gap-4 border-t pt-4 text-sm">
                <div>{item.department}</div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-xs">{item.assignedTo.avatar}</AvatarFallback>
                  </Avatar>
                  <span>{item.assignedTo.name}</span>
                  {onAssignUser && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 ml-1" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAssignUser(item);
                      }}
                    >
                      <Edit size={14} />
                      <span className="sr-only">Edit Assigned User</span>
                    </Button>
                  )}
                </div>
                <div>
                  <Badge className={
                    item.status === "completed" 
                      ? "bg-green-500 text-xs px-3 py-0.5" 
                      : item.status === "in-progress" 
                        ? "bg-amber-500 text-xs px-3 py-0.5" 
                        : "text-xs px-3 py-0.5"
                  }>
                    {item.status === "completed" 
                      ? "Completed" 
                      : item.status === "in-progress" 
                        ? "In Progress" 
                        : "Not Started"}
                  </Badge>
                </div>
                <div>{item.dueDate}</div>
                <div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8 px-3"
                    onClick={() => onViewLineItems(item)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
