import { Container } from "@/components/shared/container";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section
      className="surface-forest relative text-primary-foreground"
      aria-labelledby="page-hero-title"
    >
      <Container size="wide" className="py-20 md:py-28">
        {eyebrow && (
          <p className="mb-4 inline-flex items-center text-caption font-semibold uppercase text-accent">
            <span
              aria-hidden
              className="mr-2.5 inline-block h-px w-7 bg-accent"
            />
            {eyebrow}
          </p>
        )}
        <h1
          id="page-hero-title"
          className="font-heading text-display-xl font-semibold tracking-tight text-primary-foreground text-balance"
        >
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
