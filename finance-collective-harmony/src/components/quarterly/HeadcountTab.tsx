
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { quarterlyData } from "./QuarterlyData";

export const HeadcountTab = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quarter</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">Engineering</TableHead>
            <TableHead className="text-right">Marketing</TableHead>
            <TableHead className="text-right">Operations</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quarterlyData.headcount.slice().reverse().map((quarter) => (
            <TableRow key={quarter.quarter}>
              <TableCell>{quarter.quarter}</TableCell>
              <TableCell className="text-right">{quarter.sales}</TableCell>
              <TableCell className="text-right">{quarter.engineering}</TableCell>
              <TableCell className="text-right">{quarter.marketing}</TableCell>
              <TableCell className="text-right">{quarter.operations}</TableCell>
              <TableCell className="text-right font-medium">{quarter.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
