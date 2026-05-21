import { Container } from "@/components/shared/container";
import { FeatureCard } from "@/components/shared/feature-card";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ServiceOffering } from "@/types/service";

interface OfferingsSectionProps {
  offerings: ServiceOffering[];
  heading?: string;
}

export function OfferingsSection({ offerings, heading = "What we offer" }: OfferingsSectionProps) {
  return (
    <Section tone="muted" ariaLabelledby="offerings-title">
      <Container>
        <SectionHeading id="offerings-title" title={heading} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering) => (
            <FeatureCard
              key={offering.name}
              icon={offering.icon}
              title={offering.name}
              description={offering.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
