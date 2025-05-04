
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface ComparisonData {
  name: string;
  budget: number;
  actual: number;
  variance: number;
}

interface ComparisonTableProps {
  data: ComparisonData[];
  title: string;
}

export const ComparisonTable = ({ data, title }: ComparisonTableProps) => {
  const totalBudget = data.reduce((sum, item) => sum + item.budget, 0);
  const totalActual = data.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = data.reduce((sum, item) => sum + item.variance, 0);
  const totalVariancePercentage = (totalVariance / totalBudget) * 100;

  return (
    <div className="overflow-x-auto">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-right">Budget YTD</TableHead>
            <TableHead className="text-right">Actual YTD</TableHead>
            <TableHead className="text-right">Variance</TableHead>
            <TableHead className="text-right">Variance %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">${item.budget.toLocaleString()}</TableCell>
              <TableCell className="text-right">${item.actual.toLocaleString()}</TableCell>
              <TableCell className={`text-right ${item.variance >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
                {item.variance >= 0 ? '+' : ''}{item.variance.toLocaleString()}
              </TableCell>
              <TableCell className={`text-right ${item.variance >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
                {item.variance >= 0 ? '+' : ''}{((item.variance / item.budget) * 100).toFixed(1)}%
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="border-t font-medium">
            <TableCell>Total</TableCell>
            <TableCell className="text-right">${totalBudget.toLocaleString()}</TableCell>
            <TableCell className="text-right">${totalActual.toLocaleString()}</TableCell>
            <TableCell className={`text-right ${totalVariance >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
              {totalVariance >= 0 ? '+' : ''}{totalVariance.toLocaleString()}
            </TableCell>
            <TableCell className={`text-right ${totalVariancePercentage >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
              {totalVariancePercentage >= 0 ? '+' : ''}{totalVariancePercentage.toFixed(1)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
