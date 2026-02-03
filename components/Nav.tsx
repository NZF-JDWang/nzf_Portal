import Image from "next/image";
import Link from "next/link";

import { config } from "@/lib/config";
import { Container } from "@/components/Container";

export function Nav() {
  return (
    <header className="border-b border-white/10 bg-base-850/80 backdrop-blur">
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/nzf_logo.png" alt="NZF logo" width={36} height={36} />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">New Zealand Forces</div>
            <div className="text-xs text-muted">Ops Portal</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/operations">Operations</Link>
          <Link href="#highlights">Highlights</Link>
          <Link href="#about">About</Link>
          <a
            href={config.discordInviteUrl}
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 hover:text-white"
          >
            Join Discord
          </a>
          <button className="rounded-full bg-accent-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-base-900">
            Sign In
          </button>
        </nav>
        <button className="md:hidden rounded-full border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide">
          Menu
        </button>
      </Container>
    </header>
  );
}
