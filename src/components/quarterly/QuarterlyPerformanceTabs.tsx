
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueTab } from "./RevenueTab";
import { MarginsTab } from "./MarginsTab";
import { HeadcountTab } from "./HeadcountTab";
import { CashFlowTab } from "./CashFlowTab";

export const QuarterlyPerformanceTabs = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quarterly Performance Trends</CardTitle>
        <CardDescription>Key metrics over the last 5 quarters</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="margins">Margins</TabsTrigger>
            <TabsTrigger value="headcount">Headcount</TabsTrigger>
            <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="space-y-4">
            <RevenueTab />
          </TabsContent>
          
          <TabsContent value="margins" className="space-y-4">
            <MarginsTab />
          </TabsContent>
          
          <TabsContent value="headcount" className="space-y-4">
            <HeadcountTab />
          </TabsContent>
          
          <TabsContent value="cash-flow" className="space-y-4">
            <CashFlowTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
