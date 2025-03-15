
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { departments } from "./BudgetData";

export const DepartmentBudgets = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Department Budgets</CardTitle>
          <CardDescription>Manage budgets by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4 items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select defaultValue="2025">
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mb-0.5">View Budget</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <MarketingBudget />
    </>
  );
};

const MarketingBudget = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing Department Budget</CardTitle>
        <CardDescription>FY 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="digital-advertising">Digital Advertising</Label>
              <Input id="digital-advertising" type="number" defaultValue="120000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content-creation">Content Creation</Label>
              <Input id="content-creation" type="number" defaultValue="45000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="events">Events</Label>
              <Input id="events" type="number" defaultValue="60000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-development">Brand Development</Label>
              <Input id="brand-development" type="number" defaultValue="25000" />
            </div>
          </div>
          <div className="text-right text-sm">
            Total: $250,000
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};
