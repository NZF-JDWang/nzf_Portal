"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import type { CalendarItem } from "@/types/calendar";
import { getCalendarItemDescription, getCalendarItemStartsAt, getCalendarItemTitle } from "@/types/calendar";
import { CalendarMonth } from "@/components/CalendarMonth";
import { CalendarWeek } from "@/components/CalendarWeek";
import Image from "next/image";

import { Badge } from "@/components/Badge";
import { formatNzDateTime } from "@/lib/format";
import { getMonthAnchorDateFromIso, getStartOfWeek } from "@/lib/calendar";
import { canCreateEvent, canCreateMission } from "@/lib/roles";

type CalendarSectionProps = {
  items: CalendarItem[];
  initialSelectedId?: string;
};

export function CalendarSection({ items, initialSelectedId }: CalendarSectionProps) {
  const { data: session } = useSession();
  const initialSelection = useMemo(() => {
    if (initialSelectedId) {
      return items.find((item) => item.id === initialSelectedId) ?? null;
    }
    return items[0] ?? null;
  }, [initialSelectedId, items]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    const rangeEnd = new Date(now);
    rangeEnd.setDate(rangeEnd.getDate() + 30);

    return [...items]
      .filter((item) => {
        const startsAt = new Date(getCalendarItemStartsAt(item));
        return startsAt >= now && startsAt <= rangeEnd;
      })
      .sort(
        (a, b) => new Date(getCalendarItemStartsAt(a)).getTime() - new Date(getCalendarItemStartsAt(b)).getTime()
      );
  }, [items]);

  const [selected, setSelected] = useState<CalendarItem | null>(initialSelection);
  const [monthDate, setMonthDate] = useState<Date>(() =>
    getMonthAnchorDateFromIso(initialSelection ? getCalendarItemStartsAt(initialSelection) : undefined)
  );

  const signupList = selected?.type === "mission" ? selected.operation.signups : [];
  const signupCount = signupList.length;
  const selectedStartsAt = selected ? getCalendarItemStartsAt(selected) : null;

  const allowMissionCreate = canCreateMission(session ?? null);
  const allowEventCreate = canCreateEvent(session ?? null);

  return (
    <div className="grid gap-10 xl:grid-cols-[1.05fr_1.35fr] xl:items-start">
      <div className="w-full space-y-4">
        <div className="hidden md:block">
          <div className="aspect-square w-full">
            <CalendarMonth
              items={items}
              monthDate={monthDate}
              selectedOperationId={selected?.id}
              canCreateMission={allowMissionCreate}
              canCreateEvent={allowEventCreate}
              onSelect={(item) => {
                setSelected(item);
                setMonthDate(getMonthAnchorDateFromIso(getCalendarItemStartsAt(item)));
              }}
              onMonthChange={(date) => setMonthDate(date)}
            />
          </div>
        </div>
        <div className="md:hidden">
          <CalendarWeek
            startDate={getStartOfWeek(selectedStartsAt ? new Date(selectedStartsAt) : new Date())}
            items={items}
            selectedOperationId={selected?.id}
            onSelect={(item) => {
              setSelected(item);
              setMonthDate(getMonthAnchorDateFromIso(getCalendarItemStartsAt(item)));
            }}
          />
        </div>
        <div className="rounded-lg border border-white/10 bg-base-800 p-6">
          <div className="text-xs uppercase tracking-wide text-muted">Upcoming Events</div>
          {upcomingEvents.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No events scheduled in the next 30 days.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {upcomingEvents.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-3 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{getCalendarItemTitle(item)}</div>
                    <div className="text-xs text-muted">{formatNzDateTime(getCalendarItemStartsAt(item))}</div>
                  </div>
                  <Badge label={item.type === "mission" ? "Mission" : "Event"} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-lg border border-white/10 bg-base-800 p-6">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wide text-muted">
              {selected?.type === "event" ? "Selected Event" : "Selected Mission"}
            </div>
            {selected ? (
              <Badge label={selected.type === "event" ? "Event" : selected.operation.game} />
            ) : null}
          </div>
          <div className="mt-3 text-2xl font-semibold">
            {selected ? getCalendarItemTitle(selected) : "Select a calendar item"}
          </div>
          {selected ? (
            <>
              {selectedStartsAt ? <div className="mt-2 text-sm text-muted">{formatNzDateTime(selectedStartsAt)}</div> : null}
              {selected.type === "mission" ? (
                <>
                  <div className="mt-4 text-sm text-white/70">
                    <span className="text-xs uppercase tracking-wide text-muted">Mission Maker</span>
                    <div className="mt-1 text-white">{selected.operation.missionMaker}</div>
                  </div>
                  <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-base-900/60">
                    <Image
                      src={selected.operation.intel[0]?.src ?? "/brand/nzf_logo.png"}
                      alt={selected.operation.intel[0]?.label ?? "Mission intel"}
                      width={900}
                      height={540}
                      className="h-56 w-full object-cover md:h-64"
                    />
                  </div>
                  <div className="mt-6 space-y-4 text-sm text-white/70">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted">Situation</div>
                      <p className="mt-2">{selected.operation.briefing.situation}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted">Enemy Forces</div>
                      <p className="mt-2">{selected.operation.briefing.enemyForces}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted">Friendly Forces</div>
                      <p className="mt-2">{selected.operation.briefing.friendlyForces}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted">Objectives</div>
                      <p className="mt-2">{selected.operation.briefing.objectives}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted">Execution</div>
                      <p className="mt-2">{selected.operation.briefing.execution}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted">Command & Signal</div>
                      <p className="mt-2">{selected.operation.briefing.commandSignal}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted">Rules of Engagement</div>
                      <p className="mt-2">{selected.operation.briefing.rulesOfEngagement}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-6 space-y-3 text-sm text-white/70">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted">Event Overview</div>
                    <p className="mt-2">{getCalendarItemDescription(selected)}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="mt-3 text-sm text-muted">
              Click a mission or event in the calendar to see the full briefing and details.
            </p>
          )}
        </div>

        <div className="rounded-lg border border-white/10 bg-base-800 p-6">
          <div className="text-xs uppercase tracking-wide text-muted">Signups</div>
          {selected ? (
            <>
              <div className="mt-2 text-sm text-white/70">
                {signupCount} {signupCount === 1 ? "member" : "members"} signed up
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {signupList.length === 0 ? (
                  <span className="text-sm text-muted">
                    {selected.type === "event" ? "Events do not collect signups yet." : "No signups yet."}
                  </span>
                ) : (
                  signupList.map((name) => (
                    <span
                      key={name}
                      className="rounded border border-white/10 bg-base-900/80 px-3 py-1 text-xs text-white/70"
                    >
                      {name}
                    </span>
                  ))
                )}
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted">Select a mission or event to see who is attending.</p>
          )}
        </div>
      </div>
    </div>
  );
}
