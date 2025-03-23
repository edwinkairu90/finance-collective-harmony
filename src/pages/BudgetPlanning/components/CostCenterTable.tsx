
import React from "react";
import { CostCenter } from "@/types/budget";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface CostCenterTableProps {
  costCenters: CostCenter[];
  onStartEditing: (costCenterId: string) => void;
  onDelete: (costCenterId: string) => void;
}

export const CostCenterTable = ({
  costCenters,
  onStartEditing,
  onDelete,
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Previous Actual</TableHead>
          <TableHead className="text-right">Current Budget</TableHead>
          <TableHead className="text-right">Increase/Decrease</TableHead>
          <TableHead className="text-right">% Change</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {costCenters.map(costCenter => {
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
        })}
      </TableBody>
    </Table>
  );
};
