import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/features/services/page-hero";
import { BlogSearchList } from "@/components/blog/blog-search-list";
import { buildMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery } from "@/sanity/lib/queries";
import type { PostListItem } from "@/sanity/lib/types";

export const metadata: Metadata = buildMetadata({
  title: "Brewery & Beer Blog",
  description:
    "Guides on setting up a brewery in India — costs, licensing, equipment, beer styles, and craft brewing. Expert insights from Six Row Brewing Consulting.",
  path: "/blog",
  keywords: [
    "brewery blog India",
    "how to setup a brewery",
    "brewery license in India",
    "cost to setup a brewery",
    "how to brew beer",
    "types of beer",
    "craft brewery India",
  ],
});

// Statically rendered; refreshed on publish via /api/revalidate (tag "post").
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await sanityFetch<PostListItem[]>({
    query: postsQuery,
    tags: ["post"],
  });

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Brewery insights, beer guides & industry know-how"
        description="Practical articles on starting and scaling a brewery in India — covering cost, licensing, equipment, beer styles and craft brewing."
      />
      <section className="py-16 md:py-24" aria-label="Blog posts">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No posts published yet. Check back soon.
            </p>
          ) : (
            <BlogSearchList posts={posts} />
          )}
        </Container>
      </section>
      <CtaSection
        title="Planning your own brewery?"
        description="Book a free 30-minute consultation and we'll help you map out the next steps."
      />
    </>
  );
}
