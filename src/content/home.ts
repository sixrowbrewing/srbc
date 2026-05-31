import { Factory, Gauge, Microscope, FlaskConical } from "lucide-react";
import microbreweryImage from "@/assets/microbrewery.png";

export const heroContent = {
  eyebrow: "Brewing Industry Consultants — Pune, India",
  title: "Crafting Success,\nBrewing Excellence",
  description:
    "From grain to glass, we deliver comprehensive brewing solutions that elevate quality, optimize operations, and drive sustainable growth.",
  highlight:
    "Specialising in microbreweries, brewpubs, and craft brewing operations.",
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
    title: "Premier microbrewery & brewpub consultant in Pune, Maharashtra",
    body: "Six Row Brewing Consulting (SRBC) is India's leading microbrewery consultant based in Pune, Maharashtra. We specialise in complete brewery setup solutions, brewpub consulting, and innovative beer development including NA (non-alcoholic) beer and probiotic beer formulation.",
  },
  servicesIntro: {
    title: "Comprehensive brewery consulting services in India",
    body: "Whether you're launching a new microbrewery in Pune, expanding an existing craft brewery, or opening a brewpub in Maharashtra, SRBC provides end-to-end consulting services including:",
    bullets: [
      {
        label: "Microbrewery setup & equipment selection",
        detail: "Complete turnkey solutions",
      },
      {
        label: "Brewery licensing & compliance",
        detail: "Navigate Indian regulations effortlessly",
      },
      {
        label: "Recipe development",
        detail: "Including trending NA beers and functional probiotic beers",
      },
      {
        label: "Operations optimisation",
        detail: "Maximise efficiency and profitability",
      },
      {
        label: "Quality control systems",
        detail: "Ensure consistent, award-winning products",
      },
      { label: "Staff training & SOPs", detail: "Build capable brewing teams" },
    ],
  },
  expertise: {
    title: "Why we're the best brewery consultant in Pune",
    body: "Unlike other brewing consultants in India, SRBC offers specialised expertise in emerging beer categories like non-alcoholic craft beer and probiotic beer development — positioning your brewery at the forefront of market trends.",
  },
  local: {
    title: "Local expertise in Pune & Maharashtra",
    body: "Based in Pune, we understand the local market dynamics, regulatory landscape, and consumer preferences across Maharashtra. Our hands-on approach ensures your brewery succeeds from day one.",
  },
  national: {
    title: "Serving all of India — from Bangalore to Delhi",
    body: "While headquartered in Pune, we provide brewery consulting services across India including Mumbai, Bangalore, Delhi NCR, Hyderabad, Chennai, and beyond. Our team travels nationwide to ensure your brewery success.",
  },
};
