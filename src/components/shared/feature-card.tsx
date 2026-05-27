import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  index?: number;
  stat?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  index,
  stat,
}: FeatureCardProps) {
  const numbered = typeof index === "number";
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 rounded-2xl border border-border/80 bg-card p-7 shadow-sm transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary ring-1 ring-inset ring-primary/10">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        {numbered && (
          <span
            aria-hidden
            className="font-heading text-sm font-medium tabular-nums tracking-widest text-muted-foreground/70"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {stat && (
        <p className="mt-auto pt-4 text-sm font-semibold text-accent-hover">
          {stat}
        </p>
      )}
    </article>
  );
}
