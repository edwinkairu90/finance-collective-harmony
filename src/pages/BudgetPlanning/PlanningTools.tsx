
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const PlanningTools = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Planning Tools</CardTitle>
        <CardDescription>Utilize our planning tools to optimize your budget</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PlanningToolCard 
              title="Scenario Planning" 
              description="Create different budget scenarios to plan for various business conditions." 
            />
            <PlanningToolCard 
              title="Forecasting" 
              description="Predict future budget needs based on historical data and trends." 
            />
            <PlanningToolCard 
              title="Variance Analysis" 
              description="Compare actual spending to budgeted amounts and analyze the differences." 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface PlanningToolCardProps {
  title: string;
  description: string;
}

const PlanningToolCard = ({ title, description }: PlanningToolCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Launch Tool</Button>
      </CardFooter>
    </Card>
  );
};
