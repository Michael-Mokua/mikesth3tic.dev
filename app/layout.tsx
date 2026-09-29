import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mikesth3tic-dev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Michael Ogutu Mokua | Full-Stack Developer & AI Systems Builder",
    template: "%s | Michael Mokua",
  },
  description:
    "Michael Ogutu Mokua is a Nairobi-based full-stack developer and AI systems builder. Founder of MIKESTH3TIC.DEV. Building Africa-first products with React, Next.js, Python, PostgreSQL, and Claude API.",
  keywords: [
    "Michael Ogutu Mokua",
    "Michael Mokua",
    "Cartelo",
    "Michaia",
    "MIKESTH3TIC.DEV",
    "Full-Stack Developer Nairobi",
    "AI Systems Engineer Kenya",
    "Next.js Developer Kenya",
    "Agri Value Connect",
    "Sheng NLP",
    "Claude API Developer",
  ],
  authors: [{ name: "Michael Ogutu Mokua", url: siteUrl }],
  creator: "Michael Ogutu Mokua",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Michael Ogutu Mokua | Full-Stack Developer & AI Systems Builder",
    description:
      "Disrupt. Automate. Dominate. Full-stack products, agricultural marketplaces, and AI reasoning systems built from Nairobi, Kenya.",
    siteName: "Michael Mokua · MIKESTH3TIC.DEV",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Michael Ogutu Mokua — Full-Stack Developer & AI Systems Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Ogutu Mokua (@Mikesth3tic_dev)",
    description:
      "Full-stack developer & AI systems builder from Nairobi, Kenya. Founder of MIKESTH3TIC.DEV.",
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
    { media: "(prefers-color-scheme: dark)", color: "#070709" },
    { media: "(prefers-color-scheme: light)", color: "#fefaf6" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={cn(
          "min-h-screen bg-dark-950 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200",
          geistSans.variable,
          geistMono.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>

        {/* Structured JSON-LD Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: "Michael Ogutu Mokua",
                  alternateName: ["Cartelo", "Michaia", "Michael Mokua"],
                  url: siteUrl,
                  jobTitle: "Full-Stack Developer & AI Systems Builder",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Nairobi",
                    addressCountry: "KE",
                  },
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "Kabarak University",
                  },
                  sameAs: [
                    "https://github.com/Michael-Mokua",
                    "https://www.linkedin.com/in/michael-mokua-251390302/",
                    "https://twitter.com/Mikesth3tic_dev",
                    "https://instagram.com/whoismichaia",
                    "https://instagram.com/mikesth3tic.dev",
                  ],
                },
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "MIKESTH3TIC.DEV",
                  url: siteUrl,
                  founder: {
                    "@id": `${siteUrl}/#person`,
                  },
                  location: {
                    "@type": "Place",
                    name: "Nairobi, Kenya",
                  },
                  slogan: "Disrupt. Automate. Dominate.",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
