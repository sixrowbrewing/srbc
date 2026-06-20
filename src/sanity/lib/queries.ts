import { groq } from "next-sanity";

// Shared projection for a post's cover image + author.
const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage{
    ...,
    "lqip": asset->metadata.lqip
  },
  "author": author->{name, image},
  "categories": categories[]->{title, "slug": slug.current}
`;

// All published posts, newest first (for the /blog listing).
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    ${postFields}
  }
`;

// A single post by slug (for /blog/[slug]).
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${postFields},
    body,
    seo
  }
`;

// Just the slugs — for generateStaticParams and the sitemap.
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]{
    "slug": slug.current,
    publishedAt
  }
`;
