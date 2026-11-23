import {
  PortableText as PortableTextComponent,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { BreweryRoi } from "@/components/blog/brewery-roi";
import Image from "next/image";
import Link from "next/link";
import { urlFor, getImageDimensions } from "@/sanity/lib/image";
import { ImageZoom } from "@/components/blog/image-zoom";
import type { ImageWithAlt } from "@/sanity/lib/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2
        id={value?._key}
        className="mt-12 scroll-mt-10 font-heading text-3xl font-semibold text-foreground"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={value?._key}
        className="mt-10 scroll-mt-10 font-heading text-2xl font-semibold text-foreground"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 font-heading text-xl font-semibold text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mt-6 leading-relaxed text-muted-foreground">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-4 border-accent pl-6 italic text-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = (value?.href as string) ?? "#";
      const isExternal = href.startsWith("http");
      return (
        <Link
          href={href}
          className="font-medium text-accent underline underline-offset-4 hover:text-accent/80"
          {...(isExternal || value?.blank
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    breweryRoi: ({ value }) => <BreweryRoi initialSales={value.initialSales} />,
    image: ({ value }: { value: ImageWithAlt & { caption?: string } }) => {
      if (!value?.asset) return null;

      // Fall back to a 3:2 box only when the ref carries no dimensions.
      const { width, height } = getImageDimensions(value) ?? {
        width: 1200,
        height: 800,
      };
      const alt = value.alt ?? value.caption ?? "";

      return (
        <figure className="mt-8">
          <ImageZoom
            src={urlFor(value).width(3000).fit("max").auto("format").url()}
            alt={alt}
            width={width}
            height={height}
          >
            <Image
              src={urlFor(value).width(1200).fit("max").auto("format").url()}
              alt={alt}
              width={width}
              height={height}
              className="h-auto w-full rounded-xl"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </ImageZoom>
          {value.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableTextComponent value={value} components={components} />;
}
