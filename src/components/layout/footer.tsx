import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/lib/site";
import { services } from "@/content/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 max-w-sm">
            <p className="font-heading text-2xl font-bold tracking-tight text-accent-foreground">
              {siteConfig.shortName}
            </p>
            <p className="mt-3 text-sm text-primary-foreground/80">
              {siteConfig.name} — expert brewing solutions for India. From
              concept and licensing to commissioning and operational excellence.
            </p>
            <address className="mt-6 not-italic text-sm text-primary-foreground/80">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>
                  {siteConfig.contact.address.line1}
                  <br />
                  {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.region},{" "}
                  {siteConfig.contact.address.country}
                </span>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="hover:text-accent-foreground"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-accent-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent-foreground">
              Services
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-primary-foreground/80 transition-colors hover:text-accent-foreground"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent-foreground">
              Company
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-primary-foreground/80 transition-colors hover:text-accent-foreground"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/audit"
                  className="text-primary-foreground/80 transition-colors hover:text-accent-foreground"
                >
                  Performance Audit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-foreground/80 transition-colors hover:text-accent-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-6 text-sm text-primary-foreground/60">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
