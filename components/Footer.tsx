import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-base-850">
      <Container className="flex flex-col items-start justify-between gap-4 py-10 text-sm text-muted md:flex-row md:items-center">
        <div>© 2026 New Zealand Forces. All rights reserved.</div>
        <div className="flex gap-4 text-xs uppercase tracking-wide">
          <span>Reforger</span>
          <span>Arma 3</span>
          <span>NZT</span>
        </div>
      </Container>
    </footer>
  );
}
