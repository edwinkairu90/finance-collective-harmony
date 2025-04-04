
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const BVASummaryTable = () => {
  // Format data for BVA table
  const bvaTableData = [
    { name: "Salaries", actuals: "(70M)", forecast: "(84M)", variance: "$14M", variancePercent: "17%" },
    { name: "Sales Commissions", actuals: "(9.3M)", forecast: "(9.7M)", variance: "$0.4M", variancePercent: "4%" },
    { name: "Bonus", actuals: "(12M)", forecast: "(13M)", variance: "$1M", variancePercent: "8%" },
    { name: "- Gross Profit", actuals: "$90M", forecast: "$120M", variance: "(30M)", variancePercent: "(25%)" },
    { name: "+ Operating Expenses", actuals: "(80M)", forecast: "(90M)", variance: "$10M", variancePercent: "9%" },
    { name: "= EBITDA", actuals: "$10M", forecast: "$30M", variance: "(20)", variancePercent: "(70%)" },
    { name: "Depreciation & Amortization", actuals: "(30M)", forecast: "(28M)", variance: "$2M", variancePercent: "8%" },
  ];

  return (
    <Card>
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-sm">BVA Summary YTD</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px] py-2"></TableHead>
              <TableHead className="text-right py-2">Actuals</TableHead>
              <TableHead className="text-right py-2">Forecast</TableHead>
              <TableHead className="text-right py-2">Variance</TableHead>
              <TableHead className="text-right py-2">Variance %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bvaTableData.map((row, index) => (
              <TableRow 
                key={index}
                className={row.name === "= EBITDA" ? "bg-blue-100" : ""}
              >
                <TableCell className="font-medium py-1.5">{row.name}</TableCell>
                <TableCell className="text-right py-1.5">{row.actuals}</TableCell>
                <TableCell className="text-right py-1.5">{row.forecast}</TableCell>
                <TableCell className="text-right py-1.5">{row.variance}</TableCell>
                <TableCell className="text-right py-1.5">{row.variancePercent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
