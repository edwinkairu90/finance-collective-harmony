
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import { MonthlyTrendChart } from "@/components/actuals-vs-budget/MonthlyTrendChart";
import { DepartmentBarChart } from "@/components/actuals-vs-budget/DepartmentBarChart";
import { ComparisonTable } from "@/components/actuals-vs-budget/ComparisonTable";
import { SummaryCards } from "@/components/actuals-vs-budget/SummaryCards";
import { ActualsFilters } from "@/components/actuals-vs-budget/ActualsFilters";
import { VarianceAnalysisTable } from "@/components/actuals-vs-budget/VarianceAnalysisTable";
import { VarianceTrendChart } from "@/components/actuals-vs-budget/VarianceTrendChart";

// Mock data for charts
const monthlyData = [
  { name: 'Jan', budget: 84000, actual: 85400, variance: 1400 },
  { name: 'Feb', budget: 86000, actual: 83200, variance: -2800 },
  { name: 'Mar', budget: 89000, actual: 87500, variance: -1500 },
  { name: 'Apr', budget: 88000, actual: 90200, variance: 2200 },
  { name: 'May', budget: 90000, actual: 93100, variance: 3100 },
  { name: 'Jun', budget: 94000, actual: 91800, variance: -2200 },
  { name: 'Jul', budget: 96000, actual: 95400, variance: -600 },
  { name: 'Aug', budget: 96000, actual: 97200, variance: 1200 },
];

const departmentData = [
  { name: 'Sales', budget: 320000, actual: 335000, variance: 15000 },
  { name: 'Marketing', budget: 250000, actual: 245000, variance: -5000 },
  { name: 'Engineering', budget: 420000, actual: 428000, variance: 8000 },
  { name: 'Support', budget: 180000, actual: 175000, variance: -5000 },
  { name: 'HR', budget: 95000, actual: 93000, variance: -2000 },
  { name: 'Finance', budget: 110000, actual: 108000, variance: -2000 },
];

const expenseCategories = [
  { name: 'Salaries', budget: 650000, actual: 648000, variance: -2000 },
  { name: 'Marketing', budget: 250000, actual: 245000, variance: -5000 },
  { name: 'Operations', budget: 180000, actual: 183000, variance: 3000 },
  { name: 'Technology', budget: 120000, actual: 125000, variance: 5000 },
  { name: 'Other', budget: 48000, actual: 45500, variance: -2500 },
];

const overBudgetItems = [
  {
    item: 'Sales Compensation',
    department: 'Sales',
    budget: 180000,
    actual: 196000,
    variance: 16000,
    explanation: 'Higher sales commissions due to exceeding targets'
  },
  {
    item: 'Cloud Hosting',
    department: 'Engineering',
    budget: 58000,
    actual: 68000,
    variance: 10000,
    explanation: 'Increased usage due to customer growth'
  },
  {
    item: 'Recruitment',
    department: 'HR',
    budget: 25000,
    actual: 32000,
    variance: 7000,
    explanation: 'Expanded hiring efforts for engineering team'
  },
];

const underBudgetItems = [
  {
    item: 'Content Marketing',
    department: 'Marketing',
    budget: 45000,
    actual: 38000,
    variance: 7000,
    explanation: 'Delayed content campaigns pending strategy review'
  },
  {
    item: 'Office Supplies',
    department: 'Operations',
    budget: 12000,
    actual: 7500,
    variance: 4500,
    explanation: 'Continued remote work reduced office supply needs'
  },
  {
    item: 'Training & Development',
    department: 'HR',
    budget: 18000,
    actual: 14000,
    variance: 4000,
    explanation: 'Shift to lower-cost online training options'
  },
];

const departments = ["Sales", "Marketing", "Engineering", "Support", "HR", "Finance"];
const periods = [
  { id: "ytd", name: "Year-to-Date" },
  { id: "q1", name: "Q1 2023" },
  { id: "q2", name: "Q2 2023" },
  { id: "q3", name: "Q3 2023" },
  { id: "q4", name: "Q4 2023" },
  { id: "custom", name: "Custom Range" }
];

const ActualsVsBudget = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("ytd");
  const [activeTab, setActiveTab] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate summary data
  const totalBudget = 723000;
  const totalActual = 720300;
  const variance = totalActual - totalBudget;
  const accuracy = (totalActual / totalBudget) * 100;

  const handleExport = () => {
    setIsLoading(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Report Exported",
        description: "Your report has been successfully exported as PDF.",
      });
    }, 1500);
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedDepartment !== "all") count++;
    if (selectedPeriod !== "ytd") count++;
    return count;
  };

  return (
    <div className="space-y-6">
      <ActualsFilters 
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        onExport={handleExport}
        departments={departments}
        periods={periods}
        activeFilters={getActiveFilterCount()}
      />

      {/* Summary Cards */}
      <SummaryCards 
        totalBudget={totalBudget}
        totalActual={totalActual}
        variance={variance}
        accuracy={accuracy}
        percentOfAnnual={58}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
          <TabsTrigger value="department">By Department</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="details">Variance Analysis</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <MonthlyTrendChart data={monthlyData} />
          <VarianceTrendChart data={monthlyData} />
        </TabsContent>

        <TabsContent value="department" className="space-y-4">
          <DepartmentBarChart data={departmentData} />
          <ComparisonTable data={departmentData} title="Department Budget vs Actual" />
        </TabsContent>

        <TabsContent value="category" className="space-y-4">
          <DepartmentBarChart data={expenseCategories} />
          <ComparisonTable data={expenseCategories} title="Category Budget vs Actual" />
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Variance Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <VarianceAnalysisTable
                data={overBudgetItems}
                title="Top 3 Over Budget"
                variant="over"
              />
              <VarianceAnalysisTable
                data={underBudgetItems}
                title="Top 3 Under Budget"
                variant="under"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Performance Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Key Observations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Overall budget accuracy is excellent at 99.6%</li>
                      <li>Sales department has the largest positive variance at 4.7%</li>
                      <li>Q2 showed highest budget-to-actual deviation</li>
                      <li>Technology spending consistently trending above budget</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-amber-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Review sales compensation structure to better align with performance</li>
                      <li>Optimize cloud hosting costs with reserved instances</li>
                      <li>Evaluate marketing campaign ROI based on spend efficiency</li>
                      <li>Continue remote work policies to maintain cost savings</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-green-500 md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Forecasted Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Based on current trends, the annual budget is projected to close within 
                      1.2% of target. Engineering department expenses are expected to exceed 
                      budget by approximately 3.5% due to increased cloud infrastructure needs, 
                      while HR and Marketing departments are on track to finish 3-4% under budget. 
                      Overall operating expenses are forecasted to end the year 0.5% below budget.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActualsVsBudget;
