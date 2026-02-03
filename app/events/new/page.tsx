"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { canCreateEvent } from "@/lib/roles";

export default function NewEventPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:30");
  const [description, setDescription] = useState("");

  const isAuthorized = useMemo(() => canCreateEvent(session ?? null), [session]);

  if (!isAuthorized) {
    return (
      <section className="py-12">
        <Container className="space-y-6">
          <SectionHeader title="Add Event" subtitle="Members can schedule non-mission events." />
          <div className="rounded-lg border border-white/10 bg-base-800 p-6 text-sm text-muted">
            You need the Member role (or superuser access) to add events.
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12">
      <Container className="space-y-6">
        <SectionHeader title="Add Event" subtitle="Schedule non-mission calendar events." />
        <div className="rounded-lg border border-white/10 bg-base-800 p-6">
          <div className="grid gap-4 text-sm">
            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-wide text-muted">Title</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="rounded border border-white/10 bg-base-900/60 px-3 py-2 text-sm"
                placeholder="Event title"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-wide text-muted">Date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="rounded border border-white/10 bg-base-900/60 px-3 py-2 text-sm"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-wide text-muted">Time</span>
                <input
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className="rounded border border-white/10 bg-base-900/60 px-3 py-2 text-sm"
                />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-wide text-muted">Description</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-[120px] rounded border border-white/10 bg-base-900/60 px-3 py-2 text-sm"
                placeholder="Event details..."
              />
            </label>
          </div>
          <button
            type="button"
            className="mt-6 rounded bg-accent-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-base-900"
          >
            Save Event (stub)
          </button>
        </div>
      </Container>
    </section>
  );
}
