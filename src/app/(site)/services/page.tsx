import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/features/services/page-hero";
import { ServicesGrid } from "@/features/services/services-grid";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Brewery Consulting Services in India",
  description:
    "Complete brewery consulting services in India. Microbrewery setup, brewpub design, NA beer development, quality assurance, operations optimization, brewery performance audit.",
  path: "/services",
  keywords: [
    "brewery consulting services India",
    "microbrewery setup Pune",
    "brewpub consulting Maharashtra",
    "NA beer development",
    "brewery operations consultant",
    "craft beer quality assurance",
    "brewing equipment selection India",
    "brewery audit services",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Comprehensive consulting for breweries, microbreweries and brewpubs"
        description="From feasibility to commissioning to ongoing operational excellence — pick the engagement that fits your stage."
      />
      <section className="py-16 md:py-24" aria-label="All services">
        <Container>
          <ServicesGrid />
        </Container>
      </section>
      <CtaSection
        title="Not sure where to start?"
        description="Book a free 30-minute consultation. We'll help you scope the right engagement for your brewery."
      />
    </>
  );
}
