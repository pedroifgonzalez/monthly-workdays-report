import { useEffect, useState } from "react";
import type { DayInfo } from "../utils/date";
import type { Holiday } from "../utils/holidays";

export type Expense = { amount: number; description: string };

export default function Calculator({
  maxDay,
  holidays,
  days,
  setDeductions,
  expenses,
  setExpenses,
}: {
  maxDay: number;
  holidays: Holiday[];
  days: DayInfo[];
  setDeductions: (n: number) => void;
  expenses: Expense[];
  setExpenses: (e: Expense[]) => void;
}) {
  const [vacations, setVacations] = useState(false);
  const [vacationsCount, setVacationsCount] = useState(0);
  const [sickDays, setSickDays] = useState(false);
  const [sickDaysCount, setSickDaysCount] = useState(0);
  const [absenceDays, setAbsenceDays] = useState(false);
  const [absenceDaysCount, setAbsenceDaysCount] = useState(0);

  const [hasExpenses, setHasExpenses] = useState(false);

  useEffect(() => {
    const totalOff =
      (vacations ? vacationsCount : 0) +
      (sickDays ? sickDaysCount : 0) +
      (absenceDays ? absenceDaysCount : 0);
    setDeductions(totalOff);
  }, [
    vacations,
    vacationsCount,
    sickDays,
    sickDaysCount,
    absenceDays,
    absenceDaysCount,
    setDeductions,
  ]);

  function row(
    checked: boolean,
    onToggle: () => void,
    count: number,
    setCount: (n: number) => void,
    label: string,
  ) {
    return (
      <div className="row">
        <label>
          <input type="checkbox" checked={checked} onChange={onToggle} />
          {label}
        </label>
        <input
          type="number"
          disabled={!checked}
          min="0"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>
    );
  }

  function addExpense() {
    setExpenses([...expenses, { amount: 0, description: "" }]);
  }

  function updateExpense(index: number, field: keyof Expense, value: string | number) {
    const updated = expenses.map((e, i) =>
      i === index ? { ...e, [field]: value } : e,
    );
    setExpenses(updated);
  }

  function removeExpense(index: number) {
    setExpenses(expenses.filter((_, i) => i !== index));
  }

  useEffect(() => {
    if (!hasExpenses && expenses.length > 0) {
      setExpenses([]);
    }
  }, [hasExpenses, expenses.length, setExpenses]);

  return (
    <div className="content view-box">
      <div className="row">
        <label>Total Days (1-{maxDay})</label>
        <p>{days.length}</p>
      </div>
      <div className="row">
        <label>Weekend Days</label>
        <p>{days.filter((d) => d.isWeekend).length}</p>
      </div>
      <div className="row">
        <label>Holidays</label>
        <p title={holidays.map((h) => `${h.day}: ${h.name}`).join("\n")}>
          {holidays.length}
        </p>
      </div>
      {row(
        vacations,
        () => setVacations(!vacations),
        vacationsCount,
        setVacationsCount,
        "Vacations",
      )}
      {row(
        sickDays,
        () => setSickDays(!sickDays),
        sickDaysCount,
        setSickDaysCount,
        "Sick Days",
      )}
      {row(
        absenceDays,
        () => setAbsenceDays(!absenceDays),
        absenceDaysCount,
        setAbsenceDaysCount,
        "Absence Days",
      )}

      <div className="row">
        <label>
          <input type="checkbox" checked={hasExpenses} onChange={() => setHasExpenses(!hasExpenses)} />
          Expenses
        </label>
      </div>

      {hasExpenses && (
        <div className="expenses-list">
          {expenses.map((e, i) => (
            <div className="row expense-row" key={i}>
              <input
                className="expense-desc"
                type="text"
                placeholder="description"
                value={e.description}
                onChange={(ev) => updateExpense(i, "description", ev.target.value)}
              />
              <input
                className="expense-amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={e.amount || ""}
                onChange={(ev) => updateExpense(i, "amount", ev.target.value === "" ? 0 : Number(ev.target.value))}
              />
              <span className="expense-currency">EUR</span>
              <button className="expense-remove" onClick={() => removeExpense(i)}>x</button>
            </div>
          ))}
          <button className="add-expense" onClick={addExpense}>+ Add expense</button>
        </div>
      )}
    </div>
  );
}
