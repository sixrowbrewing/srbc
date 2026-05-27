import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/lib/site";
import { services } from "@/content/services";
import { whatsappLink } from "@/lib/utils";
import logo from "@/assets/srbclogo-dark.png";

export function Footer() {
  const year = new Date().getFullYear();
  const half = Math.ceil(services.length / 2);
  const servicesA = services.slice(0, half);
  const servicesB = services.slice(half);

  return (
    <footer
      className="surface-forest text-primary-foreground"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container size="wide" className="py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/"
              aria-label={`${siteConfig.name} — Home`}
              className="-ml-4 -mt-4 inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <Image
                src={logo}
                alt={siteConfig.name}
                placeholder="blur"
                sizes="240px"
                className="h-20 w-auto md:h-24"
              />
            </Link>
            <p className="-mt-2 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
              {siteConfig.name} — expert brewing solutions for India. From
              concept and licensing to commissioning and operational excellence.
            </p>

            <address className="mt-8 not-italic text-sm text-primary-foreground/75 space-y-3">
              <p className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden
                />
                <span>
                  {siteConfig.contact.address.line1}
                  <br />
                  {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.region},{" "}
                  {siteConfig.contact.address.country}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <MessageCircle
                  className="h-4 w-4 shrink-0 text-accent"
                  aria-hidden
                />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary-foreground"
                >
                  WhatsApp us
                </a>
              </p>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:col-span-2">
            <div>
              <p className="font-heading text-caption font-semibold uppercase text-accent">
                Services
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {servicesA.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-heading text-caption font-semibold uppercase text-accent">
                More services
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {servicesB.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-primary-foreground/10 pt-6 text-sm text-primary-foreground/55 sm:flex-row sm:items-center">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-heading italic text-primary-foreground/65">
            {siteConfig.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
