
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Department } from "@/types/budget";
import { DepartmentSelector } from "./DepartmentSelector";
import { CostCenterList } from "./CostCenterList";
import { CostCenterHeader } from "./CostCenterHeader";

interface DepartmentViewProps {
  departments: Department[];
  selectedDepartmentId: string;
  selectedDepartment: Department | undefined;
  editingCostCenterId: string | null;
  isAddingCostCenter: boolean;
  newCostCenter: Omit<import("@/types/budget").CostCenter, "id">;
  onSelectDepartment: (departmentId: string) => void;
  onStartAddingCostCenter: () => void;
  onStartEditingCostCenter: (costCenterId: string) => void;
  onCancelEditing: () => void;
  onSaveCostCenterChanges: () => void;
  onDeleteCostCenter: (costCenterId: string) => void;
  onUpdateCostCenterField: (id: string, field: keyof import("@/types/budget").CostCenter, value: string | number) => void;
  onUpdateNewCostCenterField: (field: keyof Omit<import("@/types/budget").CostCenter, "id">, value: string | number) => void;
  onAddNewCostCenter: () => void;
  onCancelAddingCostCenter: () => void;
}

export const DepartmentView: React.FC<DepartmentViewProps> = ({
  departments,
  selectedDepartmentId,
  selectedDepartment,
  editingCostCenterId,
  isAddingCostCenter,
  newCostCenter,
  onSelectDepartment,
  onStartAddingCostCenter,
  onStartEditingCostCenter,
  onCancelEditing,
  onSaveCostCenterChanges,
  onDeleteCostCenter,
  onUpdateCostCenterField,
  onUpdateNewCostCenterField,
  onAddNewCostCenter,
  onCancelAddingCostCenter
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cost Centers</CardTitle>
          <CardDescription>Manage departmental cost centers for detailed budgeting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4 items-end">
              <DepartmentSelector 
                departments={departments}
                selectedDepartmentId={selectedDepartmentId}
                onSelectDepartment={onSelectDepartment}
              />
              {selectedDepartment && (
                <Button 
                  onClick={onStartAddingCostCenter} 
                  className="mb-0.5 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Cost Center
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedDepartment && (
        <Card>
          <CardHeader>
            <CostCenterHeader 
              selectedDepartment={selectedDepartment}
              onAddCostCenter={onStartAddingCostCenter}
            />
          </CardHeader>
          <CardContent>
            <CostCenterList
              selectedDepartment={selectedDepartment}
              editingCostCenterId={editingCostCenterId}
              isAddingCostCenter={isAddingCostCenter}
              newCostCenter={newCostCenter}
              onStartEditingCostCenter={onStartEditingCostCenter}
              onCancelEditing={onCancelEditing}
              onSaveCostCenterChanges={onSaveCostCenterChanges}
              onDeleteCostCenter={onDeleteCostCenter}
              onUpdateCostCenterField={onUpdateCostCenterField}
              onUpdateNewCostCenterField={onUpdateNewCostCenterField}
              onAddNewCostCenter={onAddNewCostCenter}
              onCancelAddingCostCenter={onCancelAddingCostCenter}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
