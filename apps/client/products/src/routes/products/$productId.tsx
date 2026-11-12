import { createFileRoute, Link } from "@tanstack/react-router";
import { DetailSkeleton, lazyComponent } from "frontend-common";
import { ArrowLeft } from "lucide-react";
import { Button } from "oamui";
import { ShopHeader } from "@/lib/components/shop-header";

const ProductDetails = lazyComponent(
  () => import("./_lib/components/product-details").then((m) => m.ProductDetails),
  <DetailSkeleton />,
);

export const Route = createFileRoute("/products/$productId")({ component: ProductPage });

function ProductPage() {
  const { productId } = Route.useParams();
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <ShopHeader page="Product" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-6">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link to="/">
            <ArrowLeft />
            Back to shop
          </Link>
        </Button>
        <ProductDetails productId={productId} />
      </main>
    </div>
  );
}
