import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { SectionHeader } from "@/components/SectionHeader";
import { getOperationById } from "@/data/operations";
import { formatNzDate, formatNzDateTime, formatNzTime, statusColor } from "@/lib/format";
import { getSession } from "@/lib/auth/mock";
import { canComment } from "@/lib/roles";

type OperationPageProps = {
  params: { id: string };
};

export default async function OperationPage({ params }: OperationPageProps) {
  const operation = await getOperationById(params.id);
  if (!operation) {
    notFound();
  }

  const session = await getSession();
  const canWrite = session ? canComment(session.roles) : false;

  return (
    <section className="py-12">
      <Container className="space-y-10">
        <div className="rounded-lg border border-white/10 bg-base-800 p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wide text-muted">Operation</div>
              <h1 className="text-3xl font-semibold">{operation.name}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge label={operation.game} />
              <span className={`rounded px-3 py-1 text-xs font-semibold ${statusColor(operation.status)}`}>
                {operation.status}
              </span>
            </div>
          </div>
          <div className="mt-6 grid gap-4 text-sm text-white/70 md:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">Date</div>
              <div className="text-white">{formatNzDate(operation.startsAt)}</div>
              <div>{formatNzTime(operation.startsAt)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">Mission Maker</div>
              <div className="text-white">{operation.missionMaker}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">Status</div>
              <div className="text-white">{operation.status}</div>
            </div>
          </div>
          <div className="mt-6 text-sm text-muted">{operation.teaser}</div>
          <div className="mt-4 text-xs uppercase tracking-wide text-white/50">
            {formatNzDateTime(operation.startsAt)}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <SectionHeader title="Mission Briefing" subtitle="Structured, consistent briefing sections." />
            <div className="space-y-6 text-sm text-white/70">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">Situation</div>
                <p className="mt-2">{operation.briefing.situation}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">Enemy Forces</div>
                <p className="mt-2">{operation.briefing.enemyForces}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">Friendly Forces</div>
                <p className="mt-2">{operation.briefing.friendlyForces}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">Mission Objectives</div>
                <p className="mt-2">{operation.briefing.objectives}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">Execution</div>
                <p className="mt-2">{operation.briefing.execution}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">Command & Signal</div>
                <p className="mt-2">{operation.briefing.commandSignal}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted">Rules of Engagement</div>
                <p className="mt-2">{operation.briefing.rulesOfEngagement}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeader title="Intel" subtitle="Reference images and maps for the AO." />
            <div className="grid gap-4">
              {operation.intel.map((asset) => (
                <div key={asset.src} className="overflow-hidden rounded-lg border border-white/10 bg-base-800">
                  <Image src={asset.src} alt={asset.label ?? "Intel"} width={600} height={360} />
                  {asset.label ? <div className="px-4 py-3 text-xs text-muted">{asset.label}</div> : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeader title="Comments" subtitle="Public read-only. Members can post after sign-in." />
          <div className="space-y-4">
            {operation.comments.length === 0 ? (
              <div className="rounded-lg border border-dashed border-white/15 bg-base-800 p-6 text-sm text-muted">
                No comments yet.
              </div>
            ) : (
              operation.comments.map((comment) => (
                <div key={comment.id} className="rounded-lg border border-white/10 bg-base-800 p-5">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{comment.author}</span>
                      {comment.role ? (
                        <span className="rounded border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                          {comment.role}
                        </span>
                      ) : null}
                    </div>
                    <span>{formatNzDateTime(comment.timestamp)}</span>
                  </div>
                  <p className="mt-3 text-sm text-white/70">{comment.body}</p>
                </div>
              ))
            )}
          </div>
          <div className="rounded-lg border border-white/10 bg-base-800 p-6">
            <div className="text-sm font-semibold">{canWrite ? "Write a comment" : "Sign in to comment"}</div>
            <p className="mt-2 text-sm text-muted">
              {canWrite
                ? "Once Discord auth is wired, members can leave briefing updates here."
                : "Discord login will unlock comments for NZF members."}
            </p>
            <button
              disabled={!canWrite}
              className={`mt-4 rounded px-5 py-2 text-xs font-semibold uppercase tracking-wide ${
                canWrite ? "bg-accent-500 text-base-900" : "border border-white/15 text-white/40"
              }`}
            >
              {canWrite ? "Post Comment" : "Sign In Required"}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
