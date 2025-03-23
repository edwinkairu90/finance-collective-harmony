
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CostCenter, Department } from "@/types/budget";
import { CostCenterTable } from "./CostCenterTable";

interface AllCostCentersViewProps {
  costCenters: CostCenter[];
  departments: Department[];
  onChangeDepartment?: (costCenterId: string, newDepartmentId: string) => void;
  onStartEditing?: (costCenterId: string) => void;
  onDelete?: (costCenterId: string) => void;
}

export const AllCostCentersView: React.FC<AllCostCentersViewProps> = ({
  costCenters,
  departments,
  onChangeDepartment,
  onStartEditing = () => {},
  onDelete = () => {}
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Cost Centers</CardTitle>
        <CardDescription>View all cost centers across all departments</CardDescription>
      </CardHeader>
      <CardContent>
        <CostCenterTable 
          costCenters={costCenters}
          departments={departments}
          showAllDepartments={true}
          onStartEditing={onStartEditing}
          onDelete={onDelete}
          onChangeDepartment={onChangeDepartment}
        />
      </CardContent>
    </Card>
  );
};
