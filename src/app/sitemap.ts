import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { services } from "@/content/services";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postSlugsQuery } from "@/sanity/lib/queries";
import type { PostSlug } from "@/sanity/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];
  const serviceUrls: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let postUrls: MetadataRoute.Sitemap = [];
  try {
    const posts = await sanityFetch<PostSlug[]>({
      query: postSlugsQuery,
      tags: ["post"],
    });
    postUrls = posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // If Sanity is unreachable at build time, still emit the static routes.
    postUrls = [];
  }

  return [...base, ...serviceUrls, ...postUrls];
}
