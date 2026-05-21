import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "./container";
import { cn, whatsappLink } from "@/lib/utils";

interface CtaSectionProps {
  title: string;
  description: string;
  primary?: { label: string; href: string };
  whatsappMessage?: string;
}

export function CtaSection({
  title,
  description,
  primary = { label: "Contact Us", href: "/contact" },
  whatsappMessage,
}: CtaSectionProps) {
  return (
    <section
      className="bg-primary py-20 text-primary-foreground"
      aria-labelledby="cta-title"
    >
      <Container className="text-center">
        <h2
          id="cta-title"
          className="font-heading text-display-lg font-semibold text-accent-foreground"
        >
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-foreground/80">
          {description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={primary.href}
            className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
          >
            {primary.label}
          </Link>
          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }))}
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            WhatsApp Us
          </a>
        </div>
      </Container>
    </section>
  );
}
