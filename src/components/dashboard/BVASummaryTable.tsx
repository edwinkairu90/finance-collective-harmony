
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useActualsData } from "@/pages/ActualsVsBudget/hooks/useActualsData";

export const BVASummaryTable = () => {
  // Use the same data source as other components
  const { departmentData } = useActualsData();
  
  // Transform department data for BVA table
  const bvaTableData = departmentData.map(item => ({
    name: item.name,
    actuals: `$${item.actual.toLocaleString()}`,
    forecast: `$${item.budget.toLocaleString()}`,
    variance: item.variance >= 0 ? `$${item.variance.toLocaleString()}` : `($${Math.abs(item.variance).toLocaleString()})`,
    variancePercent: `${(Math.abs(item.variance / item.budget) * 100).toFixed(1)}%`
  }));

  // Add summary row
  const totalBudget = departmentData.reduce((sum, item) => sum + item.budget, 0);
  const totalActual = departmentData.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalActual - totalBudget;
  
  bvaTableData.push({
    name: "= EBITDA",
    actuals: `$${totalActual.toLocaleString()}`,
    forecast: `$${totalBudget.toLocaleString()}`,
    variance: totalVariance >= 0 ? `$${totalVariance.toLocaleString()}` : `($${Math.abs(totalVariance).toLocaleString()})`,
    variancePercent: `${(Math.abs(totalVariance / totalBudget) * 100).toFixed(1)}%`
  });

  return (
    <Card>
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-sm">BVA Summary YTD</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px] py-2"></TableHead>
              <TableHead className="text-right py-2">Actuals</TableHead>
              <TableHead className="text-right py-2">Forecast</TableHead>
              <TableHead className="text-right py-2">Variance</TableHead>
              <TableHead className="text-right py-2">Variance %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bvaTableData.map((row, index) => (
              <TableRow 
                key={index}
                className={row.name === "= EBITDA" ? "bg-blue-100" : ""}
              >
                <TableCell className="font-medium py-1.5">{row.name}</TableCell>
                <TableCell className="text-right py-1.5">{row.actuals}</TableCell>
                <TableCell className="text-right py-1.5">{row.forecast}</TableCell>
                <TableCell className="text-right py-1.5">{row.variance}</TableCell>
                <TableCell className="text-right py-1.5">{row.variancePercent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
