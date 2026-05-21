import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/features/services/page-hero";
import { ContactForm } from "@/features/contact/contact-form";
import { ContactInfo } from "@/features/contact/contact-info";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact SRBC | Brewery Consultant in Pune, India",
  description:
    "Contact SRBC for microbrewery setup, brewpub consulting in Pune, Maharashtra. Call +91 8559907991 or email info@sixrowbrewing.com.",
  path: "/contact",
  keywords: [
    "contact brewery consultant Pune",
    "microbrewery consultant phone number",
    "brewpub setup inquiry Pune",
    "Six Row Brewing Consulting contact",
  ],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's discuss your brewing goals"
        description="We typically respond within one business day. For urgent matters, reach us by phone or WhatsApp."
      />
      <section className="py-16 md:py-24" aria-label="Contact options">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <ContactForm />
            <ContactInfo />
          </div>
        </Container>
      </section>
    </>
  );
}
