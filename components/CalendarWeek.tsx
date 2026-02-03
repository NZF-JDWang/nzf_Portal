import type { Operation } from "@/types/operation";
import { formatNzTime } from "@/lib/format";
import { getNzDateParts, isSameNzDay } from "@/lib/calendar";

type CalendarWeekProps = {
  startDate: Date;
  operations: Operation[];
  selectedOperationId?: string | null;
  onSelect?: (operation: Operation) => void;
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarWeek({ startDate, operations, selectedOperationId, onSelect }: CalendarWeekProps) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000);
    return date;
  });

  return (
    <div className="rounded-lg border border-white/10 bg-base-800 p-4">
      <div className="grid grid-cols-7 gap-2 text-[10px] text-muted">
        {weekdayLabels.map((label) => (
          <div key={label} className="text-center uppercase tracking-wide">
            {label}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          const { day } = getNzDateParts(date);
          const dayOps = operations.filter((operation) => isSameNzDay(operation.startsAt, date));
          const isToday = isSameNzDay(new Date(), date);
          return (
            <div
              key={`${day}-${index}`}
              className={`rounded-md border p-2 text-[10px] ${
                isToday ? "border-accent-500/60 bg-base-800" : "border-white/5 bg-base-900/60"
              }`}
            >
              <div className="text-[10px] text-white/70">{day}</div>
              <div className="mt-2 space-y-1">
                {dayOps.slice(0, 2).map((operation) => {
                  const isSelected = selectedOperationId === operation.id;
                  return (
                    <button
                      key={operation.id}
                      type="button"
                      onClick={() => onSelect?.(operation)}
                      className={`w-full rounded border px-2 py-1 text-left ${
                        isSelected
                          ? "border-accent-500 bg-accent-500/10 text-white"
                          : "border-white/10 bg-base-800 text-white/70"
                      }`}
                    >
                      {formatNzTime(operation.startsAt)}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
