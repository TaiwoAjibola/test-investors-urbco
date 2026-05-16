import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "₦"): string {
  return `${currency}${amount.toLocaleString()}`;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function calculateROI(investment: number, annualYield: number, years: number): number {
  return investment * (annualYield / 100) * years;
}

export function calculateDividend(investment: number, annualYield: number, frequency: "quarterly" | "annual" = "quarterly"): number {
  const annualDividend = investment * (annualYield / 100);
  return frequency === "quarterly" ? annualDividend / 4 : annualDividend;
}
