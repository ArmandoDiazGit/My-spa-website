export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function time12hToHMSMicro(time12h, seconds = 0, milliseconds = 0) {
  const [time, meridiem] = time12h.trim().split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  const ss = String(seconds).padStart(2, "0");
  const micro = String(milliseconds * 1000).padStart(6, "0");

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${ss}.${micro}`;
}

export function buildScheduleAt(date, time12h) {
  return `${toISODate(date)}T${time12hToHMSMicro(time12h)}`;
}
