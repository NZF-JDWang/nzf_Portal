import Image from "next/image";

import { Container } from "@/components/Container";
import { CalendarSection } from "@/components/CalendarSection";
import { SectionHeader } from "@/components/SectionHeader";
import { config } from "@/lib/config";
import { getCalendarItems } from "@/data/calendar";
import { getCalendarItemStartsAt } from "@/types/calendar";

export default function HomePage() {
  const items = getCalendarItems();
  const nextOp = items.find((item) => new Date(getCalendarItemStartsAt(item)).getTime() >= Date.now());

  return (
    <div>
      <section className="bg-gradient-to-b from-base-850 via-base-900 to-base-900 py-12">
        <Container className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image src="/brand/nzf_logo_battleworn.png" alt="NZF battleworn logo" width={48} height={48} />
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">NZF Ops Portal</div>
                <h1 className="text-2xl font-semibold">Operations Calendar</h1>
              </div>
            </div>
            <a
              href={config.discordInviteUrl}
              className="rounded border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white/80 hover:text-white"
            >
              Join Discord
            </a>
          </div>
          <CalendarSection items={items} initialSelectedId={nextOp?.id} />
        </Container>
      </section>

      <section id="highlights" className="border-t border-white/10 bg-base-850 py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <SectionHeader title="Highlights" subtitle="Recent clips and moments that show NZF in action." />
            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg border border-white/10">
                <iframe
                  className="h-56 w-full md:h-64"
                  src="https://www.youtube-nocookie.com/embed/ysz5S6PUM-U"
                  title="NZF highlight reel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <div className="overflow-hidden rounded-lg border border-white/10">
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
                className="rounded-lg border border-white/10 bg-base-800 object-cover"
              />
              <Image
                src="/brand/nzf_logo_battleworn.png"
                alt="NZF highlight"
                width={400}
                height={300}
                className="rounded-lg border border-white/10 bg-base-800 object-cover"
              />
              <Image
                src="/brand/nzf_flag.png"
                alt="NZF highlight"
                width={400}
                height={300}
                className="rounded-lg border border-white/10 bg-base-800 object-cover"
              />
              <div className="flex items-center justify-center rounded-lg border border-dashed border-white/20 bg-base-800 text-sm text-muted">
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
          <div className="rounded-lg border border-white/10 bg-base-800 p-8">
            <div className="text-sm font-semibold">Ready to deploy?</div>
            <p className="mt-2 text-sm text-muted">
              Join the Discord to get onboarded, receive briefings, and see upcoming ops first.
            </p>
            <a
              href={config.discordInviteUrl}
              className="mt-6 inline-flex rounded bg-accent-500 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-base-900"
            >
              Join Discord
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
