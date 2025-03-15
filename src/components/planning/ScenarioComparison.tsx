
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScenarioItem } from "@/types/planning";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Download, X } from "lucide-react";

interface ScenarioComparisonProps {
  scenarios: ScenarioItem[];
  onClose: () => void;
  onExport?: () => void;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({ 
  scenarios, 
  onClose,
  onExport
}) => {
  if (scenarios.length < 2) {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Scenario Comparison</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Please select at least two scenarios to compare</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Prepare financial impact data for side-by-side comparison
  const getFinancialComparisonData = () => {
    const categories = ['Revenue', 'Expenses', 'Profit'];
    
    return categories.map(category => {
      const dataPoint: Record<string, any> = { name: category };
      
      scenarios.forEach(scenario => {
        const key = scenario.name.replace(/\s+/g, '_');
        const lowerCaseCategory = category.toLowerCase();
        dataPoint[key] = scenario.budgetImpact[lowerCaseCategory as keyof typeof scenario.budgetImpact];
      });
      
      return dataPoint;
    });
  };

  // Prepare department impact data for side-by-side comparison
  const getDepartmentComparisonData = () => {
    // Get a unique list of all departments across all scenarios
    const allDepartments = new Set<string>();
    scenarios.forEach(scenario => {
      scenario.departments.forEach(dept => {
        allDepartments.add(dept.name);
      });
    });
    
    return Array.from(allDepartments).map(deptName => {
      const dataPoint: Record<string, any> = { name: deptName };
      
      scenarios.forEach(scenario => {
        const key = scenario.name.replace(/\s+/g, '_');
        const deptData = scenario.departments.find(d => d.name === deptName);
        dataPoint[key] = deptData ? deptData.budgetChange : 0;
      });
      
      return dataPoint;
    });
  };

  // Prepare the chart colors
  const scenarioColors = [
    "#0ea5e9", // sky-500
    "#f59e0b", // amber-500
    "#10b981", // emerald-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Scenario Comparison</CardTitle>
          <div className="flex gap-2">
            {onExport && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onExport}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Comparing {scenarios.length} scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Scenario Summary Table */}
          <div>
            <h3 className="text-md font-medium mb-3">Scenario Overview</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Revenue Impact</TableHead>
                  <TableHead>Expense Impact</TableHead>
                  <TableHead>Profit Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenarios.map((scenario, index) => (
                  <TableRow key={scenario.id}>
                    <TableCell className="font-medium">{scenario.name}</TableCell>
                    <TableCell>{scenario.type.replace('-', ' ')}</TableCell>
                    <TableCell>{scenario.timeline}</TableCell>
                    <TableCell>${scenario.budgetImpact.revenue.toLocaleString()}</TableCell>
                    <TableCell>${scenario.budgetImpact.expenses.toLocaleString()}</TableCell>
                    <TableCell 
                      className={
                        scenario.budgetImpact.profit >= 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }
                    >
                      ${scenario.budgetImpact.profit.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Financial Impact Chart */}
          <div>
            <h3 className="text-md font-medium mb-3">Financial Impact Comparison</h3>
            <div className="h-72">
              <ChartContainer
                config={scenarios.reduce((acc, scenario, index) => {
                  const key = scenario.name.replace(/\s+/g, '_');
                  acc[key] = { 
                    label: scenario.name,
                    color: scenarioColors[index % scenarioColors.length] 
                  };
                  return acc;
                }, {} as Record<string, { label: string, color: string }>)}
              >
                <BarChart 
                  data={getFinancialComparisonData()} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                  />
                  <Legend />
                  {scenarios.map((scenario, index) => (
                    <Bar 
                      key={scenario.id}
                      dataKey={scenario.name.replace(/\s+/g, '_')}
                      name={scenario.name}
                      fill={scenarioColors[index % scenarioColors.length]}
                    />
                  ))}
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          {/* Departmental Impact Chart */}
          <div>
            <h3 className="text-md font-medium mb-3">Departmental Budget Impact</h3>
            <div className="h-72">
              <ChartContainer
                config={scenarios.reduce((acc, scenario, index) => {
                  const key = scenario.name.replace(/\s+/g, '_');
                  acc[key] = { 
                    label: scenario.name,
                    color: scenarioColors[index % scenarioColors.length] 
                  };
                  return acc;
                }, {} as Record<string, { label: string, color: string }>)}
              >
                <BarChart 
                  data={getDepartmentComparisonData()} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Budget Change']}
                  />
                  <Legend />
                  {scenarios.map((scenario, index) => (
                    <Bar 
                      key={scenario.id}
                      dataKey={scenario.name.replace(/\s+/g, '_')}
                      name={scenario.name}
                      fill={scenarioColors[index % scenarioColors.length]}
                    />
                  ))}
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          {/* Key Assumptions Section */}
          <div>
            <h3 className="text-md font-medium mb-3">Key Assumptions Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scenarios.map((scenario) => (
                <Card key={scenario.id} className="border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">{scenario.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {scenario.assumptions.map((assumption, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{assumption}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
