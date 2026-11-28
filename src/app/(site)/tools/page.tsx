import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calculator, ChartNoAxesCombined, ClipboardList, FlaskConical, Users, FileText, Coins } from "lucide-react";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Brewing Tools for Brewery Owners and Brewers",
  description: "Explore BrewYield for brewhouse efficiency, extract losses, batch costing and team collaboration, plus our brewery ROI calculator.",
  path: "/tools",
});

const features = [
  { icon: ChartNoAxesCombined, title: "Brewhouse efficiency", description: "Measure extract recovery and compare batch performance." },
  { icon: FlaskConical, title: "Extract loss analysis", description: "Identify where valuable extract is lost during brewing." },
  { icon: Coins, title: "Batch costing", description: "Understand grain costs and the financial impact of extract losses." },
  { icon: ClipboardList, title: "Malt COA management", description: "Maintain malt specifications for consistent yield calculations." },
  { icon: Users, title: "Team collaboration", description: "Work together in a shared brewery workspace." },
  { icon: FileText, title: "Batch history and PDF reports", description: "Review completed batches and export reports." },
];

export default function ToolsPage() {
  return (
    <Container size="wide" className="py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Six Row Brewing</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold md:text-6xl">Brewing Tools</h1>
        <p className="mt-5 text-lg text-muted-foreground">Practical tools for brewery owners and professional brewers to measure performance, manage costs and make informed production decisions.</p>
      </div>
      <section className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Featured tool</p>
        <h2 className="mt-3 font-heading text-4xl font-semibold">BrewYield</h2>
        <p className="mt-3 text-xl font-medium">Track the grain. Measure the gain.</p>
        <p className="mt-3 max-w-2xl text-muted-foreground">A dedicated brewing performance platform to help brewers track extract recovery and help owners understand production efficiency and raw material costs.</p>
        <div className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-border p-5">
              <Icon className="mb-3 h-6 w-6 text-primary" aria-hidden />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
        <a href="https://brewyield.sixrowbrewing.com" className={buttonVariants({ variant: "accent", size: "md" })}>Launch BrewYield <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden /></a>
      </section>
      <section className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-10">
        <Calculator className="h-7 w-7 text-primary" aria-hidden />
        <h2 className="mt-4 font-heading text-2xl font-semibold">Brewery ROI Calculator</h2>
        <p className="my-4 max-w-2xl text-muted-foreground">Estimate brewery profitability, investment payback and monthly operating profit after payback.</p>
        <Link href="/blog/brewery-roi-calculator#brewery-roi-calculator" className={buttonVariants({ variant: "accent", size: "md" })}>Open ROI Calculator</Link>
      </section>
    </Container>
  );
}
