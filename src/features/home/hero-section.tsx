import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Beer } from "lucide-react";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { heroContent } from "@/content/home";

export function HeroSection() {
  return (
    <section
      className="surface-cream relative isolate overflow-hidden"
      aria-labelledby="hero-title"
    >
      <Container size="wide" className="relative pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text column */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-100 px-3.5 py-1.5 text-caption font-semibold uppercase text-primary">
              <Beer className="h-3.5 w-3.5" aria-hidden />
              {heroContent.eyebrow}
            </p>

            <h1
              id="hero-title"
              className="mt-6 font-heading text-display-2xl font-semibold tracking-tight text-foreground text-balance"
            >
              {heroContent.title.split("\n").map((line, idx) => (
                <span key={idx} className="block">
                  {idx === 1 ? (
                    <span className="italic text-primary">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty">
              {heroContent.description}
            </p>
            <p className="mt-3 max-w-xl text-base font-medium text-foreground/85">
              {heroContent.highlight}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={heroContent.primaryCta.href}
                className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
              >
                {heroContent.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={heroContent.secondaryCta.href}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {heroContent.secondaryCta.label}
              </Link>
            </div>
          </div>

          {/* Image column */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary-100 shadow-lg ring-1 ring-black/[0.04]">
              <Image
                src={heroContent.image}
                alt="Microbrewery brewing equipment"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/40 via-primary/5 to-transparent"
              />
            </div>

            {/* Amber underline accent */}
            <div
              aria-hidden
              className="absolute -bottom-3 left-6 right-12 h-1.5 rounded-full bg-accent"
            />

            {/* Floating credibility chip */}
            <div className="absolute -left-4 top-6 hidden rounded-xl border border-border bg-card/95 px-4 py-3 shadow-md backdrop-blur sm:block">
              <p className="text-caption font-semibold uppercase text-accent-hover">
                Based in Pune
              </p>
              <p className="mt-0.5 font-heading text-sm font-semibold text-foreground">
                Serving all of India
              </p>
            </div>
          </div>
        </div>

        {/* Stat band */}
        <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 md:mt-20">
          {heroContent.stats.map((stat) => (
            <div key={stat.label} className="bg-card px-6 py-6 md:px-8 md:py-7">
              <dt className="text-caption font-semibold uppercase text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
