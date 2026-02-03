import type { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";

import "@/app/globals.css";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { AppSessionProvider } from "@/components/SessionProvider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "NZF Ops Portal",
  description: "Operations hub for the New Zealand Forces milsim unit."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body className="min-h-screen bg-base-900 text-white">
        <Nav />
        <AppSessionProvider>
          <main>{children}</main>
        </AppSessionProvider>
        <Footer />
      </body>
    </html>
  );
}
