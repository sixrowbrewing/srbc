import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
  level?: 2 | 3;
  tone?: "default" | "inverse";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  className,
  level = 2,
  tone = "default",
}: SectionHeadingProps) {
  const Heading = (`h${level}` as "h2" | "h3");
  const inverse = tone === "inverse";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center text-caption font-semibold uppercase",
            inverse ? "text-accent" : "text-accent-hover",
          )}
        >
          <span
            aria-hidden
            className="mr-2.5 inline-block h-px w-7 bg-accent"
          />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "font-heading text-display-lg font-semibold tracking-tight text-balance",
          inverse ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg text-pretty",
            inverse ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
