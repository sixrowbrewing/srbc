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
      className="group block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Learn more about ${service.title}`}
    >
      <div className={cn("relative overflow-hidden", variant === "compact" ? "aspect-[16/10]" : "aspect-[16/11]")}>
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" aria-hidden />
        <div className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-background/95 text-accent shadow-sm">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h3 className="font-heading text-xl font-semibold text-foreground">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Explore service
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
