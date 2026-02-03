import Link from "next/link";
import type { Operation } from "@/types/operation";
import { Badge } from "@/components/Badge";
import { formatNzTime } from "@/lib/format";
import {
  addMonths,
  getDaysInMonth,
  getMonthAnchorDateFromIso,
  getNzDateParts,
  getNzMonthLabel,
  getNzWeekdayIndex,
  isSameNzDay
} from "@/lib/calendar";

type CalendarMonthProps = {
  operations: Operation[];
  monthIso?: string;
  monthDate?: Date;
  selectedOperationId?: string | null;
  onSelect?: (operation: Operation) => void;
  onMonthChange?: (date: Date) => void;
  canCreateMission?: boolean;
  canCreateEvent?: boolean;
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const statusDot = {
  Open: "bg-status-open",
  Limited: "bg-status-limited",
  Full: "bg-status-full",
  Closed: "bg-status-closed"
} as const;

export function CalendarMonth({
  operations,
  monthIso,
  monthDate,
  selectedOperationId,
  onSelect,
  onMonthChange,
  canCreateMission = false,
  canCreateEvent = false
}: CalendarMonthProps) {
  const anchorDate = monthDate ?? getMonthAnchorDateFromIso(monthIso);
  const { year, month } = getNzDateParts(anchorDate);
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayDate = new Date(Date.UTC(year, month - 1, 1, 12));
  const firstDayIndex = getNzWeekdayIndex(firstDayDate);

  const opsByDay = operations.reduce<Record<number, Operation[]>>((acc, operation) => {
    const parts = getNzDateParts(operation.startsAt);
    if (parts.year === year && parts.month === month) {
      acc[parts.day] = acc[parts.day] ? [...acc[parts.day], operation] : [operation];
    }
    return acc;
  }, {});
  const today = new Date();

  const totalCells = 42;
  const cells = Array.from({ length: totalCells }, (_, index) => {
    const day = index - firstDayIndex + 1;
    if (day < 1 || day > daysInMonth) return null;
    return day;
  });

  return (
    <div className="flex h-full flex-col rounded-lg border border-white/10 bg-base-800 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onMonthChange?.(addMonths(anchorDate, -1))}
            className="rounded border border-white/10 px-2 py-1 text-xs text-white/60 hover:border-white/30"
          >
            ◀
          </button>
          <div className="text-base font-semibold">{getNzMonthLabel(anchorDate)}</div>
          <button
            type="button"
            onClick={() => onMonthChange?.(addMonths(anchorDate, 1))}
            className="rounded border border-white/10 px-2 py-1 text-xs text-white/60 hover:border-white/30"
          >
            ▶
          </button>
        </div>
        <div className="flex items-center gap-2">
          {canCreateEvent ? (
            <Link
              href="/events/new"
              className="rounded border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/70 hover:border-white/30"
            >
              Add Event
            </Link>
          ) : null}
          {canCreateMission ? (
            <Link
              href="/missions/new"
              className="rounded border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/70 hover:border-white/30"
            >
              Add Mission
            </Link>
          ) : null}
          <Badge label="NZT" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2 text-[10px] text-muted">
        {weekdayLabels.map((label) => (
          <div key={label} className="text-center uppercase tracking-wide">
            {label}
          </div>
        ))}
      </div>
      <div className="mt-2 grid aspect-[7/6] w-full grid-cols-7 grid-rows-6 gap-2">
        {cells.map((day, index) => (
          <div
            key={`${day ?? "empty"}-${index}`}
            className={`relative aspect-square rounded-md border p-2 text-[10px] ${
              day && isSameNzDay(today, new Date(Date.UTC(year, month - 1, day, 12)))
                ? "border-accent-500/60 bg-base-800"
                : "border-white/5 bg-base-900/60"
            }`}
          >
            {day ? (
              <div className="flex h-full flex-col justify-between">
                <div className="text-[10px] text-white/70">{day}</div>
                <div className="space-y-1">
                  {(opsByDay[day] ?? []).slice(0, 1).map((operation) => {
                    const isSelected = selectedOperationId === operation.id;
                    return (
                      <button
                        type="button"
                        key={operation.id}
                        onClick={() => onSelect?.(operation)}
                        className={`flex w-full items-center justify-between rounded border px-2 py-1 text-[10px] transition ${
                          isSelected
                            ? "border-accent-500 bg-accent-500/10 text-white"
                            : "border-white/10 bg-base-800 text-white/70 hover:border-white/30"
                        }`}
                      >
                        <span>{formatNzTime(operation.startsAt)}</span>
                        <span className={`h-2 w-2 rounded-full ${statusDot[operation.status]}`} />
                      </button>
                    );
                  })}
                  {(opsByDay[day]?.length ?? 0) > 1 ? (
                    <div className="text-[10px] text-white/50">+{opsByDay[day].length - 1}</div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
