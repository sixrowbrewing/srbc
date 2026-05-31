export type NavItem = { label: string; href: string };

export const siteConfig = {
  name: "Six Row Brewing Consulting",
  shortName: "SRBC",
  tagline: "Crafting Success, Brewing Excellence",
  description:
    "Leading brewery consultant in Pune, India. Expert microbrewery setup, brewpub consulting, NA beer development, probiotic beer formulation.",
  url: "https://www.sixrowbrewing.com",
  ogImage: "/og.jpg",
  contact: {
    // Phone/WhatsApp intentionally commented out so the number is NOT shipped
    // to the browser bundle or rendered in the UI. Replace the placeholder with
    // the real number before re-enabling these (and the related UI + helper).
    // phone: "+91 00000 00000",
    // phoneRaw: "910000000000",
    email: "sixrowbrewing@gmail.com",
    address: {
      line1: "Six Row Brewing Consulting",
      city: "Pune",
      region: "Maharashtra",
      country: "India",
    },
  },
  // whatsapp: {
  //   number: "910000000000",
  //   defaultMessage:
  //     "Hello! I would like to know more about your brewing consulting services.",
  // },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] as ReadonlyArray<NavItem>,
};

export type SiteConfig = typeof siteConfig;
