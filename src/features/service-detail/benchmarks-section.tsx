import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { industryBenchmarks } from "@/content/benchmarks";
import type { BenchmarkLevel } from "@/types/service";
import { cn } from "@/lib/utils";

const toneText: Record<BenchmarkLevel["tone"], string> = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
};

const toneBar: Record<BenchmarkLevel["tone"], string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
};

export function BenchmarksSection() {
  return (
    <Section tone="muted" ariaLabelledby="benchmarks-title">
      <Container>
        <SectionHeading
          id="benchmarks-title"
          eyebrow="Industry Benchmarks"
          title="Industry performance benchmarks"
          description="Compare your brewery's performance against these standards for microbreweries and brewpubs in India."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industryBenchmarks.map((benchmark) => {
            const Icon = benchmark.icon;
            return (
              <article
                key={benchmark.title}
                className="rounded-xl border border-border bg-card p-7 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {benchmark.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {benchmark.description}
                </p>
                <dl className="mt-6 space-y-4">
                  {benchmark.levels.map((level) => (
                    <div key={level.label}>
                      <div className="flex items-center justify-between text-sm">
                        <dt className="font-medium text-foreground">
                          {level.label}
                        </dt>
                        <dd className={cn("font-semibold", toneText[level.tone])}>
                          {level.value}
                        </dd>
                      </div>
                      <div
                        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
                        role="presentation"
                      >
                        <div
                          className={cn("h-full rounded-full", toneBar[level.tone])}
                          style={{ width: level.width }}
                        />
                      </div>
                    </div>
                  ))}
                </dl>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
