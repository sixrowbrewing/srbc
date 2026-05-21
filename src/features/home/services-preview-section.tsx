import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { featuredServiceSlugs, getServiceSummaries } from "@/content/services";

export function ServicesPreviewSection() {
  const summaries = getServiceSummaries();
  const featured = featuredServiceSlugs
    .map((slug) => summaries.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <Section ariaLabelledby="services-preview-title">
      <Container>
        <SectionHeading
          id="services-preview-title"
          eyebrow="Our Services"
          title="Complete consulting for breweries, microbreweries and brewpubs"
          description="From feasibility studies and licensing to recipe development, quality systems, and operational excellence — we cover the full lifecycle."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-base font-semibold text-accent"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
