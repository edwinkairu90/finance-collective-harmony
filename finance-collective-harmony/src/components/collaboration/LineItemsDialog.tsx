
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BudgetRequestData } from "../../types/collaboration";
import { BudgetHeader } from "./BudgetHeader";
import { LineItemsTable } from "./LineItemsTable";
import { BudgetComments } from "./BudgetComments";

interface LineItemsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedDepartment: BudgetRequestData | null;
  setSelectedDepartment: (department: BudgetRequestData | null) => void;
  budgetRequests: BudgetRequestData[];
}

export const LineItemsDialog: React.FC<LineItemsDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedDepartment,
  setSelectedDepartment,
  budgetRequests,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{selectedDepartment?.department} Budget Line Items</DialogTitle>
          <DialogDescription>
            Detailed breakdown of the ${selectedDepartment?.totalAmount.toLocaleString()} budget request for {selectedDepartment?.period}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4">
            <BudgetHeader selectedDepartment={selectedDepartment} />
            
            <LineItemsTable 
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              budgetRequests={budgetRequests}
            />

            <BudgetComments selectedDepartment={selectedDepartment} />
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-between sm:justify-between space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          <Button variant="default">Request Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
