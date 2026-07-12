import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ArticleCtaCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <p className="text-caption font-semibold uppercase tracking-widest text-accent-hover">
        Get started
      </p>
      <h2 className="mt-3 font-heading text-xl font-semibold text-foreground text-balance">
        Plan your brewery with SRBC
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
        Talk to our experts about equipment, setup, and consulting — tailored to
        your goals.
      </p>
      <Link
        href="/contact"
        className={cn(
          buttonVariants({ variant: "accent", size: "md" }),
          "mt-5 w-full",
        )}
      >
        Contact us
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
