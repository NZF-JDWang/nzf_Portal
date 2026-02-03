import Image from "next/image";

import { Container } from "@/components/Container";
import { OpCard } from "@/components/OpCard";
import { SectionHeader } from "@/components/SectionHeader";
import { config } from "@/lib/config";
import { formatNzDateTime } from "@/lib/format";
import { upcomingOperations } from "@/data/operations";

export default function HomePage() {
  const nextOp = upcomingOperations[0];
  const featuredOps = upcomingOperations.slice(0, 3);

  return (
    <div>
      <section className="bg-gradient-to-b from-base-850 via-base-900 to-base-900 py-16">
        <Container className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Image src="/brand/nzf_logo_battleworn.png" alt="NZF battleworn logo" width={64} height={64} />
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
                Living Operations Board
              </span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              NZF runs clean, tactical operations every week — know the next op at a glance.
            </h1>
            <p className="text-lg text-muted">
              A calm, professional hub for mission briefings, upcoming ops, and highlights. Public by default, ready
              for Discord when needed.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/operations"
                className="rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-base-900"
              >
                View Upcoming Operations
              </a>
              <a
                href={config.discordInviteUrl}
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white/80 hover:text-white"
              >
                Join Discord
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-base-800 p-8 shadow-card">
            <div className="text-xs uppercase tracking-wide text-muted">Next Operation</div>
            <div className="mt-2 text-2xl font-semibold">{nextOp?.name ?? "No upcoming operations"}</div>
            <div className="mt-3 text-sm text-muted">{nextOp?.teaser}</div>
            <div className="mt-6 grid gap-3 text-sm text-white/70">
              <div className="flex items-center justify-between">
                <span>Date</span>
                <span className="text-white">{nextOp ? formatNzDateTime(nextOp.startsAt) : "TBA"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Game</span>
                <span className="text-white">{nextOp?.game ?? "TBA"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="text-white">{nextOp?.status ?? "TBA"}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-8">
          <SectionHeader
            title="Upcoming Operations"
            subtitle="Immediate visibility on what’s next, with clear briefs and status."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredOps.map((operation, index) => (
              <OpCard key={operation.id} operation={operation} highlight={index === 0} />
            ))}
          </div>
        </Container>
      </section>

      <section id="highlights" className="border-t border-white/10 bg-base-850 py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <SectionHeader title="Highlights" subtitle="Recent clips and moments that show NZF in action." />
            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  className="h-56 w-full md:h-64"
                  src="https://www.youtube-nocookie.com/embed/ysz5S6PUM-U"
                  title="NZF highlight reel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  className="h-56 w-full md:h-64"
                  src="https://www.youtube-nocookie.com/embed/jNQXAC9IVRw"
                  title="NZF operation highlights"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <SectionHeader title="Screenshot Gallery" subtitle="Curated imagery from recent missions." />
            <div className="grid gap-4 sm:grid-cols-2">
              <Image
                src="/brand/nzf_logo.png"
                alt="NZF highlight"
                width={400}
                height={300}
                className="rounded-2xl border border-white/10 bg-base-800 object-cover"
              />
              <Image
                src="/brand/nzf_logo_battleworn.png"
                alt="NZF highlight"
                width={400}
                height={300}
                className="rounded-2xl border border-white/10 bg-base-800 object-cover"
              />
              <Image
                src="/brand/nzf_flag.png"
                alt="NZF highlight"
                width={400}
                height={300}
                className="rounded-2xl border border-white/10 bg-base-800 object-cover"
              />
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-white/20 bg-base-800 text-sm text-muted">
                Add more imagery
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="about" className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <SectionHeader title="About NZF" subtitle="Organised milsim with a clear, professional cadence." />
            <p className="text-muted">
              New Zealand Forces is a milsim unit focused on structured operations, clear comms, and teamwork. We run
              weekly ops with a calm, mission-first approach — no gimmicks, no noise, just clean execution.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-base-800 p-8">
            <div className="text-sm font-semibold">Ready to deploy?</div>
            <p className="mt-2 text-sm text-muted">
              Join the Discord to get onboarded, receive briefings, and see upcoming ops first.
            </p>
            <a
              href={config.discordInviteUrl}
              className="mt-6 inline-flex rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-base-900"
            >
              Join Discord
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
