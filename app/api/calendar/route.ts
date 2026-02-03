import { NextResponse } from "next/server";

import { addCalendarItem, getCalendarItems } from "@/data/calendar";
import type { CalendarEvent, CalendarItem, CalendarMission } from "@/types/calendar";
import type { Operation, OpStatus, Game } from "@/types/operation";

const allowedStatuses: OpStatus[] = ["Open", "Limited", "Full", "Closed"];
const allowedGames: Game[] = ["Reforger", "Arma 3"];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidIsoDate(value: string) {
  return Number.isFinite(Date.parse(value));
}

function buildMissionOperation(payload: Record<string, unknown>): Operation {
  const name = payload.name;
  const startsAt = payload.startsAt;
  const missionMaker = payload.missionMaker;
  const game = payload.game;

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(startsAt) ||
    !isValidIsoDate(startsAt) ||
    !isNonEmptyString(missionMaker) ||
    !isNonEmptyString(game) ||
    !allowedGames.includes(game as Game)
  ) {
    throw new Error("Mission payload must include name, startsAt, missionMaker, and game.");
  }

  const status = allowedStatuses.includes(payload.status as OpStatus) ? (payload.status as OpStatus) : "Open";
  const briefing = (payload.briefing as Record<string, unknown> | undefined) ?? {};

  return {
    id: isNonEmptyString(payload.id) ? payload.id : `mission-${crypto.randomUUID()}`,
    name,
    startsAt,
    game: game as Game,
    status,
    missionMaker,
    teaser: isNonEmptyString(payload.teaser) ? payload.teaser : "Mission briefing to follow.",
    signups: Array.isArray(payload.signups) ? (payload.signups as string[]) : [],
    briefing: {
      situation: isNonEmptyString(briefing.situation) ? briefing.situation : "",
      enemyForces: isNonEmptyString(briefing.enemyForces) ? briefing.enemyForces : "",
      friendlyForces: isNonEmptyString(briefing.friendlyForces) ? briefing.friendlyForces : "",
      objectives: isNonEmptyString(briefing.objectives) ? briefing.objectives : "",
      execution: isNonEmptyString(briefing.execution) ? briefing.execution : "",
      commandSignal: isNonEmptyString(briefing.commandSignal) ? briefing.commandSignal : "",
      rulesOfEngagement: isNonEmptyString(briefing.rulesOfEngagement) ? briefing.rulesOfEngagement : ""
    },
    intel: Array.isArray(payload.intel) ? (payload.intel as Operation["intel"]) : [],
    comments: Array.isArray(payload.comments) ? (payload.comments as Operation["comments"]) : []
  };
}

function buildEvent(payload: Record<string, unknown>): CalendarEvent {
  const title = payload.title;
  const startsAt = payload.startsAt;
  const description = payload.description;

  if (
    !isNonEmptyString(title) ||
    !isNonEmptyString(startsAt) ||
    !isValidIsoDate(startsAt) ||
    !isNonEmptyString(description)
  ) {
    throw new Error("Event payload must include title, startsAt, and description.");
  }

  return {
    id: isNonEmptyString(payload.id) ? payload.id : `event-${crypto.randomUUID()}`,
    type: "event",
    title,
    startsAt,
    description
  };
}

export async function GET() {
  return NextResponse.json({ items: getCalendarItems() });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Record<string, unknown>;
  const type = payload.type;

  try {
    if (type === "event") {
      const event = buildEvent(payload);
      addCalendarItem(event);
      return NextResponse.json({ item: event }, { status: 201 });
    }

    if (type === "mission") {
      const operationPayload = (payload.operation as Record<string, unknown> | undefined) ?? payload;
      const operation = buildMissionOperation(operationPayload);
      const item: CalendarMission = {
        id: operation.id,
        type: "mission",
        operation
      };
      addCalendarItem(item);
      return NextResponse.json({ item }, { status: 201 });
    }

    return NextResponse.json({ error: "Unsupported calendar item type." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid calendar item payload." },
      { status: 400 }
    );
  }
}
