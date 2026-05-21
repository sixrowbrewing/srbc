import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ServiceStep } from "@/types/service";

interface ProcessSectionProps {
  steps: ServiceStep[];
  heading?: string;
}

export function ProcessSection({ steps, heading = "Our process" }: ProcessSectionProps) {
  return (
    <Section ariaLabelledby="process-title">
      <Container>
        <SectionHeading id="process-title" title={heading} />
        <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <li
              key={step.step}
              className="relative rounded-xl border border-border bg-card p-7 shadow-sm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-base font-semibold text-primary-foreground">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                {step.step}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
