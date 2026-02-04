# Auth Implementation Plan (Discord Sign-In)

## Goals
- Enable Discord OAuth sign-in for NZF members.
- Capture guild membership + role data (Mission Maker, Member, Community Manager, etc.).
- Enforce role-based access for event creation, mission creation, and admin tools.
- Ensure owner access to all features regardless of role (override).
- Provide a clean sign-in/sign-out UX in the header.

## Proposed Stack
- **NextAuth.js** (Auth.js) with Discord provider.
- **JWT session strategy** (no DB required for MVP).
- **Discord API** (guild member endpoint) to resolve role IDs.
- **Env config** for secrets and guild identifiers.

## Required Environment Variables
- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `DISCORD_GUILD_ID`
- `DISCORD_ROLE_MISSION_MAKER_ID`
- `DISCORD_ROLE_MEMBER_ID`
- `DISCORD_ROLE_COMMUNITY_MANAGER_ID`
- `DISCORD_SUPERUSER_ID` (your Discord user ID for full access)
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

## High-Level Flow
1. User clicks **Sign In** → Discord OAuth.
2. NextAuth callback retrieves access token.
3. On sign-in, call Discord Guild Member endpoint to fetch roles.
4. Store role IDs (and mapped role names) in JWT + session.
5. Gate mission creation API + UI with `Mission Maker` role.
6. Gate event creation API + UI with `Member` role.
7. Gate admin page with `Community Manager` role.
8. Allow superuser override for full access.

## Implementation Steps
### Phase 1: Auth Infrastructure
- Add `next-auth` dependency.
- Create NextAuth route handler: `app/api/auth/[...nextauth]/route.ts`.
- Configure Discord provider with scopes: `identify`, `guilds`, `guilds.members.read`.
- Set session strategy to JWT.
- Add `callbacks` to persist `roles` in token + session.

### Phase 2: Discord Role Sync
- Implement helper in `lib/auth/discord.ts` to:
  - fetch `/users/@me/guilds/{GUILD_ID}/member`.
  - extract `roles` array.
- Map role IDs to app roles in `lib/auth/roles.ts`.
- Add `isSuperuser` helper to override role gates.

### Phase 3: UI Integration
- Add sign-in / sign-out controls in `components/Nav.tsx`.
- Replace `lib/auth/mock.ts` with real session helper:
  - `getServerSession` in server components.
  - `useSession` in client components.
- Add an admin page entry point (visible only to community managers + superuser).

### Phase 4: Authorization Gates
- Protect mission creation:
  - Server route for create mission validates `Mission Maker` role (or superuser).
  - Client UI hides/disables create button when unauthorized.
- Protect event creation:
  - Server route for create event validates `Member` role (or superuser).
  - Client UI hides/disables create button when unauthorized.
- Protect admin page:
  - Server route validates `Community Manager` role (or superuser).

### Phase 5: Observability & DX
- Add a `/profile` or `/settings` page to show current roles.
- Log auth errors in server console with clear context.

## Open Questions
- Do we need a database now or later? (DB later; MVP can remain stateless.)
- Should we allow multiple Discord guilds or just NZF? (NZF only.)
- How should role display names map to app permissions? (1:1 mapping.)

## Acceptance Criteria
- Users can sign in via Discord.
- Sessions contain `userId`, `displayName`, and `roles`.
- Mission creation is blocked unless `Mission Maker` role (or superuser) is present.
- Event creation is blocked unless `Member` role (or superuser) is present.
- Admin page is accessible only to `Community Manager` role (or superuser).
- Sign-in/out flows are visible in the nav.
