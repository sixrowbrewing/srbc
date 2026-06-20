import "server-only";

import type { QueryParams } from "next-sanity";

import { client } from "./client";

/**
 * Server-side data fetch with cache tags so the Sanity webhook can revalidate
 * on-demand. Pass the document `_type`(s) the query depends on as `tags`
 * (e.g. ["post"]); the /api/revalidate route calls revalidateTag() with the
 * matching tag when content changes in Studio.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      // Time-based fallback so content refreshes even without a webhook
      // (e.g. during local development before the webhook is wired up).
      // Kept long because /api/revalidate purges by tag on publish, so a short
      // window only adds slow origin round-trips (TTFB) without freshness gain.
      revalidate: 3600,
      tags,
    },
  });
}
