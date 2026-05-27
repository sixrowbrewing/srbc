import { CheckCircle2, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { longFormContent } from "@/content/home";

const cities = [
  "Pune",
  "Mumbai",
  "Bangalore",
  "Delhi NCR",
  "Hyderabad",
  "Chennai",
  "Goa",
  "Kolkata",
];

const sectionAnchors = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "expertise", label: "Expertise" },
  { id: "national", label: "National reach" },
];

export function SeoContentSection() {
  return (
    <Section tone="muted" ariaLabelledby="local-expertise-title" size="md">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          {/* Sticky TOC + local card */}
          <aside className="space-y-8 lg:sticky lg:top-28">
            <div>
              <p className="inline-flex items-center text-caption font-semibold uppercase text-accent-hover">
                <span
                  aria-hidden
                  className="mr-2.5 inline-block h-px w-7 bg-accent"
                />
                On this page
              </p>
              <nav aria-label="Section contents" className="mt-5">
                <ul className="space-y-2.5 border-l border-border">
                  {sectionAnchors.map((anchor) => (
                    <li key={anchor.id}>
                      <a
                        href={`#${anchor.id}`}
                        className="-ml-px block border-l-2 border-transparent pl-4 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                      >
                        {anchor.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary ring-1 ring-inset ring-primary/10">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {longFormContent.local.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {longFormContent.local.body}
              </p>

              <p className="mt-6 text-caption font-semibold uppercase text-accent-hover">
                Cities we serve
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {cities.map((city) => (
                  <li
                    key={city}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="space-y-12 text-base leading-relaxed text-muted-foreground">
            <header id="overview" className="scroll-mt-28">
              <p className="inline-flex items-center text-caption font-semibold uppercase text-accent-hover">
                <span
                  aria-hidden
                  className="mr-2.5 inline-block h-px w-7 bg-accent"
                />
                Local expertise
              </p>
              <h2
                id="local-expertise-title"
                className="mt-4 font-heading text-display-lg font-semibold tracking-tight text-foreground text-balance"
              >
                {longFormContent.intro.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
                {longFormContent.intro.body}
              </p>
            </header>

            <div id="services" className="scroll-mt-28">
              <h3 className="font-heading text-display-md font-semibold tracking-tight text-foreground">
                {longFormContent.servicesIntro.title}
              </h3>
              <p className="mt-3">{longFormContent.servicesIntro.body}</p>
              <ul className="mt-6 space-y-3">
                {longFormContent.servicesIntro.bullets.map((bullet) => (
                  <li
                    key={bullet.label}
                    className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent-hover"
                      aria-hidden
                    />
                    <span>
                      <strong className="font-semibold text-foreground">
                        {bullet.label}
                      </strong>
                      <span className="block text-sm text-muted-foreground">
                        {bullet.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="expertise" className="scroll-mt-28">
              <h3 className="font-heading text-display-md font-semibold tracking-tight text-foreground">
                {longFormContent.expertise.title}
              </h3>
              <p className="mt-3">{longFormContent.expertise.body}</p>
            </div>

            <div id="national" className="scroll-mt-28">
              <h3 className="font-heading text-display-md font-semibold tracking-tight text-foreground">
                {longFormContent.national.title}
              </h3>
              <p className="mt-3">{longFormContent.national.body}</p>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}
