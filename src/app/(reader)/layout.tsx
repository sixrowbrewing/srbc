import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { organizationJsonLd } from "@/lib/seo";

export default function ReaderLayout({
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
      <main id="main-content">{children}</main>
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
