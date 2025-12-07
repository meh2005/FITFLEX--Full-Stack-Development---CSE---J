/**
 * Returns a readable timestamp:
 * "Today 3:14 PM"
 * "Yesterday 9:02 AM"
 * "Jan 5, 10:33 AM"
 */
export function formatTimestamp(date) {
  if (!date) return "";

  const d = new Date(date);
  const now = new Date();

  const isToday =
    d.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    d.toDateString() === yesterday.toDateString();

  let time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  if (isToday) return `Today ${time}`;
  if (isYesterday) return `Yesterday ${time}`;

  return `${d.toLocaleDateString([], { month: "short", day: "numeric" })}, ${time}`;
}


/**
 * Returns a formatted date key used for weekly logs:
 * Example: "Mon", "Tue", etc.
 */
export function getDayShort(date = new Date()) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
}


/**
 * Returns true if two timestamps are same calendar day
 */
export function isSameDay(a, b) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}


/**
 * Returns YYYY-MM-DD string
 */
export function formatDateYMD(date = new Date()) {
  return date.toISOString().split("T")[0];
}


/**
 * Sort activities by time descending (newest first)
 */
export function sortActivities(activities) {
  return [...activities].sort((a, b) => new Date(b.time) - new Date(a.time));
}


/**
 * Adds human-friendly "x min ago" style
 */
export function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);

  const seconds = Math.floor((now - past) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours   / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24)   return `${hours} hr ago`;
  if (days === 1)   return "yesterday";

  return `${days} days ago`;
}
