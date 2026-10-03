import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site";
import logo from "@/assets/favicon.png";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Microbrewery & Brewpub Consultant in Pune, India`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: [
      {
        url: logo.src,
        sizes: `${logo.width}x${logo.height}`,
        type: "image/png",
      },
    ],
    apple: logo.src,
    shortcut: logo.src,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: logo.src,
        width: logo.width,
        height: logo.height,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [logo.src],
  },
};

export const viewport: Viewport = {
  themeColor: "#1F3A2E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      {/*
        suppressHydrationWarning: extensions (ColorZilla, Grammarly, password
        managers) inject attributes onto <body> before React hydrates, which
        otherwise logs a hydration mismatch. Applies to this element's
        attributes only — mismatches in the tree below are still reported.
      */}
      <body
        className="bg-background font-sans text-foreground"
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
