import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceSummary } from "@/types/service";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: ServiceSummary;
  variant?: "default" | "compact";
}

export function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Learn more about ${service.title}`}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-primary-100",
          variant === "compact" ? "aspect-[16/10]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent"
        />
        <div className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-background/95 text-primary shadow-sm ring-1 ring-black/5 backdrop-blur">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-hover">
          Explore service
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
