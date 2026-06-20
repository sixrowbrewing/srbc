import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
// import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { organizationJsonLd } from "@/lib/seo";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" className="pt-20 md:pt-24">
        {children}
      </main>
      <Footer />
      {/* <WhatsAppButton /> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
