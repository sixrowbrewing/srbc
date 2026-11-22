import type { Metadata } from "next";
import { HeroSection } from "@/features/home/hero-section";
import { WhyChooseSection } from "@/features/home/why-choose-section";
import { SeoContentSection } from "@/features/home/seo-content-section";
import { ServicesPreviewSection } from "@/features/home/services-preview-section";
import { CtaSection } from "@/components/shared/cta-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Brewery Consultants in India & Microbrewery Setup in Pune",
  description:
    "Pune-based brewery consultants serving India. Plan your microbrewery, develop beer recipes, design draught systems and improve brewery operations.",
  path: "/",
  keywords: [
    "microbrewery consultant Pune",
    "brewery consultant India",
    "brewpub setup Maharashtra",
    "NA beer consultant",
    "probiotic beer development",
    "craft brewery consulting India",
    "microbrewery equipment India",
    "brewery licensing consultant",
    "beer recipe development India",
    "sustainable brewing consultant",
  ],
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />
      <SeoContentSection />
      <ServicesPreviewSection />
      <CtaSection
        title="Ready to brew something extraordinary?"
        description="Whether you're launching a microbrewery, scaling production, or developing a breakthrough recipe — let's talk."
        primary={{ label: "Start your project", href: "/contact" }}
      />
    </>
  );
}
