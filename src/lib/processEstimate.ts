export type ProcessInputs = {
  monthlyRuns: number;
  minutesBefore: number;
  minutesAfter: number;
  hourlyCost: number;
  monthlyTools: number;
  setupCost: number;
};

export function estimateProcess(v: ProcessInputs) {
  if (Object.values(v).some(n => !Number.isFinite(n) || n < 0)) return null;
  const hoursBefore = v.monthlyRuns * v.minutesBefore / 60;
  const hoursAfter = v.monthlyRuns * v.minutesAfter / 60;
  const hoursFreed = hoursBefore - hoursAfter;
  const capacityValue = hoursFreed * v.hourlyCost;
  const monthlyBalance = capacityValue - v.monthlyTools;
  if (![hoursBefore, hoursAfter, hoursFreed, capacityValue, monthlyBalance].every(Number.isFinite)) return null;
  return { hoursBefore, hoursAfter, hoursFreed, capacityValue, monthlyBalance,
    paybackMonths: monthlyBalance > 0 ? v.setupCost / monthlyBalance : null };
}

export function csvCell(value: string | number): string {
  let s = typeof value === "number" ? String(value).replace(".", ",") : value;
  // A process name can come from a pasted spreadsheet: never export it as a formula.
  if (typeof value === "string" && /^[\s]*[=+\-@]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
}
