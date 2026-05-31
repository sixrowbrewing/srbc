import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Reusable SEO object. Lets editors override the auto-generated meta tags per post.
 * When a field is left blank, the page falls back to sensible defaults (post title,
 * excerpt, cover image).
 */
export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description:
        "Overrides the browser/Google title. Leave blank to use the post title. ~60 chars.",
      validation: (rule) => rule.max(70).warning("Keep meta titles under ~60 characters."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description:
        "Overrides the search-result snippet. Leave blank to use the excerpt. ~155 chars.",
      validation: (rule) =>
        rule.max(170).warning("Keep meta descriptions under ~155 characters."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description: "Overrides the cover image when shared on social media (1200×630 ideal).",
      options: { hotspot: true },
    }),
    defineField({
      name: "noindex",
      title: "Hide from search engines (noindex)",
      type: "boolean",
      description: "Turn on to keep this post out of Google. Off by default.",
      initialValue: false,
    }),
  ],
});
