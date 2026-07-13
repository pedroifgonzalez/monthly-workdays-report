import settings from "../assets/setting.svg";
import back from "../assets/back.svg";
import send from "../assets/send.svg";

export default function Footer({
  view,
  setView,
  onSendEmail,
}: {
  view: string;
  setView: (v: string) => void;
  onSendEmail: () => void;
}) {
  const icon = view === "settings" ? settings : back;

  return (
    <div className="content">
      <div className="row">
        <img
          src={icon}
          onClick={() => setView(view === "settings" ? "back" : "settings")}
          width={48}
          height={48}
          title={view === "settings" ? "Settings" : "Back to calculator"}
          alt={view === "settings" ? "Settings" : "Back to calculator"}
          style={{ cursor: "pointer" }}
        />
        <img
          src={send}
          onClick={onSendEmail}
          width={48}
          height={48}
          title="Send report by email"
          alt="Send report by email"
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
