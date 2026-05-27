import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { ServiceCard } from "@/components/shared/service-card";
import { featuredServiceSlugs, getServiceSummaries } from "@/content/services";

export function ServicesPreviewSection() {
  const summaries = getServiceSummaries();
  const featured = featuredServiceSlugs
    .map((slug) => summaries.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <Section ariaLabelledby="services-preview-title" tone="default">
      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="inline-flex items-center text-caption font-semibold uppercase text-accent-hover">
              <span
                aria-hidden
                className="mr-2.5 inline-block h-px w-7 bg-accent"
              />
              Our services
            </p>
            <h2
              id="services-preview-title"
              className="mt-4 font-heading text-display-lg font-semibold tracking-tight text-foreground text-balance"
            >
              Complete consulting for breweries, microbreweries and brewpubs
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg text-pretty">
              From feasibility studies and licensing to recipe development,
              quality systems, and operational excellence — we cover the full
              lifecycle.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary"
          >
            View all services
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
