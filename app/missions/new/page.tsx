"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { operations } from "@/data/operations";
import { getNzDateKey } from "@/lib/calendar";
import { canCreateMission } from "@/lib/roles";

const games = ["Reforger", "Arma 3"] as const;

export default function NewMissionPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [timeHour, setTimeHour] = useState("20");
  const [timeMinute, setTimeMinute] = useState("00");
  const [game, setGame] = useState<(typeof games)[number]>("Reforger");
  const [missionMaker, setMissionMaker] = useState("");
  const [teaser, setTeaser] = useState("");
  const [briefing, setBriefing] = useState("");
  const [titleImage, setTitleImage] = useState<File | null>(null);
  const [intelImages, setIntelImages] = useState<File[]>([]);

  const selectedDateKey = useMemo(() => {
    if (!date) return "";
    return getNzDateKey(new Date(`${date}T12:00:00`));
  }, [date]);

  const conflictingOp = useMemo(() => {
    if (!selectedDateKey) return null;
    return operations.find((operation) => getNzDateKey(operation.startsAt) === selectedDateKey) ?? null;
  }, [selectedDateKey]);

  const titlePreview = useMemo(() => {
    if (!titleImage) return null;
    return URL.createObjectURL(titleImage);
  }, [titleImage]);

  const intelPreviews = useMemo(() => {
    return intelImages.map((file) => ({ file, url: URL.createObjectURL(file) }));
  }, [intelImages]);

  const isAuthorized = useMemo(() => canCreateMission(session ?? null), [session]);

  if (!isAuthorized) {
    return (
      <section className="py-12">
        <Container className="space-y-6">
          <SectionHeader title="Add Mission" subtitle="Mission Makers can publish new operations." />
          <div className="rounded-lg border border-white/10 bg-base-800 p-6 text-sm text-muted">
            You need the Mission Maker role (or superuser access) to add missions.
          </div>
        </Container>
      </section>
    );
  }

  useEffect(() => {
    return () => {
      if (titlePreview) URL.revokeObjectURL(titlePreview);
      intelPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [titlePreview, intelPreviews]);

  function handleAiRewrite() {
    if (!briefing.trim()) return;
    const cleaned = briefing.trim().replace(/\n{3,}/g, "\n\n");
    setBriefing(`AI REWRITE (stub)\n\n${cleaned}`);
  }

  return (
    <section className="bg-gradient-to-b from-base-850 via-base-900 to-base-900 py-10">
      <Container className="space-y-8">
        <div className="space-y-2">
          <SectionHeader title="Create New Mission" subtitle="Mission makers only. All times are NZT (24-hour)." />
          {conflictingOp ? (
            <div className="rounded border border-status-full/40 bg-status-full/10 px-4 py-3 text-sm text-status-full">
              There is already an operation scheduled on this date: <strong>{conflictingOp.name}</strong>.
            </div>
          ) : null}
        </div>

        <div className="grid gap-8 xl:grid-cols-[1fr_1fr] xl:items-start">
          <div className="space-y-6 rounded-lg border border-white/10 bg-base-800 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wide text-muted">Mission Name</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded border border-white/10 bg-base-900/70 px-3 py-2 text-sm text-white"
                  placeholder="Operation Kauri Shield"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-muted">Mission Maker</label>
                <input
                  value={missionMaker}
                  onChange={(event) => setMissionMaker(event.target.value)}
                  className="mt-2 w-full rounded border border-white/10 bg-base-900/70 px-3 py-2 text-sm text-white"
                  placeholder="Lt. Harper"
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
              <div>
                <label className="text-xs uppercase tracking-wide text-muted">Game</label>
                <select
                  value={game}
                  onChange={(event) => setGame(event.target.value as (typeof games)[number])}
                  className="mt-2 w-full rounded border border-white/10 bg-base-900/70 px-3 py-2 text-sm text-white"
                >
                  {games.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-muted">Short Teaser</label>
                <input
                  value={teaser}
                  onChange={(event) => setTeaser(event.target.value)}
                  className="mt-2 w-full rounded border border-white/10 bg-base-900/70 px-3 py-2 text-sm text-white"
                  placeholder="Secure the northern ridgeline..."
                />
              </div>
            </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wide text-muted">Title Image (2:1 ratio)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setTitleImage(event.target.files?.[0] ?? null)}
                  className="w-full text-sm text-white/70"
                />
                {titlePreview ? (
                  <img
                    src={titlePreview}
                    alt="Title preview"
                    className="aspect-[2/1] w-full rounded border border-white/10 object-cover"
                  />
                ) : (
                  <div className="aspect-[2/1] w-full rounded border border-dashed border-white/15 bg-base-900/60" />
                )}
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wide text-muted">Intel Images (2:1 ratio)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => setIntelImages(Array.from(event.target.files ?? []))}
                  className="w-full text-sm text-white/70"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {intelPreviews.length === 0 ? (
                    <div className="aspect-[2/1] rounded border border-dashed border-white/15 bg-base-900/60" />
                  ) : (
                    intelPreviews.map((preview) => (
                      <img
                        key={preview.url}
                        src={preview.url}
                        alt={preview.file.name}
                        className="aspect-[2/1] w-full rounded border border-white/10 object-cover"
                      />
                    ))
                  )}
                </div>
              </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-base-800 p-6">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wide text-muted">Mission Brief</div>
                <button
                  type="button"
                  onClick={handleAiRewrite}
                  className="rounded border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/70 hover:border-white/30"
                >
                  AI Rewrite
                </button>
              </div>
              <textarea
                value={briefing}
                onChange={(event) => setBriefing(event.target.value)}
                className="mt-3 h-80 w-full rounded border border-white/10 bg-base-900/70 p-3 text-sm text-white"
                placeholder="Write the mission briefing here. Markdown supported."
              />
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                <span className="rounded border border-white/10 px-2 py-1">**bold**</span>
                <span className="rounded border border-white/10 px-2 py-1">_italic_</span>
                <span className="rounded border border-white/10 px-2 py-1"># Heading</span>
                <span className="rounded border border-white/10 px-2 py-1">- list</span>
                <span className="rounded border border-white/10 px-2 py-1">[link](url)</span>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-base-800 p-6">
              <button
                type="button"
                disabled={Boolean(conflictingOp)}
                className={`w-full rounded px-4 py-3 text-xs font-semibold uppercase tracking-wide ${
                  conflictingOp ? "border border-white/15 text-white/40" : "bg-accent-500 text-base-900"
                }`}
              >
                Create Mission (Stub)
              </button>
              <p className="mt-3 text-xs text-muted">
                This is a prototype UI only — saving and AI integration will be wired later.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
