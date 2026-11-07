import { describe, expect, it } from "vitest";
import { estimateProcess, csvCell } from "./processEstimate";
const base = { monthlyRuns: 120, minutesBefore: 12, minutesAfter: 5, hourlyCost: 30, monthlyTools: 100, setupCost: 600 };
describe("process estimate", () => {
  it("subtracts human review time and recurring tool costs", () => {
    expect(estimateProcess(base)).toEqual({ hoursBefore: 24, hoursAfter: 10, hoursFreed: 14, capacityValue: 420, monthlyBalance: 320, paybackMonths: 1.875 });
  });
  it("keeps losses visible and does not invent a payback", () => {
    const loss = estimateProcess({ ...base, minutesAfter: 20 });
    expect(loss?.hoursFreed).toBe(-16); expect(loss?.monthlyBalance).toBe(-580); expect(loss?.paybackMonths).toBeNull();
    expect(estimateProcess({ ...base, monthlyRuns: 0 })?.paybackMonths).toBeNull();
  });
  it("rejects invalid, negative and overflowing inputs", () => {
    expect(estimateProcess({ ...base, monthlyRuns: NaN })).toBeNull();
    expect(estimateProcess({ ...base, minutesAfter: -1 })).toBeNull();
    expect(estimateProcess({ ...base, monthlyRuns: Number.MAX_VALUE, minutesBefore: Number.MAX_VALUE })).toBeNull();
  });
  it("escapes spreadsheet formulas, quotes and multiline labels", () => {
    expect(csvCell(' =1+1')).toBe('"\' =1+1"');
    expect(csvCell('Processo "A"\nB')).toBe('"Processo ""A""\nB"');
    expect(csvCell(-5)).toBe('"-5"');
    expect(csvCell(1.875)).toBe('"1,875"');
  });
});
