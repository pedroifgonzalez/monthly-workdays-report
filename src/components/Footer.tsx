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
        />
        <img src={send} onClick={onSendEmail} width={48} height={48} />
      </div>
    </div>
  );
}
