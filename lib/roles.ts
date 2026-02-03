export const roles = {
  missionMaker: "Mission Maker",
  member: "Member"
} as const;

export function canCreateMission(userRoles: string[]): boolean {
  return userRoles.includes(roles.missionMaker);
}

export function canComment(userRoles: string[]): boolean {
  return userRoles.includes(roles.member) || userRoles.includes(roles.missionMaker);
}
