"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { services } from "@/content/services";
import logo from "@/assets/srbclogo.png";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isServicesOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsServicesOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isServicesOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth",
        isScrolled
          ? "border-b border-border bg-background/90 shadow-sm backdrop-blur"
          : "bg-background/70 backdrop-blur-sm",
      )}
    >
      <Container size="wide" className="flex h-20 items-center justify-between md:h-24">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — Home`}
          className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Image
            src={logo}
            alt={siteConfig.name}
            priority
            placeholder="blur"
            sizes="(min-width: 768px) 160px, 120px"
            className="h-16 w-auto md:h-20"
          />
          <span className="sr-only">{siteConfig.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            <li ref={servicesRef} className="relative">
              <button
                type="button"
                onClick={() => setIsServicesOpen((open) => !open)}
                onMouseEnter={() => setIsServicesOpen(true)}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                aria-controls="services-megamenu"
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium transition-colors",
                  pathname.startsWith("/services")
                    ? "text-primary"
                    : "text-foreground/75 hover:text-primary",
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isServicesOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>

              {isServicesOpen && (
                <div
                  id="services-megamenu"
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className="absolute right-0 top-full z-50 mt-3 w-[min(92vw,640px)] animate-fade-in rounded-2xl border border-border bg-card p-3 shadow-lg ring-1 ring-black/[0.02]"
                >
                  <ul className="grid grid-cols-2 gap-1">
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                          >
                            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary ring-1 ring-inset ring-primary/10 transition-colors group-hover:bg-accent-soft group-hover:text-accent-hover">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-heading text-sm font-semibold leading-snug text-foreground">
                                {service.shortTitle}
                              </span>
                              <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                {service.description}
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-2 border-t border-border pt-2">
                    <Link
                      href="/services"
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-primary hover:bg-muted"
                    >
                      View all services
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </li>

            <li>
              <Link
                href="/contact"
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === "/contact"
                    ? "text-primary"
                    : "text-foreground/75 hover:text-primary",
                )}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "accent", size: "sm" }))}
              >
                Start a project
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
        >
          <Container className="py-4">
            <ul className="flex flex-col gap-1">
              <li>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileServicesOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                {mobileServicesOpen && (
                  <ul className="mt-1 ml-2 border-l border-border pl-3">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {service.shortTitle}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/services"
                        className="block rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-muted"
                      >
                        View all services →
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  Contact
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "accent", size: "md" }),
                    "w-full",
                  )}
                >
                  Start a project
                </Link>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
