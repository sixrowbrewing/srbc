import type { PortableTextBlock } from "@portabletext/react";
import type { Image } from "sanity";

export interface ImageWithAlt extends Image {
  alt?: string;
}

export interface AuthorRef {
  name: string;
  image?: ImageWithAlt;
}

export interface CategoryRef {
  title: string;
  slug: string;
}

export interface PostSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: Image;
  noindex?: boolean;
}

/** Shape returned by the listing projection (postsQuery). */
export interface PostListItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  coverImage: ImageWithAlt;
  author?: AuthorRef;
  categories?: CategoryRef[];
}

/** Full post (postBySlugQuery) — listing fields plus body + seo. */
export interface Post extends PostListItem {
  body?: PortableTextBlock[];
  seo?: PostSeo;
}

export interface PostSlug {
  slug: string;
  publishedAt: string;
}
