import type { Metadata } from "next";
import { HeroSection } from "@/features/home/hero-section";
import { WhyChooseSection } from "@/features/home/why-choose-section";
import { SeoContentSection } from "@/features/home/seo-content-section";
import { ServicesPreviewSection } from "@/features/home/services-preview-section";
import { CtaSection } from "@/components/shared/cta-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Six Row Brewing Consulting | Best Microbrewery Consultant in Pune, India",
  description:
    "Leading brewery consultant in Pune, India. Expert microbrewery setup, brewpub consulting, NA beer development, probiotic beer formulation. 15+ successful projects.",
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
