
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApprovalItem } from "../../../types/approval";
import { useState } from "react";

interface ApprovalItemsListProps {
  items: ApprovalItem[];
  selectedItem: ApprovalItem | null;
  onSelectItem: (item: ApprovalItem) => void;
}

export const ApprovalItemsList = ({ 
  items, 
  selectedItem, 
  onSelectItem 
}: ApprovalItemsListProps) => {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  
  const filteredItems = filter === "all" 
    ? items 
    : items.filter(item => item.status === filter);

  return (
    <Card>
      <CardHeader className="py-3 bg-amber-50 border-b">
        <CardTitle className="flex justify-between text-base">
          <span>Approval Requests</span>
          <Badge variant="outline" className="text-xs">{items.length}</Badge>
        </CardTitle>
        <Tabs defaultValue="all" className="mt-2" onValueChange={(value) => setFilter(value as any)}>
          <TabsList className="grid grid-cols-4 h-7">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="pending" className="text-xs">Pending</TabsTrigger>
            <TabsTrigger value="approved" className="text-xs">Approved</TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-350px)]">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-xs">
              No {filter !== "all" ? filter : ""} requests found
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 border-b last:border-0 cursor-pointer hover:bg-gray-50 text-sm ${
                  selectedItem?.id === item.id ? "bg-blue-50" : ""
                }`}
                onClick={() => onSelectItem(item)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{item.title}</div>
                  <Badge variant="outline" className="text-xs">${item.amount.toLocaleString()}</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {item.submitter.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-xs">
                      {item.department}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-muted-foreground text-xs">
                      {item.dateSubmitted}
                    </div>
                    <Badge
                      className={
                        item.status === "approved"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-0.5"
                          : item.status === "rejected"
                          ? "bg-red-100 text-red-800 hover:bg-red-100 text-xs px-2 py-0.5"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs px-2 py-0.5"
                      }
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
