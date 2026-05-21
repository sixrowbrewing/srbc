import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md",
        className,
      )}
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}
