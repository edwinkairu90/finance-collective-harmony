
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { QuarterlyMetrics } from "@/components/QuarterlyMetrics";
import { KPISummary } from "@/components/dashboard/KPISummary";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OpexSummary } from "@/components/dashboard/OpexSummary";
import { BVASummary } from "@/components/dashboard/BVASummary";
import { 
  revenueData, 
  opexData, 
  bvaData, 
  getTotalOpex, 
  getTotalBudget, 
  getTotalActual, 
  getTotalVariance, 
  getVariancePercentage 
} from "@/components/dashboard/dashboardData";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Calculate values for KPI cards
  const totalOpex = getTotalOpex();
  const totalBudget = getTotalBudget();
  const totalActual = getTotalActual();
  const totalVariance = getTotalVariance();
  const variancePercentage = getVariancePercentage();

  const showNotification = () => {
    toast({
      title: "Budget Reminder",
      description: "Q3 budget planning cycle starts next week. Please prepare your department inputs.",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
        <Button onClick={showNotification}>
          Show Sample Notification
        </Button>
      </div>

      {/* KPI Summary Cards */}
      <KPISummary
        annualRevenue="$76.5M"
        revenueGrowth={8.2}
        totalOpex={totalOpex}
        opexGrowth={3.5}
        totalVariance={totalVariance}
        variancePercentage={variancePercentage}
      />

      {/* Quarterly Metrics Section */}
      <QuarterlyMetrics />

      {/* Revenue Projection vs Actuals */}
      <RevenueChart data={revenueData} />

      {/* Opex Summary and BVA Summary in two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Opex Summary */}
        <OpexSummary data={opexData} totalOpex={totalOpex} />

        {/* BVA Summary */}
        <BVASummary 
          data={bvaData} 
          totalBudget={totalBudget} 
          totalActual={totalActual} 
          totalVariance={totalVariance} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
