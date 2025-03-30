
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApprovalItem } from "../../../types/approval";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <Tabs defaultValue="pending">
          <TabsList className="w-full grid grid-cols-4 rounded-none bg-muted/20 p-0">
            <TabsTrigger value="all" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary py-3">All</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary py-3">Pending</TabsTrigger>
            <TabsTrigger value="approved" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary py-3">Approved</TabsTrigger>
            <TabsTrigger value="rejected" className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary py-3">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[calc(100vh-380px)]">
              {items.map((item) => (
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
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
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
          </TabsContent>
          
          <TabsContent value="approved" className="mt-0">
            <ScrollArea className="h-[calc(100vh-380px)]">
              {items.filter(item => item.status === "approved").map((item) => (
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
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-0">
            <ScrollArea className="h-[calc(100vh-380px)]">
              {items.filter(item => item.status === "rejected").map((item) => (
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
