"use client";

import * as React from "react";
import { CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoPopoverProps {
  id: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * A "?" button that toggles a small translucent popover with help text. It opens
 * up and to the right of the trigger so it never covers the field below. Closes
 * on outside click or Escape; Escape returns focus to the trigger.
 */
export function InfoPopover({
  id,
  label = "More information",
  className,
  children,
}: InfoPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <span ref={rootRef} className={cn("relative inline-flex", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <CircleHelp className="h-4 w-4" aria-hidden />
      </button>
      <span
        id={id}
        role="tooltip"
        hidden={!open}
        className="absolute bottom-0 left-full z-50 ml-2 w-64 max-w-[calc(100vw-9.5rem)] origin-bottom-left rounded-lg border border-white/10 bg-black/70 p-3 text-sm leading-snug text-white shadow-lg backdrop-blur-sm animate-in fade-in-0 zoom-in-95"
      >
        {children}
      </span>
    </span>
  );
}
