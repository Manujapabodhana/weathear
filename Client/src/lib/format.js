export const toC = v => v == null ? "-" : `${Math.round(v)}°C`;
export const toKm = v => v == null ? "-" : `${(v/1000).toFixed(1)}km`;
export const toMps = v => v == null ? "-" : `${v.toFixed(1)}m/s`;
export const toDeg = v => v == null ? "-" : `${Math.round(v)}°`;

export function toClock(sec, tzOffsetSec = 0) {
  if (!sec) return "-";
  const d = new Date((sec + tzOffsetSec) * 1000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).toLowerCase();
}

export function toDayTime(sec, tzOffsetSec = 0) {
  if (!sec) return "-";
  const d = new Date((sec + tzOffsetSec) * 1000);
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).toLowerCase();
  const date = d.toLocaleDateString([], { month: "short", day: "numeric" });
  return `${time}, ${date}`;
}
