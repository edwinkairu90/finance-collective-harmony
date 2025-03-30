
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApprovalItem } from "../../../types/approval";

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
  const pendingItems = items.filter(item => item.status === "pending");
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-amber-50 pb-0 pt-4">
        <CardTitle className="flex justify-between text-base">
          <span className="text-xl font-bold">Approval Requests</span>
          <Badge variant="outline" className="text-xs rounded-full px-2 py-1 bg-white">{pendingItems.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-380px)]">
          {pendingItems.map((item) => (
            <div
              key={item.id}
              className={`p-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 text-xs ${
                selectedItem?.id === item.id ? "bg-blue-50" : ""
              }`}
              onClick={() => onSelectItem(item)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{item.title}</div>
                <Badge variant="outline" className="text-xs">${item.amount.toLocaleString()}</Badge>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs">
                      {item.submitter.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-muted-foreground">
                    {item.department}
                  </span>
                </div>
                <div className="text-muted-foreground text-xs">
                  {item.dateSubmitted}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
