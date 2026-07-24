export default function Settings({
  email,
  setEmail,
  hideZeros,
  setHideZeros,
}: {
  email: string;
  setEmail: (s: string) => void;
  hideZeros: boolean;
  setHideZeros: (hide: boolean) => void;
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
      <div className="row">
        <label>Hide zero values:</label>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={hideZeros}
            onChange={() => setHideZeros(!hideZeros)}
          />
          <span className="toggle-slider" />
        </label>
      </div>
    </div>
  );
}
