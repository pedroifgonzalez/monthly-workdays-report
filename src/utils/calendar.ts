export function addToCalendar(day: number) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const eventDate = new Date(year, month, day);
  if (eventDate < now) eventDate.setMonth(eventDate.getMonth() + 1);

  const endDate = new Date(eventDate);
  endDate.setDate(endDate.getDate() + 1);

  function fmt(d: Date) {
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  }

  const url = window.location.origin;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Workdays Report//EN",
    "BEGIN:VEVENT",
    `DTSTART;VALUE=DATE:${fmt(eventDate)}`,
    `DTEND;VALUE=DATE:${fmt(endDate)}`,
    "RRULE:FREQ=MONTHLY;BYMONTHDAY=" + day,
    "SUMMARY:Monthly Workdays Report",
    "DESCRIPTION:Fill in your workdays report\\n" + url,
    "URL:" + url,
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Complete your workdays report",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const file = new File([blob], "workdays-report.ics", { type: "text/calendar;charset=utf-8" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    navigator.share({ files: [file], title: "WorkMonth" }).catch(() => download(blob));
  } else {
    download(blob);
  }
}

function download(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "workdays-report.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
