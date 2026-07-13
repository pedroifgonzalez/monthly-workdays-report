export type DayInfo = {
  day: number;
  isWeekend: boolean;
};

function getCurrentMonth(): string {
  return new Date().toLocaleString("default", { month: "long" });
}

function getCurrentMonthNumber(): number {
  return new Date().getMonth() + 1;
}

function getCurrentYear(): number {
  return new Date().getFullYear();
}

function getDaysUpTo(month: number, year: number, maxDay: number): DayInfo[] {
  const days: DayInfo[] = [];
  for (let d = 1; d <= maxDay; d++) {
    const date = new Date(year, month - 1, d);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    days.push({ day: d, isWeekend });
  }
  return days;
}

function getWorkableDays(
  days: DayInfo[],
  holidays: { day: number }[],
): number {
  return days.filter((d) => !d.isWeekend && !holidays.some((h) => h.day === d.day)).length;
}

export { getCurrentMonth, getCurrentMonthNumber, getCurrentYear, getDaysUpTo, getWorkableDays };
