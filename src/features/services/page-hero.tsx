import { Container } from "@/components/shared/container";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative bg-primary text-primary-foreground" aria-labelledby="page-hero-title">
      <Container className="py-20 md:py-28">
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
            {eyebrow}
          </p>
        )}
        <h1
          id="page-hero-title"
          className="font-heading text-display-xl font-semibold leading-tight"
        >
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
