import bell from "../assets/bell.svg";
import { addToCalendar } from "../utils/calendar";

export default function Summary({
  month,
  daysWorked,
  reminderDay,
  showReminderPanel,
  onToggleBell,
  onChangeDay,
}: {
  month: string;
  daysWorked: number;
  reminderDay: number;
  showReminderPanel: boolean;
  onToggleBell: () => void;
  onChangeDay: (n: number) => void;
}) {
  const sizeClass = month.length > 7 ? "long" : month.length > 4 ? "medium" : "short";

  return (
    <div className="content">
      <img
        src={bell}
        className="reminder-bell"
        onClick={onToggleBell}
        title="Add calendar reminder"
        width={20}
        height={20}
      />
      {showReminderPanel && (
        <div className="reminder-panel">
          <div className="reminder-row">
            <span>Remind me on day</span>
            <input
              type="number"
              min="1"
              max="31"
              value={reminderDay}
              onChange={(e) => onChangeDay(Number(e.target.value))}
            />
          </div>
          <button className="add-calendar-btn" onClick={() => addToCalendar(reminderDay)}>
            Add to Calendar
          </button>
        </div>
      )}
      <div className="readonly-section">
        <h1 className={"left-content " + sizeClass}>{month}</h1>
        <div className="right-content">
          <h2>Worked Days</h2>
          <h2 className="highlight-number">{daysWorked}</h2>
        </div>
      </div>
    </div>
  );
}
