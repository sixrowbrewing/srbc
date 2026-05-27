import Link from "next/link";
import { ArrowRight /*, MessageCircle */ } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "./container";
import { cn /*, whatsappLink */ } from "@/lib/utils";

interface CtaSectionProps {
  title: string;
  description: string;
  primary?: { label: string; href: string };
  whatsappMessage?: string;
  eyebrow?: string;
}

export function CtaSection({
  title,
  description,
  primary = { label: "Contact us", href: "/contact" },
  // whatsappMessage,
  eyebrow = "Let's brew together",
}: CtaSectionProps) {
  return (
    <section
      className="surface-forest relative isolate overflow-hidden text-primary-foreground"
      aria-labelledby="cta-title"
    >
      <Container size="wide" className="py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center justify-center text-caption font-semibold uppercase text-accent">
            <span
              aria-hidden
              className="mr-2.5 inline-block h-px w-7 bg-accent"
            />
            {eyebrow}
          </p>
          <h2
            id="cta-title"
            className="mt-5 font-heading text-display-lg font-semibold tracking-tight text-primary-foreground text-balance md:text-display-xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            {description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={primary.href}
              className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
            >
              {primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            {/* <a
              href={whatsappLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/40",
              )}
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              WhatsApp us
            </a> */}
          </div>
        </div>
      </Container>
    </section>
  );
}
