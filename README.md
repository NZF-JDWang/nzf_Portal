# NZF Ops Portal (Prototype)

Prototype operations portal for the New Zealand Forces (NZF) Arma Reforger milsim unit.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (or the port shown in the terminal).

## Project Notes

- Built with Next.js (App Router), TypeScript, and Tailwind CSS.
- Data is mocked in `data/operations.ts` for rapid UI iteration.
- Discord auth is provisioned but not implemented yet.
- Calendar is the primary UX (Sunday-first, NZT, 24-hour time).

## Config

Update the Discord invite URL in `lib/config.ts`.
