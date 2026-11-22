import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { CtaSection } from "@/components/shared/cta-section";
import { PortableText } from "@/components/blog/portable-text";
import { ImageZoom } from "@/components/blog/image-zoom";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ArticleCtaCard } from "@/components/blog/article-cta-card";
import { buildMetadata, blogPostingJsonLd } from "@/lib/seo";
import { getHeadings } from "@/lib/toc";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import logo from "@/assets/srbclogo.png";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { urlFor, getImageDimensions } from "@/sanity/lib/image";
import type { Post, PostSlug } from "@/sanity/lib/types";

const consultingLinks: Record<string, { href: string; label: string; description: string }> = {
  "how-much-does-it-cost-to-start-a-microbrewery-in-india-2026-guide-introduction": {
    href: "/services/microbrewery#project-report",
    label: "Request a Brewery Project Report",
    description: "Get a project estimate based on your planned brewing capacity, site, equipment, utilities, and staffing.",
  },
  "contract-brewing-in-india-a-smarter-alternative-to-starting-a-microbrewery": {
    href: "/services/gypsy",
    label: "Explore Contract Brewing Consulting",
    description: "Get help finding a host brewery and planning production, recipe transfer, and quality checks.",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Statically rendered; refreshed on publish via /api/revalidate (tag "post").
// The hourly fallback keeps content fresh without frequent slow origin fetches.
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await sanityFetch<PostSlug[]>({
    query: postSlugsQuery,
    tags: ["post"],
  });
  return slugs.map((s) => ({ slug: s.slug }));
}

async function getPost(slug: string) {
  return sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
    // "category" so editing a category also revalidates the post page.
    tags: ["post", "category"],
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return buildMetadata({
      title: "Post not found",
      description: "This article could not be found.",
      path: `/blog/${slug}`,
      noindex: true,
    });
  }

  const ogSource = post.seo?.ogImage ?? post.coverImage;
  const image = ogSource
    ? urlFor(ogSource).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  return buildMetadata({
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt ?? "",
    path: `/blog/${post.slug}`,
    image,
    type: "article",
    publishedTime: post.publishedAt,
    noindex: post.seo?.noindex ?? false,
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const consultingLink = consultingLinks[post.slug];

  // Rendered at the image's own aspect ratio — cover images are often
  // infographics, and a forced crop cuts off their headings and footers.
  const heroDimensions = getImageDimensions(post.coverImage);
  const heroImage = urlFor(post.coverImage)
    .width(1600)
    .fit("max")
    .auto("format")
    .url();
  // Larger source for the click-to-expand overlay, capped so a huge original
  // isn't served verbatim. Only fetched once the overlay opens.
  const heroFullImage = urlFor(post.coverImage)
    .width(3000)
    .fit("max")
    .auto("format")
    .url();
  // Social cards need a fixed 1.91:1, so this one stays cropped.
  const shareImage = urlFor(post.coverImage)
    .width(1200)
    .height(630)
    .fit("crop")
    .auto("format")
    .url();
  const jsonLd = blogPostingJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    image: shareImage,
    publishedAt: post.publishedAt,
    authorName: post.author?.name,
  });

  const headings = getHeadings(post.body);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-8 md:py-12">
        <Container size="wide" className="max-w-[88rem]">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[15rem_minmax(0,1fr)_18rem]">
            {/* Left rail — brand, back link, table of contents */}
            <aside className="hidden lg:block lg:pr-10">
              <div className="lg:sticky lg:top-10">
                <Link
                  href="/"
                  aria-label={`${siteConfig.name} — Home`}
                  className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Image
                    src={logo}
                    alt={siteConfig.name}
                    priority
                    placeholder="blur"
                    sizes="160px"
                    className="h-14 w-auto"
                  />
                </Link>

                <div className="mt-10">
                  <TableOfContents headings={headings} />
                </div>
              </div>
            </aside>

            {/* Center — article */}
            <div className="min-w-0 lg:border-x lg:border-border lg:px-10">
              {/* Mobile logo (desktop shows it in the left rail) + back link */}
              <div className="mb-8 flex items-center justify-between gap-4">
                <Link
                  href="/"
                  aria-label={`${siteConfig.name} — Home`}
                  className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:hidden"
                >
                  <Image
                    src={logo}
                    alt={siteConfig.name}
                    priority
                    placeholder="blur"
                    sizes="120px"
                    className="h-12 w-auto"
                  />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-hover"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  All articles
                </Link>
              </div>

              <header>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-semibold uppercase tracking-widest text-accent-hover">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  {post.author?.name ? <span>· {post.author.name}</span> : null}
                </div>
                <h1 className="mt-4 font-heading text-display-lg font-semibold tracking-tight text-foreground text-balance">
                  {post.title}
                </h1>
                {post.excerpt ? (
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
                    {post.excerpt}
                  </p>
                ) : null}
              </header>

              <div className="mt-10">
                {heroDimensions ? (
                  <ImageZoom
                    src={heroFullImage}
                    alt={post.coverImage?.alt ?? post.title}
                    width={heroDimensions.width}
                    height={heroDimensions.height}
                  >
                    <Image
                      src={heroImage}
                      alt={post.coverImage?.alt ?? post.title}
                      width={heroDimensions.width}
                      height={heroDimensions.height}
                      priority
                      sizes="(min-width: 1024px) 800px, 100vw"
                      placeholder={post.coverImage?.lqip ? "blur" : "empty"}
                      blurDataURL={post.coverImage?.lqip}
                      className="h-auto w-full rounded-2xl bg-primary-100"
                    />
                  </ImageZoom>
                ) : (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-primary-100">
                    <Image
                      src={heroImage}
                      alt={post.coverImage?.alt ?? post.title}
                      fill
                      priority
                      sizes="(min-width: 1024px) 800px, 100vw"
                      placeholder={post.coverImage?.lqip ? "blur" : "empty"}
                      blurDataURL={post.coverImage?.lqip}
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {consultingLink && (
                <div className="mt-6 rounded-xl border border-border bg-muted p-5">
                  <p className="text-sm text-muted-foreground">{consultingLink.description}</p>
                  <Link href={consultingLink.href} className="mt-2 inline-block font-semibold text-primary underline underline-offset-4">
                    {consultingLink.label}
                  </Link>
                </div>
              )}
              {post.body ? (
                <div className="mt-4">
                  <PortableText value={post.body} />
                </div>
              ) : null}
            </div>

            {/* Right rail — CTA */}
            <aside className="lg:pl-10">
              <div className="lg:sticky lg:top-10">
                <ArticleCtaCard />
              </div>
            </aside>
          </div>
        </Container>
      </article>
      <CtaSection
        title="Have questions about your brewery project?"
        description="Book a free consultation and get expert guidance tailored to your goals."
      />
    </>
  );
}
