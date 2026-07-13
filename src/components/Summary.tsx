export default function Summary({ month, daysWorked }: { month: string; daysWorked: number }) {
  return (
    <div className="content">
      <h1 className="left-content">{month}</h1>
      <div className="right-content">
        <h2>Worked Days</h2>
        <h2>{daysWorked}</h2>
      </div>
    </div>
  );
}
