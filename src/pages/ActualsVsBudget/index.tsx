
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useActualsData } from "./hooks/useActualsData";
import { ActualsFilters } from "@/components/actuals-vs-budget/ActualsFilters";
import { SummaryCards } from "@/components/actuals-vs-budget/SummaryCards";
import { MonthlyTab } from "./components/MonthlyTab";
import { DepartmentTab } from "./components/DepartmentTab";
import { CategoryTab } from "./components/CategoryTab";
import { VarianceAnalysisTab } from "./components/VarianceAnalysisTab";
import { InsightsTab } from "./components/InsightsTab";

const ActualsVsBudget = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("ytd");
  const [activeTab, setActiveTab] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    monthlyData,
    departmentData,
    expenseCategories,
    overBudgetItems,
    underBudgetItems,
    totalBudget,
    totalActual,
    variance,
    accuracy,
    departments,
    periods
  } = useActualsData();

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
          <MonthlyTab data={monthlyData} />
        </TabsContent>

        <TabsContent value="department" className="space-y-4">
          <DepartmentTab data={departmentData} />
        </TabsContent>

        <TabsContent value="category" className="space-y-4">
          <CategoryTab data={expenseCategories} />
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <VarianceAnalysisTab 
            overBudgetItems={overBudgetItems} 
            underBudgetItems={underBudgetItems} 
          />
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <InsightsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActualsVsBudget;
