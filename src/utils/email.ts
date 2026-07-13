import type { Holiday } from "./holidays";
import type { Expense } from "../components/Calculator";

export type EmailData = {
  monthName: string;
  monthNumber: number;
  daysWorked: number;
  vacationDays: number;
  sickDays: number;
  absenceDays: number;
  holidays: Holiday[];
  expenses: Expense[];
};

export function buildEmailBody(data: EmailData): string {
  const mm = String(data.monthNumber).padStart(2, "0");
  const holidayLines = data.holidays
    .map((h) => `· Public Holidays : 01 (${String(h.day).padStart(2, "0")}/${mm})`)
    .join("\n");

  const totalAmount = data.expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const expenseLines = data.expenses
    .map((e) => `  - ${e.description || "(no description)"}: €${(Number(e.amount) || 0).toFixed(2)}`)
    .join("\n");

  const lines = [
    `Please find below the totals for this month :`,
    ``,
    `· Days worked : ${data.daysWorked}`,
    `· Vacation Days : ${data.vacationDays}`,
    `· Sickness days : ${data.sickDays}`,
    holidayLines,
    `· Absence days : ${data.absenceDays}`,
  ];

  if (data.expenses.length > 0) {
    lines.push(
      `· Expenses : €${totalAmount.toFixed(2)}`,
      expenseLines,
    );
  }

  return lines.join("\n");
}
