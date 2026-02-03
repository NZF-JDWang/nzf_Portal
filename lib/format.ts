import type { OpStatus } from "@/types/operation";

const nzFormatter = new Intl.DateTimeFormat("en-NZ", {
  timeZone: "Pacific/Auckland",
  hour12: false,
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

const nzDateFormatter = new Intl.DateTimeFormat("en-NZ", {
  timeZone: "Pacific/Auckland",
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric"
});

const nzTimeFormatter = new Intl.DateTimeFormat("en-NZ", {
  timeZone: "Pacific/Auckland",
  hour12: false,
  hour: "2-digit",
  minute: "2-digit"
});

export function formatNzDateTime(iso: string): string {
  return `${nzFormatter.format(new Date(iso))} NZT`;
}

export function formatNzDate(iso: string): string {
  return nzDateFormatter.format(new Date(iso));
}

export function formatNzTime(iso: string): string {
  return `${nzTimeFormatter.format(new Date(iso))} NZT`;
}

const nzHeaderTimeFormatter = new Intl.DateTimeFormat("en-NZ", {
  timeZone: "Pacific/Auckland",
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  weekday: "short",
  day: "2-digit",
  month: "short"
});

export function formatNzHeaderTime(iso: string): string {
  return `${nzHeaderTimeFormatter.format(new Date(iso))} NZT`;
}

export function statusColor(status: OpStatus): string {
  switch (status) {
    case "Open":
      return "bg-status-open/20 text-status-open";
    case "Limited":
      return "bg-status-limited/20 text-status-limited";
    case "Full":
      return "bg-status-full/20 text-status-full";
    case "Closed":
      return "bg-status-closed/20 text-status-closed";
    default:
      return "bg-white/10 text-white/70";
  }
}
