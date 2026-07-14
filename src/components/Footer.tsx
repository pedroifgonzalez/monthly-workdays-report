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
        <div
          className="footer-btn settings-btn"
          onClick={() => setView(view === "settings" ? "back" : "settings")}
          title={view === "settings" ? "Settings" : "Back to calculator"}
        >
          <img
            src={icon}
            width={48}
            height={48}
            alt={view === "settings" ? "Settings" : "Back to calculator"}
          />
        </div>
        <div
          className="footer-btn send-btn"
          onClick={onSendEmail}
          title="Send report by email"
        >
          <img
            src={send}
            width={48}
            height={48}
            alt="Send report by email"
          />
        </div>
      </div>
    </div>
  );
}
