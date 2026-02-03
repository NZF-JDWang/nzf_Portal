import { operations } from "@/data/operations";
import type { CalendarEvent, CalendarItem, CalendarMission } from "@/types/calendar";
import { getCalendarItemStartsAt } from "@/types/calendar";

const missionItems: CalendarMission[] = operations.map((operation) => ({
  id: operation.id,
  type: "mission",
  operation
}));

export const events: CalendarEvent[] = [
  {
    id: "leadership-workshop",
    type: "event",
    title: "Leadership Workshop",
    startsAt: "2026-02-10T19:00:00+13:00",
    description: "Officer-led training on radio discipline, leading patrols, and after-action reviews."
  },
  {
    id: "logistics-briefing",
    type: "event",
    title: "Logistics Briefing",
    startsAt: "2026-02-18T18:30:00+13:00",
    description: "Quartermaster update on kit standards, loadouts, and the next rotation schedule."
  }
];

const calendarItems: CalendarItem[] = [...missionItems, ...events];

export function getCalendarItems() {
  return [...calendarItems].sort((a, b) => {
    return new Date(getCalendarItemStartsAt(a)).getTime() - new Date(getCalendarItemStartsAt(b)).getTime();
  });
}

export function addCalendarItem(item: CalendarItem) {
  calendarItems.push(item);
}
