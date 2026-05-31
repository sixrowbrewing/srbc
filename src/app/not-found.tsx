import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="pt-20 md:pt-24">
        <section className="py-32" aria-labelledby="root-not-found-title">
          <Container className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              404
            </p>
            <h1
              id="root-not-found-title"
              className="mt-3 font-heading text-display-lg font-semibold text-foreground"
            >
              Page not found
            </h1>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
            </p>
            <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
              Back home
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
