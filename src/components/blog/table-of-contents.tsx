"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/toc";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        // Highlight the heading closest to the top of the viewport.
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <p className="text-caption font-semibold uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="mt-4 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors",
                heading.level === 3 ? "pl-7" : "pl-4",
                activeId === heading.id
                  ? "border-accent font-semibold text-accent-hover"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
