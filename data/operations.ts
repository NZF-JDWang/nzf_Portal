import type { BriefingSections, Operation } from "@/types/operation";

import { prisma } from "@/lib/db";

const emptyBriefing: BriefingSections = {
  situation: "",
  enemyForces: "",
  friendlyForces: "",
  objectives: "",
  execution: "",
  commandSignal: "",
  rulesOfEngagement: ""
};

function mapOperation(operation: {
  id: string;
  name: string;
  startsAt: Date;
  game: string;
  status: string;
  missionMaker: string;
  teaser: string;
  briefing: {
    situation: string;
    enemyForces: string;
    friendlyForces: string;
    objectives: string;
    execution: string;
    commandSignal: string;
    rulesOfEngagement: string;
  } | null;
  intel: { src: string; label: string | null }[];
  comments: {
    id: string;
    author: string;
    role: string | null;
    timestamp: Date;
    body: string;
  }[];
  signups: { name: string }[];
}): Operation {
  return {
    id: operation.id,
    name: operation.name,
    startsAt: operation.startsAt.toISOString(),
    game: operation.game as Operation["game"],
    status: operation.status as Operation["status"],
    missionMaker: operation.missionMaker,
    teaser: operation.teaser,
    signups: operation.signups.map((signup) => signup.name),
    briefing: operation.briefing ?? emptyBriefing,
    intel: operation.intel.map((asset) => ({
      src: asset.src,
      label: asset.label ?? undefined
    })),
    comments: operation.comments.map((comment) => ({
      id: comment.id,
      author: comment.author,
      role: comment.role ?? undefined,
      timestamp: comment.timestamp.toISOString(),
      body: comment.body
    }))
  };
}

export async function getOperations(): Promise<Operation[]> {
  const operations = await prisma.operation.findMany({
    include: {
      briefing: true,
      intel: { orderBy: { id: "asc" } },
      comments: { orderBy: { timestamp: "asc" } },
      signups: { orderBy: { name: "asc" } }
    },
    orderBy: { startsAt: "asc" }
  });

  return operations.map(mapOperation);
}

export async function getOperationById(id: string): Promise<Operation | null> {
  const operation = await prisma.operation.findUnique({
    where: { id },
    include: {
      briefing: true,
      intel: { orderBy: { id: "asc" } },
      comments: { orderBy: { timestamp: "asc" } },
      signups: { orderBy: { name: "asc" } }
    }
  });

  return operation ? mapOperation(operation) : null;
}

export async function getUpcomingOperations(): Promise<Operation[]> {
  const operations = await prisma.operation.findMany({
    where: { startsAt: { gte: new Date() } },
    include: {
      briefing: true,
      intel: { orderBy: { id: "asc" } },
      comments: { orderBy: { timestamp: "asc" } },
      signups: { orderBy: { name: "asc" } }
    },
    orderBy: { startsAt: "asc" }
  });

  return operations.map(mapOperation);
}
