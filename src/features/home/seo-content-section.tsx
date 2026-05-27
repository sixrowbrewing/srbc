import { CheckCircle2, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { longFormContent } from "@/content/home";

export function SeoContentSection() {
  return (
    <Section tone="muted" ariaLabelledby="local-expertise-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <article className="space-y-10 text-base leading-relaxed text-muted-foreground">
            <header>
              <h2
                id="local-expertise-title"
                className="font-heading text-display-lg font-semibold text-foreground"
              >
                {longFormContent.intro.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {longFormContent.intro.body}
              </p>
            </header>

            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                {longFormContent.servicesIntro.title}
              </h3>
              <p className="mt-3">{longFormContent.servicesIntro.body}</p>
              <ul className="mt-5 space-y-3">
                {longFormContent.servicesIntro.bullets.map((bullet) => (
                  <li key={bullet.label} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <span className="text-foreground">
                      <strong className="font-semibold">{bullet.label}</strong>
                      <span className="text-muted-foreground"> — {bullet.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                {longFormContent.expertise.title}
              </h3>
              <p className="mt-3">{longFormContent.expertise.body}</p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                {longFormContent.national.title}
              </h3>
              <p className="mt-3">{longFormContent.national.body}</p>
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {longFormContent.local.title}
                </h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {longFormContent.local.body}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">
                Cities we serve
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm font-medium text-foreground">
                {[
                  "Pune",
                  "Mumbai",
                  "Bangalore",
                  "Delhi NCR",
                  "Hyderabad",
                  "Chennai",
                  "Goa",
                  "Kolkata",
                ].map((city) => (
                  <li key={city} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
