import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { heroContent } from "@/content/home";

export function HeroSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-primary text-primary-foreground"
      aria-labelledby="hero-title"
    >
      <Image
        src={heroContent.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70"
        aria-hidden
      />

      <Container className="relative z-10 py-28 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground backdrop-blur">
            {heroContent.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="font-heading text-display-2xl font-semibold leading-tight"
          >
            {heroContent.title.split("\n").map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85 md:text-xl">
            {heroContent.description}
          </p>
          <p className="mt-4 max-w-2xl text-base font-medium text-accent-foreground md:text-lg">
            {heroContent.highlight}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={heroContent.primaryCta.href}
              className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
            >
              {heroContent.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10",
              )}
            >
              {heroContent.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
