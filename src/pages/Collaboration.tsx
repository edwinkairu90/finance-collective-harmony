
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetRequestData } from "../types/collaboration";
import { CollaborationStatusTab } from "../components/collaboration/CollaborationStatusTab";
import { SubmitBudgetTab } from "../components/collaboration/SubmitBudgetTab";
import { HistoricalDataTab } from "../components/collaboration/HistoricalDataTab";
import { LineItemsDialog } from "../components/collaboration/LineItemsDialog";
import { budgetRequests, historicalData } from "../data/collaborationData";
import { CollaborationHeader } from "../components/CollaborationHeader";

const Collaboration = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState<BudgetRequestData | null>(null);
  const [isLineItemsOpen, setIsLineItemsOpen] = useState(false);

  const handleSend = () => {
    toast({
      title: "Reminder Sent",
      description: "Reminder has been sent to all pending contributors.",
    });
  };

  const handleViewLineItems = (department: BudgetRequestData) => {
    setSelectedDepartment(department);
    setIsLineItemsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight font-inter">Collaboration</h1>
        <div className="flex gap-4">
          <CollaborationHeader />
          <Button onClick={handleSend}>Send Reminders</Button>
        </div>
      </div>

      <Tabs defaultValue="status" className="space-y-4">
        <TabsList className="font-inter">
          <TabsTrigger value="status">Collaboration Status</TabsTrigger>
          <TabsTrigger value="submit">Submit Budget Request</TabsTrigger>
          <TabsTrigger value="history">Historical Data</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <CollaborationStatusTab 
            budgetRequests={budgetRequests} 
            onViewLineItems={handleViewLineItems} 
          />
        </TabsContent>

        <TabsContent value="submit" className="space-y-4">
          <SubmitBudgetTab />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <HistoricalDataTab historicalData={historicalData} />
        </TabsContent>
      </Tabs>

      <LineItemsDialog 
        isOpen={isLineItemsOpen}
        setIsOpen={setIsLineItemsOpen}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        budgetRequests={budgetRequests}
      />
    </div>
  );
};

export default Collaboration;
