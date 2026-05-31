import type { Metadata } from "next";
import { siteConfig } from "./site";

interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  image,
  type = "website",
  publishedTime,
  noindex = false,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type,
      locale: "en_IN",
      url,
      siteName: siteConfig.name,
      title,
      description,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    // telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.region,
      addressCountry: siteConfig.contact.address.country,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [],
  };
}

export function blogPostingJsonLd(input: {
  title: string;
  description?: string;
  slug: string;
  image?: string;
  publishedAt: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: input.image ? [input.image] : undefined,
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    url: new URL(`/blog/${input.slug}`, siteConfig.url).toString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": new URL(`/blog/${input.slug}`, siteConfig.url).toString(),
    },
    author: {
      "@type": "Person",
      name: input.authorName ?? siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: input.name,
    name: input.name,
    description: input.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "India",
    url: new URL(`/services/${input.slug}`, siteConfig.url).toString(),
  };
}
