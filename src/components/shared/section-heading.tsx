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
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  className,
  level = 2,
}: SectionHeadingProps) {
  const Heading = (`h${level}` as "h2" | "h3");
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className="font-heading text-display-lg font-semibold text-foreground"
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
