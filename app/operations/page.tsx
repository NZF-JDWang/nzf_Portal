import { Container } from "@/components/Container";
import { OpCard } from "@/components/OpCard";
import { SectionHeader } from "@/components/SectionHeader";
import { getOperations } from "@/data/operations";

export default async function OperationsPage() {
  const operations = await getOperations();
  const upcoming = operations.filter((operation) => new Date(operation.startsAt).getTime() >= Date.now());
  const past = operations.filter((operation) => new Date(operation.startsAt).getTime() < Date.now());

  return (
    <section className="py-12">
      <Container className="space-y-10">
        <SectionHeader title="Operations" subtitle="Upcoming ops first. Past ops are archived below." />
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-muted">
          <span>Filters (UI only):</span>
          <button className="rounded border border-white/10 px-3 py-1 hover:border-white/30">All</button>
          <button className="rounded border border-white/10 px-3 py-1 hover:border-white/30">Reforger</button>
          <button className="rounded border border-white/10 px-3 py-1 hover:border-white/30">Arma 3</button>
          <button className="rounded border border-white/10 px-3 py-1 hover:border-white/30">Open</button>
          <button className="rounded border border-white/10 px-3 py-1 hover:border-white/30">Limited</button>
          <button className="rounded border border-white/10 px-3 py-1 hover:border-white/30">Full</button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((operation) => (
            <OpCard key={operation.id} operation={operation} />
          ))}
        </div>

        <div className="space-y-6 border-t border-white/10 pt-10">
          <SectionHeader title="Past Operations" subtitle="Recent past ops are retained for quick reference." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map((operation) => (
              <OpCard key={operation.id} operation={operation} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
