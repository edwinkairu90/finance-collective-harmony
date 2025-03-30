
import { ApprovalItem } from "@/types/approval";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PendingApprovalsListProps {
  items: ApprovalItem[];
  selectedItem: ApprovalItem | null;
  onSelectItem: (item: ApprovalItem) => void;
}

export const PendingApprovalsList = ({
  items,
  selectedItem,
  onSelectItem,
}: PendingApprovalsListProps) => {
  return (
    <Card>
      <CardHeader className="bg-amber-50 border-b">
        <CardTitle className="flex justify-between text-xl">
          <span>Pending</span>
          <Badge variant="outline">{items.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-300px)]">
          {items.map((item) => (
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
