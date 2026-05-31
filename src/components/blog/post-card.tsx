import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { PostListItem } from "@/sanity/lib/types";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Read: ${post.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-primary-100">
        <Image
          src={urlFor(post.coverImage).width(800).height(500).fit("crop").auto("format").url()}
          alt={post.coverImage?.alt ?? ""}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <time
          dateTime={post.publishedAt}
          className="text-caption font-semibold uppercase tracking-widest text-accent-hover"
        >
          {formatDate(post.publishedAt)}
        </time>
        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          {post.title}
        </h2>
        {post.excerpt ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-hover">
          Read article
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
