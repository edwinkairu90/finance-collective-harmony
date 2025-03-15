import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, CalendarIcon, TrendingUpIcon, TrendingDownIcon, Users } from "lucide-react";

// Mock data for quarterly metrics
const quarterlyData = {
  revenue: [
    { quarter: 'Q1 2023', actual: 18500000, target: 18000000, growth: 12.5 },
    { quarter: 'Q2 2023', actual: 19200000, target: 19000000, growth: 8.7 },
    { quarter: 'Q3 2023', actual: 20100000, target: 20000000, growth: 7.2 },
    { quarter: 'Q4 2023', actual: 21500000, target: 21000000, growth: 9.3 },
    { quarter: 'Q1 2024', actual: 22100000, target: 22000000, growth: 6.8 },
  ],
  margin: [
    { quarter: 'Q1 2023', gross: 68, operating: 24, net: 15 },
    { quarter: 'Q2 2023', gross: 69, operating: 25, net: 16 },
    { quarter: 'Q3 2023', gross: 70, operating: 26, net: 16 },
    { quarter: 'Q4 2023', gross: 71, operating: 27, net: 17 },
    { quarter: 'Q1 2024', gross: 72, operating: 28, net: 18 },
  ],
  headcount: [
    { quarter: 'Q1 2023', sales: 45, engineering: 75, marketing: 32, operations: 24, total: 176 },
    { quarter: 'Q2 2023', sales: 48, engineering: 80, marketing: 34, operations: 25, total: 187 },
    { quarter: 'Q3 2023', sales: 52, engineering: 85, marketing: 36, operations: 27, total: 200 },
    { quarter: 'Q4 2023', sales: 55, engineering: 92, marketing: 38, operations: 28, total: 213 },
    { quarter: 'Q1 2024', sales: 58, engineering: 95, marketing: 40, operations: 30, total: 223 },
  ],
  cashFlow: [
    { quarter: 'Q1 2023', operatingCF: 3200000, investingCF: -1500000, financingCF: -800000, netChange: 900000 },
    { quarter: 'Q2 2023', operatingCF: 3400000, investingCF: -1700000, financingCF: -900000, netChange: 800000 },
    { quarter: 'Q3 2023', operatingCF: 3600000, investingCF: -1800000, financingCF: -700000, netChange: 1100000 },
    { quarter: 'Q4 2023', operatingCF: 3900000, investingCF: -2000000, financingCF: -1000000, netChange: 900000 },
    { quarter: 'Q1 2024', operatingCF: 4100000, investingCF: -1900000, financingCF: -1100000, netChange: 1100000 },
  ],
};

// Chart data for quarterly revenue
const revenueChartData = quarterlyData.revenue.map(item => ({
  quarter: item.quarter,
  Actual: item.actual / 1000000, // Convert to millions for display
  Target: item.target / 1000000,
}));

// Chart data for quarterly margins
const marginChartData = quarterlyData.margin.map(item => ({
  quarter: item.quarter,
  "Gross Margin": item.gross,
  "Operating Margin": item.operating,
  "Net Margin": item.net,
}));

export const QuarterlyMetrics = () => {
  // Get the latest quarter data
  const latestRevenue = quarterlyData.revenue[quarterlyData.revenue.length - 1];
  const latestMargin = quarterlyData.margin[quarterlyData.margin.length - 1];
  const latestHeadcount = quarterlyData.headcount[quarterlyData.headcount.length - 1];
  const latestCashFlow = quarterlyData.cashFlow[quarterlyData.cashFlow.length - 1];
  
  // Calculate QoQ changes
  const previousRevenue = quarterlyData.revenue[quarterlyData.revenue.length - 2];
  const revenueQoQChange = ((latestRevenue.actual - previousRevenue.actual) / previousRevenue.actual) * 100;
  
  const previousHeadcount = quarterlyData.headcount[quarterlyData.headcount.length - 2];
  const headcountQoQChange = ((latestHeadcount.total - previousHeadcount.total) / previousHeadcount.total) * 100;
  
  const previousCashFlow = quarterlyData.cashFlow[quarterlyData.cashFlow.length - 2];
  const cashFlowQoQChange = ((latestCashFlow.operatingCF - previousCashFlow.operatingCF) / previousCashFlow.operatingCF) * 100;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Quarterly Performance</h2>
      
      {/* Top metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#00a9ae]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Q1 2024 Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${(latestRevenue.actual / 1000000).toFixed(1)}M</div>
              <div className="flex items-center text-emerald-500 text-sm">
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                {revenueQoQChange.toFixed(1)}%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">vs previous quarter</div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#3ac3d6] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4" />
              Gross Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{latestMargin.gross}%</div>
              <div className="flex items-center text-green-200 text-sm">
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                1.0%
              </div>
            </div>
            <div className="text-xs text-blue-100 mt-1">vs previous quarter</div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#00a9ae]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Headcount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{latestHeadcount.total}</div>
              <div className="flex items-center text-emerald-500 text-sm">
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                {headcountQoQChange.toFixed(1)}%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">vs previous quarter</div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#3ac3d6] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4" />
              Operating Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${(latestCashFlow.operatingCF / 1000000).toFixed(1)}M</div>
              <div className="flex items-center text-green-200 text-sm">
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                {cashFlowQoQChange.toFixed(1)}%
              </div>
            </div>
            <div className="text-xs text-blue-100 mt-1">vs previous quarter</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different quarterly metrics */}
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
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`$${value}M`, undefined]} />
                    <Legend />
                    <Bar dataKey="Actual" fill="#0ea5e9" />
                    <Bar dataKey="Target" fill="#94a3b8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead className="text-right">Actual</TableHead>
                      <TableHead className="text-right">Target</TableHead>
                      <TableHead className="text-right">vs Target</TableHead>
                      <TableHead className="text-right">YoY Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quarterlyData.revenue.slice().reverse().map((quarter) => (
                      <TableRow key={quarter.quarter}>
                        <TableCell>{quarter.quarter}</TableCell>
                        <TableCell className="text-right">${(quarter.actual / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-right">${(quarter.target / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={quarter.actual >= quarter.target ? "outline" : "destructive"} className="font-normal">
                            {(((quarter.actual - quarter.target) / quarter.target) * 100).toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            {quarter.growth >= 0 ? 
                              <TrendingUpIcon className="mr-1 h-4 w-4 text-emerald-500" /> : 
                              <TrendingDownIcon className="mr-1 h-4 w-4 text-red-500" />}
                            {quarter.growth}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="margins" className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marginChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis label={{ value: 'Margin (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                    <Legend />
                    <Bar dataKey="Gross Margin" fill="#0ea5e9" />
                    <Bar dataKey="Operating Margin" fill="#8884d8" />
                    <Bar dataKey="Net Margin" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead className="text-right">Gross Margin</TableHead>
                      <TableHead className="text-right">Operating Margin</TableHead>
                      <TableHead className="text-right">Net Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quarterlyData.margin.slice().reverse().map((quarter) => (
                      <TableRow key={quarter.quarter}>
                        <TableCell>{quarter.quarter}</TableCell>
                        <TableCell className="text-right">{quarter.gross}%</TableCell>
                        <TableCell className="text-right">{quarter.operating}%</TableCell>
                        <TableCell className="text-right">{quarter.net}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="headcount" className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                      <TableHead className="text-right">Engineering</TableHead>
                      <TableHead className="text-right">Marketing</TableHead>
                      <TableHead className="text-right">Operations</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quarterlyData.headcount.slice().reverse().map((quarter) => (
                      <TableRow key={quarter.quarter}>
                        <TableCell>{quarter.quarter}</TableCell>
                        <TableCell className="text-right">{quarter.sales}</TableCell>
                        <TableCell className="text-right">{quarter.engineering}</TableCell>
                        <TableCell className="text-right">{quarter.marketing}</TableCell>
                        <TableCell className="text-right">{quarter.operations}</TableCell>
                        <TableCell className="text-right font-medium">{quarter.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="cash-flow" className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead className="text-right">Operating CF</TableHead>
                      <TableHead className="text-right">Investing CF</TableHead>
                      <TableHead className="text-right">Financing CF</TableHead>
                      <TableHead className="text-right">Net Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quarterlyData.cashFlow.slice().reverse().map((quarter) => (
                      <TableRow key={quarter.quarter}>
                        <TableCell>{quarter.quarter}</TableCell>
                        <TableCell className="text-right">${(quarter.operatingCF / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-right">${(quarter.investingCF / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-right">${(quarter.financingCF / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className={`text-right font-medium ${quarter.netChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          ${(quarter.netChange / 1000000).toFixed(1)}M
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
