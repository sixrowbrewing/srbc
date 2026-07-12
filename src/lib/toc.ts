import type { PortableTextBlock } from "@portabletext/react";

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Extracts h2/h3 headings from a Portable Text body to build a table of
 * contents. Uses each block's stable `_key` as the anchor id so it always
 * matches the id rendered by the PortableText component.
 */
export function getHeadings(blocks: PortableTextBlock[] = []): Heading[] {
  const headings: Heading[] = [];

  for (const block of blocks) {
    if (block._type !== "block") continue;
    if (block.style !== "h2" && block.style !== "h3") continue;

    const text = (block.children ?? [])
      .map((child) =>
        typeof (child as { text?: unknown }).text === "string"
          ? ((child as { text: string }).text)
          : "",
      )
      .join("")
      .trim();

    if (!text || !block._key) continue;

    headings.push({
      id: block._key,
      text,
      level: block.style === "h2" ? 2 : 3,
    });
  }

  return headings;
}
