
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface HistoricalDataItem {
  period: string;
  department: string;
  revenue: number;
  expenses: number;
  submittedBy: string;
}

interface HistoricalDataTabProps {
  historicalData: HistoricalDataItem[];
}

export const HistoricalDataTab: React.FC<HistoricalDataTabProps> = ({
  historicalData,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Data</CardTitle>
        <CardDescription>View and download previous submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Period</th>
                  <th className="text-left py-3 font-medium">Department</th>
                  <th className="text-right py-3 font-medium">Revenue</th>
                  <th className="text-right py-3 font-medium">Expenses</th>
                  <th className="text-right py-3 font-medium">Submitted By</th>
                  <th className="text-right py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{item.period}</td>
                    <td className="py-3">{item.department}</td>
                    <td className="text-right py-3">${item.revenue.toLocaleString()}</td>
                    <td className="text-right py-3">${item.expenses.toLocaleString()}</td>
                    <td className="text-right py-3">{item.submittedBy}</td>
                    <td className="text-right py-3">
                      <Button variant="link" className="h-auto p-0">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Export All Data</Button>
      </CardFooter>
    </Card>
  );
};
