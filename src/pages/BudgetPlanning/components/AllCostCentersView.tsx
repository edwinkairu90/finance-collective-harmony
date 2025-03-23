
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CostCenter, Department } from "@/types/budget";
import { CostCenterTable } from "./CostCenterTable";

interface AllCostCentersViewProps {
  costCenters: CostCenter[];
  departments: Department[];
  onChangeDepartment?: (costCenterId: string, newDepartmentId: string) => void;
  onChangeCategory?: (costCenterId: string, newCategory: string) => void;
  onStartEditing?: (costCenterId: string) => void;
  onDelete?: (costCenterId: string) => void;
  onUpdateCostCenterField?: (costCenterId: string, field: keyof CostCenter, value: string | number) => void;
}

export const AllCostCentersView: React.FC<AllCostCentersViewProps> = ({
  costCenters,
  departments,
  onChangeDepartment,
  onChangeCategory,
  onStartEditing = () => {},
  onDelete = () => {},
  onUpdateCostCenterField
}) => {
  // Group cost centers by category for P&L style view
  const groupedByCostCenter = costCenters.sort((a, b) => {
    // Sort by category name first
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Center P&L View</CardTitle>
        <CardDescription>View all cost centers in a P&L format with inline editing capabilities</CardDescription>
      </CardHeader>
      <CardContent>
        <CostCenterTable 
          costCenters={groupedByCostCenter}
          departments={departments}
          showAllDepartments={true}
          onStartEditing={onStartEditing}
          onDelete={onDelete}
          onChangeDepartment={onChangeDepartment}
          onChangeCategory={onChangeCategory}
          onUpdateCostCenterField={onUpdateCostCenterField}
        />
      </CardContent>
    </Card>
  );
};
