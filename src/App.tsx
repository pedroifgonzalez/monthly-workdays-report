import { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Summary from "./components/Summary";
import {
  getCurrentMonth,
  getCurrentMonthNumber,
  getCurrentYear,
  getDaysUpTo,
  getWorkableDays,
} from "./utils/date";
import Calculator from "./components/Calculator";
import type { Expense } from "./components/Calculator";
import { getNationalHolidays, type Holiday } from "./utils/holidays";
import Settings from "./components/Settings";
import { buildEmailBody } from "./utils/email";

function App() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const currentMonth = getCurrentMonthNumber();
  const currentYear = getCurrentYear();
  const monthName = getCurrentMonth();
  const [maxDay, setMaxDay] = useState(25);

  useEffect(() => {
    getNationalHolidays(currentMonth).then(setHolidays);
  }, [currentMonth]);

  const days = useMemo(
    () => getDaysUpTo(currentMonth, currentYear, maxDay),
    [currentMonth, currentYear, maxDay],
  );

  const defaultWorkableDays = useMemo(
    () => getWorkableDays(days, holidays),
    [days, holidays],
  );

  const [email, setEmail] = useState("admin@quasas.be");
  const [view, setView] = useState("settings");

  const [deductions, setDeductions] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const daysWorked = defaultWorkableDays - deductions;

  const handleSendEmail = useCallback(() => {
    const body = buildEmailBody({
      monthName,
      monthNumber: currentMonth,
      daysWorked,
      vacationDays: 0,
      sickDays: 0,
      absenceDays: 0,
      holidays,
      expenses,
    });
    window.location.href = `mailto:${email}?subject=Workdays%20Report%20${monthName}&body=${encodeURIComponent(body)}`;
  }, [email, monthName, currentMonth, daysWorked, holidays, expenses]);

  const [reminderDay, setReminderDay] = useState(() => {
    return Number(localStorage.getItem("reminderDay")) || maxDay;
  });
  const [showReminderPanel, setShowReminderPanel] = useState(false);

  useEffect(() => {
    localStorage.setItem("reminderDay", String(reminderDay));
  }, [reminderDay]);

  return (
    <>
      <section id="center">
        <Summary
          month={monthName}
          daysWorked={daysWorked}
          reminderDay={reminderDay}
          showReminderPanel={showReminderPanel}
          onToggleBell={() => setShowReminderPanel(!showReminderPanel)}
          onChangeDay={setReminderDay}
        />
        {view === "back" ? (
          <Settings maxDay={maxDay} setMaxDay={setMaxDay} email={email} setEmail={setEmail} />
        ) : (
          <Calculator
            maxDay={maxDay}
            holidays={holidays}
            days={days}
            setDeductions={setDeductions}
            expenses={expenses}
            setExpenses={setExpenses}
          />
        )}
        <Footer view={view} setView={setView} onSendEmail={handleSendEmail} />
      </section>
    </>
  );
}

export default App;
