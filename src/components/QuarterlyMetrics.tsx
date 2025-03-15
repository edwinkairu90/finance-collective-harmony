
import { QuarterlyMetricsHeader } from "./quarterly/QuarterlyMetricsHeader";
import { QuarterlyPerformanceTabs } from "./quarterly/QuarterlyPerformanceTabs";
import { getLatestData } from "./quarterly/QuarterlyData";

export const QuarterlyMetrics = () => {
  // Get the latest quarter data
  const {
    latestRevenue,
    latestMargin,
    latestHeadcount,
    latestCashFlow,
    revenueQoQChange,
    headcountQoQChange,
    cashFlowQoQChange
  } = getLatestData();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Quarterly Performance</h2>
      
      {/* Top metrics cards */}
      <QuarterlyMetricsHeader
        latestRevenue={latestRevenue}
        latestMargin={latestMargin}
        latestHeadcount={latestHeadcount}
        latestCashFlow={latestCashFlow}
        revenueQoQChange={revenueQoQChange}
        headcountQoQChange={headcountQoQChange}
        cashFlowQoQChange={cashFlowQoQChange}
      />
      
      {/* Tabs for different quarterly metrics */}
      <QuarterlyPerformanceTabs />
    </div>
  );
};
