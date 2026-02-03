import Image from "next/image";
import Link from "next/link";

import { config } from "@/lib/config";
import { formatNzHeaderTime } from "@/lib/format";
import { Container } from "@/components/Container";

export function Nav() {
  return (
    <header className="border-b border-white/10 bg-base-850/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/nzf_logo.png" alt="NZF logo" width={60} height={60} />
          <div className="leading-tight">
            <div className="text-2xl font-semibold text-white md:text-3xl">New Zealand Forces</div>
            <div className="text-base text-muted md:text-lg">Ops Portal</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <span className="rounded border border-white/15 bg-base-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
            {formatNzHeaderTime(new Date().toISOString())}
          </span>
          <Link href="/operations">Operations</Link>
          <Link href="#highlights">Highlights</Link>
          <Link href="#about">About</Link>
          <a
            href={config.discordInviteUrl}
            className="rounded border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 hover:text-white"
          >
            Join Discord
          </a>
          <button className="rounded bg-accent-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-base-900">
            Sign In
          </button>
        </nav>
        <button className="md:hidden rounded border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide">
          Menu
        </button>
      </Container>
    </header>
  );
}
