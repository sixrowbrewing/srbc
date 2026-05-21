import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ServiceStep } from "@/types/service";

interface AuditProcessSectionProps {
  steps: ServiceStep[];
}

export function AuditProcessSection({ steps }: AuditProcessSectionProps) {
  return (
    <Section ariaLabelledby="audit-process-title">
      <Container>
        <SectionHeading
          id="audit-process-title"
          title="Our 5-step audit process"
        />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, idx) => (
            <li
              key={step.step}
              className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent font-heading text-base font-semibold text-accent-foreground">
                {idx + 1}
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
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
