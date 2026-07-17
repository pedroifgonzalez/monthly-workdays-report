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
import WorkQuote from "./components/WorkQuote";

function App() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const currentMonth = getCurrentMonthNumber();
  const currentYear = getCurrentYear();
  const monthName = getCurrentMonth();

  useEffect(() => {
    getNationalHolidays(currentMonth).then(setHolidays);
  }, [currentMonth]);

  const days = useMemo(
    () => getDaysUpTo(currentMonth, currentYear),
    [currentMonth, currentYear],
  );

  const defaultWorkableDays = useMemo(
    () => getWorkableDays(days, holidays),
    [days, holidays],
  );

  const [email, setEmail] = useState("admin@quasas.be");
  const [view, setView] = useState("settings");

  const [deductions, setDeductions] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [vacations, setVacations] = useState(false);
  const [vacationsCount, setVacationsCount] = useState(0);
  const [sickDays, setSickDays] = useState(false);
  const [sickDaysCount, setSickDaysCount] = useState(0);
  const [hasExpenses, setHasExpenses] = useState(false);
  const [prevVacations, setPrevVacations] = useState(false);
  const [prevVacationsCount, setPrevVacationsCount] = useState(0);
  const [prevSickDays, setPrevSickDays] = useState(false);
  const [prevSickDaysCount, setPrevSickDaysCount] = useState(0);
  const [prevAbsenceDays, setPrevAbsenceDays] = useState(false);
  const [prevAbsenceDaysCount, setPrevAbsenceDaysCount] = useState(0);
  const daysWorked = defaultWorkableDays - deductions;

  const prevMonthNumber = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevMonthName = new Date(2024, prevMonthNumber - 1).toLocaleString("default", { month: "long" });

  const handleSendEmail = useCallback(() => {
    const body = buildEmailBody({
      monthName,
      monthNumber: currentMonth,
      prevMonthName,
      daysWorked,
      vacationDays: vacations ? vacationsCount : 0,
      sickDays: sickDays ? sickDaysCount : 0,
      absenceDays: 0,
      prevVacationDays: prevVacations ? prevVacationsCount : 0,
      prevSickDays: prevSickDays ? prevSickDaysCount : 0,
      prevAbsenceDays: prevAbsenceDays ? prevAbsenceDaysCount : 0,
      holidays,
      expenses,
    });
    window.location.href = `mailto:${email}?subject=Workdays%20Report%20${monthName}&body=${encodeURIComponent(body)}`;
  }, [email, monthName, currentMonth, prevMonthName, daysWorked, vacations, vacationsCount, sickDays, sickDaysCount, prevVacations, prevVacationsCount, prevSickDays, prevSickDaysCount, prevAbsenceDays, prevAbsenceDaysCount, holidays, expenses]);

  const [reminderDay, setReminderDay] = useState(() => {
    return Number(localStorage.getItem("reminderDay")) || 25;
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
          <Settings email={email} setEmail={setEmail} />
        ) : (
          <Calculator
            holidays={holidays}
            days={days}
            setDeductions={setDeductions}
            expenses={expenses}
            setExpenses={setExpenses}
            vacations={vacations}
            setVacations={setVacations}
            vacationsCount={vacationsCount}
            setVacationsCount={setVacationsCount}
            sickDays={sickDays}
            setSickDays={setSickDays}
            sickDaysCount={sickDaysCount}
            setSickDaysCount={setSickDaysCount}
            hasExpenses={hasExpenses}
            setHasExpenses={setHasExpenses}
            prevVacations={prevVacations}
            setPrevVacations={setPrevVacations}
            prevVacationsCount={prevVacationsCount}
            setPrevVacationsCount={setPrevVacationsCount}
            prevSickDays={prevSickDays}
            setPrevSickDays={setPrevSickDays}
            prevSickDaysCount={prevSickDaysCount}
            setPrevSickDaysCount={setPrevSickDaysCount}
            prevAbsenceDays={prevAbsenceDays}
            setPrevAbsenceDays={setPrevAbsenceDays}
            prevAbsenceDaysCount={prevAbsenceDaysCount}
            setPrevAbsenceDaysCount={setPrevAbsenceDaysCount}
            prevMonthName={prevMonthName}
          />
        )}
        <WorkQuote />
        <Footer view={view} setView={setView} onSendEmail={handleSendEmail} />
      </section>
    </>
  );
}

export default App;
