
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface AnalysisItem {
  item: string;
  department: string;
  budget: number;
  actual: number;
  variance: number;
  explanation: string;
}

interface VarianceAnalysisTableProps {
  data: AnalysisItem[];
  title: string;
  variant: "over" | "under";
}

export const VarianceAnalysisTable = ({ 
  data, 
  title, 
  variant 
}: VarianceAnalysisTableProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Item</TableHead>
              <TableHead className="text-left">Department</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="text-right">Actual</TableHead>
              <TableHead className="text-right">Variance</TableHead>
              <TableHead className="text-left">Explanation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="border-b">
                <TableCell>{item.item}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell className="text-right">${item.budget.toLocaleString()}</TableCell>
                <TableCell className="text-right">${item.actual.toLocaleString()}</TableCell>
                <TableCell className={`text-right ${
                  variant === "under" ? "text-finance-positive" : "text-finance-negative"
                }`}>
                  {variant === "under" ? "+" : "-"}${Math.abs(item.variance).toLocaleString()}
                </TableCell>
                <TableCell>{item.explanation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
