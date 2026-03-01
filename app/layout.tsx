import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SystemStatus } from "@/components/layout/SystemStatus";
import { ClientOverlays } from "@/components/layout/ClientOverlays";
import { cn } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mikesth3tic.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Michael Ogutu Mokua | Software Product Studio",
    template: "%s | mikesth3tic.dev",
  },
  description:
    "mikesth3tic.dev — A modern Software-First Technology Studio that designs, builds, and scales intelligent digital products. Specialized in Next.js, AI Systems, and Scalable Architecture.",
  keywords: [
    "Michael Ogutu Mokua",
    "mikesth3tic.dev",
    "Software Product Studio",
    "Product Engineering Nairobi",
    "AI Systems Architect",
    "SaaS Development",
    "Next.js Expert",
    "Scalable Software Solutions",
  ],
  authors: [{ name: "Michael Ogutu", url: siteUrl }],
  creator: "Michael Ogutu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Michael Ogutu Mokua | Software Product Studio",
    description:
      "We design, build, and scale modern software products. mikesth3tic.dev is a Software-First Technology Studio specializing in AI and scalable systems.",
    siteName: "mikesth3tic.dev",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "MIKESTH3TIC.DEV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Ogutu Mokua | Software Product Studio",
    description:
      "mikesth3tic.dev — Designing, building, and scaling modern software products.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@Mikesth3tic_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030303" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};


// ... metadata and viewport ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased selection:bg-electric-400 selection:text-dark-950",
        geistSans.variable,
        geistMono.variable
      )} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClientOverlays />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <SystemStatus />
          </div>
        </ThemeProvider>

        {/* JSON-LD structured data */}
        <script
          // ...
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Michael Ogutu",
              url: siteUrl,
              jobTitle: "Software Engineer & Founder",
              description:
                "Designing, building, and scaling modern software products.",
              sameAs: [
                "https://github.com/Michael-Mokua",
                "https://twitter.com/Mikesth3tic_dev",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
