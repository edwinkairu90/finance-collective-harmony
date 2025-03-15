
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const SubmitBudgetTab: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Data Submitted",
      description: "Your budget request has been submitted successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Department Budget Request</CardTitle>
        <CardDescription>Enter your department's financial planning data</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <select className="w-full p-2 border rounded-md" id="department">
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="engineering">Engineering</option>
                <option value="finance">Finance</option>
                <option value="hr">Human Resources</option>
                <option value="support">Customer Support</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <select className="w-full p-2 border rounded-md" id="period">
                <option value="Q1-2025">Q1 2025</option>
                <option value="Q2-2025">Q2 2025</option>
                <option value="Q3-2025" selected>Q3 2025</option>
                <option value="Q4-2025">Q4 2025</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Current Quarter Projections</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue</Label>
                <Input id="revenue" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expenses">Expenses</Label>
                <Input id="expenses" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headcount">Headcount</Label>
                <Input id="headcount" type="number" placeholder="0" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Major Expense Categories</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="labor">Labor</Label>
                <Input id="labor" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="materials">Materials/Supplies</Label>
                <Input id="materials" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services">External Services</Label>
                <Input id="services" type="number" placeholder="0.00" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" placeholder="Enter any additional context or notes here..." className="min-h-[100px]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Upload Supporting Documents</Label>
            <Input id="file" type="file" />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline">Save Draft</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
