
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { quarterlyData } from "./QuarterlyData";

export const CashFlowTab = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quarter</TableHead>
            <TableHead className="text-right">Operating CF</TableHead>
            <TableHead className="text-right">Investing CF</TableHead>
            <TableHead className="text-right">Financing CF</TableHead>
            <TableHead className="text-right">Net Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quarterlyData.cashFlow.slice().reverse().map((quarter) => (
            <TableRow key={quarter.quarter}>
              <TableCell>{quarter.quarter}</TableCell>
              <TableCell className="text-right">${(quarter.operatingCF / 1000000).toFixed(1)}M</TableCell>
              <TableCell className="text-right">${(quarter.investingCF / 1000000).toFixed(1)}M</TableCell>
              <TableCell className="text-right">${(quarter.financingCF / 1000000).toFixed(1)}M</TableCell>
              <TableCell className={`text-right font-medium ${quarter.netChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                ${(quarter.netChange / 1000000).toFixed(1)}M
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
