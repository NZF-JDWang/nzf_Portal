export type Game = "Reforger" | "Arma 3";

export type OpStatus = "Open" | "Limited" | "Full" | "Closed";

export type OperationType = "Mission" | "Event";

export type BriefingSections = {
  situation: string;
  enemyForces: string;
  friendlyForces: string;
  objectives: string;
  execution: string;
  commandSignal: string;
  rulesOfEngagement: string;
};

export type IntelAsset = {
  src: string;
  label?: string;
};

export type Comment = {
  id: string;
  author: string;
  role?: string;
  timestamp: string;
  body: string;
};

export type Operation = {
  id: string;
  name: string;
  startsAt: string;
  type: OperationType;
  game: Game;
  status: OpStatus;
  missionMaker: string;
  teaser: string;
  signups: string[];
  briefing: BriefingSections;
  intel: IntelAsset[];
  comments: Comment[];
};
