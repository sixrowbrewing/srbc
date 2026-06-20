import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { CtaSection } from "@/components/shared/cta-section";
import { PortableText } from "@/components/blog/portable-text";
import { buildMetadata, blogPostingJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Post, PostSlug } from "@/sanity/lib/types";

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
    tags: ["post"],
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

  const heroImage = urlFor(post.coverImage)
    .width(1600)
    .height(900)
    .fit("crop")
    .auto("format")
    .url();
  const jsonLd = blogPostingJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    image: heroImage,
    publishedAt: post.publishedAt,
    authorName: post.author?.name,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-16 md:py-24">
        <Container size="narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-hover"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All articles
          </Link>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-semibold uppercase tracking-widest text-accent-hover">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
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

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-primary-100">
            <Image
              src={heroImage}
              alt={post.coverImage?.alt ?? post.title}
              fill
              priority
              sizes="(min-width: 896px) 832px, 100vw"
              placeholder={post.coverImage?.lqip ? "blur" : "empty"}
              blurDataURL={post.coverImage?.lqip}
              className="object-cover"
            />
          </div>

          {post.body ? (
            <div className="mt-4">
              <PortableText value={post.body} />
            </div>
          ) : null}
        </Container>
      </article>
      <CtaSection
        title="Have questions about your brewery project?"
        description="Book a free consultation and get expert guidance tailored to your goals."
      />
    </>
  );
}
