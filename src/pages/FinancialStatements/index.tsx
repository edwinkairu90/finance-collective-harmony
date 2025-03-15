
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PLStatement } from "./PLStatement";
import { BalanceSheet } from "./BalanceSheet";
import { CashflowStatement } from "./CashflowStatement";
import { QuarterlyComparison } from "./QuarterlyComparison";

const FinancialStatements = () => {
  const [activeTab, setActiveTab] = useState("pl");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Financial Statements</h2>
        <p className="text-muted-foreground">
          View and analyze quarterly financial statements for your organization
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Reports</CardTitle>
          <CardDescription>
            Generate and view quarterly statement reports for your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="pl">Profit & Loss</TabsTrigger>
              <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
              <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
              <TabsTrigger value="comparison">QoQ Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pl">
              <PLStatement />
            </TabsContent>
            
            <TabsContent value="balance">
              <BalanceSheet />
            </TabsContent>
            
            <TabsContent value="cashflow">
              <CashflowStatement />
            </TabsContent>
            
            <TabsContent value="comparison">
              <QuarterlyComparison />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialStatements;
