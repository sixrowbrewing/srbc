import { Award, MapPin, Sparkles, ShieldCheck } from "lucide-react";
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
  stats: [
    { value: "15+", label: "Brewery projects delivered" },
    { value: "10", label: "Consulting practices" },
    { value: "PAN-India", label: "Pune · Mumbai · Bangalore · Delhi" },
  ],
};

export const whyChooseContent = {
  title: "Brewing expertise, end to end",
  description:
    "Expert brewing consultants specialising in microbreweries, brewpubs, and craft brewing operations across India. From startup guidance to operational excellence, we deliver results.",
  pillars: [
    {
      icon: Award,
      title: "15+ successful projects",
      description:
        "Proven track record across microbreweries, brewpubs, and craft brewing operations.",
      stat: "Delivered nationwide",
    },
    {
      icon: MapPin,
      title: "Local expertise",
      description:
        "Deep knowledge of Indian regulations, supply chains, and consumer preferences.",
      stat: "Based in Pune, Maharashtra",
    },
    {
      icon: Sparkles,
      title: "Specialty categories",
      description:
        "Pioneer in NA beers, probiotic beers, and emerging functional beverages.",
      stat: "NA + functional beer expertise",
    },
    {
      icon: ShieldCheck,
      title: "End-to-end support",
      description:
        "From feasibility studies to commissioning to ongoing operational excellence.",
      stat: "Concept → commissioning",
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
