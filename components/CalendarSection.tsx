"use client";

import { useMemo, useState } from "react";

import type { Operation } from "@/types/operation";
import { CalendarMonth } from "@/components/CalendarMonth";
import Image from "next/image";

import { Badge } from "@/components/Badge";
import { formatNzDateTime } from "@/lib/format";

type CalendarSectionProps = {
  operations: Operation[];
  initialSelectedId?: string;
};

export function CalendarSection({ operations, initialSelectedId }: CalendarSectionProps) {
  const initialSelection = useMemo(() => {
    if (initialSelectedId) {
      return operations.find((operation) => operation.id === initialSelectedId) ?? null;
    }
    return operations[0] ?? null;
  }, [initialSelectedId, operations]);

  const [selected, setSelected] = useState<Operation | null>(initialSelection);

  const signupList = selected?.signups ?? [];
  const signupCount = signupList.length;

  return (
    <div className="grid gap-10 xl:grid-cols-[1.05fr_1.35fr] xl:items-start">
      <div className="aspect-square w-full">
        <CalendarMonth
          operations={operations}
          monthIso={selected?.startsAt}
          selectedOperationId={selected?.id}
          onSelect={setSelected}
        />
      </div>
      <div className="space-y-6">
        <div className="rounded-lg border border-white/10 bg-base-800 p-6">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wide text-muted">Selected Operation</div>
            {selected ? <Badge label={selected.game} /> : null}
          </div>
          <div className="mt-3 text-2xl font-semibold">{selected?.name ?? "Select an operation"}</div>
          {selected ? (
            <>
              <div className="mt-2 text-sm text-muted">{formatNzDateTime(selected.startsAt)}</div>
              <div className="mt-4 text-sm text-white/70">
                <span className="text-xs uppercase tracking-wide text-muted">Mission Maker</span>
                <div className="mt-1 text-white">{selected.missionMaker}</div>
              </div>
              <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-base-900/60">
                <Image
                  src={selected.intel[0]?.src ?? "/brand/nzf_logo.png"}
                  alt={selected.intel[0]?.label ?? "Mission intel"}
                  width={900}
                  height={540}
                  className="h-56 w-full object-cover md:h-64"
                />
              </div>
              <div className="mt-6 space-y-4 text-sm text-white/70">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted">Situation</div>
                  <p className="mt-2">{selected.briefing.situation}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted">Enemy Forces</div>
                  <p className="mt-2">{selected.briefing.enemyForces}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted">Friendly Forces</div>
                  <p className="mt-2">{selected.briefing.friendlyForces}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted">Objectives</div>
                  <p className="mt-2">{selected.briefing.objectives}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted">Execution</div>
                  <p className="mt-2">{selected.briefing.execution}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted">Command & Signal</div>
                  <p className="mt-2">{selected.briefing.commandSignal}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted">Rules of Engagement</div>
                  <p className="mt-2">{selected.briefing.rulesOfEngagement}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted">
              Click an operation in the calendar to see the full briefing and signups.
            </p>
          )}
        </div>

        <div className="rounded-lg border border-white/10 bg-base-800 p-6">
          <div className="text-xs uppercase tracking-wide text-muted">Signups</div>
          {selected ? (
            <>
              <div className="mt-2 text-sm text-white/70">
                {signupCount} {signupCount === 1 ? "member" : "members"} signed up
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {signupList.length === 0 ? (
                  <span className="text-sm text-muted">No signups yet.</span>
                ) : (
                  signupList.map((name) => (
                    <span
                      key={name}
                      className="rounded border border-white/10 bg-base-900/80 px-3 py-1 text-xs text-white/70"
                    >
                      {name}
                    </span>
                  ))
                )}
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted">Select an operation to see who is attending.</p>
          )}
        </div>
      </div>
    </div>
  );
}
