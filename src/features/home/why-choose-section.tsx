import { Container } from "@/components/shared/container";
import { FeatureCard } from "@/components/shared/feature-card";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { whyChooseContent } from "@/content/home";

export function WhyChooseSection() {
  return (
    <Section ariaLabelledby="why-choose-title">
      <Container>
        <SectionHeading
          id="why-choose-title"
          eyebrow="Why SRBC"
          title={whyChooseContent.title}
          description={whyChooseContent.description}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseContent.pillars.map((pillar) => (
            <FeatureCard
              key={pillar.title}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
