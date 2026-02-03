import { roles } from "@/lib/roles";

export function mapDiscordRoleIds(roleIds: string[]): string[] {
  const missionMakerRoleId = process.env.DISCORD_ROLE_MISSION_MAKER_ID;
  const memberRoleId = process.env.DISCORD_ROLE_MEMBER_ID;
  const communityManagerRoleId = process.env.DISCORD_ROLE_COMMUNITY_MANAGER_ID;

  const mapped: string[] = [];

  if (missionMakerRoleId && roleIds.includes(missionMakerRoleId)) {
    mapped.push(roles.missionMaker);
  }

  if (memberRoleId && roleIds.includes(memberRoleId)) {
    mapped.push(roles.member);
  }

  if (communityManagerRoleId && roleIds.includes(communityManagerRoleId)) {
    mapped.push(roles.communityManager);
  }

  return mapped;
}
