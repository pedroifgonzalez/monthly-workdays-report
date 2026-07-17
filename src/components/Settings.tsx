export default function Settings({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (s: string) => void;
}) {

  return (
    <div className="content card view-box">
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
