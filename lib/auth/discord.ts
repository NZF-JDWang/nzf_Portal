export async function fetchDiscordMemberRoles(accessToken: string): Promise<string[]> {
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!guildId) {
    console.warn("DISCORD_GUILD_ID is not configured; skipping role fetch.");
    return [];
  }

  const response = await fetch(`https://discord.com/api/users/@me/guilds/${guildId}/member`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    console.warn("Failed to fetch Discord guild member roles.", {
      status: response.status,
      statusText: response.statusText
    });
    return [];
  }

  const data = (await response.json()) as { roles?: string[] };
  return data.roles ?? [];
}
