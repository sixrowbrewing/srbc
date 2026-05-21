import type { LucideIcon } from "lucide-react";

export type ServiceSlug =
  | "operations"
  | "recipe"
  | "engineering"
  | "quality"
  | "strategy"
  | "sustainability"
  | "microbrewery"
  | "audit";

export interface ServiceOffering {
  icon: LucideIcon;
  name: string;
  description: string;
}

export interface ServiceStep {
  step: string;
  description: string;
}

export interface ServiceSummary {
  slug: ServiceSlug;
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
}

export interface ServiceDetail extends ServiceSummary {
  tagline: string;
  offerings: ServiceOffering[];
  process: ServiceStep[];
  outcomes: string[];
}

export interface BenchmarkLevel {
  label: string;
  value: string;
  tone: "success" | "warning" | "danger";
  width: string;
}

export interface Benchmark {
  icon: LucideIcon;
  title: string;
  description: string;
  levels: BenchmarkLevel[];
}
