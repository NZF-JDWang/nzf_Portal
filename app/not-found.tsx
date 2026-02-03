import Link from "next/link";

import { Container } from "@/components/Container";

export default function NotFoundPage() {
  return (
    <section className="py-20">
      <Container className="space-y-6 text-center">
        <h1 className="text-3xl font-semibold">Not Found</h1>
        <p className="text-muted">That operation does not exist. Head back to the ops list.</p>
        <Link
          href="/operations"
          className="inline-flex rounded bg-accent-500 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-base-900"
        >
          View Operations
        </Link>
      </Container>
    </section>
  );
}
