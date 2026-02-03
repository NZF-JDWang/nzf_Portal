const timeZone = "Pacific/Auckland";

const monthFormatter = new Intl.DateTimeFormat("en-NZ", {
  timeZone,
  month: "long",
  year: "numeric"
});

const datePartsFormatter = new Intl.DateTimeFormat("en-NZ", {
  timeZone,
  year: "numeric",
  month: "numeric",
  day: "numeric"
});

const weekdayFormatter = new Intl.DateTimeFormat("en-NZ", {
  timeZone,
  weekday: "short"
});

const weekdayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getNzDateParts(isoOrDate: string | Date) {
  const date = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  const parts = datePartsFormatter.formatToParts(date);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value ?? "0";
  return {
    year: Number(getPart("year")),
    month: Number(getPart("month")),
    day: Number(getPart("day"))
  };
}

export function getNzMonthLabel(date: Date) {
  return monthFormatter.format(date);
}

export function getNzWeekdayIndex(date: Date) {
  const weekday = weekdayFormatter.format(date);
  const index = weekdayOrder.indexOf(weekday);
  return index === -1 ? 0 : index;
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function getMonthAnchorDateFromIso(iso?: string) {
  if (iso) {
    const { year, month } = getNzDateParts(iso);
    return new Date(Date.UTC(year, month - 1, 1, 12));
  }
  const now = new Date();
  const { year, month } = getNzDateParts(now);
  return new Date(Date.UTC(year, month - 1, 1, 12));
}

export function addMonths(date: Date, delta: number) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + delta, 1, 12));
}

export function addDays(date: Date, delta: number) {
  return new Date(date.getTime() + delta * 24 * 60 * 60 * 1000);
}

export function getStartOfWeek(date: Date) {
  const weekday = getNzWeekdayIndex(date);
  return addDays(date, -weekday);
}

export function isSameNzDay(a: string | Date, b: string | Date) {
  const aParts = getNzDateParts(a);
  const bParts = getNzDateParts(b);
  return aParts.year === bParts.year && aParts.month === bParts.month && aParts.day === bParts.day;
}

export function getNzDateKey(value: string | Date) {
  const parts = getNzDateParts(value);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}
