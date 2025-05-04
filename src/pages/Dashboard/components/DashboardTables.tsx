
import { BVASummaryTable } from "@/components/dashboard/BVASummaryTable";
import { BVAVarianceChart } from "@/components/dashboard/BVAVarianceChart";
import { useActualsData } from "@/pages/ActualsVsBudget/hooks/useActualsData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardTables = () => {
  // Get data from the actuals hook to ensure consistency
  const { departmentData, overBudgetItems } = useActualsData();
  
  // Filter for items with significant negative variance (over 10%)
  const significantVarianceItems = overBudgetItems.filter(item => {
    const variancePercent = Math.abs(item.variance / item.budget) * 100;
    return variancePercent >= 10; // 10% or more over budget is considered significant
  }).sort((a, b) => (Math.abs(b.variance / b.budget) - Math.abs(a.variance / a.budget))); // Sort by variance percentage

  return (
    <div className="grid grid-cols-2 gap-5">
      <BVASummaryTable />
      
      {/* New table showing significant negative variances */}
      <Card>
        <CardHeader className="pb-1 pt-3">
          <CardTitle className="text-sm">Significant Negative Variances (&gt;10%)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead className="py-2">Item</TableHead>
                <TableHead className="py-2">Department</TableHead>
                <TableHead className="text-right py-2">Budget</TableHead>
                <TableHead className="text-right py-2">Actual</TableHead>
                <TableHead className="text-right py-2">Variance %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {significantVarianceItems.map((item, index) => {
                const variancePercent = (Math.abs(item.variance / item.budget) * 100).toFixed(1);
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium py-1.5">{item.item}</TableCell>
                    <TableCell className="py-1.5">{item.department}</TableCell>
                    <TableCell className="text-right py-1.5">${item.budget.toLocaleString()}</TableCell>
                    <TableCell className="text-right py-1.5">${item.actual.toLocaleString()}</TableCell>
                    <TableCell className="text-right py-1.5 text-red-600">+{variancePercent}%</TableCell>
                  </TableRow>
                );
              })}
              {significantVarianceItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">No items with significant negative variance found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
