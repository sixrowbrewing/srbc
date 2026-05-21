import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

interface OutcomesSectionProps {
  outcomes: string[];
  heading?: string;
}

export function OutcomesSection({
  outcomes,
  heading = "Expected outcomes",
}: OutcomesSectionProps) {
  return (
    <Section tone="muted" ariaLabelledby="outcomes-title">
      <Container>
        <SectionHeading id="outcomes-title" title={heading} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <CheckCircle2 className="h-6 w-6 shrink-0 text-accent" aria-hidden />
              <span className="text-base font-medium text-foreground">
                {outcome}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
