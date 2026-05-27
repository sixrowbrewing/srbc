import { Mail, MapPin /*, MessageCircle, Phone */ } from "lucide-react";
import { siteConfig } from "@/lib/site";
// import { whatsappLink } from "@/lib/utils";

export function ContactInfo() {
  return (
    <aside className="space-y-6" aria-label="Contact information">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Our office
        </h2>
        <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-accent">
          India Headquarters
        </p>

        <address className="mt-6 space-y-4 not-italic text-sm text-foreground">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <MapPin className="h-4 w-4" aria-hidden />
            </span>
            <span className="leading-relaxed">
              {siteConfig.contact.address.line1}
              <br />
              {siteConfig.contact.address.city},{" "}
              {siteConfig.contact.address.region}
              <br />
              {siteConfig.contact.address.country}
            </span>
          </div>
          {/* <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Phone className="h-4 w-4" aria-hidden />
            </span>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="font-medium hover:text-accent"
            >
              {siteConfig.contact.phone}
            </a>
          </div> */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Mail className="h-4 w-4" aria-hidden />
            </span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium hover:text-accent"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </address>
      </div>

      {/* <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-sm">
        <h2 className="font-heading text-xl font-semibold">Need urgent help?</h2>
        <p className="mt-2 text-sm text-primary-foreground/80">
          Call us for urgent consultations or reach us instantly on WhatsApp.
        </p>
        <p className="mt-6 font-heading text-3xl font-bold text-accent">
          {siteConfig.contact.phone}
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Message on WhatsApp
        </a>
      </div> */}
    </aside>
  );
}
