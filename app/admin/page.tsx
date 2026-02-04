import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { getServerAuthSession } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/roles";

export default async function AdminPage() {
  const session = await getServerAuthSession();

  if (!canAccessAdmin(session)) {
    notFound();
  }

  return (
    <section className="py-12">
      <Container className="space-y-6">
        <SectionHeader title="Admin" subtitle="Community manager tools and overview." />
        <div className="rounded-lg border border-white/10 bg-base-800 p-6 text-sm text-muted">
          Admin tools will live here once the event and mission workflows are wired to the backend.
        </div>
      </Container>
    </section>
  );
}
