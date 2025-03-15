
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { quarterlyData, marginChartData } from "./QuarterlyData";

export const MarginsTab = () => {
  return (
    <div className="space-y-4">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={marginChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis label={{ value: 'Margin (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => [`${value}%`, undefined]} />
            <Legend />
            <Bar dataKey="Gross Margin" fill="#047ca4" />
            <Bar dataKey="Operating Margin" fill="#0d8baf" />
            <Bar dataKey="Net Margin" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quarter</TableHead>
              <TableHead className="text-right">Gross Margin</TableHead>
              <TableHead className="text-right">Operating Margin</TableHead>
              <TableHead className="text-right">Net Margin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quarterlyData.margin.slice().reverse().map((quarter) => (
              <TableRow key={quarter.quarter}>
                <TableCell>{quarter.quarter}</TableCell>
                <TableCell className="text-right">{quarter.gross}%</TableCell>
                <TableCell className="text-right">{quarter.operating}%</TableCell>
                <TableCell className="text-right">{quarter.net}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
