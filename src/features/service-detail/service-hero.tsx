import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import type { ServiceDetail } from "@/types/service";

interface ServiceHeroProps {
  service: ServiceDetail;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const Icon = service.icon;
  return (
    <section
      className="surface-forest relative isolate overflow-hidden text-primary-foreground"
      aria-labelledby="service-hero-title"
    >
      <Image
        src={service.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/55 to-primary/15"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary to-transparent"
      />

      <Container size="wide" className="relative z-10 py-20 md:py-28 lg:py-32">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/85 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to services
        </Link>

        <div className="mt-10 flex items-center gap-4">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg ring-1 ring-black/5">
            <Icon className="h-7 w-7" aria-hidden />
          </span>
          <p className="text-caption font-semibold uppercase text-accent">
            {service.shortTitle}
          </p>
        </div>

        <h1
          id="service-hero-title"
          className="mt-6 max-w-3xl font-heading text-display-xl font-semibold tracking-tight text-primary-foreground text-balance"
        >
          {service.title}
        </h1>

        <p className="mt-4 max-w-2xl font-heading text-xl italic text-accent">
          {service.tagline}
        </p>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85 md:text-lg text-pretty">
          {service.description}
        </p>
      </Container>
    </section>
  );
}
