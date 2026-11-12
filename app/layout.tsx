import { Analytics } from "@/components/analytics";
import { FpsCapProvider } from "@/components/fps-cap-provider";
import { InitialLoader } from "@/components/initial-loader";
import { ModalProvider } from "@/components/modal-provider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RankPulse — AI SEO & Generative Search Platform",
  description:
    "Elevate your site's visibility effortlessly with AI, where smart technology meets intuitive, user-friendly SEO workflows.",
  openGraph: {
    title: "RankPulse — AI SEO & Generative Search Platform",
    description:
      "Elevate your site's visibility effortlessly with AI, where smart technology meets intuitive, user-friendly SEO workflows.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#030305] text-foreground selection:bg-purple-500/30 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <FpsCapProvider />
          <InitialLoader />
          {children}
          <ModalProvider />
          <Analytics />
          <div
            className="fixed left-1/2 right-0 top-0 h-[728px] max-h-screen -z-10"
            id="hc-boundary"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
