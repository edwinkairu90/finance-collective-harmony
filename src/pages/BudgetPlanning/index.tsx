
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetOverview } from "./BudgetOverview";
import { DepartmentBudgets } from "./DepartmentBudgets";
import { BudgetCategories } from "./BudgetCategories";
import { PlanningTools } from "./PlanningTools";
import { CommentThread } from "@/components/comments/CommentThread";

const BudgetPlanning = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleSave = () => {
    toast({
      title: "Budget Changes Saved",
      description: "Your budget changes have been saved successfully.",
    });
  };

  const handleSubmitForApproval = () => {
    toast({
      title: "Budget Submitted",
      description: "Your budget has been submitted for approval.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Budget Planning</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave}>Save Draft</Button>
          <Button onClick={handleSubmitForApproval}>Submit for Approval</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="departments">By Department</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
              <TabsTrigger value="planning">Planning Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <BudgetOverview />
            </TabsContent>

            <TabsContent value="departments" className="space-y-4">
              <DepartmentBudgets />
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <BudgetCategories />
            </TabsContent>

            <TabsContent value="planning" className="space-y-4">
              <PlanningTools />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <CommentThread 
            entityId={activeTab}
            entityType="budget"
            entityTitle={`Budget Planning - ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanning;
