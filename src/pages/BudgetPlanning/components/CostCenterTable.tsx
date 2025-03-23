
import React from "react";
import { CostCenter, Department } from "@/types/budget";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface CostCenterTableProps {
  costCenters: CostCenter[];
  onStartEditing: (costCenterId: string) => void;
  onDelete: (costCenterId: string) => void;
  departments?: Department[];
  showAllDepartments?: boolean;
}

export const CostCenterTable = ({
  costCenters,
  onStartEditing,
  onDelete,
  departments = [],
  showAllDepartments = false,
}: CostCenterTableProps) => {
  if (costCenters.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No cost centers found. Click "Add Cost Center" to create one.</p>
      </div>
    );
  }

  const calculateDifference = (budget: number, actual?: number) => {
    if (actual === undefined) return null;
    return budget - actual;
  };

  const calculateDifferencePercent = (budget: number, actual?: number) => {
    if (actual === undefined || actual === 0) return null;
    return ((budget - actual) / actual) * 100;
  };

  // Group cost centers by department for the all departments view
  const groupedCostCenters = showAllDepartments 
    ? costCenters.reduce((acc, cc) => {
        if (!acc[cc.departmentId]) {
          acc[cc.departmentId] = [];
        }
        acc[cc.departmentId].push(cc);
        return acc;
      }, {} as Record<string, CostCenter[]>)
    : { single: costCenters };

  // Calculate total budget across all cost centers
  const totalBudget = costCenters.reduce((sum, cc) => sum + cc.budget, 0);
  const totalPreviousActual = costCenters
    .filter(cc => cc.previousActual !== undefined)
    .reduce((sum, cc) => sum + (cc.previousActual || 0), 0);

  const getDepartmentName = (departmentId: string) => {
    const dept = departments.find(d => d.id === departmentId);
    return dept ? dept.name : departmentId;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showAllDepartments && <TableHead>Department</TableHead>}
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Previous Actual</TableHead>
          <TableHead className="text-right">Current Budget</TableHead>
          <TableHead className="text-right">Increase/Decrease</TableHead>
          <TableHead className="text-right">% Change</TableHead>
          {!showAllDepartments && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {showAllDepartments ? (
          // Display cost centers grouped by department
          Object.entries(groupedCostCenters).map(([departmentId, departmentCostCenters]) => (
            <React.Fragment key={departmentId}>
              {departmentCostCenters.map((costCenter, index) => {
                const difference = calculateDifference(costCenter.budget, costCenter.previousActual);
                const differencePercent = calculateDifferencePercent(costCenter.budget, costCenter.previousActual);
                
                return (
                  <TableRow key={costCenter.id}>
                    {index === 0 && (
                      <TableCell rowSpan={departmentCostCenters.length} className="font-semibold border-r">
                        {getDepartmentName(departmentId)}
                      </TableCell>
                    )}
                    <TableCell className="font-medium">{costCenter.name}</TableCell>
                    <TableCell>{costCenter.description}</TableCell>
                    <TableCell className="text-right">
                      ${costCenter.previousActual?.toLocaleString() || 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">${costCenter.budget.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      {difference !== null ? (
                        <span className={difference >= 0 ? "text-green-600" : "text-red-600"}>
                          {difference >= 0 ? 
                            `+$${difference.toLocaleString()}` : 
                            `-$${Math.abs(difference).toLocaleString()}`}
                        </span>
                      ) : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      {differencePercent !== null ? (
                        <span className={differencePercent >= 0 ? "text-green-600" : "text-red-600"}>
                          {differencePercent >= 0 ? "+" : ""}{differencePercent.toFixed(1)}%
                        </span>
                      ) : 'N/A'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </React.Fragment>
          ))
        ) : (
          // Original single department view
          costCenters.map(costCenter => {
            const difference = calculateDifference(costCenter.budget, costCenter.previousActual);
            const differencePercent = calculateDifferencePercent(costCenter.budget, costCenter.previousActual);
            
            return (
              <TableRow key={costCenter.id}>
                <TableCell className="font-medium">{costCenter.name}</TableCell>
                <TableCell>{costCenter.description}</TableCell>
                <TableCell className="text-right">
                  ${costCenter.previousActual?.toLocaleString() || 'N/A'}
                </TableCell>
                <TableCell className="text-right">${costCenter.budget.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {difference !== null ? (
                    <span className={difference >= 0 ? "text-green-600" : "text-red-600"}>
                      {difference >= 0 ? 
                        `+$${difference.toLocaleString()}` : 
                        `-$${Math.abs(difference).toLocaleString()}`}
                    </span>
                  ) : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  {differencePercent !== null ? (
                    <span className={differencePercent >= 0 ? "text-green-600" : "text-red-600"}>
                      {differencePercent >= 0 ? "+" : ""}{differencePercent.toFixed(1)}%
                    </span>
                  ) : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onStartEditing(costCenter.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onDelete(costCenter.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={showAllDepartments ? 3 : 2} className="font-bold">
            TOTAL
          </TableCell>
          <TableCell className="text-right font-bold">
            ${totalPreviousActual.toLocaleString()}
          </TableCell>
          <TableCell className="text-right font-bold">
            ${totalBudget.toLocaleString()}
          </TableCell>
          <TableCell className="text-right font-bold">
            {totalPreviousActual > 0 ? (
              <span className={(totalBudget - totalPreviousActual) >= 0 ? "text-green-600" : "text-red-600"}>
                {(totalBudget - totalPreviousActual) >= 0 
                  ? `+$${(totalBudget - totalPreviousActual).toLocaleString()}`
                  : `-$${Math.abs(totalBudget - totalPreviousActual).toLocaleString()}`}
              </span>
            ) : 'N/A'}
          </TableCell>
          <TableCell className="text-right font-bold">
            {totalPreviousActual > 0 ? (
              <span className={(totalBudget - totalPreviousActual) >= 0 ? "text-green-600" : "text-red-600"}>
                {((totalBudget - totalPreviousActual) / totalPreviousActual * 100).toFixed(1)}%
              </span>
            ) : 'N/A'}
          </TableCell>
          {!showAllDepartments && <TableCell />}
        </TableRow>
      </TableFooter>
    </Table>
  );
};
