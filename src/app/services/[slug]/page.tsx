import type { Metadata } from "next";
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
    image: service.image,
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
