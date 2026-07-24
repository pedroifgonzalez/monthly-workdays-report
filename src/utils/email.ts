import type { Holiday } from "./holidays";
import type { Expense } from "../components/Calculator";

export type EmailData = {
  monthName: string;
  monthNumber: number;
  prevMonthName: string;
  daysWorked: number;
  vacationDays: number;
  sickDays: number;
  absenceDays: number;
  prevVacationDays: number;
  prevSickDays: number;
  prevAbsenceDays: number;
  holidays: Holiday[];
  expenses: Expense[];
  hideZeros: boolean;
};

export function buildEmailBody(data: EmailData): string {
  const mm = String(data.monthNumber).padStart(2, "0");
  const holidayText = data.holidays
    .map(
      (h) => `· Public Holidays : 01 (${String(h.day).padStart(2, "0")}/${mm})`,
    )
    .join("\n");

  const totalAmount = data.expenses.reduce(
    (s, e) => s + (Number(e.amount) || 0),
    0,
  );
  const expenseLines = data.expenses
    .map(
      (e) =>
        `  - ${e.description || "(no description)"}: €${(Number(e.amount) || 0).toFixed(2)}`,
    )
    .join("\n");

  const lines = [
    `Please find below the totals for this month :`,
    ``,
    `· Days worked : ${data.daysWorked}`,
  ];

  if ((data.hideZeros && data.vacationDays > 0) || !data.hideZeros)
    lines.push(`· Vacation Days : ${data.vacationDays}`);
  if ((data.hideZeros && data.sickDays > 0) || !data.hideZeros) lines.push(`· Sickness days : ${data.sickDays}`);
  if (holidayText) lines.push(holidayText);
  if ((data.hideZeros && data.absenceDays > 0) || !data.hideZeros) lines.push(`· Absence days : ${data.absenceDays}`);

  if (totalAmount > 0 || data.expenses.length > 0) {
    lines.push(`· Expenses : €${totalAmount.toFixed(2)}`);
    if (expenseLines) lines.push(expenseLines);
  }

  const prevLines: string[] = [];
  if ((data.hideZeros && data.prevVacationDays > 0) || !data.hideZeros)
    prevLines.push(`o Vacation days : ${data.prevVacationDays}`);
  if ((data.hideZeros && data.prevSickDays > 0) || !data.hideZeros)
    prevLines.push(`o Sickness days : ${data.prevSickDays}`);
  if ((data.hideZeros && data.prevAbsenceDays > 0) || !data.hideZeros)
    prevLines.push(`o Absence days : ${data.prevAbsenceDays}`);
  if (prevLines.length > 0) {
    lines.push(
      ``,
      ``,
      `· Not counted days of previous month`,
      ...prevLines,
    );
  }

  return lines.join("\n");
}
