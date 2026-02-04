"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { getCalendarItems } from "@/data/calendar";
import { getNzDateKey } from "@/lib/calendar";
import { getCalendarItemStartsAt, getCalendarItemTitle } from "@/types/calendar";

export default function NewEventPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [timeHour, setTimeHour] = useState("19");
  const [timeMinute, setTimeMinute] = useState("00");
  const [description, setDescription] = useState("");

  const selectedDateKey = useMemo(() => {
    if (!date) return "";
    return getNzDateKey(new Date(`${date}T12:00:00`));
  }, [date]);

  const conflictingItem = useMemo(() => {
    if (!selectedDateKey) return null;
    return (
      getCalendarItems().find((item) => getNzDateKey(getCalendarItemStartsAt(item)) === selectedDateKey) ?? null
    );
  }, [selectedDateKey]);

  return (
    <section className="bg-gradient-to-b from-base-850 via-base-900 to-base-900 py-10">
      <Container className="space-y-8">
        <div className="space-y-2">
          <SectionHeader title="Add Calendar Event" subtitle="Create training, briefings, or community events in NZT." />
          {conflictingItem ? (
            <div className="rounded border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              There is already a calendar item on this date: <strong>{getCalendarItemTitle(conflictingItem)}</strong>.
            </div>
          ) : null}
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <div className="space-y-6 rounded-lg border border-white/10 bg-base-800 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-wide text-muted">Event Title</label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="mt-2 w-full rounded border border-white/10 bg-base-900/70 px-3 py-2 text-sm text-white"
                  placeholder="Leadership Workshop"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-muted">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="mt-2 w-full rounded border border-white/10 bg-base-900/70 px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-muted">Start Time (24h)</label>
                <div className="mt-2 flex items-center gap-2">
                  <select
                    value={timeHour}
                    onChange={(event) => setTimeHour(event.target.value)}
                    className="w-20 rounded border border-white/10 bg-base-900/70 px-3 py-2 text-sm text-white"
                  >
                    {Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0")).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-white/60">:</span>
                  <select
                    value={timeMinute}
                    onChange={(event) => setTimeMinute(event.target.value)}
                    className="w-20 rounded border border-white/10 bg-base-900/70 px-3 py-2 text-sm text-white"
                  >
                    {["00", "15", "30", "45"].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-muted">Event Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-2 h-48 w-full rounded border border-white/10 bg-base-900/70 p-3 text-sm text-white"
                placeholder="Share the agenda, dress code, or expectations for attendees."
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-base-800 p-6">
              <div className="text-xs uppercase tracking-wide text-muted">Preview</div>
              <div className="mt-3 space-y-2 text-sm text-white/70">
                <div className="text-base font-semibold text-white">{title || "Event Title"}</div>
                <div>
                  {date ? `${date} ${timeHour}:${timeMinute} NZT` : "Select a date and time for the event."}
                </div>
                <p>{description || "Add a short description so members know what to expect."}</p>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-base-800 p-6">
              <button
                type="button"
                className="w-full rounded bg-emerald-500 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-base-900"
              >
                Create Event (Stub)
              </button>
              <p className="mt-3 text-xs text-muted">
                This is a prototype UI only — saving and notifications will be wired later.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
