import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
  size?: "default" | "narrow" | "wide";
};

const widthClasses = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  size = "default",
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 md:px-8",
        widthClasses[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
