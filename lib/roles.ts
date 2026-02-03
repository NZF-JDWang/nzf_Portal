import type { Session } from "next-auth";

export const roles = {
  missionMaker: "Mission Maker",
  member: "Member",
  communityManager: "Community Manager"
} as const;

export type AppRole = (typeof roles)[keyof typeof roles];

export function isSuperuser(session: Session | null): boolean {
  return session?.user?.isSuperuser ?? false;
}

export function hasRole(session: Session | null, role: AppRole): boolean {
  return session?.user?.roles?.includes(role) ?? false;
}

export function canCreateMission(session: Session | null): boolean {
  return isSuperuser(session) || hasRole(session, roles.missionMaker);
}

export function canCreateEvent(session: Session | null): boolean {
  return isSuperuser(session) || hasRole(session, roles.member);
}

export function canAccessAdmin(session: Session | null): boolean {
  return isSuperuser(session) || hasRole(session, roles.communityManager);
}
