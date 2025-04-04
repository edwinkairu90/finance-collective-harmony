
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetRequestData } from "../types/collaboration";
import { CollaborationStatusTab } from "../components/collaboration/CollaborationStatusTab";
import { SubmitBudgetTab } from "../components/collaboration/SubmitBudgetTab";
import { HistoricalDataTab } from "../components/collaboration/HistoricalDataTab";
import { ApprovalTab } from "../components/collaboration/ApprovalTab";
import { LineItemsDialog } from "../components/collaboration/LineItemsDialog";
import { budgetRequests as initialBudgetRequests, historicalData } from "../data/collaborationData";
import { CollaborationHeader } from "../components/CollaborationHeader";
import { AddDepartmentDialog } from "../components/collaboration/AddDepartmentDialog";
import { AssignUserDialog } from "../components/collaboration/AssignUserDialog";
import { useAuth } from "../context/AuthContext";

const Collaboration = () => {
  const { toast } = useToast();
  const { hasPermission } = useAuth();
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequestData[]>(initialBudgetRequests);
  const [selectedDepartment, setSelectedDepartment] = useState<BudgetRequestData | null>(null);
  const [isLineItemsOpen, setIsLineItemsOpen] = useState(false);
  const [isAssignUserOpen, setIsAssignUserOpen] = useState(false);
  const [departmentToAssign, setDepartmentToAssign] = useState<BudgetRequestData | null>(null);

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

  const handleAssignUser = (department: BudgetRequestData) => {
    setDepartmentToAssign(department);
    setIsAssignUserOpen(true);
  };

  const handleUserAssigned = (departmentId: string, userName: string, userAvatar: string) => {
    setBudgetRequests(prevRequests => 
      prevRequests.map(dept => 
        dept.id === departmentId 
          ? { ...dept, assignedTo: { name: userName, avatar: userAvatar } } 
          : dept
      )
    );
  };

  const handleDepartmentAdded = (newDepartment: BudgetRequestData) => {
    setBudgetRequests(prevRequests => [...prevRequests, newDepartment]);
  };

  const isAdmin = hasPermission('manage:users');
  const canApprove = hasPermission('approve:budgets');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight font-inter">Collaboration</h1>
        <div className="flex gap-4">
          <CollaborationHeader />
          {isAdmin && (
            <AddDepartmentDialog 
              onDepartmentAdded={handleDepartmentAdded} 
              onNeedAssignment={handleAssignUser}
            />
          )}
          <Button 
            onClick={handleSend}
            size="sm"
            className="bg-[#50C2A0] hover:bg-[#3BA989] text-white text-xs py-1.5 px-3 h-8"
          >
            Send Reminders
          </Button>
        </div>
      </div>

      <Tabs defaultValue="status" className="space-y-4">
        <TabsList className="font-inter bg-transparent p-1 h-auto space-x-1">
          <TabsTrigger 
            value="status" 
            className="text-sm py-2 px-4 rounded-md data-[state=active]:bg-[#D3E4FD] data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Budget Request Status
          </TabsTrigger>
          <TabsTrigger 
            value="submit" 
            className="text-sm py-2 px-4 rounded-md data-[state=active]:bg-[#D3E4FD] data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Submit Budget Request
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="text-sm py-2 px-4 rounded-md data-[state=active]:bg-[#D3E4FD] data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Historical Data
          </TabsTrigger>
          {canApprove && (
            <TabsTrigger 
              value="approvals" 
              className="text-sm py-2 px-4 rounded-md data-[state=active]:bg-[#D3E4FD] data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Approvals
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <CollaborationStatusTab 
            budgetRequests={budgetRequests} 
            onViewLineItems={handleViewLineItems}
            onAssignUser={isAdmin ? handleAssignUser : undefined}
          />
        </TabsContent>

        <TabsContent value="submit" className="space-y-4">
          <SubmitBudgetTab />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <HistoricalDataTab historicalData={historicalData} />
        </TabsContent>
        
        {canApprove && (
          <TabsContent value="approvals" className="space-y-4">
            <ApprovalTab />
          </TabsContent>
        )}
      </Tabs>

      <LineItemsDialog 
        isOpen={isLineItemsOpen}
        setIsOpen={setIsLineItemsOpen}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        budgetRequests={budgetRequests}
      />

      <AssignUserDialog
        isOpen={isAssignUserOpen}
        setIsOpen={setIsAssignUserOpen}
        department={departmentToAssign}
        onUserAssigned={handleUserAssigned}
      />
    </div>
  );
};

export default Collaboration;
