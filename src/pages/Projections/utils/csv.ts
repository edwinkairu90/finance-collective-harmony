import type { HistoricalRow } from "../data/sampleHistorical";

export function parseCSV(text: string): HistoricalRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const mi = header.indexOf("month");
  const ci = header.indexOf("category");
  const ai = header.indexOf("amount");
  if (mi < 0 || ci < 0 || ai < 0) {
    throw new Error("CSV must include headers: month,category,amount");
  }
  const rows: HistoricalRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(",");
    if (parts.length < 3) continue;
    const month = parts[mi].trim();
    const category = parts[ci].trim();
    const amount = Number(parts[ai].trim().replace(/[$,]/g, ""));
    if (!month || !category || !Number.isFinite(amount)) continue;
    rows.push({ month, category, amount });
  }
  return rows;
}

export function csvTemplate(): string {
  const rows = ["month,category,amount"];
  const cats = ["Revenue", "COGS", "Payroll", "Marketing", "Opex (Other)"];
  for (let y = 2024; y <= 2025; y++) {
    for (let m = 1; m <= 12; m++) {
      cats.forEach((c) => {
        rows.push(`${y}-${String(m).padStart(2, "0")},${c},0`);
      });
    }
  }
  return rows.join("\n");
}
