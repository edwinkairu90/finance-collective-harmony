// 24 months of sample historical actuals (Jan 2024 - Dec 2025)
// Categories: Revenue, COGS, Opex, Marketing, Payroll
// Values include trend + monthly seasonality + small noise (deterministic).

export type HistoricalRow = {
  month: string; // YYYY-MM
  category: string;
  amount: number;
};

const categories = [
  { name: "Revenue", base: 480_000, growth: 0.018, season: [0.92, 0.88, 0.97, 1.02, 1.05, 1.08, 1.04, 1.06, 1.10, 1.12, 1.18, 1.28] },
  { name: "COGS", base: 192_000, growth: 0.015, season: [0.93, 0.90, 0.98, 1.01, 1.03, 1.06, 1.03, 1.05, 1.08, 1.10, 1.15, 1.24] },
  { name: "Payroll", base: 140_000, growth: 0.012, season: [1.0, 1.0, 1.0, 1.0, 1.0, 1.05, 1.0, 1.0, 1.0, 1.0, 1.0, 1.18] },
  { name: "Marketing", base: 38_000, growth: 0.022, season: [0.85, 0.80, 0.95, 1.05, 1.10, 1.15, 0.90, 0.95, 1.20, 1.25, 1.40, 1.10] },
  { name: "Opex (Other)", base: 62_000, growth: 0.010, season: [0.98, 0.96, 1.00, 1.01, 1.02, 1.03, 1.00, 1.01, 1.02, 1.03, 1.05, 1.10] },
];

function pseudoNoise(i: number, seed: number) {
  const x = Math.sin(i * 9301 + seed * 49297) * 233280;
  return (x - Math.floor(x) - 0.5) * 0.04; // ±2%
}

export const sampleHistorical: HistoricalRow[] = (() => {
  const rows: HistoricalRow[] = [];
  const startYear = 2024;
  for (let i = 0; i < 24; i++) {
    const year = startYear + Math.floor(i / 12);
    const monthIdx = i % 12;
    const month = `${year}-${String(monthIdx + 1).padStart(2, "0")}`;
    categories.forEach((c, ci) => {
      const trend = c.base * Math.pow(1 + c.growth, i);
      const seasonal = c.season[monthIdx];
      const noise = 1 + pseudoNoise(i, ci);
      rows.push({ month, category: c.name, amount: Math.round(trend * seasonal * noise) });
    });
  }
  return rows;
})();

// Current-year budget (2026) for gap analysis
export const currentBudget2026: Record<string, number[]> = (() => {
  const result: Record<string, number[]> = {};
  categories.forEach((c) => {
    result[c.name] = c.season.map((s, m) => {
      const trend = c.base * Math.pow(1 + c.growth, 24 + m);
      // Budget is intentionally slightly conservative vs trend (varies by category)
      const conservatism = c.name === "Revenue" ? 0.94 : c.name === "Marketing" ? 1.08 : 0.98;
      return Math.round(trend * s * conservatism);
    });
  });
  return result;
})();

export const categoryNames = categories.map((c) => c.name);
