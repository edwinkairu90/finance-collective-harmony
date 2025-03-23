
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const BudgetCategories = () => {
  return (
    <Card className="bg-teal-800 text-white">
      <CardHeader>
        <CardTitle>Budget by Category</CardTitle>
        <CardDescription className="text-gray-200">View and manage budget categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/30">
                  <th className="text-left py-3 font-medium">Category</th>
                  <th className="text-right py-3 font-medium">Last Year</th>
                  <th className="text-right py-3 font-medium">Current Budget</th>
                  <th className="text-right py-3 font-medium">YoY Change</th>
                  <th className="text-right py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200/30">
                  <td className="py-3">Salaries & Benefits</td>
                  <td className="text-right py-3">$580,000</td>
                  <td className="text-right py-3">$650,000</td>
                  <td className="text-right py-3 text-green-200">+12%</td>
                  <td className="text-right py-3">Approved</td>
                </tr>
                <tr className="border-b border-gray-200/30">
                  <td className="py-3">Marketing</td>
                  <td className="text-right py-3">$225,000</td>
                  <td className="text-right py-3">$250,000</td>
                  <td className="text-right py-3 text-green-200">+11.1%</td>
                  <td className="text-right py-3">Under Review</td>
                </tr>
                <tr className="border-b border-gray-200/30">
                  <td className="py-3">Operations</td>
                  <td className="text-right py-3">$175,000</td>
                  <td className="text-right py-3">$180,000</td>
                  <td className="text-right py-3 text-green-200">+2.9%</td>
                  <td className="text-right py-3">Approved</td>
                </tr>
                <tr className="border-b border-gray-200/30">
                  <td className="py-3">Technology</td>
                  <td className="text-right py-3">$100,000</td>
                  <td className="text-right py-3">$120,000</td>
                  <td className="text-right py-3 text-green-200">+20%</td>
                  <td className="text-right py-3">Draft</td>
                </tr>
                <tr>
                  <td className="py-3">Other</td>
                  <td className="text-right py-3">$50,000</td>
                  <td className="text-right py-3">$48,000</td>
                  <td className="text-right py-3 text-red-200">-4%</td>
                  <td className="text-right py-3">Approved</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-200/30">
                  <th className="text-left py-3 font-medium">Total</th>
                  <th className="text-right py-3 font-medium">$1,130,000</th>
                  <th className="text-right py-3 font-medium">$1,248,000</th>
                  <th className="text-right py-3 font-medium text-green-200">+10.4%</th>
                  <th className="text-right py-3 font-medium"></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
