import { Container } from "@/components/shared/container";
import { FeatureCard } from "@/components/shared/feature-card";
import { Section } from "@/components/shared/section";
import { whyChooseContent } from "@/content/home";

export function WhyChooseSection() {
  return (
    <Section ariaLabelledby="why-choose-title" tone="default">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="inline-flex items-center text-caption font-semibold uppercase text-accent-hover">
              <span
                aria-hidden
                className="mr-2.5 inline-block h-px w-7 bg-accent"
              />
              Why SRBC
            </p>
            <h2
              id="why-choose-title"
              className="mt-4 font-heading text-display-lg font-semibold tracking-tight text-foreground text-balance"
            >
              {whyChooseContent.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg text-pretty">
              {whyChooseContent.description}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {whyChooseContent.pillars.map((pillar, idx) => (
                <FeatureCard
                  key={pillar.title}
                  icon={pillar.icon}
                  title={pillar.title}
                  description={pillar.description}
                  index={idx}
                  stat={pillar.stat}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
