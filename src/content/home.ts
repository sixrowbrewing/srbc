import { Factory, Gauge, Microscope, FlaskConical } from "lucide-react";
import microbreweryImage from "@/assets/microbrewery.png";

export const heroContent = {
  eyebrow: "Brewing Industry Consultants — Pune, India",
  title: "Brewery & Microbrewery\nConsultants in India",
  description:
    "Plan your brewery with support for feasibility studies, equipment selection, utility sizing, recipes, commissioning and day-to-day operations.",
  highlight:
    "Based in Pune, supporting microbreweries, brewpubs and beer brands across India.",
  primaryCta: { label: "Start your project", href: "/contact" },
  secondaryCta: { label: "Explore services", href: "/services" },
  image: microbreweryImage,
};

export const whyChooseContent = {
  title: "Brewing expertise, end to end",
  description:
    "Expert brewing consultants specialising in microbreweries, brewpubs, and craft brewing operations across India. From startup guidance to operational excellence, we deliver results.",
  pillars: [
    {
      icon: Factory,
      title: "Brewery Setup Expertise",
      description:
        "Turnkey microbrewery and brewpub setup — from feasibility and layout to equipment selection and commissioning.",
      stat: "Feasibility to first brew",
    },
    {
      icon: Gauge,
      title: "Operational Excellence",
      description:
        "Streamlined processes, yield optimization, and cost control that keep your brewery running efficiently every day.",
      stat: "Efficient, day after day",
    },
    {
      icon: Microscope,
      title: "Quality & Microbiology Systems",
      description:
        "Robust QA/QC and microbiology protocols that protect flavour, shelf life, and consistency in every batch.",
      stat: "Consistent in every batch",
    },
    {
      icon: FlaskConical,
      title: "Recipe Development & Innovation",
      description:
        "Custom recipes and flavour profiles — including NA, probiotic, and functional brews — tailored to your brand.",
      stat: "Signature, on-brand beers",
    },
  ],
};

export const longFormContent = {
  intro: {
    title: "Microbrewery & brewpub consulting in Pune, Maharashtra",
    body: "Six Row Brewing Consulting (SRBC) is a brewery consultancy based in Pune, Maharashtra. We specialise in complete brewery setup solutions, brewpub consulting, and innovative beer development including NA (non-alcoholic) beer and probiotic beer formulation.",
  },
  servicesIntro: {
    title: "Comprehensive brewery consulting services in India",
    body: "Whether you're launching a new microbrewery in Pune, expanding an existing craft brewery, or opening a brewpub in Maharashtra, SRBC provides end-to-end consulting services including:",
    bullets: [
      {
        label: "Microbrewery setup & equipment selection",
        href: "/services/microbrewery",
        detail: "Complete turnkey solutions",
      },
      {
        label: "Brewery licensing & compliance",
        href: "/services/microbrewery",
        detail: "Plan state-specific approvals and compliance requirements",
      },
      {
        label: "Recipe development",
        href: "/services/recipe",
        detail: "Including trending NA beers and functional probiotic beers",
      },
      {
        label: "Operations optimisation",
        href: "/services/operations",
        detail: "Maximise efficiency and profitability",
      },
      {
        label: "Quality control systems",
        href: "/services/quality",
        detail: "Establish sampling, testing and sensory checks",
      },
      { label: "Staff training & SOPs", href: "/services/operations", detail: "Build capable brewing teams" },
    ],
  },
  expertise: {
    title: "Practical support for brewery owners and beer brands",
    body: "We connect brewery planning with production requirements, from tank capacity and utility loads to recipe transfer, quality checks and staff training. Product development can include pilot trials for non-alcoholic and functional beer concepts.",
  },
  local: {
    title: "Local expertise in Pune & Maharashtra",
    body: "Based in Pune, we understand the local market dynamics, regulatory landscape, and consumer preferences across Maharashtra. We help translate your production goals into equipment, utility and operating requirements.",
  },
  national: {
    title: "Serving all of India — from Bangalore to Delhi",
    body: "While headquartered in Pune, we provide brewery consulting services across India including Mumbai, Bangalore, Delhi NCR, Hyderabad, Chennai, and beyond. Our team travels nationwide to ensure your brewery success.",
  },
};
