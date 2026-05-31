import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `false` if you want to ensure fresh data on every request when not using
  // explicit cache tags. We use tag-based on-demand revalidation, so the CDN
  // is fine here for fast reads.
  useCdn: true,
});
