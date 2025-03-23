
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CostCenter, Department } from "@/types/budget";
import { CostCenterTable } from "./CostCenterTable";

interface AllCostCentersViewProps {
  costCenters: CostCenter[];
  departments: Department[];
}

export const AllCostCentersView: React.FC<AllCostCentersViewProps> = ({
  costCenters,
  departments
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
          onStartEditing={() => {}}
          onDelete={() => {}}
        />
      </CardContent>
    </Card>
  );
};
