import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { fetchDiscordMemberRoles } from "@/lib/auth/discord";
import { mapDiscordRoleIds } from "@/lib/auth/role-mapping";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "identify guilds guilds.members.read"
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        const roleIds = await fetchDiscordMemberRoles(account.access_token);
        token.roles = mapDiscordRoleIds(roleIds);
      }

      if (token.sub) {
        token.userId = token.sub;
      }

      const superuserId = process.env.DISCORD_SUPERUSER_ID;
      token.isSuperuser = Boolean(superuserId && token.sub === superuserId);

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId ?? "";
        session.user.roles = token.roles ?? [];
        session.user.isSuperuser = token.isSuperuser ?? false;
      }

      return session;
    }
  }
};
