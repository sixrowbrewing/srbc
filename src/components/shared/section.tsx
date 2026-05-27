import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "default" | "muted" | "dark" | "cream";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  cream: "surface-cream text-foreground",
  dark: "surface-forest text-primary-foreground",
};

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
  as?: ElementType;
  ariaLabelledby?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-14 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-32",
};

export function Section({
  id,
  tone = "default",
  className,
  children,
  as,
  ariaLabelledby,
  size = "md",
}: SectionProps) {
  const Component = (as ?? "section") as ElementType;
  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(sizeClasses[size], toneClasses[tone], className)}
    >
      {children}
    </Component>
  );
}
