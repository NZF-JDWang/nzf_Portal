import Link from "next/link";

import type { Operation } from "@/types/operation";
import { Badge } from "@/components/Badge";
import { formatNzDateTime, statusColor } from "@/lib/format";

type OpCardProps = {
  operation: Operation;
  highlight?: boolean;
};

export function OpCard({ operation, highlight }: OpCardProps) {
  return (
    <Link
      href={`/operations/${operation.id}`}
      className={`group flex h-full flex-col justify-between rounded-lg border border-white/10 bg-base-800 p-6 transition hover:-translate-y-1 hover:border-white/20 ${
        highlight ? "ring-1 ring-accent-500/40" : ""
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-white">{operation.name}</h3>
          <Badge label={operation.game} />
        </div>
        <div className="text-sm text-muted">{formatNzDateTime(operation.startsAt)}</div>
        <div className={`inline-flex rounded px-3 py-1 text-xs font-semibold ${statusColor(operation.status)}`}>
          {operation.status}
        </div>
        <p className="text-sm text-white/70">{operation.teaser}</p>
      </div>
      <div className="pt-5 text-xs font-semibold uppercase tracking-wide text-white/60 group-hover:text-white">
        View Briefing →
      </div>
    </Link>
  );
}
