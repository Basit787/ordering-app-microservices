import { formatMoney, frontendUrl, resolveImageUrl } from "frontend-common";
import { Package } from "lucide-react";
import { Card, CardContent } from "oamui";
import { useFeaturedProducts } from "../api/hook";

// The newest products, each linking to its page in the shop
export const FeaturedProducts = () => {
  const { data: products } = useFeaturedProducts();
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {products.map((product) => (
        <a
          key={product.id}
          href={frontendUrl("products", `/products/${product.id}`)}
          className="group block rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Card className="h-full gap-0 overflow-hidden py-0 transition-colors group-hover:border-primary/40">
            {product.imageUrl ? (
              <img
                src={resolveImageUrl(product.imageUrl)}
                alt={product.name}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center bg-muted text-muted-foreground">
                <Package className="size-10" />
              </div>
            )}
            <CardContent className="space-y-1 p-4">
              <p className="line-clamp-1 font-medium">{product.name}</p>
              <p className="font-semibold text-primary">{formatMoney(product.priceCents)}</p>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
};
