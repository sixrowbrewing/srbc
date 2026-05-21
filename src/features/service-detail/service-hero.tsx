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
      className="relative isolate overflow-hidden bg-primary text-primary-foreground"
      aria-labelledby="service-hero-title"
    >
      <Image
        src={service.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" aria-hidden />
      <Container className="relative z-10 py-20 md:py-28">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent-foreground hover:text-accent-foreground/80"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to services
        </Link>
        <div className="mt-8 flex items-center gap-4">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-lg">
            <Icon className="h-7 w-7" aria-hidden />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-foreground">
            {service.shortTitle}
          </p>
        </div>
        <h1
          id="service-hero-title"
          className="mt-6 max-w-3xl font-heading text-display-xl font-semibold leading-tight"
        >
          {service.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg italic text-accent-foreground">
          {service.tagline}
        </p>
        <p className="mt-5 max-w-3xl text-base text-primary-foreground/80 md:text-lg">
          {service.description}
        </p>
      </Container>
    </section>
  );
}
