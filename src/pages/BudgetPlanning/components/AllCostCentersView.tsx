
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CostCenter, Department } from "@/types/budget";
import { ChartOfAccountsTable } from "./ChartOfAccountsTable";

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
  // Group cost centers by category for Chart of Accounts style view
  const groupedByCategory = costCenters.sort((a, b) => {
    // Sort by category name first
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart of Accounts</CardTitle>
        <CardDescription>View financial data by GL accounts with actuals vs. forecast comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartOfAccountsTable 
          costCenters={groupedByCategory}
          departments={departments}
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
