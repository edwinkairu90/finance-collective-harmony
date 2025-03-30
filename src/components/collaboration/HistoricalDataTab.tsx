
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
        <CardTitle className="font-inter">Historical Data</CardTitle>
        <CardDescription>View and download previous submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium font-inter text-gray-600">Period</th>
                  <th className="text-left py-3 font-medium font-inter text-gray-600">Department</th>
                  <th className="text-right py-3 font-medium font-inter text-gray-600">Revenue</th>
                  <th className="text-right py-3 font-medium font-inter text-gray-600">Expenses</th>
                  <th className="text-right py-3 font-medium font-inter text-gray-600">Submitted By</th>
                  <th className="text-right py-3 font-medium font-inter text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-inter">{item.period}</td>
                    <td className="py-3 font-inter">{item.department}</td>
                    <td className="text-right py-3 font-inter">${item.revenue.toLocaleString()}</td>
                    <td className="text-right py-3 font-inter">${item.expenses.toLocaleString()}</td>
                    <td className="text-right py-3 font-inter">{item.submittedBy}</td>
                    <td className="text-right py-3">
                      <Button variant="link" className="h-auto p-0 font-inter">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="font-inter">Export All Data</Button>
      </CardFooter>
    </Card>
  );
};
