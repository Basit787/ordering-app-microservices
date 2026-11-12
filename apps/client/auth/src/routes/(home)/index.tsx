import { createFileRoute } from "@tanstack/react-router";
import { CardGridSkeleton, ChipsSkeleton, frontendUrl, lazyComponent } from "frontend-common";
import { Hero } from "./_lib/components/hero";
import { HowItWorks } from "./_lib/components/how-it-works";
import { LandingHeader } from "./_lib/components/landing-header";
import { Shortcuts } from "./_lib/components/shortcuts";
import { SiteFooter } from "./_lib/components/site-footer";

const CategoryStrip = lazyComponent(
  () => import("./_lib/components/category-strip").then((m) => m.CategoryStrip),
  <ChipsSkeleton count={4} />,
);
const FeaturedProducts = lazyComponent(
  () => import("./_lib/components/featured-products").then((m) => m.FeaturedProducts),
  <CardGridSkeleton count={8} className="md:grid-cols-4" />,
);

// The common entry point: public landing page, with app shortcuts once signed in
export const Route = createFileRoute("/(home)/")({ component: LandingPage });

function LandingPage() {
  return (
    <div className="min-h-dvh bg-background">
      <LandingHeader />
      <main>
        <Hero />
        <Shortcuts />
        <section className="mx-auto max-w-6xl space-y-4 px-4 py-12 md:px-6">
          <h2 className="text-xl font-semibold">Shop by category</h2>
          <CategoryStrip />
        </section>
        <section className="mx-auto max-w-6xl space-y-4 px-4 py-12 md:px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold">New in the shop</h2>
            <a href={frontendUrl("products")} className="text-sm text-primary hover:underline">
              See everything
            </a>
          </div>
          <FeaturedProducts />
        </section>
        <HowItWorks />
      </main>
      <SiteFooter />
    </div>
  );
}
