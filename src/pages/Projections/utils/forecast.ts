import type { HistoricalRow } from "../data/sampleHistorical";

export type MonthlyForecast = {
  month: string; // YYYY-MM
  value: number;
  low: number;
  high: number;
};

export type CategoryForecast = {
  category: string;
  history: { month: string; value: number }[];
  forecast: MonthlyForecast[];
  trendPct: number; // annualized growth implied by linear trend
  seasonality: number[]; // 12 indices
  rSquared: number;
};

function linearRegression(y: number[]) {
  const n = y.length;
  const xs = Array.from({ length: n }, (_, i) => i);
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - meanX) * (y[i] - meanY);
    den += (xs[i] - meanX) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = meanY - slope * meanX;
  // R^2
  let ssRes = 0, ssTot = 0;
  for (let i = 0; i < n; i++) {
    const pred = intercept + slope * i;
    ssRes += (y[i] - pred) ** 2;
    ssTot += (y[i] - meanY) ** 2;
  }
  const r2 = ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot);
  return { slope, intercept, r2, meanY };
}

function addMonths(ym: string, n: number) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function forecastCategory(rows: HistoricalRow[], category: string, horizonMonths = 12): CategoryForecast {
  const series = rows
    .filter((r) => r.category === category)
    .sort((a, b) => a.month.localeCompare(b.month));

  const values = series.map((r) => r.amount);
  const { slope, intercept, r2, meanY } = linearRegression(values);

  // Compute monthly seasonal indices (multiplicative) using deseasonalized trend
  const seasonal = new Array(12).fill(0);
  const counts = new Array(12).fill(0);
  series.forEach((r, i) => {
    const trend = intercept + slope * i;
    if (trend > 0) {
      const monthIdx = Number(r.month.split("-")[1]) - 1;
      seasonal[monthIdx] += r.amount / trend;
      counts[monthIdx] += 1;
    }
  });
  const seasonality = seasonal.map((s, i) => (counts[i] ? s / counts[i] : 1));
  // Normalize so average index = 1
  const avg = seasonality.reduce((a, b) => a + b, 0) / 12;
  for (let i = 0; i < 12; i++) seasonality[i] = seasonality[i] / (avg || 1);

  // Forecast horizon
  const lastMonth = series[series.length - 1].month;
  const forecast: MonthlyForecast[] = [];
  // Standard error proxy
  const residuals = series.map((r, i) => {
    const trend = intercept + slope * i;
    const monthIdx = Number(r.month.split("-")[1]) - 1;
    return r.amount - trend * seasonality[monthIdx];
  });
  const stdErr = Math.sqrt(residuals.reduce((a, b) => a + b * b, 0) / Math.max(1, residuals.length - 2));

  for (let h = 1; h <= horizonMonths; h++) {
    const idx = values.length - 1 + h;
    const trend = intercept + slope * idx;
    const month = addMonths(lastMonth, h);
    const monthIdx = Number(month.split("-")[1]) - 1;
    const value = Math.max(0, trend * seasonality[monthIdx]);
    const widen = 1 + h * 0.04; // confidence widens with horizon
    forecast.push({
      month,
      value: Math.round(value),
      low: Math.max(0, Math.round(value - 1.96 * stdErr * widen)),
      high: Math.round(value + 1.96 * stdErr * widen),
    });
  }

  // Annualized growth implied by slope at end of history
  const trendPct = meanY > 0 ? (slope * 12) / meanY : 0;

  return {
    category,
    history: series.map((r) => ({ month: r.month, value: r.amount })),
    forecast,
    trendPct,
    seasonality,
    rSquared: r2,
  };
}

export function forecastAll(rows: HistoricalRow[], horizonMonths = 12): CategoryForecast[] {
  const cats = Array.from(new Set(rows.map((r) => r.category)));
  return cats.map((c) => forecastCategory(rows, c, horizonMonths));
}

export function sliceHorizon(fc: MonthlyForecast[], period: "Q1" | "H1" | "H2" | "Year" | "Quarter"): MonthlyForecast[] {
  if (period === "Quarter") return fc.slice(0, 3);
  if (period === "H1") return fc.slice(0, 6);
  if (period === "H2") return fc.slice(6, 12);
  if (period === "Q1") return fc.slice(0, 3);
  return fc.slice(0, 12);
}
