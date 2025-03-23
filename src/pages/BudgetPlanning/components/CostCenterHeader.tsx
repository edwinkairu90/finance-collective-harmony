
import React from "react";
import { Button } from "@/components/ui/button";
import { Building, Plus } from "lucide-react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Department } from "@/types/budget";

interface CostCenterHeaderProps {
  selectedDepartment: Department | undefined;
  onAddCostCenter: () => void;
}

export const CostCenterHeader = ({
  selectedDepartment,
  onAddCostCenter,
}: CostCenterHeaderProps) => {
  if (!selectedDepartment) return null;

  return (
    <div className="flex justify-between items-center">
      <div>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" /> 
          {selectedDepartment.name} Cost Centers
        </CardTitle>
        <CardDescription>
          Total Budget: ${selectedDepartment.budget.toLocaleString()}
        </CardDescription>
      </div>
      <Button 
        onClick={onAddCostCenter} 
        className="mb-0.5 flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Add Cost Center
      </Button>
    </div>
  );
};
