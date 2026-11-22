import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/shared/cta-section";
import { ServiceHero } from "@/features/service-detail/service-hero";
import { OfferingsSection } from "@/features/service-detail/offerings-section";
import { ProcessSection } from "@/features/service-detail/process-section";
import { OutcomesSection } from "@/features/service-detail/outcomes-section";
import { BenchmarksSection } from "@/features/service-detail/benchmarks-section";
import { AuditProcessSection } from "@/features/service-detail/audit-process-section";
import { services, getService } from "@/content/services";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };

  return buildMetadata({
    title: `${service.title} | Brewery Consulting`,
    description: service.description,
    path: `/services/${service.slug}`,
    image: service.image.src,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const isAudit = service.slug === "audit";

  return (
    <>
      <ServiceHero service={service} />
      <OfferingsSection
        offerings={service.offerings}
        heading={isAudit ? "What we audit" : "What we offer"}
      />
      {service.slug === "microbrewery" && (
        <section id="project-report" aria-labelledby="project-report-title" className="scroll-mt-28 bg-muted py-12 md:py-16">
          <Container>
            <h2 id="project-report-title" className="font-heading text-display-md font-semibold">
              Brewery Project Report &amp; Feasibility Study
            </h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Estimate what it takes to set up and operate your brewery before committing to equipment or a site.
              The report uses your target output, sales model, and available space to estimate capacity, investment, and running costs.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
              <li><strong>Capacity:</strong> brewhouse size, tank count, batch schedule, and expected monthly output.</li>
              <li><strong>Capital costs:</strong> brewing and cellar equipment, utility systems, and installation allowances.</li>
              <li><strong>Operating costs:</strong> ingredients, utilities, staffing, and other recurring costs.</li>
              <li><strong>Site requirements:</strong> layout inputs, water and power needs, cooling, and wastewater planning.</li>
            </ul>
            <p className="mt-5 max-w-3xl text-muted-foreground">
              To get started, share your project location, planned litres per day or month, site status, and sales model.
            </p>
            <Link href="/contact" className={buttonVariants({ variant: "accent", className: "mt-6" })}>
              Request a Brewery Project Report
            </Link>
          </Container>
        </section>
      )}
      {isAudit ? (
        <>
          <AuditProcessSection steps={service.process} />
          <BenchmarksSection />
        </>
      ) : (
        <>
          <ProcessSection steps={service.process} />
          <OutcomesSection outcomes={service.outcomes} />
        </>
      )}
      <CtaSection
        title={
          isAudit
            ? "Ready to optimize your brewery?"
            : `Ready to get started with ${service.shortTitle.toLowerCase()}?`
        }
        description={
          isAudit
            ? "Get a comprehensive performance audit and uncover opportunities to improve efficiency, reduce costs, and grow profitability."
            : `Contact us today to discuss your ${service.title.toLowerCase()} needs.`
        }
        whatsappMessage={
          isAudit
            ? "Hello! I would like to schedule a brewery performance audit."
            : `Hello! I'd like to know more about your ${service.title} services.`
        }
        primary={
          isAudit
            ? { label: "Request audit", href: "/contact" }
            : { label: "Contact us", href: "/contact" }
        }
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: service.title,
              description: service.description,
              slug: service.slug,
            }),
          ),
        }}
      />
    </>
  );
}
