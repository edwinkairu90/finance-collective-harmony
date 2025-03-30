
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { 
  revenueData, 
  opexData, 
  bvaData, 
  getTotalOpex, 
  getTotalBudget, 
  getTotalActual,
  getAnnualRevenue
} from "@/components/dashboard/dashboardData";
import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OpexBarChart } from "@/components/dashboard/OpexBarChart";
import { BVASummaryTable } from "@/components/dashboard/BVASummaryTable";
import { BVAVarianceChart } from "@/components/dashboard/BVAVarianceChart";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Calculate values for KPI cards
  const totalOpex = getTotalOpex();
  const annualRevenue = getAnnualRevenue();
  
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
        <Button 
          onClick={showNotification}
          className="bg-[#50C2A0] hover:bg-[#3BA989] text-white"
        >
          Show Sample Notification
        </Button>
      </div>

      {/* KPI Cards - Top Row */}
      <KPICards />

      {/* Charts - Middle Row */}
      <div className="grid grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <OpexBarChart />
      </div>

      {/* Tables - Bottom Row */}
      <div className="grid grid-cols-2 gap-6">
        <BVASummaryTable />
        <BVAVarianceChart />
      </div>
    </div>
  );
};

export default Dashboard;
