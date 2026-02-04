import type { Operation } from "@/types/operation";

export type CalendarEvent = {
  id: string;
  type: "event";
  title: string;
  startsAt: string;
  description: string;
};

export type CalendarMission = {
  id: string;
  type: "mission";
  operation: Operation;
};

export type CalendarItem = CalendarEvent | CalendarMission;

export function getCalendarItemStartsAt(item: CalendarItem) {
  return item.type === "mission" ? item.operation.startsAt : item.startsAt;
}

export function getCalendarItemTitle(item: CalendarItem) {
  return item.type === "mission" ? item.operation.name : item.title;
}

export function getCalendarItemDescription(item: CalendarItem) {
  return item.type === "mission" ? item.operation.teaser : item.description;
}
