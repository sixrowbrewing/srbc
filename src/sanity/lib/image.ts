import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build an optimized image URL from a Sanity image reference.
 * Usage: urlFor(post.coverImage).width(1200).height(630).url()
 */
export function urlFor(source: Image) {
  return builder.image(source);
}

export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

/**
 * Intrinsic dimensions of a Sanity image, parsed from the asset reference —
 * refs encode them, e.g. "image-abc123-1690x955-png". Lets us render at the
 * image's own aspect ratio without querying asset metadata.
 * Returns null if the ref is missing or not in the expected shape.
 */
export function getImageDimensions(source?: Image): ImageDimensions | null {
  const asset = source?.asset as { _ref?: string; _id?: string } | undefined;
  const match = /-(\d+)x(\d+)-[a-z]+$/.exec(asset?._ref ?? asset?._id ?? "");
  if (!match) return null;

  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!width || !height) return null;

  return { width, height, aspectRatio: width / height };
}
