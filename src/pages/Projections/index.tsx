import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { UploadIcon, SparklesIcon, TrendingUpIcon, TrendingDownIcon, DownloadIcon, SendIcon, BotIcon, UserIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Area,
  ComposedChart,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";
import { sampleHistorical, currentBudget2026, categoryNames, type HistoricalRow } from "./data/sampleHistorical";
import { forecastAll, sliceHorizon, type CategoryForecast } from "./utils/forecast";
import { parseCSV, csvTemplate } from "./utils/csv";

type Period = "Quarter" | "H1" | "H2" | "Year";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtPct = (n: number) => `${(n * 100).toFixed(1)}%`;

export default function Projections() {
  const [data, setData] = useState<HistoricalRow[]>(sampleHistorical);
  const [dataSource, setDataSource] = useState<"sample" | "upload">("sample");
  const [period, setPeriod] = useState<Period>("Year");
  const [activeCategory, setActiveCategory] = useState<string>("Revenue");

  const forecasts = useMemo<CategoryForecast[]>(() => forecastAll(data, 12), [data]);
  const byCategory = useMemo(() => {
    const m: Record<string, CategoryForecast> = {};
    forecasts.forEach((f) => (m[f.category] = f));
    return m;
  }, [forecasts]);

  const horizonLabel = period === "Quarter" ? "Next Quarter (3 mo)" : period === "H1" ? "H1 2026" : period === "H2" ? "H2 2026" : "Full Year 2026";

  const handleUpload = async (file: File) => {
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      if (rows.length < 12) throw new Error("Need at least 12 months of data");
      setData(rows);
      setDataSource("upload");
      toast.success(`Loaded ${rows.length} rows from ${file.name}`);
    } catch (e: any) {
      toast.error(e.message || "Failed to parse CSV");
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate()], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historical_actuals_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Topline summary across all revenue/cost
  const summary = useMemo(() => {
    const revFc = byCategory["Revenue"];
    if (!revFc) return null;
    const horizon = sliceHorizon(revFc.forecast, period);
    const projectedRevenue = horizon.reduce((a, b) => a + b.value, 0);
    const costCats = categoryNames.filter((c) => c !== "Revenue");
    const projectedCosts = costCats.reduce((sum, c) => {
      const fc = byCategory[c];
      if (!fc) return sum;
      return sum + sliceHorizon(fc.forecast, period).reduce((a, b) => a + b.value, 0);
    }, 0);
    return {
      revenue: projectedRevenue,
      costs: projectedCosts,
      profit: projectedRevenue - projectedCosts,
      margin: projectedRevenue ? (projectedRevenue - projectedCosts) / projectedRevenue : 0,
      revGrowth: revFc.trendPct,
      r2: revFc.rSquared,
    };
  }, [byCategory, period]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-primary" /> Projections
          </h1>
          <p className="text-muted-foreground text-sm">
            Predict future performance from historical actuals, compare to plan, and explore scenarios.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={dataSource === "sample" ? "secondary" : "default"}>
            {dataSource === "sample" ? "Sample data (24 mo)" : `Uploaded data (${data.length} rows)`}
          </Badge>
          <Select value={period} onValueChange={(v: Period) => setPeriod(v)}>
            <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Quarter">Next Quarter</SelectItem>
              <SelectItem value="H1">Next H1</SelectItem>
              <SelectItem value="H2">Next H2</SelectItem>
              <SelectItem value="Year">Next Full Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label={`Projected Revenue · ${horizonLabel}`} value={fmt(summary.revenue)} sub={`Implied trend ${fmtPct(summary.revGrowth)}/yr`} positive />
          <StatCard label="Projected Costs" value={fmt(summary.costs)} sub="COGS + Opex + Payroll + Marketing" />
          <StatCard label="Projected Profit" value={fmt(summary.profit)} sub={`Margin ${fmtPct(summary.margin)}`} positive={summary.profit > 0} />
          <StatCard label="Model Confidence" value={fmtPct(summary.r2)} sub="R² of revenue trend fit" />
        </div>
      )}

      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="upload">Data</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="gap">Gap Analysis</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="ai">Ask AI</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historical actuals</CardTitle>
              <CardDescription>
                The prototype is preloaded with 24 months of sample actuals so you can explore the flow immediately.
                Upload your own CSV to project against your numbers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Input type="file" accept=".csv" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} className="max-w-sm" />
                <Button variant="outline" onClick={downloadTemplate}>
                  <DownloadIcon className="w-4 h-4 mr-2" /> Download template
                </Button>
                {dataSource === "upload" && (
                  <Button variant="ghost" onClick={() => { setData(sampleHistorical); setDataSource("sample"); toast.success("Restored sample dataset"); }}>
                    Reset to sample
                  </Button>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                CSV format: <code>month,category,amount</code> · month as <code>YYYY-MM</code> · minimum 12 months, 24+ recommended for seasonality.
              </div>
              <DataPreview data={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {categoryNames.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <ForecastChart fc={byCategory[activeCategory]} period={period} />
          <ForecastTable forecasts={forecasts} period={period} />
        </TabsContent>

        <TabsContent value="gap" className="mt-4">
          <GapAnalysis forecasts={forecasts} period={period} />
        </TabsContent>

        <TabsContent value="insights" className="mt-4">
          <InsightsPanel forecasts={forecasts} period={period} />
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <AskAI forecasts={forecasts} period={period} summary={summary} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ label, value, sub, positive }: { label: string; value: string; sub?: string; positive?: boolean }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className={`text-2xl font-bold mt-1 ${positive === true ? "text-green-600" : positive === false ? "text-red-600" : ""}`}>{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
      </CardContent>
    </Card>
  );
}

function DataPreview({ data }: { data: HistoricalRow[] }) {
  const months = Array.from(new Set(data.map((d) => d.month))).sort();
  const cats = Array.from(new Set(data.map((d) => d.category)));
  return (
    <div className="text-xs text-muted-foreground">
      <div>{months.length} months · {cats.length} categories · {data.length} rows</div>
      <div className="mt-1">Range: {months[0]} → {months[months.length - 1]}</div>
    </div>
  );
}

function ForecastChart({ fc, period }: { fc?: CategoryForecast; period: Period }) {
  if (!fc) return null;
  const horizon = sliceHorizon(fc.forecast, period);
  const data = [
    ...fc.history.map((h) => ({ month: h.month, actual: h.value })),
    ...horizon.map((f) => ({ month: f.month, forecast: f.value, low: f.low, high: f.high })),
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{fc.category} — projection</CardTitle>
        <CardDescription>
          Implied annual trend {fmtPct(fc.trendPct)} · Model fit R² {fmtPct(fc.rSquared)} · Shaded band = 95% confidence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
              <RTooltip formatter={(v: any) => fmt(Number(v))} />
              <Legend />
              <Area type="monotone" dataKey="high" stroke="none" fill="hsl(var(--primary))" fillOpacity={0.08} />
              <Area type="monotone" dataKey="low" stroke="none" fill="hsl(var(--background))" fillOpacity={1} />
              <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Actual" />
              <Line type="monotone" dataKey="forecast" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Forecast" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function ForecastTable({ forecasts, period }: { forecasts: CategoryForecast[]; period: Period }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast by category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Category</th>
                <th className="text-right p-2">Projected total</th>
                <th className="text-right p-2">Low (95%)</th>
                <th className="text-right p-2">High (95%)</th>
                <th className="text-right p-2">Implied growth</th>
                <th className="text-right p-2">R²</th>
              </tr>
            </thead>
            <tbody>
              {forecasts.map((f) => {
                const h = sliceHorizon(f.forecast, period);
                const total = h.reduce((a, b) => a + b.value, 0);
                const low = h.reduce((a, b) => a + b.low, 0);
                const high = h.reduce((a, b) => a + b.high, 0);
                return (
                  <tr key={f.category} className="border-b">
                    <td className="p-2 font-medium">{f.category}</td>
                    <td className="text-right p-2">{fmt(total)}</td>
                    <td className="text-right p-2 text-muted-foreground">{fmt(low)}</td>
                    <td className="text-right p-2 text-muted-foreground">{fmt(high)}</td>
                    <td className="text-right p-2">{fmtPct(f.trendPct)}</td>
                    <td className="text-right p-2">{fmtPct(f.rSquared)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function GapAnalysis({ forecasts, period }: { forecasts: CategoryForecast[]; period: Period }) {
  const monthsForPeriod = period === "Quarter" ? [0, 1, 2] : period === "H1" ? [0, 1, 2, 3, 4, 5] : period === "H2" ? [6, 7, 8, 9, 10, 11] : Array.from({ length: 12 }, (_, i) => i);
  const rows = forecasts.map((f) => {
    const forecastTotal = sliceHorizon(f.forecast, period).reduce((a, b) => a + b.value, 0);
    const budgetArr = currentBudget2026[f.category] || [];
    const budgetTotal = monthsForPeriod.reduce((a, i) => a + (budgetArr[i] || 0), 0);
    const variance = forecastTotal - budgetTotal;
    const variancePct = budgetTotal ? variance / budgetTotal : 0;
    return { category: f.category, forecastTotal, budgetTotal, variance, variancePct };
  });

  const chartData = rows.map((r) => ({ category: r.category, Budget: r.budgetTotal, Forecast: r.forecastTotal }));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Forecast vs Current Budget (2026)</CardTitle>
          <CardDescription>Gaps highlight where projected performance diverges from the approved plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <RTooltip formatter={(v: any) => fmt(Number(v))} />
                <Legend />
                <Bar dataKey="Budget" fill="hsl(var(--muted-foreground))" />
                <Bar dataKey="Forecast" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Category</th>
                <th className="text-right p-2">Budget</th>
                <th className="text-right p-2">Forecast</th>
                <th className="text-right p-2">Variance</th>
                <th className="text-right p-2">Var %</th>
                <th className="text-left p-2 pl-6">Signal</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const favorable = r.category === "Revenue" ? r.variance > 0 : r.variance < 0;
                return (
                  <tr key={r.category} className="border-b">
                    <td className="p-2 font-medium">{r.category}</td>
                    <td className="text-right p-2">{fmt(r.budgetTotal)}</td>
                    <td className="text-right p-2">{fmt(r.forecastTotal)}</td>
                    <td className={`text-right p-2 ${favorable ? "text-green-600" : "text-red-600"}`}>{fmt(r.variance)}</td>
                    <td className={`text-right p-2 ${favorable ? "text-green-600" : "text-red-600"}`}>{fmtPct(r.variancePct)}</td>
                    <td className="p-2 pl-6">
                      <Badge variant={favorable ? "default" : "destructive"} className="gap-1">
                        {favorable ? <TrendingUpIcon className="w-3 h-3" /> : <TrendingDownIcon className="w-3 h-3" />}
                        {favorable ? "Favorable" : "Unfavorable"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function InsightsPanel({ forecasts, period }: { forecasts: CategoryForecast[]; period: Period }) {
  const rev = forecasts.find((f) => f.category === "Revenue");
  const insights: { title: string; body: string; tone: "positive" | "warning" | "neutral" }[] = [];

  if (rev) {
    insights.push({
      title: `Revenue trend: ${fmtPct(rev.trendPct)} annualized`,
      body: `The linear fit explains ${fmtPct(rev.rSquared)} of historical variance, indicating a ${rev.rSquared > 0.8 ? "strong" : rev.rSquared > 0.5 ? "moderate" : "weak"} pattern. The forecast assumes the underlying growth and seasonality persist.`,
      tone: rev.trendPct > 0 ? "positive" : "warning",
    });
    const peakIdx = rev.seasonality.indexOf(Math.max(...rev.seasonality));
    const lowIdx = rev.seasonality.indexOf(Math.min(...rev.seasonality));
    const monthName = (i: number) => new Date(2024, i, 1).toLocaleString("en", { month: "long" });
    insights.push({
      title: `Seasonality concentrated in ${monthName(peakIdx)}`,
      body: `Revenue peaks in ${monthName(peakIdx)} (index ${rev.seasonality[peakIdx].toFixed(2)}) and bottoms in ${monthName(lowIdx)} (index ${rev.seasonality[lowIdx].toFixed(2)}). Plan working capital, hiring, and inventory around this cycle.`,
      tone: "neutral",
    });
  }

  const mkt = forecasts.find((f) => f.category === "Marketing");
  if (mkt && rev) {
    const horizonMkt = sliceHorizon(mkt.forecast, period).reduce((a, b) => a + b.value, 0);
    const horizonRev = sliceHorizon(rev.forecast, period).reduce((a, b) => a + b.value, 0);
    const ratio = horizonRev ? horizonMkt / horizonRev : 0;
    insights.push({
      title: `Marketing is projected at ${fmtPct(ratio)} of revenue`,
      body: `If revenue growth depends on demand generation, watch this ratio. A pull-back in marketing spend will likely compress the next two quarters of revenue based on observed lag.`,
      tone: ratio > 0.1 ? "warning" : "neutral",
    });
  }

  insights.push({
    title: "Key activities to hit the projection",
    body: "1) Lock pipeline coverage to ≥3× quota by quarter start. 2) Hold COGS ratio within ±100bps of historical average. 3) Front-load marketing into pre-peak months. 4) Re-forecast monthly once actuals close.",
    tone: "neutral",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((i, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <SparklesIcon className={`w-4 h-4 ${i.tone === "positive" ? "text-green-600" : i.tone === "warning" ? "text-amber-600" : "text-primary"}`} />
              {i.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{i.body}</CardContent>
        </Card>
      ))}
    </div>
  );
}

function AskAI({ forecasts, period, summary }: { forecasts: CategoryForecast[]; period: Period; summary: any }) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi — I can answer questions about your projections, assumptions, gaps versus plan, and what to watch. Try: \"What drives the next quarter forecast?\" or \"Why is marketing flagged?\"" },
  ]);
  const [input, setInput] = useState("");

  const respond = (q: string): string => {
    const ql = q.toLowerCase();
    const rev = forecasts.find((f) => f.category === "Revenue");
    if (ql.includes("driver") || ql.includes("drive") || ql.includes("assumption")) {
      return `The forecast for ${period === "Year" ? "the next year" : "the next " + period} combines (1) a linear trend of ${fmtPct(rev?.trendPct || 0)} annualized fit on 24 months of actuals, and (2) a multiplicative monthly seasonal index. Confidence: R² ${fmtPct(rev?.rSquared || 0)}. Bands widen ~4% per month out.`;
    }
    if (ql.includes("gap") || ql.includes("budget") || ql.includes("plan")) {
      return `Across the horizon, projected revenue is ${fmt(summary?.revenue || 0)} vs the 2026 plan. Costs project to ${fmt(summary?.costs || 0)}. Check the Gap Analysis tab — favorable variances are highlighted in green, unfavorable in red.`;
    }
    if (ql.includes("marketing")) {
      const mkt = forecasts.find((f) => f.category === "Marketing");
      return `Marketing projects ${fmt(sliceHorizon(mkt!.forecast, period).reduce((a, b) => a + b.value, 0))} for the horizon, with peaks aligned to historical demand-gen pushes. Pulling it back tends to soften revenue 1-2 quarters later.`;
    }
    if (ql.includes("risk") || ql.includes("watch")) {
      return `Top risks: (1) seasonality slips a month, distorting Q1; (2) cost categories outpace revenue growth, compressing margin; (3) the model has weaker fit for non-revenue items, so use the confidence bands when planning.`;
    }
    if (ql.includes("quarter") || ql.includes("next q")) {
      const fc = rev ? sliceHorizon(rev.forecast, "Quarter") : [];
      const total = fc.reduce((a, b) => a + b.value, 0);
      return `Next-quarter revenue projects to ${fmt(total)} (${fc.map((f) => `${f.month}: ${fmt(f.value)}`).join("; ")}).`;
    }
    return `Based on your historicals, projected revenue for ${period === "Year" ? "the year" : period} is ${fmt(summary?.revenue || 0)} with a projected margin of ${fmtPct(summary?.margin || 0)}. Ask about drivers, gaps, marketing, risks, or a specific period.`;
  };

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [...m, { role: "user", content: q }, { role: "assistant", content: respond(q) }]);
    setInput("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BotIcon className="w-4 h-4" /> Ask AI about your projections</CardTitle>
        <CardDescription>Prototype assistant — answers questions about drivers, assumptions, gaps, and risks.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><BotIcon className="w-4 h-4 text-primary" /></div>}
              <div className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{m.content}</div>
              {m.role === "user" && <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0"><UserIcon className="w-4 h-4" /></div>}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about the projection..." className="min-h-[44px]" onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
          <Button onClick={send}><SendIcon className="w-4 h-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {["What drives the next quarter forecast?", "Where are the biggest gaps to plan?", "Why is marketing flagged?", "What are the risks?"].map((q) => (
            <Button key={q} variant="outline" size="sm" onClick={() => { setInput(q); }}>{q}</Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
