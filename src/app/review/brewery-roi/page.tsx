import { notFound } from "next/navigation";
import { PortableText } from "@/components/blog/portable-text";
import { client } from "@/sanity/lib/client";
import type { Post } from "@/sanity/lib/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Brewery ROI article preview", robots: { index: false, follow: false } };

export default async function BreweryRoiPreview() {
  if (process.env.VERCEL_ENV !== "preview" || !process.env.SANITY_API_READ_TOKEN) notFound();
  const draftClient = client.withConfig({ useCdn: false, perspective: "raw", token: process.env.SANITY_API_READ_TOKEN });
  const post = await draftClient.fetch<Pick<Post, "title" | "body"> | null>(
    '*[_id == "drafts.10hl-brewery-roi-calculator"][0]{title,body}', {}, { cache: "no-store" }
  );
  if (!post?.body) notFound();
  return <article className="mx-auto max-w-3xl px-5 py-12">
    <h1 className="font-heading text-4xl font-semibold">{post.title}</h1>
    <PortableText value={post.body} />
  </article>;
}
