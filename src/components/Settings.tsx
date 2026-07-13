export default function Settings({
  maxDay,
  setMaxDay,
  email,
  setEmail,
}: {
  maxDay: number;
  setMaxDay: (n: number) => void;
  email: string;
  setEmail: (s: string) => void;
}) {

  return (
    <div className="content card view-box">
      <div className="row">
        <label>Max day:</label>
        <input
          type="number"
          value={maxDay}
          min="1"
          max="31"
          onChange={(e) => setMaxDay(Number(e.target.value))}
        />
      </div>
      <div className="row">
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
}
