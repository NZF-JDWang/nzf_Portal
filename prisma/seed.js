import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const operations = [
  {
    id: "kauri-shield",
    name: "Operation Kauri Shield",
    startsAt: "2026-02-07T19:30:00+13:00",
    game: "Reforger",
    status: "Open",
    missionMaker: "Lt. Harper",
    teaser: "Secure the northern ridgeline and establish a forward NZF FOB.",
    signups: ["Hawke", "Rangi", "Tama", "Moana", "Kiri", "Wiremu", "Matiu"],
    briefing: {
      situation:
        "A hostile militia has fortified the northern ridgeline and is staging raids on local infrastructure.",
      enemyForces:
        "Irregular infantry with limited mechanised support and entrenched positions along the ridge.",
      friendlyForces: "NZF Alpha and Bravo sections with rotary support on standby.",
      objectives: "Seize the ridge, destroy militia caches, and hold the FOB for 30 minutes.",
      execution:
        "Alpha clears the west approach, Bravo flanks from the riverbed. CAS on call if resistance escalates.",
      commandSignal: "Primary comms on NZF Tac 1. Alternate on Tac 2 if jamming occurs.",
      rulesOfEngagement: "Positive ID required. Avoid collateral damage near civilian structures."
    },
    intel: [
      { src: "/brand/nzf_flag.png", label: "AO Overview" },
      { src: "/brand/nzf_logo_battleworn.png", label: "Objective Markers" }
    ],
    comments: [
      {
        author: "Hawke",
        role: "Mission Maker",
        timestamp: "2026-02-03T18:12:00+13:00",
        body: "Reminder: bring night optics, the final push will be after sunset."
      },
      {
        author: "Rangi",
        timestamp: "2026-02-03T19:05:00+13:00",
        body: "Logistics run will be staged from the south road. Check your radios."
      }
    ]
  },
  {
    id: "southern-cross",
    name: "Operation Southern Cross",
    startsAt: "2026-02-13T20:00:00+13:00",
    game: "Reforger",
    status: "Limited",
    missionMaker: "Capt. Ellis",
    teaser: "Rapid deployment to protect allied convoy through contested terrain.",
    signups: ["Rangi", "Kiri", "Matiu", "Aroha"],
    briefing: {
      situation: "Allied convoy is set to traverse hostile territory under high risk of ambush.",
      enemyForces: "Light infantry with RPG capability and drone scouting.",
      friendlyForces: "NZF mechanised element with convoy escort vehicles.",
      objectives: "Escort the convoy, neutralise ambushes, and secure the drop zone.",
      execution: "Lead element clears checkpoints; rear element provides overwatch and recovery.",
      commandSignal: "Convoy net on NZF Tac 3. Air-to-ground on Tac 4.",
      rulesOfEngagement: "Escalation of force permitted if convoy is threatened."
    },
    intel: [{ src: "/brand/nzf_logo.png", label: "Route Sketch" }],
    comments: [
      {
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
    signups: ["Hawke", "Tama", "Moana"],
    briefing: {
      situation: "Insurgent cells are operating out of the harbour district and targeting infrastructure.",
      enemyForces: "Small cell squads with light vehicles and IED capability.",
      friendlyForces: "NZF combined arms team with UAV reconnaissance.",
      objectives: "Secure the docks, recover intel cache, and extract cleanly.",
      execution: "Section 1 clears docks, Section 2 secures the warehouse grid.",
      commandSignal: "Primary comms on NZF Tac 1. UAV feed on Tac 5.",
      rulesOfEngagement: "Minimise civilian impact. Confirm targets before engagement."
    },
    intel: [{ src: "/brand/nzf_flag.png", label: "Dock Layout" }],
    comments: []
  },
  {
    id: "night-river",
    name: "Operation Night River",
    startsAt: "2026-01-28T19:30:00+13:00",
    game: "Reforger",
    status: "Closed",
    missionMaker: "Lt. Harper",
    teaser: "Completed raid to disrupt enemy resupply route.",
    signups: ["Aroha", "Wiremu", "Matiu", "Kiri"],
    briefing: {
      situation: "Enemy resupply route ran along the night river corridor. Mission complete.",
      enemyForces: "Light infantry with limited patrols along the river.",
      friendlyForces: "NZF Alpha and Bravo sections.",
      objectives: "Destroy supply crates and withdraw to extraction point.",
      execution: "Silent approach, timed breach, rapid extraction.",
      commandSignal: "Silent comms enforced. Break glass on Tac 2.",
      rulesOfEngagement: "Avoid detection where possible."
    },
    intel: [{ src: "/brand/nzf_logo_battleworn.png", label: "After Action Map" }],
    comments: []
  }
];

async function main() {
  await prisma.comment.deleteMany();
  await prisma.intelAsset.deleteMany();
  await prisma.signup.deleteMany();
  await prisma.briefing.deleteMany();
  await prisma.operation.deleteMany();

  for (const operation of operations) {
    await prisma.operation.create({
      data: {
        id: operation.id,
        name: operation.name,
        startsAt: new Date(operation.startsAt),
        game: operation.game,
        status: operation.status,
        missionMaker: operation.missionMaker,
        teaser: operation.teaser,
        briefing: { create: operation.briefing },
        intel: { create: operation.intel },
        comments: {
          create: operation.comments.map((comment) => ({
            author: comment.author,
            role: comment.role,
            timestamp: new Date(comment.timestamp),
            body: comment.body
          }))
        },
        signups: { create: operation.signups.map((name) => ({ name })) }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
