import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "default" | "muted" | "dark";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted/40 text-foreground",
  dark: "bg-primary text-primary-foreground",
};

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
  as?: ElementType;
  ariaLabelledby?: string;
}

export function Section({
  id,
  tone = "default",
  className,
  children,
  as,
  ariaLabelledby,
}: SectionProps) {
  const Component = (as ?? "section") as ElementType;
  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("py-16 md:py-24", toneClasses[tone], className)}
    >
      {children}
    </Component>
  );
}
