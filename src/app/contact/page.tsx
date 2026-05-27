import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/features/services/page-hero";
import { ContactForm } from "@/features/contact/contact-form";
import { ContactInfo } from "@/features/contact/contact-info";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact SRBC | Brewery Consultant in Pune, India",
  description:
    "Contact SRBC for microbrewery setup and brewpub consulting in Pune, Maharashtra. Send a message and we typically respond within one business day.",
  path: "/contact",
  keywords: [
    "contact brewery consultant Pune",
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
        description="Send us a message and we typically respond within one business day."
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
