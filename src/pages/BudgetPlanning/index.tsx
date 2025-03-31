
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetOverview } from "./BudgetOverview";
import { DepartmentBudgets } from "./DepartmentBudgets";
import { BudgetCategories } from "./BudgetCategories";
import { PlanningTools } from "./PlanningTools";
import { CostCenters } from "./CostCenters";
import { RevenueProjection } from "./RevenueProjection";

const BudgetPlanning = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Budget Planning &amp; Forecasting</h1>
        <p className="text-muted-foreground">Manage your company's budget planning process</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="cost-centers">Cost Centers</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Proj</TabsTrigger>
          <TabsTrigger value="tools">Planning Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <BudgetOverview />
        </TabsContent>
        <TabsContent value="departments">
          <DepartmentBudgets />
        </TabsContent>
        <TabsContent value="cost-centers">
          <CostCenters />
        </TabsContent>
        <TabsContent value="categories">
          <BudgetCategories />
        </TabsContent>
        <TabsContent value="revenue">
          <RevenueProjection />
        </TabsContent>
        <TabsContent value="tools">
          <PlanningTools />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetPlanning;
