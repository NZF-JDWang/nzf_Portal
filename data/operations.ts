import type { Operation } from "@/types/operation";

export const operations: Operation[] = [
  {
    id: "kauri-shield",
    name: "Operation Kauri Shield",
    startsAt: "2026-02-07T19:30:00+13:00",
    game: "Reforger",
    status: "Open",
    missionMaker: "Lt. Harper",
    teaser: "Secure the northern ridgeline and establish a forward NZF FOB.",
    briefing: {
      situation:
        "A hostile militia has fortified the northern ridgeline and is staging raids on local infrastructure.",
      enemyForces:
        "Irregular infantry with limited mechanised support and entrenched positions along the ridge.",
      friendlyForces:
        "NZF Alpha and Bravo sections with rotary support on standby.",
      objectives:
        "Seize the ridge, destroy militia caches, and hold the FOB for 30 minutes.",
      execution:
        "Alpha clears the west approach, Bravo flanks from the riverbed. CAS on call if resistance escalates.",
      commandSignal:
        "Primary comms on NZF Tac 1. Alternate on Tac 2 if jamming occurs.",
      rulesOfEngagement:
        "Positive ID required. Avoid collateral damage near civilian structures."
    },
    intel: [
      { src: "/brand/nzf_flag.png", label: "AO Overview" },
      { src: "/brand/nzf_logo_battleworn.png", label: "Objective Markers" }
    ],
    comments: [
      {
        id: "c1",
        author: "Hawke",
        role: "Mission Maker",
        timestamp: "2026-02-03T18:12:00+13:00",
        body: "Reminder: bring night optics, the final push will be after sunset."
      },
      {
        id: "c2",
        author: "Rangi",
        timestamp: "2026-02-03T19:05:00+13:00",
        body: "Logistics run will be staged from the south road. Check your radios."
      }
    ]
  },
  {
    id: "southern-cross",
    name: "Operation Southern Cross",
    startsAt: "2026-02-14T20:00:00+13:00",
    game: "Reforger",
    status: "Limited",
    missionMaker: "Capt. Ellis",
    teaser: "Rapid deployment to protect allied convoy through contested terrain.",
    briefing: {
      situation:
        "Allied convoy is set to traverse hostile territory under high risk of ambush.",
      enemyForces:
        "Light infantry with RPG capability and drone scouting.",
      friendlyForces:
        "NZF mechanised element with convoy escort vehicles.",
      objectives:
        "Escort the convoy, neutralise ambushes, and secure the drop zone.",
      execution:
        "Lead element clears checkpoints; rear element provides overwatch and recovery.",
      commandSignal:
        "Convoy net on NZF Tac 3. Air-to-ground on Tac 4.",
      rulesOfEngagement:
        "Escalation of force permitted if convoy is threatened."
    },
    intel: [{ src: "/brand/nzf_logo.png", label: "Route Sketch" }],
    comments: [
      {
        id: "c3",
        author: "Matiu",
        timestamp: "2026-02-01T21:02:00+13:00",
        body: "Limited slots — confirm attendance early."
      }
    ]
  },
  {
    id: "harbourwatch",
    name: "Operation Harbourwatch",
    startsAt: "2026-02-21T19:00:00+13:00",
    game: "Arma 3",
    status: "Open",
    missionMaker: "WO Fisher",
    teaser: "Urban security sweep and intel recovery at the harbour.",
    briefing: {
      situation:
        "Insurgent cells are operating out of the harbour district and targeting infrastructure.",
      enemyForces:
        "Small cell squads with light vehicles and IED capability.",
      friendlyForces:
        "NZF combined arms team with UAV reconnaissance.",
      objectives:
        "Secure the docks, recover intel cache, and extract cleanly.",
      execution:
        "Section 1 clears docks, Section 2 secures the warehouse grid.",
      commandSignal:
        "Primary comms on NZF Tac 1. UAV feed on Tac 5.",
      rulesOfEngagement:
        "Minimise civilian impact. Confirm targets before engagement."
    },
    intel: [{ src: "/brand/nzf_flag.png", label: "Dock Layout" }],
    comments: []
  },
  {
    id: "night-river",
    name: "Operation Night River",
    startsAt: "2026-01-24T19:30:00+13:00",
    game: "Reforger",
    status: "Closed",
    missionMaker: "Lt. Harper",
    teaser: "Completed raid to disrupt enemy resupply route.",
    briefing: {
      situation:
        "Enemy resupply route ran along the night river corridor. Mission complete.",
      enemyForces:
        "Light infantry with limited patrols along the river.",
      friendlyForces:
        "NZF Alpha and Bravo sections.",
      objectives:
        "Destroy supply crates and withdraw to extraction point.",
      execution:
        "Silent approach, timed breach, rapid extraction.",
      commandSignal:
        "Silent comms enforced. Break glass on Tac 2.",
      rulesOfEngagement:
        "Avoid detection where possible."
    },
    intel: [{ src: "/brand/nzf_logo_battleworn.png", label: "After Action Map" }],
    comments: []
  }
];

export function getOperationById(id: string): Operation | undefined {
  return operations.find((operation) => operation.id === id);
}

export const upcomingOperations = operations.filter((operation) => {
  return new Date(operation.startsAt).getTime() >= Date.now();
});
