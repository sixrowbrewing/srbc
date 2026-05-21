export const siteConfig = {
  name: "Six Row Brewing Consulting",
  shortName: "SRBC",
  tagline: "Crafting Success, Brewing Excellence",
  description:
    "Leading brewery consultant in Pune, India. Expert microbrewery setup, brewpub consulting, NA beer development, probiotic beer formulation.",
  url: "https://sixrowbrewing.com",
  ogImage: "/og.jpg",
  contact: {
    phone: "+91 8559907991",
    phoneRaw: "918559907991",
    email: "info@sixrowbrewing.com",
    address: {
      line1: "Six Row Brewing Consulting",
      city: "Pune",
      region: "Maharashtra",
      country: "India",
    },
  },
  whatsapp: {
    number: "918559907991",
    defaultMessage:
      "Hello! I would like to know more about your brewing consulting services.",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
