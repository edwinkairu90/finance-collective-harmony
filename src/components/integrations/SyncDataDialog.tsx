
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AccountingDataSyncOptions } from "@/types/integrations";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface SyncDataDialogProps {
  softwareId: string;
  softwareName: string;
  isOpen: boolean;
  isSyncing: boolean;
  onClose: () => void;
  onSync: (options: AccountingDataSyncOptions) => void;
}

export const SyncDataDialog = ({
  softwareId,
  softwareName,
  isOpen,
  isSyncing,
  onClose,
  onSync
}: SyncDataDialogProps) => {
  const [fromDate, setFromDate] = useState<Date>(new Date(new Date().getFullYear(), 0, 1)); // Jan 1 of current year
  const [toDate, setToDate] = useState<Date>(new Date());
  
  const [includeCategories, setIncludeCategories] = useState({
    revenue: true,
    expenses: true,
    assets: true,
    liabilities: true
  });
  
  const [includeDepartments, setIncludeDepartments] = useState({
    sales: true,
    marketing: true,
    engineering: true,
    operations: true,
    finance: true
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const options: AccountingDataSyncOptions = {
      startDate: fromDate,
      endDate: toDate,
      includeCategories: Object.entries(includeCategories)
        .filter(([_, value]) => value)
        .map(([key]) => key),
      includeDepartments: Object.entries(includeDepartments)
        .filter(([_, value]) => value)
        .map(([key]) => key)
    };
    
    onSync(options);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Sync Data from {softwareName}</DialogTitle>
          <DialogDescription>
            Select date range and data categories to sync from {softwareName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Range */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Date Range</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromDate">From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fromDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={(date) => date && setFromDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="toDate">To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={(date) => date && setToDate(date)}
                      initialFocus
                      disabled={(date) => date < fromDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          {/* Data Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Data Categories</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="revenue"
                  checked={includeCategories.revenue}
                  onCheckedChange={(checked) => 
                    setIncludeCategories(prev => ({ ...prev, revenue: !!checked }))
                  } 
                />
                <label htmlFor="revenue" className="text-sm">Revenue</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="expenses"
                  checked={includeCategories.expenses}
                  onCheckedChange={(checked) => 
                    setIncludeCategories(prev => ({ ...prev, expenses: !!checked }))
                  }
                />
                <label htmlFor="expenses" className="text-sm">Expenses</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="assets"
                  checked={includeCategories.assets}
                  onCheckedChange={(checked) => 
                    setIncludeCategories(prev => ({ ...prev, assets: !!checked }))
                  }
                />
                <label htmlFor="assets" className="text-sm">Assets</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="liabilities"
                  checked={includeCategories.liabilities}
                  onCheckedChange={(checked) => 
                    setIncludeCategories(prev => ({ ...prev, liabilities: !!checked }))
                  }
                />
                <label htmlFor="liabilities" className="text-sm">Liabilities</label>
              </div>
            </div>
          </div>
          
          {/* Departments */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Departments</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sales"
                  checked={includeDepartments.sales}
                  onCheckedChange={(checked) => 
                    setIncludeDepartments(prev => ({ ...prev, sales: !!checked }))
                  }
                />
                <label htmlFor="sales" className="text-sm">Sales</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="marketing"
                  checked={includeDepartments.marketing}
                  onCheckedChange={(checked) => 
                    setIncludeDepartments(prev => ({ ...prev, marketing: !!checked }))
                  }
                />
                <label htmlFor="marketing" className="text-sm">Marketing</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="engineering"
                  checked={includeDepartments.engineering}
                  onCheckedChange={(checked) => 
                    setIncludeDepartments(prev => ({ ...prev, engineering: !!checked }))
                  }
                />
                <label htmlFor="engineering" className="text-sm">Engineering</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="operations"
                  checked={includeDepartments.operations}
                  onCheckedChange={(checked) => 
                    setIncludeDepartments(prev => ({ ...prev, operations: !!checked }))
                  }
                />
                <label htmlFor="operations" className="text-sm">Operations</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="finance"
                  checked={includeDepartments.finance}
                  onCheckedChange={(checked) => 
                    setIncludeDepartments(prev => ({ ...prev, finance: !!checked }))
                  }
                />
                <label htmlFor="finance" className="text-sm">Finance</label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSyncing}>
              {isSyncing ? "Syncing..." : "Sync Data"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
